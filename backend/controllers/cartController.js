const prisma = require("../lib/prisma");

// GET /api/cart
// Returns all cart items for the authenticated user, with product details
async function getCart(req, res) {
  const userId = req.user.userId;

  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: { category: { select: { id: true, name: true, slug: true } } },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.quantity * Number(i.product.price),
    0
  );

  res.json({
    success: true,
    data: {
      items,
      totalItems,
      totalPrice: Number(totalPrice.toFixed(2)),
    },
  });
}

// POST /api/cart
// Body: { productId, quantity }
async function addToCart(req, res) {
  const userId = req.user.userId;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    const err = new Error("productId is required");
    err.status = 400;
    throw err;
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId: { userId, productId },
    },
    update: { quantity: { increment: quantity } },
    create: { userId, productId, quantity },
    include: { product: true },
  });

  res.status(201).json({ success: true, data: item });
}

// PUT /api/cart/:id
// Body: { quantity }
async function updateCartItem(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity == null || quantity < 1) {
    const err = new Error("quantity must be at least 1");
    err.status = 400;
    throw err;
  }

  const existing = await prisma.cartItem.findFirst({
    where: { id, userId },
  });
  if (!existing) {
    const err = new Error("Cart item not found");
    err.status = 404;
    throw err;
  }

  const item = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { product: true },
  });

  res.json({ success: true, data: item });
}

// DELETE /api/cart/:id
async function removeCartItem(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  const existing = await prisma.cartItem.findFirst({
    where: { id, userId },
  });
  if (!existing) {
    const err = new Error("Cart item not found");
    err.status = 404;
    throw err;
  }

  await prisma.cartItem.delete({ where: { id } });
  res.json({ success: true, message: "Item removed from cart" });
}

// POST /api/cart/merge
// Body: { items: [{ productId, quantity }] }
// Merges guest (localStorage) cart into the authenticated user's DB cart
async function mergeCart(req, res) {
  const userId = req.user.userId;
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.json({ success: true, message: "Nothing to merge" });
  }

  for (const { productId, quantity } of items) {
    if (!productId || !quantity || quantity < 1) continue;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) continue;

    await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId, productId, quantity },
    });
  }

  res.json({ success: true, message: "Cart merged" });
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, mergeCart };

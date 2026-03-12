const prisma = require("../lib/prisma");
const { DEFAULT_USER_ID } = require("../lib/constants");

// GET /api/cart
// Returns all cart items for the default user, with product details
async function getCart(_req, res) {
  const items = await prisma.cartItem.findMany({
    where: { userId: DEFAULT_USER_ID },
    include: {
      product: {
        include: { category: { select: { id: true, name: true, slug: true } } },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Compute cart totals
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
// Adds item to cart or increments quantity if it already exists
async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    const err = new Error("productId is required");
    err.status = 400;
    throw err;
  }

  // Verify the product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  // Upsert: create if new, increment quantity if existing
  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: DEFAULT_USER_ID,
        productId,
      },
    },
    update: { quantity: { increment: quantity } },
    create: {
      userId: DEFAULT_USER_ID,
      productId,
      quantity,
    },
    include: { product: true },
  });

  res.status(201).json({ success: true, data: item });
}

// PUT /api/cart/:id
// Body: { quantity }
// Updates the quantity of a specific cart item
async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity == null || quantity < 1) {
    const err = new Error("quantity must be at least 1");
    err.status = 400;
    throw err;
  }

  // Make sure the item belongs to the default user
  const existing = await prisma.cartItem.findFirst({
    where: { id, userId: DEFAULT_USER_ID },
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
// Removes an item from the cart
async function removeCartItem(req, res) {
  const { id } = req.params;

  const existing = await prisma.cartItem.findFirst({
    where: { id, userId: DEFAULT_USER_ID },
  });
  if (!existing) {
    const err = new Error("Cart item not found");
    err.status = 404;
    throw err;
  }

  await prisma.cartItem.delete({ where: { id } });

  res.json({ success: true, message: "Item removed from cart" });
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };

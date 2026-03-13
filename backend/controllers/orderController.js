const prisma = require("../lib/prisma");

// POST /api/orders
// Places an order from the current cart contents, clears the cart, returns orderId.
async function placeOrder(req, res) {
  const userId = req.user.userId;
  const {
    shippingAddress = "123 Default Street",
    city = "New York",
    state = "NY",
    zipCode = "10001",
    phone = "555-0100",
  } = req.body;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    const err = new Error("Cart is empty – nothing to order");
    err.status = 400;
    throw err;
  }

  // Calculate total
  const totalAmount = cartItems.reduce(
    (sum, ci) => sum + ci.quantity * Number(ci.product.price),
    0
  );

  // Create order + items and delete cart in a single transaction
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        totalAmount: Number(totalAmount.toFixed(2)),
        shippingAddress,
        city,
        state,
        zipCode,
        phone,
        items: {
          create: cartItems.map((ci) => ({
            productId: ci.productId,
            quantity: ci.quantity,
            price: Number(ci.product.price),
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Clear the cart
    await tx.cartItem.deleteMany({ where: { userId } });

    return newOrder;
  });

  res.status(201).json({ success: true, data: { orderId: order.id } });
}

// GET /api/orders/:id
// Returns full order confirmation details including line items
async function getOrder(req, res) {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              slug: true,
              images: true,
              price: true,
            },
          },
        },
      },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }

  res.json({ success: true, data: order });
}


// GET /api/orders
// Returns all orders for the currently authenticated user
async function getUserOrders(req, res) {
  const userId = req.user.userId;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              images: true,
              price: true,
            },
          },
        },
      },
    },
  });

  res.json({ success: true, data: orders });
}

module.exports = { placeOrder, getOrder, getUserOrders };

const prisma = require("../lib/prisma");

// GET /api/products
// Supports optional query params: ?search=term&category=slug
async function getProducts(req, res) {
  const { search, category } = req.query;

  const where = {};

  // Filter by category slug when provided
  if (category) {
    where.category = { slug: category };
  }

  // Full-text search on title and description
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json({ success: true, data: products });
}

// GET /api/products/:id
// Returns a single product with full details including category
async function getProductById(req, res) {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  res.json({ success: true, data: product });
}

module.exports = { getProducts, getProductById };

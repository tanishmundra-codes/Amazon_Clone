const prisma = require("../lib/prisma");

// GET /api/categories
// Returns every category with a product count
async function getCategories(_req, res) {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  res.json({ success: true, data: categories });
}

module.exports = { getCategories };

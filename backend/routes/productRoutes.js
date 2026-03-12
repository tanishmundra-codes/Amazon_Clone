const { Router } = require("express");
const { getProducts, getProductById } = require("../controllers/productController");

const router = Router();

// GET /api/products         – list all products (filterable)
router.get("/", getProducts);

// GET /api/products/:id     – single product with reviews
router.get("/:id", getProductById);

module.exports = router;

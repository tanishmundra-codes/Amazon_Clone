const { Router } = require("express");
const { getCategories } = require("../controllers/categoryController");

const router = Router();

// GET /api/categories       – all categories with product count
router.get("/", getCategories);

module.exports = router;

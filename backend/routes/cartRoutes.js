const { Router } = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  mergeCart,
} = require("../controllers/cartController");
const { requireAuth } = require("../middleware/auth");

const router = Router();

// All cart routes require authentication
router.use(requireAuth);

// GET    /api/cart           – current cart for authenticated user
router.get("/", getCart);

// POST   /api/cart           – add item to cart
router.post("/", addToCart);

// POST   /api/cart/merge     – merge guest cart after login
router.post("/merge", mergeCart);

// PUT    /api/cart/:id       – update item quantity
router.put("/:id", updateCartItem);

// DELETE /api/cart/:id       – remove item from cart
router.delete("/:id", removeCartItem);

module.exports = router;

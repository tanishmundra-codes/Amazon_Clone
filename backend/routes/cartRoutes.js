const { Router } = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const router = Router();

// GET    /api/cart           – current cart for default user
router.get("/", getCart);

// POST   /api/cart           – add item to cart
router.post("/", addToCart);

// PUT    /api/cart/:id       – update item quantity
router.put("/:id", updateCartItem);

// DELETE /api/cart/:id       – remove item from cart
router.delete("/:id", removeCartItem);

module.exports = router;

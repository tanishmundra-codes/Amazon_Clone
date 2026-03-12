const { Router } = require("express");
const { placeOrder, getOrder } = require("../controllers/orderController");

const router = Router();

// POST /api/orders          – place order from cart
router.post("/", placeOrder);

// GET  /api/orders/:id      – order confirmation details
router.get("/:id", getOrder);

module.exports = router;

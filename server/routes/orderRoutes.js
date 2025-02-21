const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Place Order
router.post("/place", async (req, res) => {
  const { userId, items, totalAmount, paymentMethod } = req.body;
  const newOrder = new Order({ userId, items, totalAmount, paymentMethod });
  await newOrder.save();
  res.json({ message: "Order placed successfully!" });
});

// Get User Orders
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

module.exports = router;

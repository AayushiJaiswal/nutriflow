const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// ✅ Place an Order
router.post("/place-order", async (req, res) => {
  const { userId, items, totalAmount, paymentMethod } = req.body;

  try {
    const order = new Order({ userId, items, totalAmount, paymentMethod });
    await order.save();

    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
});

// ✅ Track an Order
router.get("/track/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
});

module.exports = router;

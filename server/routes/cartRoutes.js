const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// Add to Cart
router.post("/add", async (req, res) => {
  const { userId, productId, name, price } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, products: [] });
  }

  const existingProduct = cart.products.find(p => p.productId.toString() === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ productId, name, price, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

// Get Cart Items
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { products: [] });
});

// Remove Item from Cart
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  let cart = await Cart.findOne({ userId });

  if (cart) {
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
  }

  res.json(cart);
});

module.exports = router;

const express = require('express');
const Product = require('./models/product');
const router = express.Router();

// Create Product Route
router.post('/', async (req, res) => {
  const { name, price, description, category, imageURL, stock } = req.body;

  try {
    const newProduct = new Product({ name, price, description, category, imageURL, stock });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// Get All Products Route
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

module.exports = router;

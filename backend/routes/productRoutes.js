const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add product
router.get('/add', async (req, res) => {
  const product = new Product({
    name: "Mobile",
    price: 30000,
    description: "Good smartphone",
    image: "https://via.placeholder.com/150"
  });

  await product.save();
  res.send("Product Added");
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
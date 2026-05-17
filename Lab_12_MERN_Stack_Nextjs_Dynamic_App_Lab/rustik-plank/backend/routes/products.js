const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, featured, special, popular, search, limit } = req.query;
    let query = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (special === 'true') query.special = true;
    if (popular === 'true') query.popular = true;
    if (search) query.name = { $regex: search, $options: 'i' };
    
    let q = Product.find(query).sort({ createdAt: -1 });
    if (limit) q = q.limit(parseInt(limit));
    
    const products = await q;
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST seed sample data
router.post('/seed/all', async (req, res) => {
  try {
    await Product.deleteMany({});
    const categories = ['Beds', 'Chairs', 'Tables', 'Bookcases', 'Cabinets', 'Boxes'];
    const products = [];
    categories.forEach((cat, ci) => {
      for (let i = 1; i <= 4; i++) {
        products.push({
          name: `${cat} Lorem Ipsum`,
          description: 'This is Photoshops version of Lorem Ipsum. Proin sollicitudin, lorem quis bibendum auctor.',
          price: 134.99,
          originalPrice: ci === 0 && i === 1 ? 269.98 : undefined,
          category: cat,
          featured: i <= 2,
          special: i <= 2,
          popular: i <= 2,
          stock: 10 + i,
          rating: 4 + (i * 0.1),
        });
      }
    });
    const saved = await Product.insertMany(products);
    res.json({ message: `Seeded ${saved.length} products` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

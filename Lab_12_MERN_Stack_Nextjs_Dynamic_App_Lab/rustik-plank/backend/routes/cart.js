const express = require('express');
const router = express.Router();

// In-memory cart store (use Redis/DB in production)
const carts = {};

router.get('/:sessionId', (req, res) => {
  const cart = carts[req.params.sessionId] || [];
  res.json(cart);
});

router.post('/:sessionId/add', (req, res) => {
  const { sessionId } = req.params;
  const { productId, name, price, quantity = 1, image } = req.body;
  if (!carts[sessionId]) carts[sessionId] = [];
  
  const existing = carts[sessionId].find(i => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[sessionId].push({ productId, name, price, quantity, image });
  }
  res.json(carts[sessionId]);
});

router.put('/:sessionId/update', (req, res) => {
  const { sessionId } = req.params;
  const { productId, quantity } = req.body;
  if (!carts[sessionId]) return res.status(404).json({ message: 'Cart not found' });
  
  const item = carts[sessionId].find(i => i.productId === productId);
  if (item) item.quantity = quantity;
  if (quantity <= 0) carts[sessionId] = carts[sessionId].filter(i => i.productId !== productId);
  
  res.json(carts[sessionId]);
});

router.delete('/:sessionId/remove/:productId', (req, res) => {
  const { sessionId, productId } = req.params;
  if (carts[sessionId]) {
    carts[sessionId] = carts[sessionId].filter(i => i.productId !== productId);
  }
  res.json(carts[sessionId] || []);
});

router.delete('/:sessionId/clear', (req, res) => {
  carts[req.params.sessionId] = [];
  res.json([]);
});

module.exports = router;

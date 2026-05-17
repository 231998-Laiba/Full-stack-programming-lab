const express = require('express');
const router = express.Router();

const CATEGORIES = [
  { name: 'Beds', slug: 'beds', image: '/images/beds.jpg' },
  { name: 'Chairs', slug: 'chairs', image: '/images/chairs.jpg' },
  { name: 'Tables', slug: 'tables', image: '/images/tables.jpg' },
  { name: 'Bookcases', slug: 'bookcases', image: '/images/bookcases.jpg' },
  { name: 'Cabinets', slug: 'cabinets', image: '/images/cabinets.jpg' },
  { name: 'Boxes', slug: 'boxes', image: '/images/boxes.jpg' },
];

router.get('/', (req, res) => {
  res.json(CATEGORIES);
});

module.exports = router;

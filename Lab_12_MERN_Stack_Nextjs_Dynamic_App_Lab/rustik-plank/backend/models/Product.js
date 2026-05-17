const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, default: '/images/placeholder.jpg' },
  category: { type: String, required: true },
  stock: { type: Number, default: 10 },
  featured: { type: Boolean, default: false },
  special: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

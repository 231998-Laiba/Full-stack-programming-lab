require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Check if MONGODB_URI is loaded
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Loaded ' : 'NOT FOUND ');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log(' MongoDB Atlas Connected'))
.catch(err => {
  console.log('❌ MongoDB Connection Failed:');
  console.log(err.message);
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  stock: Number
});
const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/', (req, res) => {
  res.send(' Backend is running!');
});

app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany([
      { name: 'Wireless Headphones', price: 99.99, description: 'High-quality audio', category: 'Electronics', stock: 50 },
      { name: 'Running Shoes', price: 129.99, description: 'Comfortable fit', category: 'Sports', stock: 30 },
      { name: 'Coffee Maker', price: 79.99, description: 'Brews perfect coffee', category: 'Home', stock: 20 }
    ]);
    res.json({ message: 'Sample products added!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
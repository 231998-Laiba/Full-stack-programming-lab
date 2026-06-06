const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Lead', 'Active', 'Inactive'],
    default: 'Lead'
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  services: {
    type: String,
    trim: true,
    default: ''
  },
  amount: {
    type: Number,
    default: 0,
    min: [0, 'Amount cannot be negative']
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);

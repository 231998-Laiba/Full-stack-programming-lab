const express = require('express');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes protected
router.use(protect);

// @GET /api/customers — Get all with search & filter
router.get('/', async (req, res) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Customer.countDocuments(query);

    res.json({ success: true, data: customers, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching customers' });
  }
});

// @GET /api/customers/stats
router.get('/stats', async (req, res) => {
  try {
    const total = await Customer.countDocuments();
    const active = await Customer.countDocuments({ status: 'Active' });
    const leads = await Customer.countDocuments({ status: 'Lead' });
    const inactive = await Customer.countDocuments({ status: 'Inactive' });
    const revenueData = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const revenue = revenueData[0]?.total || 0;

    res.json({ success: true, data: { total, active, leads, inactive, revenue } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// @GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching customer' });
  }
});

// @POST /api/customers
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, message: 'Customer added successfully', data: customer });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: 'Error creating customer' });
  }
});

// @PUT /api/customers/:id
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, message: 'Customer updated successfully', data: customer });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating customer' });
  }
});

// @DELETE /api/customers/:id
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting customer' });
  }
});

module.exports = router;

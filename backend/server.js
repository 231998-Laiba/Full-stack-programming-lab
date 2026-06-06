const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/invoices', require('./routes/invoices'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CRM API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    // Seed data on first run
    await seedData();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Seed 15 customers
async function seedData() {
  const Customer = require('./models/Customer');
  const count = await Customer.countDocuments();
  if (count === 0) {
    const customers = [
      { name: 'Ahmed Hassan', email: 'ahmed.hassan@techcorp.com', phone: '0321-1234567', company: 'TechCorp Pakistan', status: 'Active', address: 'Gulshan-e-Iqbal, Karachi', services: 'Web Development', amount: 150000, notes: 'Long-term client, 3 projects completed' },
      { name: 'Fatima Malik', email: 'fatima.malik@designstudio.pk', phone: '0333-2345678', company: 'Design Studio PK', status: 'Lead', address: 'DHA Phase 5, Lahore', services: 'UI/UX Design', amount: 80000, notes: 'Interested in branding package' },
      { name: 'Muhammad Ali Raza', email: 'ali.raza@nextsolutions.com', phone: '0345-3456789', company: 'Next Solutions', status: 'Active', address: 'F-7, Islamabad', services: 'Mobile App Development', amount: 250000, notes: 'Premium client' },
      { name: 'Sana Tariq', email: 'sana.tariq@greentech.pk', phone: '0311-4567890', company: 'GreenTech Pvt Ltd', status: 'Inactive', address: 'Model Town, Lahore', services: 'Digital Marketing', amount: 45000, notes: 'Contract ended, may renew Q2' },
      { name: 'Bilal Chaudhry', email: 'bilal.ch@innovate.io', phone: '0323-5678901', company: 'Innovate.io', status: 'Active', address: 'Clifton, Karachi', services: 'Cloud Services', amount: 320000, notes: 'Enterprise client' },
      { name: 'Ayesha Siddiqui', email: 'ayesha.s@mediaworks.pk', phone: '0335-6789012', company: 'Media Works PK', status: 'Lead', address: 'PECHS, Karachi', services: 'Content Marketing', amount: 60000, notes: 'Proposal sent, awaiting response' },
      { name: 'Usman Ghani', email: 'usman.ghani@buildsmart.pk', phone: '0347-7890123', company: 'BuildSmart', status: 'Active', address: 'Bahria Town, Rawalpindi', services: 'ERP System', amount: 500000, notes: 'Large scale project ongoing' },
      { name: 'Zainab Hussain', email: 'zainab.h@fashionpoint.pk', phone: '0312-8901234', company: 'Fashion Point', status: 'Active', address: 'Liberty Market, Lahore', services: 'E-Commerce Development', amount: 175000, notes: 'Seasonal campaigns' },
      { name: 'Kamran Iqbal', email: 'kamran.i@logistics.pk', phone: '0324-9012345', company: 'Swift Logistics', status: 'Lead', address: 'Port Qasim, Karachi', services: 'Fleet Management Software', amount: 400000, notes: 'High-value prospect' },
      { name: 'Nadia Shah', email: 'nadia.shah@edulearn.pk', phone: '0336-0123456', company: 'EduLearn Pakistan', status: 'Active', address: 'Johar Town, Lahore', services: 'LMS Development', amount: 200000, notes: 'EdTech startup, growing fast' },
      { name: 'Tariq Mehmood', email: 'tariq.m@fintech.pk', phone: '0348-1234560', company: 'FinTech Solutions', status: 'Inactive', address: 'Blue Area, Islamabad', services: 'Payment Gateway Integration', amount: 120000, notes: 'On hold due to regulatory issues' },
      { name: 'Hira Baig', email: 'hira.baig@healthplus.pk', phone: '0313-2345601', company: 'HealthPlus Clinics', status: 'Active', address: 'Saddar, Karachi', services: 'Hospital Management System', amount: 350000, notes: 'Expanding to 3 more locations' },
      { name: 'Faisal Qureshi', email: 'faisal.q@realestate.pk', phone: '0325-3456012', company: 'Premier Real Estate', status: 'Lead', address: 'Cantt, Lahore', services: 'Property Portal Development', amount: 280000, notes: 'Initial meeting scheduled' },
      { name: 'Rabia Nawaz', email: 'rabia.n@foodnow.pk', phone: '0337-4560123', company: 'FoodNow Delivery', status: 'Active', address: 'Gulberg, Lahore', services: 'Food Delivery App', amount: 450000, notes: 'Phase 2 development started' },
      { name: 'Asad Javed', email: 'asad.javed@autotech.pk', phone: '0349-5601234', company: 'AutoTech Motors', status: 'Inactive', address: 'Nazimabad, Karachi', services: 'Inventory Management', amount: 90000, notes: 'Budget constraints, follow up Q3' }
    ];
    await Customer.insertMany(customers);
    console.log('✅ 15 customers seeded successfully');
  }
}

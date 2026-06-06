const express = require('express');
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');
const PDFDocument = require('pdfkit');

const router = express.Router();
router.use(protect);

// @GET /api/invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customer', 'name email company').sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching invoices' });
  }
});

// @POST /api/invoices
router.post('/', async (req, res) => {
  try {
    const { customerId, services, tax, dueDate, notes, status } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    const subtotal = services.reduce((sum, s) => sum + (s.quantity * s.unitPrice), 0);
    const taxAmount = (subtotal * (tax || 0)) / 100;
    const total = subtotal + taxAmount;

    const invoice = await Invoice.create({
      customer: customerId,
      customerName: customer.name,
      customerEmail: customer.email,
      customerCompany: customer.company,
      services,
      subtotal,
      tax: taxAmount,
      total,
      dueDate,
      notes,
      status: status || 'Draft'
    });

    res.status(201).json({ success: true, message: 'Invoice created successfully', data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating invoice' });
  }
});

// @GET /api/invoices/:id/pdf — Download PDF
router.get('/:id/pdf', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice.invoiceNumber}.pdf`);
    doc.pipe(res);

    // Header
    doc.rect(0, 0, 612, 120).fill('#0f172a');
    doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold').text('NEXUS CRM', 50, 35);
    doc.fillColor('#94a3b8').fontSize(11).font('Helvetica').text('Professional Customer Management', 50, 68);
    doc.fillColor('#64748b').fontSize(10).text('Air University | Creative Technology', 50, 85);

    // Invoice title
    doc.fillColor('#0f172a').fontSize(22).font('Helvetica-Bold').text('INVOICE', 400, 35, { align: 'right', width: 162 });
    doc.fillColor('#3b82f6').fontSize(12).font('Helvetica').text(invoice.invoiceNumber, 400, 65, { align: 'right', width: 162 });

    // Status badge
    const statusColors = { Draft: '#6b7280', Sent: '#3b82f6', Paid: '#10b981', Overdue: '#ef4444' };
    doc.rect(450, 82, 112, 22).fill(statusColors[invoice.status] || '#6b7280');
    doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text(invoice.status.toUpperCase(), 450, 87, { align: 'center', width: 112 });

    doc.moveDown(4);

    // Bill To / Invoice Details
    doc.fillColor('#64748b').fontSize(9).font('Helvetica-Bold').text('BILL TO', 50, 145);
    doc.fillColor('#0f172a').fontSize(13).font('Helvetica-Bold').text(invoice.customerName, 50, 160);
    doc.fillColor('#475569').fontSize(10).font('Helvetica').text(invoice.customerCompany, 50, 178);
    doc.fillColor('#64748b').fontSize(10).text(invoice.customerEmail, 50, 194);

    doc.fillColor('#64748b').fontSize(9).font('Helvetica-Bold').text('INVOICE DETAILS', 380, 145);
    doc.fillColor('#64748b').fontSize(9).font('Helvetica').text('Issue Date:', 380, 162);
    doc.fillColor('#0f172a').fontSize(9).text(new Date(invoice.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }), 460, 162);
    if (invoice.dueDate) {
      doc.fillColor('#64748b').fontSize(9).text('Due Date:', 380, 178);
      doc.fillColor('#ef4444').fontSize(9).text(new Date(invoice.dueDate).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }), 460, 178);
    }

    // Divider
    doc.moveTo(50, 225).lineTo(562, 225).strokeColor('#e2e8f0').lineWidth(1).stroke();

    // Table Header
    doc.rect(50, 235, 512, 28).fill('#f8fafc');
    doc.fillColor('#64748b').fontSize(9).font('Helvetica-Bold');
    doc.text('SERVICE DESCRIPTION', 60, 244);
    doc.text('QTY', 340, 244, { width: 50, align: 'center' });
    doc.text('UNIT PRICE', 390, 244, { width: 80, align: 'right' });
    doc.text('TOTAL', 470, 244, { width: 92, align: 'right' });

    // Table rows
    let y = 278;
    invoice.services.forEach((service, i) => {
      if (i % 2 === 0) doc.rect(50, y - 8, 512, 24).fill('#fafafa');
      doc.fillColor('#1e293b').fontSize(10).font('Helvetica').text(service.description, 60, y, { width: 270 });
      doc.text(service.quantity.toString(), 340, y, { width: 50, align: 'center' });
      doc.text(`PKR ${service.unitPrice.toLocaleString()}`, 390, y, { width: 80, align: 'right' });
      doc.text(`PKR ${(service.quantity * service.unitPrice).toLocaleString()}`, 470, y, { width: 92, align: 'right' });
      y += 30;
    });

    // Divider
    doc.moveTo(50, y + 5).lineTo(562, y + 5).strokeColor('#e2e8f0').lineWidth(1).stroke();
    y += 20;

    // Totals
    doc.fillColor('#64748b').fontSize(10).text('Subtotal:', 380, y);
    doc.fillColor('#1e293b').text(`PKR ${invoice.subtotal.toLocaleString()}`, 470, y, { width: 92, align: 'right' });
    y += 20;
    if (invoice.tax > 0) {
      doc.fillColor('#64748b').text('Tax:', 380, y);
      doc.fillColor('#1e293b').text(`PKR ${invoice.tax.toLocaleString()}`, 470, y, { width: 92, align: 'right' });
      y += 20;
    }

    doc.rect(370, y, 192, 32).fill('#0f172a');
    doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold').text('TOTAL DUE:', 380, y + 9);
    doc.text(`PKR ${invoice.total.toLocaleString()}`, 380, y + 9, { width: 172, align: 'right' });
    y += 50;

    if (invoice.notes) {
      doc.fillColor('#64748b').fontSize(9).font('Helvetica-Bold').text('NOTES', 50, y);
      doc.fillColor('#475569').fontSize(9).font('Helvetica').text(invoice.notes, 50, y + 14, { width: 400 });
      y += 50;
    }

    // Footer
    doc.rect(0, 770, 612, 72).fill('#f8fafc');
    doc.moveTo(0, 770).lineTo(612, 770).strokeColor('#e2e8f0').lineWidth(1).stroke();
    doc.fillColor('#94a3b8').fontSize(8).text('Thank you for your business | Nexus CRM — Air University Creative Technology | Generated on ' + new Date().toLocaleDateString(), 50, 792, { align: 'center', width: 512 });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error generating PDF' });
  }
});

// @DELETE /api/invoices/:id
router.delete('/:id', async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting invoice' });
  }
});

module.exports = router;

'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/lib/api';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    customerId: '', tax: 0, dueDate: '', notes: '', status: 'Draft',
    services: [{ description: '', quantity: 1, unitPrice: 0 }]
  });

  useEffect(() => {
    Promise.all([api.get('/invoices'), api.get('/customers?limit=100')])
      .then(([inv, cust]) => {
        setInvoices(inv.data.data);
        setCustomers(cust.data.data);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  const addService = () => setForm(f => ({ ...f, services: [...f.services, { description: '', quantity: 1, unitPrice: 0 }] }));
  const removeService = (i) => setForm(f => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }));
  const updateService = (i, k, v) => setForm(f => {
    const s = [...f.services];
    s[i] = { ...s[i], [k]: v };
    return { ...f, services: s };
  });

  const subtotal = form.services.reduce((s, item) => s + (Number(item.quantity) * Number(item.unitPrice)), 0);
  const taxAmt = (subtotal * form.tax) / 100;
  const total = subtotal + taxAmt;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.customerId) return toast.error('Please select a customer');
    if (form.services.some(s => !s.description || !s.unitPrice)) return toast.error('Fill all service fields');
    setSaving(true);
    try {
      const res = await api.post('/invoices', form);
      setInvoices(prev => [res.data.data, ...prev]);
      toast.success('Invoice created! 🎉');
      setShowForm(false);
      setForm({ customerId: '', tax: 0, dueDate: '', notes: '', status: 'Draft', services: [{ description: '', quantity: 1, unitPrice: 0 }] });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = async (invoice) => {
    try {
      const token = localStorage.getItem('crm_token');
      const res = await fetch(`http://localhost:5000/api/invoices/${invoice._id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `Invoice-${invoice.invoiceNumber}.pdf`;
      a.click(); URL.revokeObjectURL(url);
      toast.success('PDF downloaded!');
    } catch {
      toast.error('Failed to download PDF');
    }
  };

  const deleteInvoice = async (id) => {
    if (!confirm('Delete this invoice?')) return;
    await api.delete(`/invoices/${id}`);
    setInvoices(prev => prev.filter(i => i._id !== id));
    toast.success('Invoice deleted');
  };

  const statusColor = { Draft: '#64748b', Sent: '#3b82f6', Paid: '#10b981', Overdue: '#ef4444' };

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>Invoices</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>{invoices.length} invoice{invoices.length !== 1 ? 's' : ''} generated</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">🧾 Create Invoice</button>
      </div>

      {/* Invoice list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : invoices.length === 0 ? (
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧾</div>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>No invoices yet</p>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>Create your first invoice to get started</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {invoices.map(inv => (
            <div key={inv._id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', transition: 'border-color 0.2s' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🧾</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>{inv.invoiceNumber}</span>
                  <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: statusColor[inv.status] + '20', color: statusColor[inv.status], border: `1px solid ${statusColor[inv.status]}40` }}>
                    {inv.status}
                  </span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>{inv.customerName} · {inv.customerCompany}</div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '16px' }}>
                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '16px' }}>PKR {inv.total?.toLocaleString()}</div>
                <div style={{ color: '#475569', fontSize: '12px' }}>{new Date(inv.createdAt).toLocaleDateString()}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => downloadPDF(inv)} style={{ padding: '8px 14px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '9px', color: '#34d399', fontSize: '13px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                  ⬇ PDF
                </button>
                <button onClick={() => deleteInvoice(inv._id)} style={{ padding: '8px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '9px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Invoice Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 500, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px', overflowY: 'auto', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', width: '100%', maxWidth: '680px', marginTop: '20px' }}>
            {/* Modal Header */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>Create Invoice</h2>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>Generate a professional invoice for a customer</p>
              </div>
              <button onClick={() => setShowForm(false)} style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            <form onSubmit={handleCreate} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Customer + Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Customer *</label>
                  <select className="input-dark" value={form.customerId} onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))}>
                    <option value="">Select customer...</option>
                    {customers.map(c => <option key={c._id} value={c._id}>{c.name} — {c.company}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Status</label>
                  <select className="input-dark" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Tax (%)</label>
                  <input type="number" className="input-dark" min="0" max="100" value={form.tax} onChange={e => setForm(f => ({ ...f, tax: Number(e.target.value) }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Due Date</label>
                  <input type="date" className="input-dark" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
                </div>
              </div>

              {/* Services */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Services / Line Items</label>
                  <button type="button" onClick={addService} style={{ fontSize: '12px', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}>+ Add Line</button>
                </div>
                {form.services.map((svc, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 36px', gap: '8px', marginBottom: '8px' }}>
                    <input className="input-dark" placeholder="Service description" value={svc.description} onChange={e => updateService(i, 'description', e.target.value)} />
                    <input type="number" className="input-dark" placeholder="Qty" min="1" value={svc.quantity} onChange={e => updateService(i, 'quantity', e.target.value)} />
                    <input type="number" className="input-dark" placeholder="Unit Price" min="0" value={svc.unitPrice} onChange={e => updateService(i, 'unitPrice', e.target.value)} />
                    {form.services.length > 1 && (
                      <button type="button" onClick={() => removeService(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                    )}
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ background: 'rgba(30,41,59,0.5)', borderRadius: '12px', padding: '16px', border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b', fontSize: '13px' }}>Subtotal</span>
                  <span style={{ color: '#f1f5f9', fontSize: '13px' }}>PKR {subtotal.toLocaleString()}</span>
                </div>
                {form.tax > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>Tax ({form.tax}%)</span>
                    <span style={{ color: '#f1f5f9', fontSize: '13px' }}>PKR {taxAmt.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                  <span style={{ color: 'white', fontWeight: 700 }}>Total</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '16px' }}>PKR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Notes (optional)</label>
                <textarea className="input-dark" rows={2} placeholder="Payment terms, additional info..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
                <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '12px 28px' }}>
                  {saving ? 'Creating...' : '🧾 Create Invoice'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

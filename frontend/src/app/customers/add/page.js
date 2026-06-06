'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/lib/api';

const INITIAL = { name: '', email: '', phone: '', company: '', status: 'Lead', address: '', services: '', amount: '', notes: '' };

export default function AddCustomerPage() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company) {
      return toast.error('Name, email, phone and company are required');
    }
    setLoading(true);
    try {
      await api.post('/customers', { ...form, amount: Number(form.amount) || 0 });
      toast.success('Customer added successfully! 🎉');
      router.push('/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, name, type = 'text', placeholder, required }) => (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        className="input-dark"
        placeholder={placeholder}
        value={form[name]}
        onChange={e => set(name, e.target.value)}
      />
    </div>
  );

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '760px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <Link href="/customers" style={{ color: '#475569', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            ← Back to Customers
          </Link>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>Add New Customer</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Fill in the customer details below to create a new record.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#94a3b8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👤</span> Personal Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Full Name" name="name" placeholder="Muhammad Ali Hassan" required />
              <Field label="Email Address" name="email" type="email" placeholder="client@company.com" required />
              <Field label="Phone Number" name="phone" placeholder="0321-1234567" required />
              <Field label="Company" name="company" placeholder="Tech Solutions Pvt Ltd" required />
            </div>
          </div>

          {/* Business Info */}
          <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#94a3b8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💼</span> Business Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Status</label>
                <select
                  className="input-dark"
                  value={form.status}
                  onChange={e => set('status', e.target.value)}
                >
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <Field label="Contract Amount (PKR)" name="amount" type="number" placeholder="150000" />
              <Field label="Services" name="services" placeholder="Web Development, SEO" />
              <Field label="Address" name="address" placeholder="Gulshan-e-Iqbal, Karachi" />
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Notes</label>
              <textarea
                className="input-dark"
                placeholder="Any additional notes about this customer..."
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
              {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> Saving...</> : '💾 Save Customer'}
            </button>
            <Link href="/customers" className="btn-ghost" style={{ padding: '12px 20px', textDecoration: 'none' }}>Cancel</Link>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

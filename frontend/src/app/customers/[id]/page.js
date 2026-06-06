'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/lib/api';

export default function EditCustomerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/customers/${id}`)
      .then(res => setForm(res.data.data))
      .catch(() => { toast.error('Customer not found'); router.push('/customers'); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company) {
      return toast.error('Name, email, phone and company are required');
    }
    setSaving(true);
    try {
      await api.put(`/customers/${id}`, { ...form, amount: Number(form.amount) || 0 });
      toast.success('Customer updated successfully! ✅');
      router.push('/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </DashboardLayout>
  );

  if (!form) return null;

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '760px' }}>
        <div style={{ marginBottom: '28px' }}>
          <Link href="/customers" style={{ color: '#475569', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            ← Back to Customers
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: 'white' }}>
              {form.name.charAt(0)}
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>Edit Customer</h1>
              <p style={{ color: '#64748b', fontSize: '14px' }}>{form.name} · {form.company}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#94a3b8', marginBottom: '20px' }}>👤 Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Full Name', required: true },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'Email', required: true },
                { label: 'Phone', key: 'phone', placeholder: 'Phone', required: true },
                { label: 'Company', key: 'company', placeholder: 'Company', required: true },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
                    {f.label} {f.required && <span style={{ color: '#ef4444' }}>*</span>}
                  </label>
                  <input type={f.type || 'text'} className="input-dark" placeholder={f.placeholder} value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#94a3b8', marginBottom: '20px' }}>💼 Business Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Status</label>
                <select className="input-dark" value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Amount (PKR)</label>
                <input type="number" className="input-dark" value={form.amount || ''} onChange={e => set('amount', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Services</label>
                <input className="input-dark" value={form.services || ''} onChange={e => set('services', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Address</label>
                <input className="input-dark" value={form.address || ''} onChange={e => set('address', e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>Notes</label>
              <textarea className="input-dark" value={form.notes || ''} onChange={e => set('notes', e.target.value)} rows={3} style={{ resize: 'vertical' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
              {saving ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> Saving...</> : '✅ Update Customer'}
            </button>
            <Link href="/customers" className="btn-ghost" style={{ padding: '12px 20px', textDecoration: 'none' }}>Cancel</Link>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

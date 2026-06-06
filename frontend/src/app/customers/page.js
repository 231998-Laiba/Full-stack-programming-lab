'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/lib/api';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'All') params.set('status', statusFilter);
      params.set('limit', '50');
      const res = await api.get(`/customers?${params}`);
      setCustomers(res.data.data);
      setTotal(res.data.total);
    } catch (e) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(timer);
  }, [fetchCustomers]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      toast.success('Customer deleted');
      setDeleteId(null);
      fetchCustomers();
    } catch {
      toast.error('Failed to delete customer');
    }
  };

  const statusBadge = (status) => {
    const map = { Active: 'badge-active', Lead: 'badge-lead', Inactive: 'badge-inactive' };
    return <span className={`${map[status]} px-2.5 py-0.5 rounded-full text-xs font-medium`}>{status}</span>;
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>Customers</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>{total} total records</p>
        </div>
        <Link href="/customers/add" className="btn-primary">➕ Add Customer</Link>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '16px' }}>🔍</span>
          <input
            className="input-dark"
            style={{ paddingLeft: '38px' }}
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Active', 'Lead', 'Inactive'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: statusFilter === s ? '#3b82f6' : 'rgba(30,41,59,0.8)',
                color: statusFilter === s ? 'white' : '#94a3b8',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : customers.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#475569' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>👥</div>
            <p style={{ fontSize: '16px' }}>No customers found</p>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(30,41,59,0.6)' }}>
                  {['#', 'Customer', 'Company', 'Phone', 'Status', 'Services', 'Amount', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={c._id} className="table-row" style={{ borderTop: '1px solid rgba(30,41,59,0.5)' }}>
                    <td style={{ padding: '14px 16px', color: '#475569', fontSize: '13px' }}>{i + 1}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `hsl(${(i * 47) % 360}, 55%, 35%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#f1f5f9' }}>{c.name}</div>
                          <div style={{ fontSize: '12px', color: '#475569' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#94a3b8' }}>{c.company}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>{c.phone}</td>
                    <td style={{ padding: '14px 16px' }}>{statusBadge(c.status)}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b', maxWidth: '140px' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.services || '—'}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#f59e0b', fontWeight: 600 }}>
                      PKR {c.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => router.push(`/customers/${c._id}`)}
                          style={{ padding: '5px 10px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '7px', color: '#60a5fa', fontSize: '12px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                        >Edit</button>
                        <button
                          onClick={() => setDeleteId(c._id)}
                          style={{ padding: '5px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '7px', color: '#f87171', fontSize: '12px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Delete Customer?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>This action cannot be undone. The customer record will be permanently removed.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteId(null)} className="btn-ghost">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', fontFamily: 'Outfit, sans-serif' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

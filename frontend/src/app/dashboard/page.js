'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import Link from 'next/link';

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: color + '20', border: `1px solid ${color}30` }}>
          {icon}
        </div>
        {sub && <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>{sub}</span>}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '4px', letterSpacing: '-0.5px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#64748b' }}>{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, custRes] = await Promise.all([
          api.get('/customers/stats'),
          api.get('/customers?limit=5')
        ]);
        setStats(statsRes.data.data);
        setRecent(custRes.data.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const statusBadge = (status) => {
    const map = { Active: 'badge-active', Lead: 'badge-lead', Inactive: 'badge-inactive' };
    return (
      <span className={`${map[status]} px-2.5 py-0.5 rounded-full text-xs font-medium`}>{status}</span>
    );
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px', marginBottom: '4px' }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link href="/customers/add" className="btn-primary" style={{ padding: '10px 20px' }}>
            ➕ Add Customer
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon="👥" label="Total Customers" value={stats.total} color="#3b82f6" sub="All time" />
          <StatCard icon="✅" label="Active Clients" value={stats.active} color="#10b981" />
          <StatCard icon="🔵" label="Leads" value={stats.leads} color="#3b82f6" />
          <StatCard icon="💰" label="Total Revenue" value={`PKR ${(stats.revenue / 1000).toFixed(0)}K`} color="#f59e0b" sub="Estimated" />
        </div>
      )}

      {/* Recent Customers + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        {/* Recent customers table */}
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>Recent Customers</h2>
            <Link href="/customers" style={{ fontSize: '13px', color: '#3b82f6', textDecoration: 'none' }}>View all →</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(30,41,59,0.5)' }}>
                {['Name', 'Company', 'Status', 'Services'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((c, i) => (
                <tr key={c._id} className="table-row" style={{ borderTop: '1px solid #0f172a' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `hsl(${i * 60}, 60%, 35%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: 'white', flexShrink: 0 }}>
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#f1f5f9' }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: '#475569' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#94a3b8' }}>{c.company}</td>
                  <td style={{ padding: '14px 16px' }}>{statusBadge(c.status)}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{c.services || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick actions + status breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '14px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '➕', label: 'Add Customer', href: '/customers/add', color: '#3b82f6' },
                { icon: '📋', label: 'All Customers', href: '/customers', color: '#10b981' },
                { icon: '🧾', label: 'New Invoice', href: '/invoices', color: '#f59e0b' },
              ].map(a => (
                <Link key={a.href} href={a.href} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
                  borderRadius: '10px', background: a.color + '10', border: `1px solid ${a.color}20`,
                  textDecoration: 'none', transition: 'all 0.2s',
                  color: 'white', fontSize: '13px', fontWeight: 500
                }}>
                  <span style={{ fontSize: '16px' }}>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {stats && (
            <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '14px' }}>Customer Status</h2>
              {[
                { label: 'Active', value: stats.active, total: stats.total, color: '#10b981' },
                { label: 'Leads', value: stats.leads, total: stats.total, color: '#3b82f6' },
                { label: 'Inactive', value: stats.inactive, total: stats.total, color: '#64748b' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: item.color }}>{item.value}</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(item.value / item.total) * 100}%`, background: item.color, borderRadius: '3px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

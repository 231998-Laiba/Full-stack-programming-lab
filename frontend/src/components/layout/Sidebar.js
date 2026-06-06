'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';

const navItems = [
  { href: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { href: '/customers', icon: '👥', label: 'Customers' },
  { href: '/customers/add', icon: '➕', label: 'Add Customer' },
  { href: '/invoices', icon: '🧾', label: 'Invoices' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M4 8h24M4 16h16M4 24h20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="26" cy="24" r="4" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-white" style={{ fontSize: '16px', letterSpacing: '-0.3px' }}>Nexus CRM</div>
            <div className="text-xs" style={{ color: '#475569' }}>v1.0.0</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        <div className="text-xs font-semibold mb-2 px-2" style={{ color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Main Menu</div>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs truncate" style={{ color: '#475569' }}>{user?.email}</div>
          </div>
        </div>
        <button onClick={logout} className="sidebar-item w-full" style={{ color: '#ef4444' }}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

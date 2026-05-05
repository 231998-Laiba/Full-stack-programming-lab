import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';

/* ========== MY ACCOUNT ========== */
export function MyAccount() {
  const [activeSection, setActiveSection] = useState('orders');

  const orders = [
    { id: '#HS-10291', date: 'Mar 10, 2026', status: 'Shipped', total: '$4,899.00', items: 'Barrier Reef 158 Jet Super Spa' },
    { id: '#HS-09842', date: 'Jan 15, 2026', status: 'Delivered', total: '$1,899.00', items: 'Compact Retreat 4-Person Spa' },
  ];

  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: '📦' },
    { id: 'details', label: 'Account Details', icon: '👤' },
    { id: 'address', label: 'Address Book', icon: '📍' },
    { id: 'wishlist', label: 'My Wishlist', icon: '♡' },
  ];

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> My Account</div>
          <div className="page-title">My Account</div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px' }}>
            {/* SIDEBAR */}
            <div>
              <div style={{ border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                {menuItems.map(item => (
                  <button key={item.id} onClick={() => setActiveSection(item.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px',
                      border: 'none', borderBottom: '1px solid #e0e0e0', cursor: 'pointer', fontSize: '13px',
                      background: activeSection === item.id ? 'var(--red)' : '#fff',
                      color: activeSection === item.id ? '#fff' : '#333',
                      fontFamily: 'Oswald, sans-serif', fontWeight: 600, letterSpacing: '0.5px',
                    }}>
                    {item.icon} {item.label}
                  </button>
                ))}
                <Link to="/login" style={{ display: 'block', padding: '12px 16px', fontSize: '13px', color: '#cc0000', fontFamily: 'Oswald, sans-serif', fontWeight: 600, borderTop: '1px solid #e0e0e0' }}>
                  🚪 Sign Out
                </Link>
              </div>
            </div>

            {/* CONTENT */}
            <div className="content-box">
              {activeSection === 'orders' && (
                <>
                  <div className="form-section-title">My Orders</div>
                  {orders.length === 0 ? <p style={{ fontSize: '13px', color: '#888' }}>No orders found.</p> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr>
                          {['Order #', 'Date', 'Items', 'Status', 'Total', 'Action'].map(h => (
                            <th key={h} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 12px', textAlign: 'left', fontFamily: 'Oswald, sans-serif', fontSize: '12px' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '8px 12px', color: 'var(--link)' }}><a href="#order">{o.id}</a></td>
                            <td style={{ padding: '8px 12px' }}>{o.date}</td>
                            <td style={{ padding: '8px 12px' }}>{o.items}</td>
                            <td style={{ padding: '8px 12px' }}>
                              <span style={{ background: o.status === 'Delivered' ? '#d4edda' : '#fff3cd', color: o.status === 'Delivered' ? '#155724' : '#856404', padding: '2px 8px', borderRadius: '2px', fontSize: '11px', fontWeight: 600 }}>{o.status}</span>
                            </td>
                            <td style={{ padding: '8px 12px', fontWeight: 600 }}>{o.total}</td>
                            <td style={{ padding: '8px 12px' }}><a href="#details" style={{ fontSize: '12px' }}>View</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}

              {activeSection === 'details' && (
                <>
                  <div className="form-section-title">Account Details</div>
                  <div style={{ fontSize: '13px' }}>
                    {[['First Name', 'Jane'], ['Last Name', 'Doe'], ['Email', 'jane.doe@email.com'], ['Phone', '+1 (555) 000-1234']].map(([l, v]) => (
                      <div key={l} className="form-row" style={{ marginBottom: '10px' }}>
                        <label style={{ width: '120px', color: '#666' }}>{l}:</label>
                        <span style={{ color: '#222', fontWeight: 600 }}>{v}</span>
                      </div>
                    ))}
                    <button className="btn-primary" style={{ marginTop: '10px' }}>EDIT DETAILS</button>
                  </div>
                </>
              )}

              {activeSection === 'address' && (
                <>
                  <div className="form-section-title">Address Book</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {['Default Billing Address', 'Default Shipping Address'].map(type => (
                      <div key={type} style={{ border: '1px solid #e0e0e0', padding: '16px', background: '#f8f9fa' }}>
                        <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--red)', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'Oswald, sans-serif' }}>{type}</div>
                        <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.8 }}>Jane Doe<br />123 Main Street<br />Austin, TX 78701<br />USA</p>
                        <a href="#edit" style={{ fontSize: '12px', marginTop: '8px', display: 'inline-block' }}>Edit Address</a>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'wishlist' && (
                <>
                  <div className="form-section-title">My Wishlist</div>
                  <p style={{ fontSize: '13px', color: '#888' }}>Your wishlist is empty. <Link to="/products">Browse products</Link></p>
                </>
              )}
            </div>
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

/* ========== FORGOT PASSWORD ========== */
export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return; }
    setSent(true);
  };

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> <Link to="/login">Login</Link> <span>&gt;</span> Forgot Password</div>
          <div className="page-title">Forgot Your Password?</div>

          <div className="content-box" style={{ maxWidth: '500px' }}>
            {sent ? (
              <div className="alert alert-success">
                ✔ A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
              </div>
            ) : (
              <>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                  Enter your email address below and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <label htmlFor="reset-email">Email Address <em>*</em></label>
                    <input type="email" id="reset-email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                      className={error ? 'error' : ''} />
                  </div>
                  {error && <div className="field-error show">{error}</div>}
                  <div style={{ marginLeft: '150px', marginTop: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button type="submit" className="btn-primary">RESET PASSWORD</button>
                    <Link to="/login" style={{ fontSize: '13px' }}>Back to Login</Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

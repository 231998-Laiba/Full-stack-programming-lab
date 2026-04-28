import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/* ====== TOP BAR ====== */
export function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="support">Call for Customer support: <a href="tel:02038989565">020 38989565</a></div>
        <div className="top-links">
          <Link to="/my-account">My Account</Link>
          <a href="#wishlist">Wishlist</a>
          <Link to="/checkout">To Checkout</Link>
        </div>
      </div>
    </div>
  );
}

/* ====== HEADER ====== */
export function Header() {
  const { cartCount } = useCart();
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <span className="brand">HOTSPRING<sup style={{ fontSize: '14px' }}>®</sup></span>
          <span className="sub">Portable Spas</span>
        </Link>
        <Link to="/cart" className="header-cart" style={{ textDecoration: 'none', color: '#333' }}>
          <span className="cart-icon"><i className="fas fa-shopping-cart" /></span>
          My Cart: &nbsp;<strong><span className="cart-count">{cartCount}</span> Item(s)</strong>
          <i className="fas fa-chevron-down" style={{ fontSize: '11px', color: '#888' }} />
        </Link>
      </div>
    </header>
  );
}

/* ====== MAIN NAV ====== */
export function MainNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';
  return (
    <nav className="main-nav">
      <div className="container">
        <ul>
          <li><Link to="/" className={isActive('/')}>HOME</Link></li>
          <li><Link to="/products" className={isActive('/products')}>PRODUCTS</Link></li>
          <li><a href="#offers">SPECIAL OFFERS</a></li>
          <li><Link to="/contact" className={isActive('/contact')}>CUSTOM SERVICE</Link></li>
        </ul>
      </div>
    </nav>
  );
}

/* ====== SEARCH BAR ====== */
export function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search-bar">
      <div className="container">
        <div className="search-cats">
          <Link to="/products">CATEGORY</Link>
          <a href="#brand">BRAND</a>
          <a href="#info">INFO</a>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
          <button type="submit">SEARCH</button>
        </form>
      </div>
    </div>
  );
}

/* ====== FOOTER ====== */
export function Footer() {
  const [email, setEmail] = useState('');
  const [subMsg, setSubMsg] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubMsg('Please enter a valid email.');
      return;
    }
    setSubMsg('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Contact Us</h4>
            <p>yoursite.com<br />CALL 24/7: 888-201-8899<br />Your Address, Street<br />State &amp; Zip Code<br />City &amp; Country<br />Email: <a href="mailto:service@yoursite.com">service@yoursite.com</a></p>
            <div className="social-icons">
              <a className="social-icon" href="#tw">T</a>
              <a className="social-icon" href="#fb">f</a>
              <a className="social-icon" href="#li">in</a>
              <a className="social-icon" style={{ background: '#dd4b39' }} href="#g">G</a>
              <a className="social-icon" href="#yt">▶</a>
              <a className="social-icon" href="#pi">P</a>
            </div>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Customer Service</Link></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#sitemap">Site Map</a></li>
              <li><a href="#terms">Search Terms</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>My Account</h4>
            <ul>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/cart">View Cart</Link></li>
              <li><a href="#wishlist">My Wishlist</a></li>
            </ul>
          </div>
          <div>
            <h4>Sign Up For A Newsletter</h4>
            <p style={{ marginBottom: '8px', fontSize: '12px' }}>Sign up for our newsletter:</p>
            {subMsg && <p style={{ fontSize: '12px', color: subMsg.includes('Thank') ? '#4a9e4a' : '#cc0000', marginBottom: '6px' }}>{subMsg}</p>}
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit">GO</button>
            </form>
            <p style={{ marginTop: '10px', fontSize: '11px', color: '#888' }}>PAYMENT SOLUTIONS</p>
            <div className="payment-icons">
              <span className="pay-icon">VISA</span>
              <span className="pay-icon" style={{ color: '#1a4f9e', fontWeight: 900 }}>MC</span>
              <span className="pay-icon" style={{ color: '#2676be' }}>AMEX</span>
              <span className="pay-icon" style={{ color: '#0070ba' }}>PayPal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2024 HotSpring Portable Spas. All Rights Reserved.</div>
    </footer>
  );
}

/* ====== RELATED PRODUCTS CAROUSEL ====== */
const relatedProducts = [
  { id: 10, emoji: '🛁', price: '$2,549.15', name: 'Barrier Reef Deluxe Spa' },
  { id: 11, emoji: '🛁', price: '$3,199.00', name: 'Summit 6-Person Hot Tub' },
  { id: 12, emoji: '🛁', price: '$1,899.00', name: 'Compact Retreat Spa' },
  { id: 13, emoji: '🛁', price: '$4,100.00', name: 'ProSeries Therapeutic Spa' },
  { id: 14, emoji: '🛁', price: '$2,299.00', name: 'EcoWave Outdoor Spa' },
];

export function RelatedCarousel() {
  const [pos, setPos] = useState(0);
  const visible = 3;
  const max = relatedProducts.length - visible;

  return (
    <div className="related-products">
      <h3>Customers Who Viewed This Item Also Viewed</h3>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button className="carousel-btn" onClick={() => setPos(p => Math.max(0, p - 1))} disabled={pos === 0}>&lt;</button>
        <div className="carousel-wrapper" style={{ flex: 1, overflow: 'hidden' }}>
          <div className="carousel-track" style={{ transform: `translateX(-${pos * 192}px)` }}>
            {relatedProducts.map(p => (
              <div className="carousel-item" key={p.id}>
                <div className="ci-img">{p.emoji}</div>
                <div className="ci-price">{p.price}</div>
                <div className="ci-name">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn" onClick={() => setPos(p => Math.min(max, p + 1))} disabled={pos >= max}>&gt;</button>
      </div>
    </div>
  );
}

/* ====== PAGE WRAPPER ====== */
export function PageWrapper({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <MainNav />
      <SearchBar />
      {children}
      <Footer />
    </>
  );
}

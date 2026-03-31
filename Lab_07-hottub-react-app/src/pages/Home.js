import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/Layout';
import { useCart } from '../context/CartContext';

const slides = [
  {
    title: 'Barrier Reef 158 Jet\nTV-Stereo – Home Theater\nSuper Spa',
    desc: 'Extra Large and Deep. 8 Person. 158 Jet Super Spa, TV-Home Theater Spa System.',
    price: '$4,899.00',
    link: '/products/1',
  },
  {
    title: 'Summit Series\n6-Person Hot Tub\nTherapeutic Design',
    desc: 'Designed for full-body relaxation. 82 jets, LED mood lighting, and WiFi control.',
    price: '$3,199.00',
    link: '/products/2',
  },
  {
    title: 'Compact Retreat\nPortable Spa\nPerfect for Any Backyard',
    desc: 'Lightweight, energy-efficient, and easy to install. 4-person comfort.',
    price: '$1,899.00',
    link: '/products/3',
  },
];

const featuredProducts = [
  { id: 1, emoji: '🛁', name: 'Barrier Reef 158 Jet Super Spa', price: 4899.00, badge: 'HOT' },
  { id: 2, emoji: '🛁', name: 'Summit 82 Jet Therapy Tub', price: 3199.00, badge: 'NEW' },
  { id: 3, emoji: '🛁', name: 'Compact Retreat 4-Person', price: 1899.00, badge: null },
  { id: 4, emoji: '🛁', name: 'ProSeries Duo Spa', price: 4100.00, badge: 'SALE' },
  { id: 5, emoji: '🛁', name: 'EcoWave Outdoor Hot Tub', price: 2299.00, badge: null },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <PageWrapper>
      {/* HERO SLIDER */}
      <div className="hero-slider">
        {slides.map((slide, i) => (
          <div className={`slide${i === current ? ' active' : ''}`} key={i}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', minHeight: '320px' }}>
              <div className="slide-content" style={{ zIndex: 2 }}>
                <h2>{slide.title.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}</h2>
                <p>{slide.desc}</p>
                <div className="price">{slide.price}</div>
                <Link to={slide.link} className="btn-primary">More Details</Link>
              </div>
              <div style={{ position: 'absolute', right: '80px', bottom: 0, zIndex: 1, opacity: 0.9 }}>
                <div style={{ width: '340px', height: '260px', background: 'linear-gradient(135deg,#a8c8e0,#7aaabf)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>🛁</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="page-content">
        <div className="container">
          <div className="section-title">Featured Products</div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <div className="product-card" key={product.id}>
                {product.badge && (
                  <span style={{ background: product.badge === 'SALE' ? '#4a9e4a' : 'var(--red)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '2px', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}>
                    {product.badge}
                  </span>
                )}
                <div className="prod-img">{product.emoji}</div>
                <div className="prod-name">{product.name}</div>
                <div className="prod-price">${product.price.toFixed(2)}</div>
                <div className="prod-actions">
                  <Link to={`/products/${product.id}`} className="btn-outline" style={{ fontSize: '11px', padding: '5px 10px' }}>Details</Link>
                  <button
                    className="btn-primary"
                    style={{ fontSize: '11px', padding: '5px 10px' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    {added === product.id ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BANNER SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            <div style={{ background: 'linear-gradient(135deg, #1a2535 0%, #2a3f5a 100%)', color: '#fff', padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '50px' }}>🌊</div>
              <div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: 700, letterSpacing: '1px' }}>FREE DELIVERY</div>
                <div style={{ fontSize: '12px', color: '#aac4d4', marginTop: '4px' }}>On orders over $2,000</div>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #cc0000 0%, #a00000 100%)', color: '#fff', padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '50px' }}>🔧</div>
              <div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: 700, letterSpacing: '1px' }}>INSTALLATION</div>
                <div style={{ fontSize: '12px', color: '#ffaaaa', marginTop: '4px' }}>Professional setup available</div>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="section-title" style={{ marginTop: '40px' }}>Why Choose HotSpring?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
            {[
              { icon: '⭐', title: '25+ Years Experience', desc: 'Trusted by thousands of families worldwide for quality and comfort.' },
              { icon: '🛡️', title: '5-Year Warranty', desc: 'All products come with comprehensive 5-year parts and labor warranty.' },
              { icon: '📞', title: '24/7 Support', desc: 'Our dedicated team is always ready to assist you anytime.' },
            ].map((f, i) => (
              <div key={i} style={{ padding: '24px', background: '#f8f9fa', border: '1px solid #e0e0e0', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>{f.icon}</div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</div>
                <p style={{ fontSize: '13px', color: '#666' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

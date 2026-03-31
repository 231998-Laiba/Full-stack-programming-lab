import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';
import { useCart } from '../context/CartContext';

const products = {
  1: {
    name: 'Barrier Reef 158 Jet Super Spa',
    price: 4899.00,
    emoji: '🛁',
    persons: 8,
    jets: 158,
    desc: 'Extra Large and Deep. 8 Person. 158 Jet Super Spa, TV-Home Theater Spa System. Includes built-in LED lighting, WiFi controls, and Bluetooth audio.',
    features: ['158 Hydrotherapy Jets', '8-Person Capacity', 'TV / Home Theater System', 'Bluetooth Audio', 'LED Mood Lighting', 'WiFi Smart Controls', '5-Year Warranty'],
    specs: { Dimensions: '94" x 94" x 38"', Weight: '900 lbs (dry)', 'Water Capacity': '450 gallons', Voltage: '240V/60Hz', 'Pump Power': '5 HP', 'Heating': 'Electric 5.5 kW' },
  },
  2: {
    name: 'Summit 82 Jet Therapy Tub',
    price: 3199.00,
    emoji: '🛁',
    persons: 6,
    jets: 82,
    desc: 'Therapeutic 6-person spa with 82 targeted hydrotherapy jets for deep tissue relief. Energy-efficient and whisper-quiet.',
    features: ['82 Therapeutic Jets', '6-Person Capacity', 'Energy-Efficient Insulation', 'Waterfall Feature', 'LED Lighting', 'Ozone Purification', '5-Year Warranty'],
    specs: { Dimensions: '84" x 84" x 36"', Weight: '780 lbs (dry)', 'Water Capacity': '380 gallons', Voltage: '240V/60Hz', 'Pump Power': '4 HP', 'Heating': 'Electric 4 kW' },
  },
  3: {
    name: 'Compact Retreat 4-Person Spa',
    price: 1899.00,
    emoji: '🛁',
    persons: 4,
    jets: 40,
    desc: 'Lightweight portable spa, perfect for smaller backyards. Easy installation, energy efficient, and built for year-round use.',
    features: ['40 Jets', '4-Person Capacity', 'Portable Design', 'Hard Cover Included', 'Freeze Protection', 'Simple Setup', '3-Year Warranty'],
    specs: { Dimensions: '72" x 72" x 30"', Weight: '520 lbs (dry)', 'Water Capacity': '220 gallons', Voltage: '120V/240V', 'Pump Power': '2.5 HP', 'Heating': 'Electric 3 kW' },
  },
};

const defaultProduct = {
  name: 'ProSeries Duo Spa',
  price: 4100.00,
  emoji: '🛁',
  persons: 2,
  jets: 60,
  desc: 'Intimate 2-person spa with 60 precision jets. Perfect for couples seeking relaxation and hydrotherapy.',
  features: ['60 Jets', '2-Person Capacity', 'Romantic Design', 'LED Lighting', 'Waterfall Feature', '5-Year Warranty'],
  specs: { Dimensions: '64" x 64" x 34"', Weight: '600 lbs (dry)', 'Water Capacity': '180 gallons', Voltage: '240V/60Hz', 'Pump Power': '3 HP', 'Heating': 'Electric 4 kW' },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products[id] || defaultProduct;

  const [activeTab, setActiveTab] = useState('description');
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const thumbs = ['🛁', '🌊', '💧', '✨'];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart({ id: Number(id) || 4, name: product.name, price: product.price, emoji: product.emoji });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span>
            <Link to="/products"> Products</Link> <span>&gt;</span> {product.name}
          </div>
          <div className="page-title">{product.name}</div>

          <div className="content-box">
            <div className="prod-detail-grid">
              {/* GALLERY */}
              <div>
                <div className="prod-gallery">
                  <div className="main-img">{thumbs[activeThumb]}</div>
                </div>
                <div className="prod-thumbnails">
                  {thumbs.map((t, i) => (
                    <div key={i} className={`thumb-box${i === activeThumb ? ' active' : ''}`} onClick={() => setActiveThumb(i)}>{t}</div>
                  ))}
                </div>
              </div>

              {/* INFO */}
              <div className="prod-info">
                <div className="prod-title">{product.name}</div>
                <div className="prod-price-detail">${product.price.toFixed(2)}</div>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>{product.desc}</p>

                <ul className="prod-features">
                  {product.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <label style={{ fontSize: '13px' }}>Qty:</label>
                  <select value={qty} onChange={e => setQty(Number(e.target.value))}
                    style={{ padding: '6px 10px', border: '1px solid #ccc', fontSize: '13px' }}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={handleAdd}>
                    {added ? '✓ Added to Cart!' : 'ADD TO CART'}
                  </button>
                  <button className="btn-outline" onClick={() => navigate('/checkout')}>BUY NOW</button>
                  <button className="btn-outline">♡ WISHLIST</button>
                </div>

                <div style={{ marginTop: '16px', padding: '12px', background: '#f0f4f0', border: '1px solid #c3e6cb', borderRadius: '2px', fontSize: '12px', color: '#155724' }}>
                  ✔ In Stock — Usually ships within 5–7 business days
                </div>
              </div>
            </div>

            {/* TABS */}
            <div style={{ marginTop: '30px' }}>
              <div className="tabs-nav">
                {['description', 'specifications', 'reviews'].map(tab => (
                  <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className={`tab-content${activeTab === 'description' ? ' active' : ''}`} style={{ display: activeTab === 'description' ? 'block' : 'none' }}>
                <p style={{ marginBottom: '12px' }}>{product.desc}</p>
                <p>Our hot tubs are built with premium-grade acrylic shells, high-density foam insulation, and energy-efficient pumps. Each unit is pressure-tested and quality-inspected before delivery.</p>
              </div>

              <div className={`tab-content${activeTab === 'specifications' ? ' active' : ''}`} style={{ display: activeTab === 'specifications' ? 'block' : 'none' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ padding: '8px 12px', background: '#f0f2f4', fontWeight: 600, width: '180px', border: '1px solid #e0e0e0' }}>{k}</td>
                        <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={`tab-content${activeTab === 'reviews' ? ' active' : ''}`} style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
                {[
                  { name: 'Sarah M.', rating: 5, comment: 'Absolutely love this hot tub! Best purchase we\'ve ever made for our backyard.' },
                  { name: 'James T.', rating: 4, comment: 'Great quality and very easy to set up. The jets are powerful and relaxing.' },
                ].map((r, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '13px' }}>{r.name}</strong>
                      <span style={{ color: '#f5a623' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#555' }}>{r.comment}</p>
                  </div>
                ))}
                <button className="btn-outline" style={{ fontSize: '12px', marginTop: '8px' }}>Write a Review</button>
              </div>
            </div>
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

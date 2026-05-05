import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';

export default function About() {
  return (
    <PageWrapper>
      <div className="about-hero">
        <h1>ABOUT HOTSPRING</h1>
        <p>Your trusted partner in relaxation since 1998</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> About Us</div>

          <div className="content-box" style={{ marginBottom: '24px' }}>
            <div className="form-section-title">Our Story</div>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#555', marginBottom: '12px' }}>
              Founded in 1998, HotSpring Portable Spas has grown from a small family business into one of the most trusted names in the hot tub industry. We believe that relaxation and hydrotherapy should be accessible to every family, and that's why we offer a wide range of high-quality portable spas at competitive prices.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#555' }}>
              Our spas are designed and engineered with the latest technology to provide maximum comfort, energy efficiency, and durability. Each unit undergoes rigorous quality control testing before leaving our facility, ensuring that you receive a product that will serve your family for years to come.
            </p>
          </div>

          <div className="about-stats">
            {[
              { num: '25+', label: 'Years in Business' },
              { num: '50,000+', label: 'Happy Customers' },
              { num: '200+', label: 'Spa Models' },
              { num: '98%', label: 'Satisfaction Rate' },
            ].map(stat => (
              <div className="stat-box" key={stat.label}>
                <div className="stat-num">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '30px' }}>
            <div className="content-box">
              <div className="form-section-title">Our Mission</div>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                To provide every family with the ultimate relaxation experience through premium quality hot tubs and unparalleled customer service. We are committed to sustainability, innovation, and making hydrotherapy accessible to all.
              </p>
            </div>
            <div className="content-box">
              <div className="form-section-title">Our Values</div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: '#555' }}>
                {['Quality above everything else', 'Customer satisfaction is our priority', 'Continuous innovation and improvement', 'Environmental responsibility', 'Transparency and integrity'].map(v => (
                  <li key={v} style={{ padding: '4px 0' }}>✔ {v}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-section-title" style={{ borderBottom: '2px solid var(--red)', paddingBottom: '8px' }}>Why Choose Us?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '20px 0 30px' }}>
            {[
              { icon: '🏆', title: 'Award-Winning Products', desc: 'Recognized by industry experts for innovation and quality since 2005.' },
              { icon: '🚚', title: 'Nationwide Delivery', desc: 'We deliver to all 50 states with white-glove delivery service available.' },
              { icon: '🔧', title: 'Expert Installation', desc: 'Our certified technicians ensure your spa is set up perfectly.' },
              { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer service from our dedicated team.' },
              { icon: '♻️', title: 'Eco-Friendly', desc: 'All spas are built with energy-efficient systems and eco-friendly materials.' },
              { icon: '💳', title: 'Flexible Financing', desc: '0% APR financing available on all models. Apply in minutes.' },
            ].map(f => (
              <div key={f.title} style={{ padding: '20px', border: '1px solid #e0e0e0', background: '#f8f9fa' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{f.icon}</div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</div>
                <p style={{ fontSize: '12px', color: '#666' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

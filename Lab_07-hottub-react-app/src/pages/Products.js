import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/Layout';
import { useCart } from '../context/CartContext';

const allProducts = [
  { id: 1, emoji: '🛁', name: 'Barrier Reef 158 Jet Super Spa', price: 4899.00, brand: 'Barrier Reef', type: 'Hot Tub', persons: 8 },
  { id: 2, emoji: '🛁', name: 'Summit 82 Jet Therapy Tub', price: 3199.00, brand: 'Summit', type: 'Hot Tub', persons: 6 },
  { id: 3, emoji: '🛁', name: 'Compact Retreat 4-Person Spa', price: 1899.00, brand: 'Retreat', type: 'Portable Spa', persons: 4 },
  { id: 4, emoji: '🛁', name: 'ProSeries Duo Spa', price: 4100.00, brand: 'ProSeries', type: 'Hot Tub', persons: 2 },
  { id: 5, emoji: '🛁', name: 'EcoWave Outdoor Hot Tub', price: 2299.00, brand: 'EcoWave', type: 'Portable Spa', persons: 5 },
  { id: 6, emoji: '🛁', name: 'AquaLux Premium 7-Seater', price: 5599.00, brand: 'AquaLux', type: 'Hot Tub', persons: 7 },
];

const brands = ['Barrier Reef', 'Summit', 'Retreat', 'ProSeries', 'EcoWave', 'AquaLux'];
const types = ['Hot Tub', 'Portable Spa'];

export default function Products() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  let filtered = allProducts.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBrand = !selectedBrand || p.brand === selectedBrand;
    const matchType = !selectedType || p.type === selectedType;
    return matchSearch && matchBrand && matchType;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> Products</div>
          <div className="page-title">Hot Tubs & Portable Spas{searchQuery && ` — Search: "${searchQuery}"`}</div>

          <div className="category-layout">
            {/* SIDEBAR */}
            <div className="sidebar-filter">
              <h4>Brand</h4>
              <ul>
                <li>
                  <a href="#all" onClick={e => { e.preventDefault(); setSelectedBrand(''); }}
                    style={{ color: !selectedBrand ? 'var(--red)' : undefined }}>All Brands</a>
                </li>
                {brands.map(b => (
                  <li key={b}>
                    <a href="#brand" onClick={e => { e.preventDefault(); setSelectedBrand(b); }}
                      style={{ color: selectedBrand === b ? 'var(--red)' : undefined }}>{b}</a>
                  </li>
                ))}
              </ul>

              <h4>Type</h4>
              <ul>
                <li>
                  <a href="#all" onClick={e => { e.preventDefault(); setSelectedType(''); }}
                    style={{ color: !selectedType ? 'var(--red)' : undefined }}>All Types</a>
                </li>
                {types.map(t => (
                  <li key={t}>
                    <a href="#type" onClick={e => { e.preventDefault(); setSelectedType(t); }}
                      style={{ color: selectedType === t ? 'var(--red)' : undefined }}>{t}</a>
                  </li>
                ))}
              </ul>

              <h4>Price Range</h4>
              <ul>
                {['Under $2,000', '$2,000 – $3,500', '$3,500 – $5,000', 'Over $5,000'].map(r => (
                  <li key={r}><a href="#price">{r}</a></li>
                ))}
              </ul>
            </div>

            {/* PRODUCTS */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: '#888' }}>{filtered.length} item(s) found</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding: '6px 10px', border: '1px solid #ccc', fontSize: '13px' }}>
                  <option value="default">Sort By: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                  No products found. <a href="#clear" onClick={e => { e.preventDefault(); setSelectedBrand(''); setSelectedType(''); }}>Clear filters</a>
                </div>
              )}

              <div className="product-grid">
                {filtered.map(product => (
                  <div className="product-card" key={product.id}>
                    <div className="prod-img">{product.emoji}</div>
                    <div className="prod-name">{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{product.type} · {product.persons} persons</div>
                    <div className="prod-price">${product.price.toFixed(2)}</div>
                    <div className="prod-actions">
                      <Link to={`/products/${product.id}`} className="btn-outline" style={{ fontSize: '11px', padding: '5px 10px' }}>Details</Link>
                      <button className="btn-primary" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => handleAdd(product)}>
                        {addedId === product.id ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

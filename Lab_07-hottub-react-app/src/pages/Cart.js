import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> Shopping Cart</div>
          <div className="page-title">Shopping Cart</div>

          <div className="content-box">
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                <div style={{ fontSize: '50px', marginBottom: '12px' }}>🛁</div>
                <p>Your cart is empty. <Link to="/products">Continue Shopping</Link></p>
              </div>
            ) : (
              <>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id} className="cart-row">
                        <td style={{ fontSize: '28px', width: '50px' }}>{item.emoji || '🛁'}</td>
                        <td>
                          <Link to={`/products/${item.id}`} style={{ fontWeight: 600, color: '#0066cc' }}>{item.name}</Link>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <select
                            className="qty-select"
                            value={item.qty}
                            onChange={e => updateQty(item.id, Number(e.target.value))}
                          >
                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>
                        <td><strong>${(item.price * item.qty).toFixed(2)}</strong></td>
                        <td>
                          <button className="remove-item" onClick={() => removeFromCart(item.id)} title="Remove item">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <Link to="/products" className="btn-outline">← Continue Shopping</Link>
                  </div>
                  <div className="cart-summary">
                    <table>
                      <tbody>
                        <tr>
                          <td>Subtotal:</td>
                          <td style={{ textAlign: 'right' }}>${cartTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Shipping:</td>
                          <td style={{ textAlign: 'right' }}>
                            {cartTotal >= 2000
                              ? <span style={{ color: '#4a9e4a', fontWeight: 600 }}>FREE</span>
                              : '$149.00'}
                          </td>
                        </tr>
                        <tr style={{ borderTop: '2px solid #e0e0e0' }}>
                          <td style={{ paddingTop: '8px', fontWeight: 700 }}>Total:</td>
                          <td style={{ textAlign: 'right', paddingTop: '8px' }}>
                            <span className="cart-total-amount">
                              ${(cartTotal >= 2000 ? cartTotal : cartTotal + 149).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {cartTotal >= 2000 && (
                      <div style={{ fontSize: '11px', color: '#4a9e4a', marginTop: '6px' }}>✔ You qualify for free shipping!</div>
                    )}
                    <Link to="/checkout" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

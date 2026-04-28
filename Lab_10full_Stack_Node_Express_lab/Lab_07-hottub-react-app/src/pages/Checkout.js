import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/Layout';
import { useCart } from '../context/CartContext';

function validateCheckout(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email is required.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  if (!form.address.trim()) errors.address = 'Address is required.';
  if (!form.city.trim()) errors.city = 'City is required.';
  if (!form.zip.trim()) errors.zip = 'ZIP code is required.';
  if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Valid 16-digit card number required.';
  if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = 'Use MM/YY format.';
  if (!form.cvv || form.cvv.length < 3) errors.cvv = 'CVV must be 3–4 digits.';
  return errors;
}

function formatCard(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
    sameAsBilling: true,
  });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') value = formatCard(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleNext = () => {
    const stepFields = step === 1
      ? ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zip']
      : ['cardNumber', 'expiry', 'cvv'];
    const errs = validateCheckout(form);
    const stepErrors = {};
    stepFields.forEach(f => { if (errs[f]) stepErrors[f] = errs[f]; });
    if (Object.keys(stepErrors).length) { setErrors(stepErrors); return; }
    setStep(s => s + 1);
  };

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => navigate('/'), 3000);
  };

  const shipping = cartTotal >= 2000 ? 0 : 149;

  if (ordered) return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '70px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', marginBottom: '10px' }}>Order Placed Successfully!</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Thank you for your order. You will receive a confirmation email shortly.</p>
            <p style={{ fontSize: '13px', color: '#888' }}>Redirecting to homepage...</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );

  const Field = ({ name, label, type = 'text', placeholder }) => (
    <div className="form-row">
      <label htmlFor={name}>{label} <em>*</em></label>
      <input type={type} id={name} name={name} value={form[name]} onChange={handleChange}
        placeholder={placeholder} className={errors[name] ? 'error' : ''} />
      {errors[name] && <span style={{ color: 'var(--red)', fontSize: '11px', marginLeft: '4px' }}>{errors[name]}</span>}
    </div>
  );

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> <Link to="/cart">Cart</Link> <span>&gt;</span> Checkout</div>
          <div className="page-title">Secure Checkout</div>

          {/* STEP INDICATOR */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '24px' }}>
            {['Shipping', 'Payment', 'Review'].map((s, i) => (
              <div key={s} style={{ flex: 1, textAlign: 'center', padding: '10px', background: step === i + 1 ? 'var(--red)' : step > i + 1 ? '#4a9e4a' : '#e0e4e8', color: step >= i + 1 ? '#fff' : '#888', fontFamily: 'Oswald, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px' }}>
                {step > i + 1 ? '✓ ' : `${i + 1}. `}{s}
              </div>
            ))}
          </div>

          <div className="checkout-grid">
            {/* FORM */}
            <div className="content-box">
              {step === 1 && (
                <>
                  <div className="form-section-title">Shipping Information</div>
                  <p className="required-note"><em>*</em> Required Fields</p>
                  <Field name="firstName" label="First Name" />
                  <Field name="lastName" label="Last Name" />
                  <Field name="email" label="Email" type="email" />
                  <Field name="phone" label="Phone" type="tel" />
                  <Field name="address" label="Address" placeholder="Street address" />
                  <Field name="city" label="City" />
                  <div className="form-row">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={form.state} onChange={handleChange} placeholder="State / Province" style={{ flex: 1, border: '1px solid #ccc', padding: '6px 10px', fontSize: '13px' }} />
                  </div>
                  <Field name="zip" label="ZIP Code" />
                  <div style={{ marginLeft: '150px', marginTop: '16px' }}>
                    <button className="btn-primary" onClick={handleNext}>CONTINUE TO PAYMENT →</button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-section-title">Payment Information</div>
                  <div style={{ marginBottom: '14px' }}>
                    <div className="payment-icons" style={{ marginBottom: '10px' }}>
                      <span className="pay-icon" style={{ background: '#1a1f71', color: '#fff' }}>VISA</span>
                      <span className="pay-icon" style={{ background: '#eb001b', color: '#fff' }}>MC</span>
                      <span className="pay-icon" style={{ background: '#2676be', color: '#fff' }}>AMEX</span>
                      <span className="pay-icon" style={{ background: '#003087', color: '#fff' }}>PayPal</span>
                    </div>
                  </div>
                  <Field name="nameOnCard" label="Name on Card" />
                  <Field name="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" />
                  <Field name="expiry" label="Expiry Date" placeholder="MM/YY" />
                  <Field name="cvv" label="CVV" placeholder="3-4 digits" />
                  <div style={{ marginLeft: '150px', marginTop: '16px', display: 'flex', gap: '12px' }}>
                    <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn-primary" onClick={handleNext}>REVIEW ORDER →</button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="form-section-title">Review Your Order</div>
                  <div style={{ fontSize: '13px', color: '#555', marginBottom: '16px' }}>
                    <p><strong>Shipping to:</strong> {form.firstName} {form.lastName}, {form.address}, {form.city}, {form.zip}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Payment:</strong> •••• •••• •••• {form.cardNumber.slice(-4)}</p>
                  </div>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
                      <span>{item.emoji || '🛁'} {item.name} × {item.qty}</span>
                      <strong>${(item.price * item.qty).toFixed(2)}</strong>
                    </div>
                  ))}
                  <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                    <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                    <button className="btn-primary" onClick={handleOrder}>PLACE ORDER ✓</button>
                  </div>
                </>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <div className="content-box">
                <div className="form-section-title">Order Summary</div>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', borderBottom: '1px solid #eee' }}>
                    <span style={{ color: '#555' }}>{item.name} × {item.qty}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '4px' }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span style={{ color: '#4a9e4a' }}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700, marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #e0e0e0' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--red)', fontFamily: 'Oswald, sans-serif', fontSize: '20px' }}>${(cartTotal + shipping).toFixed(2)}</span>
                </div>
                <div style={{ marginTop: '14px', fontSize: '11px', color: '#888', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  🔒 Your information is secured with 256-bit SSL encryption.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

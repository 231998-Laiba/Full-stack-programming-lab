import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';

function validate(email, password) {
  const errors = {};
  if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Please enter a valid email address.';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form.email, form.password);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess('Login successful! Redirecting...');
    setTimeout(() => navigate('/my-account'), 1200);
  };

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> My Account</div>
          <div className="page-title">Login Or Create Account</div>

          {success && <div className="alert alert-success">{success}</div>}

          <div className="content-box">
            <div className="login-grid">
              {/* LOGIN FORM */}
              <div className="login-col">
                <div className="form-section-title">User Login Details</div>
                <p className="form-subtitle">Please sign in below with your login information.</p>
                <p className="required-note"><em>*</em> Required Fields</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <label htmlFor="email">Email <em>*</em></label>
                    <input
                      type="email" id="email" name="email" value={form.email}
                      onChange={handleChange} className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <div className="field-error show">{errors.email}</div>}

                  <div className="form-row">
                    <label htmlFor="password">Password <em>*</em></label>
                    <input
                      type="password" id="password" name="password" value={form.password}
                      onChange={handleChange} className={errors.password ? 'error' : ''}
                    />
                  </div>
                  {errors.password && <div className="field-error show">{errors.password}</div>}

                  <div className="form-check" style={{ marginLeft: '150px', marginTop: '10px' }}>
                    <input type="checkbox" id="remember" name="remember" checked={form.remember} onChange={handleChange} />
                    <label htmlFor="remember">Remember me the next time I visit</label>
                  </div>
                  <div style={{ marginLeft: '150px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button type="submit" className="btn-primary">SIGN IN</button>
                    <Link to="/forgot-password" style={{ fontSize: '13px' }}>Forgot your password?</Link>
                  </div>
                </form>
              </div>

              {/* NEW CUSTOMER */}
              <div className="login-col">
                <div className="form-section-title">New Customer</div>
                <p className="form-subtitle" style={{ marginBottom: '12px' }}>As a registered customer you can:</p>
                <ul className="new-customer-perks">
                  <li>Store billing &amp; shipping information</li>
                  <li>Check your order status</li>
                  <li>Track your delivery Status</li>
                  <li>View your order history</li>
                </ul>
                <Link to="/register" className="btn-primary">CREATE NEW ACCOUNT</Link>
              </div>
            </div>
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Please enter a valid email address.';
  if (!form.password || form.password.length < 6) errors.password = 'Password must be at least 6 characters.';
  if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', newsletter: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => navigate('/login'), 1500);
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  ];

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> Create Account</div>
          <div className="page-title">Create New Account</div>

          {success && <div className="alert alert-success">{success}</div>}

          <div className="content-box">
            <div className="form-section-title">Personal Information</div>
            <p className="required-note"><em>*</em> Required Fields</p>
            <form onSubmit={handleSubmit} noValidate style={{ maxWidth: '560px' }}>
              {fields.map(field => (
                <React.Fragment key={field.name}>
                  <div className="form-row">
                    <label htmlFor={field.name}>{field.label} {field.required && <em>*</em>}</label>
                    <input
                      type={field.type} id={field.name} name={field.name}
                      value={form[field.name]} onChange={handleChange}
                      className={errors[field.name] ? 'error' : ''}
                    />
                  </div>
                  {errors[field.name] && <div className="field-error show">{errors[field.name]}</div>}
                </React.Fragment>
              ))}
              <div className="form-check" style={{ marginLeft: '150px', marginTop: '10px' }}>
                <input type="checkbox" id="newsletter" name="newsletter" checked={form.newsletter} onChange={handleChange} />
                <label htmlFor="newsletter">Subscribe to our newsletter</label>
              </div>
              <div style={{ marginLeft: '150px', marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button type="submit" className="btn-primary">CREATE ACCOUNT</button>
                <Link to="/login" style={{ fontSize: '13px' }}>Already have an account? Sign In</Link>
              </div>
            </form>
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

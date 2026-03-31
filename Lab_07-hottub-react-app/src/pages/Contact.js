import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper, RelatedCarousel } from '../components/Layout';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email is required.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim() || form.message.length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <PageWrapper>
      <div className="page-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> <span>&gt;</span> Contact Us</div>
          <div className="page-title">Contact Us / Customer Service</div>

          {success && <div className="alert alert-success">✔ Your message has been sent! We'll get back to you within 24 hours.</div>}

          <div className="content-box">
            <div className="contact-grid">
              {/* FORM */}
              <div>
                <div className="form-section-title">Send Us a Message</div>
                <form onSubmit={handleSubmit} noValidate>
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', required: true },
                    { name: 'email', label: 'Email Address', type: 'email', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
                    { name: 'subject', label: 'Subject', type: 'text', required: true },
                  ].map(field => (
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

                  <div className="form-row" style={{ alignItems: 'flex-start' }}>
                    <label htmlFor="message">Message <em>*</em></label>
                    <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange}
                      className={errors.message ? 'error' : ''} style={{ resize: 'vertical' }} />
                  </div>
                  {errors.message && <div className="field-error show">{errors.message}</div>}

                  <div style={{ marginLeft: '150px', marginTop: '14px' }}>
                    <button type="submit" className="btn-primary">SEND MESSAGE</button>
                  </div>
                </form>
              </div>

              {/* CONTACT INFO */}
              <div className="contact-info">
                <div className="form-section-title">Get in Touch</div>
                <div style={{ marginBottom: '20px' }}>
                  {[
                    { icon: '📍', label: 'Address', value: '123 Spa Boulevard, Suite 400\nAustin, TX 78701, USA' },
                    { icon: '📞', label: 'Phone', value: '1-888-201-8899 (24/7)' },
                    { icon: '📧', label: 'Email', value: 'service@hotspring.com' },
                    { icon: '🕒', label: 'Business Hours', value: 'Mon–Fri: 8am–8pm CST\nSat–Sun: 9am–5pm CST' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '20px', minWidth: '28px' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '2px' }}>{item.label}</div>
                        <p style={{ fontSize: '13px' }}>{item.value.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#f0f4f8', padding: '16px', border: '1px solid #d0d8e0' }}>
                  <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, marginBottom: '8px', color: '#1a2535' }}>FREQUENTLY ASKED QUESTIONS</div>
                  {[
                    'How long does delivery take?',
                    'Do you offer installation services?',
                    'What warranty do products include?',
                    'Can I return or exchange my order?',
                  ].map(q => (
                    <div key={q} style={{ fontSize: '13px', padding: '4px 0', borderBottom: '1px dotted #c0c8d0' }}>
                      <a href="#faq" style={{ color: 'var(--link)' }}>→ {q}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <RelatedCarousel />
        </div>
      </div>
    </PageWrapper>
  );
}

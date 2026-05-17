'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">We'd love to hear from you. Get in touch with our team.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800">Message Sent!</h3>
              <p className="text-gray-500 mt-2">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"/>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
        <div className="space-y-6 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">📍 Address</h3>
            <p>123 Wood Lane, Craftsman Quarter<br/>London, UK EC1A 1BB</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">📞 Phone</h3>
            <p>07584 021409</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">✉️ Email</h3>
            <p>hello@rustikplank.co.uk</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">🕐 Hours</h3>
            <p>Mon-Fri: 9am - 6pm<br/>Saturday: 10am - 4pm<br/>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

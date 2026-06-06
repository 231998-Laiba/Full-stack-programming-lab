'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('All fields are required');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! 🎉');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center min-h-screen p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      </div>

      <div className="w-full max-w-md page-enter">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 glow-blue" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 8h24M4 16h16M4 24h20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="26" cy="24" r="4" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Nexus <span style={{ color: '#3b82f6' }}>CRM</span></h1>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>Air University · Creative Technology</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-1">Create your account</h2>
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>Join Nexus CRM and manage your customers.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Full Name</label>
              <input className="input-dark" placeholder="Muhammad Ali"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Email Address</label>
              <input type="email" className="input-dark" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Password</label>
              <input type="password" className="input-dark" placeholder="Min. 6 characters"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Confirm Password</label>
              <input type="password" className="input-dark" placeholder="Repeat password"
                value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center"
              style={{ padding: '12px 20px', fontSize: '15px' }}>
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> Creating...</>
                : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: '#64748b' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#3b82f6', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
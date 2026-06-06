'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 👋');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center min-h-screen p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      </div>

      <div className="w-full max-w-md page-enter">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 glow-blue" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 8h24M4 16h16M4 24h20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="26" cy="24" r="4" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ letterSpacing: '-0.5px' }}>
            Nexus <span style={{ color: '#3b82f6' }}>CRM</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>Air University · Creative Technology</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-1">Sign in to your account</h2>
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>Welcome back! Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Email Address</label>
              <input type="email" className="input-dark" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} className="input-dark" placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ paddingRight: '44px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#475569', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2"
              style={{ padding: '12px 20px', fontSize: '15px' }}>
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> Signing in...</>
                : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: '#64748b' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#3b82f6', fontWeight: 600 }}>Create one</Link>
          </p>
        </div>

        <div className="mt-4 p-4 rounded-xl text-center" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <p className="text-xs" style={{ color: '#64748b' }}>Register a new account to get started!</p>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Chatbot from '@/components/chatbot/Chatbot';
import { useAuth } from '@/lib/auth';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="auth-bg flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p style={{ color: '#64748b', fontSize: '14px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="gradient-bg min-h-screen flex">
      <Sidebar />
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px', minHeight: '100vh' }}>
        <div className="page-enter">
          {children}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}

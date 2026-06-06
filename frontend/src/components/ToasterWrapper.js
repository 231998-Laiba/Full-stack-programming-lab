'use client';
import { Toaster } from 'react-hot-toast';

export default function ToasterWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#1e293b',
          color: '#f1f5f9',
          border: '1px solid #334155',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Outfit, sans-serif',
        },
        success: { iconTheme: { primary: '#10b981', secondary: '#1e293b' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#1e293b' } },
      }}
    />
  );
}
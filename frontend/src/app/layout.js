import './globals.css';
import { AuthProvider } from '@/lib/auth';
import ToasterWrapper from '@/components/ToasterWrapper';

export const metadata = {
  title: 'Nexus CRM | Air University',
  description: 'Professional Customer Relationship Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <ToasterWrapper />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
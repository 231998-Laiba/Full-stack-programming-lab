'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { label: 'Beds', href: '/products?category=Beds' },
  { label: 'Bookcases', href: '/products?category=Bookcases' },
  { label: 'Boxes', href: '/products?category=Boxes' },
  { label: 'Chairs', href: '/products?category=Chairs' },
  { label: 'Chairs', href: '/products?category=Chairs' },
  { label: 'Tables', href: '/products?category=Tables' },
  { label: 'Cabinets', href: '/products?category=Cabinets' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-secondary">
            <span className="text-primary">R</span>ustik Plank
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {['Beds','Bookcases','Boxes','Chairs','Tables','Cabinets'].map(cat => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className="text-gray-700 hover:text-primary font-medium text-sm transition-colors"
              >
                {cat}
              </Link>
            ))}
            <Link href="/admin" className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark transition-colors">
              Admin
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
          {['Beds','Bookcases','Boxes','Chairs','Tables','Cabinets'].map(cat => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className="text-gray-700 hover:text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <Link href="/admin" className="text-primary font-medium" onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
}

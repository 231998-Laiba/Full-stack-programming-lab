'use client';
import Link from 'next/link';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function TopBar() {
  const { count } = useCart();
  return (
    <div className="bg-gray-100 border-b text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex gap-4 text-gray-500">
          <span>07584 021409</span>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About us</Link>
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
          <Link href="/account" className="hover:text-primary flex items-center gap-1">
            <FaUser size={12} /> Account
          </Link>
          <Link href="/cart" className="hover:text-primary flex items-center gap-1 relative">
            <FaShoppingCart size={14} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
            0 Items
          </Link>
          <Link href="/search" className="hover:text-primary"><FaSearch size={12} /></Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            <span className="text-primary">R</span>ustik Plank
          </h3>
          <p className="text-sm">Reclaimed and handcrafted furniture. Unique pieces built to last.</p>
          <div className="flex gap-3 mt-4">
            <FaFacebook className="hover:text-primary cursor-pointer" size={18} />
            <FaTwitter className="hover:text-primary cursor-pointer" size={18} />
            <FaInstagram className="hover:text-primary cursor-pointer" size={18} />
            <FaPinterest className="hover:text-primary cursor-pointer" size={18} />
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          {['Beds','Bookcases','Boxes','Chairs','Tables','Cabinets'].map(c => (
            <Link key={c} href={`/products?category=${c}`} className="block text-sm hover:text-primary mb-1">{c}</Link>
          ))}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Information</h4>
          {['About Us','Contact','Blog','Delivery','Return Policy'].map(l => (
            <Link key={l} href="#" className="block text-sm hover:text-primary mb-1">{l}</Link>
          ))}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">My Account</h4>
          {['My Account','Order History','Addresses','Newsletter'].map(l => (
            <Link key={l} href="#" className="block text-sm hover:text-primary mb-1">{l}</Link>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2024 Rustik Plank Furniture. All Rights Reserved.
      </div>
    </footer>
  );
}

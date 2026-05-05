'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🛒 My Ecommerce Store</h1>
          <nav>
            <Link href="/" className="hover:underline">Home</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Products</h2>
        
        {products.length === 0 ? (
          <p className="text-gray-500">No products found. <a href="http://localhost:5000/api/seed" className="text-blue-600 underline">Seed data first</a></p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-4xl">
                  📦
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                  <Link 
                    href={`/product/${product._id}`}
                    className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="container mx-auto text-center">
          <p>© 2026 Ecommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
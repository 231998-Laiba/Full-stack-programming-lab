'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProduct } from '@/lib/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!product) return <div className="text-center p-10">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🛒 My Ecommerce Store</h1>
          <Link href="/" className="hover:underline">← Back to Home</Link>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-6xl mb-6">
            📦
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">{product.category}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="container mx-auto text-center">
          <p>© 2026 Ecommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
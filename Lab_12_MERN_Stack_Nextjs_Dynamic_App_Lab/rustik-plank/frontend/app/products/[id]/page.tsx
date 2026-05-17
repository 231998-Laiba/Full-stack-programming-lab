'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    productAPI.getOne(id)
      .then(r => setProduct(r.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    await addItem({ productId: product._id, name: product.name, price: product.price, image: product.image, quantity: qty });
    router.push('/cart');
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">Product not found. <Link href="/products" className="text-orange-500">Go back</Link></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link> &gt;{' '}
        <Link href="/products" className="hover:text-orange-500">Products</Link> &gt;{' '}
        <Link href={`/products?category=${product.category}`} className="hover:text-orange-500">{product.category}</Link> &gt;{' '}
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
            <img
              src={product.image || `https://via.placeholder.com/500x400/8B6914/FFFFFF?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/500x400/8B6914/FFFFFF?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2">
          <p className="text-orange-500 uppercase text-sm font-semibold tracking-wide mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          {product.originalPrice && (
            <p className="text-gray-400 line-through text-sm">£{product.originalPrice.toFixed(2)}</p>
          )}
          <p className="text-4xl font-bold text-orange-500 mb-4">£{product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border rounded-full overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty-1))} className="px-4 py-2 hover:bg-gray-100 text-lg">-</button>
              <span className="px-4 py-2 font-medium">{qty}</span>
              <button onClick={() => setQty(qty+1)} className="px-4 py-2 hover:bg-gray-100 text-lg">+</button>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Add to Cart
            </button>
            <Link href="/products" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition-colors">
              Continue Shopping
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
            <p>✅ In Stock: {product.stock} units</p>
            <p className="mt-1">🚚 Free delivery on orders over £150</p>
          </div>
        </div>
      </div>
    </div>
  );
}

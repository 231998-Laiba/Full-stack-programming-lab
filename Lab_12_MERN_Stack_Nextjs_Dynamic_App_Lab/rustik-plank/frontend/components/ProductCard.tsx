'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = async () => {
    await addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert('Added to cart!');
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img
          src={product.image || `https://via.placeholder.com/300x200/8B6914/FFFFFF?text=${encodeURIComponent(product.category)}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/8B6914/FFFFFF?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-primary uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">£{product.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <Link
              href={`/products/${product._id}`}
              className="border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded hover:border-primary hover:text-primary transition-colors"
            >
              Detail
            </Link>
            <button
              onClick={handleAdd}
              className="bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-primary-dark transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

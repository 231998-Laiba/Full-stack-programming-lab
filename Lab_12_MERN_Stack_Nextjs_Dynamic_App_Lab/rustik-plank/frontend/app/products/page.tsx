'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { productAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Suspense } from 'react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(category);

  const categories = ['All', 'Beds', 'Bookcases', 'Boxes', 'Chairs', 'Tables', 'Cabinets'];

  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (activeCategory && activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;
    productAPI.getAll(params)
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {activeCategory && activeCategory !== 'All' ? `${activeCategory} Collection` : 'All Products'}
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-full px-5 py-2 w-full max-w-md focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === 'All' ? '' : cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              (cat === 'All' && !activeCategory) || cat === activeCategory
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No products found. Add products from the <a href="/admin" className="text-orange-500 underline">Admin panel</a>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p: any) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

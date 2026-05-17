'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productAPI, categoryAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [special, setSpecial] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'featured'|'special'|'popular'>('featured');

  useEffect(() => {
    productAPI.getAll({ featured: true, limit: 4 }).then(r => setFeatured(r.data)).catch(() => {});
    productAPI.getAll({ special: true, limit: 4 }).then(r => setSpecial(r.data)).catch(() => {});
    productAPI.getAll({ popular: true, limit: 4 }).then(r => setPopular(r.data)).catch(() => {});
  }, []);

  const tabProducts = activeTab === 'featured' ? featured : activeTab === 'special' ? special : popular;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-orange-300 font-semibold uppercase tracking-widest mb-2">Reclaimed and hand crafted</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Sale Off<br /><span className="text-orange-400">50%</span>
            </h1>
            <p className="text-lg text-amber-200 mb-8">Discover unique handcrafted furniture from reclaimed materials.</p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">Shop Now</Link>
              <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-colors">Learn More</Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-80 h-64 bg-amber-600 rounded-2xl flex items-center justify-center shadow-2xl text-8xl">🪑</div>
          </div>
        </div>
      </section>

      {/* Buy Online Banner */}
      <section className="bg-amber-50 border-y py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-green-600">BUY ONLINE</h2>
            <p className="text-gray-600 text-sm font-semibold">PICK UP IN STORE</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">NOW AVAILABLE IN OUR STORE SYSTEM</p>
            <p className="text-sm text-gray-500">AVAILABLE ON SELECT PRODUCTS <Link href="#" className="text-orange-500 underline">LEARN MORE</Link></p>
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Hot Deal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-900 text-white rounded-xl p-8 min-h-48">
            <p className="text-sm text-amber-300 mb-1">Reclaimed and hand crafted</p>
            <h3 className="text-4xl font-bold mb-4">Sale Off<br /><span className="text-orange-400">50%</span></h3>
            <Link href="/products" className="inline-block bg-white text-amber-900 px-6 py-2 rounded-full font-semibold hover:bg-orange-400 hover:text-white transition-colors">Shop Now</Link>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 min-h-48 relative">
            <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-bold text-center leading-tight">Sale Off<br/>35%</div>
            <p className="text-sm text-gray-500 mb-1">Elite Collection</p>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Best Furniture</h3>
            <Link href="/products" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {(['featured','special','popular'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors capitalize ${activeTab===tab?'bg-orange-500 text-white':'bg-white text-gray-600 border hover:bg-gray-100'}`}>
                See All {tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>
          {tabProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No products yet. Seed the database from Admin.</p>
              <Link href="/admin" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">Go to Admin</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tabProducts.map((p:any) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Tables','Beds','Chairs','Bookcases','Cabinets','Boxes'].map(cat => (
            <Link key={cat} href={`/products?category=${cat}`}
              className="relative bg-amber-100 rounded-xl overflow-hidden h-36 flex items-end p-4 group hover:shadow-lg transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent group-hover:from-orange-600/70 transition-colors"/>
              <div className="relative z-10">
                <p className="text-xs text-amber-300 uppercase tracking-widest">Collection</p>
                <h3 className="text-white font-bold text-lg">{cat.toUpperCase()}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Product */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 bg-gray-200 w-full h-72 rounded-2xl flex items-center justify-center text-8xl">🪑</div>
          <div className="md:w-1/2">
            <p className="text-orange-500 font-semibold uppercase tracking-widest mb-2">Featured</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Handcrafted Chair</h2>
            <p className="text-gray-500 mb-4 text-sm">This is Photoshops version of Lorem Ipsum. Proin sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.</p>
            <p className="text-gray-400 line-through text-sm">£259.99</p>
            <p className="text-3xl font-bold text-orange-500 mb-6">£129.99</p>
            <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">Shop Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

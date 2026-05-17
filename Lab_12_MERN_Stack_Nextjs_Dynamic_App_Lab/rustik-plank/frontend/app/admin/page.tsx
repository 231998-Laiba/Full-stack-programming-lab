'use client';
import { useEffect, useState } from 'react';
import { productAPI, orderAPI } from '@/lib/api';

type Product = { _id: string; name: string; price: number; category: string; stock: number; featured: boolean; special: boolean; popular: boolean; description: string; };
type Order = { _id: string; customerName: string; email: string; total: number; status: string; createdAt: string; items: any[]; };

const EMPTY_PRODUCT = { name: '', description: '', price: 0, category: 'Beds', stock: 10, featured: false, special: false, popular: false };

export default function AdminPage() {
  const [tab, setTab] = useState<'products'|'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY_PRODUCT);
  const [loading, setLoading] = useState(false);

  const loadProducts = () => productAPI.getAll().then(r => setProducts(r.data)).catch(() => {});
  const loadOrders = () => orderAPI.getAll().then(r => setOrders(r.data)).catch(() => {});

  useEffect(() => { loadProducts(); loadOrders(); }, []);

  const handleSeed = async () => {
    setLoading(true);
    try { await productAPI.seed(); await loadProducts(); alert('Database seeded!'); }
    catch { alert('Seed failed - is the backend running?'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editProduct) { await productAPI.update(editProduct._id, form); }
      else { await productAPI.create(form); }
      await loadProducts();
      setShowForm(false); setEditProduct(null); setForm(EMPTY_PRODUCT);
    } catch { alert('Failed to save product'); }
  };

  const handleEdit = (p: Product) => { setEditProduct(p); setForm(p); setShowForm(true); };
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await productAPI.delete(id); await loadProducts();
  };
  const handleStatusChange = async (id: string, status: string) => {
    await orderAPI.updateStatus(id, status); await loadOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <button onClick={handleSeed} disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors disabled:opacity-50">
          {loading ? 'Seeding...' : '🌱 Seed Database'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {(['products','orders'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full font-semibold text-sm capitalize transition-colors ${tab===t?'bg-orange-500 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t === 'products' ? `Products (${products.length})` : `Orders (${orders.length})`}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {tab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Products</h2>
            <button onClick={() => { setShowForm(true); setEditProduct(null); setForm(EMPTY_PRODUCT); }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
              + Add Product
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-screen overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{editProduct ? 'Edit Product' : 'New Product'}</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"/>
                  <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={2}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"/>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: +e.target.value})} required
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"/>
                    <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: +e.target.value})}
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"/>
                  </div>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500">
                    {['Beds','Bookcases','Boxes','Chairs','Tables','Cabinets'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <div className="flex gap-4 text-sm">
                    {['featured','special','popular'].map(f => (
                      <label key={f} className="flex items-center gap-2 capitalize">
                        <input type="checkbox" checked={form[f]} onChange={e => setForm({...form, [f]: e.target.checked})} className="accent-orange-500"/>
                        {f}
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-semibold text-sm">Save</button>
                    <button type="button" onClick={() => { setShowForm(false); setEditProduct(null); }}
                      className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full font-semibold text-sm hover:bg-gray-50">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No products. Click "Seed Database" to add sample data.</div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {['Name','Category','Price','Stock','Tags','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                      <td className="px-4 py-3 text-gray-500">{p.category}</td>
                      <td className="px-4 py-3 font-medium text-orange-500">£{p.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-gray-500">{p.stock}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {p.featured && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Featured</span>}
                          {p.special && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Special</span>}
                          {p.popular && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Popular</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                          <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600 font-medium">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No orders yet.</div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {['Customer','Email','Items','Total','Status','Date','Update'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map(o => (
                    <tr key={o._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{o.customerName}</td>
                      <td className="px-4 py-3 text-gray-500">{o.email}</td>
                      <td className="px-4 py-3 text-gray-500">{o.items.length} items</td>
                      <td className="px-4 py-3 font-medium text-orange-500">£{o.total.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          o.status==='delivered'?'bg-green-100 text-green-700':o.status==='shipped'?'bg-blue-100 text-blue-700':'bg-yellow-100 text-yellow-700'
                        }`}>{o.status}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <select value={o.status} onChange={e => handleStatusChange(o._id, e.target.value)}
                          className="border rounded px-2 py-1 text-xs focus:outline-none focus:border-orange-500">
                          {['pending','processing','shipped','delivered'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, total, removeItem, updateItem, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-6">🛒</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
      <p className="text-gray-500 mb-8">Discover our beautiful furniture collection</p>
      <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
        Shop Now
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-600">Qty</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map(item => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">🪑</div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                          <p className="text-orange-500 font-medium text-sm">£{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center border rounded-full w-24 mx-auto">
                        <button onClick={() => updateItem(item.productId, item.quantity-1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button onClick={() => updateItem(item.productId, item.quantity+1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800">£{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => removeItem(item.productId)} className="text-red-400 hover:text-red-600 text-xl">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between">
            <Link href="/products" className="text-orange-500 hover:text-orange-600 font-medium text-sm">← Continue Shopping</Link>
            <button onClick={clearCart} className="text-red-400 hover:text-red-600 font-medium text-sm">Clear Cart</button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>£{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span><span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-lg">
                <span>Total</span><span>£{total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-full font-semibold transition-colors">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

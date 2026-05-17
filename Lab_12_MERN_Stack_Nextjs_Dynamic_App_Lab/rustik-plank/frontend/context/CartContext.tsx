'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '@/lib/api';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('cartSession');
      if (!id) { id = Math.random().toString(36).slice(2); localStorage.setItem('cartSession', id); }
      return id;
    }
    return 'default';
  });

  useEffect(() => {
    cartAPI.getCart(sessionId).then(r => setItems(r.data)).catch(() => {});
  }, [sessionId]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const addItem = async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const r = await cartAPI.addItem(sessionId, { ...item, quantity: item.quantity || 1 });
    setItems(r.data);
  };

  const removeItem = async (productId: string) => {
    const r = await cartAPI.removeItem(sessionId, productId);
    setItems(r.data);
  };

  const updateItem = async (productId: string, quantity: number) => {
    const r = await cartAPI.updateItem(sessionId, { productId, quantity });
    setItems(r.data);
  };

  const clearCart = async () => {
    const r = await cartAPI.clearCart(sessionId);
    setItems(r.data);
  };

  return (
    <CartContext.Provider value={{ items, total, count, addItem, removeItem, updateItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

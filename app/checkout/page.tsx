// app/checkout/page.tsx
'use client';

import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';

export default function Checkout() {
  const { items, removeItem, clear } = useCart();

  // FIX: Force re-render when localStorage changes
  useEffect(() => {
    const handleStorage = () => {
      window.location.reload();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // FIX: Recalculate total
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
        <Link href="/" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <button
            onClick={clear}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
          >
            <Trash2 className="w-5 h-5" />
            Clear Cart
          </button>
        </div>

        <div className="space-y-6">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 flex gap-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* IMAGE */}
              <div className="relative w-32 h-32 rounded-xl overflow-hidden">
                <Image src={item.photo} alt={item.name} fill className="object-cover" />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                  ${item.price} × {item.quantity || 1}
                </p>
                <p className="text-xl font-bold mt-2">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="mt-12 bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 text-right">
          <p className="text-3xl font-bold">Total: ${total.toFixed(2)}</p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full font-bold text-xl transition hover:scale-105">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
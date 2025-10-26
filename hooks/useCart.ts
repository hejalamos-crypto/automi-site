'use client';

import { create } from 'zustand';
import { Parts } from '@/types';

interface CartItem extends Parts {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (part: Parts) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
  addToCart: (part) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === part.id);
      const newItems = existing
        ? state.items.map((i) => (i.id === part.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { ...part, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    }),
  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },
}));

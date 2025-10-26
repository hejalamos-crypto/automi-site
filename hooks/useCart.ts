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
  items: [],
  addToCart: (part) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === part.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === part.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...part, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));

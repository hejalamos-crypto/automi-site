// hooks/useCart.ts — REPLACE ENTIRE FILE
import { create } from 'zustand';

interface Part {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
}

interface CartItem extends Part {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (part: Part) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],

  addToCart: (part) => {
    const state = get();
    const existing = state.items.find(i => i.id === part.id);
    let newItems;

    if (existing) {
      newItems = state.items.map(i =>
        i.id === part.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...state.items, { ...part, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id) => {
    const state = get();
    const newItems = state.items.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  clear: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },
}));
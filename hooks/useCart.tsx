// hooks/useCart.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Parts } from '@/types';

interface CartItem extends Parts {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (part: Parts) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (part: Parts) => {
    setItems((
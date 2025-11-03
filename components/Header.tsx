// components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, Package, Sun, Moon, User, Mail } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';

export default function Header() {
  const { items = [] } = useCart();
  const [isDark, setIsDark] = useState(true);
  const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const dark = saved === 'dark' || !saved;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center text-black dark:text-white">

        {/* LEFT: Home */}
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>

        {/* RIGHT: Basket, Parts, Contact, Dark Mode, Admin */}
        <div className="flex items-center gap-5">

          {/* BASKET */}
          <Link href="/checkout" className="flex items-center gap-2 font-medium hover:text-gray-600 dark:hover:text-gray-300 transition">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span>Basket</span>
          </Link>

          {/* PARTS — NEW LINK */}
          <Link href="/parts" className="flex items-center gap-2 font-medium hover:text-gray-600 dark:hover:text-gray-300 transition">
            <Package className="w-5 h-5" />
            <span>Parts</span>
          </Link>

          {/* CONTACT */}
          <Link href="/contact" className="flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition">
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </Link>

          {/* DARK MODE */}
          <button onClick={toggle} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>

          {/* ADMIN */}
          <Link href="/admin" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
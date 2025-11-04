// components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, Sun, Moon, User, Mail, Globe } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { getLang, translations } from '@/lib/i18n';

export default function Header() {
  const { items = [] } = useCart();
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const t = translations[lang];
  const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  useEffect(() => {
    const savedLang = getLang();
    const savedTheme = localStorage.getItem('theme');
    setLang(savedLang);
    const dark = savedTheme === 'dark' || !savedTheme;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'pl' ? 'en' : 'pl';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center text-black dark:text-white">

        <Link href="/" className="text-2xl font-bold">{t.home}</Link>

        <div className="flex items-center gap-5">

          <Link href="/checkout" className="flex items-center gap-2 font-medium hover:text-gray-600 dark:hover:text-gray-300 transition">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span>{t.basket}</span>
          </Link>

          <Link href="/contact" className="flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition">
            <Mail className="w-5 h-5" />
            <span>{t.contact}</span>
          </Link>

          <button onClick={toggleLang} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <Globe className="w-5 h-5" />
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>

          <Link href="/admin" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
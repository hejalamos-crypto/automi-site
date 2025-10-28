// components/Header.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export default function Header() {
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Automi logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-black hover:underline font-medium">
            Home
          </Link>
          <Link href="/checkout" className="relative text-black font-medium">
            Basket
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <Link href="/" className="block px-4 py-3 text-black border-b">
            Home
          </Link>
          <Link href="/checkout" className="block px-4 py-3 text-black relative">
            Basket
            {itemCount > 0 && (
              <span className="absolute right-4 bg-black text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
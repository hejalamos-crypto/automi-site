'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export default function Header() {
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl">Automi</Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-black">Home</Link>
          <Link href="/checkout" className="text-black relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t">
          <Link href="/" className="block px-4 py-3 text-black">Home</Link>
          <Link href="/checkout" className="block px-4 py-3 text-black relative">
            Cart
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

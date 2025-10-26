'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl tracking-tight">Automi</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-black hover:text-gray-600">Home</Link>
          <Link href="/#parts" className="text-black hover:text-gray-600">Parts</Link>
          <Link href="/checkout" className="relative">
            <span className="text-black hover:text-gray-600">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

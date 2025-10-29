// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LEFT: HOME */}
        <Link href="/" className="font-medium hover:text-gray-300">
          Home
        </Link>

        {/* CENTER: LOGO + TEXT */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Automi"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold">Choose Your Parts</span>
        </Link>

        {/* RIGHT: CONTACT + BASKET */}
        <div className="flex items-center gap-6">
          <Link href="/contact" className="font-medium hover:text-gray-300">
            Contact
          </Link>
          <Link href="/checkout" className="relative font-medium hover:text-gray-300">
            Basket
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-white text-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
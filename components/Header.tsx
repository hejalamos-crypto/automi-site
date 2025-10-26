'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl">Automi</Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-black">Home</Link>
          <Link href="/checkout" className="text-black">Cart</Link>
        </nav>
      </div>
    </header>
  );
}

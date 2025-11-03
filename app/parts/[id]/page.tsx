// app/parts/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface Part {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  carName?: string;
}

export default function PartPage({ params }: { params: { id: string } }) {
  const [part, setPart] = useState<Part | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem('cars');
    if (saved) {
      try {
        const cars = JSON.parse(saved);
        let found: Part | null = null;
        cars.forEach((car: any) => {
          const p = car.parts.find((p: any) => p.id === params.id);
          if (p) {
            found = { ...p, carName: car.name };
          }
        });
        setPart(found);
      } catch (e) {
        console.error(e);
      }
    }
  }, [params.id]);

  if (!part) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <p className="text-xl">Part not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white dark:bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Part Details</h1>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={part.photo} 
              alt={part.name} 
              fill 
              className="object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-3">{part.name}</h1>
            {part.carName && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                For: <span className="font-medium">{part.carName}</span>
              </p>
            )}
            <p className="text-lg mb-6 leading-relaxed">{part.description}</p>
            <div className="text-4xl font-bold mb-8">${part.price}</div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(part)}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <Link
                href="/checkout"
                onClick={() => addToCart(part)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-full font-bold text-center hover:scale-105 transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
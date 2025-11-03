// components/PartCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface Part {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
}

export default function PartCard({ part }: { part: Part }) {
  const { addToCart } = useCart();

  return (
    <Link href={`/parts/${part.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <div className="relative h-56">
          <Image
            src={part.photo}
            alt={part.name}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1">{part.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {part.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${part.price}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(part);
              }}
              className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
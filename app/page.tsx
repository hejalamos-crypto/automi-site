// app/page.tsx
'use client';
import Link from 'next/link';
import PartCard from '@/components/PartCard';
import partsData from '@/data/parts.json';

export default function Home() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl font-black mb-6">Choose Your Parts</h1>
        <Link href="#parts" className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800">
          Shop Now
        </Link>
      </div>

      <section id="parts" className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {partsData.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </section>
    </div>
  );
}
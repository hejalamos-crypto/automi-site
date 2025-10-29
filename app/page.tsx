// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PartCard from '@/components/PartCard';
import partsData from '@/data/parts.json';
import { Search } from 'lucide-react';

const cars = [
  { id: 'a3', name: 'Audi A3', years: '2007-2011' },
  { id: 'a4', name: 'Audi A4', years: '2007-2011' },
  { id: 'a5', name: 'Audi A5', years: '2007-2010' },
  { id: 'a6', name: 'Audi A6', years: '2008-2011' },
];

export default function Home() {
  const [selectedCar, setSelectedCar] = useState('a3');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = partsData
    .filter(part => part.compatibleModels.some(m => m.includes(selectedCar.toUpperCase())))
    .filter(part => part.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      {/* HERO: LOGO + TEXT */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-24 text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-4">
          <Image src="/images/logo.png" alt="Automi" width={80} height={80} className="object-contain" />
          <h1 className="text-3xl font-black">Choose Your Parts</h1>
        </Link>
      </section>

      {/* CAR TABS */}
      <section className="bg-gray-100 py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {cars.map(car => (
              <button
                key={car.id}
                onClick={() => setSelectedCar(car.id)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition ${
                  selectedCar === car.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {car.name} ({car.years})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH + PARTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search parts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredParts.length > 0 ? (
              filteredParts.map(part => <PartCard key={part.id} part={part} />)
            ) : (
              <p className="col-span-full text-center text-gray-600">No parts found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
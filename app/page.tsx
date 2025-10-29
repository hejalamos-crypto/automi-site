'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PartCard from '@/components/PartCard';
import partsData from '@/data/parts.json';
import { Search } from 'lucide-react';

const cars = [
  { id: 'a3', name: 'Audi A3', years: '2007-2011', img: '/images/audi-a3.jpg' },
  { id: 'a4', name: 'Audi A4', years: '2007-2011', img: '/images/audi-a4.jpg' },
  { id: 'a5', name: 'Audi A5', years: '2007-2010', img: '/images/audi-a5.jpg' },
  { id: 'a6', name: 'Audi A6', years: '2008-2011', img: '/images/audi-a6.jpg' },
];

export default function Home() {
  const [selectedCar, setSelectedCar] = useState('a3');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = partsData
    .filter(part => part.compatibleModels.some(m => m.includes(selectedCar.toUpperCase())))
    .filter(part => part.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-32 text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-6">
          <Image src="/images/logo.png" alt="Automi" width={240} height={240} className="object-contain" priority />
          <h1 className="text-5xl font-black">Choose Your Parts</h1>
        </Link>
      </section>

      <section className="bg-gray-100 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto pb-4">
            {cars.map(car => (
              <button
                key={car.id}
                onClick={() => setSelectedCar(car.id)}
                className={`flex flex-col items-center p-6 rounded-xl min-w-[180px] transition-all ${
                  selectedCar === car.id ? 'bg-black text-white shadow-2xl scale-105' : 'bg-white text-black hover:shadow-xl'
                }`}
              >
                <img src={car.img} alt={car.name} className="w-32 h-32 object-cover rounded-lg mb-3" />
                <span className="font-bold text-lg">{car.name}</span>
                <span className="text-sm opacity-80">{car.years}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

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
            {filteredParts.map(part => <PartCard key={part.id} part={part} />)}
          </div>
        </div>
      </section>
    </>
  );
}
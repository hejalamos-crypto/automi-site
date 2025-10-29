// app/page.tsx
'use client';

import Link from 'next/link';
import PartCard from '@/components/PartCard';
import partsData from '@/data/parts.json';
import { Search, Filter } from 'lucide-react';

const cars = [
  { id: 'a3', name: 'Audi A3', years: '2007-2011', img: '/images/audi-a3.jpg' },
  { id: 'a4', name: 'Audi A4', years: '2007-2011', img: '/images/audi-a4.jpg' },
  { id: 'a5', name: 'Audi A5', years: '2007-2010', img: '/images/audi-a5.jpg' },
  { id: 'a6', name: 'Audi A6', years: '2008-2011', img: '/images/audi-a6.jpg' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Precision Parts<br />for Your Audi
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Premium aftermarket components for A3 • A4 • A5 • A6 (2007-2011)
          </p>
          <Link
            href="#parts"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* CAR CARDS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Model</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car, i) => (
              <div
                key={car.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{car.name}</h3>
                  <p className="text-sm opacity-90">{car.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTS SECTION */}
      <section id="parts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">All Available Parts</h2>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* PARTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {partsData.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
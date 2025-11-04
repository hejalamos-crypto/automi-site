// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { translations, getLang } from '@/lib/i18n';

interface Car {
  id: string;
  name: string;
  years: string;
  img: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const lang = getLang();
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem('cars');
    if (saved && saved !== '[]') {
      try {
        const parsed = JSON.parse(saved);
        setCars(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white p-6">
        <Image src="/images/logo.png" alt="Automi" width={620} height={420} className="rounded-3xl shadow-2xl mb-8" priority />
        <p className="text-xl mb-6">{t.noCars}</p>
        <Link href="/admin" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition">
          {t.goToAdmin}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <header className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/">
            <div className="inline-block group cursor-pointer relative">
              <div className="absolute inset-0 bg-black/40 blur-3xl scale-90 opacity-70 group-hover:opacity-100 transition-opacity -z-10"></div>
              <Image 
                src="/images/logo.png" 
                alt="Automi" 
                width={620} 
                height={420} 
                className="rounded-3xl shadow-2xl group-hover:shadow-3xl group-hover:scale-105 transition-all duration-300"
                priority 
              />
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="relative max-w-5xl mx-auto">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 shadow-2xl"
          />
        </div>
      </div>

      <div className="mt-20 mb-20 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 pb-12 min-w-max px-6">
          {filteredCars.map(car => (
            <Link
              key={car.id}
              href={`/car/${car.id}`}
              className="group flex-shrink-0 w-64 h-64 relative"
            >
              <div className="absolute inset-0 -bottom-4 rounded-3xl bg-black/30 dark:bg-white/20 blur-3xl scale-90 opacity-70 group-hover:opacity-100 group-hover:scale-95 transition-all duration-300 -z-10"></div>
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                <Image 
                  src={car.img} 
                  alt={car.name} 
                  fill
                  className="object-cover rounded-3xl transition-transform duration-300 group-hover:scale-115"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
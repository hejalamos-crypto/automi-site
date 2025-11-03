// app/car/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';

interface Part {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
}

interface Car {
  id: string;
  name: string;
  years: string;
  img: string;
  gallery: string[];
  parts: Part[];
}

export default function CarDetail({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cars');
    if (saved) {
      try {
        const cars = JSON.parse(saved);
        const found = cars.find((c: any) => c.id === params.id);
        setCar(found || null);
      } catch (e) {
        console.error(e);
      }
    }
  }, [params.id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <p className="text-xl">Car not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* HEADER WITH BACK */}
      <header className="sticky top-0 z-40 bg-white dark:bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">{car.name} ({car.years})</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* GALLERY */}
        {car.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {car.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setModalImage(img)}
                  className="relative h-64 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                >
                  <Image src={img} alt="" fill className="object-cover hover:scale-105 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODAL */}
        {modalImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer" onClick={() => setModalImage(null)}>
            <div className="relative max-w-6xl w-full">
              <Image src={modalImage} alt="" width={1400} height={900} className="max-w-full max-h-screen object-contain rounded-xl shadow-2xl" />
              <button onClick={(e) => { e.stopPropagation(); setModalImage(null); }} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur p-3 rounded-full">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* PARTS */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center">Available Parts</h2>
          {car.parts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {car.parts.map(part => (
                <Link key={part.id} href={`/parts/${part.id}`} className="block bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all">
                  <div className="relative h-72">
                    <Image src={part.photo} alt={part.name} fill className="object-cover" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{part.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2">{part.description}</p>
                    <div className="text-3xl font-bold">${part.price}</div>
                    <div className="mt-6 text-sm text-blue-600 dark:text-blue-400 font-medium">View Details</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-xl">No parts available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
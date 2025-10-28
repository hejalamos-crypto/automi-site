'use client';
import PartCard from '@/components/PartCard';
import partsData from '@/data/parts.json';

const cars = [
  { id: 'a3', name: 'Audi A3', years: '2007-2011', img: '/images/audi-a3.jpg' },
  { id: 'a4', name: 'Audi A4', years: '2007-2011', img: '/images/audi-a4.jpg' },
  { id: 'a5', name: 'Audi A5', years: '2007-2010', img: '/images/audi-a5.jpg' },
  { id: 'a6', name: 'Audi A6', years: '2008-2011', img: '/images/audi-a6.jpg' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 font-display">
            Choose Your Parts
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Precision parts for A3 • A4 • A5 • A6
          </p>

          {/* === PASTE THE ORDERED GRID HERE === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car, index) => (
              <div
                key={car.id}
                className={`
                  group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl
                  ${index === 0 ? 'order-1' : ''}
                  ${index === 1 ? 'order-2 sm:order-3' : ''}
                  ${index === 2 ? 'order-3 sm:order-2' : ''}
                  ${index === 3 ? 'order-4' : ''}
                `}
              >
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <p className="text-sm">{car.years}</p>
                </div>
              </div>
            ))}
          </div>
          {/* === END OF GRID === */}

        </div>
      </section>

      {/* ALL PARTS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-10 font-display">
            All Available Parts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {partsData.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-display">
            Visit Our Shop
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="h-96 rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6 text-lg">
              <div>
                <h3 className="text-xl font-bold mb-2">Automi Parts</h3>
                <p className="text-gray-300">123 Auto Street, Melbourne VIC 3000</p>
              </div>
              <div><p className="font-semibold">Phone:</p><p className="text-gray-300">+61 3 9876 5432</p></div>
              <div><p className="font-semibold">Email:</p><p className="text-gray-300">parts@automi.com</p></div>
              <div><p className="font-semibold">Hours:</p><p className="text-gray-300">Mon-Fri: 9AM – 6PM<br/>Sat: 10AM – 4PM</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
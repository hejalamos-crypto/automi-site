import PartCard from '@/components/PartCard';
import { Parts } from '@/types';

async function getParts(): Promise<Parts[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/parts`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const parts = await getParts();

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 font-display">
            Precision Parts.<br />Delivered Fast.
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            For <strong>Audi A3 / A4 / A5 (2007-2011)</strong>
          </p>
          <a href="#parts" className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800">
            View Catalog
          </a>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {['All', 'Engine', 'Brakes', 'Suspension', 'Electrical'].map(cat => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full text-sm font-medium border border-gray-300 hover:bg-black hover:text-white transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PARTS */}
      <section id="parts" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-10 font-display">Available Parts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {parts.map(part => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

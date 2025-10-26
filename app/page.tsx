import PartCard from '@/components/PartCard';
import { Parts } from '@/types';
import path from 'path';
import { promises as fs } from 'fs';

// This runs at build time
export const dynamic = 'force-static';

async function getParts(): Promise<Parts[]> {
  const filePath = path.join(process.cwd(), 'data', 'parts.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
09  return JSON.parse(jsonData);
}

// This runs at build time
export async function generateStaticParams() {
  return [];
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

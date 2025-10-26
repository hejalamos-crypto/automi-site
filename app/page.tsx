import PartCard from '@/components/PartCard';

// Hardcode your 10 parts here (NO FILE READ, NO FETCH)
const parts = [
  {
    id: 1,
    name: "Fuel Injector Set",
    category: "engine",
    price: 1113.52,
    stock: 5,
    brand: "Bosch",
    oem: "03L130277A",
    image: "/images/fuel-injector.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 2,
    name: "Shock Kit",
    category: "suspension",
    price: 277.70,
    stock: 8,
    brand: "Sachs",
    oem: "5Q0513049BFKT",
    image: "/images/shock-kit.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 3,
    name: "Fuel Injector Kit",
    category: "engine",
    price: 271.96,
    stock: 12,
    brand: "Bosch",
    oem: "06L906036JKT",
    image: "/images/fuel-injector-kit.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011"]
  },
  {
    id: 4,
    name: "Timing Belt Kit",
    category: "engine",
    price: 202.56,
    stock: 10,
    brand: "Continental",
    oem: "536181",
    image: "/images/timing-belt.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 5,
    name: "Trailing Arm Kit",
    category: "suspension",
    price: 159.92,
    stock: 7,
    brand: "Lemforder",
    oem: "KIT-00984",
    image: "/images/trailing-arm.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 6,
    name: "Brake Hose Kit",
    category: "brakes",
    price: 84.77,
    stock: 15,
    brand: "ATE",
    oem: "1K0611701KKT",
    image: "/images/brake-hose.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 7,
    name: "Accessory Drive Belt Kit",
    category: "engine",
    price: 79.68,
    stock: 20,
    brand: "Continental",
    oem: "06J260849DKT3",
    image: "/images/drive-belt.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011"]
  },
  {
    id: 8,
    name: "Drive Belt Kit",
    category: "engine",
    price: 75.75,
    stock: 18,
    brand: "Continental",
    oem: "KIT-06F260849LKT",
    image: "/images/drive-belt-kit.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 9,
    name: "Fuel Injector Reseal Kit",
    category: "engine",
    price: 38.36,
    stock: 25,
    brand: "Genuine Audi",
    oem: "06D998907KT2",
    image: "/images/reseal-kit.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011", "Audi A5 2007-2010"]
  },
  {
    id: 10,
    name: "Spark Plug Kit",
    category: "electrical",
    price: 31.96,
    stock: 30,
    brand: "Bosch",
    oem: "06H905601AKT4",
    image: "/images/spark-plug.jpg",
    compatibleModels: ["Audi A3 2007-2011", "Audi A4 2007-2011", "Audi A5 2007-2010"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
    </div>
  );
}

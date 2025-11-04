// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, X, Upload, Save, Trash2, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { translations, getLang } from '@/lib/i18n';

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

export default function Admin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [name, setName] = useState('');
  const [years, setYears] = useState('');
  const [img, setImg] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const lang = getLang();
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem('cars');
    if (saved) {
      try {
        setCars(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCars = (updated: Car[]) => {
    localStorage.setItem('cars', JSON.stringify(updated));
    setCars(updated);
  };

  const startEdit = (car: Car) => {
    setEditingCar(car);
    setName(car.name);
    setYears(car.years);
    setImg(car.img);
    setGallery(car.gallery);
    setParts(car.parts);
  };

  const cancelEdit = () => {
    setEditingCar(null);
    setName('');
    setYears('');
    setImg('');
    setGallery([]);
    setParts([]);
  };

  const saveCar = () => {
    if (!name || !years || !img) return;

    const carData: Car = {
      id: editingCar?.id || uuidv4(),
      name,
      years,
      img,
      gallery,
      parts
    };

    let updated;
    if (editingCar) {
      updated = cars.map(c => c.id === editingCar.id ? carData : c);
    } else {
      updated = [...cars, carData];
    }

    saveCars(updated);
    cancelEdit();
  };

  const deleteCar = (id: string) => {
    const updated = cars.filter(c => c.id !== id);
    saveCars(updated);
  };

  const addPart = () => {
    setParts([...parts, {
      id: uuidv4(),
      name: '',
      price: 0,
      description: '',
      photo: ''
    }]);
  };

  const updatePart = (index: number, field: keyof Part, value: any) => {
    const updated = [...parts];
    updated[index] = { ...updated[index], [field]: value };
    setParts(updated);
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const addGalleryImage = () => {
    setGallery([...gallery, '']);
  };

  const updateGallery = (index: number, value: string) => {
    const updated = [...gallery];
    updated[index] = value;
    setGallery(updated);
  };

  const removeGallery = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">{t.admin}</h1>

        {/* ADD/EDIT CAR FORM */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {editingCar ? t.edit + ' ' + t.addCar.toLowerCase() : t.addCar}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* NAME */}
            <input
              placeholder={lang === 'pl' ? "Nazwa" : "Name"}
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* YEARS */}
            <input
              placeholder={lang === 'pl' ? "Lata" : "Years"}
              value={years}
              onChange={e => setYears(e.target.value)}
              className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* MAIN IMAGE */}
          <div className="mb-6">
            <input
              placeholder={lang === 'pl' ? "URL głównego zdjęcia" : "Main image URL"}
              value={img}
              onChange={e => setImg(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {img && (
              <div className="mt-3 relative h-64 rounded-xl overflow-hidden">
                <Image src={img} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>

          {/* GALLERY */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">{t.gallery}</h3>
              <button onClick={addGalleryImage} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Plus className="w-5 h-5" />
                {lang === 'pl' ? "Dodaj" : "Add"}
              </button>
            </div>
            <div className="space-y-3">
              {gallery.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder={lang === 'pl' ? "URL zdjęcia" : "Image URL"}
                    value={url}
                    onChange={e => updateGallery(i, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <button onClick={() => removeGallery(i)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PARTS */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">{t.availableParts}</h3>
              <button onClick={addPart} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Plus className="w-5 h-5" />
                {t.addPart}
              </button>
            </div>
            <div className="space-y-4">
              {parts.map((part, i) => (
                <div key={part.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg border">
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <input
                      placeholder={lang === 'pl' ? "Nazwa części" : "Part name"}
                      value={part.name}
                      onChange={e => updatePart(i, 'name', e.target.value)}
                      className="px-3 py-2 border rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder={t.price}
                      value={part.price}
                      onChange={e => updatePart(i, 'price', parseFloat(e.target.value) || 0)}
                      className="px-3 py-2 border rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                    />
                  </div>
                  <textarea
                    placeholder={t.description}
                    value={part.description}
                    onChange={e => updatePart(i, 'description', e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-600 text-black dark:text-white mb-3"
                    rows={2}
                  />
                  <input
                    placeholder={lang === 'pl' ? "URL zdjęcia części" : "Part image URL"}
                    value={part.photo}
                    onChange={e => updatePart(i, 'photo', e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-600 text-black dark:text-white mb-3"
                  />
                  <button onClick={() => removePart(i)} className="text-red-600 hover:text-red-700">
                    {t.remove}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveCar}
              className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition"
            >
              <Save className="w-5 h-5" />
              {editingCar ? t.save : t.addCar}
            </button>
            {editingCar && (
              <button onClick={cancelEdit} className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                {t.cancel}
              </button>
            )}
          </div>
        </div>

        {/* CARS LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car.id} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                <Image src={car.img} alt={car.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1">{car.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{car.years}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {car.parts.length} {lang === 'pl' ? "części" : "parts"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(car)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                  <Edit className="w-4 h-4" />
                  {t.edit}
                </button>
                <button
                  onClick={() => deleteCar(car.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-full transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

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

const defaultCars: Car[] = [
  {
    id: 'a3',
    name: 'Audi A3',
    years: '2007-2011',
    img: '/images/audi-a3.jpg',
    gallery: ['/images/a3-1.jpg', '/images/a3-2.jpg', '/images/a3-3.jpg'],
    parts: []
  },
  {
    id: 'a4',
    name: 'Audi A4',
    years: '2007-2011',
    img: '/images/audi-a4.jpg',
    gallery: ['/images/a4-1.jpg', '/images/a4-2.jpg'],
    parts: []
  },
  {
    id: 'a5',
    name: 'Audi A5',
    years: '2007-2010',
    img: '/images/audi-a5.jpg',
    gallery: ['/images/a5-1.jpg'],
    parts: []
  },
  {
    id: 'a6',
    name: 'Audi A6',
    years: '2008-2011',
    img: '/images/audi-a6.jpg',
    gallery: ['/images/a6-1.jpg', '/images/a6-2.jpg', '/images/a6-3.jpg', '/images/a6-4.jpg'],
    parts: []
  },
];

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem('cars');
    if (saved && saved !== '[]') {
      try {
        setCars(JSON.parse(saved));
      } catch {
        setCars(defaultCars);
      }
    } else {
      setCars(defaultCars);
    }
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }, [cars]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  const addNewCar = (data: {
    name: string;
    years: string;
    img: string;
    gallery: string[];
    parts: Omit<Part, 'id'>[];
  }) => {
    const id = data.name.toLowerCase().replace(/\s+/g, '-');
    const newCar: Car = {
      id,
      name: data.name,
      years: data.years,
      img: data.img,
      gallery: data.gallery,
      parts: data.parts.map((p, i) => ({ ...p, id: `temp-${Date.now()}-${i}` }))
    };
    setCars(prev => [...prev, newCar]);
    setShowAddForm(false);
  };

  const updateCar = (data: {
    name: string;
    years: string;
    img: string;
    gallery: string[];
    parts: Omit<Part, 'id'>[];
  }) => {
    if (!editingCar) return;
    const updated: Car = {
      ...editingCar,
      name: data.name,
      years: data.years,
      img: data.img,
      gallery: data.gallery,
      parts: data.parts.map((p, i) => ({
        ...p,
        id: editingCar.parts[i]?.id || `temp-${Date.now()}-${i}`
      }))
    };
    setCars(prev => prev.map(c => c.id === editingCar.id ? updated : c));
    setEditingCar(undefined);
  };

  const deleteCar = (id: string) => {
    if (confirm('Delete this car and all parts?')) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white" 
          />
          <button className="w-full bg-black text-white py-3 rounded-lg font-bold">Login</button>
          <p className="text-xs text-center text-gray-500">Hint: admin123</p>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button onClick={() => setShowAddForm(true)} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Car
        </button>
      </div>

      {showAddForm && <CarForm onSubmit={addNewCar} onCancel={() => setShowAddForm(false)} />}
      {editingCar && <CarForm car={editingCar} onSubmit={updateCar} onCancel={() => setEditingCar(undefined)} />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{car.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{car.years}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">{car.parts.length} parts • {car.gallery.length} photos</p>
              <div className="flex gap-2">
                <button onClick={() => setEditingCar(car)} className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium flex items-center justify-center gap-1">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => deleteCar(car.id)} className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium flex items-center justify-center gap-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// app/admin/page.tsx — CAŁY CarForm (WKLEJ CAŁY)
function CarForm({ 
  car, 
  onSubmit, 
  onCancel 
}: { 
  car?: Car; 
  onSubmit: (data: any) => void; 
  onCancel: () => void;
}) {
  const [name, setName] = useState(car?.name || '');
  const [years, setYears] = useState(car?.years || '');
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState(car?.img || '');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(car?.gallery || []);
  const [parts, setParts] = useState<any[]>(car?.parts || []);

  const addPart = () => setParts([...parts, { name: '', price: 0, description: '', photo: '', preview: '' }]);

  const updatePart = (i: number, field: string, value: any) => {
    const updated = [...parts];
    updated[i][field] = value;
    setParts(updated);
  };

  const removePart = (i: number) => setParts(parts.filter((_, idx) => idx !== i));

  // KONWERSJA PLIKU NA BASE64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!name) return;

    let mainImg = car?.img || '';
    if (mainFile) {
      mainImg = await fileToBase64(mainFile);
    }

    const newGallery: string[] = [...(car?.gallery || [])];
    for (const file of galleryFiles) {
      const base64 = await fileToBase64(file);
      newGallery.push(base64);
    }

    const data = {
      id: car?.id || Date.now().toString(),
      name,
      years,
      img: mainImg,
      gallery: newGallery,
      parts: await Promise.all(parts.map(async (p) => {
        let photo = p.photo;
        if (p.file) {
          photo = await fileToBase64(p.file);
        }
        return {
          id: p.id || Date.now().toString(),
          name: p.name,
          price: p.price,
          description: p.description,
          photo
        };
      }))
    };

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">{car ? 'Edytuj' : 'Dodaj'} Samochód</h2>
          <button onClick={onCancel}><X className="w-6 h-6" /></button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input placeholder="Nazwa" value={name} onChange={e => setName(e.target.value)} className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"/>
          <input placeholder="Lata" value={years} onChange={e => setYears(e.target.value)} className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"/>
        </div>

        {/* GŁÓWNE ZDJĘCIE */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Główne zdjęcie</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setMainFile(file);
                const url = URL.createObjectURL(file);
                setMainPreview(url);
              }
            }} 
          />
          {mainPreview && (
            <img src={mainPreview} alt="preview" className="mt-3 h-64 w-full object-cover rounded-lg shadow-lg" />
          )}
        </div>

        {/* GALERIA */}
        <div className="mb-6">
          <label className="block font-medium mb-2 bg-white dark:bg-gray-800 text-black dark:text-white">Galeria (wiele zdjęć)</label>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              setGalleryFiles(prev => [...prev, ...files]);
              const previews = files.map(f => URL.createObjectURL(f));
              setGalleryPreviews(prev => [...prev, ...previews]);
            }}
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            {galleryPreviews.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="galeria" className="h-32 w-32 object-cover rounded-lg shadow-lg" />
                <button 
                  onClick={() => {
                    setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                  }}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CZĘŚCI */}
        <div className="border-t pt-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-lg">Części</h3>
            <button onClick={addPart} className="text-blue-600 flex items-center gap-1">
              <Plus className="w-5 h-5" /> Dodaj
            </button>
          </div>

          {parts.map((part, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 space-y-3">
              <input placeholder="Nazwa" value={part.name} onChange={e => updatePart(i, 'name', e.target.value)} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"/>
              <input placeholder="Cena ($)" type="number" value={part.price} onChange={e => updatePart(i, 'price', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white" />
              <textarea placeholder="Opis" value={part.description} onChange={e => updatePart(i, 'description', e.target.value)} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white" rows={2} />
              <input 
                type="file" 
                accept="image/*" 
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updatePart(i, 'file', file);
                    const url = URL.createObjectURL(file);
                    updatePart(i, 'preview', url);
                  }
                }} 
              />
              {part.preview && <img src={part.preview} alt="część" className="h-32 object-cover rounded-lg" />}
              <button onClick={() => removePart(i)} className="text-red-600 text-sm">Usuń</button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-end mt-8">
          <button onClick={onCancel} className="px-8 py-3 border rounded-lg font-bold">Anuluj</button>
          <button onClick={handleSubmit} className="bg-black text-white px-8 py-3 rounded-lg font-bold">
            {car ? 'Zapisz' : 'Dodaj'}
          </button>
        </div>
      </div>
    </div>
  );
}
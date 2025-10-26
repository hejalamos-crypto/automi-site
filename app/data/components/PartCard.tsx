import { Parts } from '../types';

export default function PartCard({ part }: { part: Parts }) {
  const stockClass = part.stock <= 2 ? 'stock-low' : part.stock <= 10 ? 'stock-medium' : 'stock-high';
  const stockText = part.stock <= 2 ? 'Low Stock!' : `${part.stock} in stock`;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover border border-gray-200">
      <img src={part.image || 'https://via.placeholder.com/300x200/000000/FFFFFF?text=' + part.name} alt={part.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">{part.brand}</span>
          <span className="text-xs text-gray-500">OEM: {part.oem}</span>
        </div>
        <h3 className="font-medium text-lg mb-2 text-black">{part.name}</h3>
        <p className="text-2xl font-bold text-black mb-2">${part.price.toFixed(2)}</p>
        <p className={`${stockClass} text-sm mb-4`}>{stockText}</p>
        <p className="text-sm text-gray-600 mb-4">Compatible: {part.compatibleModels.join(', ')}</p>
        <button className="w-full btn-primary text-sm py-2.5">Add to Cart</button>
      </div>
    </div>
  );
}

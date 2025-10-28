'use client';
import { Parts } from '@/types';
import { useCart } from '@/hooks/useCart';

export default function PartCard({ part }: { part: Parts }) {
  const { addToCart } = useCart();
  const stockClass = part.stock <= 2 ? 'stock-low' : part.stock <= 10 ? 'stock-medium' : 'stock-high';
  const stockText = part.stock <= 2 ? 'Low Stock!' : `${part.stock} left`;

  return (
    <div className="bg-white rounded-lg overflow-hidden card-shade border border-gray-200">
      <img
        src={part.image}
        alt={part.name}
        className="w-full h-48 object-cover"
        onError={e => (e.currentTarget.src = `https://via.placeholder.com/300x200/000000/FFFFFF?text=${encodeURIComponent(part.name)}`)}
      />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">{part.brand}</span>
          <span className="text-xs text-gray-500">OEM: {part.oem}</span>
        </div>
        <h3 className="font-medium text-lg mb-2 text-black">{part.name}</h3>
        <p className="text-2xl font-bold text-black mb-2">${part.price.toFixed(2)}</p>
        <p className={`${stockClass} text-sm mb-2`}>{stockText}</p>
        <p className="text-xs text-gray-500 mb-4">
          {part.compatibleModels.join(' • ')}
        </p>
        <button
          onClick={() => addToCart(part)}
          className="w-full btn-primary text-sm py-2.5 flex items-center justify-center space-x-2"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

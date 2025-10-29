// app/checkout/page.tsx
'use client';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { items, clearCart, removeFromCart } = useCart();
  const router = useRouter();
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Basket Empty</h1>
        <Link href="/" className="px-6 py-3 bg-black text-white rounded">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price} × {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
          </div>
        ))}
        <div className="font-bold text-xl mt-4">Total: ${totalAmount.toFixed(2)}</div>
      </div>

      <PayPalButtons
        createOrder={(_, actions) => actions.order!.create({
          purchase_units: [{ amount: { value: totalAmount.toString(), currency_code: 'USD' } }]
        })}
        onApprove={async (_, actions) => {
          await actions.order!.capture();
          clearCart();
          router.push('/success');
        }}
      />
    </div>
  );
}
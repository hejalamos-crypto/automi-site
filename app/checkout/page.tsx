// app/checkout/page.tsx
'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { items, clearCart, removeFromCart, addToCart } = useCart();
  const router = useRouter();
  
  // FIXED: Keep number for PayPal, format for display
  const totalAmount = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const total = totalAmount.toFixed(2);

  const updateQuantity = (item: any, delta: number) => {
    if (delta < 0 && item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      for (let i = 0; i < Math.abs(delta); i++) {
        delta > 0 ? addToCart(item) : removeFromCart(item.id);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your basket is empty</h1>
        <Link href="/" className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
        currency: 'USD',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item, -1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >−</button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item, 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >+</button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm ml-4 hover:underline"
                >Remove</button>
              </div>
              <span className="font-bold w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-4 font-bold text-lg flex justify-between">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
<PayPalButtons
  style={{ layout: 'vertical' }}
  createOrder={(_data, actions) => {
    if (!actions?.order) {
      throw new Error('PayPal order not available');
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toString(),
            currency_code: 'USD',
          },
        },
      ],
    });
  }}
  onApprove={async (data, actions) => {
    if (!actions?.order) return;
    try {
      const capture = await actions.order.capture();
      console.log('Payment captured:', capture);
      clearCart();
      router.push('/success');
    } catch (err) {
      console.error('Capture failed:', err);
      alert('Payment failed. Please try again.');
    }
  }}
  onError={(err) => {
    console.error('PayPal error:', err);
    alert('Something went wrong with PayPal. Please try again.');
  }}
/>
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
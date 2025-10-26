'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '@/hooks/useCart';

export default function Checkout() {
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: { value: total }
      }]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    await actions.order.capture();
    alert('Payment successful!');
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map(item => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4 font-bold text-lg">
          Total: ${total}
        </div>
      </div>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
}

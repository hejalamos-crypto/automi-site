'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function Checkout() {
  // Assume cart from localStorage – add logic
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{ amount: { value: '100.00' } }], // Replace with cart total
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      alert('Payment successful!');
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test' }}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
}

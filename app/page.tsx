'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '@/hooks/useCart';

export default function Checkout() {
  const { items, clearCart, removeFromCart, addToCart } = useCart();
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
    alert('Payment successful! Thank you for your order.');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <a href="/" className="btn-primary inline-block">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(item)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
              >
                +
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    // Reduce by 1
                    for (let i = 0; i < item.quantity - 1; i++) {
                      removeFromCart(item.id);
                      addToCart(item);
                    }
                  } else {
                    removeFromCart(item.id);
                  }
                }}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
              >
                −
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm ml-4 hover:underline"
              >
                Remove
              </button>
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
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
}

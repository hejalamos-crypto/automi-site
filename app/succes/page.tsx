// app/success/page.tsx
import Link from 'next/link';

export default function Success() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6 text-green-600">Payment Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase. Your order is being processed.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
        Continue Shopping
      </Link>
    </div>
  );
}
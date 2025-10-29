// app/success/page.tsx
import Link from 'next/link';

export default function Success() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="mb-8">
        <svg className="w-20 h-20 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-4 text-green-600">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition transform hover:scale-105"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
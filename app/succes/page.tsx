import Link from 'next/link';

export default function Success() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Success!</h1>
      <Link href="/" className="px-8 py-4 bg-black text-white rounded-full">Continue Shopping</Link>
    </div>
  );
}
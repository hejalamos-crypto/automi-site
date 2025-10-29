// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo + Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-3">Automi</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium aftermarket parts for Audi A3 • A4 • A5 • A6 (2007-2011)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/#parts" className="text-gray-400 hover:text-white transition">All Parts</Link></li>
              <li><Link href="/checkout" className="text-gray-400 hover:text-white transition">Basket</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <p className="text-sm text-gray-400 space-y-1">
              <span className="block">Melbourne, VIC 3000</span>
              <span className="block">+61 3 9876 5432</span>
              <span className="block">parts@automi.com</span>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Automi Parts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
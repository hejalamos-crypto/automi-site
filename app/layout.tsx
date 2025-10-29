'use client';

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CartProvider } from '@/hooks/useCart';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test' }}>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </PayPalScriptProvider>
        <body className="min-h-screen flex flex-col">
  <Header />
  <main className="flex-grow">{children}</main>
  <Footer />  {/* ADD THIS */}
</body>
      </body>
    </html>
  );
}

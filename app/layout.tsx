// app/layout.tsx
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
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
            currency: 'USD',
          }}
        >
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </PayPalScriptProvider>
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import './globals.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Automi - Audi Parts 2007-2011',
  description: 'Premium parts for Audi A3, A4, A5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen font-sans">
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
            currency: 'USD',
          }}
        >
          <Header />
          {children}
          <Footer />
        </PayPalScriptProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export const metadata: Metadata = {
  title: 'Automi - Audi Parts',
  description: 'Premium parts for Audi A3, A4, A5 (2007-2011)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test' }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </PayPalScriptProvider>
      </body>
    </html>
  );
}

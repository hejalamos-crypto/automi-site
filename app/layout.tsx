// app/layout.tsx
import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Automi',
  description: 'Your car parts shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
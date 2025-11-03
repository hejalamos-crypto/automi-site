// app/contact/page.tsx
'use client';

export default function Contact() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
    <div className={`min-h-screen py-20 transition-colors ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
        <div className={`p-10 rounded-3xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <p className="text-lg mb-6">Email: contact@automi.com</p>
          <p className="text-lg mb-6">Phone: +48 123 456 789</p>
          <p className="text-lg">Address: Warsaw, Poland</p>
        </div>
      </div>
    </div>
  );
}
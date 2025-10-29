{/* HERO WITH CENTER LOGO */}
<section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-60"></div>
  <div className="relative max-w-7xl mx-auto px-4 text-center">
    
    {/* LOGO + HOME BUTTON */}
    <Link href="/" className="inline-block mb-6 group">
      <div className="relative">
        <img
          src="/images/logo.png"
          alt="Automi Logo"
          className="h-20 w-auto mx-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">Home</span>
        </div>
      </div>
    </Link>

    {/* TEXT */}
    <h1 className="text-4xl md:text-6xl font-black mb-16 tracking-tight">
      Choose Your Parts
    </h1>

    {/* CTA */}
    <Link
      href="#parts"
      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition transform hover:scale-105"
    >
      Start Shopping
    </Link>
  </div>
</section>
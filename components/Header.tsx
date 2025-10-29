<div className="flex items-center gap-6">
  <Link href="/contact" className="font-medium hover:text-gray-300">
    Contact
  </Link>
  <Link href="/checkout" className="relative font-medium hover:text-gray-300">
    Basket
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-4 bg-white text-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
        {itemCount}
      </span>
    )}
  </Link>
</div>
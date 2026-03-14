import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

// navigation bar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5 py-5 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <Link href="/" className="text-2xl font-black text-gradient tracking-tighter uppercase italic">
        LAUNCHBASE<span className="text-white drop-shadow-sm">STORE</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/products" className="hover:text-purple-400 transition-colors">Products</Link>
        <Link href="/categories" className="hover:text-purple-400 transition-colors">Categories</Link>
        <Link href="/deals" className="hover:text-purple-400 transition-colors">Deals</Link>
      </div>

      <div className="flex items-center space-x-6">
        <button className="hidden md:block hover:text-purple-400 transition-colors">
          <Search size={20} />
        </button>
        <Link href="/cart" className="hover:text-purple-400 transition-colors">
          <ShoppingCart size={20} />
        </Link>
        <Link href="/login" className="hover:text-purple-400 transition-colors">
          <User size={20} />
        </Link>
        <button 
          className="md:hidden hover:text-purple-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-dark flex flex-col p-6 space-y-4 md:hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5">Products</Link>
          <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5">Categories</Link>
          <Link href="/deals" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5">Deals</Link>
          <div className="flex items-center space-x-4 pt-4">
            <button className="hover:text-purple-400 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

/**
 * Main Navigation Component
 * Modern glassmorphism design
 */
const Navbar = () => {
  // state for mobile toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* COPYABLE NAVBAR START */
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5 py-5 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
      {/* subtle glowing bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      {/* Brand Logo Link */}
      <Link href="/" className="text-2xl font-black text-gradient tracking-tighter uppercase italic">
        LAUNCHBASE<span className="text-white drop-shadow-sm">STORE</span>
      </Link>

      {/* Main Desktop Menu Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/products" className="hover:text-purple-400 transition-colors">Products</Link>
        <Link href="/categories" className="hover:text-purple-400 transition-colors">Categories</Link>
        <Link href="/deals" className="hover:text-purple-400 transition-colors text-pink-400 font-medium">Deals</Link>
      </div>

      {/* User Action Icons Container */}
      <div className="flex items-center space-x-6">
        {/* Search Toggle Icon */}
        <button className="hidden md:block hover:text-purple-400 transition-colors">
          <Search size={20} />
        </button>
        {/* Shopping Cart Link */}
        <Link href="/cart" className="hover:text-purple-400 transition-colors">
          <ShoppingCart size={20} />
        </Link>
        {/* User Profile Link */}
        <Link href="/login" className="hover:text-purple-400 transition-colors">
          <User size={20} />
        </Link>
        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden hover:text-purple-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Responsive Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-dark flex flex-col p-6 space-y-4 md:hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5">Products</Link>
          <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5">Categories</Link>
          <Link href="/deals" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5">Deals</Link>
          <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition-colors py-2 border-b border-white/5 font-bold">Cart</Link>
          <div className="flex items-center space-x-4 pt-4">
            <button className="hover:text-purple-400 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
  /* COPYABLE NAVBAR END */
};

export default Navbar;


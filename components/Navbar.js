import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';

// navigation bar component
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass py-4 px-6 md:px-12 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-gradient tracking-tight">
        LAUNCHBASE<span className="text-white">STORE</span>
      </Link>

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
        <button className="md:hidden hover:text-purple-400 transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

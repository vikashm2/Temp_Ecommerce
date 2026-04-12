import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, User, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium Navbar Component
 * Refined glassmorphism and animated mobile drawer
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`sticky top-0 z-[60] transition-all duration-500 ${
      scrolled ? 'py-3 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter uppercase italic group">
            LAUNCHBASE<span className="text-purple-500 group-hover:text-white transition-colors duration-500">STORE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-10">
          {['Products', 'Categories', 'Deals'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex flex-1 justify-end items-center space-x-5 md:space-x-8">
          <div className="hidden md:flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearch} 
                  className="mr-3 overflow-hidden"
                >
                  <input 
                    type="text" 
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..." 
                    className="glass-milky rounded-full py-1.5 px-4 text-xs w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </motion.form>
              )}
            </AnimatePresence>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-slate-400 hover:text-white transition-colors">
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
          
          <Link href="/cart" className="text-slate-400 hover:text-white transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center text-white">2</span>
          </Link>
          
          <Link href="/login" className="hidden md:block text-slate-400 hover:text-white transition-colors">
            <User size={20} />
          </Link>

          <button 
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#02040a] md:hidden flex flex-col p-10 pt-32"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-slate-400"
            >
              <X size={32} />
            </button>

            <form onSubmit={handleSearch} className="mb-12">
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="glass-milky rounded-2xl py-5 px-8 w-full text-lg focus:outline-none border-white/10"
                />
            </form>
            
            <div className="flex flex-col space-y-8">
              {['Home', 'Products', 'Categories', 'Deals', 'Cart', 'Account'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tighter hover:text-purple-500 transition-colors flex items-center justify-between group"
                  >
                    {item}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-10">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex space-x-6">
                {['TW', 'IG', 'FB'].map(social => (
                  <span key={social} className="text-xl font-black text-white/20 hover:text-purple-500 transition-colors cursor-pointer">{social}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

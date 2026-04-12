import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { Search, Filter, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Premium Products Listing Page
 * Features advanced search and refined grid
 */
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout title="Explore Collection | LaunchBase Store">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-20"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4 block">
             The Collection
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Explore <span className="text-gradient">Drops</span>
          </h1>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 mb-20 relative">
          <div className="relative flex-grow group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by series or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-milky rounded-3xl py-5 pl-16 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/50 text-lg placeholder:text-slate-600 transition-all font-medium"
            />
          </div>
          <button className="btn-secondary flex items-center justify-center gap-3 px-10 rounded-3xl">
            <Filter size={20} />
            <span className="uppercase tracking-widest text-xs font-black">Refine</span>
          </button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="glass-card aspect-[4/5] animate-pulse bg-white/5"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div variants={itemVariants}>
            <ProductGrid products={filteredProducts} />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="text-center py-32 glass-card rounded-[3rem]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 mx-auto border border-white/10">
               <Sparkles size={32} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">No matches found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search parameters for better results.</p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}

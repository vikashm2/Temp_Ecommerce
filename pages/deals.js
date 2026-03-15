import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';

// Discounted demo products
const dealProducts = [
  {
    _id: '101',
    title: 'Limited Edition Mech Keyboard',
    price: 150,
    oldPrice: 220,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
    description: 'Hot-swappable tactile switches with custom RGB mapping. A collector\'s piece.',
    category: 'Peripherals',
    onSale: true
  },
  {
    _id: '102',
    title: 'VR-X Immersion Goggles',
    price: 499,
    oldPrice: 650,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop',
    description: 'Next-gen virtual reality with 8K resolution and spatial audio integration.',
    category: 'Electronics',
    onSale: true
  }
];

/**
 * Featured Deals Page
 * Display high-discount products
 */
export default function Deals() {
  /* COPYABLE DEALS PAGE START */
  return (
    <Layout>
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-20 text-center relative">
          {/* subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 blur-[120px] rounded-full"></div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 italic"
          >
            Sizzling <span className="text-gradient underline decoration-pink-500 decoration-wavy decoration-2 underline-offset-8">Deals</span>
          </motion.h1>
          <p className="text-slate-400 text-xl font-bold uppercase tracking-[0.3em]">Premium Tech • Massive Savings</p>
        </header>

        {/* Dynamic Deals Grid */}
        <section className="relative z-10">
          <ProductGrid products={dealProducts} />
        </section>

        {/* Limited Time Notice */}
        <div className="mt-24 glass-card p-12 text-center border-pink-500/20">
          <h3 className="text-2xl font-black mb-4 uppercase italic">Drops Refresh Weekly</h3>
          <p className="text-slate-400 font-medium">Hurry! These futuristic prices won't last forever. Our stock is extremely limited for featured drops.</p>
        </div>
      </div>
    </Layout>
  );
  /* COPYABLE DEALS PAGE END */
}

import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { Zap, Timer, Sparkles } from 'lucide-react';

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
 * Premium Deals Page
 * Features high-discount products with immersive styling
 */
export default function Deals() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Layout title="Premium Deals | LaunchBase Store">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-24 max-w-7xl mx-auto"
      >
        <motion.header variants={itemVariants} className="mb-20 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
             <Zap size={20} className="text-pink-500 fill-pink-500/20" />
             <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.5em]">Flash Operations</span>
             <Zap size={20} className="text-pink-500 fill-pink-500/20" />
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 italic uppercase leading-[0.8]">
            Sizzling <span className="text-gradient">Drops</span>
          </h1>
          
          <div className="flex items-center justify-center gap-8 py-3 px-8 glass-milky w-max mx-auto rounded-2xl border border-pink-500/10">
             <div className="flex items-center gap-2">
                <Timer size={16} className="text-pink-400" />
                <span className="text-xs font-black uppercase tracking-widest text-white">23h : 44m : 12s Remaining</span>
             </div>
          </div>
        </motion.header>

        {/* Dynamic Deals Grid */}
        <motion.section variants={itemVariants} className="relative z-10 mb-32">
          <ProductGrid products={dealProducts} />
        </motion.section>

        {/* Limited Time Notice */}
        <motion.div 
          variants={itemVariants}
          className="glass-card p-12 md:p-24 text-center rounded-[4rem] border border-pink-500/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] rounded-full"></div>
          
          <div className="w-20 h-20 bg-pink-500/10 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-pink-500/20 text-pink-400">
             <Sparkles size={32} />
          </div>
          <h3 className="text-3xl md:text-4xl font-black mb-6 uppercase italic tracking-tighter">Inventory Refresh Weekly</h3>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Hurry! These futuristic prices won't last forever. Our stock is strictly limited for featured drops. Secure your gear before the supply cycle ends.
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

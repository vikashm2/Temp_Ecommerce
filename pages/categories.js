import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

// category definitions with premium images
const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop', count: 12, label: 'High-End Tech' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop', count: 8, label: 'Modern Apparel' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1513519247341-331663675a6c?q=80&w=1000&auto=format&fit=crop', count: 5, label: 'Digital Living' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1526170315873-3a5616282962?q=80&w=1000&auto=format&fit=crop', count: 15, label: 'Essentials' },
];

/**
 * Premium Categories Gallery Page
 * Immersive visual browser for shop segments
 */
export default function Categories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Layout title="Market Sectors | LaunchBase Store">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-24 max-w-7xl mx-auto"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="mb-20">
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4 block">
             The Infrastructure
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Market <span className="text-gradient">Sectors</span>
          </h1>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative h-[32rem] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5"
            >
              <Link href={`/products?category=${cat.name.toLowerCase()}`} className="block w-full h-full relative">
                <img 
                  src={cat.image} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0 contrast-[1.1]" 
                  alt={cat.name} 
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3.5rem]"></div>
                
                <div className="absolute bottom-12 left-10 right-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">{cat.label}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter transition-all group-hover:text-purple-300">
                    {cat.name}
                  </h3>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.count} Series Available</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                       <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}

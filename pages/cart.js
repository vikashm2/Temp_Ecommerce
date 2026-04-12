import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * Premium Shopping Cart Page
 * High-impact empty state and consistent design
 */
export default function Cart() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Layout title="Vault | LaunchBase Store">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-24 max-w-7xl mx-auto min-h-[75vh] flex flex-col"
      >
        <motion.div variants={itemVariants} className="mb-16">
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4 block">
             Shopping Bag
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Your <span className="text-gradient">Vault</span>
          </h1>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex-grow flex flex-col items-center justify-center text-center glass-card p-12 md:p-32 rounded-[4rem] relative overflow-hidden"
        >
          {/* Internal Glows for Depth */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>

          {/* Empty Cart Visual State */}
          <div className="relative mb-12">
            <div className="w-40 h-40 bg-white/[0.03] rounded-[3rem] flex items-center justify-center mb-10 mx-auto border border-white/10 shadow-2xl relative">
              <ShoppingBag size={56} className="text-slate-400" />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/40">
                <Sparkles size={20} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 italic">The Vault is Empty</h2>
            <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg leading-relaxed">
              Looks like you haven't secured any futuristic technology for your collection yet.
            </p>
          </div>

          {/* Action Button */}
          <Link href="/products" className="btn-primary py-5 px-12 rounded-[2rem] group text-lg">
            Start Exploration
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
          
          <div className="mt-16 pt-12 border-t border-white/5 w-full flex flex-col md:flex-row justify-center items-center gap-10">
             {['Free Global Shipping', 'Secure Transactions', 'Authentic Goods'].map(label => (
               <span key={label} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{label}</span>
             ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

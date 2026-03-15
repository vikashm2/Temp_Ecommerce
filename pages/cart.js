import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Shopping Cart Page
 * Summary and checkout entry
 */
export default function Cart() {
  /* COPYABLE CART SECTION START */
  return (
    <Layout>
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh] flex flex-col">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">
          YOUR <span className="text-gradient">CART</span>
        </h1>

        <div className="flex-grow flex flex-col items-center justify-center text-center glass-card p-12 md:p-24">
          {/* Empty Cart Visual State */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-10"
          >
            <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 mx-auto border border-white/10 ring-4 ring-purple-500/10">
              <ShoppingBag size={48} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Cart is currently empty</h2>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">
              Looks like you haven't added any futuristic gear to your collection yet.
            </p>
          </motion.div>

          {/* Return to Shop Action */}
          <Link href="/products" className="btn-primary group">
            Start Shopping
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
  /* COPYABLE CART SECTION END */
}

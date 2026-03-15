import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

/**
 * Main Landing Page
 * Features Hero, Deals, and Featured Products
 */

// Featured demo products
const demoProducts = [
  {
    _id: '1',
    title: 'Quantum Horizon Headphones',
    price: 299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    description: 'Immerse yourself in crystal clear audio with our flagship noise-canceling headphones.',
    category: 'Electronics',
  },
  {
    _id: '2',
    title: 'Cyber-Speed Sneaker X',
    price: 180,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    description: 'Engineered for speed and comfort. The future of athletic footwear is here.',
    category: 'Fashion',
  },
  {
    _id: '3',
    title: 'Nova-Light Desk Lamp',
    price: 75,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop',
    description: 'Sleek design meets smart lighting. Transform your workspace with Nova-Light.',
    category: 'Home',
  },
  {
    _id: '4',
    title: 'Aero-Fit Smart Watch',
    price: 240,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    description: 'Track your fitness, notifications, and more in style with Aero-Fit.',
    category: 'Accessories',
  },
];

// Special deal products
const dealProducts = [
  {
    _id: 'deal1',
    title: 'Aero-Fit Pro Watch',
    price: 199,
    oldPrice: 299,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop',
    description: 'Pro edition with advanced health sensors and titanium finish.',
    category: 'Electronics',
    onSale: true
  }
];

export default function Home() {
  const title = "Elevate Your Experience";
  
  return (
    <Layout>
      {/* Animated background mesh */}
      <div className="fixed inset-0 bg-mesh opacity-30 -z-10 animate-pulse-slow"></div>
      
      {/* COPYABLE HERO START */}
      <section className="py-24 md:py-40 flex flex-col items-center text-center relative overflow-hidden">
        {/* Floating glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] -z-10 rounded-full animate-pulse-slow"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-10"
        >
          <span className="flex items-center justify-center gap-2 text-xs font-black text-purple-400 uppercase tracking-[0.4em] mb-6">
            <Sparkles size={14} /> The Future is Here
          </span>
          <h1 className="text-7xl md:text-9xl font-black relative tracking-tighter leading-[0.9] px-4 italic uppercase">
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-4 last:mr-0">
                {word === "Experience" ? (
                  <span className="text-gradient drop-shadow-2xl">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>
        </motion.div>
        
        {/* Main hero description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-slate-400 text-xl md:text-2xl max-w-3xl mb-14 px-6 leading-relaxed font-medium"
        >
          Discover a curated collection of futuristic products designed for the modern high-performance developer.
        </motion.p>
        
        {/* Hero action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-8 px-6 w-full sm:w-auto"
        >
          <Link href="/products" className="btn-primary min-w-[200px] uppercase tracking-widest text-sm">Shop Now</Link>
          <Link href="/about" className="btn-secondary min-w-[200px] uppercase tracking-widest text-sm">Our Story</Link>
        </motion.div>
      </section>
      {/* COPYABLE HERO END */}

      {/* COPYABLE DEALS SECTION START */}
      <section className="py-24 relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20">
              <Zap className="text-pink-400" size={24} />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tight uppercase italic">Flash <span className="text-pink-400">Deals</span></h2>
              <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Expires in 24 hours</p>
            </div>
          </div>
          <Link href="/deals" className="btn-secondary py-3 px-6 text-xs uppercase tracking-widest group">
            View All Deals <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Deals grid component */}
        <ProductGrid products={dealProducts} />
      </section>
      {/* COPYABLE DEALS SECTION END */}

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="flex items-center justify-between mb-16 px-2">
          <h2 className="text-4xl font-black tracking-tight uppercase">Featured <span className="text-purple-400">Drops</span></h2>
          <Link href="/products" className="text-sm font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em] border-b-2 border-purple-500 pb-1">
            Browse All
          </Link>
        </div>
        
        {/* Product grid component */}
        <ProductGrid products={demoProducts} />
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-24">
        <div className="glass-card p-10 md:p-24 text-center rounded-[3.5rem] relative overflow-hidden ring-1 ring-white/10">
          {/* Internal card glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] -mr-48 -mt-48 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] -ml-48 -mb-48 rounded-full"></div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">Stay in the <span className="text-gradient">Loop</span></h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Subscribe to our newsletter and get notified about new futuristic releases and exclusive drops.
          </p>
          <div className="flex flex-col sm:flex-row max-w-xl mx-auto space-y-5 sm:space-y-0 border border-white/10 p-2 rounded-3xl bg-white/[0.02]">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-transparent py-4 px-6 focus:outline-none text-white font-medium"
            />
            <button className="btn-primary py-4 px-10 rounded-2xl sm:rounded-2xl">Join Now</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}


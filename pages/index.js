import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Globe, Shield, CreditCard } from 'lucide-react';

/**
 * Premium Home Page
 * High-impact hero and curated sections
 */

// Demo products
const demoProducts = [
  /* Same as before... but integrated with better styling */
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-32"
      >
        {/* Modern Hero Section */}
        <section className="relative pt-12 md:pt-32 pb-20 flex flex-col items-center text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-2">
              <Sparkles size={12} /> New Collection 2026
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl md:text-9xl font-black mb-8 leading-[1.1] tracking-tight uppercase italic pr-4">
            Future of <br />
            <span className="text-gradient">Commerce</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed px-4">
            Experience the next generation of online shopping with high-performance aesthetics and curated futuristic drops.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6">
            <Link href="/products" className="btn-primary min-w-[220px]">
              Explore Collection <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary min-w-[220px]">
              Our Vision
            </Link>
          </motion.div>

          {/* Hero Image / Video Placeholder element */}
          <motion.div 
            variants={itemVariants}
            className="mt-24 w-full max-w-6xl mx-auto aspect-[21/9] rounded-[3rem] overflow-hidden glass border-white/10 relative p-2"
          >
            <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-purple-900/40 to-indigo-900/40 relative overflow-hidden group">
               <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-50 transition-transform duration-[3s] group-hover:scale-110" 
                alt="Tech banner"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: 'Global Shipping', desc: 'Secure delivery to over 150 countries worldwide.' },
            { icon: Shield, title: 'Secure Checkout', desc: 'Enterprise-grade encryption for all your transactions.' },
            { icon: CreditCard, title: 'Flexible Payments', desc: 'Support for Crypto, Apple Pay, and all major cards.' },
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Flash Deals Section */}
        <section className="relative">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-pink-600/10 rounded-[2rem] border border-pink-500/20">
                <Zap className="text-pink-500 animate-pulse" size={32} />
              </div>
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic">Flash <span className="text-pink-500">Sales</span></h2>
                <p className="text-slate-500 text-sm font-bold tracking-widest uppercase mt-2">Ends in 08:42:15</p>
              </div>
            </div>
            <Link href="/deals" className="btn-secondary py-3 px-8 text-xs">
              View All <ArrowRight size={14} className="ml-2" />
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ProductGrid products={dealProducts} />
          </motion.div>
        </section>

        {/* Featured Drops */}
        <section>
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-12 px-2">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic">Curated <span className="text-purple-500">Drops</span></h2>
            <Link href="/products" className="text-xs font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.4em] border-b border-purple-500 pb-2">
              Shop Labs
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ProductGrid products={demoProducts} />
          </motion.div>
        </section>

        {/* Newsletter / CTA */}
        <section className="pb-20">
          <motion.div variants={itemVariants} className="glass-card p-12 md:p-32 rounded-[4rem] relative overflow-hidden text-center group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-125"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -ml-64 -mb-64 transition-transform duration-1000 group-hover:scale-125"></div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">Stay Ahead <br /><span className="text-gradient">of the Curve</span></h2>
            <p className="text-slate-400 mb-14 max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Join our exclusive inner circle and receive first access to limited edition technology drops.
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-2xl mx-auto gap-4 glass-milky p-2.5 rounded-[2.5rem] border-white/5 shadow-2xl">
              <input 
                type="email" 
                placeholder="Enter your vault address" 
                className="flex-grow bg-transparent py-4 px-8 focus:outline-none text-white font-medium text-lg placeholder:text-slate-600"
              />
              <button className="btn-primary rounded-[2rem] py-5 px-12 group">
                Enter Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <p className="mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest">No spam. Only high-performance updates.</p>
          </motion.div>
        </section>
      </motion.div>
    </Layout>
  );
}


// Mobile hero text adjusted

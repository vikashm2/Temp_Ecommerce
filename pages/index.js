import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import Link from 'next/link';

// demo products for initial showcase
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

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full"></div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative">
            Elevate Your <span className="text-gradient">Experience</span>
          </h1>
        </motion.div>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          Discover a curated collection of futuristic products designed for the modern developer and tech enthusiast.
        </p>
        
        <div className="flex space-x-4">
          <Link href="/products" className="btn-primary">Shop Now</Link>
          <button className="btn-secondary">Learn More</button>
        </div>
      </section>

      {/* Featured Products Segment */}
      <section className="py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Featured <span className="text-purple-400">Products</span></h2>
          <Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors underline decoration-purple-500 underline-offset-4">
            View All
          </Link>
        </div>
        
        <ProductGrid products={demoProducts} />
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-20">
        <div className="glass-card p-6 sm:p-12 text-center rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-3xl -ml-32 -mb-32 rounded-full"></div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and get notified about new futuristic releases and exclusive drops.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow glass rounded-xl sm:rounded-r-none py-3 px-6 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button className="bg-white text-black font-bold px-8 py-3 rounded-xl sm:rounded-l-none hover:bg-gray-200 transition-colors">Join</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';

/**
 * Premium Product Card
 * Interactive glassmorphism with high-end typography
 */
const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card group flex flex-col h-full relative overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Image Container */}
      <Link href={`/products/${product._id}`} className="block overflow-hidden aspect-[4/5] relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        
        {/* Floating Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="glass-milky text-[10px] font-black text-purple-300 uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
            {product.category}
          </span>
        </div>

        {/* Action Button Overlays */}
        <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <div className="flex gap-2">
              <button className="w-12 h-12 glass-milky rounded-2xl flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all">
                <ShoppingCart size={18} />
              </button>
           </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-8 pb-10 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start gap-4 mb-4">
          <Link href={`/products/${product._id}`} className="flex-grow">
            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-[1.1] tracking-tighter uppercase italic">
              {product.title}
            </h3>
          </Link>
          <div className="text-slate-500 group-hover:text-white transition-colors">
            <ArrowUpRight size={20} />
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-10 line-clamp-2 flex-grow leading-relaxed font-medium">
          {product.description}
        </p>

        {/* Price & Footer */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-black">Price Point</span>
            <span className="text-2xl font-black text-white tracking-tighter">${product.price}</span>
          </div>
          
          <Link href={`/products/${product._id}`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 group-hover:text-white transition-colors">
              Details
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

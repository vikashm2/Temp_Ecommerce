import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

// single product card component
const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="glass-card overflow-hidden group flex flex-col h-full relative"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <Link href={`/products/${product._id}`} className="block overflow-hidden h-72 relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
      </Link>

      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="mb-4">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-2 block">
            {product.category}
          </span>
          <Link href={`/products/${product._id}`}>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>
        
        <p className="text-slate-400 text-sm mb-8 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-medium">Price</span>
            <span className="text-2xl font-black text-white tracking-tight">${product.price}</span>
          </div>
          <button className="p-4 glass rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300 group/btn shadow-xl hover:shadow-purple-500/30">
            <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform"/>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

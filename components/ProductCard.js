import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

/**
 * Individual Product Card
 * Interactive glassmorphism style
 */
const ProductCard = ({ product }) => {
  /* COPYABLE PRODUCT CARD START */
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -15, scale: 1.02 }}
      className="glass-card overflow-hidden group flex flex-col h-full relative"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Image Container Component */}
      <Link href={`/products/${product._id}`} className="block overflow-hidden h-72 relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        {/* subtle image overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500"></div>
      </Link>

      {/* Card Body Content */}
      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="mb-4">
          {/* Product Category Badge */}
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.25em] mb-3 block">
            {product.category}
          </span>
          {/* Main Product Title */}
          <Link href={`/products/${product._id}`}>
            <h3 className="text-xl font-extrabold text-white group-hover:text-purple-300 transition-colors line-clamp-1 tracking-tight">
              {product.title}
            </h3>
          </Link>
        </div>
        
        {/* Brief Product Description */}
        <p className="text-slate-400 text-sm mb-10 line-clamp-2 flex-grow leading-relaxed font-medium">
          {product.description}
        </p>

        {/* Footer Price/Action Area */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-black">Price</span>
            <span className="text-2xl font-black text-white tracking-tighter drop-shadow-sm">${product.price}</span>
          </div>
          {/* Add to Cart Button */}
          <button className="p-4 glass rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-500 group/btn shadow-xl hover:shadow-purple-500/40 transform active:scale-90">
            <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform"/>
          </button>
        </div>
      </div>
    </motion.div>
  );
  /* COPYABLE PRODUCT CARD END */
};

export default ProductCard;


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
      whileHover={{ y: -8 }}
      className="glass-card overflow-hidden group flex flex-col h-full"
    >
      <Link href={`/products/${product._id}`} className="block overflow-hidden h-64">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/products/${product._id}`}>
            <h3 className="text-lg font-semibold hover:text-purple-400 transition-colors line-clamp-1">{product.title}</h3>
          </Link>
          <span className="text-purple-400 font-bold">${product.price}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</span>
          <button className="p-2 glass rounded-full hover:bg-purple-600 transition-all duration-300">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

// category definitions
const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop', count: 12 },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop', count: 8 },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1513519247341-331663675a6c?q=80&w=1000&auto=format&fit=crop', count: 5 },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1526170315873-3a5616282962?q=80&w=1000&auto=format&fit=crop', count: 15 },
];

/**
 * Categories Gallery Page
 * Visual browser for shop segments
 */
export default function Categories() {
  /* COPYABLE CATEGORIES START */
  return (
    <Layout>
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter uppercase italic">
          Market <span className="text-gradient">Sectors</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-96 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <Link href={`/products?category=${cat.name.toLowerCase()}`}>
                <img src={cat.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <span className="text-xs font-black text-purple-400 uppercase tracking-widest mb-1 block">{cat.count} Products</span>
                  <h3 className="text-3xl font-black text-white">{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
  /* COPYABLE CATEGORIES END */
}

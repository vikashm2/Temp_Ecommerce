import Layout from '../components/Layout';
import { motion } from 'framer-motion';

/**
 * About Us Page
 * Narrative and vision section
 */
export default function About() {
  /* COPYABLE ABOUT SECTION START */
  return (
    <Layout>
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            OUR <span className="text-gradient">STORY</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            We are building the future of digital commerce, one pixel at a time.
          </p>
        </motion.div>

        {/* Content Breakdown Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12"
          >
            <h2 className="text-3xl font-bold mb-6">The Vision</h2>
            <p className="text-slate-400 leading-loose mb-6 font-medium">
              LaunchBase was born from a desire to merge cutting-edge technology with seamless user experiences. Our mission is to provide developers with the most beautiful start for their e-commerce journeys.
            </p>
            <p className="text-slate-400 leading-loose font-medium">
              We believe that every interaction should be an experience, not just a transaction.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-[3rem] overflow-hidden group shadow-2xl"
          >
            {/* Visual representation placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
              alt="Team working" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
  /* COPYABLE ABOUT SECTION END */
}

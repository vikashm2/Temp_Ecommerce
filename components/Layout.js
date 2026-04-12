import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

// Global Layout component
const Layout = ({ children, title = 'LaunchBase Ecomm Store' }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative bg-[#02040a]">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Modern Ecommerce Starter Template" />
      </Head>

      {/* Global Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[#02040a] pointer-events-none">
        <div className="glow-blob w-[500px] h-[500px] bg-purple-600/10 -top-48 -left-48"></div>
        <div className="glow-blob w-[600px] h-[600px] bg-indigo-600/10 -bottom-48 -right-48 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main 
          key={router.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow container mx-auto px-4 py-8 pb-32 md:pb-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;

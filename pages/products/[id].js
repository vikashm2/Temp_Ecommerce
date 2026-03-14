import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';

// product detail page component
export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Layout><div className="min-h-screen flex items-center justify-center animate-pulse text-purple-400">Loading details...</div></Layout>;
  if (!product) return <Layout><div className="min-h-screen flex items-center justify-center">Product not found.</div></Layout>;

  return (
    <Layout title={`${product.title} | LaunchBase Store`}>
      <div className="py-10">
        <Link href="/products" className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors w-fit">
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card overflow-hidden rounded-3xl"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover aspect-square"
            />
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-purple-400 uppercase tracking-widest text-sm font-bold mb-4">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold">$ {product.price}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <Truck className="text-purple-400" size={20} />
                <span>Free shipping on orders over $500</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <RotateCcw className="text-purple-400" size={20} />
                <span>30-day easy return policy</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <ShieldCheck className="text-purple-400" size={20} />
                <span>2-year international warranty</span>
              </div>
            </div>

            <button className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-4">
              <ShoppingCart size={24} />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

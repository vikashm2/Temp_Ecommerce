import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { Search, Filter } from 'lucide-react';

// product listing page component
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="All Products | LaunchBase Store">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-10">Explore <span className="text-gradient">Products</span></h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card h-80 animate-pulse bg-white/5"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-20 glass-card">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

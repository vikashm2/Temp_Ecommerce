import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductForm from '../../components/ProductForm';
import { Plus, Pencil, Trash2, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Very basic check, in reality this should be stronger
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [router]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSubmit = async (formData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="Admin Management | LaunchBase Store">
      <div className="py-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Product <span className="text-gradient">Management</span></h1>
          <button 
            onClick={() => { setShowForm(true); setEditingProduct(null); }}
            className="btn-primary flex items-center gap-2 mt-4 md:mt-0"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 rounded-2xl mb-12 border-purple-500/30"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">Cancel</button>
              </div>
              <ProductForm 
                product={editingProduct} 
                onSubmit={handleProductSubmit} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-card overflow-hidden rounded-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={product.image} alt={product.title} className="w-10 h-10 object-cover rounded-lg" />
                    <span className="font-semibold">{product.title}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-purple-400">${product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button 
                        onClick={() => { setEditingProduct(product); setShowForm(true); }}
                        className="hover:text-purple-400 transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No products found. Start by adding one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

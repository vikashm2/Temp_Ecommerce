import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut } from 'lucide-react';

// dashboard sidebar component
// dashboard sidebar component with role-based links
const Sidebar = ({ active, onLogout, role }) => {
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    // only sellers see products management
    ...(role === 'seller' ? [{ id: 'manage', label: 'Manage Products', icon: Package }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="glass-card p-8 rounded-[2rem] h-fit">
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button 
              onClick={() => router.push(`/dashboard?view=${item.id}`)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 ${active === item.id ? 'btn-primary' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
            </button>
          </li>
        ))}
        <li>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-pink-500 hover:bg-pink-500/10 transition-all duration-500 mt-8 border border-transparent hover:border-pink-500/20"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('profile');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  // new product form state
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', image: '', category: 'General', stock: '' });
  const [submittingProduct, setSubmittingProduct] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // sync state with url query
    const { view } = router.query;
    if (view) setActiveView(view);
    
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router.query]);

  // fetch seller's products when manage view is active
  useEffect(() => {
    if (user && user.role === 'seller' && activeView === 'manage') {
      fetchProducts();
    }
  }, [user, activeView]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`/api/products?seller=${user._id}`);
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmittingProduct(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock)
        }),
      });

      if (res.ok) {
        setNewProduct({ title: '', description: '', price: '', image: '', category: 'General', stock: '' });
        fetchProducts(); // refresh list
      } else {
        const data = await res.json();
        alert(`Error: ${data.message || 'Failed to add product'}`);
      }
    } catch (error) {
      alert('Network error occurred');
    } finally {
      setSubmittingProduct(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        fetchProducts(); // refresh list
      } else {
        const data = await res.json();
        alert(`Error: ${data.message || 'Failed to delete'}`);
      }
    } catch (error) {
      alert('Network error occurred');
    }
  };

  const handleLogout = () => {
    // clear local session
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <Layout title={`${user.role.toUpperCase()} Dashboard | LaunchBase`}>
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            User <span className="text-gradient">Panel</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-2">
            Status: <span className="text-purple-400">{user.role}</span> Access
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <Sidebar active={activeView} onLogout={handleLogout} role={user.role} />
          
          <div className="lg:col-span-3 space-y-10">
            {activeView === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-10 md:p-16 rounded-[3rem]"
              >
                <h3 className="text-2xl font-black mb-10 uppercase tracking-widest italic">Core Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-2">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Full Entity Name</p>
                    <p className="text-2xl font-black text-white">{user.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Communication Link</p>
                    <p className="text-2xl font-black text-white">{user.email}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'manage' && user.role === 'seller' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                {/* Product Creation Form Card */}
                <div className="glass-card p-10 md:p-12">
                  <h3 className="text-xl font-black mb-8 uppercase tracking-widest italic flex items-center gap-3">
                    <Package className="text-purple-400" /> Deploy New Product
                  </h3>
                  <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-6">
                    <input required value={newProduct.title} onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} className="glass p-4 rounded-xl w-full font-medium" placeholder="Product Title" />
                    <input required type="number" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="glass p-4 rounded-xl w-full font-medium" placeholder="Price ($)" />
                    <input required type="url" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} className="glass p-4 rounded-xl w-full font-medium" placeholder="Direct Image URL" />
                    <input required type="number" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} className="glass p-4 rounded-xl w-full font-medium" placeholder="Available Stock" />
                    <div className="md:col-span-2">
                       <input required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="glass p-4 rounded-xl w-full font-medium mb-6" placeholder="Category (e.g. Electronics, Fashion)" />
                      <textarea required value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="glass p-4 rounded-2xl w-full font-medium" placeholder="Technical Description" rows="3"></textarea>
                    </div>
                    <button type="submit" disabled={submittingProduct} className="md:col-span-2 btn-primary w-full py-4 uppercase tracking-widest font-black rounded-xl">
                      {submittingProduct ? 'Deploying...' : 'Pulse: Deploy Listing'}
                    </button>
                  </form>
                </div>

                {/* Seller's Product List */}
                <div className="glass-card p-10 md:p-12">
                   <h3 className="text-xl font-black mb-8 uppercase tracking-widest italic">Your Active Inventory</h3>
                   
                   {loadingProducts ? (
                     <div className="animate-pulse flex space-x-4">
                       <div className="flex-1 space-y-4 py-1">
                         <div className="h-4 bg-white/10 rounded w-3/4"></div>
                         <div className="space-y-2">
                           <div className="h-4 bg-white/10 rounded"></div>
                           <div className="h-4 bg-white/10 rounded w-5/6"></div>
                         </div>
                       </div>
                     </div>
                   ) : products.length === 0 ? (
                     <p className="text-slate-500 font-medium">No products deployed yet. Start listing above.</p>
                   ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                       {products.map(product => (
                         <div key={product._id} className="glass p-4 rounded-2xl flex flex-col group relative overflow-hidden">
                           <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                              <img src={product.image} alt={product.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.src='https://placehold.co/400?text=No+Image'} />
                           </div>
                           <h4 className="font-bold text-lg mb-1 truncate">{product.title}</h4>
                           <p className="text-purple-400 font-black tracking-wider mb-4">${product.price}</p>
                           
                           <div className="mt-auto flex gap-2">
                             <button onClick={() => handleDeleteProduct(product._id)} className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-colors text-sm uppercase tracking-wider">Remove</button>
                           </div>
                         </div>
                       ))}
                     </div>
                   )}
                </div>
              </motion.div>
            )}

            {activeView === 'orders' && (
              <div className="glass-card p-20 text-center opacity-40">
                <Package size={64} className="mx-auto mb-8 text-purple-500" />
                <p className="text-xl font-black uppercase tracking-widest">No Transmissions Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}


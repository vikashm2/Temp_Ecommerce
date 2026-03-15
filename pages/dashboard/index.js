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
                <div className="glass-card p-10 md:p-16">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-widest italic">Deploy New Product</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <input className="glass p-5 rounded-2xl w-full font-medium" placeholder="Product Title" />
                    <input className="glass p-5 rounded-2xl w-full font-medium" placeholder="Direct Image URL" />
                    <div className="md:col-span-2">
                      <textarea className="glass p-5 rounded-3xl w-full font-medium" placeholder="Technical Description" rows="4"></textarea>
                    </div>
                  </div>
                  <button className="btn-primary w-full mt-10 py-5 uppercase tracking-widest font-black">Pulse: Deploy Listing</button>
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


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut } from 'lucide-react';

// dashboard sidebar component
const Sidebar = ({ active, onLogout }) => {
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl h-fit">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active === item.id ? 'bg-purple-600 text-white' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
        <li>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300 mt-6"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <Layout title="Dashboard | LaunchBase Store">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-10">Account <span className="text-gradient">Dashboard</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <Sidebar active="profile" onLogout={handleLogout} />
          
          <div className="lg:col-span-3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-6">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-lg font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
              </div>
            </motion.div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="flex flex-col items-center justify-center py-10 opacity-50">
                <Package size={48} className="mb-4 text-purple-400" />
                <p>No recent orders found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

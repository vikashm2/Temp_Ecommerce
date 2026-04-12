import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, User, Mail, Lock, Shop, Info, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * Premium Signup Page
 * Redesigned as an 'Operative Request' for the LaunchBase ecosystem
 */
export default function Signup() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'buyer',
    shopName: '',
    businessDescription: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Request Denied');
      }
    } catch (err) {
      setError('System connection failure');
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout title="Request Entry | LaunchBase Store">
      <div className="min-h-[90vh] flex items-center justify-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-1 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
        >
          {/* Top accent glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

          <div className="p-10 md:p-16 bg-white/[0.01] rounded-[2.9rem]">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-purple-500/20 text-purple-400">
                 <UserPlus size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 italic">
                Request <span className="text-gradient">Entry</span>
              </h1>
              <p className="text-slate-500 font-medium">Initialize your profile in the LaunchBase ecosystem</p>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/5 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest mb-8 text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5">
                {['buyer', 'seller'].map((role) => (
                  <button 
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      formData.role === role 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {role === 'buyer' ? 'Customer' : 'Merchant'}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full glass-milky rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm font-medium"
                    placeholder="FULL NAME"
                  />
                </div>

                <div className="relative group">
                  <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full glass-milky rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm font-medium"
                    placeholder="EMAIL ADDRESS"
                  />
                </div>
              </div>

              {/* Dynamic Merchant Fields */}
              <AnimatePresence>
                {formData.role === 'seller' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-6"
                  >
                    <div className="relative group">
                      <ShieldCheck size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                      <input 
                        required={formData.role === 'seller'}
                        type="text"
                        value={formData.shopName}
                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                        className="w-full glass-milky rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm font-medium"
                        placeholder="OFFICIAL SHOP NAME"
                      />
                    </div>

                    <div className="relative group">
                      <Info size={16} className="absolute left-5 top-6 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                      <textarea 
                        required={formData.role === 'seller'}
                        rows="3"
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                        className="w-full glass-milky rounded-3xl py-4 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm font-medium"
                        placeholder="BUSINESS OVERVIEW..."
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full glass-milky rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm font-medium"
                  placeholder="SECURITY PASSCODE"
                />
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full btn-primary py-5 rounded-2xl uppercase tracking-[0.2em] text-xs font-black group shadow-xl shadow-purple-900/10"
              >
                {loading ? 'Initializing...' : 'Deploy Profile'}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-12 text-center pt-8 border-t border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Already registered? <Link href="/login" className="text-purple-500 hover:text-white transition-colors ml-2 underline underline-offset-4 decoration-purple-500/30">Initialize Login</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}


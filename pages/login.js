import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight, User } from 'lucide-react';

/**
 * Premium Login Page
 * Redesigned as a secure access vault
 */
export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Access Denied');
      }
    } catch (err) {
      setError('System connection failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Vault Access | LaunchBase Store">
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-1 items-center w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative"
        >
          {/* Subtle Glows inside border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          
          <div className="p-10 md:p-16 bg-white/[0.01] rounded-[2.9rem]">
            <div className="mb-12 text-center">
              <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-purple-500/20 text-purple-400">
                 <Shield size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 italic">
                Vault <span className="text-gradient">Access</span>
              </h1>
              <p className="text-slate-500 font-medium tracking-tight">Enter your credentials to secure the collection</p>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/5 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest mb-8 text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="relative group">
                  <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full glass-milky rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm placeholder:text-slate-600 font-medium"
                    placeholder="IDENTIFIER (EMAIL)"
                  />
                </div>

                <div className="relative group">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    required
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full glass-milky rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-1 focus:ring-purple-500/40 text-sm placeholder:text-slate-600 font-medium"
                    placeholder="PASSCODE"
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full btn-primary py-5 rounded-2xl uppercase tracking-[0.2em] text-xs group"
              >
                {loading ? 'Validating...' : 'Initialize Access'}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-12 text-center pt-8 border-t border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                New Operative? <Link href="/signup" className="text-purple-500 hover:text-white transition-colors ml-2 underline underline-offset-4 decoration-purple-500/30">Request Entry</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

// Mobile width optimized

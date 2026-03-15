import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

// signup page component
export default function Signup() {
  // state for form inputs and status
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

  // handle form submission transmission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // send signup data with role
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // store user data locally
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/dashboard');
      } else {
        // show error from api
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign Up | LaunchBase Store">
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-6">
        {/* main signup card container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-3 italic tracking-tight uppercase">Join <span className="text-gradient">LaunchBase</span></h2>
            <p className="text-slate-500 font-medium">Select your role to begin the journey</p>
          </div>
          
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-2xl text-sm mb-8 font-medium animate-pulse">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* role selection toggle segment */}
            <div className="grid grid-cols-2 gap-4 border border-white/5 p-2 rounded-[2rem] bg-white/[0.02]">
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, role: 'buyer' })}
                className={`py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${formData.role === 'buyer' ? 'btn-primary' : 'hover:bg-white/5 text-slate-500'}`}
              >
                Customer
              </button>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, role: 'seller' })}
                className={`py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${formData.role === 'seller' ? 'btn-primary' : 'hover:bg-white/5 text-slate-500'}`}
              >
                Seller
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* name and email inputs */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* dynamic seller fields */}
            <motion.div
              initial={false}
              animate={{ height: formData.role === 'seller' ? 'auto' : 0, opacity: formData.role === 'seller' ? 1 : 0 }}
              className="overflow-hidden space-y-6"
            >
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Official Shop Name</label>
                <input 
                  required={formData.role === 'seller'}
                  type="text"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className="w-full glass rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  placeholder="The Future Store"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Business Description</label>
                <textarea 
                  required={formData.role === 'seller'}
                  rows="3"
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                  className="w-full glass rounded-3xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                  placeholder="Tell customers about your brand..."
                />
              </div>
            </motion.div>

            <div className="space-y-3">
              {/* password secure input field */}
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Secure Password</label>
              <input 
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full glass rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                placeholder="••••••••"
              />
            </div>

            {/* main action button signup */}
            <button 
              disabled={loading}
              type="submit" 
              className="w-full btn-primary py-5 rounded-[1.5rem] text-lg uppercase tracking-[0.2em] font-black"
            >
              {loading ? 'Processing...' : 'Deploy Account'}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 text-sm font-medium">
            Member of LaunchBase? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold ml-1">Enter Here</Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}


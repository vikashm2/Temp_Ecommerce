import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone } from 'lucide-react';

/**
 * Contact Support Page
 * Multi-channel communication form
 */
export default function Contact() {
  /* COPYABLE CONTACT SECTION START */
  return (
    <Layout>
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-slate-400 text-xl font-medium">We are here to help you 24/7.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Information Cards Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-8 group">
              <Mail className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-slate-400 font-medium">support@launchbase.com</p>
            </div>
            <div className="glass-card p-8 group">
              <Phone className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-slate-400 font-medium">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Main Contact Form Area */}
          <div className="lg:col-span-2">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-10 md:p-16"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="glass w-full p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="glass w-full p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium" />
                </div>
              </div>
              <div className="space-y-4 mb-10">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Your Message</label>
                <textarea rows="5" placeholder="How can we help?" className="glass w-full p-5 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"></textarea>
              </div>
              <button className="btn-primary w-full py-6 text-lg uppercase tracking-[0.2em]">Send Message</button>
            </motion.form>
          </div>
        </div>
      </div>
    </Layout>
  );
  /* COPYABLE CONTACT SECTION END */
}

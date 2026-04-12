import Link from 'next/link';
import { Twitter, Instagram, Github, ArrowRight } from 'lucide-react';

/**
 * Premium Footer Component
 */
const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase italic mb-8 block">
              LAUNCHBASE<span className="text-purple-5500">STORE</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs font-medium">
              Redefining the digital commerce experience with futuristic aesthetics and premium hardware.
            </p>
            <div className="flex space-x-6">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <Link key={i} href="#" className="text-slate-500 hover:text-purple-400 transition-all duration-300">
                  <Icon size={22} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Exploration</h4>
            <ul className="space-y-4">
              {['Launch Collection', 'Featured Drops', 'Trending Now', 'Flash Sales'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium flex items-center group">
                    {link} <ArrowRight size={12} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Company</h4>
            <ul className="space-y-4">
              {['About Lab', 'Security', 'Privacy Policy', 'Terms of Service'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Column */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">System Status</h4>
            <div className="glass-milky p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-white">All Systems Operational</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                Vault transactions and global shipping are currently 100% functional.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 LAUNCHBASE LABS. DESIGNED FOR THE FUTURE.
          </p>
          <div className="flex items-center gap-8">
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest cursor-pointer hover:text-white">English (INTL)</span>
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest cursor-pointer hover:text-white">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

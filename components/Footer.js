import Link from 'next/link';

/**
 * Application Footer Component
 * Dark themed information section
 */
const Footer = () => {
  /* COPYABLE FOOTER START */
  return (
    <footer className="mt-auto border-t border-white/10 py-16 px-6 md:px-12 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Information Column */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-2xl font-black text-gradient mb-6 block tracking-tighter italic">
            LAUNCHBASE
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            The ultimate ultra-premium ecommerce starter template for modern high-performance developers and shops.
          </p>
        </div>

        {/* Shopping Links Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><Link href="/products" className="hover:text-purple-400 transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-purple-400 transition-colors">Browse Categories</Link></li>
            <li><Link href="/deals" className="hover:text-purple-400 transition-colors text-pink-400">Limited Deals</Link></li>
          </ul>
        </div>

        {/* Company Info Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><Link href="/about" className="hover:text-purple-400 transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
            <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-6">Stay updated with our latest releases and futuristic drops.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="glass rounded-l-2xl py-3 px-5 w-full focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
            />
            <button className="btn-primary px-6 rounded-l-none rounded-r-2xl py-3 text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      
      {/* Copyright Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} LaunchBase Store. Engineered for excellence.
      </div>
    </footer>
  );
  /* COPYABLE FOOTER END */
};

export default Footer;


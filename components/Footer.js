import Link from 'next/link';

// footer component
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 py-12 px-6 md:px-12 bg-black/50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-2xl font-bold text-gradient mb-6 block">
            LAUNCHBASE
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            The ultimate ecommerce starter template for modern developers.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Shop</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link href="/deals" className="hover:text-white transition-colors">Featured Deals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Stay updated with our latest releases.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="glass rounded-l-lg py-2 px-4 w-full focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
            />
            <button className="bg-purple-600 px-4 rounded-r-lg hover:bg-purple-700 transition-colors text-sm font-semibold">Join</button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} LaunchBase Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

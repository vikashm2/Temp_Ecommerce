import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

/**
 * Sticky Bottom Navigation for Mobile
 * Optimized for one-handed use
 */
const BottomNav = () => {
  const router = useRouter();
  
  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Shop', icon: ShoppingBag, path: '/products' },
    { label: 'Cart', icon: ShoppingCart, path: '/cart' },
    { label: 'Profile', icon: User, path: '/login' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 pointer-events-none">
      <div className="glass-milky rounded-[2rem] flex items-center justify-around p-2 pointer-events-auto shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] border-white/10">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.label} 
              href={item.path}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-bold mt-1 uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;

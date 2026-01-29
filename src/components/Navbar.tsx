'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, Image as ImageIcon, CreditCard, UserCircle, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ orderCount: 0, lastOrderTikTok: '' });
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          setStats(data.stats);
        }
      });
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jasa', href: '/services', icon: Briefcase },
    { name: 'Testimoni', href: '/testimonials', icon: ImageIcon },
    { name: 'Payment', href: '/payment', icon: CreditCard },
    { name: 'Admin', href: '/admin', icon: UserCircle },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">M</span>
            </div>
            <span className="text-white font-black tracking-tighter text-xl">MINGSEE<span className="text-neon-green">CLIP</span></span>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white/5 hover:bg-neon-green/20 rounded-xl transition-all group"
        >
          <Menu className="text-white group-hover:text-neon-green transition-colors" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-dark-card border-l border-white/10 z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  <X className="text-neutral-400" />
                </button>
              </div>

              {/* Profile / Stats Section */}
              <div className="mb-10 p-6 bg-white/5 rounded-3xl border border-white/5">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center">
                       <User className="text-neon-green w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-sm">Profile Owner</h4>
                       <p className="text-neutral-500 text-[10px] uppercase tracking-widest">Active Store</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <ShoppingBag className="w-3.5 h-3.5 text-neon-green" />
                          <span className="text-neutral-400 text-xs">Total Order</span>
                       </div>
                       <span className="text-white font-bold text-sm">{stats.orderCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <UserCircle className="w-3.5 h-3.5 text-neon-green" />
                          <span className="text-neutral-400 text-xs">Last Order</span>
                       </div>
                       <span className="text-neon-green font-bold text-xs">{stats.lastOrderTikTok}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-2 flex-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${pathname === link.href ? 'bg-neon-green text-black font-black' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
                        <Icon size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">{link.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 text-center">
                 <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    &copy; 2024 Mingseeclip Store
                 </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

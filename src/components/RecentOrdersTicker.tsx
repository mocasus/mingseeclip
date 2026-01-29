'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const mockNames = ['@user_42', '@wechat_king', '@jasascan', '@mingsee_fan', '@crypto_ninja', '@tiktok_pro', '@wechat_master', '@budi_santoso'];
const mockServices = ['Scan WeChat (5 menit)', 'Scan WeChat (1 jam-an)', 'Akun WeChat Ready'];

export default function RecentOrdersTicker() {
  const [order, setOrder] = useState<{ name: string; service: string } | null>(null);

  useEffect(() => {
    const showOrder = () => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomService = mockServices[Math.floor(Math.random() * mockServices.length)];
      setOrder({ name: randomName, service: randomService });

      setTimeout(() => {
        setOrder(null);
      }, 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        showOrder();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-24 left-8 z-40 pointer-events-none">
      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="bg-dark-card/80 backdrop-blur-md border border-neon-green/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(57,255,20,0.1)] flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-neon-green flex items-center justify-center">
              <ShoppingBag className="text-black w-5 h-5" />
            </div>
            <div>
               <p className="text-white font-bold text-xs">{order.name}</p>
               <p className="text-neutral-400 text-[10px]">Baru saja memesan <span className="text-neon-green font-bold">{order.service}</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

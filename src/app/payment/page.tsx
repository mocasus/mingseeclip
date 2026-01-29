'use client';

import { motion } from 'framer-motion';
import { QrCode, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const [qrisUrl, setQrisUrl] = useState('/qris.jpg');

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.payment && data.payment.qris_url) {
          setQrisUrl(data.payment.qris_url);
        }
      });
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 bg-dark-bg">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="text-neon-green w-10 h-10" />
            <h2 className="text-4xl font-black text-white">
              PAY<span className="text-neon-green">MENT</span>
            </h2>
          </div>
          <p className="text-neutral-400">Scan QRIS di bawah ini untuk melakukan pembayaran</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-[2rem] shadow-[0_0_50px_rgba(57,255,20,0.2)] relative group"
        >
          <div className="relative w-[300px] h-[400px] bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
            {qrisUrl.startsWith('/uploads') || qrisUrl.startsWith('http') || qrisUrl === '/qris.jpg' ? (
              <Image
                src={qrisUrl}
                alt="QRIS"
                fill
                className="object-contain p-2"
                unoptimized={true} // For local dev/uploads
              />
            ) : (
              <div className="text-neutral-400 text-center p-8">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">QRIS belum diupload oleh admin</p>
              </div>
            )}
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full px-8">
             <div className="bg-black border border-neon-green py-3 px-6 rounded-full flex items-center justify-between">
                <span className="text-neon-green font-bold text-xs uppercase tracking-tighter">Official QRIS</span>
                <ShieldCheck className="text-neon-green w-4 h-4" />
             </div>
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="bg-dark-card border border-white/5 p-6 rounded-2xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neon-green text-black flex items-center justify-center text-xs">1</span>
              Screenshot QRIS
            </h4>
            <p className="text-neutral-500 text-sm">Ambil tangkapan layar kode QRIS di atas.</p>
          </div>
          <div className="bg-dark-card border border-white/5 p-6 rounded-2xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neon-green text-black flex items-center justify-center text-xs">2</span>
              Bayar via E-Wallet
            </h4>
            <p className="text-neutral-500 text-sm">Buka aplikasi Dana, OVO, GoPay, atau Bank Anda lalu scan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [tiktokAccount, setTiktokAccount] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setServices(data.services);
        setIsLoading(false);
      });
  }, []);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiktokAccount }),
      });

      if (!res.ok) throw new Error('Gagal memproses order');

      toast.success('Order Berhasil!', {
        description: 'Detail pesanan Anda telah dicatat. Silakan lakukan pembayaran.',
      });
      setSelectedService(null);
      setTiktokAccount('');
    } catch (err) {
      console.error(err);
      toast.error('Gagal memproses order.');
    } finally {
      setIsOrdering(false);
    }
  };

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Zap className="w-8 h-8 text-neon-green" />;
      case 1: return <Zap className="w-8 h-8 text-neon-green fill-neon-green" />;
      case 2: return <ShieldCheck className="w-8 h-8 text-neon-green" />;
      default: return <CheckCircle2 className="w-8 h-8 text-neon-green" />;
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-2">
            PILIH <span className="text-neon-green">JASA</span>
          </h2>
          <div className="h-1 w-20 bg-neon-green rounded-full shadow-[0_0_10px_#39FF14]" />
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-card border border-white/5 rounded-3xl p-8 h-80 animate-pulse flex flex-col justify-between">
                <div className="w-16 h-16 bg-white/5 rounded-2xl" />
                <div className="space-y-4">
                  <div className="h-6 bg-white/5 rounded-full w-3/4" />
                  <div className="h-4 bg-white/5 rounded-full w-1/2" />
                </div>
                <div className="h-12 bg-white/5 rounded-xl" />
              </div>
            ))
          ) : services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-dark-card border border-white/5 rounded-3xl p-8 hover:border-neon-green/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-neon-green/5 rounded-full blur-3xl group-hover:bg-neon-green/10 transition-colors" />

              <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {getIcon(index)}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-black text-neon-green">{service.price}</span>
                <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest">IDR</span>
              </div>

              <button
                onClick={() => setSelectedService(service)}
                className="w-full py-4 rounded-xl border border-neon-green/20 text-neon-green font-bold text-sm group-hover:bg-neon-green group-hover:text-black transition-all duration-300"
              >
                Pesan Sekarang
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-2 italic tracking-tighter">FREQUENTLY ASKED <span className="text-neon-green">QUESTIONS</span></h2>
              <p className="text-neutral-500 text-sm italic">Punya pertanyaan? Cek di bawah ini dulu ya!</p>
           </div>

           <div className="space-y-4">
              {[
                { q: "Apakah jasa ini aman untuk akun saya?", a: "Sangat aman! Kami menggunakan metode resmi dan tidak memerlukan password akun WeChat Anda." },
                { q: "Berapa lama proses scan WeChat?", a: "Tergantung pilihan Anda. Ada yang express (5 menit) dan ada yang reguler (sekitar 1 jam)." },
                { q: "Bagaimana jika scan gagal?", a: "Kami memberikan garansi scan ulang sampai berhasil atau uang kembali jika memang tidak bisa diproses." },
                { q: "Apakah akun WeChat ready sudah termasuk nomor HP?", a: "Ya, akun sudah siap pakai dan akan diberikan detail login lengkapnya." }
              ].map((faq, i) => (
                <div key={i} className="border border-white/5 rounded-2xl bg-dark-card overflow-hidden">
                   <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                   >
                      <span className="text-white font-bold text-left text-sm">{faq.q}</span>
                      <ChevronDown className={`text-neon-green transition-transform ${openFaq === i ? 'rotate-180' : ''}`} size={18} />
                   </button>
                   <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                           <div className="px-6 pb-5 text-neutral-500 text-sm leading-relaxed border-t border-white/5 pt-4">
                              {faq.a}
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedService(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-dark-card border border-white/10 p-8 rounded-3xl z-[110]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white">ORDER FORM</h3>
                <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-white/5 rounded-xl">
                  <X className="text-neutral-500" />
                </button>
              </div>

              <div className="mb-8 p-4 bg-neon-green/10 rounded-2xl border border-neon-green/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-neon-green rounded-xl flex items-center justify-center">
                  <ShoppingCart className="text-black w-6 h-6" />
                </div>
                <div>
                   <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Layanan Terpilih</p>
                   <h4 className="text-white font-bold">{selectedService.name} - {selectedService.price}</h4>
                </div>
              </div>

              <form onSubmit={handleOrder} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 ml-1">
                    Username TikTok Anda
                  </label>
                  <input
                    required
                    placeholder="@username"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-neon-green outline-none transition-all"
                    value={tiktokAccount}
                    onChange={(e) => setTiktokAccount(e.target.value)}
                  />
                </div>

                <button
                  disabled={isOrdering}
                  className="w-full bg-neon-green text-black font-black py-4 rounded-xl hover:shadow-[0_0_20px_#39FF14] transition-all disabled:opacity-50"
                >
                  {isOrdering ? 'MEMPROSES...' : 'KONFIRMASI ORDER'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Zap,
  ShieldCheck,
  Clock,
  MessageCircle,
  ChevronRight,
  Star,
  Play
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [followers, setFollowers] = useState(12500);

  useEffect(() => {
    const interval = setInterval(() => {
      setFollowers(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-neon-green" />,
      title: "Proses Kilat",
      desc: "Layanan kami diproses dalam hitungan menit setelah pembayaran dikonfirmasi."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-neon-green" />,
      title: "Garansi Aman",
      desc: "Keamanan akun Anda adalah prioritas utama kami. 100% legal dan terpercaya."
    },
    {
      icon: <Clock className="w-6 h-6 text-neon-green" />,
      title: "Support 24/7",
      desc: "Tim kami siap membantu kendala Anda kapan saja melalui WhatsApp."
    }
  ];

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-neon-green/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 mb-6">
              <Star className="w-3 h-3 text-neon-green fill-neon-green" />
              <span className="text-neon-green text-[10px] font-bold uppercase tracking-widest">Store Terpercaya #1</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              SOLUSI <span className="text-neon-green">WECHAT</span> <br />
              TANPA RIBET.
            </h1>
            <p className="text-neutral-400 text-lg mb-10 max-w-lg leading-relaxed">
              Dapatkan layanan Scan WeChat dan Akun WeChat siap pakai dengan proses instan, harga termurah, dan jaminan keamanan 100%.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <button className="px-8 py-4 rounded-2xl bg-neon-green text-black font-black hover:shadow-[0_0_30px_#39FF14] transition-all flex items-center gap-2 group">
                  Pesan Sekarang
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="https://wa.me/6281234567890">
                <button className="px-8 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Konsultasi Gratis
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* TikTok Card Integration */}
            <Link
              href="https://www.tiktok.com/@mingseeclip"
              target="_blank"
              className="block relative z-10"
            >
              <div className="overflow-hidden rounded-[2.5rem] bg-dark-card/50 backdrop-blur-xl p-8 border border-white/10 hover:border-neon-green/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(57,255,20,0.15)] group">
                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="text-neon-green w-6 h-6" />
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full border-4 border-neon-green p-1.5 group-hover:scale-105 transition-transform duration-500">
                      <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                        <span className="text-4xl font-black text-neon-green">M</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 right-1 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                      Live
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-white mb-1">
                    @mingseeclip
                  </h2>
                  <p className="text-neon-green/60 text-xs font-bold uppercase tracking-[0.3em] mb-10">TikTok Creator</p>

                  <div className="grid grid-cols-3 gap-4 md:gap-10 w-full border-t border-white/5 pt-10">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-white mb-1">
                        <span className="text-xl font-black">{(followers / 1000).toFixed(1)}K</span>
                      </div>
                      <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">Followers</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-white mb-1">
                        <span className="text-xl font-black">45.2K</span>
                      </div>
                      <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">Likes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-white mb-1">
                        <span className="text-xl font-black">890K</span>
                      </div>
                      <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">Views</p>
                    </div>
                  </div>

                  <div className="mt-8 w-full">
                     <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Latest Post</span>
                        <span className="text-[10px] font-bold text-neon-green/50 uppercase tracking-widest">2h ago</span>
                     </div>
                     <div className="aspect-video rounded-2xl bg-white/5 border border-white/5 overflow-hidden relative group/video">
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Play className="text-neon-green w-8 h-8 opacity-50 group-hover/video:scale-110 group-hover/video:opacity-100 transition-all" />
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                           <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-1/3 bg-neon-green" />
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-green/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-green/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative bg-dark-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white mb-4 italic">KENAPA MEMILIH KAMI?</h2>
            <div className="h-1.5 w-24 bg-neon-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-dark-bg/50 border border-white/5 hover:border-neon-green/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-neon-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                 <h2 className="text-4xl font-black text-white mb-4">CARA <span className="text-neon-green tracking-tighter">ORDER</span> NYA GIMANA?</h2>
                 <p className="text-neutral-400">Ikuti 3 langkah mudah di bawah ini untuk mendapatkan layanan kami.</p>
              </div>
              <Link href="/services">
                <span className="text-neon-green font-bold text-sm underline underline-offset-8">Lihat Daftar Harga &rarr;</span>
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block -translate-y-1/2 -z-10" />

              {[
                { step: "01", title: "Pilih Jasa", desc: "Pilih layanan yang Anda butuhkan di halaman Services." },
                { step: "02", title: "Pembayaran", desc: "Lakukan pembayaran melalui QRIS yang tersedia secara otomatis." },
                { step: "03", title: "Selesai", desc: "Konfirmasi ke WhatsApp kami, dan jasa Anda langsung diproses." }
              ].map((s, i) => (
                <div key={i} className="relative bg-dark-bg group">
                   <div className="w-16 h-16 rounded-full bg-dark-card border border-white/10 flex items-center justify-center mb-6 group-hover:border-neon-green transition-colors mx-auto md:mx-0">
                      <span className="text-neon-green font-black">{s.step}</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2 text-center md:text-left">{s.title}</h3>
                   <p className="text-neutral-500 text-sm text-center md:text-left">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-neon-green p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

          <h2 className="text-4xl md:text-6xl font-black text-black mb-8 relative z-10 leading-tight">
            SUDAH SIAP <br /> BERGABUNG DENGAN KAMI?
          </h2>
          <Link href="/services">
            <button className="px-10 py-5 rounded-2xl bg-black text-white font-black hover:scale-105 transition-all relative z-10 shadow-2xl">
              DAPATKAN LAYANAN SEKARANG
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

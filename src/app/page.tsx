'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Users, Play, Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [followers, setFollowers] = useState(12500); // Mock starting count

  useEffect(() => {
    // Simulate real-time growth
    const interval = setInterval(() => {
      setFollowers(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Link
          href="https://www.tiktok.com/@mingseeclip"
          target="_blank"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-3xl bg-dark-card p-8 border border-white/10 hover:border-neon-green transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]">
            <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="text-neon-green w-5 h-5" />
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-neon-green p-1 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for Profile Pic */}
                    <span className="text-3xl font-bold text-neon-green">M</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 right-0 bg-neon-green text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  Live
                </div>
              </div>

              <h1 className="text-2xl font-black text-white mb-1 group-hover:text-neon-green transition-colors">
                @mingseeclip
              </h1>
              <p className="text-neutral-400 text-sm mb-8">TikTok Account</p>

              <div className="grid grid-cols-3 gap-8 w-full border-t border-white/5 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-neon-green mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-lg font-bold">{(followers / 1000).toFixed(1)}K</span>
                  </div>
                  <p className="text-[10px] uppercase text-neutral-500 font-medium">Followers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-neon-green mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-lg font-bold">45.2K</span>
                  </div>
                  <p className="text-[10px] uppercase text-neutral-500 font-medium">Likes</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-neon-green mb-1">
                    <Play className="w-4 h-4" />
                    <span className="text-lg font-bold">890K</span>
                  </div>
                  <p className="text-[10px] uppercase text-neutral-500 font-medium">Views</p>
                </div>
              </div>
            </div>

            {/* Pulsing indicator */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] text-neon-green font-bold tracking-[0.2em] uppercase">
                Real-time Status
              </span>
            </div>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/services">
            <button className="px-8 py-3 rounded-full bg-neon-green text-black font-bold text-sm hover:shadow-[0_0_20px_#39FF14] transition-all active:scale-95">
              Lihat Jasa Kami
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

'use client';

import { Github, Instagram, MessageCircle, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-white/5 pt-20 pb-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <Link href="/">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xl">M</span>
              </div>
              <span className="text-white font-black tracking-tighter text-xl uppercase">
                Mingsee<span className="text-neon-green">clip</span>
              </span>
            </div>
          </Link>
          <p className="text-neutral-500 text-sm max-w-sm leading-relaxed mb-8">
            Layanan Scan WeChat dan Akun WeChat terpercaya di Indonesia. Kami mengutamakan kecepatan, keamanan, dan kepuasan pelanggan.
          </p>
          <div className="flex gap-4">
             {[
               { icon: <Instagram size={20} />, href: "#" },
               { icon: <Twitter size={20} />, href: "#" },
               { icon: <MessageCircle size={20} />, href: "#" },
               { icon: <Github size={20} />, href: "#" }
             ].map((social, i) => (
               <Link key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-neon-green hover:text-black transition-all">
                  {social.icon}
               </Link>
             ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Layanan Kami</h4>
          <ul className="space-y-4">
            <li><Link href="/services" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">Jasa Scan WeChat</Link></li>
            <li><Link href="/services" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">Akun WeChat Ready</Link></li>
            <li><Link href="/testimonials" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">Testimoni</Link></li>
            <li><Link href="/payment" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">Metode Pembayaran</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Bantuan</h4>
          <ul className="space-y-4">
            <li><Link href="/faq" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">FAQ</Link></li>
            <li><Link href="https://wa.me/6281234567890" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">Hubungi Kami</Link></li>
            <li><Link href="/admin" className="text-neutral-500 hover:text-neon-green text-sm transition-colors">Admin Panel</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-neutral-600 text-xs font-medium">
          &copy; {new Date().getFullYear()} Mingseeclip Store. All Rights Reserved.
        </p>
        <div className="flex gap-8">
           <Link href="#" className="text-neutral-600 hover:text-white text-[10px] font-bold uppercase tracking-widest">Privacy Policy</Link>
           <Link href="#" className="text-neutral-600 hover:text-white text-[10px] font-bold uppercase tracking-widest">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

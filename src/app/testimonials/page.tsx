'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MessageSquareQuote } from 'lucide-react';

interface Testimonial {
  id: string;
  imageUrl: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setTestimonials(data.testimonials || []));
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageSquareQuote className="text-neon-green w-8 h-8" />
            <h2 className="text-4xl font-black text-white">
              TESTI<span className="text-neon-green">MONI</span>
            </h2>
          </div>
          <div className="h-1 w-20 bg-neon-green rounded-full shadow-[0_0_10px_#39FF14]" />
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((testi, index) => (
              <motion.div
                key={testi.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors group"
              >
                <Image
                  src={testi.imageUrl}
                  alt={`Testimonial ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-dark-card rounded-3xl border border-dashed border-white/10">
            <p className="text-neutral-500 italic">Belum ada testimoni. Admin akan segera upload!</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RecentOrdersTicker from "@/components/RecentOrdersTicker";
import { Toaster } from 'sonner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <div className="bg-dark-bg min-h-screen flex flex-col">
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={!isAdminPage ? "pt-16 flex-1" : "flex-1"}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
      {!isAdminPage && <RecentOrdersTicker />}
      <Toaster position="top-center" expand={true} richColors theme="dark" />
    </div>
  );
}

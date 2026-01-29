'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Save,
  Lock,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Image as ImageIcon,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface Testimonial {
  id: string;
  imageUrl: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('services');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    const res = await fetch('/api/data');
    const d = await res.json();
    setData(d);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '258000') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Sandi salah!');
    }
  };

  const saveData = async (newData = data) => {
    setIsSaving(true);
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password
      },
      body: JSON.stringify(newData),
    });
    setData({ ...newData });
    setIsSaving(false);
  };

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      name: 'Jasa Baru',
      price: '0K',
      description: 'Deskripsi jasa'
    };
    const newData = { ...data, services: [...data.services, newService] };
    saveData(newData);
  };

  const updateService = (id: string, field: string, value: string) => {
    const updatedServices = data.services.map((s: Service) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    setData({ ...data, services: updatedServices });
  };

  const deleteService = (id: string) => {
    const newData = { ...data, services: data.services.filter((s: Service) => s.id !== id) };
    saveData(newData);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'testimonial' | 'qris') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'x-admin-password': password
      },
      body: formData,
    });
    const result = await res.json();

    if (result.url) {
      if (type === 'testimonial') {
        const newTesti = { id: Date.now().toString(), imageUrl: result.url };
        const newData = { ...data, testimonials: [...(data.testimonials || []), newTesti] };
        saveData(newData);
      } else {
        const newData = { ...data, payment: { ...data.payment, qris_url: result.url } };
        saveData(newData);
      }
    }
  };

  const deleteTestimonial = (id: string) => {
    const newData = { ...data, testimonials: data.testimonials.filter((t: Testimonial) => t.id !== id) };
    saveData(newData);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-dark-card border border-white/10 rounded-3xl p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-neon-green/10 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="text-neon-green w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">ADMIN PANEL</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Masukkan Sandi"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs mt-2 ml-2">{error}</p>}
            </div>
            <button className="w-full bg-neon-green text-black font-bold py-3 rounded-xl hover:shadow-[0_0_20px_#39FF14] transition-all">
              Masuk
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-neutral-500 text-sm hover:text-white transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white flex">
      {/* Sidebar Admin */}
      <div className="w-64 border-r border-white/5 bg-dark-card flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <LayoutDashboard className="text-neon-green w-5 h-5" />
          <span className="font-black tracking-tighter">ADMIN DASHBOARD</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-neon-green/10 text-neon-green' : 'text-neutral-500 hover:bg-white/5'}`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="font-bold text-sm">Kelola Jasa</span>
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'testimonials' ? 'bg-neon-green/10 text-neon-green' : 'text-neutral-500 hover:bg-white/5'}`}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="font-bold text-sm">Testimoni</span>
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'payment' ? 'bg-neon-green/10 text-neon-green' : 'text-neutral-500 hover:bg-white/5'}`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="font-bold text-sm">Pembayaran</span>
          </button>
        </nav>

        <div className="p-4">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-dark-card">
          <h2 className="font-bold uppercase tracking-widest text-xs text-neutral-500">
            {activeTab} Management
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => saveData()}
              className="flex items-center gap-2 bg-neon-green text-black px-4 py-1.5 rounded-lg text-xs font-black hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={isSaving}
            >
              <Save className="w-3 h-3" />
              {isSaving ? 'Saving...' : 'SAVE CHANGES'}
            </button>
            <Link href="/">
              <div className="p-2 hover:bg-white/5 rounded-lg transition-all text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'services' && data && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">List Jasa</h3>
                  <button
                    onClick={addService}
                    className="flex items-center gap-2 text-neon-green border border-neon-green/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-neon-green/10"
                  >
                    <Plus className="w-4 h-4" /> Tambah Jasa
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {data.services.map((s: Service) => (
                    <div key={s.id} className="bg-dark-card border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          className="bg-black border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-neon-green outline-none"
                          value={s.name}
                          onChange={(e) => updateService(s.id, 'name', e.target.value)}
                          placeholder="Nama Jasa"
                        />
                        <input
                          className="bg-black border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-neon-green outline-none"
                          value={s.price}
                          onChange={(e) => updateService(s.id, 'price', e.target.value)}
                          placeholder="Harga (misal: 20K)"
                        />
                        <input
                          className="bg-black border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-neon-green outline-none"
                          value={s.description}
                          onChange={(e) => updateService(s.id, 'description', e.target.value)}
                          placeholder="Deskripsi"
                        />
                      </div>
                      <button
                        onClick={() => deleteService(s.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'testimonials' && data && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Upload Testimoni</h3>
                  <label className="flex items-center gap-2 bg-neon-green text-black px-4 py-2 rounded-xl text-sm font-bold cursor-pointer hover:opacity-90">
                    <Upload className="w-4 h-4" /> Upload Foto
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'testimonial')} />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {(data.testimonials || []).map((t: Testimonial) => (
                    <div key={t.id} className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-white/5">
                      <img src={t.imageUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <button
                          onClick={() => deleteTestimonial(t.id)}
                          className="bg-red-500 p-2 rounded-full text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'payment' && data && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-md mx-auto"
              >
                <div className="bg-dark-card border border-white/5 p-8 rounded-3xl text-center">
                  <h3 className="text-xl font-bold mb-6">QRIS Code</h3>
                  <div className="bg-white p-4 rounded-xl mb-6 mx-auto w-48 h-64 flex items-center justify-center overflow-hidden">
                    {data.payment?.qris_url ? (
                      <img src={data.payment.qris_url} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <ImageIcon className="text-neutral-200 w-12 h-12" />
                    )}
                  </div>
                  <label className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-xl text-sm font-bold cursor-pointer hover:bg-neutral-200 transition-all">
                    <Upload className="w-4 h-4" /> Ganti QRIS
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'qris')} />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

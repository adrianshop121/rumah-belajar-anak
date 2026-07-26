'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { audio } from '@/lib/audio';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentName, setParentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playCorrect();
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex">
      {/* Left 40% Branding Panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-12 h-12 bg-amber-400 rounded-2xl text-slate-900 flex items-center justify-center text-3xl font-black shadow-lg">
              🐰
            </div>
            <div>
              <span className="text-2xl font-black font-heading tracking-tight">Rumah belajar anak.id</span>
            </div>
          </div>

          <h2 className="text-4xl font-black font-heading mb-4">
            Daftar Gratis untuk 2 Anak 🎉
          </h2>
          <p className="text-blue-100 font-semibold mb-8">
            Dampingi tumbuh kembang anak lewat game edukasi yang aman & tanpa iklan.
          </p>
        </div>

        <div className="text-xs text-blue-200 font-semibold">
          © 2026 Rumah belajar anak.id. All rights reserved.
        </div>
      </div>

      {/* Right 60% Form Panel */}
      <div className="w-full lg:w-3/5 p-8 sm:p-16 flex flex-col justify-center max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black font-heading text-slate-900 mb-2">Buat Akun Orang Tua 👨‍👩‍👧</h2>
          <p className="text-sm text-slate-500 font-semibold">Gratis untuk 2 anak · Tanpa kartu kredit</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Orang Tua</label>
            <input
              type="text"
              required
              placeholder="Contoh: Ibu Rina"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-2xl p-4 text-base font-semibold outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Orang Tua</label>
            <input
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-2xl p-4 text-base font-semibold outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Kata Sandi</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-2xl p-4 text-base font-semibold outline-none shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="kid-button w-full bg-blue-500 hover:bg-blue-600 text-white font-extrabold py-4 rounded-2xl text-lg font-heading shadow-md"
          >
            Mulai Gratis Sekarang 🚀
          </button>
        </form>

        <div className="mt-8 text-center text-xs font-semibold text-slate-500">
          Sudah punya akun?{' '}
          <button onClick={() => router.push('/auth/login')} className="text-blue-600 font-extrabold hover:underline">
            Masuk di sini
          </button>
        </div>
      </div>
    </div>
  );
}

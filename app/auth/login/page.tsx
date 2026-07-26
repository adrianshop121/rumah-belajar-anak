'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appState, checkIsAdminEmail } from '@/lib/store';
import { audio } from '@/lib/audio';

export default function LoginPage() {
  const router = useRouter();
  const [loginTab, setLoginTab] = useState<'parent' | 'admin'>('parent');
  const [email, setEmail] = useState('rina.jakarta@gmail.com');
  const [password, setPassword] = useState('parent123');
  const [rememberMe, setRememberMe] = useState(true);

  const isAdminEmail = checkIsAdminEmail(email);

  const handleTabSwitch = (tab: 'parent' | 'admin') => {
    audio.playTap();
    setLoginTab(tab);
    if (tab === 'admin') {
      setEmail('adriansyaputra@gmail.com');
      setPassword('admin123');
    } else {
      setEmail('rina.jakarta@gmail.com');
      setPassword('parent123');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playCorrect();

    const role = appState.loginUser(email, (isAdminEmail || loginTab === 'admin') ? 'Adriansyah Putra (Super Admin)' : 'Ibu Rina Sativa (Orang Tua)');

    if (role === 'admin' || isAdminEmail || loginTab === 'admin') {
      router.push('/admin');
      if (typeof window !== 'undefined') {
        window.location.assign('/admin');
      }
    } else {
      router.push('/parent');
      if (typeof window !== 'undefined') {
        window.location.assign('/parent');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Mesh Shader */}
      <div className="mesh-bg" />

      {/* Main Glass Card */}
      <div className="w-full max-w-md bg-[#171f33]/90 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 text-center">
        
        {/* Profile Avatar Image */}
        <div className="w-20 h-20 rounded-full border-4 border-secondary overflow-hidden mx-auto mb-4 shadow-[0_0_25px_rgba(148,222,45,0.5)]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuClXBgwlwCsXcjI3VUv2kE6mXUeUH7aXm6T9_Y_oB3vwHuTWHC_BsKQtEjdjn5RiipOkTBn8LQXruXKj26ZRS0i7M2R8MgUyCCnVBENlCZy1P5xMlAYTyg2tJwdN6FyiONsFHUjRyleuaYNXYAXSnS63JAJ6Owq9LTsUtIPhZkCcXW6gFh1gVeqUFXxQmQHAw4TO0FjczjTvTEp7lzu9FhAU8MI0XkGim7F6JYsp9KfpRjoIQVOPiAo1w"
            alt="3D Pixar Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-black text-white font-heading mb-1">Rumah Belajar Anak.id</h1>
        <p className="text-xs text-on-surface-variant mb-6">Portal Masuk Akun Pintar</p>

        {/* Tab Switcher: Login Orang Tua vs Super Admin */}
        <div className="grid grid-cols-2 gap-2 bg-[#0b1326] p-1.5 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => handleTabSwitch('parent')}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              loginTab === 'parent'
                ? 'bg-secondary text-[#1f3700] shadow-md font-heading font-black'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">family_restroom</span> Login Orang Tua
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('admin')}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              loginTab === 'admin'
                ? 'bg-tertiary text-[#3e2400] shadow-md font-heading font-black'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span> Super Admin 👑
          </button>
        </div>

        {/* Indicator Badge */}
        {loginTab === 'admin' || isAdminEmail ? (
          <div className="bg-tertiary/20 border border-tertiary/60 text-tertiary p-3.5 rounded-2xl mb-6 text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,185,95,0.3)]">
            <span className="text-base">👑</span>
            <span>Akun Super Admin (adriansyaputra@gmail.com)</span>
          </div>
        ) : (
          <div className="bg-secondary/20 border border-secondary/60 text-secondary p-3.5 rounded-2xl mb-6 text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(148,222,45,0.3)]">
            <span className="text-base">👨‍👩‍👧</span>
            <span>Akses Portal Laporan & Screen Time Orang Tua</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-extrabold text-white block mb-1.5 uppercase tracking-wider">
              {loginTab === 'admin' ? 'Email Super Admin' : 'Email Orang Tua'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={loginTab === 'admin' ? 'adriansyaputra@gmail.com' : 'orangtua@gmail.com'}
              className="w-full bg-[#0b1326] border-2 border-white/20 rounded-2xl px-4 py-3.5 text-white font-bold text-sm outline-none focus:border-secondary transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-white block mb-1.5 uppercase tracking-wider">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0b1326] border-2 border-white/20 rounded-2xl px-4 py-3.5 text-white font-bold text-sm outline-none focus:border-secondary transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant font-semibold">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-secondary rounded"
              />
              Ingat Saya
            </label>
            <a href="#" className="text-secondary font-bold hover:underline">Lupa Sandi?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-fixed text-[#1f3700] font-black py-4 rounded-2xl text-base font-heading shadow-[0_0_25px_rgba(148,222,45,0.5)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            <span>{loginTab === 'admin' || isAdminEmail ? 'Masuk Dashboard Admin 👑' : 'Masuk Dashboard Orang Tua 👨‍👩‍👧'}</span>
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </form>

        <div className="mt-6 text-xs text-on-surface-variant font-semibold">
          Belum punya akun?{' '}
          <button
            onClick={() => {
              router.push('/onboarding');
              if (typeof window !== 'undefined') window.location.assign('/onboarding');
            }}
            className="text-secondary font-bold hover:underline cursor-pointer"
          >
            Daftar Gratis Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}

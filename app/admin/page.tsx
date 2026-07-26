'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appState, SystemUser, checkIsAdminEmail } from '@/lib/store';
import { audio } from '@/lib/audio';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'pro' | 'annual'>('all');
  const [currentRole, setCurrentRole] = useState<'admin' | 'parent' | 'child'>('admin');
  const [globalIslamicToggle, setGlobalIslamicToggle] = useState(true);
  const [aiSpeechSpeed, setAiSpeechSpeed] = useState<'slow' | 'normal'>('slow');

  // Interactive Dashboard Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'google' | 'email'>('google');
  const [inputEmail, setInputEmail] = useState('adriansyaputra@gmail.com');
  const [inputPassword, setInputPassword] = useState('admin123');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    setUsers(appState.systemUsers);
    const unsub = appState.subscribe(() => {
      setUsers(appState.systemUsers);
    });
    return unsub;
  }, []);

  const handleSwitchMode = (mode: 'admin' | 'parent' | 'child') => {
    audio.playTap();
    setCurrentRole(mode);
    if (mode === 'parent') {
      router.push('/parent');
      if (typeof window !== 'undefined') window.location.assign('/parent');
    } else if (mode === 'child') {
      router.push('/play');
      if (typeof window !== 'undefined') window.location.assign('/play');
    } else {
      router.push('/admin');
      if (typeof window !== 'undefined') window.location.assign('/admin');
    }
  };

  const handleGoogleLogin = (emailChoice: string) => {
    audio.playCorrect();
    setIsLoggingIn(true);
    setTimeout(() => {
      appState.loginUser(emailChoice, 'Adriansyah Putra (Google Verified Admin)');
      setIsLoggingIn(false);
      setShowLoginModal(false);
      if (checkIsAdminEmail(emailChoice)) {
        router.push('/admin');
      } else {
        router.push('/parent');
      }
    }, 1000);
  };

  const handleEmailLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playCorrect();
    setIsLoggingIn(true);
    setTimeout(() => {
      const isAdmin = checkIsAdminEmail(inputEmail);
      appState.loginUser(inputEmail, isAdmin ? 'Adriansyah Putra (Admin)' : 'Orang Tua Pintar');
      setIsLoggingIn(false);
      setShowLoginModal(false);
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/parent');
      }
    }, 1000);
  };

  const handleToggleUserStatus = (userId: string) => {
    audio.playTap();
    appState.toggleUserStatus(userId);
  };

  const handleUpdatePlan = (userId: string, newPlan: 'free' | 'pro' | 'annual') => {
    audio.playCorrect();
    appState.updateUserPlan(userId, newPlan);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase()) || u.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'all' || u.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] p-6 sm:p-10 font-sans pb-32 selection:bg-secondary selection:text-on-secondary">
      
      {/* Top Floating Mode Switcher & Login Bar */}
      <div className="max-w-6xl mx-auto mb-8 bg-[#171f33]/90 backdrop-blur-xl border border-secondary/50 rounded-3xl p-4 shadow-[0_0_30px_rgba(148,222,45,0.25)] flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center text-secondary font-black text-xl shadow-[0_0_15px_rgba(148,222,45,0.5)]">
            👑
          </div>
          <div>
            <div className="text-[10px] font-black text-secondary uppercase tracking-widest">SUPER ADMIN DASHBOARD</div>
            <div className="text-base font-extrabold text-white font-heading">adriansyaputra@gmail.com</div>
          </div>
        </div>

        {/* Switch Mode & Direct Dashboard Login Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-[#0b1326] p-1.5 rounded-2xl border border-white/10 gap-1.5">
            <button
              onClick={() => handleSwitchMode('admin')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                currentRole === 'admin' ? 'bg-secondary text-[#1f3700] shadow-lg glow-secondary font-heading' : 'text-on-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span> Mode Admin 🛠️
            </button>

            <button
              onClick={() => handleSwitchMode('parent')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                currentRole === 'parent' ? 'bg-[#c0c1ff] text-[#0d0096] shadow-lg font-heading' : 'text-on-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">family_restroom</span> Mode Orang Tua 👨‍👩‍👧
            </button>

            <button
              onClick={() => handleSwitchMode('child')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                currentRole === 'child' ? 'bg-[#ffb95f] text-[#3e2400] shadow-lg font-heading' : 'text-on-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">child_care</span> Mode Anak 🧒
            </button>
          </div>

          <button
            onClick={() => {
              audio.playTap();
              setShowLoginModal(true);
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-secondary">lock</span>
            <span>Login / Ganti Akun</span>
          </button>
        </div>
      </div>

      {/* Main Admin Dashboard */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* KPI Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Total Akun Orang Tua</div>
            <div className="text-3xl font-black text-white font-heading">1.240 <span className="text-xs font-bold text-secondary">+18%</span></div>
            <div className="text-[11px] text-on-surface-variant/70 mt-1">Terdaftar di platform</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Total Profil Anak</div>
            <div className="text-3xl font-black text-primary font-heading">2.850 <span className="text-xs font-bold text-primary">Anak</span></div>
            <div className="text-[11px] text-on-surface-variant/70 mt-1">Aktif menggunakan AI Tutor</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-secondary/40 relative overflow-hidden glow-secondary bg-surface-container-low">
            <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Pendapatan Bulan Ini</div>
            <div className="text-3xl font-black text-secondary font-heading">Rp 35.980.000</div>
            <div className="text-[11px] text-on-surface-variant/70 mt-1">Via QRIS, VA, & E-Wallet</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-tertiary/40 relative overflow-hidden">
            <div className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">Member Pro Aktif</div>
            <div className="text-3xl font-black text-tertiary font-heading">845 <span className="text-xs font-bold text-white">(68%)</span></div>
            <div className="text-[11px] text-on-surface-variant/70 mt-1">Paket Pro & Tahunan</div>
          </div>

        </div>

        {/* System Settings & Global Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-extrabold text-emerald-400 font-heading text-lg">Konten Islami Global Switch</h3>
                <p className="text-xs text-on-surface-variant">Default status fitur Hijaiyah & Doa Harian untuk user baru</p>
              </div>
              <button
                onClick={() => {
                  audio.playTap();
                  setGlobalIslamicToggle(!globalIslamicToggle);
                }}
                className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors cursor-pointer ${
                  globalIslamicToggle ? 'bg-emerald-500 justify-end' : 'bg-surface-container-high justify-start'
                }`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow" />
              </button>
            </div>
            <div className="text-xs font-semibold text-white/80">
              Status: <span className="text-emerald-400 font-bold">{globalIslamicToggle ? 'AKTIF (Default ON)' : 'NON-AKTIF'}</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-primary/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-extrabold text-primary font-heading text-lg">AI Tutor Speech Articulation</h3>
                <p className="text-xs text-on-surface-variant">Mode pengucapan jelas per suku kata untuk balita</p>
              </div>
              <button
                onClick={() => {
                  audio.playTap();
                  setAiSpeechSpeed(aiSpeechSpeed === 'slow' ? 'normal' : 'slow');
                }}
                className="px-4 py-2 rounded-xl bg-primary/20 border border-primary/40 text-primary font-bold text-xs cursor-pointer"
              >
                {aiSpeechSpeed === 'slow' ? '🐢 Slow & Clear' : '⚡ Normal'}
              </button>
            </div>
            <div className="text-xs font-semibold text-white/80">
              Engine Status: <span className="text-primary font-bold">Engine Bahasa Indonesia id-ID Active</span>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-white font-heading">Manajemen Akun Pengguna</h3>
              <p className="text-xs text-on-surface-variant">Kelola status langganan, ubah role, dan kelola izin akses orang tua</p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari email / nama user..."
                className="bg-[#0b1326] border border-white/20 rounded-2xl px-4 py-2.5 text-xs text-white outline-none focus:border-secondary w-60"
              />

              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value as any)}
                className="bg-[#0b1326] border border-white/20 rounded-2xl px-4 py-2.5 text-xs text-white outline-none focus:border-secondary"
              >
                <option value="all">Semua Paket</option>
                <option value="free">Gratis</option>
                <option value="pro">Paket Pro</option>
                <option value="annual">Tahunan</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-on-surface-variant border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-heading uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-3">Nama / Email</th>
                  <th className="py-4 px-3">Paket Langganan</th>
                  <th className="py-4 px-3">Jumlah Anak</th>
                  <th className="py-4 px-3">Total XP</th>
                  <th className="py-4 px-3">Status</th>
                  <th className="py-4 px-3 text-right">Aksi Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-3">
                      <div className="font-bold text-white text-sm">{u.fullName}</div>
                      <div className="text-on-surface-variant/70 text-[11px]">{u.email}</div>
                    </td>
                    <td className="py-4 px-3">
                      <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                        u.plan === 'annual' ? 'bg-tertiary/20 text-tertiary border border-tertiary/40' : u.plan === 'pro' ? 'bg-secondary/20 text-secondary border border-secondary/40' : 'bg-white/10 text-white'
                      }`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-bold text-white">{u.childrenCount} Anak</td>
                    <td className="py-4 px-3 font-bold text-primary">{u.totalXp} XP</td>
                    <td className="py-4 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        u.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {u.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right space-x-2">
                      <button
                        onClick={() => handleUpdatePlan(u.id, u.plan === 'annual' ? 'free' : 'annual')}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] border border-white/20 cursor-pointer"
                      >
                        {u.plan === 'annual' ? 'Downgrade' : 'Upgrade Pro'}
                      </button>

                      <button
                        onClick={() => handleToggleUserStatus(u.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-[10px] cursor-pointer ${
                          u.status === 'active' ? 'bg-rose-600/30 text-rose-400 border border-rose-500/40 hover:bg-rose-600/50' : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/50'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Aktifkan'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ───────────────────────────────── INTERACTIVE DASHBOARD LOGIN & GOOGLE OAUTH MODAL ───────────────────────────────── */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full border border-white/20 text-left shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-white p-2 bg-white/10 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-secondary overflow-hidden mx-auto mb-3 shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuClXBgwlwCsXcjI3VUv2kE6mXUeUH7aXm6T9_Y_oB3vwHuTWHC_BsKQtEjdjn5RiipOkTBn8LQXruXKj26ZRS0i7M2R8MgUyCCnVBENlCZy1P5xMlAYTyg2tJwdN6FyiONsFHUjRyleuaYNXYAXSnS63JAJ6Owq9LTsUtIPhZkCcXW6gFh1gVeqUFXxQmQHAw4TO0FjczjTvTEp7lzu9FhAU8MI0XkGim7F6JYsp9KfpRjoIQVOPiAo1w"
                  alt="3D Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-black font-heading text-white">Login Akun Dashboard</h3>
              <p className="text-xs text-on-surface-variant mt-1">Masuk dengan Google 1-Click atau Email Anda</p>
            </div>

            {/* Login Method Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-[#0b1326] p-1 rounded-2xl border border-white/10 mb-6">
              <button
                onClick={() => setLoginMethod('google')}
                className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  loginMethod === 'google' ? 'bg-secondary text-[#1f3700] shadow-md font-heading' : 'text-on-surface-variant'
                }`}
              >
                🌐 Google 1-Click
              </button>

              <button
                onClick={() => setLoginMethod('email')}
                className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  loginMethod === 'email' ? 'bg-primary text-[#0d0096] shadow-md font-heading' : 'text-on-surface-variant'
                }`}
              >
                ✉️ Email & Password
              </button>
            </div>

            {/* Method 1: Google OAuth Instant Login */}
            {loginMethod === 'google' ? (
              <div className="space-y-3">
                <button
                  disabled={isLoggingIn}
                  onClick={() => handleGoogleLogin('adriansyaputra@gmail.com')}
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold py-3.5 px-4 rounded-2xl text-xs font-heading flex items-center justify-between shadow-lg border border-slate-200 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>adriansyaputra@gmail.com</span>
                  </div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">👑 ADMIN</span>
                </button>

                <button
                  disabled={isLoggingIn}
                  onClick={() => handleGoogleLogin('rina.jakarta@gmail.com')}
                  className="w-full bg-surface-container hover:bg-surface-container-high text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs font-heading flex items-center justify-between border border-white/10 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">family_restroom</span>
                    <span>rina.jakarta@gmail.com</span>
                  </div>
                  <span className="bg-secondary/20 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full">👨‍👩‍👧 ORANG TUA</span>
                </button>
              </div>
            ) : (
              /* Method 2: Email & Password */
              <form onSubmit={handleEmailLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white block mb-1 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full bg-[#0b1326] border border-white/20 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white block mb-1 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full bg-[#0b1326] border border-white/20 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-secondary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-secondary hover:bg-secondary-fixed text-[#1f3700] font-black py-3.5 rounded-2xl text-xs font-heading shadow-lg glow-secondary flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isLoggingIn ? 'Memproses Login...' : 'Masuk Dashboard'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

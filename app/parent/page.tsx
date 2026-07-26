'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appState, ChildProfile, BADGE_LIST, checkIsAdminEmail } from '@/lib/store';
import { audio } from '@/lib/audio';

export default function ParentDashboardPage() {
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [activeChildId, setActiveChildId] = useState<string>('c1');
  const [activeTab, setActiveTab] = useState<'progress' | 'screentime' | 'reports' | 'settings'>('progress');
  const [confirmResetModal, setConfirmResetModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'google' | 'email'>('google');
  const [inputEmail, setInputEmail] = useState('adriansyaputra@gmail.com');
  const [inputPassword, setInputPassword] = useState('admin123');

  useEffect(() => {
    setChildren(appState.children);
    setActiveChildId(appState.activeChildId);
    setIsAdmin(checkIsAdminEmail(appState.parentSettings.email));
    const unsub = appState.subscribe(() => {
      setChildren(appState.children);
      setIsAdmin(checkIsAdminEmail(appState.parentSettings.email));
    });
    return unsub;
  }, []);

  const activeChild = children.find(c => c.id === activeChildId) || children[0];
  if (!activeChild) return null;

  const todayMinutes = appState.todayScreenTimeMinutes[activeChild.id] || 45;
  const timeLimit = activeChild.dailyLimitMinutes;

  const handleShareWA = () => {
    audio.playTap();
    const text = encodeURIComponent(
      `📊 *Laporan Belajar ${activeChild.name} - Rumah Belajar Anak.id*\n\n` +
      `🔥 Streak: ${activeChild.streak} Hari berturut-turut\n` +
      `⭐ Level: ${activeChild.level} (${activeChild.xp} XP)\n` +
      `⏱️ Waktu Belajar Hari Ini: ${todayMinutes} Menit\n` +
      `🏆 Total Game Selesai: ${activeChild.completedGamesCount}\n\n` +
      `Rekomendasi minggu ini: ${activeChild.name} sangat mahir di Seni & Matematika!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleGoogleLogin = (emailChoice: string) => {
    audio.playCorrect();
    appState.loginUser(emailChoice, 'User Verified Google');
    setShowLoginModal(false);
    if (checkIsAdminEmail(emailChoice)) {
      router.push('/admin');
    } else {
      router.push('/parent');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] py-8 px-4 sm:px-8 font-sans pb-32">
      
      {/* Super Admin Top Floating Switcher Bar */}
      {isAdmin && (
        <div className="max-w-5xl mx-auto mb-6 bg-[#171f33]/90 backdrop-blur-xl border border-secondary/50 rounded-2xl p-2.5 shadow-[0_0_20px_rgba(148,222,45,0.2)] flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 px-3 text-xs font-extrabold text-secondary">
            👑 Super Admin Active ({appState.parentSettings.email})
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                audio.playTap();
                router.push('/admin');
              }}
              className="bg-secondary text-on-secondary px-3.5 py-1.5 rounded-xl text-xs font-black font-heading glow-secondary cursor-pointer"
            >
              🛠️ Mode Admin
            </button>
            <button
              onClick={() => {
                audio.playTap();
                router.push('/play');
              }}
              className="bg-tertiary text-on-tertiary-container px-3.5 py-1.5 rounded-xl text-xs font-black font-heading cursor-pointer"
            >
              🧒 Mode Anak
            </button>
          </div>
        </div>
      )}

      {/* Top Header Shell */}
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/play')}
            className="glass-panel text-white font-bold p-2.5 rounded-2xl border border-white/20 flex items-center gap-2 hover:border-secondary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> Mode Anak
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white font-heading">Dashboard Orang Tua</h1>
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                👑 Paket Tahunan VIP Active
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">Akses penuh gratis untuk {appState.parentSettings.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              audio.playTap();
              setShowLoginModal(true);
            }}
            className="glass-panel text-white font-bold px-4 py-2.5 rounded-2xl border border-white/20 flex items-center gap-2 text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-secondary">lock</span> Login / Ganti Akun
          </button>

          <button
            onClick={handleShareWA}
            className="bg-secondary text-on-secondary font-extrabold px-5 py-2.5 rounded-2xl text-sm font-heading flex items-center gap-2 shadow-lg glow-secondary cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">share</span> Kirim WA
          </button>
        </div>
      </div>

      {/* Multi-Child Selector Tabs */}
      <div className="max-w-5xl mx-auto glass-card rounded-2xl p-2 border border-white/10 mb-6 flex overflow-x-auto gap-2">
        {children.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              audio.playTap();
              setActiveChildId(c.id);
              appState.setActiveChild(c.id);
            }}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
              c.id === activeChildId ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(192,193,255,0.3)]' : 'text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <span className="text-xl">{c.avatarId === 'bunny' ? '🐰' : c.avatarId === 'bear' ? '🐻' : '🐱'}</span>
            <span>{c.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.id === activeChildId ? 'bg-primary text-on-primary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
              {c.ageTier.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Tabs */}
        <div className="md:col-span-1 glass-card p-2 rounded-2xl border border-white/10 flex md:flex-col gap-1 overflow-x-auto">
          {[
            { id: 'progress', label: 'Progress Belajar', icon: 'monitoring' },
            { id: 'screentime', label: 'Screen Time', icon: 'schedule' },
            { id: 'reports', label: 'Laporan Mingguan', icon: 'description' },
            { id: 'settings', label: 'Settings Anak', icon: 'tune' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                audio.playTap();
                setActiveTab(t.id as typeof activeTab);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all cursor-pointer ${
                activeTab === t.id ? 'bg-secondary/20 text-secondary border-l-4 border-secondary' : 'text-on-surface-variant hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Display Panel */}
        <div className="md:col-span-3 space-y-6">

          {/* TAB 1: PROGRESS BELAJAR */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <div className="text-[11px] text-on-surface-variant font-bold uppercase mb-1">Streak Belajar</div>
                  <div className="text-2xl font-black text-secondary font-heading flex items-center gap-1">
                    <span className="animate-fire text-2xl">🔥</span> {activeChild.streak} Hari
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <div className="text-[11px] text-on-surface-variant font-bold uppercase mb-1">Total XP</div>
                  <div className="text-2xl font-black text-primary font-heading">{activeChild.xp} XP</div>
                </div>

                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <div className="text-[11px] text-on-surface-variant font-bold uppercase mb-1">Game Selesai</div>
                  <div className="text-2xl font-black text-tertiary font-heading">{activeChild.completedGamesCount} Game</div>
                </div>
              </div>

              {/* 7-Day Chart */}
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h3 className="font-extrabold text-white font-heading text-lg mb-4">Waktu Belajar 7 Hari Terakhir</h3>
                <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-white/10 pb-2">
                  {[
                    { day: 'Sen', min: 30 },
                    { day: 'Sel', min: 45 },
                    { day: 'Rab', min: 60 },
                    { day: 'Kam', min: 25 },
                    { day: 'Jum', min: 40 },
                    { day: 'Sab', min: 50 },
                    { day: 'Min', min: 45 }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[11px] font-bold text-secondary">{bar.min}m</div>
                      <div
                        className="w-full bg-secondary rounded-t-lg shadow-[0_0_10px_rgba(148,222,45,0.4)] transition-all"
                        style={{ height: `${(bar.min / 60) * 100}%` }}
                      />
                      <div className="text-xs text-on-surface-variant font-semibold">{bar.day}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SCREEN TIME */}
          {activeTab === 'screentime' && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="font-extrabold text-white font-heading text-lg">Kontrol Screen Time Anak</h3>

              <div className="bg-surface-container/60 p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-on-surface-variant">Waktu Main Hari Ini</span>
                  <span className="font-black text-secondary font-heading text-lg">{todayMinutes} dari {timeLimit === 999 ? '∞' : timeLimit} Menit</span>
                </div>

                <div className="w-full bg-surface-container-high h-4 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${todayMinutes >= timeLimit ? 'bg-rose-500' : 'bg-secondary'}`}
                    style={{ width: `${Math.min(100, (todayMinutes / (timeLimit === 999 ? 120 : timeLimit)) * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-on-surface-variant/70 font-medium">Anak telah belajar secara sehat dan produktif hari ini.</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3 text-sm">Ubah Batas Waktu Harian</h4>
                <div className="grid grid-cols-4 gap-3">
                  {[30, 60, 120, 999].map((limit) => (
                    <button
                      key={limit}
                      onClick={() => {
                        audio.playTap();
                        appState.updateChild(activeChild.id, { dailyLimitMinutes: limit });
                      }}
                      className={`p-3 rounded-xl font-extrabold border text-xs cursor-pointer ${
                        activeChild.dailyLimitMinutes === limit ? 'bg-secondary text-on-secondary border-secondary glow-secondary' : 'glass-panel border-white/10 text-on-surface-variant'
                      }`}
                    >
                      {limit === 999 ? 'Bebas' : `${limit} Mins`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LAPORAN MINGGUAN */}
          {activeTab === 'reports' && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-white font-heading text-lg">Laporan Mingguan Otomatis</h3>
                <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30">Minggu Ini</span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-primary/30">
                <div className="flex items-center gap-2 font-extrabold text-primary font-heading text-base mb-2">
                  <span className="material-symbols-outlined text-amber-400">auto_awesome</span> Insight AI Tutor untuk Orang Tua
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                  &quot;{activeChild.name} menunjukkan perkembangan pesat pada kategori Huruf & Membaca minggu ini! Waktu konsentrasi rata-rata 18 menit per sesi. AI Tutor telah mengaktifkan pengucapan suku kata jelas untuk membantu pemahaman.&quot;
                </p>
              </div>

              <button
                onClick={handleShareWA}
                className="w-full bg-secondary text-on-secondary font-extrabold py-3.5 rounded-xl font-heading flex items-center justify-center gap-2 shadow-lg glow-secondary cursor-pointer"
              >
                <span className="material-symbols-outlined">share</span> Bagikan Laporan ke WhatsApp Orang Tua
              </button>
            </div>
          )}

          {/* TAB 4: SETTINGS ANAK */}
          {activeTab === 'settings' && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="font-extrabold text-white font-heading text-lg">Pengaturan Profil & Konten</h3>

              <div className="flex items-center justify-between p-4 glass-panel rounded-2xl border border-emerald-500/30">
                <div>
                  <div className="font-bold text-emerald-400 font-heading">Konten Edukasi Islami</div>
                  <div className="text-xs text-on-surface-variant">Hijaiyah dengan Qari Audio & Doa Harian</div>
                </div>
                <button
                  onClick={() => {
                    audio.playTap();
                    appState.updateChild(activeChild.id, { islamicEnabled: !activeChild.islamicEnabled });
                  }}
                  className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors cursor-pointer ${
                    activeChild.islamicEnabled ? 'bg-emerald-500 justify-end' : 'bg-surface-container-high justify-start'
                  }`}
                >
                  <div className="w-6 h-6 bg-white rounded-full shadow" />
                </button>
              </div>

              <div className="p-4 glass-panel rounded-2xl border border-rose-500/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-400 font-heading">Reset Progress Anak</div>
                  <div className="text-xs text-on-surface-variant">Hapus semua XP, level, dan badge anak ini</div>
                </div>
                <button
                  onClick={() => setConfirmResetModal(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span> Reset
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* DASHBOARD LOGIN & GOOGLE OAUTH MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full border border-white/20 text-left shadow-2xl relative">
            
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-white p-2 bg-white/10 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-black font-heading text-white">Login Akun Dashboard</h3>
              <p className="text-xs text-on-surface-variant mt-1">Pilih Google 1-Click atau Email Admin / Orang Tua</p>
            </div>

            <div className="space-y-3">
              <button
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

          </div>
        </div>
      )}

    </div>
  );
}

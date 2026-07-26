'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appState, AgeTier } from '@/lib/store';
import { audio } from '@/lib/audio';

const AVATARS = [
  {
    id: 'bunny',
    name: 'Kelinci',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv_dqu2ThlSs1jp3P2ZNkczmfQ_VoUNrqiG8AUVsCQOcqWs2eSPhqJVeThFEf8NmdSpCtxHYbfDLfOzKprRReTt969QDAXbicP6nHmfrbnYKB7SbDHM2rxPEfk8hyWxxLMeEoG8qdy9T3g9ejW44zv8DkOl9a6vi3hWAnXC_YyAV0kd_z4yXL7Naoj6MCBW-syyAUJKC6NjbMsHtc0Y9Ns7JqUSwE81mj0xZYufrwocXcWze5U-ktzcg'
  },
  {
    id: 'bear',
    name: 'Beruang',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3waBsDLJEiMUBc8r3SdZlQ_b6mfgVNvETWAKd4s6NDRWCBCSDhG4mgc1_DLkNZ_FXNV7QcTPaUaaOHfv8RZMGpKYdNOZdyiqoMNDolARoROd9E6_jWH3qFjAdZ4-oyu0rxdOFyYelc4XSmH3eSQRpISG7xrkk9NmCCDC5BPmx7Ebpxzo0kiTzK4Vu1SInQGoVIrX2IQWSZZqVj2mf4y9tjdxuLWa--beUfRdycoNrLcG_DQJneGaIkw'
  },
  {
    id: 'cat',
    name: 'Kucing',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1QK09Gh1S81lJFw6YFQXU3AZGP7j2zxLwnzqoqmIM2IlHbTfyp3HKbZwsNIuZ4Ni2LXsKJR-o8XeJv9QwziG8DfwTx3MCK3NzOst3rdMmQUe-h5bfnBo4xgKeDAVSlzKpwiwG9QoQO1gNYrA-HIjwPMNsGF_BcULz3mtJ3RLTbZOw6iMJ0qJRZ9MPQlGSJ90g-d9b3lIhbwh-GfcGK0FEkmyuLy8r8Z_iHmArYJxfB_-pGEUpEWcAA'
  },
  {
    id: 'panda',
    name: 'Panda',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIwyYS72VeE3q5CUnRE3l4ewnPvvwAwtxkW4JhUDLZzZwNygUrHa2IKBK8oeEfC1YMpKeA0unJbUY8DnAshC63Jzs-c8XlDdPf293iGIx48PjQgkdYO1R81clWuMfV87_LzsHLYH6F6RQEbLfFxb0GB4IRQBXWKhZpOPFkDKf9fhz_0Yt0b28FRQ3nv8ZUfqGbDmEQm3jjrqVJVdCsaQgKSETnSpA2qxs0Gk84-VV32ivBxBxuJa9K2g'
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form state
  const [name, setName] = useState('');
  const [avatarId, setAvatarId] = useState('bunny');
  const [ageTier, setAgeTier] = useState<AgeTier>('tk');
  const [gender, setGender] = useState<'boy' | 'girl'>('girl');
  const [favoriteTopics, setFavoriteTopics] = useState<string[]>(['angka', 'huruf']);
  const [islamicEnabled, setIslamicEnabled] = useState(true);
  const [parentPin, setParentPin] = useState('1234');

  const toggleTopic = (topic: string) => {
    audio.playTap();
    if (favoriteTopics.includes(topic)) {
      setFavoriteTopics(favoriteTopics.filter(t => t !== topic));
    } else {
      setFavoriteTopics([...favoriteTopics, topic]);
    }
  };

  const handleFinishOnboarding = () => {
    audio.playCorrect();
    appState.setParentPin(parentPin);
    appState.addChild({
      name: name || 'Dinda',
      avatarId,
      ageTier,
      gender,
      favoriteTopics,
      islamicEnabled,
      instructionLang: 'id',
      dailyLimitMinutes: 60,
      allowedStartHour: 15,
      allowedEndHour: 18
    });
    router.push('/play');
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans pb-32">
      {/* Top Header Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0b1326]/60 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">face</span>
          </div>
          <h1 className="font-extrabold text-xl text-primary font-heading">Setup Profil</h1>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-bold text-sm border border-secondary/30">
          Step {step}/3
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-lg px-6 mx-auto pt-24 space-y-8">
        
        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between items-end mb-2 text-xs">
            <span className="font-bold text-on-surface-variant uppercase tracking-wider">PROFIL ANAK</span>
            <span className="font-bold text-secondary">{Math.round((step / 3) * 100)}% Selesai</span>
          </div>
          <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-secondary rounded-full shadow-[0_0_15px_rgba(148,222,45,0.8)] transition-all duration-700 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: IDENTITAS ANAK */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Avatar Selection Section */}
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-black text-white font-heading">Pilih Teman Belajarmu</h2>
              <div className="flex overflow-x-auto gap-5 py-4 px-1 hide-scrollbar snap-x">
                {AVATARS.map((av) => {
                  const isSelected = avatarId === av.id;
                  return (
                    <button
                      key={av.id}
                      onClick={() => {
                        audio.playTap();
                        setAvatarId(av.id);
                      }}
                      className="snap-center flex-shrink-0 flex flex-col items-center group focus:outline-none"
                    >
                      <div
                        className={`w-24 h-24 rounded-full glass-panel flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative ${
                          isSelected ? 'border-4 border-primary shadow-[0_0_30px_rgba(192,193,255,0.6)] scale-105' : 'border border-white/10'
                        }`}
                      >
                        {isSelected && <div className="absolute -inset-2 rounded-full border border-primary/40 animate-pulse" />}
                        <img src={av.img} alt={av.name} className="w-16 h-16 object-contain" />
                      </div>
                      <span className={`mt-3 text-sm font-bold ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {av.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Input Name */}
            <section className="flex flex-col gap-4">
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  className="peer w-full h-16 bg-surface-container/40 border-2 border-outline-variant rounded-2xl px-4 pt-5 pb-1 text-on-surface font-bold text-lg focus:border-primary focus:ring-0 transition-all outline-none"
                />
                <label className="absolute left-4 top-5 text-on-surface-variant font-bold text-sm transition-all peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                  Nama Panggilan Anak
                </label>
              </div>

              {/* Age Group Chips */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-on-surface-variant">Kelompok Usia</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'balita', label: '2 - 4 Tahun' },
                    { id: 'tk', label: '4 - 6 Tahun' },
                    { id: 'sd_low', label: '1 - 3 SD' },
                    { id: 'sd_high', label: '4 - 6 SD' }
                  ].map((chip) => {
                    const isSelected = ageTier === chip.id;
                    return (
                      <button
                        key={chip.id}
                        onClick={() => {
                          audio.playTap();
                          setAgeTier(chip.id as AgeTier);
                        }}
                        className={`px-5 py-3 rounded-full font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-primary/20 border border-primary/40 text-primary shadow-[0_0_15px_rgba(192,193,255,0.3)]'
                            : 'glass-panel border border-white/10 text-on-surface-variant hover:bg-white/5'
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gender Selection */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-on-surface-variant">Jenis Kelamin</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      audio.playTap();
                      setGender('boy');
                    }}
                    className={`group flex flex-col items-center justify-center p-6 glass-panel border rounded-2xl transition-all ${
                      gender === 'boy' ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(192,193,255,0.3)]' : 'border-white/10 hover:border-primary/50'
                    }`}
                  >
                    <div className="w-14 h-14 mb-2 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-primary">face</span>
                    </div>
                    <span className="font-bold text-white">Laki-laki</span>
                  </button>

                  <button
                    onClick={() => {
                      audio.playTap();
                      setGender('girl');
                    }}
                    className={`group flex flex-col items-center justify-center p-6 glass-panel border rounded-2xl transition-all ${
                      gender === 'girl' ? 'border-tertiary bg-tertiary/10 shadow-[0_0_20px_rgba(255,185,95,0.3)]' : 'border-white/10 hover:border-tertiary/50'
                    }`}
                  >
                    <div className="w-14 h-14 mb-2 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-tertiary">face_3</span>
                    </div>
                    <span className="font-bold text-white">Perempuan</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* STEP 2: PREFERENSI BELAJAR */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white font-heading">Preferensi & Topik Belajar</h2>

            <div className="space-y-3">
              <label className="text-sm font-bold text-on-surface-variant">Topik Favorit Anak</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'angka', label: '🔢 Angka & Math' },
                  { id: 'huruf', label: '🔤 Huruf & Read' },
                  { id: 'sains', label: '🌍 Sains & Alam' },
                  { id: 'english', label: '🗣️ English' },
                  { id: 'seni', label: '🎨 Seni & Kreativitas' }
                ].map((top) => (
                  <button
                    key={top.id}
                    onClick={() => toggleTopic(top.id)}
                    className={`px-4 py-3 rounded-2xl font-bold text-xs border transition-all ${
                      favoriteTopics.includes(top.id)
                        ? 'bg-secondary text-on-secondary border-secondary shadow-[0_0_15px_rgba(148,222,45,0.5)]'
                        : 'glass-panel border-white/10 text-on-surface-variant'
                    }`}
                  >
                    {top.label} {favoriteTopics.includes(top.id) && '✓'}
                  </button>
                ))}
              </div>
            </div>

            {/* Islamic Toggle */}
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-emerald-400 text-base font-heading">Konten Edukasi Islami ☪️</div>
                <div className="text-xs text-on-surface-variant">Hijaiyah dengan qari audio & Doa Harian</div>
              </div>
              <button
                onClick={() => {
                  audio.playTap();
                  setIslamicEnabled(!islamicEnabled);
                }}
                className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors ${
                  islamicEnabled ? 'bg-emerald-500 justify-end' : 'bg-surface-container-high justify-start'
                }`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PARENTAL CONTROL */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white font-heading">Parental Control & Security</h2>

            <div>
              <label className="text-sm font-bold text-on-surface-variant block mb-3">Batas Screen Time Harian</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { mins: 30, label: '⏱️ 30 Menit' },
                  { mins: 60, label: '⏱️ 1 Jam' },
                  { mins: 120, label: '⏱️ 2 Jam' },
                  { mins: 999, label: '♾️ Bebas' }
                ].map((l) => (
                  <button
                    key={l.mins}
                    onClick={() => {
                      audio.playTap();
                      // set daily limit
                    }}
                    className="p-4 rounded-2xl glass-panel border border-white/10 font-bold text-center text-sm text-white hover:border-secondary transition-all"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-on-surface-variant block mb-2">PIN Orang Tua (4 Digit)</label>
              <input
                type="password"
                maxLength={4}
                value={parentPin}
                onChange={(e) => setParentPin(e.target.value)}
                className="w-full bg-surface-container/60 border-2 border-white/20 rounded-2xl p-4 text-center text-3xl font-black tracking-widest text-primary outline-none focus:border-primary"
              />
              <p className="text-xs text-on-surface-variant/70 mt-1">Digunakan untuk membuka Parent Dashboard & Settings</p>
            </div>
          </div>
        )}

      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 left-0 w-full p-6 flex justify-center pointer-events-none z-50">
        {step < 3 ? (
          <button
            onClick={() => {
              audio.playTap();
              setStep(step + 1);
            }}
            className="pointer-events-auto w-full max-w-md h-16 bg-secondary text-on-secondary rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 glow-secondary transition-all hover:scale-[1.02] active:scale-95 group font-heading"
          >
            <span>Lanjut</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>
          </button>
        ) : (
          <button
            onClick={handleFinishOnboarding}
            className="pointer-events-auto w-full max-w-md h-16 bg-secondary text-on-secondary rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 glow-secondary transition-all hover:scale-[1.02] active:scale-95 group font-heading"
          >
            <span>Mulai Petualangan 🚀</span>
          </button>
        )}
      </footer>
    </div>
  );
}

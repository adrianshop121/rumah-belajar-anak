'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appState, ChildProfile, BADGE_LIST } from '@/lib/store';
import { GameWrapper } from '@/components/games/GameWrapper';
import { AITutor } from '@/components/mascot/AITutor';
import { audio } from '@/lib/audio';

export default function ChildPlayPage() {
  const router = useRouter();
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [parentPinModal, setParentPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeBottomNav, setActiveBottomNav] = useState<'belajar' | 'misi' | 'prestasi' | 'profil'>('belajar');

  useEffect(() => {
    setActiveChild(appState.getActiveChild());
    const unsub = appState.subscribe(() => {
      setActiveChild(appState.getActiveChild());
    });
    return unsub;
  }, []);

  if (!activeChild) return null;

  const categories = [
    {
      id: 'math',
      title: 'Angka',
      color: 'text-primary',
      barBg: 'bg-primary',
      progressWidth: 'w-[80%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEVqoom2MalNJuMFTeJpnPHk9JE86eZtuGGo6HCtUTNvYq1CX6oTp2kR68lKCOYUApm7-dJx5S7eVDbWaDjkbKN4hez-_I8ucJ9EiLkFZb71bpD7hC7htqXePPRoXBGhkFfSyjFQS1KMYvA-6e4Us6YdC1BeZUAt1XSuJEe5sUeyUhSYZB-UndSON_V5t6xQqdBDW38m8vycD24-oCsBPDQV2A_ubQS0_yk_h3H_NQxT8zKcfe2iTtqg',
      glow: 'bg-primary/20 group-hover:bg-primary/40'
    },
    {
      id: 'reading',
      title: 'Huruf',
      color: 'text-secondary',
      barBg: 'bg-secondary',
      progressWidth: 'w-[65%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyNDRBpobCtOrPC6-8rEpxjN4mQzHQEfYvhYAtv1XjChXkpRb2dRaqVnuFPeIJBc1xHqRNnvXr8sx0FGdz5I6Thv2l3VFFo0OZ4yS9rFLjrS7uZOLAaX7fG8ssRqWNjPdrHdoFukzv-D7pBz3Sc_ArHk92VZGMvjH94m_Z4WRYnrioy3LPyZC3HKLAKXGHjTpelgINCXCEicRRTuW1mnEmvcD6c3AS4jUJ2-_Ty9NOEj16wm7Gbd9xqA',
      glow: 'bg-secondary/20 group-hover:bg-secondary/40'
    },
    {
      id: 'science',
      title: 'Sains',
      color: 'text-tertiary',
      barBg: 'bg-tertiary',
      progressWidth: 'w-[45%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2ihOvZvfUK6iF1rJ79zpAPtacmGQoPUchNxi6-rbZ_T9BTLZZTz1_xn6hrYf_8XrXATKaIGhKWMf8JUk-1A-4bguApxBi3OskXpjAvSXF03MlPBmgbvl_MKK77Qqnh0bvE6qmUREM2TeGYg6IAAuWFUqnRN_vAdroYXrUB6OWpivJng4gm0rbvd4zs_0wLe27CK0OaI4rMaRFe4GuIO1HZqOWelrrTGx6TS3B1ysTDKlSsmCrf9J0SQ',
      glow: 'bg-tertiary/20 group-hover:bg-tertiary/40'
    },
    {
      id: 'art',
      title: 'Seni',
      color: 'text-pink-400',
      barBg: 'bg-pink-500',
      progressWidth: 'w-[75%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRZ7ytJxI9qDC70LNkToPEw2HL7BCYMroVnqSCNJCZqRP_wk3MVxQR_Th8gZ4GQkPb--DOX5f2-AEPRE7be6uUZGART4Uv4LgDvwrf4PFkgBGy0JCqhV6TXlBpj3oKAWY4LgBSnIQd4JihSpJoG-PIqQl0d20UCiiTfivmu5aPH8E3Xqhy7y9SjVvTBO_CeqV-afhnmwQuNf9_Rwz8_w9e6C_Z7eCDcOIxozLTGROR_RNPo3_iSpWvzw',
      glow: 'bg-pink-500/20 group-hover:bg-pink-500/40'
    },
    {
      id: 'music',
      title: 'Lagu',
      color: 'text-cyan-300',
      barBg: 'bg-cyan-400',
      progressWidth: 'w-[90%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQl1Nn7dQB5WestWmtTjrdPP4xYQxjY5yhddB_ZEEQ_Szv5F3jfxk7Z-psFsldzv2mnNGlmo34widUrxtA8aHdcNRgMRTFXXAu0gVE8ay40OaS0ilDWr_9MkvnR_cHp72-PrSuSuATCZ-MRwyYJTQpe-D9RMdaoBp5Hz7s9OCPFGjs5PGTqpohx010hbDxlzUBEp5b_fL32YnPMU9ZDxR-9OHINGPwHAipWZPTEAlGNA2lfC9GFVGV6g',
      glow: 'bg-cyan-400/20 group-hover:bg-cyan-400/40'
    },
    {
      id: 'english',
      title: 'English',
      color: 'text-indigo-300',
      barBg: 'bg-indigo-400',
      progressWidth: 'w-[35%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACmB4Jdy7xbVel_mlEP_HfwZFEFSR3PRvkdXvchiaa318Ws0Z4pkGS0iT0R1ABBASDkmCfTDmU3wC3skBOwbE2txlRZnBuNAGagHQMOH30x_bLRQ9wFS7ZHFGNpGP4JMsE0zffwAvNmw2JeMxvah-tCwxmU5dGSW8T-hr0mR1QhUo9N4CHWdAzdtv1NZGwbAxMCh_uzzU72WUavZeUzv8H65kdfsamRs1wPdDCOwWgvv06dsE7oxYmnw',
      glow: 'bg-indigo-400/20 group-hover:bg-indigo-400/40'
    },
    ...(activeChild.islamicEnabled ? [{
      id: 'islamic',
      title: 'Islami',
      color: 'text-emerald-400',
      barBg: 'bg-emerald-500',
      progressWidth: 'w-[60%]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0tQGE-nX9ZiS5tqA4YGvw-a6ANH1AUG9KobV0Hyr22sS5_Y8PKg4KSLzS9CxU0mmqM7t54JigNHITtxMzkaFK5Ad6VvAKcJxmVE7SWnpu_QbeB_1ZLzr_KZmT0QhrqLMPcT7nR8blnGJMh1lxCBJKOJXKMqQdYVRkMqzv6YoM1wRZV9cQRqge5fATMgOr63ScT1AWkAT7knZfBYVE569RaxVNbA4LBjaaqMepNX2vBf4H60GaFBtYyQ',
      glow: 'bg-emerald-500/20 group-hover:bg-emerald-500/40'
    }] : [])
  ];

  const handleCategoryTap = (catId: string) => {
    audio.playTap();
    setSelectedCategory(catId);
  };

  const handlePinSubmit = () => {
    if (enteredPin === appState.parentSettings.parentPin) {
      audio.playCorrect();
      router.push('/parent');
    } else {
      audio.playTryAgain();
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  if (selectedCategory) {
    return (
      <GameWrapper
        categoryId={selectedCategory}
        ageTier={activeChild.ageTier}
        avatarId={activeChild.avatarId}
        onBack={() => setSelectedCategory(null)}
        onGameComplete={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans min-h-screen pb-36 selection:bg-secondary selection:text-on-secondary">
      {/* Top App Bar Header Shell */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-[#0b1326]/60 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-primary overflow-hidden bg-surface-container shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0tQGE-nX9ZiS5tqA4YGvw-a6ANH1AUG9KobV0Hyr22sS5_Y8PKg4KSLzS9CxU0mmqM7t54JigNHITtxMzkaFK5Ad6VvAKcJxmVE7SWnpu_QbeB_1ZLzr_KZmT0QhrqLMPcT7nR8blnGJMh1lxCBJKOJXKMqQdYVRkMqzv6YoM1wRZV9cQRqge5fATMgOr63ScT1AWkAT7knZfBYVE569RaxVNbA4LBjaaqMepNX2vBf4H60GaFBtYyQ"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold text-on-surface-variant/80 uppercase tracking-wider">Halo, {activeChild.name}!</p>
            <h1 className="font-extrabold text-lg text-primary font-heading leading-tight">Rumah Belajar</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 gap-2">
            <span className="text-sm font-black text-white">{activeChild.streak} Hari</span>
            <span className="text-xl animate-fire">🔥</span>
          </div>

          <button
            onClick={() => setParentPinModal(true)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/20 text-white"
            title="Parent Area PIN"
          >
            <span className="material-symbols-outlined text-sm">lock</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 px-6 space-y-8 max-w-lg mx-auto">
        
        {/* Daily Quest Hero Card Feature */}
        {activeBottomNav === 'belajar' && (
          <>
            <section
              onClick={() => handleCategoryTap('math')}
              className="relative group cursor-pointer overflow-hidden rounded-3xl border border-white/20 shadow-2xl transition-transform active:scale-95"
            >
              <div className="mesh-gradient-quest p-7 min-h-[210px] flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-secondary">auto_awesome</span>
                    <span className="text-xs font-black text-white/90 tracking-widest uppercase font-heading">Misi Hari Ini</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-heading">
                    Taklukkan Angka 1-20! 🔢
                  </h2>
                </div>

                <div className="flex justify-between items-end">
                  <button className="bg-white/20 backdrop-blur-xl border border-white/30 text-white font-extrabold text-lg px-8 py-3 rounded-full hover:bg-white/30 transition-all shadow-lg active:scale-90 font-heading">
                    Mulai!
                  </button>

                  <div className="w-16 h-16 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-white/20" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4" />
                      <circle className="text-secondary drop-shadow-[0_0_8px_rgba(148,222,45,0.8)]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175" strokeDashoffset="40" strokeWidth="6" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm font-heading">75%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Category 3D Cards Grid */}
            <section className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryTap(cat.id)}
                  className="glass-card rounded-3xl p-5 flex flex-col items-center text-center gap-3 group hover:bg-white/10 transition-all cursor-pointer border border-white/10 shadow-lg active:scale-95"
                >
                  <div className="w-20 h-20 flex items-center justify-center relative">
                    <div className={`absolute inset-0 ${cat.glow} blur-xl transition-colors rounded-full`} />
                    <img src={cat.img} alt={cat.title} className="w-16 h-16 relative z-10 group-hover:scale-110 transition-transform object-contain" />
                  </div>
                  <div>
                    <h3 className={`font-black text-xl font-heading ${cat.color}`}>{cat.title}</h3>
                    <div className="h-1.5 w-16 bg-white/10 rounded-full mt-2 overflow-hidden mx-auto">
                      <div className={`h-full ${cat.barBg} ${cat.progressWidth} rounded-full shadow-[0_0_10px_currentColor]`} />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Misi Tab */}
        {activeBottomNav === 'misi' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white font-heading">Misi Harian & Tantangan</h2>
            <div className="glass-card p-5 rounded-3xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl">task_alt</span>
                <div>
                  <div className="font-bold text-white">Selesaikan 3 Game Matematika</div>
                  <div className="text-xs text-on-surface-variant">+100 XP Bonus</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prestasi Tab */}
        {activeBottomNav === 'prestasi' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white font-heading">Koleksi Badge ({activeChild.badges.length})</h2>
            <div className="grid grid-cols-2 gap-3">
              {BADGE_LIST.map((b) => (
                <div key={b.id} className="glass-card p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <div className="font-bold text-xs text-white">{b.title}</div>
                    <div className="text-[10px] text-on-surface-variant">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profil Tab */}
        {activeBottomNav === 'profil' && (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl text-center space-y-3">
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 border-secondary shadow-[0_0_20px_rgba(148,222,45,0.5)]">
                <img src={activeChild.avatarImg || "https://lh3.googleusercontent.com/aida-public/AB6AXuBv_dqu2ThlSs1jp3P2ZNkczmfQ_VoUNrqiG8AUVsCQOcqWs2eSPhqJVeThFEf8NmdSpCtxHYbfDLfOzKprRReTt969QDAXbicP6nHmfrbnYKB7SbDHM2rxPEfk8hyWxxLMeEoG8qdy9T3g9ejW44zv8DkOl9a6vi3hWAnXC_YyAV0kd_z4yXL7Naoj6MCBW-syyAUJKC6NjbMsHtc0Y9Ns7JqUSwE81mj0xZYufrwocXcWze5U-ktzcg"} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black text-white font-heading">{activeChild.name}</h3>
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full font-extrabold text-sm border border-secondary/40">
                ⭐ {activeChild.level} ({activeChild.xp} XP)
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs">
                <div className="bg-white/5 p-3 rounded-2xl">
                  <div className="text-secondary font-black text-lg">🔥 {activeChild.streak}</div>
                  <div className="text-[10px] text-on-surface-variant font-bold">Hari Streak</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl">
                  <div className="text-tertiary font-black text-lg">🏆 {activeChild.badges.length}</div>
                  <div className="text-[10px] text-on-surface-variant font-bold">Badge</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl">
                  <div className="text-primary font-black text-lg">🎮 {activeChild.completedGamesCount}</div>
                  <div className="text-[10px] text-on-surface-variant font-bold">Game</div>
                </div>
              </div>
            </div>

            {/* Tema App Selection */}
            <div className="glass-card p-5 rounded-3xl space-y-3">
              <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                <span>🎨</span> Pilih Tema Warna App
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'default', name: 'Biru Ceria', color: 'bg-blue-500' },
                  { id: 'sunset', name: 'Sunset Gold', color: 'bg-amber-500' },
                  { id: 'ocean', name: 'Ocean Blue', color: 'bg-cyan-500' },
                  { id: 'forest', name: 'Forest Emerald', color: 'bg-emerald-500' },
                  { id: 'purple_candy', name: 'Purple Candy', color: 'bg-purple-500' }
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      audio.playTap();
                      appState.updateChild(activeChild.id, { unlockedThemes: [theme.id] });
                    }}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
                      activeChild.unlockedThemes.includes(theme.id) ? 'bg-white/20 border-secondary text-white shadow-md' : 'bg-white/5 border-white/10 text-on-surface-variant'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating 3D Rabbit Mascot */}
      <AITutor avatarId={activeChild.avatarId} message="Ayo kita berpetualang lagi! ✨" />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 flex justify-around items-center py-2 px-4 bg-[#171f33]/60 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(148,222,45,0.25)] rounded-full">
        {/* Belajar */}
        <button
          onClick={() => {
            audio.playTap();
            setActiveBottomNav('belajar');
          }}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
            activeBottomNav === 'belajar' ? 'bg-secondary text-on-secondary animate-bounce shadow-[0_0_15px_rgba(148,222,45,0.6)]' : 'text-on-surface-variant/70 hover:scale-110'
          }`}
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px] font-bold mt-0.5">Belajar</span>
        </button>

        {/* Misi */}
        <button
          onClick={() => {
            audio.playTap();
            setActiveBottomNav('misi');
          }}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
            activeBottomNav === 'misi' ? 'bg-secondary text-on-secondary animate-bounce shadow-[0_0_15px_rgba(148,222,45,0.6)]' : 'text-on-surface-variant/70 hover:scale-110'
          }`}
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-bold mt-0.5">Misi</span>
        </button>

        {/* Prestasi */}
        <button
          onClick={() => {
            audio.playTap();
            setActiveBottomNav('prestasi');
          }}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
            activeBottomNav === 'prestasi' ? 'bg-secondary text-on-secondary animate-bounce shadow-[0_0_15px_rgba(148,222,45,0.6)]' : 'text-on-surface-variant/70 hover:scale-110'
          }`}
        >
          <span className="material-symbols-outlined">emoji_events</span>
          <span className="text-[10px] font-bold mt-0.5">Prestasi</span>
        </button>

        {/* Profil */}
        <button
          onClick={() => {
            audio.playTap();
            setActiveBottomNav('profil');
          }}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all ${
            activeBottomNav === 'profil' ? 'bg-secondary text-on-secondary animate-bounce shadow-[0_0_15px_rgba(148,222,45,0.6)]' : 'text-on-surface-variant/70 hover:scale-110'
          }`}
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-bold mt-0.5">Profil</span>
        </button>
      </nav>

      {/* Parent PIN Lock Modal */}
      {parentPinModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 max-w-sm w-full border border-white/20 text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-2">lock</span>
            <h3 className="text-xl font-bold font-heading text-white mb-2">Area Orang Tua</h3>
            <p className="text-xs text-on-surface-variant mb-4">Masukkan 4-digit PIN Orang Tua</p>

            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="••••"
              className="w-full bg-surface-container/60 border-2 border-white/20 rounded-2xl p-3 text-center text-3xl font-black text-primary outline-none mb-4"
            />

            {pinError && <p className="text-xs text-error font-bold mb-3">PIN Salah! Coba lagi.</p>}

            <div className="flex gap-2">
              <button
                onClick={() => setParentPinModal(false)}
                className="flex-1 bg-white/10 text-white font-bold py-3 rounded-2xl"
              >
                Batal
              </button>
              <button
                onClick={handlePinSubmit}
                className="flex-1 bg-secondary text-on-secondary font-extrabold py-3 rounded-2xl font-heading glow-secondary"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

export type AgeTier = 'balita' | 'tk' | 'sd_low' | 'sd_high';
export type UserRole = 'admin' | 'parent' | 'child';

export interface ChildProfile {
  id: string;
  name: string;
  avatarId: string;
  avatarImg?: string;
  ageTier: AgeTier;
  gender: 'boy' | 'girl';
  favoriteTopics: string[];
  islamicEnabled: boolean;
  instructionLang: 'id' | 'id_en';
  dailyLimitMinutes: number;
  allowedStartHour: number;
  allowedEndHour: number;
  xp: number;
  level: string;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  badges: string[];
  completedGamesCount: number;
  gamesProgress: Record<string, number>;
  unlockedThemes: string[];
  unlockedFrames: string[];
}

export interface ParentSettings {
  parentPin: string;
  subscriptionPlan: 'free' | 'pro' | 'annual';
  notificationEnabled: boolean;
  email: string;
  fullName: string;
  role: UserRole;
  isLoggedIn: boolean;
}

export interface SystemUser {
  id: string;
  email: string;
  fullName: string;
  plan: 'free' | 'pro' | 'annual';
  childrenCount: number;
  totalXp: number;
  joinedDate: string;
  status: 'active' | 'suspended';
}

export const AVATAR_IMAGES: Record<string, string> = {
  bunny: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv_dqu2ThlSs1jp3P2ZNkczmfQ_VoUNrqiG8AUVsCQOcqWs2eSPhqJVeThFEf8NmdSpCtxHYbfDLfOzKprRReTt969QDAXbicP6nHmfrbnYKB7SbDHM2rxPEfk8hyWxxLMeEoG8qdy9T3g9ejW44zv8DkOl9a6vi3hWAnXC_YyAV0kd_z4yXL7Naoj6MCBW-syyAUJKC6NjbMsHtc0Y9Ns7JqUSwE81mj0xZYufrwocXcWze5U-ktzcg',
  bear: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3waBsDLJEiMUBc8r3SdZlQ_b6mfgVNvETWAKd4s6NDRWCBCSDhG4mgc1_DLkNZ_FXNV7QcTPaUaaOHfv8RZMGpKYdNOZdyiqoMNDolARoROd9E6_jWH3qFjAdZ4-oyu0rxdOFyYelc4XSmH3eSQRpISG7xrkk9NmCCDC5BPmx7Ebpxzo0kiTzK4Vu1SInQGoVIrX2IQWSZZqVj2mf4y9tjdxuLWa--beUfRdycoNrLcG_DQJneGaIkw',
  cat: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1QK09Gh1S81lJFw6YFQXU3AZGP7j2zxLwnzqoqmIM2IlHbTfyp3HKbZwsNIuZ4Ni2LXsKJR-o8XeJv9QwziG8DfwTx3MCK3NzOst3rdMmQUe-h5bfnBo4xgKeDAVSlzKpwiwG9QoQO1gNYrA-HIjwPMNsGF_BcULz3mtJ3RLTbZOw6iMJ0qJRZ9MPQlGSJ90g-d9b3lIhbwh-GfcGK0FEkmyuLy8r8Z_iHmArYJxfB_-pGEUpEWcAA',
  panda: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIwyYS72VeE3q5CUnRE3l4ewnPvvwAwtxkW4JhUDLZzZwNygUrHa2IKBK8oeEfC1YMpKeA0unJbUY8DnAshC63Jzs-c8XlDdPf293iGIx48PjQgkdYO1R81clWuMfV87_LzsHLYH6F6RQEbLfFxb0GB4IRQBXWKhZpOPFkDKf9fhz_0Yt0b28FRQ3nv8ZUfqGbDmEQm3jjrqVJVdCsaQgKSETnSpA2qxs0Gk84-VV32ivBxBxuJa9K2g'
};

const DEFAULT_CHILDREN: ChildProfile[] = [
  {
    id: 'c1',
    name: 'Dinda',
    avatarId: 'bunny',
    avatarImg: AVATAR_IMAGES.bunny,
    ageTier: 'tk',
    gender: 'girl',
    favoriteTopics: ['angka', 'huruf', 'seni'],
    islamicEnabled: true,
    instructionLang: 'id',
    dailyLimitMinutes: 60,
    allowedStartHour: 15,
    allowedEndHour: 18,
    xp: 450,
    level: 'Bintang Bersinar',
    streak: 7,
    longestStreak: 7,
    lastActiveDate: new Date().toISOString().split('T')[0],
    badges: ['first_10', 'streak_3', 'math_master'],
    completedGamesCount: 14,
    gamesProgress: { 'math-1': 3, 'math-2': 3, 'read-1': 2, 'art-1': 3 },
    unlockedThemes: ['default', 'pink'],
    unlockedFrames: ['default', 'star_frame']
  },
  {
    id: 'c2',
    name: 'Rafa',
    avatarId: 'bear',
    avatarImg: AVATAR_IMAGES.bear,
    ageTier: 'balita',
    gender: 'boy',
    favoriteTopics: ['angka', 'sains'],
    islamicEnabled: true,
    instructionLang: 'id',
    dailyLimitMinutes: 30,
    allowedStartHour: 15,
    allowedEndHour: 18,
    xp: 120,
    level: 'Bintang Kecil',
    streak: 3,
    longestStreak: 3,
    lastActiveDate: new Date().toISOString().split('T')[0],
    badges: ['first_10'],
    completedGamesCount: 4,
    gamesProgress: { 'math-1': 3, 'sci-1': 2 },
    unlockedThemes: ['default'],
    unlockedFrames: ['default']
  }
];

export const APP_THEMES = [
  { id: 'default', name: 'Biru Ceria', bgClass: 'bg-[#FFF9F0]', cardBg: 'bg-white', primaryColor: '#4A90E2', icon: '🎨' },
  { id: 'sunset', name: 'Sunset Gold', bgClass: 'bg-[#FFF5EB]', cardBg: 'bg-[#FFF0DF]', primaryColor: '#FF9A3C', icon: '🌅' },
  { id: 'ocean', name: 'Ocean Blue', bgClass: 'bg-[#EBF7FF]', cardBg: 'bg-[#E0F2FE]', primaryColor: '#0EA5E9', icon: '🌊' },
  { id: 'forest', name: 'Forest Emerald', bgClass: 'bg-[#F0FDF4]', cardBg: 'bg-[#DCFCE7]', primaryColor: '#10B981', icon: '🌲' },
  { id: 'purple_candy', name: 'Purple Candy', bgClass: 'bg-[#FAF5FF]', cardBg: 'bg-[#F3E8FF]', primaryColor: '#A855F7', icon: '🍬' }
];

export const AVATAR_FRAMES = [
  { id: 'default', name: 'Polos', borderClass: 'border-2 border-[#4A90E2]' },
  { id: 'star_frame', name: 'Bintang Emas 🌟', borderClass: 'border-4 border-[#FFD93D] shadow-[0_0_15px_rgba(255,217,61,0.8)]' },
  { id: 'gold_crown', name: 'Mahkota Juara 👑', borderClass: 'border-4 border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.8)]' },
  { id: 'rainbow_ring', name: 'Pelangi 🌈', borderClass: 'border-4 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.8)]' },
  { id: 'emerald_leaf', name: 'Daun Segar 🍃', borderClass: 'border-4 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' }
];

export const BADGE_LIST = [
  { id: 'math_master', title: 'Ahli Matematika', desc: 'Selesaikan 5 game matematika', icon: '🔢' },
  { id: 'book_worm', title: 'Kutu Buku', desc: 'Selesaikan 5 game membaca', icon: '📖' },
  { id: 'explorer', title: 'Penjelajah', desc: 'Selesaikan 5 game pengetahuan umum', icon: '🌍' },
  { id: 'little_artist', title: 'Seniman Cilik', desc: 'Selesaikan 3 aktivitas kreativitas', icon: '🎨' },
  { id: 'english_star', title: 'Bintang Inggris', desc: 'Selesaikan 3 game Bahasa Inggris', icon: '🗣️' },
  { id: 'talented_singer', title: 'Penyanyi Berbakat', desc: 'Dengarkan 5 lagu edukasi', icon: '🎵' },
  { id: 'streak_3', title: 'Semangat 3 Hari', desc: 'Belajar 3 hari berturut-turut', icon: '🔥' },
  { id: 'streak_7', title: 'Juara Seminggu', desc: 'Belajar 7 hari berturut-turut', icon: '🏆' },
  { id: 'streak_30', title: 'Super Konsisten', desc: 'Belajar 30 hari berturut-turut', icon: '💎' },
  { id: 'first_10', title: 'Pemula Hebat', desc: 'Selesaikan 10 game pertama', icon: '🌟' },
  { id: 'completed_50', title: 'Rajin Belajar', desc: 'Total 50 game selesai', icon: '🚀' },
  { id: 'badge_10', title: 'Sang Juara', desc: 'Raih 10 badge', icon: '👑' }
];

export const MOCK_SYSTEM_USERS: SystemUser[] = [
  { id: 'u1', email: 'adriansyaputra@gmail.com', fullName: 'Adriansyah Putra (Super Admin)', plan: 'annual', childrenCount: 3, totalXp: 1850, joinedDate: '2026-01-10', status: 'active' },
  { id: 'u2', email: 'rina.jakarta@gmail.com', fullName: 'Ibu Rina Sativa', plan: 'pro', childrenCount: 2, totalXp: 920, joinedDate: '2026-03-15', status: 'active' },
  { id: 'u3', email: 'andi.bandung@yahoo.com', fullName: 'Pak Andi Wijaya', plan: 'annual', childrenCount: 1, totalXp: 1450, joinedDate: '2026-02-20', status: 'active' },
  { id: 'u4', email: 'sari.surabaya@gmail.com', fullName: 'Ibu Sari Rahmawati', plan: 'free', childrenCount: 2, totalXp: 450, joinedDate: '2026-05-04', status: 'active' },
  { id: 'u5', email: 'fatimah.medan@gmail.com', fullName: 'Ummi Fatimah', plan: 'pro', childrenCount: 4, totalXp: 2100, joinedDate: '2026-04-12', status: 'active' }
];

export function getLevelName(xp: number): string {
  if (xp >= 1500) return 'Juara Indonesia!';
  if (xp >= 1000) return 'Pahlawan Belajar';
  if (xp >= 600) return 'Bintang Emas';
  if (xp >= 300) return 'Bintang Merah';
  if (xp >= 100) return 'Bintang Bersinar';
  return 'Bintang Kecil';
}

export function getNextLevelXP(xp: number): { current: number; max: number; level: string } {
  if (xp >= 1500) return { current: xp, max: 2000, level: 'Juara Indonesia!' };
  if (xp >= 1000) return { current: xp - 1000, max: 500, level: 'Pahlawan Belajar' };
  if (xp >= 600) return { current: xp - 600, max: 400, level: 'Bintang Emas' };
  if (xp >= 300) return { current: xp - 300, max: 300, level: 'Bintang Merah' };
  if (xp >= 100) return { current: xp - 100, max: 200, level: 'Bintang Bersinar' };
  return { current: xp, max: 100, level: 'Bintang Kecil' };
}

export function checkIsAdminEmail(email: string): boolean {
  const e = email.toLowerCase().trim();
  return e === 'adriansyaputra@gmail.com' || e === 'adrianayputra1231@gmail.com';
}

class AppState {
  children: ChildProfile[] = DEFAULT_CHILDREN;
  activeChildId: string = 'c1';
  parentSettings: ParentSettings = {
    parentPin: '1234',
    subscriptionPlan: 'annual', // VIP Tahunan Gratis
    notificationEnabled: true,
    email: 'adriansyaputra@gmail.com',
    fullName: 'Adriansyah Putra (Super Admin & Parent VIP)',
    role: 'admin',
    isLoggedIn: true
  };
  todayScreenTimeMinutes: Record<string, number> = { c1: 45, c2: 20 };
  systemUsers: SystemUser[] = MOCK_SYSTEM_USERS;
  listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rba_state_v4');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.children) this.children = parsed.children;
          if (parsed.activeChildId) this.activeChildId = parsed.activeChildId;
          if (parsed.parentSettings) this.parentSettings = parsed.parentSettings;
          if (parsed.todayScreenTimeMinutes) this.todayScreenTimeMinutes = parsed.todayScreenTimeMinutes;
          if (parsed.systemUsers) this.systemUsers = parsed.systemUsers;
        } catch {}
      }

      // Ensure adriansyaputra@gmail.com always gets Annual VIP Subscription
      if (checkIsAdminEmail(this.parentSettings.email)) {
        this.parentSettings.subscriptionPlan = 'annual';
      }
    }
  }

  save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rba_state_v4', JSON.stringify({
        children: this.children,
        activeChildId: this.activeChildId,
        parentSettings: this.parentSettings,
        todayScreenTimeMinutes: this.todayScreenTimeMinutes,
        systemUsers: this.systemUsers
      }));
    }
    this.notify();
  }

  subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  // Admin / Parent login check
  loginUser(email: string, name?: string): UserRole {
    const isAdmin = checkIsAdminEmail(email);
    const role: UserRole = isAdmin ? 'admin' : 'parent';

    this.parentSettings.email = email;
    this.parentSettings.fullName = name || (isAdmin ? 'Adriansyah Putra' : 'Orang Tua Pintar');
    this.parentSettings.role = role;
    this.parentSettings.isLoggedIn = true;

    // Automatic VIP Annual Plan for adriansyaputra@gmail.com without payment
    if (isAdmin) {
      this.parentSettings.subscriptionPlan = 'annual';
    }

    this.save();

    return role;
  }

  logout() {
    this.parentSettings.isLoggedIn = false;
    this.save();
  }

  getActiveChild(): ChildProfile {
    return this.children.find(c => c.id === this.activeChildId) || this.children[0];
  }

  setActiveChild(id: string) {
    this.activeChildId = id;
    this.save();
  }

  addChild(profile: Omit<ChildProfile, 'id' | 'xp' | 'level' | 'streak' | 'longestStreak' | 'lastActiveDate' | 'badges' | 'completedGamesCount' | 'gamesProgress' | 'unlockedThemes' | 'unlockedFrames'>) {
    const avatarImg = AVATAR_IMAGES[profile.avatarId] || AVATAR_IMAGES.bunny;
    const newChild: ChildProfile = {
      ...profile,
      avatarImg,
      id: 'c_' + Date.now(),
      xp: 0,
      level: 'Bintang Kecil',
      streak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      badges: ['first_10'],
      completedGamesCount: 0,
      gamesProgress: {},
      unlockedThemes: ['default'],
      unlockedFrames: ['default']
    };
    this.children.push(newChild);
    this.activeChildId = newChild.id;
    this.save();
  }

  updateChild(id: string, partial: Partial<ChildProfile>) {
    this.children = this.children.map(c => c.id === id ? { ...c, ...partial } : c);
    this.save();
  }

  addGameReward(childId: string, gameId: string, stars: number, xpGained: number) {
    const child = this.children.find(c => c.id === childId);
    if (!child) return;

    const newXp = child.xp + xpGained;
    const newLevel = getLevelName(newXp);
    const completedCount = child.completedGamesCount + 1;
    const updatedGames = { ...child.gamesProgress, [gameId]: Math.max(child.gamesProgress[gameId] || 0, stars) };

    const newBadges = [...child.badges];
    if (completedCount >= 10 && !newBadges.includes('first_10')) newBadges.push('first_10');
    if (completedCount >= 50 && !newBadges.includes('completed_50')) newBadges.push('completed_50');

    this.updateChild(childId, {
      xp: newXp,
      level: newLevel,
      completedGamesCount: completedCount,
      gamesProgress: updatedGames,
      badges: newBadges
    });
  }

  setParentPin(pin: string) {
    this.parentSettings.parentPin = pin;
    this.save();
  }

  resetChildProgress(childId: string) {
    this.updateChild(childId, {
      xp: 0,
      level: 'Bintang Kecil',
      streak: 1,
      completedGamesCount: 0,
      gamesProgress: {},
      badges: []
    });
  }

  toggleUserStatus(userId: string) {
    this.systemUsers = this.systemUsers.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
    );
    this.save();
  }

  updateUserPlan(userId: string, plan: 'free' | 'pro' | 'annual') {
    this.systemUsers = this.systemUsers.map(u => 
      u.id === userId ? { ...u, plan } : u
    );
    this.save();
  }
}

export const appState = new AppState();

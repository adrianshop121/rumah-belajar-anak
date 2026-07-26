'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appState } from '@/lib/store';
import { audio } from '@/lib/audio';

export default function LandingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Payment Checkout Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro_annual' | 'pro_monthly'>('pro_annual');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca_va' | 'gopay' | 'card'>('qris');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleFaq = (idx: number) => {
    audio.playTap();
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleOpenCheckout = (planType: 'pro_annual' | 'pro_monthly') => {
    audio.playTap();
    setSelectedPlan(planType);
    setShowCheckoutModal(true);
    setPaymentSuccess(false);
  };

  const handleCompletePayment = () => {
    audio.playCorrect();
    setPaymentSuccess(true);

    // Update global app state to Pro plan
    appState.parentSettings.subscriptionPlan = selectedPlan === 'pro_annual' ? 'annual' : 'pro';
    appState.save();

    setTimeout(() => {
      setShowCheckoutModal(false);
      router.push('/onboarding');
    }, 2000);
  };

  const handleGoToLogin = () => {
    audio.playTap();
    router.push('/auth/login');
  };

  const faqs = [
    { q: 'Apakah benar-benar tidak ada iklan?', a: 'SAMA SEKALI TIDAK ADA IKLAN. Rumah Belajar Anak.id didesain 100% aman untuk anak tanpa pop-up iklan, banner, atau link eksternal yang membahayakan.' },
    { q: 'Bagaimana AI membantu anak mengucapkan kata lebih jelas?', a: 'AI Tutor dilengkapi dengan engine Text-To-Speech khusus Bahasa Indonesia untuk anak-anak dengan pengucapan pelan, terstruktur per suku kata (contoh: "BU - KU &rarr; BUKU"), pitch hangat, dan nada ceria agar balita dan anak TK mudah meniru.' },
    { q: 'Apakah konten islaminya wajib diaktifkan atau opsional?', a: 'Konten islami (Hijaiyah, Doa Harian, Surat Hafalan) bersifat OPSIONAL (Default OFF). Orang tua bisa mengaktifkan atau mematikannya kapan saja melalui Parent Settings.' },
    { q: 'Apakah bisa dipakai untuk beberapa anak sekaligus?', a: 'Bisa! Satu akun orang tua dapat membuat hingga 5 profil anak terpisah dengan statistik progress, level, dan badge yang tidak tercampur.' },
    { q: 'Apakah konten sesuai dengan kurikulum sekolah Indonesia?', a: 'Ya, seluruh materi matematika, membaca, dan sains dirancang mengacu pada tahap perkembangan PAUD, TK, dan Kurikulum Merdeka SD.' },
    { q: 'Apakah bisa dimainkan tanpa internet?', a: 'Beberapa mini-game dan lagu favorit dapat diunduh untuk dimainkan dalam mode offline pada paket Pro & Tahunan.' },
    { q: 'Bagaimana cara memantau progress anak?', a: 'Orang tua dapat mengakses Parent Dashboard yang dilindungi PIN 4-digit untuk melihat grafik waktu belajar, topik yang dikuasai, dan laporan mingguan.' }
  ];

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden pb-32 min-h-screen selection:bg-secondary selection:text-on-secondary">
      {/* Ambient Shader */}
      <div className="mesh-bg" />

      {/* Header Shell */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0b1326]/60 backdrop-blur-xl border-b border-white/10 md:px-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClXBgwlwCsXcjI3VUv2kE6mXUeUH7aXm6T9_Y_oB3vwHuTWHC_BsKQtEjdjn5RiipOkTBn8LQXruXKj26ZRS0i7M2R8MgUyCCnVBENlCZy1P5xMlAYTyg2tJwdN6FyiONsFHUjRyleuaYNXYAXSnS63JAJ6Owq9LTsUtIPhZkCcXW6gFh1gVeqUFXxQmQHAw4TO0FjczjTvTEp7lzu9FhAU8MI0XkGim7F6JYsp9KfpRjoIQVOPiAo1w"
              alt="3D Pixar Child Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent font-heading">
            Rumah Belajar Anak.id
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center font-bold text-sm">
          <a href="#fitur" className="text-on-surface-variant hover:text-primary transition-colors">Fitur</a>
          <a href="#demo" className="text-on-surface-variant hover:text-primary transition-colors">Demo</a>
          <a href="#harga" className="text-secondary font-extrabold hover:text-primary transition-colors">Harga & Paket</a>
          <a href="#faq" className="text-on-surface-variant hover:text-primary transition-colors">FAQ</a>
          <button
            onClick={handleGoToLogin}
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-200 glow-secondary cursor-pointer"
          >
            Login Orang Tua 👨‍👩‍👧
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
              <span className="text-xs font-bold text-primary uppercase tracking-wider font-heading">Masa Depan Pendidikan</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black leading-tight text-white font-heading">
              Jadikan Belajar Sebagai <span className="text-secondary">Petualangan</span> Terhebat.
            </h1>

            <p className="text-lg text-on-surface-variant max-w-lg font-medium leading-relaxed">
              Platform edukasi masa depan untuk anak Indonesia usia 2-12 tahun. Bebas iklan, aman, dan mencerdaskan dengan kurikulum yang dipersonalisasi AI Suara Jelas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => router.push('/onboarding')}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-black text-lg glow-secondary hover:scale-105 transition-all duration-300 font-heading cursor-pointer"
              >
                Mulai Petualangan Gratis
              </button>
              <button
                onClick={handleGoToLogin}
                className="glass-card text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-white/20 text-center font-heading cursor-pointer"
              >
                Login Orang Tua 👨‍👩‍👧
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden ring-4 ring-background">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRBvk1VGTGX6XwSXFb0D0mgmFt2bAnb-sM4vgcCcwnkUjFS1-Ad3JW7eVUubPiBr9AWiyd3Ayapat8NKYLJ1zNwaRCyMRoVFQFQ75YnEH9N_dKpsu85_ykUfCU_rBuoWP7KzTaBM0XrguarIEFauXF4Aal6iioVWdrU9DQrdYl2Z8Q_7e_5EsfubLv3RIZBfSZm-k8BX3-1bQPyxxLwfwSmVGwL7RZxWf97D-JxHY5v50dgRmdzT-4FA" alt="Parent 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden ring-4 ring-background">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtu_N1Eec1u_ZP4LyQ7iHIYB3zKfwHZM4gnBemNZUhUweX08BQcSJny3NSUp5JeQz8lHvdscDcuLXTiyBT5CJbp-iNOusYsjT2_1s4LankxdEE-X45sqJNoyTCNntMTM8SijT18pDPpQABlpE_28OvYWyx9S2V1hTigg6tZun7XngBC7jYwP5XPrdHszap-mem9qjUpIabDoNSQM6uu3NDU3M4ZQCVliKYP06YXitDoGr0cbHu_UDQFg" alt="Parent 2" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-tertiary overflow-hidden ring-4 ring-background">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHsygrHjKCzJ-urCyOZ70q3UkVHK3kP0St_RjkUcScMZmdUTuKm3WaCkFi5teIZ2LvSPAH79O6_uZDypkwQUxAIGjTyXZmNHPzvEfIO7smbA1juFPa0LWUrn8FgDcecqK6P8Xd8ogQso4Ohn0_-7bXRirIgsBwMO_yAQ4cD_3Tsj8oplJlj098wkDSx9bgdGWD54d-Br68NZTs1v3zxQc6T8Cta4N2zApZ2fdxqNgYf3jpYboE8u25HQ" alt="Parent 3" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full bg-surface-container-high border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white ring-4 ring-background">
                  +50k
                </div>
              </div>
              <p className="text-sm font-semibold text-on-surface-variant">
                Bergabung dengan <span className="text-white font-bold">50.000+ Keluarga Pintar</span> di seluruh Indonesia.
              </p>
            </div>
          </div>

          {/* Hero Visual 3D Phone Mockup */}
          <div className="relative flex justify-center items-center">
            <div className="absolute -z-10 w-[140%] h-[140%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative w-full max-w-[320px] aspect-[9/19] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden animate-float border-white/10">
              <div className="w-full h-full bg-[#0b1326] flex flex-col overflow-hidden">
                <div className="p-3 bg-surface-container/50 flex justify-between items-center text-white">
                  <span className="text-[10px] font-bold">9:41</span>
                  <div className="flex gap-1">
                    <span className="material-symbols-outlined text-[10px]">wifi</span>
                    <span className="material-symbols-outlined text-[10px]">battery_full</span>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="h-8 w-1/2 bg-white/10 rounded-full" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square glass-card rounded-xl flex flex-col items-center justify-center p-2 gap-1 text-center">
                      <span className="material-symbols-outlined text-secondary text-2xl">rocket_launch</span>
                      <span className="text-[9px] font-bold text-white">Misi</span>
                    </div>
                    <div className="aspect-square glass-card rounded-xl flex flex-col items-center justify-center p-2 gap-1 text-center">
                      <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
                      <span className="text-[9px] font-bold text-white">Belajar</span>
                    </div>
                  </div>
                  <div className="h-32 w-full rounded-2xl overflow-hidden shadow-inner">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWKirJl3PLNud7yGWm77GzbzQYGnMq8hUsYQm6Z7Gt37OcO-RSoz4jlmpW_ug20ZWdkwKIEv7zWDTJM5PkDe_MZOkJaKBepJPyH0-LeYYI3pkNN9_i2IY3PCbsATFqRzsWGTV6JA-AeYO48H-mYG6hQ99rvDAlBsci72jdFB081V1OR28yCkt8QUGaXLyC7Q5P8cHJeo53lrefmLsQWFKgKGga7QKY6oRNGKYfqz85usI5axY1j5_lfw" alt="App Dashboard" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING & PAYMENT SECTION */}
        <section id="harga" className="container mx-auto px-6 md:px-16 mb-28 text-center scroll-mt-24">
          <div className="mb-10">
            <span className="bg-secondary/20 text-secondary border border-secondary/40 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider font-heading">
              PAKET & PEMBAYARAN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white mt-3 mb-3">
              Investasi Masa Depan Anak
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto text-sm font-medium">
              Pilih paket langganan terbaik untuk si kecil. Bisa dibayar via QRIS (GoPay, OVO, DANA), Transfer VA (BCA, Mandiri), atau Kartu Kredit.
            </p>

            {/* Toggle Monthly / Annual */}
            <div className="inline-flex items-center bg-surface-container-high p-1.5 rounded-full border border-white/10 mt-6 shadow-md">
              <button
                onClick={() => {
                  audio.playTap();
                  setIsAnnual(false);
                }}
                className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all ${!isAnnual ? 'bg-secondary text-on-secondary shadow-lg font-heading' : 'text-on-surface-variant'}`}
              >
                Bulanan (Rp 29.000/bln)
              </button>
              <button
                onClick={() => {
                  audio.playTap();
                  setIsAnnual(true);
                }}
                className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all ${isAnnual ? 'bg-secondary text-on-secondary shadow-lg font-heading' : 'text-on-surface-variant'}`}
              >
                Tahunan (Rp 249.000/thn) <span className="bg-tertiary text-on-tertiary-fixed px-2 py-0.5 rounded-full text-[10px] font-black ml-1">HEMAT 28%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan Card */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 text-left shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-3xl font-black font-heading text-white">Gratis</h3>
                  <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Basic</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6 font-medium">Untuk mencoba fitur utama platform</p>

                <div className="text-4xl font-black font-heading text-white mb-6">
                  Rp 0 <span className="text-xs font-normal text-on-surface-variant">/ selamanya</span>
                </div>

                <ul className="space-y-3.5 text-xs text-on-surface-variant font-medium mb-8">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> 2 Profil Anak
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> Mini-Game Angka, Huruf & Seni
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> AI Tutor Suara Jelas Basic
                  </li>
                </ul>
              </div>

              <button
                onClick={() => router.push('/onboarding')}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl text-base font-heading transition-all border border-white/10 cursor-pointer"
              >
                Coba Gratis Sekarang
              </button>
            </div>

            {/* Pro Plan Card */}
            <div className="glass-card p-8 rounded-[2.5rem] border-2 border-secondary text-left shadow-2xl glow-secondary relative overflow-hidden flex flex-col justify-between scale-105 bg-surface-container-low/90">
              <div className="absolute top-4 right-4 bg-secondary text-on-secondary font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                REKOMENDASI ORANG TUA
              </div>

              <div>
                <h3 className="text-3xl font-black font-heading text-white mb-2">Paket Pro</h3>
                <p className="text-xs text-on-surface-variant mb-6 font-medium">Untuk 5 anak sekaligus dalam 1 keluarga</p>

                <div className="text-4xl sm:text-5xl font-black font-heading text-secondary mb-6">
                  {isAnnual ? 'Rp 249.000' : 'Rp 29.000'} <span className="text-xs font-normal text-on-surface-variant">{isAnnual ? '/tahun' : '/bulan'}</span>
                </div>

                <ul className="space-y-3.5 text-xs text-white font-semibold mb-8">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> 5 Profil Anak Sekaligus
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> Semua 7 Kategori Unlocked (Termasuk Islami)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> AI Tutor Suara Pelan & Jelas Unlimited
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> WhatsApp Report Direct Sharing
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span> Mode Offline Download Game & Lagu
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenCheckout(isAnnual ? 'pro_annual' : 'pro_monthly')}
                className="w-full bg-secondary hover:bg-secondary-fixed text-on-secondary font-black py-4 rounded-2xl text-lg font-heading shadow-xl glow-secondary transition-all hover:scale-105 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Langganan Pro Sekarang 🚀</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="fitur" className="container mx-auto px-6 md:px-16 mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-2">Ekosistem Belajar Terbaik</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-sm">Dirancang oleh psikolog anak dan ahli teknologi untuk menciptakan lingkungan digital yang aman & inspiratif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-3xl group hover:border-secondary transition-all duration-500 overflow-hidden relative border border-white/10">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/40 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
              </div>
              <h3 className="text-xl font-black font-heading text-white mb-3">Kurikulum AI Suara Jelas</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-medium">Materi belajar yang menyesuaikan dengan kecepatan anak menggunakan AI Tutor berartikulasi pelan & jelas per suku kata.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl group hover:border-secondary transition-all duration-500 overflow-hidden relative border border-white/10">
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 border border-secondary/40 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-4xl">shield</span>
              </div>
              <h3 className="text-xl font-black font-heading text-white mb-3">100% Tanpa Iklan</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-medium">Bebas gangguan & konten tidak sesuai. Ruang digital yang murni fokus pada pertumbuhan kreativitas anak.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl group hover:border-secondary transition-all duration-500 overflow-hidden relative border border-white/10">
              <div className="w-16 h-16 bg-tertiary/20 rounded-2xl flex items-center justify-center mb-6 border border-tertiary/40 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary text-4xl">dashboard_customize</span>
              </div>
              <h3 className="text-xl font-black font-heading text-white mb-3">Dashboard Orang Tua</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-medium">Pantau progres harian, atur batasan screen time, dan bagikan laporan mingguan langsung ke WhatsApp.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container mx-auto px-6 md:px-16 mb-28 max-w-3xl">
          <h2 className="text-3xl font-black font-heading text-white text-center mb-8">Pertanyaan Sering Diajukan</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-white font-heading flex justify-between items-center text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined transition-transform ${openFaqIndex === idx ? 'rotate-180 text-secondary' : 'text-on-surface-variant'}`}>expand_more</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-on-surface-variant font-medium border-t border-white/10 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#060e20] py-12 border-t border-white/10 text-xs text-on-surface-variant">
        <div className="container mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 space-y-3">
            <span className="text-xl font-black bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent font-heading">
              Rumah Belajar Anak.id
            </span>
            <p className="max-w-sm font-medium">Membangun generasi cerdas Indonesia melalui teknologi edukasi yang manusiawi, aman, dan menyenangkan.</p>
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2 font-heading">Platform</h4>
            <ul className="space-y-1 font-medium">
              <li>AI Suara Jelas</li>
              <li>Game Edukasi 7 Kategori</li>
              <li>Dashboard Orang Tua</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2 font-heading">Keamanan</h4>
            <p className="font-medium leading-relaxed">100% Bebas Iklan · Tanpa Chat Luar · Data Terenkripsi.</p>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>© 2026 Rumah Belajar Anak.id. Seluruh hak cipta dilindungi.</p>
          <p>Made with 💚 for Indonesia</p>
        </div>
      </footer>

      {/* Interactive Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 max-w-lg w-full border border-white/20 text-left shadow-2xl relative animate-float">
            
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-white p-2 bg-white/10 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            {!paymentSuccess ? (
              <>
                <div className="mb-6">
                  <span className="bg-secondary/20 text-secondary border border-secondary/40 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-heading">
                    PEMBAYARAN RESMI
                  </span>
                  <h3 className="text-2xl font-black font-heading text-white mt-2">
                    Checkout Paket Pro 🎉
                  </h3>
                  <p className="text-xs text-on-surface-variant">Akses penuh 5 profil anak + AI Tutor Suara Jelas + Semua Kategori</p>
                </div>

                <div className="bg-surface-container/80 p-4 rounded-2xl border border-white/10 mb-6 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white font-heading">
                      {selectedPlan === 'pro_annual' ? 'Paket Pro (1 Tahun)' : 'Paket Pro (1 Bulan)'}
                    </div>
                    <div className="text-xs text-secondary font-bold">5 Profil Anak · Bebas Iklan</div>
                  </div>
                  <div className="text-xl font-black text-white font-heading">
                    {selectedPlan === 'pro_annual' ? 'Rp 249.000' : 'Rp 29.000'}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Pilih Metode Pembayaran
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('qris')}
                      className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'qris'
                          ? 'border-secondary bg-secondary/10 text-white font-bold glow-secondary'
                          : 'glass-panel border-white/10 text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-secondary">qr_code_2</span>
                      <span className="text-xs font-bold">QRIS / GoPay / OVO</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('bca_va')}
                      className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'bca_va'
                          ? 'border-secondary bg-secondary/10 text-white font-bold glow-secondary'
                          : 'glass-panel border-white/10 text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary">account_balance</span>
                      <span className="text-xs font-bold">BCA / Mandiri VA</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('gopay')}
                      className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'gopay'
                          ? 'border-secondary bg-secondary/10 text-white font-bold glow-secondary'
                          : 'glass-panel border-white/10 text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-tertiary">account_balance_wallet</span>
                      <span className="text-xs font-bold">DANA / ShopeePay</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-secondary bg-secondary/10 text-white font-bold glow-secondary'
                          : 'glass-panel border-white/10 text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-rose-400">credit_card</span>
                      <span className="text-xs font-bold">Kartu Kredit / Debit</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'qris' && (
                  <div className="bg-white p-4 rounded-2xl text-slate-900 text-center mb-6 border-2 border-secondary shadow-md">
                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Scan QRIS untuk Bayar</div>
                    <div className="w-36 h-36 bg-slate-900 mx-auto rounded-xl p-2 flex items-center justify-center text-white mb-2">
                      <span className="material-symbols-outlined text-6xl">qr_code_2</span>
                    </div>
                    <div className="text-xs text-slate-600 font-bold">Berlaku untuk GoPay, OVO, DANA, ShopeePay, & Semua Bank</div>
                  </div>
                )}

                <button
                  onClick={handleCompletePayment}
                  className="w-full bg-secondary hover:bg-secondary-fixed text-on-secondary font-black py-4 rounded-2xl text-lg font-heading shadow-xl glow-secondary transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Bayar {selectedPlan === 'pro_annual' ? 'Rp 249.000' : 'Rp 29.000'} Sekarang</span>
                  <span className="material-symbols-outlined">check_circle</span>
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-secondary glow-secondary">
                  <span className="material-symbols-outlined text-secondary text-5xl">check_circle</span>
                </div>
                <h3 className="text-3xl font-black font-heading text-white mb-2">Pembayaran Berhasil! 🎉</h3>
                <p className="text-sm text-on-surface-variant mb-6">Paket Pro telah aktif untuk keluarga Anda. Mengalihkan ke setup profil anak...</p>
                <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

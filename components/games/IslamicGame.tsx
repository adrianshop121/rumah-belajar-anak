'use client';

import React, { useState } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, Volume2, BookOpen, Repeat, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IslamicGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
}

export const IslamicGame: React.FC<IslamicGameProps> = ({ ageTier, onFinish }) => {
  const [tab, setTab] = useState<'hijaiyah' | 'doa' | 'surah'>('hijaiyah');

  const hijaiyahList = [
    { char: 'ا', name: 'Alif' },
    { char: 'ب', name: 'Ba' },
    { char: 'ت', name: 'Ta' },
    { char: 'ث', name: 'Tsa' },
    { char: 'ج', name: 'Jim' },
    { char: 'ح', name: 'Ha' },
    { char: 'خ', name: 'Kho' },
    { char: 'د', name: 'Dal' },
    { char: 'ذ', name: 'Dzal' },
    { char: 'ر', name: 'Ro' },
    { char: 'ز', name: 'Zai' },
    { char: 'س', name: 'Sin' }
  ];

  const doaList = [
    {
      title: 'Doa Sebelum Makan 🍽️',
      arab: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
      latin: 'Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa \'adzaaban naar',
      meaning: 'Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.'
    },
    {
      title: 'Doa Sebelum Belajar 📖',
      arab: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
      latin: 'Robbi zidnii \'ilman warzuqnii fahmaa',
      meaning: 'Ya Tuhanku, tambahkanlah kepadaku ilmu dan berikanlah aku pengertian yang baik.'
    },
    {
      title: 'Doa Untuk Kedua Orang Tua 👨‍👩‍👧',
      arab: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
      latin: 'Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa',
      meaning: 'Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan kasihilah mereka sebagaimana mereka merawatku sewaktu kecil.'
    },
    {
      title: 'Doa Masuk Rumah 🏡',
      arab: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      latin: 'Bismillahi walajnaa wa bismillahi kharajnaa wa \'alallahi rabbinaa tawakkalnaa',
      meaning: 'Dengan nama Allah kami masuk dan dengan nama Allah kami keluar dan kepada Allah Tuhan kami kami bertawakal.'
    }
  ];

  const surahList = [
    {
      title: 'Surat Al-Fatihah 🌟',
      verses: [
        { arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', meaning: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.' },
        { arab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', meaning: 'Segala puji bagi Allah, Tuhan semesta alam.' },
        { arab: 'الرَّحْمَٰنِ الرَّحِيمِ', meaning: 'Maha Pengasih lagi Maha Penyayang.' },
        { arab: 'مَالِكِ يَوْمِ الدِّينِ', meaning: 'Yang menguasai di Hari Pembalasan.' },
        { arab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', meaning: 'Hanya Engkaulah yang kami sembah, dan hanya kepada Engkaulah kami meminta pertolongan.' }
      ]
    },
    {
      title: 'Surat Al-Ikhlas ✨',
      verses: [
        { arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ', meaning: 'Katakanlah: Dialah Allah, Yang Maha Esa.' },
        { arab: 'اللَّهُ الصَّمَدُ', meaning: 'Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu.' },
        { arab: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', meaning: 'Dia tiada beranak dan tidak pula diperanakkan.' },
        { arab: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', meaning: 'Dan tidak ada seorang pun yang setara dengan Dia.' }
      ]
    },
    {
      title: 'Surat Al-Kautsar 💧',
      verses: [
        { arab: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', meaning: 'Sungguh, Kami telah memberimu telaga Kautsar.' },
        { arab: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', meaning: 'Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah.' },
        { arab: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', meaning: 'Sungguh, orang-orang yang membencimu dialah yang terputus.' }
      ]
    }
  ];

  const [selectedDoa, setSelectedDoa] = useState(doaList[0]);
  const [selectedSurah, setSelectedSurah] = useState(surahList[0]);

  const handlePlayHijaiyah = (name: string) => {
    audio.playTap();
    audio.speak(`Huruf Hijaiyah ${name}`);
  };

  const handlePlayDoa = (doa: typeof doaList[0]) => {
    audio.playTap();
    audio.speak(`${doa.title}. ${doa.latin}. Artina: ${doa.meaning}`);
  };

  const handleFinish = () => {
    audio.playCorrect();
    confetti({ particleCount: 80 });
    const activeChild = appState.getActiveChild();
    appState.addGameReward(activeChild.id, 'islamic-1', 3, 150);
    onFinish(3, 150);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-emerald-200 max-w-2xl mx-auto">
      <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-amber-500" /> Konten Edukasi Islami ☪️
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setTab('hijaiyah')}
          className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${tab === 'hijaiyah' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-slate-600 border'}`}
        >
          Huruf Hijaiyah
        </button>
        <button
          onClick={() => setTab('doa')}
          className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${tab === 'doa' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-slate-600 border'}`}
        >
          Doa Harian
        </button>
        <button
          onClick={() => setTab('surah')}
          className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${tab === 'surah' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-slate-600 border'}`}
        >
          Hafalan Surat
        </button>
      </div>

      {tab === 'hijaiyah' && (
        <div>
          <h3 className="text-center text-xl font-bold font-heading text-slate-800 mb-4">
            Ketuk Huruf Hijaiyah untuk Mendengarkan Audio Qari 🔊
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {hijaiyahList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handlePlayHijaiyah(item.name)}
                className="kid-button bg-white hover:bg-emerald-50 border-b-4 border-slate-200 p-6 rounded-3xl text-center shadow-md"
              >
                <div className="text-5xl font-black text-emerald-600 font-heading mb-1">{item.char}</div>
                <div className="text-sm font-bold text-slate-700">{item.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'doa' && (
        <div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 mb-6 text-center">
            <h3 className="text-2xl font-extrabold text-emerald-700 font-heading mb-4">{selectedDoa.title}</h3>
            <p className="text-3xl font-extrabold text-slate-800 mb-4 leading-relaxed font-sans">{selectedDoa.arab}</p>
            <p className="text-sm font-extrabold text-emerald-600 italic mb-2">{selectedDoa.latin}</p>
            <p className="text-sm text-slate-600 font-medium">{selectedDoa.meaning}</p>
          </div>
          <div className="flex justify-center gap-3">
            {doaList.map((d, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDoa(d);
                  handlePlayDoa(d);
                }}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-2xl font-bold text-sm"
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'surah' && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 mb-6 text-center">
          <h3 className="text-2xl font-extrabold text-emerald-700 font-heading mb-4">{selectedSurah.title}</h3>
          <div className="space-y-4 mb-4">
            {selectedSurah.verses.map((v, idx) => (
              <div key={idx} className="p-3 bg-emerald-50 rounded-2xl">
                <p className="text-2xl font-black text-slate-800 mb-1">{v.arab}</p>
                <p className="text-xs text-slate-600">{v.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleFinish}
          className="kid-button bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-4 rounded-2xl text-xl font-heading flex items-center justify-center gap-2 mx-auto"
        >
          Selesai Belajar Islami <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

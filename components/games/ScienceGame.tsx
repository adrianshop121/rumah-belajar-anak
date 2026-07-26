'use client';

import React, { useState } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScienceGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
}

export const ScienceGame: React.FC<ScienceGameProps> = ({ ageTier, onFinish }) => {
  const [questions] = useState([
    {
      prompt: 'Manakah hewan yang bersuara "Mbekkk"? 🐑',
      options: [
        { text: 'Kambing', icon: '🐑', sound: 'Mbekkk' },
        { text: 'Kucing', icon: '🐱', sound: 'Meoww' },
        { text: 'Ayam', icon: '🐔', sound: 'Kukuruyuk' },
        { text: 'Sapi', icon: '🐮', sound: 'Muuu' }
      ],
      correctIndex: 0
    },
    {
      prompt: 'Planet tempat kita tinggal bernama apa? 🌍',
      options: [
        { text: 'Matahari', icon: '☀️' },
        { text: 'Bumi', icon: '🌍' },
        { text: 'Bulan', icon: '🌙' },
        { text: 'Mars', icon: '🔴' }
      ],
      correctIndex: 1
    }
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    audio.playTap();
    if (idx === currentQ.correctIndex) {
      audio.playCorrect();
      if (currentIdx + 1 < questions.length) {
        setTimeout(() => setCurrentIdx(prev => prev + 1), 1000);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          confetti({ particleCount: 80 });
          const activeChild = appState.getActiveChild();
          appState.addGameReward(activeChild.id, 'sci-1', 3, 150);
        }, 1000);
      }
    } else {
      audio.playTryAgain();
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto border-4 border-orange-300">
        <div className="text-6xl mb-4 animate-bounce">🌍</div>
        <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-2">Penjelajah Hebat! 🚀</h2>
        <p className="text-slate-600 mb-6">Kamu telah mengenal sains & alam!</p>
        <button
          onClick={() => onFinish(3, 150)}
          className="kid-button w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-4 px-6 rounded-2xl text-xl font-heading flex items-center justify-center gap-2"
        >
          Lanjut Belajar <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-orange-200 max-w-2xl mx-auto">
      <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-amber-500" /> Sains & Pengetahuan Umum
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-orange-100 text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-heading">
          {currentQ.prompt}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentQ.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className="kid-button bg-white hover:bg-orange-50 text-slate-800 border-b-4 border-slate-200 p-6 rounded-3xl text-center font-heading font-extrabold flex flex-col items-center gap-2"
          >
            <span className="text-5xl">{opt.icon}</span>
            <span className="text-xl">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

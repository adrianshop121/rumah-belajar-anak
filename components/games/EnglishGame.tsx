'use client';

import React, { useState } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, CheckCircle2, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnglishGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
}

export const EnglishGame: React.FC<EnglishGameProps> = ({ ageTier, onFinish }) => {
  const [cards] = useState([
    { word: 'Cat', translation: 'Kucing', icon: '🐱', audioText: 'Cat! Meow!' },
    { word: 'Apple', translation: 'Apel', icon: '🍎', audioText: 'Apple! A red apple!' },
    { word: 'Sun', translation: 'Matahari', icon: '☀️', audioText: 'Sun! Bright sun!' }
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const card = cards[currentIdx];

  const handleCardClick = () => {
    audio.playTap();
    audio.speak(card.audioText, 0.9);
  };

  const handleNext = () => {
    audio.playCorrect();
    if (currentIdx + 1 < cards.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 80 });
      const activeChild = appState.getActiveChild();
      appState.addGameReward(activeChild.id, 'eng-1', 3, 150);
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto border-4 border-rose-300">
        <div className="text-6xl mb-4 animate-bounce">🗣️</div>
        <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-2">Awesome! Great Job! 🎉</h2>
        <p className="text-slate-600 mb-6">Kamu sudah belajar kata-kata Bahasa Inggris baru!</p>

        <button
          onClick={() => onFinish(3, 150)}
          className="kid-button w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-2xl text-xl font-heading flex items-center justify-center gap-2"
        >
          Lanjut Belajar <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-rose-200 max-w-2xl mx-auto text-center">
      <div className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-amber-500" /> English Vocab & Sounds
      </div>

      <div
        onClick={handleCardClick}
        className="kid-card bg-white p-8 rounded-3xl border-4 border-rose-100 shadow-lg cursor-pointer mb-6 transform hover:scale-105 transition-transform"
      >
        <div className="text-8xl mb-4 animate-bounce-subtle">{card.icon}</div>
        <h3 className="text-4xl font-black text-slate-800 font-heading tracking-wide mb-1">
          {card.word}
        </h3>
        <p className="text-lg text-rose-500 font-bold mb-3">{card.translation}</p>
        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-1.5 rounded-full text-sm font-extrabold">
          <Volume2 className="w-4 h-4" /> Tap untuk mendengar pengucapan
        </div>
      </div>

      <button
        onClick={handleNext}
        className="kid-button bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-8 py-4 rounded-2xl text-xl font-heading"
      >
        Kata Berikutnya →
      </button>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { AgeTier } from '@/lib/store';
import { MathGame } from './MathGame';
import { ReadingGame } from './ReadingGame';
import { ScienceGame } from './ScienceGame';
import { ArtGame } from './ArtGame';
import { EnglishGame } from './EnglishGame';
import { MusicGame } from './MusicGame';
import { IslamicGame } from './IslamicGame';
import { AITutor } from '../mascot/AITutor';
import { ArrowLeft } from 'lucide-react';

interface GameWrapperProps {
  categoryId: string; // 'math' | 'reading' | 'science' | 'art' | 'english' | 'music' | 'islamic'
  ageTier: AgeTier;
  avatarId: string;
  onBack: () => void;
  onGameComplete: (stars: number, xp: number) => void;
}

export const GameWrapper: React.FC<GameWrapperProps> = ({
  categoryId,
  ageTier,
  avatarId,
  onBack,
  onGameComplete
}) => {
  const [tutorMessage, setTutorMessage] = useState<string>('Semangat ya! Tap opsi jawaban yang menurutmu benar! 🌟');

  const handleWrongAttempt = async (wrongCount: number, topic: string) => {
    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, wrongCount, ageTier, mascotName: avatarId })
      });
      const data = await res.json();
      if (data?.hint) {
        setTutorMessage(data.hint);
      }
    } catch {
      setTutorMessage('Yuk dicoba lagi pelan-pelan! Kamu pasti bisa! 🌟');
    }
  };

  const renderGame = () => {
    switch (categoryId) {
      case 'math':
        return <MathGame ageTier={ageTier} onFinish={onGameComplete} onWrongAttempt={handleWrongAttempt} />;
      case 'reading':
        return <ReadingGame ageTier={ageTier} onFinish={onGameComplete} />;
      case 'science':
        return <ScienceGame ageTier={ageTier} onFinish={onGameComplete} />;
      case 'art':
        return <ArtGame ageTier={ageTier} onFinish={onGameComplete} />;
      case 'english':
        return <EnglishGame ageTier={ageTier} onFinish={onGameComplete} />;
      case 'music':
        return <MusicGame ageTier={ageTier} onFinish={onGameComplete} />;
      case 'islamic':
        return <IslamicGame ageTier={ageTier} onFinish={onGameComplete} />;
      default:
        return <MathGame ageTier={ageTier} onFinish={onGameComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] p-4 sm:p-6 pb-28">
      {/* Top bar back button */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-white hover:bg-slate-100 text-slate-700 font-extrabold px-4 py-2 rounded-2xl shadow-md flex items-center gap-2 border-2 border-slate-200"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>
      </div>

      {/* Main Game Container */}
      <div className="max-w-4xl mx-auto">
        {renderGame()}
      </div>

      {/* Persistent AI Tutor Mascot */}
      <AITutor avatarId={avatarId} message={tutorMessage} />
    </div>
  );
};

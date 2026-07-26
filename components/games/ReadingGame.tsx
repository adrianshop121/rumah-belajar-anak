'use client';

import React, { useState, useEffect, useRef } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, CheckCircle2, Volume2, RotateCcw, Turtle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
}

export const ReadingGame: React.FC<ReadingGameProps> = ({ ageTier, onFinish }) => {
  const [mode, setMode] = useState<'letter' | 'syllable' | 'word'>('letter');
  const [currentLetter, setCurrentLetter] = useState('A');
  const [wordTarget] = useState({ word: 'BUKU', image: '📚', syllables: ['BU', 'KU'], slots: ['B', 'U', 'K', 'U'] });
  const [draggedLetters, setDraggedLetters] = useState<string[]>(['', '', '', '']);
  const [letterPool] = useState<string[]>(['B', 'K', 'U', 'A', 'U']);
  const [isFinished, setIsFinished] = useState(false);
  const [speakingWord, setSpeakingWord] = useState(false);

  // Canvas Tracing State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (ageTier === 'balita') {
      setMode('letter');
    } else if (ageTier === 'tk') {
      setMode('syllable');
    } else {
      setMode('word');
    }
  }, [ageTier]);

  useEffect(() => {
    if (mode === 'letter') {
      audio.speak(`Huruf ${currentLetter}. A... Apel!`);
    } else if (mode === 'syllable') {
      audio.speakSyllables(wordTarget.word, wordTarget.syllables);
    }
  }, [mode, currentLetter]);

  // Letter Tracing Canvas Logic
  useEffect(() => {
    if (mode === 'letter' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 160px Fredoka, sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentLetter, canvas.width / 2, canvas.height / 2);
      }
    }
  }, [mode, currentLetter]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#4A90E2';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.font = 'bold 160px Fredoka, sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentLetter, canvasRef.current.width / 2, canvasRef.current.height / 2);
      }
    }
  };

  const handlePronounceSlowly = () => {
    setSpeakingWord(true);
    audio.speakSyllables(wordTarget.word, wordTarget.syllables);
    setTimeout(() => setSpeakingWord(false), 2500);
  };

  const handleLetterTap = (letter: string) => {
    audio.playTap();
    audio.speak(`Huruf ${letter}`, 0.8);
    const nextEmpty = draggedLetters.findIndex(l => l === '');
    if (nextEmpty !== -1) {
      const updated = [...draggedLetters];
      updated[nextEmpty] = letter;
      setDraggedLetters(updated);

      if (updated.join('') === wordTarget.slots.join('')) {
        audio.playCorrect();
        audio.speak(`Buka B U K U... BUKU! Pintar sekali!`);
        confetti({ particleCount: 80, spread: 60 });
        setTimeout(() => {
          setIsFinished(true);
          const activeChild = appState.getActiveChild();
          appState.addGameReward(activeChild.id, 'read-1', 3, 150);
        }, 1500);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto border-4 border-emerald-300">
        <div className="text-6xl mb-4 animate-bounce">📖</div>
        <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-2">Pintar Sekali! 🎉</h2>
        <p className="text-slate-600 mb-6">Kamu sudah berhasil membaca kata BUKU dengan sangat jelas!</p>

        <button
          onClick={() => onFinish(3, 150)}
          className="kid-button w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-4 px-6 rounded-2xl text-xl font-heading flex items-center justify-center gap-2"
        >
          Lanjut Belajar <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-emerald-200 max-w-2xl mx-auto">
      {/* Header Mode Switcher */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Huruf & Membaca
        </div>

        {/* Pronounce Word Syllables Button */}
        <button
          onClick={handlePronounceSlowly}
          className="kid-button bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow"
        >
          <Volume2 className="w-4 h-4" /> Dengar Suku Kata Jelas 🔊
        </button>
      </div>

      {mode === 'letter' ? (
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-slate-800 font-heading mb-2">
            Tebalkan Huruf {currentLetter}! ✏️
          </h3>
          <p className="text-sm text-slate-500 mb-4">Gunakan jarimu untuk mengikuti bentuk huruf</p>

          <div className="relative inline-block bg-white rounded-3xl p-4 shadow-inner border-4 border-emerald-100 mb-4">
            <canvas
              ref={canvasRef}
              width={260}
              height={260}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="cursor-crosshair touch-none"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={clearCanvas}
              className="kid-button bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-3 rounded-2xl flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi
            </button>
            <button
              onClick={() => {
                audio.playCorrect();
                setIsFinished(true);
              }}
              className="kid-button bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-2xl font-heading"
            >
              Selesai! ✨
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce-subtle">{wordTarget.image}</div>
          
          {/* Syllable Breakdown Prominent Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-2xl mb-4 font-black font-heading text-lg">
            <span>BU</span>
            <span>—</span>
            <span>KU</span>
          </div>

          {/* Slots */}
          <div className="flex justify-center gap-3 mb-8">
            {wordTarget.slots.map((target, idx) => (
              <div
                key={idx}
                className="w-16 h-20 bg-white border-4 border-dashed border-emerald-400 rounded-2xl flex items-center justify-center text-3xl font-black font-heading text-emerald-600 shadow-md"
              >
                {draggedLetters[idx] || ''}
              </div>
            ))}
          </div>

          {/* Available Letter Pool */}
          <div className="flex justify-center gap-3">
            {letterPool.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleLetterTap(letter)}
                className="kid-button bg-emerald-500 hover:bg-emerald-600 text-white font-black text-3xl w-16 h-16 rounded-2xl font-heading shadow-lg"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

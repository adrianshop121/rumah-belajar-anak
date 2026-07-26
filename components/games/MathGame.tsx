'use client';

import React, { useState, useEffect } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
  onWrongAttempt?: (count: number, topic: string) => void;
}

interface Question {
  id: number;
  prompt: string;
  visualItems?: string[];
  options: (number | string)[];
  correctAnswer: number | string;
  hint: string;
}

export const MathGame: React.FC<MathGameProps> = ({ ageTier, onFinish, onWrongAttempt }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stars, setStars] = useState(3);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    // Generate age-adapted questions with rich interactive content
    if (ageTier === 'balita') {
      setQuestions([
        { id: 1, prompt: 'Ketuk angka 3!', visualItems: ['🍎', '🍎', '🍎'], options: [1, 3, 5, 2], correctAnswer: 3, hint: 'Hitung jumlah apelnya: 1, 2, 3!' },
        { id: 2, prompt: 'Berapa jumlah bintang ini?', visualItems: ['⭐', '⭐'], options: [4, 2, 1, 3], correctAnswer: 2, hint: 'Ada dua bintang bersinar!' },
        { id: 3, prompt: 'Hitung jumlah mobil merah!', visualItems: ['🚗', '🚗', '🚗', '🚗'], options: [3, 2, 4, 5], correctAnswer: 4, hint: 'Hitung mobil warna merah: 1..2..3..4!' },
        { id: 4, prompt: 'Pilih kelompok dengan 5 es krim!', visualItems: ['🍦', '🍦', '🍦', '🍦', '🍦'], options: [3, 5, 6, 2], correctAnswer: 5, hint: 'Hitung es krim lezat ini dari 1 sampai 5!' },
        { id: 5, prompt: 'Berapakah 1 ditambah 1?', visualItems: ['🐥', '➕', '🐥'], options: [1, 2, 3, 4], correctAnswer: 2, hint: 'Satu anak ayam ditambah satu anak ayam jadi dua!' }
      ]);
    } else if (ageTier === 'tk') {
      setQuestions([
        { id: 1, prompt: 'Hitung penjumlahan: 2 + 3 = ?', visualItems: ['🐱', '🐱', '➕', '🐱', '🐱', '🐱'], options: [4, 5, 6, 3], correctAnswer: 5, hint: '2 kucing ditambah 3 kucing sama dengan 5!' },
        { id: 2, prompt: 'Manakah yang LEBIH BESAR?', options: ['3', '8', '2', '5'], correctAnswer: '8', hint: 'Angka 8 adalah yang paling besar!' },
        { id: 3, prompt: 'Hitung pengurangan: 5 - 2 = ?', visualItems: ['🎈', '🎈', '🎈', '🎈', '🎈'], options: [2, 3, 4, 1], correctAnswer: 3, hint: '5 balon terbang 2, sisa 3 balon!' },
        { id: 4, prompt: 'Manakah yang LEBIH KECIL?', options: ['9', '4', '7', '6'], correctAnswer: '4', hint: 'Angka 4 adalah yang paling kecil!' },
        { id: 5, prompt: 'Hitung penjumlahan: 4 + 4 = ?', visualItems: ['🎁', '🎁', '🎁', '🎁', '➕', '🎁', '🎁', '🎁', '🎁'], options: [6, 7, 8, 9], correctAnswer: 8, hint: '4 kado ditambah 4 kado sama dengan 8!' }
      ]);
    } else if (ageTier === 'sd_low') {
      setQuestions([
        { id: 1, prompt: 'Berapakah 15 + 27 = ?', options: [38, 42, 40, 32], correctAnswer: 42, hint: '5 + 7 = 12, simpan 1 di puluhan!' },
        { id: 2, prompt: 'Hitung perkalian 3 x 4 = ?', options: [12, 16, 9, 15], correctAnswer: 12, hint: '3 ditambahkan sebanyak 4 kali: 3 + 3 + 3 + 3 = 12' },
        { id: 3, prompt: 'Budi punya 12 permen, dimakan 4 permen. Sisa berapa?', options: [6, 8, 10, 7], correctAnswer: 8, hint: '12 dikurangi 4 sama dengan 8 permen!' },
        { id: 4, prompt: 'Hitung pembagian 20 : 5 = ?', options: [3, 4, 5, 6], correctAnswer: 4, hint: '20 dibagi 5 kelompok sama dengan 4 per kelompok!' },
        { id: 5, prompt: 'Siti membeli 3 kotak pensil, tiap kotak isi 6. Total pensil?', options: [12, 15, 18, 24], correctAnswer: 18, hint: '3 dikali 6 sama dengan 18 pensil!' }
      ]);
    } else {
      setQuestions([
        { id: 1, prompt: 'Manakah nilai pecahan 1/2 yang setara?', options: ['2/4', '3/5', '1/3', '4/6'], correctAnswer: '2/4', hint: 'Sederhanakan 2/4 dengan membagi 2!' },
        { id: 2, prompt: 'Hitung pembagian 72 : 8 = ?', options: [7, 8, 9, 6], correctAnswer: 9, hint: '8 dikali berapa yang hasilnya 72? Jawabannya 9!' },
        { id: 3, prompt: 'Berapa keliling persegi dengan sisi 6 cm?', options: [12, 24, 36, 18], correctAnswer: 24, hint: 'Keliling = 4 x sisi = 4 x 6 = 24 cm!' },
        { id: 4, prompt: 'Berapakah luas persegi panjang P=8 cm, L=5 cm?', options: [40, 26, 35, 48], correctAnswer: 40, hint: 'Luas = Panjang x Lebar = 8 x 5 = 40 cm²!' },
        { id: 5, prompt: 'Ubah pecahan 3/4 ke bentuk persen (%)!', options: ['50%', '60%', '75%', '80%'], correctAnswer: '75%', hint: '3/4 dikali 100% sama dengan 75%!' }
      ]);
    }
  }, [ageTier]);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ) {
      audio.speak(currentQ.prompt);
    }
  }, [currentIndex, questions]);

  const handleSelectOption = (opt: number | string) => {
    setSelectedOption(opt);
    audio.playTap();

    if (opt === currentQ.correctAnswer) {
      audio.playCorrect();
      setConsecutiveCorrect(prev => prev + 1);
      setTotalScore(prev => prev + 100);
      setShowHint(false);

      if (currentIndex + 1 < questions.length) {
        setTimeout(() => {
          setSelectedOption(null);
          setCurrentIndex(prev => prev + 1);
          setWrongCount(0);
        }, 1200);
      } else {
        // Finished All Questions
        setTimeout(() => {
          setIsFinished(true);
          const earnedStars = wrongCount === 0 ? 3 : wrongCount <= 2 ? 2 : 1;
          setStars(earnedStars);
          audio.playStar();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          const activeChild = appState.getActiveChild();
          appState.addGameReward(activeChild.id, 'math-1', earnedStars, 150);
        }, 1000);
      }
    } else {
      // Wrong Attempt (No punishment!)
      audio.playTryAgain();
      const newWrong = wrongCount + 1;
      setWrongCount(newWrong);
      setStars(prev => Math.max(1, prev - 1));

      if (newWrong >= 2) {
        setShowHint(true);
      }
      if (newWrong >= 3 && onWrongAttempt) {
        onWrongAttempt(newWrong, 'Angka & Matematika');
      }

      setTimeout(() => setSelectedOption(null), 1000);
    }
  };

  if (!currentQ && !isFinished) return <div className="p-8 text-center">Loading game...</div>;

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto border-4 border-amber-300">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-2">Hebat Sekali! 🎉</h2>
        <p className="text-slate-600 mb-4">Kamu berhasil menyelesaikan game Matematika!</p>
        
        {/* Star Rating */}
        <div className="flex justify-center gap-3 text-4xl mb-6">
          <span className={stars >= 1 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}>⭐</span>
          <span className={stars >= 2 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}>⭐</span>
          <span className={stars >= 3 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}>⭐</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl mb-6 flex justify-around">
          <div>
            <div className="text-xs text-amber-700 font-bold uppercase">Total XP</div>
            <div className="text-2xl font-black text-amber-600 font-heading">+150 XP</div>
          </div>
          <div>
            <div className="text-xs text-amber-700 font-bold uppercase">Skor</div>
            <div className="text-2xl font-black text-amber-600 font-heading">{totalScore}</div>
          </div>
        </div>

        <button
          onClick={() => onFinish(stars, 150)}
          className="kid-button w-full bg-blue-500 hover:bg-blue-600 text-white font-extrabold py-4 px-6 rounded-2xl text-xl font-heading flex items-center justify-center gap-2"
        >
          Lanjut Belajar <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-blue-200 max-w-2xl mx-auto">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Soal {currentIndex + 1} dari {questions.length}
        </div>
        <div className="flex gap-1 text-xl">
          {'⭐'.repeat(stars)}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-blue-100 text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-heading mb-4">
          {currentQ.prompt}
        </h3>

        {/* Visual Count Items */}
        {currentQ.visualItems && (
          <div className="flex flex-wrap justify-center gap-3 text-4xl sm:text-5xl my-4 py-2 bg-amber-50 rounded-2xl">
            {currentQ.visualItems.map((item, idx) => (
              <span key={idx} className="animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hint Alert */}
      {showHint && (
        <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 p-4 rounded-2xl mb-6 text-sm font-bold flex items-center gap-3 animate-pulse">
          <span className="text-2xl">💡</span>
          <div>
            <div className="font-extrabold">Petunjuk Mascot:</div>
            <div>{currentQ.hint}</div>
          </div>
        </div>
      )}

      {/* Options Grid (Age-adapted size) */}
      <div className={`grid grid-cols-2 gap-4 ${ageTier === 'balita' ? 'min-h-[220px]' : ''}`}>
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === currentQ.correctAnswer;

          let btnStyle = 'bg-white hover:bg-blue-50 text-slate-800 border-b-4 border-slate-200';
          if (isSelected) {
            btnStyle = isCorrect ? 'bg-emerald-500 text-white border-b-4 border-emerald-700 animate-bounce' : 'bg-rose-400 text-white border-b-4 border-rose-600';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={selectedOption !== null}
              className={`kid-button ${btnStyle} p-6 sm:p-8 rounded-3xl text-3xl sm:text-4xl font-extrabold font-heading shadow-md transition-all flex items-center justify-center`}
              style={{ minHeight: ageTier === 'balita' ? '90px' : '75px' }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

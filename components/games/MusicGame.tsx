'use client';

import React, { useState } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, Music, Play, Pause, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MusicGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
}

export const MusicGame: React.FC<MusicGameProps> = ({ ageTier, onFinish }) => {
  const [songs] = useState([
    {
      title: 'Balonku Ada Lima 🎈',
      type: 'Lagu Anak Klasik',
      lyrics: [
        'Balonku ada lima...',
        'Rupa-rupa warnanya...',
        'Hijau, kuning, kelabu...',
        'Merah muda dan biru...',
        'Meletus balon hijau... DOR! 💥',
        'Hatiku sangat kacau...',
        'Balonku tinggal empat...',
        'Kupegang erat-erat! 🎈'
      ]
    },
    {
      title: 'Naik-Naik ke Puncak Gunung ⛰️',
      type: 'Lagu Nasional Anak',
      lyrics: [
        'Naik-naik ke puncak gunung...',
        'Tinggi-tinggi sekali...',
        'Kiri kanan kulihat saja...',
        'Banyak pohon cemara... 🌲'
      ]
    }
  ]);

  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  const togglePlay = () => {
    audio.playTap();
    if (!isPlaying) {
      setIsPlaying(true);
      setActiveLine(0);

      // Play Karaoke voice line by line
      let current = 0;
      const interval = setInterval(() => {
        if (current < selectedSong.lyrics.length) {
          setActiveLine(current);
          audio.speak(selectedSong.lyrics[current], 0.85);
          current++;
        } else {
          clearInterval(interval);
          setIsPlaying(false);
          confetti({ particleCount: 80 });
          const activeChild = appState.getActiveChild();
          appState.addGameReward(activeChild.id, 'music-1', 3, 150);
        }
      }, 3200);
    } else {
      setIsPlaying(false);
      window.speechSynthesis?.cancel();
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-amber-200 max-w-2xl mx-auto text-center">
      <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-amber-500" /> Lagu & Musik Karaoke Mode 🎤
      </div>

      {/* Song selector tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {songs.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedSong(s);
              setIsPlaying(false);
              window.speechSynthesis?.cancel();
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${selectedSong.title === s.title ? 'bg-amber-400 text-slate-900 shadow-md scale-105' : 'bg-white text-slate-600 border'}`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Karaoke Display Screen */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border-4 border-amber-300 mb-6 relative overflow-hidden">
        <div className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">
          {selectedSong.type}
        </div>
        <h3 className="text-3xl font-extrabold font-heading text-amber-300 mb-6">
          {selectedSong.title}
        </h3>

        {/* Sync Lyrics Display */}
        <div className="min-h-[140px] flex flex-col justify-center gap-3">
          {selectedSong.lyrics.map((line, idx) => (
            <p
              key={idx}
              className={`text-xl sm:text-2xl font-bold font-heading transition-all duration-300 ${activeLine === idx && isPlaying ? 'text-amber-300 scale-110 drop-shadow-md' : 'text-slate-500 opacity-60'}`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={togglePlay}
          className={`kid-button px-8 py-4 rounded-2xl text-xl font-extrabold font-heading text-white flex items-center gap-3 ${isPlaying ? 'bg-rose-500 hover:bg-rose-600' : 'bg-amber-500 hover:bg-amber-600'}`}
        >
          {isPlaying ? <><Pause className="w-6 h-6" /> Hentikan Karaoke</> : <><Play className="w-6 h-6" /> Mulai Karaoke Mode 🎤</>}
        </button>

        <button
          onClick={() => onFinish(3, 150)}
          className="kid-button bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-4 rounded-2xl font-heading flex items-center gap-2"
        >
          Selesai <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

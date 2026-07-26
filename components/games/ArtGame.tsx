'use client';

import React, { useState, useRef } from 'react';
import { audio } from '@/lib/audio';
import { appState, AgeTier } from '@/lib/store';
import { Sparkles, Palette, Download, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArtGameProps {
  ageTier: AgeTier;
  onFinish: (stars: number, xp: number) => void;
}

const PALETTE = ['#FF6B6B', '#4A90E2', '#FFD93D', '#6BCB77', '#A855F7', '#FF9A3C', '#E2E8F0', '#000000'];

export const ArtGame: React.FC<ArtGameProps> = ({ ageTier, onFinish }) => {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [isFinished, setIsFinished] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleColorPick = (color: string) => {
    audio.playTap();
    setSelectedColor(color);
  };

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

    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const handleFinish = () => {
    audio.playCorrect();
    confetti({ particleCount: 100 });
    setIsFinished(true);
    const activeChild = appState.getActiveChild();
    appState.addGameReward(activeChild.id, 'art-1', 3, 150);
  };

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto border-4 border-purple-300">
        <div className="text-6xl mb-4 animate-bounce">🎨</div>
        <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-2">Karya Indah Cilik! ✨</h2>
        <p className="text-slate-600 mb-6">Karyamu berhasil disimpan untuk ditunjukkan ke Orang Tua!</p>

        <button
          onClick={() => onFinish(3, 150)}
          className="kid-button w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-4 px-6 rounded-2xl text-xl font-heading flex items-center justify-center gap-2"
        >
          Lanjut Belajar <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-purple-200 max-w-2xl mx-auto">
      <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-500" /> Kreativitas & Melukis Bebas
      </div>

      <div className="text-center mb-4">
        <h3 className="text-2xl font-extrabold text-slate-800 font-heading">
          Kanvas Mewarnai Digital 🎨
        </h3>
      </div>

      {/* Palette selector */}
      <div className="flex justify-center flex-wrap gap-2 mb-4 bg-white p-3 rounded-2xl shadow-sm border">
        {PALETTE.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleColorPick(color)}
            className={`w-10 h-10 rounded-full transition-transform border-2 ${selectedColor === color ? 'scale-125 border-slate-900 shadow-md' : 'border-white'}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Canvas */}
      <div className="text-center mb-4">
        <div className="relative inline-block bg-white rounded-3xl p-2 shadow-inner border-4 border-purple-100">
          <canvas
            ref={canvasRef}
            width={320}
            height={260}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="cursor-crosshair touch-none rounded-2xl bg-white"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={clearCanvas}
          className="kid-button bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-3 rounded-2xl flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Bersihkan
        </button>
        <button
          onClick={handleFinish}
          className="kid-button bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-6 py-3 rounded-2xl font-heading flex items-center gap-2"
        >
          Simpan Karya <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

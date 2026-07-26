'use client';

import React, { useState, useEffect } from 'react';
import { audio } from '@/lib/audio';

interface AITutorProps {
  avatarId?: string; // 'bunny' | 'bear' | 'cat' | 'panda'
  message?: string;
  onTap?: () => void;
  floating?: boolean;
}

export const AITutor: React.FC<AITutorProps> = ({
  avatarId = 'bunny',
  message,
  onTap,
  floating = true
}) => {
  const [speechText, setSpeechText] = useState(message || 'Ayo kita berpetualang lagi! ✨');
  const [isTalking, setIsTalking] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(audio.getIsSlowSpeech());

  useEffect(() => {
    if (message) {
      setSpeechText(message);
    }
  }, [message]);

  const handleMascotClick = () => {
    audio.playTap();
    setIsTalking(true);
    audio.speak(speechText, undefined, () => setIsTalking(false));
    if (onTap) onTap();
  };

  const toggleSlowMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isSlowMode;
    setIsSlowMode(next);
    audio.setSlowSpeech(next);
    audio.playTap();
    audio.speak(next ? 'Mode Suara Pelan dan Jelas diaktifkan.' : 'Mode Suara Normal diaktifkan.');
  };

  const getMascotImg = () => {
    switch (avatarId) {
      case 'bear':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3waBsDLJEiMUBc8r3SdZlQ_b6mfgVNvETWAKd4s6NDRWCBCSDhG4mgc1_DLkNZ_FXNV7QcTPaUaaOHfv8RZMGpKYdNOZdyiqoMNDolARoROd9E6_jWH3qFjAdZ4-oyu0rxdOFyYelc4XSmH3eSQRpISG7xrkk9NmCCDC5BPmx7Ebpxzo0kiTzK4Vu1SInQGoVIrX2IQWSZZqVj2mf4y9tjdxuLWa--beUfRdycoNrLcG_DQJneGaIkw';
      case 'cat':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1QK09Gh1S81lJFw6YFQXU3AZGP7j2zxLwnzqoqmIM2IlHbTfyp3HKbZwsNIuZ4Ni2LXsKJR-o8XeJv9QwziG8DfwTx3MCK3NzOst3rdMmQUe-h5bfnBo4xgKeDAVSlzKpwiwG9QoQO1gNYrA-HIjwPMNsGF_BcULz3mtJ3RLTbZOw6iMJ0qJRZ9MPQlGSJ90g-d9b3lIhbwh-GfcGK0FEkmyuLy8r8Z_iHmArYJxfB_-pGEUpEWcAA';
      case 'panda':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIwyYS72VeE3q5CUnRE3l4ewnPvvwAwtxkW4JhUDLZzZwNygUrHa2IKBK8oeEfC1YMpKeA0unJbUY8DnAshC63Jzs-c8XlDdPf293iGIx48PjQgkdYO1R81clWuMfV87_LzsHLYH6F6RQEbLfFxb0GB4IRQBXWKhZpOPFkDKf9fhz_0Yt0b28FRQ3nv8ZUfqGbDmEQm3jjrqVJVdCsaQgKSETnSpA2qxs0Gk84-VV32ivBxBxuJa9K2g';
      case 'bunny':
      default:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2tnhKaSGLbk8GRZZonL9zvtgjqHxReenhXqDyW4EYq7Ouoqtw8qaHB32K7EI3Fl5ox2jHuLvoMg_OKix72nUYIKwLsGJjrWlb51wifIVHqFaVTImBRHsSSFdJ_GozUWvFmeKqVKGiBZO6IrFm1HOO0Xx9XnOLqMBVW7hPm1yKINBrBpbr1p6HiSlYUtQBC96zrj6ro-oBjq49Eu8RLX5C8tkfiQ1rZLqkdb3r3DFf6w_KpvByqX2aFw';
    }
  };

  return (
    <div className={`${floating ? 'fixed bottom-28 right-4 z-40' : 'relative'} flex flex-col items-end pointer-events-none`}>
      {/* Glass Speech Bubble */}
      <div
        onClick={handleMascotClick}
        className="glass-card backdrop-blur-xl border border-white/20 p-4 rounded-2xl mb-3 max-w-[220px] shadow-2xl relative pointer-events-auto cursor-pointer animate-bounce group hover:border-secondary transition-all"
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-1.5">
          <span className="text-[10px] font-bold text-secondary flex items-center gap-1 uppercase tracking-wider">
            <span className="material-symbols-outlined text-xs">auto_awesome</span> AI Tutor Suara Jelas
          </span>
          <button
            onClick={toggleSlowMode}
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${isSlowMode ? 'bg-secondary text-on-secondary shadow-sm' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
          >
            {isSlowMode ? '🐢 Pelan ON' : '⚡ Normal'}
          </button>
        </div>

        <p className="text-xs font-bold text-white leading-relaxed">{speechText}</p>

        {isTalking ? (
          <div className="flex items-center gap-1 mt-2 text-secondary font-bold text-[10px]">
            <span className="w-1 bg-secondary animate-soundwave rounded-full" />
            <span className="w-1 bg-secondary animate-soundwave rounded-full" style={{ animationDelay: '0.2s' }} />
            <span className="w-1 bg-secondary animate-soundwave rounded-full" style={{ animationDelay: '0.4s' }} />
            <span className="ml-1">Sedang Mengucapkan Jelas... 🔊</span>
          </div>
        ) : (
          <div className="text-[9px] text-white/50 mt-1 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-secondary">volume_up</span> Tap mascot untuk dengar 🔊
          </div>
        )}

        {/* Speech Bubble Arrow */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-surface-container-high/80 border-r border-b border-white/20 rotate-45" />
      </div>

      {/* 3D Mascot Character */}
      <button
        onClick={handleMascotClick}
        className="w-28 h-28 animate-float pointer-events-auto focus:outline-none relative group"
        title="Tap mascot untuk bantuan"
      >
        <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <img
          src={getMascotImg()}
          alt="3D Mascot"
          className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform"
        />
      </button>
    </div>
  );
};

'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/hedwig-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0d0518 100%)',
      fontFamily: 'Cinzel, serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Fundo decorativo */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.2,
        bottom: 0
      }}>
        <svg viewBox="0 0 1200 200" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <path d="M0,200 L0,150 Q150,100 300,150 Q450,200 600,140 Q750,80 900,130 Q1050,180 1200,120 L1200,200 Z" fill="#2d1b4e" />
        </svg>
      </div>

      {/* Player Principal */}
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(to bottom right, rgba(46, 16, 64, 0.8), rgba(30, 27, 75, 0.8), rgba(46, 16, 64, 0.8))',
          backdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          
          {/* Título */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ color: '#fbbf24', fontSize: '0.875rem', letterSpacing: '0.3em' }}>MÚSICA TEMA DE</div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #fbbf24, #eab308, #fbbf24)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginTop: '0.5rem',
              animation: 'glow 2s ease-in-out infinite'
            }}>HARRY POTTER</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
              <div style={{ width: '2rem', height: '1px', background: 'rgba(245, 158, 11, 0.5)' }} />
              <div style={{ width: '0.5rem', height: '0.5rem', transform: 'rotate(45deg)', background: '#f59e0b' }} />
              <div style={{ width: '2rem', height: '1px', background: 'rgba(245, 158, 11, 0.5)' }} />
            </div>
          </div>

          {/* Botão Play/Pause - Estilo Varinha */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <button
              onClick={togglePlay}
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(to bottom right, #d97706, #ca8a04)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}>
                {isPlaying ? (
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <div style={{ width: '0.375rem', height: '1.5rem', background: 'white', borderRadius: '0.125rem' }} />
                    <div style={{ width: '0.375rem', height: '1.5rem', background: 'white', borderRadius: '0.125rem' }} />
                  </div>
                ) : (
                  <div style={{
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '12px solid white',
                    marginLeft: '0.25rem'
                  }} />
                )}
              </div>
            </button>
          </div>

          {/* Tempo e Barra de Progresso */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div style={{ height: '0.25rem', background: 'rgba(120, 53, 15, 0.5)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${(currentTime / duration) * 100}%`, height: '100%', background: 'linear-gradient(to right, #f59e0b, #eab308)' }} />
            </div>
          </div>

          {/* Controle de Volume */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#f59e0b', fontSize: '0.875rem' }}>VOLUME</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                style={{ flex: 1, height: '0.25rem', cursor: 'pointer' }}
              />
              <span style={{ color: '#f59e0b', fontSize: '0.875rem' }}>{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
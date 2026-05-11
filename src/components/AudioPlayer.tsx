'use client';

import { useAudioPlayer } from '../hooks/useAudioPlayer';
import MagicWand from './MagicWand';
import VolumeControl from './VolumeControl';

export default function AudioPlayer() {
  const {
    isPlaying,
    volume,
    duration,
    currentTime,
    togglePlay,
    changeVolume,
    seekTo,
  } = useAudioPlayer('/audio/hedwig-theme.mp3');

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative z-10 max-w-md w-full mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-purple-950/80 via-indigo-950/80 to-purple-950/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-amber-500/30">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent animate-glow" style={{ animation: 'glow 2s ease-in-out infinite' }}>
            HEDWIG'S THEME
          </h1>
          <p className="text-amber-600 text-sm tracking-widest mt-2">John Williams</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </div>

        <MagicWand isPlaying={isPlaying} />

        <div className="space-y-4 mb-8">
          <div className="relative">
            <div className="h-1 bg-amber-900/50 rounded-full overflow-hidden cursor-pointer group" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seekTo(percent * duration);
            }}>
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-100 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-300 rounded-full shadow-lg" />
              </div>
            </div>
            <div className="flex justify-between text-amber-400 text-xs mt-1.5 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <VolumeControl volume={volume} onChange={changeVolume} />
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={togglePlay}
            className="group relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-950/50 to-transparent" />
            <div className="relative flex items-center justify-center w-full h-full">
              {isPlaying ? (
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-6 bg-white rounded-sm" />
                  <div className="w-1.5 h-6 bg-white rounded-sm" />
                </div>
              ) : (
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
              )}
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-amber-600 text-xs font-mono">
            <span>✦</span>
            <span className="tracking-wider">EXPELLIARMUS</span>
            <span>✦</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center text-amber-700 text-xs opacity-50 pointer-events-none">
        <p>MODERADO POR HOGWARTS</p>
        <p className="text-[10px] mt-1">〰 〰 〰</p>
      </div>
    </div>
  );
}
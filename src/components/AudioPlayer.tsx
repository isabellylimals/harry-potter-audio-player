'use client';

import { useState, useEffect, useRef } from 'react';
import PlayButton from './PlayButton';
import VolumeControl from './VolumeControl';

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  duration: string;
}

const PLAYLIST: Track[] = [
  { id: 1, title: "Hedwig's Theme", artist: "John Williams", src: "/audio/hedwig-theme.mp3", duration: "3:45" },
  { id: 2, title: "Deja Vu", artist: "Olivia Rodrigo", src: "/audio/deja vu.mp3", duration: "4:12" },
  { id: 3, title: "Cruel Summer", artist: "Taylor Swift", src: "/audio/taylor-swift.mp3", duration: "3:58" },
    { id: 4, title: "Drop Dead ", artist: "Olivia Rodrigo", src: "/audio/drop dead.mp3", duration: "3:58" },
];

export default function AudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(currentTrack.src);
    audioRef.current.volume = volume;
    audioRef.current.loop = false;
    
    const audio = audioRef.current;
    
    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => nextTrack();
    
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);
    
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  };

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? PLAYLIST.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  };

  const forward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const backward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-wrapper">
      <div className="player-card">
        
        {/* Header com nome Isa - mais compacto */}
        <div className="player-header">
          <div className="isa-badge">
            <span className="isa-name">ISA'S VERSION</span>
            <div className="isa-line"></div>
          </div>
        </div>

        {/* Música atual - mais compacto */}
        <div className="track-info">
          <div className="track-badge">NOW PLAYING</div>
          <h2 className="track-title">{currentTrack.title}</h2>
          <p className="track-artist">{currentTrack.artist}</p>
        </div>

        {/* Barra de progresso */}
        <div className="progress-section">
          <div className="progress-bar" onClick={seekTo}>
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}>
              <div className="progress-handle"></div>
            </div>
          </div>
          <div className="time-info">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controles de tempo +/- 10s */}
        <div className="time-controls">
          <button className="time-btn" onClick={backward10}>-10</button>
          <button className="time-btn" onClick={forward10}>+10</button>
        </div>

        {/* Botões principais */}
        <div className="main-controls">
          <button className="nav-btn" onClick={prevTrack}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6B9D">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <PlayButton isPlaying={isPlaying} onClick={togglePlay} />

          <button className="nav-btn" onClick={nextTrack}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6B9D">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        {/* Volume - mais compacto */}
        <VolumeControl volume={volume} onChange={handleVolumeChange} />

        {/* Playlist com altura limitada */}
        <div className="playlist-section">
          <h3 className="playlist-title">PLAYLIST</h3>
          <div className="playlist-items">
            {PLAYLIST.map((track, index) => (
              <div
                key={track.id}
                className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
                onClick={() => selectTrack(index)}
              >
                <div className="playlist-indicator">
                  {index === currentTrackIndex && isPlaying && (
                    <div className="playing-dot"></div>
                  )}
                  {index === currentTrackIndex && !isPlaying && (
                    <div className="paused-dot"></div>
                  )}
                  {index !== currentTrackIndex && (
                    <span className="music-note">♪</span>
                  )}
                </div>
                <div className="playlist-info">
                  <div className="playlist-track-title">{track.title}</div>
                  <div className="playlist-track-artist">{track.artist}</div>
                </div>
                <div className="playlist-duration">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="player-footer">
          <span>isa's version</span>
          <span>✦</span>
        </div>
      </div>

      <style jsx>{`
        .player-wrapper {
          position: relative;
          z-index: 10;
          max-width: 480px;
          width: 100%;
          margin: 0 auto;
          padding: 0;
          height: auto;
          max-height: 95vh;
          overflow-y: auto;
        }
        
        .player-wrapper::-webkit-scrollbar {
          width: 3px;
        }
        
        .player-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 107, 157, 0.1);
          border-radius: 10px;
        }
        
        .player-wrapper::-webkit-scrollbar-thumb {
          background: #FF6B9D;
          border-radius: 10px;
        }
        
        .player-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 18px 22px;
          box-shadow: 0 20px 60px rgba(255, 107, 157, 0.15);
          border: 1px solid rgba(255, 107, 157, 0.2);
        }
        
        .player-header {
          text-align: center;
          margin-bottom: 8px;
        }
        
        .isa-badge {
          display: inline-block;
        }
        
        .isa-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #FF6B9D, #FF3388, #FFB8D0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: 2px;
        }
        
        .isa-line {
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, #FF6B9D, #FFB8D0);
          margin: 6px auto 0;
          border-radius: 2px;
        }
        
        .track-info {
          text-align: center;
          margin-bottom: 16px;
        }
        
        .track-badge {
          color: #FF6B9D;
          font-size: 9px;
          letter-spacing: 3px;
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .track-title {
          color: #2D1B2E;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 4px 0;
          font-family: 'Playfair Display', serif;
        }
        
        .track-artist {
          color: #FF6B9D;
          font-size: 11px;
          margin: 0;
        }
        
        .progress-section {
          margin-bottom: 16px;
        }
        
        .progress-bar {
          height: 3px;
          background: rgba(255, 107, 157, 0.15);
          border-radius: 3px;
          cursor: pointer;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B9D, #FF3388);
          border-radius: 3px;
          position: relative;
          transition: width 0.1s linear;
        }
        
        .progress-handle {
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          background: #FF6B9D;
          border-radius: 50%;
          box-shadow: 0 0 6px #FF6B9D;
        }
        
        .time-info {
          display: flex;
          justify-content: space-between;
          color: #FF6B9D;
          font-size: 9px;
          font-weight: 500;
          margin-top: 6px;
        }
        
        .time-controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .time-btn {
          background: rgba(255, 107, 157, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          border-radius: 30px;
          padding: 5px 20px;
          color: #FF6B9D;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .time-btn:hover {
          background: rgba(255, 107, 157, 0.2);
        }
        
        .main-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin-bottom: 20px;
        }
        
        .nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          transition: all 0.3s;
          opacity: 0.6;
        }
        
        .nav-btn:hover {
          opacity: 1;
          transform: scale(1.08);
        }
        
        .playlist-section {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 107, 157, 0.15);
        }
        
        .playlist-title {
          color: #FF6B9D;
          font-size: 10px;
          letter-spacing: 2px;
          margin-bottom: 12px;
          text-align: center;
        }
        
        .playlist-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 180px;
          overflow-y: auto;
        }
        
        .playlist-items::-webkit-scrollbar {
          width: 2px;
        }
        
        .playlist-items::-webkit-scrollbar-track {
          background: rgba(255, 107, 157, 0.1);
        }
        
        .playlist-items::-webkit-scrollbar-thumb {
          background: #FF6B9D;
        }
        
        .playlist-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255, 107, 157, 0.03);
        }
        
        .playlist-item:hover {
          background: rgba(255, 107, 157, 0.08);
        }
        
        .playlist-item.active {
          background: rgba(255, 107, 157, 0.12);
          border-left: 2px solid #FF6B9D;
        }
        
        .playlist-indicator {
          width: 20px;
          text-align: center;
        }
        
        .playing-dot {
          width: 6px;
          height: 6px;
          background: #FF6B9D;
          border-radius: 50%;
          margin: 0 auto;
          animation: pulseLight 1s ease-in-out infinite;
        }
        
        .paused-dot {
          width: 6px;
          height: 6px;
          background: #FFB8D0;
          border-radius: 50%;
          margin: 0 auto;
        }
        
        .music-note {
          color: #FFB8D0;
          font-size: 12px;
        }
        
        .playlist-info {
          flex: 1;
        }
        
        .playlist-track-title {
          color: #2D1B2E;
          font-size: 12px;
          font-weight: 500;
        }
        
        .playlist-item.active .playlist-track-title {
          color: #FF6B9D;
        }
        
        .playlist-track-artist {
          color: #FFB8D0;
          font-size: 9px;
        }
        
        .playlist-duration {
          color: #FFB8D0;
          font-size: 9px;
          font-family: monospace;
        }
        
        .player-footer {
          text-align: center;
          margin-top: 16px;
          padding-top: 12px;
          color: #FFB8D0;
          font-size: 9px;
          letter-spacing: 2px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        
        @keyframes pulseLight {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
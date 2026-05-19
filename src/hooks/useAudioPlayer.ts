import { useState, useEffect, useRef } from 'react';

interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  src: string;
  duration: string;
}

// Playlist com as músicas
const DEFAULT_PLAYLIST: PlaylistItem[] = [
  {
    id: 1,
    title: "Hedwig's Theme",
    artist: "John Williams",
    src: "/audio/hedwig-theme.mp3",
    duration: "4:50"
  },
  {
    id: 2,
    title: "Harry's Wondrous World",
    artist: "John Williams",
    src: "/audio/taylor-swift.mp3", // Use o mesmo áudio por enquanto
    duration: "4:50"
  }
];

export const useAudioPlayer = (playlist: PlaylistItem[] = DEFAULT_PLAYLIST) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [savedVolume, setSavedVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex];

  // Inicializar áudio quando a música mudar
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      audioRef.current.volume = isMuted ? 0 : volume;
      
      if (wasPlaying) {
        audioRef.current.play().catch(err => console.log('Erro ao tocar:', err));
      }
    }
  }, [currentTrackIndex]);

  // Configurar eventos do áudio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Erro:', err));
    }
  };

  // Mudar volume
  const changeVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    const vol = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = vol;
    setVolume(vol);
    if (vol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Mudo
  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = savedVolume;
      setVolume(savedVolume);
      setIsMuted(false);
    } else {
      setSavedVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  // Avançar +10 segundos
  const forwardTime = () => {
    if (!audioRef.current) return;
    let newTime = audioRef.current.currentTime + 10;
    if (newTime > duration) newTime = duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Retroceder -10 segundos
  const backwardTime = () => {
    if (!audioRef.current) return;
    let newTime = audioRef.current.currentTime - 10;
    if (newTime < 0) newTime = 0;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Ir para tempo específico
  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Próxima música
  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
  };

  // Música anterior
  const previousTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
  };

  // Selecionar música específica
  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
  };

  // Formatar tempo
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    currentTrack,
    currentTrackIndex,
    playlist,
    isPlaying,
    volume,
    duration,
    currentTime,
    isMuted,
    togglePlay,
    changeVolume,
    toggleMute,
    forwardTime,
    backwardTime,
    seekTo,
    nextTrack,
    previousTrack,
    selectTrack,
    formatTime,
  };
};
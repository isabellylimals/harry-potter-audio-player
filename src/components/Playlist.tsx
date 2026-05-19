'use client';

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  duration: number;
}

interface PlaylistProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export default function Playlist({ 
  tracks, 
  currentTrackIndex, 
  isPlaying, 
  onSelectTrack 
}: PlaylistProps) {
  return (
    <div className="playlist-container">
      <h3 className="playlist-title">LISTA DE FEITIÇOS MUSICAIS</h3>
      <div className="playlist-items">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
            onClick={() => onSelectTrack(index)}
          >
            <div className="playlist-item-icon">
              {index === currentTrackIndex && isPlaying ? (
                <span className="playing-animation">🎵</span>
              ) : (
                <span>✨</span>
              )}
            </div>
            <div className="playlist-item-info">
              <div className="playlist-item-title">
                {track.title}
                {index === currentTrackIndex && (
                  <span className="playing-indicator"> Tocando agora</span>
                )}
              </div>
              <div className="playlist-item-artist">{track.artist}</div>
            </div>
            <div className="playlist-item-duration">{track.duration}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .playlist-container {
          margin-top: 2rem;
          background: rgba(46, 16, 64, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 1rem;
          padding: 1rem;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        
        .playlist-title {
          color: #fbbf24;
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .playlist-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
        }
        
        .playlist-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(0, 0, 0, 0.3);
        }
        
        .playlist-item:hover {
          background: rgba(245, 158, 11, 0.2);
          transform: translateX(5px);
        }
        
        .playlist-item.active {
          background: rgba(245, 158, 11, 0.3);
          border-left: 3px solid #fbbf24;
        }
        
        .playlist-item-icon {
          font-size: 1.25rem;
        }
        
        .playlist-item-info {
          flex: 1;
        }
        
        .playlist-item-title {
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .playing-indicator {
          color: #fbbf24;
          font-size: 0.7rem;
          margin-left: 0.5rem;
        }
        
        .playlist-item-artist {
          color: #d97706;
          font-size: 0.75rem;
        }
        
        .playlist-item-duration {
          color: #fbbf24;
          font-size: 0.75rem;
          font-family: monospace;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .playing-animation {
          animation: pulse 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
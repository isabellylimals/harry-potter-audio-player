'use client';

interface TimeControlsProps {
  onBackward: () => void;
  onForward: () => void;
  onPreviousTrack: () => void;
  onNextTrack: () => void;
}

export default function TimeControls({
  onBackward,
  onForward,
  onPreviousTrack,
  onNextTrack,
}: TimeControlsProps) {
  return (
    <div className="time-controls">
      <button onClick={onPreviousTrack} className="control-btn" title="Música anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </button>

      <button onClick={onBackward} className="control-btn time-btn" title="Voltar 10 segundos">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          <text x="14" y="18" fontSize="10" fill="white">10</text>
        </svg>
        <span className="time-label">-10s</span>
      </button>

      <button onClick={onForward} className="control-btn time-btn" title="Avançar 10 segundos">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
          <text x="9" y="18" fontSize="10" fill="white">10</text>
        </svg>
        <span className="time-label">+10s</span>
      </button>

      <button onClick={onNextTrack} className="control-btn" title="Próxima música">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </button>

      <style jsx>{`
        .time-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .control-btn {
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.5);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }
        
        .control-btn:hover {
          background: rgba(245, 158, 11, 0.5);
          transform: scale(1.1);
        }
        
        .time-btn {
          width: 60px;
          border-radius: 30px;
          gap: 4px;
        }
        
        .time-label {
          color: white;
          font-size: 10px;
          position: absolute;
          bottom: -18px;
        }
      `}</style>
    </div>
  );
}
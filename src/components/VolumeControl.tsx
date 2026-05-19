'use client';

interface VolumeControlProps {
  volume: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VolumeControl({ volume, onChange }: VolumeControlProps) {
  return (
    <div className="volume-container">
      <span className="volume-icon">🔊</span>
      <div className="volume-slider-wrapper">
        <div
          className="volume-slider-fill"
          style={{ width: `${volume * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onChange}
          className="volume-slider"
        />
      </div>
      <span className="volume-value">{Math.round(volume * 100)}%</span>

      <style jsx>{`
        .volume-container {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 40px;
        }
        
        .volume-icon {
          font-size: 18px;
          opacity: 0.8;
        }
        
        .volume-slider-wrapper {
          flex: 1;
          position: relative;
          height: 4px;
          background: rgba(255, 107, 157, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .volume-slider-fill {
          position: absolute;
          height: 100%;
          background: linear-gradient(90deg, #FF6B9D, #FF3388);
          border-radius: 4px;
          pointer-events: none;
        }
        
        .volume-slider {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        
        .volume-value {
          color: #FF6B9D;
          font-size: 12px;
          font-weight: 500;
          min-width: 45px;
        }
      `}</style>
    </div>
  );
}
'use client';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlayButton({ isPlaying, onClick }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      className="play-button"
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FF6B9D, #FF3388)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 32px rgba(255, 107, 157, 0.4)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 107, 157, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 107, 157, 0.4)';
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFB8D0, #FF6B9D)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPlaying ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '6px', height: '24px', background: 'white', borderRadius: '3px' }} />
            <div style={{ width: '6px', height: '24px', background: 'white', borderRadius: '3px' }} />
          </div>
        ) : (
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '18px solid white',
              marginLeft: '4px',
            }}
          />
        )}
      </div>
    </button>
  );
}
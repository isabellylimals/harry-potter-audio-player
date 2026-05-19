'use client';

import { useEffect, useState } from 'react';

export default function IsaBackground() {
  const [hearts, setHearts] = useState<Array<{ 
    left: string; 
    delay: string; 
    duration: string; 
    size: string;
    opacity: string;
  }>>([]);

  useEffect(() => {
    const heartArray = Array.from({ length: 80 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${15 + Math.random() * 30}px`,
      opacity: `${0.1 + Math.random() * 0.3}`,
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-200/10 to-transparent" />
      
      {hearts.map((heart, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: heart.left,
            top: '-50px',
            width: heart.size,
            height: heart.size,
            animation: `floatHeart ${heart.duration} linear ${heart.delay} infinite`,
            opacity: heart.opacity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#FF6B9D" width="100%" height="100%">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}
      
      {/* Elementos decorativos - círculos rosas */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-rose-300/5 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-pink-300/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rose-200/5 blur-3xl" />
    </div>
  );
}
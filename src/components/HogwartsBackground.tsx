'use client';

import { useEffect, useState } from 'react';

export default function HogwartsBackground() {
  const [particles, setParticles] = useState<Array<{ left: string; delay: string; duration: string; size: string }>>([]);

  useEffect(() => {
    const particleArray = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${8 + Math.random() * 12}s`,
      size: `${2 + Math.random() * 4}px`,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent" />
      
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-300/30"
          style={{
            left: particle.left,
            top: '-10px',
            width: particle.size,
            height: particle.size,
            animation: `particle-drift ${particle.duration} linear ${particle.delay} infinite`,
          }}
        />
      ))}
      
      <svg className="absolute bottom-0 w-full opacity-20" viewBox="0 0 1200 200">
        <path
          d="M0,200 L0,150 Q150,100 300,150 Q450,200 600,140 Q750,80 900,130 Q1050,180 1200,120 L1200,200 Z"
          fill="#2d1b4e"
        />
        <path
          d="M0,200 L0,170 Q150,130 300,170 Q450,210 600,160 Q750,110 900,150 Q1050,190 1200,140 L1200,200 Z"
          fill="#1a0a2e"
        />
      </svg>
    </div>
  );
}
'use client';

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onChange }: VolumeControlProps) {
  const volumePercentage = Math.round(volume * 100);

  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-amber-500 text-sm tracking-wider">FEITIÇO DE VOLUME</span>
      <div className="relative flex-1 h-1 bg-amber-900/50 rounded-full cursor-pointer group">
        <div
          className="absolute h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-200"
          style={{ width: `${volumePercentage}%` }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-3 h-3 bg-yellow-400 rounded-full -top-1 shadow-lg transition-all duration-200"
          style={{ left: `${volumePercentage}%` }}
        />
      </div>
      <span className="text-amber-500 text-sm font-mono">{volumePercentage}%</span>
    </div>
  );
}
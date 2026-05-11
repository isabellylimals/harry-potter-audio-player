'use client';

interface MagicWandProps {
  isPlaying: boolean;
}

export default function MagicWand({ isPlaying }: MagicWandProps) {
  return (
    <div className="relative w-32 h-96 mx-auto mb-8">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-80">
        <div className="absolute bottom-0 w-6 h-64 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-full" />
        <div className="absolute bottom-64 w-3 h-8 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 rounded-t-full left-1/2 transform -translate-x-1/2" />
        
        {isPlaying && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-4 h-20 bg-gradient-to-t from-blue-400 via-purple-500 to-transparent rounded-full animate-pulse" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-1 h-12 bg-white rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
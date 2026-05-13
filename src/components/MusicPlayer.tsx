import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '../constants';

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipBack: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onSkipNext,
  onSkipBack,
}) => {
  return (
    <div className="flex-1 px-8 flex items-center gap-12 h-full">
      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={onSkipBack}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors group"
        >
          <SkipBack size={18} fill="currentColor" className="text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
        <button
          onClick={onPlayPause}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500 text-black shadow-[0_0_20px_#06b6d4] hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
        </button>
        <button
          onClick={onSkipNext}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors group"
        >
          <SkipForward size={18} fill="currentColor" className="text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Progress & Info */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-cyan-400 tracking-wider">
              {currentTrack.title} — <span className="text-cyan-700">{currentTrack.artist}</span>
            </span>
          </div>
          <span className="text-[10px] text-cyan-700">01:24 / 03:04</span>
        </div>
        <div className="w-full h-1.5 bg-cyan-950 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] transition-all duration-1000 ${isPlaying ? 'w-2/3' : 'w-1/3'}`}
          />
        </div>
      </div>

      {/* Volume/Visualizer */}
      <div className="w-48 flex items-center gap-4">
        <Volume2 size={16} className="text-cyan-700" />
        <div className="flex-1 h-1 bg-cyan-950 rounded-full">
          <div className="w-3/4 h-full bg-cyan-700"></div>
        </div>
      </div>
    </div>
  );
};

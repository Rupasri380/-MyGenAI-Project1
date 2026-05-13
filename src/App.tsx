import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { DUMMY_TRACKS } from './constants';
import { Trophy, Music2, Gamepad2, Volume2 } from 'lucide-react';

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const handleBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  return (
    <div className="h-screen bg-[#050507] text-[#e0e0ff] font-mono flex flex-col overflow-hidden select-none border-[12px] border-[#0a0a0f]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-cyan-900/50 bg-[#0a0a14]">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
          <h1 className="text-xl font-bold tracking-widest text-cyan-400">NEON-SNAKE // SYNTH-WAVE</h1>
        </div>
        
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col items-end">
            <span className="text-cyan-900 text-[10px] uppercase">Current Score</span>
            <span className="text-2xl font-black text-cyan-400 leading-none">{score.toLocaleString('en-US', { minimumIntegerDigits: 5 })}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-cyan-900 text-[10px] uppercase">High Score</span>
            <span className="text-2xl font-black text-pink-500 leading-none">{highScore.toLocaleString('en-US', { minimumIntegerDigits: 5 })}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex p-6 gap-6 bg-[radial-gradient(circle_at_center,_#0a0a1a_0%,_#050507_100%)] overflow-hidden">
        {/* Sidebar: Playlist */}
        <aside className="w-72 flex flex-col gap-4">
          <div className="p-4 border border-cyan-900/40 bg-black/40 rounded-lg flex-1 overflow-hidden flex flex-col">
            <h2 className="text-[10px] uppercase text-cyan-700 mb-4 tracking-tighter">Neural Playlist</h2>
            <div className="space-y-2 overflow-y-auto pr-1">
              {DUMMY_TRACKS.map((track, i) => (
                <div 
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(i);
                    setIsPlaying(true);
                  }}
                  className={`p-3 cursor-pointer transition-all border-l-2 ${
                    i === currentTrackIndex 
                      ? 'bg-cyan-500/10 border-cyan-400 opacity-100' 
                      : 'border-transparent hover:bg-white/5 opacity-60'
                  } flex items-center gap-3`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center text-xs ${i === currentTrackIndex ? 'bg-cyan-950 text-cyan-100' : 'bg-black/40'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${i === currentTrackIndex ? 'text-cyan-100' : ''}`}>{track.title}</div>
                    <div className={`text-[10px] ${i === currentTrackIndex ? 'text-cyan-600' : 'text-white/40'}`}>{track.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-32 border border-pink-900/30 bg-pink-900/5 rounded-lg p-3 flex flex-col justify-center items-center text-center">
            <div className="text-[10px] uppercase text-pink-700 mb-1">Level Multiplier</div>
            <div className="text-4xl font-black text-pink-500">x{(1 + score / 100).toFixed(1)}</div>
            <div className="w-full h-1 bg-pink-950 mt-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-500 shadow-[0_0_5px_#ec4899] transition-all duration-500" 
                style={{ width: `${Math.min((score % 100), 100)}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Center: Game Section */}
        <section className="flex-1 relative border-2 border-cyan-500/30 rounded-xl bg-black/80 shadow-[inset_0_0_100px_rgba(6,182,212,0.1)] flex items-center justify-center overflow-hidden">
          <div className="relative">
             <SnakeGame onScoreChange={handleScoreChange} isPaused={!isPlaying} />
             {/* CRT Effect Overlay */}
             <div className="absolute inset-0 crt-overlay opacity-20" />
          </div>
          
          {!isPlaying && (
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
               <div className="flex flex-col items-center gap-4">
                 <div className="px-6 py-2 border border-cyan-400 text-cyan-400 text-sm font-bold tracking-[0.3em] bg-cyan-400/10">SYSTEM STANDBY</div>
                 <button 
                  onClick={() => setIsPlaying(true)}
                  className="px-8 py-3 bg-cyan-500 text-black font-black hover:bg-cyan-400 transition-colors shadow-[0_0_20px_#06b6d4]"
                 >
                   RESUME_DRIVER
                 </button>
               </div>
             </div>
          )}
        </section>

        {/* Right Sidebar: Instructions/Status */}
        <aside className="w-64 flex flex-col gap-4">
           <div className="p-4 border border-cyan-900/40 bg-black/40 rounded-lg">
             <h3 className="text-[10px] uppercase text-cyan-700 mb-4 tracking-tighter">Diagnostic Data</h3>
             <div className="space-y-4">
               <div>
                  <div className="text-[10px] text-white/40 mb-1">Grid Resolution</div>
                  <div className="text-xs text-cyan-100 uppercase">20x20 Matrix</div>
               </div>
               <div>
                  <div className="text-[10px] text-white/40 mb-1">Signal Status</div>
                  <div className="text-xs text-green-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Operational
                  </div>
               </div>
               <div>
                  <div className="text-[10px] text-white/40 mb-1">Inputs</div>
                  <div className="flex gap-2">
                    <kbd className="w-6 h-6 border border-cyan-900/50 bg-black/50 flex items-center justify-center text-[10px]">↑</kbd>
                    <kbd className="w-6 h-6 border border-cyan-900/50 bg-black/50 flex items-center justify-center text-[10px]">←</kbd>
                    <kbd className="w-6 h-6 border border-cyan-900/50 bg-black/50 flex items-center justify-center text-[10px]">↓</kbd>
                    <kbd className="w-6 h-6 border border-cyan-900/50 bg-black/50 flex items-center justify-center text-[10px]">→</kbd>
                  </div>
               </div>
             </div>
           </div>
           
           <div className="flex-1 p-4 border border-cyan-900/40 bg-black/40 rounded-lg relative overflow-hidden">
              <h3 className="text-[10px] uppercase text-cyan-700 mb-4 tracking-tighter">Neuro-Log</h3>
              <div className="text-[10px] font-mono space-y-1 text-cyan-800 leading-tight">
                <div>[INFO] Matrix initialized...</div>
                <div>[INFO] Driver v4.2 loaded...</div>
                {score > 0 && <div>[SENT] Node consumed @ +10pts</div>}
                {score > 50 && <div>[WARN] Speed increment active</div>}
                <div className="animate-pulse">_</div>
              </div>
           </div>
        </aside>
      </main>

      {/* Footer: Music Player */}
      <footer className="h-24 bg-[#0a0a14] border-t border-cyan-900/50 flex items-center">
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onSkipNext={handleNext}
          onSkipBack={handleBack}
        />
      </footer>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { AnimalId, ANIMALS } from '../types';
import { AnimalFace } from './AnimalFace';
import { Trophy, Flame, Play, HelpCircle, Volume2, VolumeX, RefreshCw, LogOut, Sparkles, Smile, Frown } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface GameOverScreenProps {
  status: 'WIN' | 'LOSE';
  animalId: AnimalId;
  finalScore: number;
  finalStreak: number;
  maxStreak: number;
  onPlayAgain: () => void;
  onChangeCharacter: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  status,
  animalId,
  finalScore,
  finalStreak,
  maxStreak,
  onPlayAgain,
  onChangeCharacter,
  isMuted,
  onToggleMute,
}) => {
  const isWinner = status === 'WIN';
  const config = ANIMALS[animalId];
  
  // Choose correct subdialogue
  const dialogueOptions = isWinner ? config.dialogues.victory : config.dialogues.defeat;
  const quote = dialogueOptions[Math.floor(Math.random() * dialogueOptions.length)];

  // Synthesizer custom tune for game end
  const playEndMelody = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (isWinner) {
        // Glorious arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + index * 0.15 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.15 + 0.4);
          
          osc.start(ctx.currentTime + index * 0.15);
          osc.stop(ctx.currentTime + index * 0.15 + 0.45);
        });
      } else {
        // Mournful slide down
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(147, ctx.currentTime + 0.6);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.75);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      // Audio block catch
    }
  };

  // Trigger sound automatically once when entering screen
  React.useEffect(() => {
    playEndMelody();
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] py-8 px-4 sm:px-6 relative select-none">
      
      {/* Sparkly victory background elements */}
      {isWinner && (
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <Sparkles className="absolute left-12 top-10 text-yellow-500 animate-pulse w-8 h-8" />
          <p className="absolute right-16 top-24 text-[#db7a95] text-4xl font-hand animate-bounce">✨</p>
          <Sparkles className="absolute left-24 bottom-20 text-emerald-500 animate-pulse w-6 h-6" />
          <p className="absolute right-10 bottom-36 text-blue-400 text-3xl font-hand animate-bounce">⭐</p>
        </div>
      )}

      {/* Spacer */}
      <div className="h-2" />

      {/* Main Container Card */}
      <motion.div
        initial={{ y: 35, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 14 }}
        className="bg-white border-2 border-[#2d2522] rounded-[32px] p-6 sm:p-8 max-w-md w-full text-center relative filter-sketch-heavy double-sketch-container"
        style={{
          boxShadow: '6px 6px 0px 0px rgba(45,37,34,0.12)',
          backgroundColor: isWinner ? '#FFFDF9' : '#FAF6EE',
        }}
      >
        {/* Outcome Header Ribbon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {isWinner ? (
            <Trophy className="text-amber-500 stroke-[2.5px] animate-bounce w-8 h-8" />
          ) : (
            <Frown className="text-[#8c746c] stroke-[2px] w-8 h-8" />
          )}

          <h2
            className={`text-4xl sm:text-[42px] font-hand font-extrabold tracking-wide uppercase ${
              isWinner ? 'text-[#a27b5c]' : 'text-[#8c2e4b]'
            }`}
            style={{ filter: 'url(#sketchy-text)' }}
          >
            {isWinner ? 'STAGE CLEAR!' : 'STAGE FAILED!'}
          </h2>
        </div>

        <p className="font-hand text-sm text-[#8c7a72] uppercase font-bold tracking-widest leading-none mb-6">
          {isWinner ? 'mathematical mastermind' : 'ran out of calculations'}
        </p>

        {/* Selected Character Animated Avatar */}
        <div className="flex flex-col items-center justify-center my-4">
          <motion.div
            className="w-24 h-24 relative flex items-center justify-center"
            animate={{
              y: [0, -5, 0],
              rotate: isWinner ? [0, 4, -4, 0] : [0, -2, 2, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AnimalFace id={animalId} state={isWinner ? 'happy' : 'sad'} className="w-full h-full" />
            <span className={`absolute -top-1 -right-1 w-7 h-7 flex items-center justify-center bg-white border border-[#2d2522] rounded-full filter-sketch`}>
              {isWinner ? '⭐' : '🥀'}
            </span>
          </motion.div>

          {/* Dialogue text box from character */}
          <div className={`mt-5 p-3.5 rounded-xl border border-dashed text-sm font-hand leading-relaxed italic bg-white/60 text-[#54433d] filter-sketch ${config.theme.border}`}>
            <span className="font-bold text-xs uppercase uppercase select-none tracking-wider block mb-1 text-[#8c7870]">
              {config.name} Reacts:
            </span>
            &ldquo;{quote}&rdquo;
          </div>
        </div>

        {/* Detailed Stats Panel */}
        <div className="my-6 border-2 border-dashed border-[#dcd2be] rounded-2xl p-4 bg-[#fcfaf5]/70 flex flex-col gap-3 select-text">
          {/* Points list item */}
          <div className="flex justify-between items-center text-left">
            <span className="font-hand text-base font-bold text-[#8c7a72] uppercase">Total Math Score</span>
            <span className="font-comic text-xl font-black text-[#3a2c26] tracking-wide">{finalScore} pts</span>
          </div>

          <div className="h-px bg-[#ece5d4]" />

          {/* Succeeded questions count */}
          <div className="flex justify-between items-center text-left">
            <span className="font-hand text-base font-bold text-[#8c7a72] uppercase">Requirements Cleared</span>
            <span className="font-hand text-lg font-bold text-[#2d734c] shrink-0">
              {isWinner ? '12 / 12 SOLVED' : 'STRIKE LIMIT HIT'}
            </span>
          </div>

          <div className="h-px bg-[#ece5d4]" />

          {/* High streaks item */}
          <div className="flex justify-between items-center text-left">
            <span className="font-hand text-base font-bold text-[#8c7a72] uppercase">Highest Streak</span>
            <span className="font-hand text-lg font-black text-[#c26b38] flex items-center gap-1">
              <Flame size={15} className="fill-[#ff5a00] stroke-[#ff5a00]" />
              <span>x{maxStreak} correct</span>
            </span>
          </div>
        </div>

        {/* Major Squishy Action button blocks */}
        <div className="flex flex-col gap-3.5 mt-2">
          {/* PLAY AGAIN (REPLAY RUN) */}
          <motion.div className="w-full">
            <motion.button
              id="replay-run-btn"
              onMouseEnter={() => audioManager.play('hover')}
              onClick={onPlayAgain}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full h-13 relative flex items-center justify-center font-hand text-xl font-bold cursor-pointer select-none rounded-[24px] filter-sketch-heavy double-sketch-container text-[#3b2e2a] border-2 border-[#2d2522] ${config.theme.badge}`}
              style={{
                backgroundColor: config.theme.secondary,
              }}
            >
              <RefreshCw size={16} className="mr-2 animate-spin-slow stroke-[2.5px]" />
              <span>TEST MY MIND AGAIN</span>
              <span className="absolute -left-1 w-2.5 h-4 border-l-2 border-[#2d2522] rounded-l-full opacity-35" />
              <span className="absolute -right-1 w-2.5 h-4 border-r-2 border-[#2d2522] rounded-r-full opacity-35" />
            </motion.button>
          </motion.div>

          {/* CHANGE CHARACTER (LOBBY) */}
          <motion.button
            id="change-character-btn"
            onMouseEnter={() => audioManager.play('hover')}
            onClick={onChangeCharacter}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full h-11 flex items-center justify-center font-hand text-lg font-bold text-[#5c4a43] bg-white border border-[#2d2522] rounded-[22px] filter-sketch cursor-pointer hover:bg-[#FAF6EE]"
          >
            <LogOut size={14} className="mr-2" />
            <span>CHANGE CHARACTER</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom control row */}
      <div className="w-full max-w-xl flex justify-between items-center px-4 mt-auto">
        <span className="font-hand text-xs text-[#a09085]">
          A cute mathematical run completed!
        </span>

        <button
          id="sound-gameover-btn"
          onMouseEnter={() => audioManager.play('hover')}
          onClick={onToggleMute}
          className="w-10 h-10 flex items-center justify-center bg-white border border-[#52443f] rounded-full filter-sketch text-[#52443f] hover:bg-[#faf4ec]"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

    </div>
  );
};

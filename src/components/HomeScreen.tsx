import React from 'react';
import { motion } from 'motion/react';
import { AnimalFace } from './AnimalFace';
import { ANIMALS } from '../types';
import { HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface HomeScreenProps {
  onStartGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onShowHelp: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  isMuted,
  onToggleMute,
  onShowHelp,
}) => {
  // Configured multiplier percentages relative to radius
  const floatingAnimals = [
    { id: 'sly', mx: 0, my: -1.25, scale: 1.0, delay: 0.2 },      // Top-Center Fox
    { id: 'bo', mx: -1.45, my: -0.42, scale: 0.98, delay: 0.4 },  // Top-Left Monkey
    { id: 'nori', mx: 1.52, my: -0.42, scale: 0.95, delay: 0.7 }, // Top-Right Cat
    { id: 'pibble', mx: -1.2, my: 0.85, scale: 1.05, delay: 0 },  // Bottom-Left Pig
    { id: 'momo', mx: 1.18, my: 0.85, scale: 1.02, delay: 0.5 },  // Bottom-Right Bear
  ] as const;

  return (
    <div
      className="home-screen-container flex flex-col items-center justify-between h-[82vh] md:h-[650px] min-h-[500px] max-h-[720px] py-6 sm:py-8 md:py-10 px-4 sm:px-6 relative overflow-hidden w-full select-none"
    >
      {/* Invisible spacer at top to balance layout */}
      <div className="hidden sm:block h-2 w-full" />

      {/* MOBILE LAYOUT (< 640px) */}
      <div className="flex sm:hidden flex-col justify-between w-full h-[74vh] max-h-[540px] my-auto relative z-10 px-2 select-none mb-14 xs:mb-16">
        {/* Top Row: Monkey (Bo) and Fox (Sly) */}
        <div className="flex justify-between items-center w-full px-4 xs:px-6 pt-2">
          {/* Bo (Monkey) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 1.2, -1.2, 0],
              }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseEnter={() => audioManager.play('hover')}
              onClick={() => audioManager.playReaction('bo')}
              className="hover:scale-110 active:scale-95 transition-transform duration-300 cursor-help pl-1"
              title={`${ANIMALS.bo.name}: ${ANIMALS.bo.tagline}`}
            >
              <AnimalFace
                id="bo"
                state="normal"
                className="w-[44px] h-[44px] xs:w-[50px] xs:h-[50px] select-none"
              />
            </motion.div>
          </motion.div>

          {/* Sly (Fox) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 1.2, -1.2, 0],
              }}
              transition={{
                duration: 5.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseEnter={() => audioManager.play('hover')}
              onClick={() => audioManager.playReaction('sly')}
              className="hover:scale-110 active:scale-95 transition-transform duration-300 cursor-help"
              title={`${ANIMALS.sly.name}: ${ANIMALS.sly.tagline}`}
            >
              <AnimalFace
                id="sly"
                state="normal"
                className="w-[44px] h-[44px] xs:w-[50px] xs:h-[50px] select-none"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Center content: Title, Subtitle, START button */}
        <div className="flex flex-col items-center justify-center text-center py-2 px-1 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center gap-5 xs:gap-6 select-none"
          >
            {/* Logo Heading */}
            <h1
              className="text-4.5xl xs:text-5.5xl font-hand font-bold tracking-wider text-[#3b2e2a] filter-sketch-text leading-none select-none"
              style={{ filter: 'url(#sketchy-text)' }}
            >
              NUMOOJI
            </h1>

            {/* Subtitle */}
            <p className="font-hand text-xs xs:text-sm text-[#78615a] tracking-wide font-medium leading-tight px-3 max-w-[200px] xs:max-w-[240px] select-none">
              fun numbers game with animal personalities
            </p>

            {/* START button */}
            <div className="w-full max-w-[130px] xs:max-w-[150px] mt-1">
              <motion.button
                id="start-button"
                onClick={onStartGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                onMouseEnter={() => audioManager.play('hover')}
              className="w-full h-10 xs:h-11 relative flex items-center justify-center font-hand text-base xs:text-lg font-bold bg-white text-[#3b2e2a] border-2 border-[#3b2e2a] cursor-pointer select-none rounded-[30px] filter-sketch-heavy double-sketch-container outline-none"
              >
                <span>START</span>
                <span className="absolute -left-1 w-2.5 h-4 border-l-2 border-[#3b2e2a] rounded-l-full opacity-60 pointer-events-none" />
                <span className="absolute -right-1 w-2.5 h-4 border-r-2 border-[#3b2e2a] rounded-r-full opacity-60 pointer-events-none" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Lower Row: Pig (Pibble) and Bear (Momo) */}
        <div className="flex justify-between items-center w-full px-4 xs:px-6 pb-2">
          {/* Pibble (Pig) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0 }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 1.2, -1.2, 0],
              }}
              transition={{
                duration: 5.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseEnter={() => audioManager.play('hover')}
              onClick={() => audioManager.playReaction('pibble')}
              className="hover:scale-110 active:scale-95 transition-transform duration-300 cursor-help"
              title={`${ANIMALS.pibble.name}: ${ANIMALS.pibble.tagline}`}
            >
              <AnimalFace
                id="pibble"
                state="normal"
                className="w-[44px] h-[44px] xs:w-[50px] xs:h-[50px] select-none"
              />
            </motion.div>
          </motion.div>

          {/* Momo (Bear) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 1.2, -1.2, 0],
              }}
              transition={{
                duration: 6.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseEnter={() => audioManager.play('hover')}
              onClick={() => audioManager.playReaction('momo')}
              className="hover:scale-110 active:scale-95 transition-transform duration-300 cursor-help"
              title={`${ANIMALS.momo.name}: ${ANIMALS.momo.tagline}`}
            >
              <AnimalFace
                id="momo"
                state="normal"
                className="w-[44px] h-[44px] xs:w-[50px] xs:h-[50px] select-none"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Cat Row: Centered above bottom navigation */}
        <div className="flex justify-center items-center w-full mt-2 mb-1">
          {/* Nori (Cat) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.7 }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 1.2, -1.2, 0],
              }}
              transition={{
                duration: 6.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseEnter={() => audioManager.play('hover')}
              onClick={() => audioManager.playReaction('nori')}
              className="hover:scale-110 active:scale-95 transition-transform duration-300 cursor-help"
              title={`${ANIMALS.nori.name}: ${ANIMALS.nori.tagline}`}
            >
              <AnimalFace
                id="nori"
                state="normal"
                className="w-[44px] h-[44px] xs:w-[50px] xs:h-[50px] select-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* TABLET / DESKTOP LAYOUT (>= 640px) */}
      <div className="hidden sm:flex relative items-center justify-center w-full max-w-2xl flex-grow my-auto">
        
        {/* Center Column with strict Flexbox formatting to prevent overlaps */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center gap-7 xs:gap-8 sm:gap-8 select-none"
          >
            {/* Logo Heading */}
            <h1
              className="text-5xl xs:text-5.5xl sm:text-7.5xl font-hand font-bold tracking-wider text-[#3b2e2a] filter-sketch-text leading-none select-none"
              style={{ filter: 'url(#sketchy-text)' }}
            >
              NUMOOJI
            </h1>

            {/* Subtitle */}
            <p className="font-hand text-sm xs:text-base sm:text-lg md:text-xl text-[#78615a] tracking-wide font-medium leading-tight px-3 max-w-[240px] xs:max-w-[260px] sm:max-w-md select-none">
              fun numbers game with animal personalities
            </p>

            {/* START button */}
            <div className="w-full max-w-[160px] xs:max-w-[180px] sm:max-w-[250px] mt-2">
              <motion.button
                id="start-button"
                onClick={onStartGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                onMouseEnter={() => audioManager.play('hover')}
              className="w-full h-11 xs:h-12 sm:h-14 relative flex items-center justify-center font-hand text-lg sm:text-2xl font-bold bg-white text-[#3b2e2a] border-2 border-[#3b2e2a] cursor-pointer select-none rounded-[30px] filter-sketch-heavy double-sketch-container outline-none"
              >
                <span>START</span>
                <span className="absolute -left-1 w-3 h-5 border-l-2 border-[#3b2e2a] rounded-l-full opacity-60 pointer-events-none" />
                <span className="absolute -right-1 w-3 h-5 border-r-2 border-[#3b2e2a] rounded-r-full opacity-60 pointer-events-none" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* The Animal Halo (surrounding Center Column) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 -translate-x-4 sm:-translate-x-6 -translate-y-6 xs:-translate-y-8 sm:-translate-y-12 md:-translate-y-14">
          {floatingAnimals.map((animal) => (
            <motion.div
              key={animal.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.95,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                delay: animal.delay,
              }}
              className="absolute pointer-events-auto"
              style={{
                left: `calc(50% + (${animal.mx} * var(--ring-radius)))`,
                top: `calc(50% + (${animal.my} * var(--ring-radius)))`,
                transform: `translate(-50%, -50%) scale(${animal.scale})`,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: 5 + animal.delay * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onMouseEnter={() => audioManager.play('hover')}
                onClick={() => audioManager.playReaction(animal.id)}
                className="hover:scale-110 active:scale-95 transition-transform duration-300 cursor-help"
                title={`${ANIMALS[animal.id].name}: ${ANIMALS[animal.id].tagline}`}
              >
                <AnimalFace
                  id={animal.id}
                  state="normal"
                  className="w-12 h-12 xs:w-14 xs:h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 select-none"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Unified Footer Controls & Decoration */}
      <div className="absolute bottom-6 xs:bottom-8 left-0 right-0 w-full flex items-center justify-between px-4 xs:px-6 sm:px-16 z-10 select-none gap-2 xs:gap-3 sm:gap-6">
        {/* Left: The Help (?) icon */}
        <button
          id="help-button"
          onMouseEnter={() => audioManager.play('hover')}
          onClick={onShowHelp}
          className="w-10 h-10 flex items-center justify-center bg-white border border-[#52443f] rounded-full filter-sketch text-[#52443f] hover:bg-[#faf4ec] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer shrink-0"
          title="How to Play"
        >
          <HelpCircle size={16} className="stroke-[2px]" />
        </button>

        {/* Left Decorative Line (shrinks on mobile, grows on desktop) */}
        <div className="flex-grow flex justify-center items-center min-w-0">
          <svg
            viewBox="0 0 160 30"
            className="w-full max-w-[40px] xs:max-w-[70px] sm:max-w-[120px] h-4 sm:h-6 text-[#5a4c46] opacity-50 filter-sketch"
          >
            <path
              d="M 10 15 Q 40 5, 80 15 T 150 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Center page number indicator */}
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-[#8c746c]/80 select-none bg-transparent whitespace-nowrap shrink-0 px-1 text-center">
          0123456789
        </span>

        {/* Right Decorative Line (shrinks on mobile, grows on desktop) */}
        <div className="flex-grow flex justify-center items-center min-w-0">
          <svg
            viewBox="0 0 160 30"
            className="w-full max-w-[40px] xs:max-w-[70px] sm:max-w-[120px] h-4 sm:h-6 text-[#5a4c46] opacity-50 filter-sketch"
          >
            <path
              d="M 10 15 Q 40 25, 80 15 T 150 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Right: The Sound icon */}
        <button
          id="sound-button"
          onMouseEnter={() => audioManager.play('hover')}
          onClick={onToggleMute}
          className="w-10 h-10 flex items-center justify-center bg-white border border-[#52443f] rounded-full filter-sketch text-[#52443f] hover:bg-[#faf4ec] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer shrink-0"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX size={16} className="stroke-[2px]" />
          ) : (
            <Volume2 size={16} className="stroke-[2px]" />
          )}
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimalFace } from './AnimalFace';
import { ANIMALS, AnimalId } from '../types';
import { ArrowLeft } from 'lucide-react';
import { FooterBar } from './FooterBar';
import { audioManager } from '../utils/audio';

interface CharacterSelectScreenProps {
  selectedId: AnimalId;
  onSelect: (id: AnimalId) => void;
  onConfirm: () => void;
  onBack: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onShowHelp: () => void;
}

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  selectedId,
  onSelect,
  onConfirm,
  onBack,
  isMuted,
  onToggleMute,
  onShowHelp,
}) => {
  const activeAnimal = ANIMALS[selectedId];

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] py-6 xs:py-8 px-4 sm:px-6 relative select-none">
      
      {/* Top Navigation */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0 z-10 px-2 sm:px-4 pb-2 sm:pb-0">
        {/* Lobby Button */}
        <div className="flex w-full sm:w-auto justify-center sm:justify-start">
          <button
            id="back-lobby-btn"
            onMouseEnter={() => audioManager.play('hover')}
            onClick={onBack}
            className="flex items-center gap-1.5 font-hand text-base sm:text-xl text-[#52443f] hover:text-[#d65a22]/80 transition-colors bg-white/40 px-3 py-1 rounded-full border border-transparent hover:border-[#52443f]/20 filter-sketch cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Lobby</span>
          </button>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mt-2 sm:mt-0 select-none">
          <span className="font-hand text-base xs:text-lg sm:text-2xl font-bold text-[#3b2e2a] tracking-wide whitespace-nowrap leading-none">
            choose your animal
          </span>
          <div className="flex items-center gap-1 mt-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#8c746c] animate-bounce"
            >
              {/* Little curly hand drawn down-arrow */}
              <path
                d="M12 4 C14 8, 10 13, 14 16 L11 18 L16 18 M12 18 L12 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Right side alignment balance spacer */}
        <div className="hidden sm:block w-24" />
      </div>

      {/* Grid containing the Character Cards */}
      <div className="w-full max-w-5xl my-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 justify-center pt-8 pb-4 xs:pt-10 xs:pb-6 sm:py-6 px-2">
        {Object.values(ANIMALS).map((animal) => {
          const isSelected = animal.id === selectedId;
          const config = animal;
          
          return (
            <motion.div
              id={`card-${animal.id}`}
              key={animal.id}
              whileHover={{ scale: isSelected ? 1.02 : 1.05, y: -4 }}
              onMouseEnter={() => audioManager.play('hover')}
              onClick={() => onSelect(animal.id)}
              className={`flex flex-col items-center justify-between p-3.5 sm:p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative select-none bg-white ${
                isSelected
                  ? `border-[#2d2522] double-sketch-container`
                  : 'border-[#dfd8cd] hover:border-[#91877b]'
              }`}
              style={{
                boxShadow: isSelected ? '4px 4px 0px 0px rgba(45,37,34,0.15)' : 'none',
                backgroundColor: isSelected ? config.theme.primary : '#ffffff',
              }}
            >
              {/* Highlight background shadow overlay for selected */}
              {isSelected && (
                <motion.div
                  layoutId="selectedIndicator"
                  className="absolute inset-0 border-2 rounded-2xl pointer-events-none opacity-40 filter-sketch-heavy"
                  style={{ borderColor: config.theme.border.split('-')[1] }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              )}

              {/* Animal Head */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                <AnimalFace
                  id={animal.id}
                  state={isSelected ? 'happy' : 'normal'}
                  className="w-full h-full select-none"
                />
              </div>

              {/* Animal Name & Details */}
              <div className="text-center w-full mt-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-hand text-xl sm:text-2xl font-bold text-[#3d2e27]">
                    {animal.name}
                  </h3>
                  <p className="font-hand text-sm text-[#7c6a61] antialiased leading-tight min-h-[36px] mt-1 line-clamp-2 px-1">
                    {animal.tagline}
                  </p>
                </div>

                {/* Dashed Separator */}
                <div className="my-2.5 border-b border-dashed border-[#d1c9bd] w-full" />

                {/* Passive Ability Blocks */}
                <div className="flex flex-col items-center justify-center">
                  <span className={`font-hand text-xs font-bold tracking-wider opacity-85 uppercase ${config.theme.accent}`}>
                    ability:
                  </span>
                  <p className="font-hand text-sm sm:text-base font-bold text-[#3d2e27] mt-0.5 leading-snug">
                    {animal.ability}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Play Button & Settings Row */}
      <div className="w-full flex flex-col items-center gap-6 mt-auto z-10">
        
        {/* Dynamic Theme Interactive Dialogue Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`px-6 py-2.5 rounded-xl border border-dashed text-center font-hand text-[#574843] max-w-sm w-full mx-auto select-none bg-[#ffffff]/60 filter-sketch ${activeAnimal.theme.border}`}
          >
            <span className="text-sm font-bold opacity-75 uppercase tracking-wider block mb-0.5">
              {activeAnimal.name} says:
            </span>
            <span className="text-md font-semibold italic">
              &ldquo;{activeAnimal.dialogues.start[0]}&rdquo;
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Styled Play button */}
        <motion.div
          className="w-full max-w-[240px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <motion.button
            id="play-button"
            onMouseEnter={() => audioManager.play('hover')}
            onClick={onConfirm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full h-14 relative flex items-center justify-center font-hand text-2xl font-bold cursor-pointer select-none rounded-[30px] filter-sketch-heavy double-sketch-container transition-all`}
            style={{
              backgroundColor: activeAnimal.theme.secondary,
              color: activeAnimal.theme.text.split('[')[1]?.replace(']', '') || '#3b2e2a',
              borderColor: '#2d2522',
              stroke: '#2d2522',
            }}
          >
            <span>PLAY</span>
            <span className="absolute -left-1 w-3 h-5 border-l-2 border-[#2d2522] rounded-l-full opacity-40 pointer-events-none" />
            <span className="absolute -right-1 w-3 h-5 border-r-2 border-[#2d2522] rounded-r-full opacity-40 pointer-events-none" />
          </motion.button>
        </motion.div>

        {/* Bottom Corner Buttons Dock - Reusable Unified FooterBar */}
        <FooterBar
          secretPowerText={`${activeAnimal.name}'s power: ${activeAnimal.abilityDesc}`}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onShowHelp={onShowHelp}
          accentClass={activeAnimal.theme.accent}
        />
      </div>
    </div>
  );
};

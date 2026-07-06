import React, { useState } from 'react';
import { ScreenState, AnimalId } from './types';
import { SketchyFilter } from './components/SketchyFilter';
import { HomeScreen } from './components/HomeScreen';
import { CharacterSelectScreen } from './components/CharacterSelectScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { HelpDialog } from './components/HelpDialog';
import { motion, AnimatePresence } from 'motion/react';
import { audioManager } from './utils/audio';

export default function App() {
  // Main states
  const [screen, setScreen] = useState<ScreenState>('HOME');
  const [selectedAnimalId, setSelectedAnimalId] = useState<AnimalId>('pibble');
  const [isMuted, setIsMuted] = useState<boolean>(audioManager.getMuted());
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Stats reports counters
  const [finalScore, setFinalScore] = useState<number>(0);
  const [finalStreak, setFinalStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // Sound triggers
  const playClickSound = () => {
    audioManager.play('click');
  };

  // State transitions
  const handleStartLobby = () => {
    playClickSound();
    setScreen('CHARACTER_SELECT');
  };

  const handleSelectAnimal = (id: AnimalId) => {
    audioManager.play('select');
    setSelectedAnimalId(id);
  };

  const handleConfirmCharacter = () => {
    playClickSound();
    setScreen('GAMEPLAY');
  };

  const handleGameWin = (score: number, streak: number, maxStr: number) => {
    setFinalScore(score);
    setFinalStreak(streak);
    setMaxStreak(maxStr);
    setScreen('WIN');
  };

  const handleGameLose = (score: number, streak: number, maxStr: number) => {
    setFinalScore(score);
    setFinalStreak(streak);
    setMaxStreak(maxStr);
    setScreen('LOSE');
  };

  const handleReplayActive = () => {
    audioManager.play('replay');
    // clear stats and go straight to play screen
    setScreen('GAMEPLAY');
  };

  const handleChangeCharacter = () => {
    playClickSound();
    setScreen('CHARACTER_SELECT');
  };

  const handleBackToLobby = () => {
    playClickSound();
    setScreen('HOME');
  };

  const toggleMuteSettings = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioManager.setMuted(nextMuted);
  };

  const openHelpManual = () => {
    playClickSound();
    setIsHelpOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#E5DDCB] flex items-center justify-center p-2 sm:p-4 select-none cursor-[#3b2e2a]_auto pencil-cursor">
      
      {/* SVG hand drawn filters definition list */}
      <SketchyFilter />

      {/* Main viewport sketchbook outline wrapper */}
      <div className="w-full max-w-5xl bg-[#FAF6EE] border-4 border-[#2d2522] rounded-[36px] filter-sketch-heavy shadow-2xl relative overflow-hidden paper-grain">
        
        {/* Double trace border accent for whole sketch window */}
        <div className="absolute inset-2 border-2 border-dashed border-[#dfd2be] rounded-[28px] pointer-events-none select-none filter-sketch" />

        {/* Small spine ring holes for cozy spiral draft sketch look on left margin */}
        <div className="absolute left-3 top-10 bottom-10 flex flex-col justify-around pointer-events-none opacity-40 z-30">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div
              key={num}
              className="w-3 h-3 bg-[#E5DDCB] border border-[#2d2522] rounded-full filter-sketch shrink-0"
              style={{ boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)' }}
            />
          ))}
        </div>

        {/* Dynamic Transition Canvas utilizing AnimatePresence */}
        <div className="pl-6 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative"
            >
              {screen === 'HOME' && (
                <HomeScreen
                  onStartGame={handleStartLobby}
                  isMuted={isMuted}
                  onToggleMute={toggleMuteSettings}
                  onShowHelp={openHelpManual}
                />
              )}

              {screen === 'CHARACTER_SELECT' && (
                <CharacterSelectScreen
                  selectedId={selectedAnimalId}
                  onSelect={handleSelectAnimal}
                  onConfirm={handleConfirmCharacter}
                  onBack={handleBackToLobby}
                  isMuted={isMuted}
                  onToggleMute={toggleMuteSettings}
                  onShowHelp={openHelpManual}
                />
              )}

              {screen === 'GAMEPLAY' && (
                <GameplayScreen
                  animalId={selectedAnimalId}
                  onGameWin={handleGameWin}
                  onGameLose={handleGameLose}
                  isMuted={isMuted}
                  onToggleMute={toggleMuteSettings}
                  onBackToLobby={handleBackToLobby}
                  onShowHelp={openHelpManual}
                />
              )}

              {(screen === 'WIN' || screen === 'LOSE') && (
                <GameOverScreen
                  status={screen}
                  animalId={selectedAnimalId}
                  finalScore={finalScore}
                  finalStreak={finalStreak}
                  maxStreak={maxStreak}
                  onPlayAgain={handleReplayActive}
                  onChangeCharacter={handleChangeCharacter}
                  isMuted={isMuted}
                  onToggleMute={toggleMuteSettings}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Rules explanations popup modal */}
      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

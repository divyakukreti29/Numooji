import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimalId, ANIMALS, MathQuestion, generateQuestion } from '../types';
import { AnimalFace } from './AnimalFace';
import { Flame, Clock, Sparkles, CornerDownLeft, Lightbulb, Heart } from 'lucide-react';
import { FooterBar } from './FooterBar';
import { audioManager } from '../utils/audio';

interface GameplayScreenProps {
  animalId: AnimalId;
  onGameWin: (finalScore: number, finalStreak: number, maxStreak: number) => void;
  onGameLose: (finalScore: number, finalStreak: number, maxStreak: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onBackToLobby: () => void;
  onShowHelp: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  animalId,
  onGameWin,
  onGameLose,
  isMuted,
  onToggleMute,
  onBackToLobby,
  onShowHelp,
}) => {
  const config = ANIMALS[animalId];
  
  // Game state variables
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [strikes, setStrikes] = useState(0); // 3 strikes you're out
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(config.gameplayParams.baseTimer);
  const [maxTime, setMaxTime] = useState(config.gameplayParams.baseTimer);
  
  // UI reaction states
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [wrongAnswersSelected, setWrongAnswersSelected] = useState<(number | string)[]>([]);
  const [bubbleText, setBubbleText] = useState(config.dialogues.start[0]);
  const [avatarState, setAvatarState] = useState<'normal' | 'happy' | 'panic' | 'sad'>('normal');
  const [isShaking, setIsShaking] = useState(false);
  
  // Ability-specific states
  const [hintUsedOnQuestion, setHintUsedOnQuestion] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<(number | string)[]>([]);
  const [noriHintUnlocked, setNoriHintUnlocked] = useState<boolean>(true);
  const [abilityFlashMessage, setAbilityFlashMessage] = useState<string | null>(null);
  const [scorePopup, setScorePopup] = useState<{ text: string; id: number } | null>(null);

  // Bo-specific tracking of panic sub-second phases
  const boPanicPhase = useRef<number>(0); // 0: none, 1: <3s, 2: <2s, 3: <1s

  // Targets: Solve 12 questions to Win the game!
  const TARGET_WINS = 12;

  // Sound placeholders (cozy audio synthesizer using Web Audio API to prevent heavy external files!)
  const playSynthesizedTone = (type: 'correct' | 'wrong' | 'click' | 'timeLow' | 'ability') => {
    if (isMuted) return;
    try {
      if (type === 'correct') {
        const nextStreak = streak + 1;
        if (nextStreak > 0 && nextStreak % 3 === 0) {
          audioManager.play('streak');
        } else {
          audioManager.play('correct');
        }
        
        // Cozy delayed character reaction sound
        setTimeout(() => {
          audioManager.playReaction(animalId as any);
        }, 300);

      } else if (type === 'wrong') {
        audioManager.play('wrong');
      } else if (type === 'click') {
        audioManager.play('click');
      } else if (type === 'timeLow') {
        if (animalId === 'bo') {
          audioManager.playReaction('bo'); // tick for Bo
        } else {
          audioManager.play('timerEnding'); // low timer bell
        }
      } else if (type === 'ability') {
        audioManager.playReaction(animalId as any);
      }
    } catch (e) {
      // Audio block catch
    }
  };

  // Generate initial question
  useEffect(() => {
    const q = generateQuestion(animalId, 0);
    setCurrentQuestion(q);
    boPanicPhase.current = 0;
    setNoriHintUnlocked(true);
    
    // Set proper max timer
    let initialTimer = config.gameplayParams.baseTimer;
    if (animalId === 'momo') {
      initialTimer = config.gameplayParams.baseTimer; // starts with +5s (defined as 16s in types)
    }
    setTimeLeft(initialTimer);
    setMaxTime(initialTimer);
  }, [animalId]);

  // Main active countdown handler
  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 0.1;
        const nextVal = Math.max(0, parseFloat(next.toFixed(1)));

        // Bo-specific custom low time progression
        if (animalId === 'bo') {
          if (nextVal < 1.0) {
            if (boPanicPhase.current < 3) {
              boPanicPhase.current = 3;
              setAvatarState('panic');
              setIsShaking(true);
              const funnySayings = [
                "MY BRAIN IS MELTING!",
                "SWEATING COCONUTS!",
                "I'M TOO YOUNG FOR THIS!",
                "OH GOSH OH GOSH!",
                "PANIC BURST ACTIVATE!!",
                "AAAAHHHHH!"
              ];
              setBubbleText(funnySayings[Math.floor(Math.random() * funnySayings.length)]);
              playSynthesizedTone('timeLow');
            }
          } else if (nextVal < 2.0) {
            if (boPanicPhase.current < 2) {
              boPanicPhase.current = 2;
              setAvatarState('panic');
              const middleSayings = [
                "AAAH! CHOOSE SOMETHING!",
                "I CAN'T THINK!",
                "THE TIME IS TICKING!"
              ];
              setBubbleText(middleSayings[Math.floor(Math.random() * middleSayings.length)]);
              playSynthesizedTone('timeLow');
            }
          } else if (nextVal < 3.0) {
            if (boPanicPhase.current < 1) {
              boPanicPhase.current = 1;
              playSynthesizedTone('timeLow');
            }
          }
        } else {
          // Standard characters low time panic threshold
          if (nextVal <= 3.5 && avatarState !== 'panic' && avatarState !== 'sad' && avatarState !== 'happy') {
            setAvatarState('panic');
            setBubbleText(config.dialogues.lowTime[Math.floor(Math.random() * config.dialogues.lowTime.length)]);
            playSynthesizedTone('timeLow');
          }
        }

        return nextVal;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft, avatarState]);

  // Handle Level Time Out
  const handleTimeOut = () => {
    playSynthesizedTone('wrong');
    setIsShaking(true);
    setStrikes((prev) => {
      const nextStrikes = prev + 1;
      if (nextStrikes >= 3) {
        audioManager.play('gameOverLose');
        setTimeout(() => {
          onGameLose(score, streak, maxStreak);
        }, 800);
      }
      return nextStrikes;
    });

    setStreak(0);
    setAvatarState('sad');
    setBubbleText(config.dialogues.wrong[Math.floor(Math.random() * config.dialogues.wrong.length)]);
    
    setTimeout(() => {
      setIsShaking(false);
      nextQuestion(0);
    }, 1000);
  };

  // Skip options / Trigger Hint
  const handleTriggerHint = () => {
    if (hintUsedOnQuestion || !currentQuestion) return;
    if (animalId === 'nori' && !noriHintUnlocked) return;

    playSynthesizedTone('ability');
    setHintUsedOnQuestion(true);
    
    if (animalId === 'nori') {
      setNoriHintUnlocked(false);
      
      const handwrittenMessages = [
        "Let's look closer.",
        "I noticed something.",
        "Here's a little clue."
      ];
      const selectedMsg = handwrittenMessages[Math.floor(Math.random() * handwrittenMessages.length)];
      
      // Randomly choose between eliminating one incorrect answer OR highlighting the clue/tip
      const isEliminate = Math.random() > 0.5;
      
      if (isEliminate) {
        // Eliminate one incorrect option
        const wrongChoices = currentQuestion.options.filter(opt => opt !== currentQuestion.answer && !disabledOptions.includes(opt));
        if (wrongChoices.length > 0) {
          const toDisable = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
          setDisabledOptions(prev => [...prev, toDisable]);
          setAbilityFlashMessage(`💡 "${selectedMsg}" (Ruled out: ${toDisable})`);
          setBubbleText(`"${selectedMsg} It is definitely not ${toDisable}!"`);
        } else {
          // Fallback if no wrong choice is available
          setAbilityFlashMessage(`💡 "${selectedMsg}"`);
          setBubbleText(`"${selectedMsg} Try looking at: ${currentQuestion.expressionTip || 'number patterns'}!"`);
        }
      } else {
        // Highlight one useful clue (show tip in speech bubble and flash)
        setAbilityFlashMessage(`💡 "${selectedMsg}"`);
        setBubbleText(`"${selectedMsg} Notice this clue: ${currentQuestion.expressionTip || 'number patterns'}!"`);
      }
      
      setTimeout(() => setAbilityFlashMessage(null), 3000);
    } else {
      // Fallback/Default character behavior
      const wrongChoices = currentQuestion.options.filter(opt => opt !== currentQuestion.answer);
      const toDisable = wrongChoices.sort(() => Math.random() - 0.5).slice(0, 2);
      setDisabledOptions(toDisable);
      setAbilityFlashMessage('Nori ruled out 2 option claw marks!');
      setTimeout(() => setAbilityFlashMessage(null), 2500);
    }
  };

  // Player clicks an Option
  const handleOptionSelect = (option: number) => {
    if (selectedAnswer !== null || currentQuestion === null || wrongAnswersSelected.includes(option)) return;

    if (option === currentQuestion.answer) {
      // CORRECT ANSWER
      playSynthesizedTone('correct');
      setSelectedAnswer(option);
      setAvatarState('happy');
      setIsShaking(false);
      setBubbleText(config.dialogues.correct[Math.floor(Math.random() * config.dialogues.correct.length)]);
      
      // Calculate score
      let calculatedPoints = Math.round(100 * config.gameplayParams.scoreFactor);
      
      // Special Ability 1: Bo - Panic Burst
      const isPanicBurstActive = animalId === 'bo' && timeLeft < 2.0;
      if (isPanicBurstActive) {
        const bonusPoints = 200;
        calculatedPoints += bonusPoints;
        
        const panicBurstSayings = [
          "HOW DID THAT WORK?!",
          "Pure panic power!",
          "Never doubted myself."
        ];
        const randomSaying = panicBurstSayings[Math.floor(Math.random() * panicBurstSayings.length)];
        
        setAbilityFlashMessage(`⚠️ PANIC BURST! +200 Bonus`);
        setBubbleText(randomSaying);
        playSynthesizedTone('ability');
        setTimeout(() => setAbilityFlashMessage(null), 2500);
      }

      // Special Ability 2: Pibble - Chaos bonus streak threshold
      const nextStreak = streak + 1;
      const isChaosActive = animalId === 'pibble' && nextStreak % 3 === 0;
      if (isChaosActive) {
        const bonusPoints = [50, 100, 150][Math.floor(Math.random() * 3)];
        calculatedPoints += bonusPoints;
        setAbilityFlashMessage(`✨ Pibble Chaos Bonus: +${bonusPoints} pts!`);
        playSynthesizedTone('ability');
        setTimeout(() => setAbilityFlashMessage(null), 2000);
      }

      setScore((prev) => prev + calculatedPoints);
      
      const popupText = isPanicBurstActive 
        ? `+${calculatedPoints} (+200 Panic Bonus!)` 
        : `+${calculatedPoints}`;
      setScorePopup({ text: popupText, id: Date.now() });
      setTimeout(() => setScorePopup(null), 1200);

      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      
      setSolvedCount((prev) => {
        const nextSolved = prev + 1;
        if (nextSolved >= TARGET_WINS) {
          audioManager.play('gameOverWin');
          setTimeout(() => {
            onGameWin(score + calculatedPoints, nextStreak, Math.max(nextStreak, maxStreak));
          }, 1100);
        }
        return nextSolved;
      });

      // Special Ability 3: Sly - Sharp Instinct (adds time reward)
      let timeReward = 0;
      if (animalId === 'sly') {
        if (nextStreak > 0 && nextStreak % 3 === 0) {
          timeReward = 3.0;
          const messages = [
            "I found the pattern.",
            "Too easy.",
            "I saw that coming.",
            "Every clue matters."
          ];
          const msg = messages[Math.floor(Math.random() * messages.length)];
          setAbilityFlashMessage(`🦊 Sharp Instinct: +3s! "${msg}"`);
          playSynthesizedTone('ability');
          setTimeout(() => setAbilityFlashMessage(null), 2500);
        }
      } else if (animalId === 'momo') {
        // Every time the player answers 3 questions correctly in a row, add +5 seconds
        if (nextStreak > 0 && nextStreak % 3 === 0) {
          timeReward = 5.0;
          const msg = Math.random() > 0.5 ? "Slow and steady." : "Take your time.";
          setAbilityFlashMessage(`🐻 Steady Mind: +5s! "${msg}"`);
          playSynthesizedTone('ability');
          setTimeout(() => setAbilityFlashMessage(null), 2500);
        }
      } else if (animalId === 'nori') {
        // Every time the player answers 3 questions correctly in a row, unlock a new hint
        if (nextStreak > 0 && nextStreak % 3 === 0) {
          setNoriHintUnlocked(true);
          const unlockSayings = [
            "A new clue appeared!",
            "I noticed another pattern!",
            "My curiosity is tingling!"
          ];
          const saying = unlockSayings[Math.floor(Math.random() * unlockSayings.length)];
          setAbilityFlashMessage(`💡 Hint unlocked! "${saying}"`);
          playSynthesizedTone('ability');
          setTimeout(() => setAbilityFlashMessage(null), 2500);
        }
      }

      setTimeout(() => {
        nextQuestion(nextStreak, timeReward);
      }, 1000);

    } else {
      // WRONG ANSWER
      playSynthesizedTone('wrong');
      setIsShaking(true);
      setWrongAnswersSelected((prev) => [...prev, option]);
      setStreak(0);
      setAvatarState('sad');
      setBubbleText(config.dialogues.wrong[Math.floor(Math.random() * config.dialogues.wrong.length)]);
      
      setStrikes((prev) => {
        const nextStrikes = prev + 1;
        if (nextStrikes >= 3) {
          audioManager.play('gameOverLose');
          setTimeout(() => {
            onGameLose(score, 0, maxStreak);
          }, 1000);
        }
        return nextStrikes;
      });

      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  // Proceed to next equation question
  const nextQuestion = (currentStreak: number, extraTimeBonus = 0) => {
    setSelectedAnswer(null);
    setWrongAnswersSelected([]);
    setHintUsedOnQuestion(false);
    setDisabledOptions([]);
    setAvatarState('normal');
    setIsShaking(false);
    boPanicPhase.current = 0;
    
    // Choose randomly from standard dialogs
    setBubbleText(config.dialogues.start[Math.floor(Math.random() * config.dialogues.start.length)]);

    const q = generateQuestion(animalId, currentStreak);
    setCurrentQuestion(q);

    // Dynamic timer based on streak/difficulty
    let baseTime = config.gameplayParams.baseTimer;
    // Compress timer slightly at high streaks to maintain challenge (except Momo, Bo, and Nori)
    if (animalId !== 'momo' && animalId !== 'bo' && animalId !== 'nori') {
      const compression = Math.min(currentStreak * 0.15, 3.5);
      baseTime = Math.max(5.5, baseTime - compression);
    }

    const targetTimerVal = parseFloat((baseTime + extraTimeBonus).toFixed(1));
    setTimeLeft(targetTimerVal);
    setMaxTime(targetTimerVal);
  };

  if (!currentQuestion) return null;

  return (
    <div className={`flex flex-col items-center h-[82vh] md:h-[650px] min-h-[500px] max-h-[720px] py-1.5 sm:py-3.5 px-3 sm:px-6 select-none relative ${isShaking ? 'animate-shaky' : ''}`}>
      
      {/* Decorative math background tokens */}
      <div className="absolute inset-x-0 top-36 bottom-24 pointer-events-none opacity-[0.08] select-none text-[#5a4840]">
        <span className="absolute left-6 top-6 text-3xl font-hand">2 + 2 = 4</span>
        <span className="absolute right-10 top-12 text-[#db7a95] text-5xl font-hand">⭐</span>
        <span className="absolute left-12 bottom-6 text-5xl font-hand text-[#c26b38]">S</span>
        <span className="absolute right-8 bottom-16 text-3.5xl font-hand">15 × 8</span>
        <span className="absolute left-1/3 top-4 text-6xl font-hand">?</span>
      </div>

      {/* Floating dynamic ability notification overlay */}
      <AnimatePresence>
        {abilityFlashMessage && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -10 }}
            className="absolute top-26 z-40 bg-[#FAF6EE] border-2 border-[#2d2522] rounded-xl px-4 py-2 font-hand text-lg font-bold text-[#3a2c26] filter-sketch flex items-center gap-2"
            style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.1)' }}
          >
            <Sparkles className="text-[#e07a2e]" size={18} />
            <span>{abilityFlashMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: FIXED HEADER */}
      <div className="w-full flex-none flex flex-col items-center gap-1.5 sm:gap-2.5 z-20">
        {/* Top Banner Panels - Unified Responsive Structure */}
        <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 px-2">
          
          {/* Left: User Info & Strikes Group */}
          <div className="flex items-center gap-2 w-full xs:w-auto justify-between xs:justify-start">
            {/* User Info */}
            <div className="flex items-center gap-2 bg-white/40 p-1.5 rounded-xl border border-dashed border-[#e6decb]">
              <div className="w-10 h-10 flex items-center justify-center p-0.5 relative shrink-0">
                <AnimalFace id={animalId} state={avatarState} className="w-9 h-9" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <div className="font-hand font-bold text-sm text-[#3b2c26] flex items-center gap-1 leading-none">
                  <span>{config.name}</span>
                  <span className={`px-1 py-0.5 rounded text-[8px] tracking-wider uppercase font-bold leading-none ${config.theme.badge}`}>
                    {config.ability}
                  </span>
                </div>
                <p className="font-hand text-[10px] text-[#7e6b62] mt-0.5 line-clamp-1 italic leading-none hidden sm:block">
                  {config.tagline}
                </p>
              </div>
            </div>

            {/* Solved / Strikes Panel */}
            <div className="flex items-center gap-3 bg-white/50 px-3 py-1.5 rounded-xl border border-[#2d2522] filter-sketch">
              <div className="flex flex-col text-center">
                <span className="font-hand text-[8px] uppercase font-bold text-[#81726a] tracking-wider leading-none">Solving</span>
                <span className="font-hand text-sm font-bold text-[#3b2c26] tracking-wide leading-none mt-1">{solvedCount} / {TARGET_WINS}</span>
              </div>

              <div className="h-4 w-px bg-[#dcd2be]" />

              <div className="flex flex-col">
                <span className="font-hand text-[8px] uppercase font-bold text-[#81726a] tracking-wider text-center leading-none">Strikes</span>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[0, 1, 2].map((idx) => {
                    const isStruck = idx < strikes;
                    return (
                      <motion.div
                        key={idx}
                        animate={isStruck ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          size={12}
                          className={isStruck ? 'fill-[#e63946] stroke-[#e63946]' : 'fill-[#eedfd4] stroke-[#c0b0a2]'}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats Board (Score & Streak) */}
          <div className="flex gap-2 items-center w-full xs:w-auto justify-between xs:justify-end">
            {/* Score panel */}
            <div className="flex-1 xs:flex-initial flex flex-col items-center justify-center bg-white border border-[#2d2522] rounded-xl px-3 py-1 filter-sketch relative min-w-[70px] sm:min-w-[80px]" style={{ boxShadow: '1.5px 1.5px 0px 0px rgba(0,0,0,0.1)' }}>
              <span className="font-hand text-[8px] sm:text-[10px] font-bold text-[#c26b38] leading-none tracking-wider uppercase mb-0.5">SCORE</span>
              <span className="font-hand text-lg sm:text-xl font-extrabold text-[#3b2c26] leading-none">
                {score}
              </span>
              <AnimatePresence>
                {scorePopup && (
                  <motion.div
                    key={scorePopup.id}
                    initial={{ opacity: 0, y: 10, scale: 0.5 }}
                    animate={{ opacity: 1, y: -25, scale: [1, 1.2, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-6 text-xs sm:text-sm font-hand font-extrabold text-emerald-600 bg-white border border-[#2d2522] rounded-md px-1.5 py-0.5 filter-sketch shadow-sm pointer-events-none whitespace-nowrap z-50"
                  >
                    {scorePopup.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Streak indicator */}
            <div className="flex-1 xs:flex-initial flex items-center justify-center gap-1.5 bg-white border border-[#2d2522] filter-sketch rounded-xl px-2.5 py-1">
              <Flame className={`fill-[#ff5a00] stroke-[#ff5a00] ${streak > 0 ? 'animate-bounce' : 'opacity-40 text-gray-400'}`} size={14} />
              <div className="flex flex-col text-left">
                <span className="font-hand text-[8px] font-bold text-[#78615a] uppercase leading-none">Streak</span>
                <span className="font-hand text-sm sm:text-base font-bold text-[#3b2c26] leading-none mt-0.5">x{streak}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Progressbar Timer Slider */}
        <div className="w-full max-w-xl flex items-center gap-3 px-2 relative z-10">
          <span className="font-hand text-[10px] sm:text-xs text-[#8c7a72] italic font-semibold shrink-0">
            think fast, little genius
          </span>
          
          {/* Timer bar chassis */}
          <div className="flex-grow h-3.5 bg-white border border-[#2d2522] rounded-full filter-sketch flex items-center p-0.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: animalId === 'bo' && timeLeft < 2.0 ? '#ef4444' : animalId === 'bo' && timeLeft < 3.0 ? '#fb923c' : config.theme.secondary,
                width: `${(timeLeft / maxTime) * 100}%`,
              }}
              animate={{ 
                width: `${(timeLeft / maxTime) * 100}%`,
                backgroundColor: animalId === 'bo' && timeLeft < 2.0 ? '#ef4444' : animalId === 'bo' && timeLeft < 3.0 ? '#fb923c' : config.theme.secondary
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          <motion.div 
            className="flex items-center gap-1 shrink-0 bg-white border border-[#2d2522] rounded-lg px-2 py-0.5 filter-sketch"
            animate={animalId === 'bo' && timeLeft < 2.0 && timeLeft > 0 ? { scale: [1, 1.15, 1] } : {}}
            transition={animalId === 'bo' && timeLeft < 2.0 && timeLeft > 0 ? { repeat: Infinity, duration: 0.5 } : {}}
          >
            <Clock size={12} className={`stroke-[2.5px] ${animalId === 'bo' && timeLeft < 2.0 && timeLeft > 0 ? 'text-red-500' : 'text-[#5c4940]'}`} />
            <span className={`font-comic text-[10px] sm:text-xs font-bold ${animalId === 'bo' && timeLeft < 2.0 && timeLeft > 0 ? 'text-red-600' : 'text-[#5c4940]'}`}>
              {timeLeft.toFixed(1).padStart(4, '0')}s
            </span>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: FLEXIBLE GAMEPLAY AREA */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto py-1 sm:py-2.5 custom-scrollbar relative z-10 flex flex-col">
        <div className="w-full max-w-xl mx-auto flex flex-col justify-between gap-3 sm:gap-4 my-auto px-2">
          
          {/* Core Math Equation Display Grid */}
          <div className="w-full py-1 sm:py-2 relative select-none">
            {/* Major question box */}
            <motion.div
              key={currentQuestion.equation}
              initial={{ rotate: -1.5, scale: 0.96, opacity: 0 }}
              animate={{ rotate: 0.5, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 11 }}
              className="bg-white border-2 border-[#2d2522] rounded-3xl p-4 sm:p-5 md:p-6 text-center relative filter-sketch-heavy double-sketch-container select-none mb-3 sm:mb-4"
              style={{ boxShadow: '4px 4px 0px 0px rgba(45,37,34,0.1)' }}
            >
              {/* Sparkly corner brackets for fun aesthetic */}
              <span className="absolute left-4 top-3 text-[#dcd2be] text-sm sm:text-xl font-bold font-hand select-none">( &apos;.&apos; )</span>
              <span className="absolute right-4 top-3 text-[#dcd2be] text-sm sm:text-xl font-bold font-hand select-none">~ ( &apos;.&apos; )</span>

              {/* Actual Equation Numbers */}
              <h2 className="text-2.5xl sm:text-3.5xl md:text-4xl font-hand font-extrabold text-[#281e1a] tracking-wide my-1.5 sm:my-2 select-text whitespace-pre-line">
                {currentQuestion.equation.includes('=') || currentQuestion.equation.includes('?') ? currentQuestion.equation : `${currentQuestion.equation} = ?`}
              </h2>

              <div className="font-hand text-xs sm:text-sm text-[#8a7267] tracking-wider italic flex items-center justify-center gap-1">
                <span>you got this ({currentQuestion.expressionTip})</span>
              </div>
            </motion.div>

            {/* 2x2 Multiple choices block */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 select-none">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selectedAnswer !== null && opt === selectedAnswer;
                const isWrong = wrongAnswersSelected.includes(opt);
                const isDisabled = disabledOptions.includes(opt);
                
                let btnBgColor = '#ffffff'; // standard background
                let textColor = '#3b2e2a';
                let borderStroke = 'border-[#2d2522]';

                if (isSelected) {
                  btnBgColor = config.theme.secondary;
                  const textColorHex = config.theme.text.match(/#\w+/)?.[0] || '#3b2e2a';
                  textColor = textColorHex;
                } else if (isWrong) {
                  btnBgColor = '#fcd5d5'; // red wrong marker
                  textColor = '#9d1f1f';
                  borderStroke = 'border-[#c53030]';
                } else if (isDisabled) {
                  btnBgColor = '#f3f1ed';
                  textColor = '#dcd2be';
                }

                return (
                  <motion.button
                    id={`option-btn-${opt}`}
                    key={opt}
                    disabled={selectedAnswer !== null || isWrong || isDisabled}
                    whileHover={selectedAnswer === null && !isWrong && !isDisabled ? { scale: 1.03, y: -2 } : {}}
                    whileTap={selectedAnswer === null && !isWrong && !isDisabled ? { scale: 0.97 } : {}}
                    onMouseEnter={() => selectedAnswer === null && !isWrong && !isDisabled && audioManager.play('hover')}
                    onClick={() => handleOptionSelect(opt)}
                    className={`py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-hand text-base sm:text-xl md:text-2xl font-black border-2 text-center transition-all cursor-pointer flex items-center justify-center filter-sketch outline-none select-none ${borderStroke} ${
                      isDisabled ? 'opacity-30 cursor-not-allowed select-none line-through' : ''
                    }`}
                    style={{
                      backgroundColor: btnBgColor,
                      color: textColor,
                      boxShadow: !isDisabled && !isWrong ? '2px 2px 0px 0px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    <span>{opt}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Interactive Bottom Bubble Speak Layout - Unified Row View */}
          <div className="w-full flex flex-row items-center sm:items-end gap-2.5 sm:gap-3 select-none">
            
            {/* Speaking Animal visual avatar */}
            <div className="flex sm:flex-col items-center gap-2">
              <motion.div
                className="w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 shrink-0 relative flex items-center justify-center"
                animate={avatarState === 'happy' ? { scale: [1, 1.12, 1], rotate: [0, 8, -8, 0] } : {}}
              >
                <AnimalFace id={animalId} state={avatarState} className="w-full h-full" />
                
                {/* Custom mini outline overlay */}
                <span className="hidden sm:inline absolute bottom-1 right-1 text-[#2d2522] text-[9px] font-hand opacity-50 select-none">Moji</span>
              </motion.div>
            </div>

            {/* Hand-drawn bubble box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={bubbleText}
                initial={{ scale: 0.8, opacity: 0, x: -10 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: 5 }}
                className="flex-grow bg-white border border-[#2d2522] p-2 sm:p-3 rounded-2xl relative select-none filter-sketch"
              >
                {/* Tail bubble design pointing left to avatar */}
                <div className="absolute -left-[6px] top-3 sm:top-4.5 rotate-45 w-3 h-3 bg-white border-l border-t border-[#2d2522]" />
                
                <p className="font-hand text-sm sm:text-base font-semibold text-[#483730] leading-snug">
                  &ldquo;{bubbleText}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Ability control button on right edge */}
            <div className="shrink-0 flex items-center justify-center">
              {animalId === 'nori' ? (
                <button
                  id="nori-hint-btn"
                  onMouseEnter={() => !hintUsedOnQuestion && noriHintUnlocked && selectedAnswer === null && audioManager.play('hover')}
                  onClick={handleTriggerHint}
                  disabled={hintUsedOnQuestion || !noriHintUnlocked || selectedAnswer !== null}
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#2d2522] bg-[#FAF6EE] flex flex-col items-center justify-center filter-sketch text-[#2D2E54] hover:bg-[#eaeef6] hover:scale-105 active:scale-95 transition-transform shrink-0 relative cursor-pointer ${
                    hintUsedOnQuestion || !noriHintUnlocked ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                  title="Activate Curious Hint"
                >
                  <Lightbulb size={16} className={hintUsedOnQuestion || !noriHintUnlocked ? 'text-gray-400' : 'text-[#e0922f] animate-pulse'} />
                  <span className="font-hand text-[8px] sm:text-[9px] font-bold tracking-tight leading-none mt-0.5 sm:mt-1">
                    {noriHintUnlocked ? 'HINT' : 'LOCKED'}
                  </span>
                  {/* Scratch mark marker */}
                  {(hintUsedOnQuestion || !noriHintUnlocked) && (
                    <div className="absolute inset-0 bg-[#f4ece3]/40 flex items-center justify-center rounded-full">
                      <span className="text-[#5A5A8F] font-bold font-hand text-xs">X</span>
                    </div>
                  )}
                </button>
              ) : (
                // Static active ability status badge for passive skills
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-dashed border-[#2d2522] bg-[#ffffff]/60 flex flex-col items-center justify-center text-center filter-sketch shrink-0 select-none">
                  <Sparkles size={14} className={streak >= 3 ? 'text-amber-500' : 'text-gray-400'} />
                  <span className="font-hand text-[7px] sm:text-[9px] font-black leading-none mt-0.5 sm:mt-1 uppercase text-[#3a2c26]">
                    {config.ability.split(' ')[0]}
                  </span>
                  <span className="hidden sm:inline font-hand text-[8px] font-bold text-[#8a7a72] leading-none mt-0.5 uppercase">
                    Active
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Abandon Run / Engine version helper row right above footer */}
          <div className="w-full flex justify-between items-center px-2 mt-1 sm:mt-2">
            <button
              id="back-lobby-from-play"
              onMouseEnter={() => audioManager.play('hover')}
              onClick={onBackToLobby}
              className="font-hand text-xs sm:text-sm text-[#8c7a72] hover:text-[#52443f] bg-white/30 px-2.5 py-1 rounded-lg border border-[#e2dcd0] filter-sketch hover:bg-white transition-all cursor-pointer"
            >
              Abandon Run
            </button>

            <span className="font-hand text-[10px] sm:text-xs text-[#a09085]/75 select-none font-medium">
              NUMOOJI Math Engine v1.0
            </span>
          </div>

        </div>
      </div>

      {/* SECTION 3: FIXED FOOTER */}
      <div className="w-full flex-none mt-auto">
        <FooterBar
          secretPowerText={`${config.name}'s power: ${config.abilityDesc}`}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onShowHelp={onShowHelp}
          accentClass={config.theme.accent}
        />
      </div>

    </div>
  );
};

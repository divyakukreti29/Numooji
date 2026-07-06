import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, Trophy, Zap, Heart, Clock } from 'lucide-react';
import { ANIMALS } from '../types';
import { AnimalFace } from './AnimalFace';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop screen grey overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2d2522]"
          />

          {/* Modal layout body */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-[#FAF6EE] border-2 border-[#2d2522] rounded-[28px] p-6 max-w-lg w-full relative z-10 filter-sketch-heavy double-sketch-container overflow-y-auto max-h-[90vh]"
            style={{ boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.15)' }}
          >
            {/* Header section with X close button */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-dashed border-[#dfd2be]">
              <div className="flex items-center gap-1.5 text-[#3d2c25]">
                <HelpCircle className="stroke-[2.5px] w-6 h-6 text-[#c26b38]" />
                <h3 className="font-hand text-2xl font-bold">How to Play Numooji</h3>
              </div>
              
              <button
                id="close-help-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#2d2522] flex items-center justify-center bg-white hover:bg-red-50 text-[#2d2522] hover:text-red-500 filter-sketch"
                title="Close"
              >
                <X size={14} className="stroke-[2.5px]" />
              </button>
            </div>

            {/* Rules guidelines list */}
            <div className="space-y-4 font-hand text-base text-[#54433b] leading-relaxed">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div className="bg-white border border-[#2d2522] filter-sketch p-3 rounded-xl">
                  <div className="flex items-center gap-1 text-[#a27b5c] font-black uppercase text-xs mb-1">
                    <Trophy size={14} />
                    <span>Level Goal</span>
                  </div>
                  <p className="text-sm">
                    Solve exactly <strong>12 math equations</strong> correctly to clear the stage and claim your wild crown!
                  </p>
                </div>

                <div className="bg-white border border-[#2d2522] filter-sketch p-3 rounded-xl">
                  <div className="flex items-center gap-1 text-[#e63946] font-black uppercase text-xs mb-1">
                    <Heart size={14} className="fill-[#e63946]" />
                    <span>3 Strikes rule</span>
                  </div>
                  <p className="text-sm">
                    Be careful! Answering incorrectly or letting the timer countdown to zero counts as <strong>1 strike</strong>. 3 strikes and the run fails!
                  </p>
                </div>
              </div>

              {/* Special abilities details section */}
              <div>
                <div className="flex items-center gap-1 text-[#2d734c] font-black uppercase text-xs mb-2 tracking-wide">
                  <Zap size={14} className="fill-emerald-500 text-emerald-500" />
                  <span>Choose Your Animal Ability</span>
                </div>

                <div className="space-y-2.5">
                  {Object.values(ANIMALS).map((animal) => (
                    <div
                      key={animal.id}
                      className="bg-white border border-dashed border-[#dfd2be] hover:border-[#9c8477] p-2.5 px-3 rounded-xl flex items-center gap-3"
                    >
                      {/* Round tiny icon indicator */}
                      <div className="w-9 h-9 shrink-0 flex items-center justify-center p-0.5">
                        <AnimalFace id={animal.id} state="normal" className="w-full h-full" />
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#3d2c25]">{animal.name}</span>
                          <span className={`px-1 rounded text-[9px] uppercase font-bold tracking-wider leading-none ${animal.theme.badge}`}>
                            {animal.ability}
                          </span>
                        </div>
                        <p className="text-xs text-[#7e6d63] mt-0.5 leading-snug">
                          {animal.abilityDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra game tip block */}
              <div className="bg-[#FAF5ED] border border-[#2d2522] filter-sketch p-3 rounded-xl text-center text-sm italic font-semibold text-[#8c746c]">
                👉 Tip: Watch the timer carefully! Bo&apos;s Panic Boost gives massive score rewards specifically in the critical final seconds!
              </div>
            </div>

            {/* Back action close trigger widget */}
            <div className="mt-5 text-center">
              <button
                id="close-help-text-btn"
                onClick={onClose}
                className="px-6 py-2 bg-[#dfbe9f] border border-[#2d2522] rounded-xl font-hand uppercase text-base font-bold text-[#3d2c25] filter-sketch cursor-pointer hover:bg-[#d9b18c] active:scale-95 transition-all outline-none"
              >
                Let&apos;s Play!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

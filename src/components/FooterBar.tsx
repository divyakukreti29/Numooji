import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface FooterBarProps {
  secretPowerText: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onShowHelp: () => void;
  accentColor?: string; // Optional accent color (e.g. hex code)
  accentClass?: string; // Optional accent Tailwind class (e.g. "text-pink-600")
}

export const FooterBar: React.FC<FooterBarProps> = ({
  secretPowerText,
  isMuted,
  onToggleMute,
  onShowHelp,
  accentColor,
  accentClass,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2 mt-auto select-none gap-2 z-20">
      {/* Left Column: Fixed Width Help Button */}
      <div className="w-10 h-10 flex-none flex items-center justify-start">
        <button
          id="help-footer-btn"
          onMouseEnter={() => audioManager.play('hover')}
          onClick={onShowHelp}
          className="w-10 h-10 flex items-center justify-center bg-white border border-[#52443f] rounded-full filter-sketch text-[#52443f] hover:bg-[#faf4ec] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer"
          title="How to Play"
        >
          {/* A perfectly centered single-outline handwritten question mark */}
          <span className="font-hand font-extrabold text-xl sm:text-2xl mt-0.5 leading-none select-none">
            ?
          </span>
        </button>
      </div>

      {/* Center Column: Flexible Width with Wavy Decorative Lines and Wrapping Secret Power Text */}
      <div className="flex-grow flex items-center justify-center gap-2 sm:gap-4 min-w-0">
        {/* Left Decorative Line (Wavy notebook curve) */}
        <div className="flex-none flex items-center justify-center">
          <svg
            viewBox="0 0 160 30"
            className="w-8 sm:w-16 h-3 sm:h-5 text-[#5a4c46] opacity-30 filter-sketch"
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

        {/* Flexible Wrapping Center Text */}
        <p className="font-hand text-xs sm:text-sm text-[#8c7a72] text-center select-none leading-normal break-words max-w-[160px] xs:max-w-[240px] sm:max-w-sm">
          {(() => {
            const colonIndex = secretPowerText.indexOf(':');
            if (colonIndex !== -1) {
              const prefix = secretPowerText.substring(0, colonIndex + 1);
              const suffix = secretPowerText.substring(colonIndex + 1);
              return (
                <>
                  <span
                    className={`font-bold tracking-wide mr-1 ${accentClass || ''}`}
                    style={accentColor ? { color: accentColor } : undefined}
                  >
                    {prefix}
                  </span>
                  {suffix}
                </>
              );
            }
            return secretPowerText;
          })()}
        </p>

        {/* Right Decorative Line (Wavy notebook curve) */}
        <div className="flex-none flex items-center justify-center">
          <svg
            viewBox="0 0 160 30"
            className="w-8 sm:w-16 h-3 sm:h-5 text-[#5a4c46] opacity-30 filter-sketch"
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
      </div>

      {/* Right Column: Fixed Width Sound Button */}
      <div className="w-10 h-10 flex-none flex items-center justify-end">
        <button
          id="sound-footer-btn"
          onMouseEnter={() => audioManager.play('hover')}
          onClick={onToggleMute}
          className="w-10 h-10 flex items-center justify-center bg-white border border-[#52443f] rounded-full filter-sketch text-[#52443f] hover:bg-[#faf4ec] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer"
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

import React from 'react';
import { AnimalId } from '../types';

interface AnimalFaceProps {
  id: AnimalId;
  state?: 'normal' | 'happy' | 'panic' | 'sad';
  className?: string;
  onClick?: () => void;
}

export const AnimalFace: React.FC<AnimalFaceProps> = ({
  id,
  state = 'normal',
  className = 'w-24 h-24',
  onClick,
}) => {
  // Define active animation classes based on state
  let stateClasses = '';
  if (state === 'panic') {
    stateClasses = 'animate-pulse scale-95 duration-150';
  } else if (state === 'happy') {
    stateClasses = 'scale-105 rotate-2 duration-300';
  } else if (state === 'sad') {
    stateClasses = 'opacity-85 scale-95 -rotate-2 duration-300';
  }

  // Render highly-polished hand-drawn interactive SVGs matching the attached images
  const renderSVG = () => {
    switch (id) {
      case 'pibble': // Pig with round glasses & curly q on top
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 45,108 C 40,65 72,40 102,40 C 132,40 160,58 155,108 C 150,154 128,168 100,168 C 72,168 50,150 45,108 Z" fill="#ffccd5" stroke="#3b2e2a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Ears */}
            <path d="M 50,48 L 22,25 C 20,23 35,45 42,60 Z" fill="#ffccd5" stroke="#3b2e2a" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 150,48 L 178,25 C 180,23 165,45 158,60 Z" fill="#ffccd5" stroke="#3b2e2a" strokeWidth="3" strokeLinejoin="round" />
            {/* Inner ear pink */}
            <path d="M 46,50 L 30,34 C 34,44 40,52 42,56 Z" fill="#ff99ac" />
            <path d="M 154,50 L 170,34 C 166,44 160,52 158,56 Z" fill="#ff99ac" />

            {/* Blush Cheeks */}
            <circle cx="58" cy="122" r="14" fill="#ff99ab" opacity="0.6" filter="url(#glow-blur)" />
            <circle cx="142" cy="122" r="14" fill="#ff99ab" opacity="0.6" filter="url(#glow-blur)" />

            {/* Snout */}
            <rect x="74" y="105" width="52" height="38" rx="19" fill="#ffaab9" stroke="#3b2e2a" strokeWidth="3" />
            {/* Nostrils */}
            <ellipse cx="88" cy="124" rx="4" ry="7" fill="#3b2e2a" />
            <ellipse cx="112" cy="124" rx="4" ry="7" fill="#3b2e2a" />

            {/* Eyes based on state */}
            {state === 'happy' ? (
              <>
                <path d="M 54,88 Q 68,72 82,88" stroke="#3b2e2a" strokeWidth="4" strokeLinecap="round" />
                <path d="M 118,88 Q 132,72 146,88" stroke="#3b2e2a" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : state === 'sad' ? (
              <>
                <path d="M 54,80 Q 68,96 82,80" stroke="#3b2e2a" strokeWidth="4" strokeLinecap="round" />
                <path d="M 118,80 Q 132,96 146,80" stroke="#3b2e2a" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : state === 'panic' ? (
              <>
                <circle cx="68" cy="84" r="16" fill="#ffffff" stroke="#3b2e2a" strokeWidth="3" />
                <circle cx="68" cy="84" r="3" fill="#3b2e2a" />
                <circle cx="132" cy="84" r="16" fill="#ffffff" stroke="#3b2e2a" strokeWidth="3" />
                <circle cx="132" cy="84" r="3" fill="#3b2e2a" />
              </>
            ) : (
              <>
                <circle cx="68" cy="84" r="16" fill="#ffffff" stroke="#3b2e2a" strokeWidth="3" />
                <circle cx="68" cy="84" r="6" fill="#3b2e2a" />
                <circle cx="66" cy="81" r="2" fill="#ffffff" />
                <circle cx="132" cy="84" r="16" fill="#ffffff" stroke="#3b2e2a" strokeWidth="3" />
                <circle cx="132" cy="84" r="6" fill="#3b2e2a" />
                <circle cx="130" cy="81" r="2" fill="#ffffff" />
              </>
            )}

            {/* Glasses */}
            <circle cx="68" cy="84" r="23" fill="none" stroke="#2d2522" strokeWidth="2.5" />
            <circle cx="132" cy="84" r="23" fill="none" stroke="#2d2522" strokeWidth="2.5" />
            <path d="M 91,84 Q 100,78 109,84" fill="none" stroke="#2d2522" strokeWidth="2.5" />
            <path d="M 45,84 C 30,84 25,100 20,95" fill="none" stroke="#2d2522" strokeWidth="2" />
            <path d="M 155,84 C 170,84 175,100 180,95" fill="none" stroke="#2d2522" strokeWidth="2" />

            {/* Curly strand of hair on top */}
            <path d="M 100,40 C 100,25 115,15 110,10 C 105,5 98,12 100,20 Q 102,23 103,40" fill="none" stroke="#3b2e2a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Smiling/Sad mouth */}
            {state === 'sad' ? (
              <path d="M 85,154 Q 100,142 115,154" fill="none" stroke="#3b2e2a" strokeWidth="3" strokeLinecap="round" />
            ) : state === 'panic' ? (
              <path d="M 85,152 Q 100,152 115,152 Q 100,159 85,152" fill="#3b2e2a" stroke="#3b2e2a" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M 85,150 Q 100,162 115,150" fill="none" stroke="#3b2e2a" strokeWidth="3" strokeLinecap="round" />
            )}

            {/* Panic Sweat Drops */}
            {state === 'panic' && (
              <>
                <path d="M 28,80 C 26,84 28,88 32,88 C 34,88 33,82 28,80 Z" fill="#60a5fa" />
                <path d="M 172,80 C 174,84 172,88 168,88 C 166,88 167,82 172,80 Z" fill="#60a5fa" />
              </>
            )}

            {/* Blur filter for glows */}
            <defs>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
              </filter>
            </defs>
          </svg>
        );

      case 'momo': // Momo Bear
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 43,108 C 38,68 70,48 100,48 C 130,48 162,68 157,108 C 152,150 132,164 100,164 C 68,164 48,150 43,108 Z" fill="#cca482" stroke="#403124" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Round Ears */}
            <path d="M 48,56 C 36,54 28,68 34,80 C 38,88 48,88 52,82 Z" fill="#cca482" stroke="#403124" strokeWidth="3" />
            <path d="M 152,56 C 164,54 172,68 166,80 C 162,88 152,88 148,82 Z" fill="#cca482" stroke="#403124" strokeWidth="3" />
            {/* Inner Ears */}
            <path d="M 44,61 C 38,60 34,70 38,76 M 156,61 C 162,60 166,70 162,76" fill="#e5c1a7" stroke="#403124" strokeWidth="2" />

            {/* Blush Cheeks */}
            <circle cx="56" cy="120" r="14" fill="#fca5a5" opacity="0.65" filter="url(#glow-blur)" />
            <circle cx="144" cy="120" r="14" fill="#fca5a5" opacity="0.65" filter="url(#glow-blur)" />

            {/* Soft Muzzle / Snout */}
            <ellipse cx="100" cy="124" rx="34" ry="26" fill="#fdfaf4" stroke="#403124" strokeWidth="3" />
            
            {/* Nose */}
            <path d="M 88,116 C 92,110 108,110 112,116 C 114,120 106,124 100,124 C 94,124 86,120 88,116 Z" fill="#403124" />
            <path d="M 100,124 L 100,132" stroke="#403124" strokeWidth="3" strokeLinecap="round" />

            {/* Mouth selection */}
            {state === 'sad' ? (
              <path d="M 88,138 Q 100,128 112,138" fill="none" stroke="#403124" strokeWidth="3" strokeLinecap="round" />
            ) : state === 'happy' ? (
              <path d="M 84,128 Q 100,146 116,128" fill="none" stroke="#403124" strokeWidth="3.5" strokeLinecap="round" />
            ) : (
              <path d="M 86,130 Q 100,142 114,130" fill="none" stroke="#403124" strokeWidth="3" strokeLinecap="round" />
            )}

            {/* Eyes selection based on state */}
            {state === 'happy' ? (
              <>
                <path d="M 58,88 Q 70,76 82,88" stroke="#403124" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 118,88 Q 130,76 142,88" stroke="#403124" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : state === 'sad' ? (
              <>
                <circle cx="70" cy="86" r="11" fill="#3b2e2a" />
                <path d="M 52,70 L 68,74 M 148,70 L 132,74" stroke="#403124" strokeWidth="3.5" strokeLinecap="round" />
                {/* Tear crop */}
                <circle cx="78" cy="98" r="4.5" fill="#3b82f6" />
              </>
            ) : state === 'panic' ? (
              <>
                <circle cx="70" cy="86" r="12" fill="#ffffff" stroke="#403124" strokeWidth="2.5" />
                <circle cx="70" cy="86" r="3.5" fill="#403124" />
                <circle cx="130" cy="86" r="12" fill="#ffffff" stroke="#403124" strokeWidth="2.5" />
                <circle cx="130" cy="86" r="3.5" fill="#403124" />
                <path d="M 58,70 Q 70,60 82,70 M 118,70 Q 130,60 142,70" stroke="#403124" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="70" cy="86" r="11" fill="#3b2e2a" />
                <circle cx="68" cy="83" r="3.5" fill="#ffffff" />
                <circle cx="72" cy="88" r="1" fill="#ffffff" />
                <circle cx="130" cy="86" r="11" fill="#3b2e2a" />
                <circle cx="128" cy="83" r="3.5" fill="#ffffff" />
                <circle cx="132" cy="88" r="1" fill="#ffffff" />
                {/* Eyebrows */}
                <path d="M 60,72 Q 70,67 76,73" fill="none" stroke="#403124" strokeWidth="2" strokeLinecap="round" />
                <path d="M 140,72 Q 130,67 124,73" fill="none" stroke="#403124" strokeWidth="2" strokeLinecap="round" />
              </>
            )}

            {/* Three tiny hairs on head */}
            <path d="M 96,48 Q 94,36 92,38" fill="none" stroke="#403124" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 100,48 Q 101,34 102,36" fill="none" stroke="#403124" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 104,48 Q 108,37 111,39" fill="none" stroke="#403124" strokeWidth="2.5" strokeLinecap="round" />

            {/* Sweat bead for panic */}
            {state === 'panic' && (
              <path d="M 44,70 C 44,75 42,78 38,78 C 36,78 38,73 44,70 Z" fill="#60a5fa" />
            )}

            <defs>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
              </filter>
            </defs>
          </svg>
        );

      case 'sly': // Sly Fox
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            {/* Pointy Ears */}
            <path d="M 46,75 L 24,25 C 22,20 38,36 50,46 Z" fill="#dd6b20" stroke="#3d2214" strokeWidth="3" />
            <path d="M 154,75 L 176,25 C 178,20 162,36 150,46 Z" fill="#dd6b20" stroke="#3d2214" strokeWidth="3" />
            <path d="M 30,30 Q 42,42 46,55" stroke="#3d2214" strokeWidth="2.5" fill="none" />
            <path d="M 170,30 Q 158,42 154,55" stroke="#3d2214" strokeWidth="2.5" fill="none" />

            {/* Main Orange head */}
            <path d="M 40,105 C 35,62 70,42 100,42 C 130,42 165,62 160,105 C 158,125 150,140 100,165 C 50,140 42,125 40,105 Z" fill="#dd6b20" stroke="#3d2214" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* White fluffy cheeks */}
            <path d="M 41,105 C 32,130 52,148 75,138 C 90,132 100,142 100,162 C 100,142 110,132 125,138 C 148,148 168,130 159,105 C 150,116 130,126 120,120 C 100,110 100,110 80,120 C 70,126 50,116 41,105 Z" fill="#fdfaf4" stroke="#3d2214" strokeWidth="3" strokeLinejoin="round" />

            {/* Blush Cheeks */}
            <circle cx="50" cy="118" r="10" fill="#f09365" opacity="0.75" filter="url(#glow-blur)" />
            <circle cx="150" cy="118" r="10" fill="#f09365" opacity="0.75" filter="url(#glow-blur)" />

            {/* Eyes representation */}
            {state === 'happy' ? (
              <>
                <path d="M 52,86 Q 66,74 80,86" stroke="#3d2214" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 120,86 Q 134,74 148,86" stroke="#3d2214" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : state === 'sad' ? (
              <>
                <path d="M 54,84 Q 66,94 78,84" stroke="#3d2214" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 122,84 Q 134,94 146,84" stroke="#3d2214" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : state === 'panic' ? (
              <>
                <circle cx="65" cy="86" r="11" fill="#ffffff" stroke="#3d2214" strokeWidth="2.5" />
                <circle cx="65" cy="86" r="3" fill="#3d2214" />
                <circle cx="135" cy="86" r="11" fill="#ffffff" stroke="#3d2214" strokeWidth="2.5" />
                <circle cx="135" cy="86" r="3" fill="#3d2214" />
                <path d="M 50,72 L 72,78 M 150,72 L 128,78" stroke="#3d2214" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M 52,86 C 58,80 72,80 78,86 C 72,94 58,94 52,86 Z" fill="#3d2214" stroke="#3d2214" strokeWidth="1" />
                <circle cx="68" cy="86" r="3" fill="#ffffff" />
                <path d="M 50,84 L 80,84" stroke="#3d2214" strokeWidth="2" strokeLinecap="round" />
                <path d="M 148,86 C 142,80 128,80 122,86 C 128,94 142,94 148,86 Z" fill="#3d2214" stroke="#3d2214" strokeWidth="1" />
                <circle cx="132" cy="86" r="3" fill="#ffffff" />
                <path d="M 150,84 L 120,84" stroke="#3d2214" strokeWidth="2" strokeLinecap="round" />
              </>
            )}

            {/* Nose & Smile */}
            <path d="M 94,152 Q 100,158 106,152 Q 103,147 100,147 Q 97,147 94,152 Z" fill="#3d2214" />
            
            {state === 'sad' ? (
              <path d="M 92,161 Q 100,157 108,161" fill="none" stroke="#3d2214" strokeWidth="2" strokeLinecap="round" />
            ) : state === 'happy' ? (
              <path d="M 90,154 Q 100,165 110,154" fill="none" stroke="#3d2214" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M 100,154 Q 100,160 103,160 M 100,154 Q 100,160 97,160" fill="none" stroke="#3d2214" strokeWidth="2" />
            )}

            <defs>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
              </filter>
            </defs>
          </svg>
        );

      case 'bo': // Bo Monkey
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            {/* Big Outer Ears */}
            <circle cx="34" cy="105" r="28" fill="#806d62" stroke="#2a1e17" strokeWidth="3" />
            <circle cx="34" cy="105" r="18" fill="#efa8a9" stroke="#2a1e17" strokeWidth="2" />
            <circle cx="166" cy="105" r="28" fill="#806d62" stroke="#2a1e17" strokeWidth="3" />
            <circle cx="166" cy="105" r="18" fill="#efa8a9" stroke="#2a1e17" strokeWidth="2" />

            {/* Head */}
            <path d="M 45,110 C 40,65 70,42 100,42 C 130,42 160,65 155,110 C 150,150 135,165 100,165 C 65,150 50,140 45,110 Z" fill="#806d62" stroke="#2a1e17" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Hair peak */}
            <path d="M 92,44 C 91,30 101,24 100,32 C 104,24 111,32 108,44" fill="#806d62" stroke="#2a1e17" strokeWidth="2.5" />

            {/* Inner Face mask */}
            <path d="M 52,112 C 48,90 70,72 86,85 C 92,90 108,90 114,85 C 130,72 152,90 148,112 C 144,142 125,154 100,154 C 75,154 56,142 52,112 Z" fill="#ead8cc" stroke="#2a1e17" strokeWidth="3" strokeLinejoin="round" />

            {/* Blush cheeks */}
            <circle cx="64" cy="122" r="11" fill="#f87171" opacity="0.6" filter="url(#glow-blur)" />
            <circle cx="136" cy="122" r="11" fill="#f87171" opacity="0.6" filter="url(#glow-blur)" />

            {/* Mouth */}
            {state === 'sad' ? (
              <path d="M 80,134 Q 100,122 120,134" fill="none" stroke="#2a1e17" strokeWidth="3.5" strokeLinecap="round" />
            ) : state === 'happy' ? (
              <path d="M 72,122 Q 100,148 128,122 M 72,122 C 78,138 122,138 128,122" fill="#bc4c4c" stroke="#2a1e17" strokeWidth="3" strokeLinejoin="round" />
            ) : (
              <path d="M 74,124 Q 100,144 126,124" fill="none" stroke="#2a1e17" strokeWidth="3.5" strokeLinecap="round" />
            )}

            {/* Dimples */}
            <path d="M 72,122 M 72,126 Q 74,120 78,124" fill="none" stroke="#2a1e17" strokeWidth="2" />
            <path d="M 128,122 M 128,126 Q 126,120 122,124" fill="none" stroke="#2a1e17" strokeWidth="2" />

            {/* Eyes */}
            {state === 'happy' ? (
              <>
                <path d="M 68,102 Q 78,90 88,102" stroke="#2a1e17" strokeWidth="3" strokeLinecap="round" />
                <path d="M 112,102 Q 122,90 132,102" stroke="#2a1e17" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : state === 'panic' ? (
              <>
                <circle cx="78" cy="100" r="11" fill="#ffffff" stroke="#2a1e17" strokeWidth="2.5" />
                <circle cx="78" cy="100" r="3.5" fill="#2a1e17" />
                <circle cx="122" cy="100" r="11" fill="#ffffff" stroke="#2a1e17" strokeWidth="2.5" />
                <circle cx="122" cy="100" r="3.5" fill="#2a1e17" />
                <path d="M 68,85 Q 78,78 88,85 M 112,85 Q 122,78 132,85" stroke="#2a1e17" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="78" cy="100" r="11" fill="#ffffff" stroke="#2a1e17" strokeWidth="2.5" />
                <circle cx="78" cy="100" r="5" fill="#2a1e17" />
                <circle cx="76" cy="98" r="1.5" fill="#ffffff" />
                <circle cx="122" cy="100" r="11" fill="#ffffff" stroke="#2a1e17" strokeWidth="2.5" />
                <circle cx="122" cy="100" r="5" fill="#2a1e17" />
                <circle cx="120" cy="98" r="1.5" fill="#ffffff" />
              </>
            )}

            {/* Panic sweat */}
            {state === 'panic' && (
              <path d="M 98,34 Q 94,40 102,40" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
            )}

            <defs>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
              </filter>
            </defs>
          </svg>
        );

      case 'nori': // Nori Cat
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            {/* Pointy Ears */}
            <path d="M 52,65 L 30,18 C 28,14 44,28 58,40 Z" fill="#e5e5e5" stroke="#373752" strokeWidth="3" />
            <path d="M 148,65 L 170,18 C 172,14 156,28 142,40 Z" fill="#e5e5e5" stroke="#373752" strokeWidth="3" />
            {/* Inner Ears */}
            <path d="M 44,55 L 36,28 C 38,34 44,42 48,46 Z" fill="#f8b4b7" />
            <path d="M 156,55 L 164,28 C 162,34 156,42 152,46 Z" fill="#f8b4b7" />

            {/* Main light grey face */}
            <path d="M 45,110 C 40,65 70,45 100,45 C 130,45 160,65 155,110 C 150,152 135,166 100,166 C 65,166 50,152 45,110 Z" fill="#eaeae8" stroke="#373752" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Blush cheeks */}
            <circle cx="56" cy="122" r="12" fill="#fda4af" opacity="0.65" filter="url(#glow-blur)" />
            <circle cx="144" cy="122" r="12" fill="#fda4af" opacity="0.65" filter="url(#glow-blur)" />

            {/* Forehead Stripes */}
            <path d="M 92,47 L 94,62 L 91,66 Z" fill="#66667a" />
            <path d="M 100,47 L 100,66 L 98,69 Z" fill="#66667a" />
            <path d="M 108,47 L 106,62 L 109,66 Z" fill="#66667a" />

            {/* Cheek Stripes */}
            <path d="M 46,106 L 62,108 L 58,112 Z" fill="#66667a" />
            <path d="M 47,116 L 60,117 L 57,121 Z" fill="#66667a" />
            <path d="M 154,106 L 138,108 L 142,112 Z" fill="#66667a" />
            <path d="M 153,116 L 140,117 L 143,121 Z" fill="#66667a" />

            {/* Whiskers */}
            <path d="M 40,126 L 15,124 M 40,131 L 12,132 M 40,136 L 16,140" stroke="#373752" strokeWidth="2" strokeLinecap="round" />
            <path d="M 160,126 L 185,124 M 160,131 L 188,132 M 160,136 L 184,140" stroke="#373752" strokeWidth="2" strokeLinecap="round" />

            {/* Eyes selection */}
            {state === 'happy' ? (
              <>
                <path d="M 58,92 Q 70,80 82,92" stroke="#373752" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 118,92 Q 130,80 142,92" stroke="#373752" strokeWidth="4" strokeLinecap="round" fill="none" />
              </>
            ) : state === 'sad' ? (
              <>
                <path d="M 58,84 Q 70,96 82,84" stroke="#373752" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 118,84 Q 130,96 142,84" stroke="#373752" strokeWidth="4" strokeLinecap="round" fill="none" />
              </>
            ) : state === 'panic' ? (
              <>
                <circle cx="70" cy="90" r="12" fill="#ffffff" stroke="#373752" strokeWidth="2.5" />
                <circle cx="70" cy="90" r="3" fill="#373752" />
                <circle cx="130" cy="90" r="12" fill="#ffffff" stroke="#373752" strokeWidth="2.5" />
                <circle cx="130" cy="90" r="3" fill="#373752" />
                <path d="M 58,74 L 80,74 M 142,74 L 120,74" stroke="#373752" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="70" cy="90" r="12" fill="#ffffff" stroke="#373752" strokeWidth="3" />
                <circle cx="70" cy="90" r="5.5" fill="#373752" />
                <circle cx="68" cy="87" r="2" fill="#ffffff" />
                <circle cx="130" cy="90" r="12" fill="#ffffff" stroke="#373752" strokeWidth="3" />
                <circle cx="130" cy="90" r="5.5" fill="#373752" />
                <circle cx="128" cy="87" r="2" fill="#ffffff" />
              </>
            )}

            {/* Cat mouth & nose */}
            <path d="M 100,112 L 100,116" stroke="#373752" strokeWidth="2.5" />
            <path d="M 88,118 Q 94,124 100,118 Q 106,124 112,118" fill="none" stroke="#373752" strokeWidth="3" strokeLinecap="round" />
            <polygon points="96,108 104,108 100,112" fill="#fda4af" stroke="#373752" strokeWidth="1.5" strokeLinejoin="round" />

            <defs>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
              </filter>
            </defs>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id={`animal-face-${id}`}
      onClick={onClick}
      className={`relative select-none transition-all ease-out transform ${stateClasses} ${
        onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : ''
      } ${className} flex items-center justify-center`}
    >
      {renderSVG()}
    </div>
  );
};

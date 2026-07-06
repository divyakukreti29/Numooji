import React from 'react';

export const SketchyFilter: React.FC = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft sketchy border filter */}
        <filter id="sketchy-border" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Heavy sketchy border filter */}
        <filter id="sketchy-heavy" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtly hand-drawn text filter (almost neutral to maintain maximum crispness and readability) */}
        <filter id="sketchy-text" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

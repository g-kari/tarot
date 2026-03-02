"use client";

import { memo } from "react";

export const TableclothBackground = memo(function TableclothBackground() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Base gradient - dark blue-black */}
        <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
          <stop offset="0%"   stopColor="#0d1020" />
          <stop offset="55%"  stopColor="#07090f" />
          <stop offset="100%" stopColor="#030407" />
        </radialGradient>

        {/* Subtle cloth noise */}
        <filter id="clothNoise" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.7" numOctaves="3" seed="12" stitchTiles="stitch" result="noise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.03
                    0 0 0 0 0.03
                    0 0 0 0 0.06
                    0 0 0 0.08 0"
            in="noise"
            result="coloredNoise"
          />
          <feComposite in="SourceGraphic" in2="coloredNoise" operator="over" />
        </filter>

        {/* Fine weave - very subtle */}
        <pattern id="weave" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="3" height="3" fill="rgba(99,102,241,0.012)" />
          <rect x="3" y="3" width="3" height="3" fill="rgba(99,102,241,0.012)" />
        </pattern>

        {/* Edge vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="68%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,2,0.82)" />
        </radialGradient>
      </defs>

      {/* Layer 1: color base */}
      <rect width="100%" height="100%" fill="url(#bgGrad)" />

      {/* Layer 2: weave structure */}
      <rect width="100%" height="100%" fill="url(#weave)" />

      {/* Layer 3: noise texture */}
      <rect width="100%" height="100%" fill="url(#bgGrad)" filter="url(#clothNoise)" opacity="0.22" />

      {/* Layer 4: vignette */}
      <rect width="100%" height="100%" fill="url(#vignette)" />
    </svg>
  );
});

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
        {/* Base radial gradient */}
        <radialGradient id="bgGrad" cx="50%" cy="48%" r="65%">
          <stop offset="0%"   stopColor="#2a0050" />
          <stop offset="45%"  stopColor="#14002a" />
          <stop offset="100%" stopColor="#040008" />
        </radialGradient>

        {/* Cloth noise filter */}
        <filter id="clothNoise" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.6" numOctaves="4" seed="7" stitchTiles="stitch" result="noise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.06
                    0 0 0 0 0
                    0 0 0 0 0.1
                    0 0 0 0.14 0"
            in="noise"
            result="coloredNoise"
          />
          <feComposite in="SourceGraphic" in2="coloredNoise" operator="over" />
        </filter>

        {/* Weave pattern */}
        <pattern id="weave" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill="rgba(180,120,255,0.025)" />
          <rect x="4" y="4" width="4" height="4" fill="rgba(180,120,255,0.025)" />
        </pattern>

        {/* Edge vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
        </radialGradient>
      </defs>

      {/* Layer 1: color base */}
      <rect width="100%" height="100%" fill="url(#bgGrad)" />

      {/* Layer 2: weave structure */}
      <rect width="100%" height="100%" fill="url(#weave)" />

      {/* Layer 3: noise texture */}
      <rect width="100%" height="100%" fill="url(#bgGrad)" filter="url(#clothNoise)" opacity="0.35" />

      {/* Layer 4: vignette */}
      <rect width="100%" height="100%" fill="url(#vignette)" />
    </svg>
  );
});

import type { Suit } from "../../../data/cards";

interface SuitSymbolProps {
  suit: Suit;
  cx?: number;
  cy?: number;
  size?: number;
  color?: string;
  flip?: boolean;
}

export function SuitSymbol({ suit, cx = 0, cy = 0, size = 16, color = "#c8a84b", flip = false }: SuitSymbolProps) {
  const s = size / 2;
  const t = flip ? `translate(${cx},${cy}) scale(1,-1)` : `translate(${cx},${cy})`;

  switch (suit) {
    case "wands": return (
      <g transform={t}>
        {/* Staff */}
        <line x1="0" y1={-s * 1.1} x2="0" y2={s * 1.1} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        {/* Side sprigs */}
        <line x1="0" y1={-s * 0.3} x2={s * 0.7} y2={-s * 0.8} stroke={color} strokeWidth="1" strokeLinecap="round" />
        <line x1="0" y1={-s * 0.3} x2={-s * 0.7} y2={-s * 0.8} stroke={color} strokeWidth="1" strokeLinecap="round" />
        <line x1="0" y1={s * 0.2} x2={s * 0.6} y2={-s * 0.2} stroke={color} strokeWidth="0.8" strokeLinecap="round" />
        <line x1="0" y1={s * 0.2} x2={-s * 0.6} y2={-s * 0.2} stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      </g>
    );

    case "cups": return (
      <g transform={t}>
        {/* Cup body */}
        <path d={`M${-s * 0.7},${-s * 0.7} L${-s * 0.5},${s * 0.4} Q${0},${s * 0.9} ${s * 0.5},${s * 0.4} L${s * 0.7},${-s * 0.7} Z`} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
        {/* Base */}
        <line x1={-s * 0.35} y1={s * 0.4} x2={s * 0.35} y2={s * 0.4} stroke={color} strokeWidth="1.4" />
        <line x1={-s * 0.2} y1={s * 0.65} x2={s * 0.2} y2={s * 0.65} stroke={color} strokeWidth="1.4" />
      </g>
    );

    case "swords": return (
      <g transform={t}>
        {/* Blade */}
        <line x1="0" y1={-s * 1.1} x2="0" y2={s * 0.5} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        {/* Guard (crossguard) */}
        <line x1={-s * 0.85} y1={s * 0.15} x2={s * 0.85} y2={s * 0.15} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        {/* Handle */}
        <line x1="0" y1={s * 0.15} x2="0" y2={s * 1.0} stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="0" cy={s * 1.0} r={s * 0.18} fill={color} />
      </g>
    );

    case "pentacles": return (
      <g transform={t}>
        {/* Star polygon (pentagram) */}
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i * 72 - 90) * (Math.PI / 180);
          const b = ((i + 2) * 72 - 90) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={Math.cos(a) * s} y1={Math.sin(a) * s}
              x2={Math.cos(b) * s} y2={Math.sin(b) * s}
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          );
        })}
        {/* Outer circle */}
        <circle cx="0" cy="0" r={s * 1.05} fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.6" />
      </g>
    );
  }
}

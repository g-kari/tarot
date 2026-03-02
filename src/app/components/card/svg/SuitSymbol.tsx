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
  const id = `ss-${suit}-${cx}-${cy}`;

  switch (suit) {
    case "wands": return (
      <g transform={t}>
        {/* Staff with gradient shading */}
        <line x1="0" y1={-s * 1.15} x2="0" y2={s * 1.15} stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.35" />
        <line x1="0" y1={-s * 1.15} x2="0" y2={s * 1.15} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        {/* Top bud */}
        <ellipse cx="0" cy={-s * 1.1} rx={s * 0.22} ry={s * 0.35} fill={color} fillOpacity="0.7" />
        {/* Branches with leaves */}
        <path d={`M0,${-s * 0.3} Q${s * 0.4},${-s * 0.6} ${s * 0.8},${-s * 0.85}`} fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
        <ellipse cx={s * 0.75} cy={-s * 0.85} rx={s * 0.2} ry={s * 0.12} fill={color} fillOpacity="0.5" transform={`rotate(-35,${s * 0.75},${-s * 0.85})`} />
        <path d={`M0,${-s * 0.3} Q${-s * 0.4},${-s * 0.6} ${-s * 0.8},${-s * 0.85}`} fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
        <ellipse cx={-s * 0.75} cy={-s * 0.85} rx={s * 0.2} ry={s * 0.12} fill={color} fillOpacity="0.5" transform={`rotate(35,${-s * 0.75},${-s * 0.85})`} />
        {/* Lower branches */}
        <path d={`M0,${s * 0.2} Q${s * 0.3},${s * 0.0} ${s * 0.65},${-s * 0.15}`} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
        <ellipse cx={s * 0.6} cy={-s * 0.15} rx={s * 0.15} ry={s * 0.1} fill={color} fillOpacity="0.4" transform={`rotate(-25,${s * 0.6},${-s * 0.15})`} />
        <path d={`M0,${s * 0.2} Q${-s * 0.3},${s * 0.0} ${-s * 0.65},${-s * 0.15}`} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
        <ellipse cx={-s * 0.6} cy={-s * 0.15} rx={s * 0.15} ry={s * 0.1} fill={color} fillOpacity="0.4" transform={`rotate(25,${-s * 0.6},${-s * 0.15})`} />
        {/* Knots on staff */}
        <ellipse cx={s * 0.08} cy={-s * 0.3} rx={s * 0.14} ry={s * 0.06} fill={color} fillOpacity="0.25" />
        <ellipse cx={-s * 0.06} cy={s * 0.2} rx={s * 0.12} ry={s * 0.05} fill={color} fillOpacity="0.2" />
      </g>
    );

    case "cups": return (
      <g transform={t}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Cup body with fill */}
        <path
          d={`M${-s * 0.72},${-s * 0.75} L${-s * 0.52},${s * 0.3} Q${0},${s * 0.85} ${s * 0.52},${s * 0.3} L${s * 0.72},${-s * 0.75} Z`}
          fill={`url(#${id})`} stroke={color} strokeWidth="1.3" strokeLinejoin="round"
        />
        {/* Rim highlight */}
        <path d={`M${-s * 0.68},${-s * 0.72} Q${0},${-s * 0.55} ${s * 0.68},${-s * 0.72}`} fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
        {/* Stem */}
        <line x1="0" y1={s * 0.3} x2="0" y2={s * 0.55} stroke={color} strokeWidth="1.5" />
        {/* Base */}
        <ellipse cx="0" cy={s * 0.6} rx={s * 0.35} ry={s * 0.12} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" />
        {/* Water line inside */}
        <path d={`M${-s * 0.42},${-s * 0.2} Q${-s * 0.15},${-s * 0.35} ${0},${-s * 0.2} Q${s * 0.15},${-s * 0.05} ${s * 0.42},${-s * 0.2}`}
          fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
        {/* Decorative cross on cup */}
        <line x1="0" y1={-s * 0.5} x2="0" y2={-s * 0.15} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />
        <line x1={-s * 0.18} y1={-s * 0.35} x2={s * 0.18} y2={-s * 0.35} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />
      </g>
    );

    case "swords": return (
      <g transform={t}>
        {/* Blade shadow */}
        <line x1={s * 0.06} y1={-s * 1.1} x2={s * 0.06} y2={s * 0.15} stroke={color} strokeWidth="2.5" strokeOpacity="0.12" strokeLinecap="round" />
        {/* Blade body */}
        <path d={`M0,${-s * 1.15} L${s * 0.12},${-s * 0.9} L${s * 0.1},${s * 0.12} L0,${s * 0.18} L${-s * 0.1},${s * 0.12} L${-s * 0.12},${-s * 0.9} Z`}
          fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8" />
        {/* Blade center line (fuller) */}
        <line x1="0" y1={-s * 0.85} x2="0" y2={s * 0.05} stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
        {/* Blade tip highlight */}
        <path d={`M0,${-s * 1.15} L${s * 0.06},${-s * 0.95} L${-s * 0.06},${-s * 0.95} Z`} fill={color} fillOpacity="0.5" />
        {/* Guard (crossguard) */}
        <path d={`M${-s * 0.9},${s * 0.12} Q${-s * 0.9},${s * 0.22} ${-s * 0.8},${s * 0.22} L${s * 0.8},${s * 0.22} Q${s * 0.9},${s * 0.22} ${s * 0.9},${s * 0.12}`}
          fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        {/* Guard orbs */}
        <circle cx={-s * 0.85} cy={s * 0.17} r={s * 0.1} fill={color} fillOpacity="0.5" />
        <circle cx={s * 0.85} cy={s * 0.17} r={s * 0.1} fill={color} fillOpacity="0.5" />
        {/* Grip */}
        <rect x={-s * 0.1} y={s * 0.22} width={s * 0.2} height={s * 0.55} rx={s * 0.04} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.7" />
        {/* Grip wrapping */}
        {[0.3, 0.42, 0.54, 0.66].map((v, i) => (
          <line key={i} x1={-s * 0.08} y1={s * v} x2={s * 0.08} y2={s * (v + 0.06)} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />
        ))}
        {/* Pommel */}
        <circle cx="0" cy={s * 0.82} r={s * 0.16} fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.8" />
        <circle cx="0" cy={s * 0.82} r={s * 0.07} fill={color} fillOpacity="0.6" />
      </g>
    );

    case "pentacles": return (
      <g transform={t}>
        {/* Outer coin ring */}
        <circle cx="0" cy="0" r={s * 1.08} fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.2" />
        <circle cx="0" cy="0" r={s * 0.95} fill="none" stroke={color} strokeWidth="0.4" strokeOpacity="0.35" />
        {/* Inner ring */}
        <circle cx="0" cy="0" r={s * 0.55} fill="none" stroke={color} strokeWidth="0.3" strokeOpacity="0.25" />
        {/* Pentagram star with filled triangles */}
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i * 72 - 90) * (Math.PI / 180);
          const b = ((i + 2) * 72 - 90) * (Math.PI / 180);
          const inner = s * 0.38;
          const outer = s * 0.88;
          const midA = ((i * 72 + 36) - 90) * (Math.PI / 180);
          return (
            <g key={i}>
              <line
                x1={Math.cos(a) * outer} y1={Math.sin(a) * outer}
                x2={Math.cos(b) * outer} y2={Math.sin(b) * outer}
                stroke={color} strokeWidth="1.1" strokeLinecap="round"
              />
              {/* Triangle point fills */}
              <polygon
                points={`${Math.cos(a) * outer},${Math.sin(a) * outer} ${Math.cos(midA) * inner},${Math.sin(midA) * inner} ${Math.cos(((i - 1) * 72 + 36 - 90) * Math.PI / 180) * inner},${Math.sin(((i - 1) * 72 + 36 - 90) * Math.PI / 180) * inner}`}
                fill={color} fillOpacity="0.12"
              />
            </g>
          );
        })}
        {/* Center dot */}
        <circle cx="0" cy="0" r={s * 0.08} fill={color} fillOpacity="0.5" />
        {/* Decorative edge dots */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30) * (Math.PI / 180);
          return <circle key={`d${i}`} cx={Math.cos(a) * s * 1.01} cy={Math.sin(a) * s * 1.01} r="0.5" fill={color} fillOpacity="0.3" />;
        })}
      </g>
    );
  }
}

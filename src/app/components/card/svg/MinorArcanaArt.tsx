import React from "react";
import { SuitSymbol } from "./SuitSymbol";
import type { TarotCard, Suit, CourtRank } from "../../../data/cards";

const PIP_LAYOUTS: Array<Array<{ x: number; y: number; flip?: boolean }>> = [
  [],
  [{ x: 0.5,  y: 0.5 }],
  [{ x: 0.5, y: 0.28 }, { x: 0.5, y: 0.72, flip: true }],
  [{ x: 0.5, y: 0.22 }, { x: 0.5, y: 0.5 }, { x: 0.5, y: 0.78, flip: true }],
  [{ x: 0.3, y: 0.28 }, { x: 0.7, y: 0.28 }, { x: 0.3, y: 0.72, flip: true }, { x: 0.7, y: 0.72, flip: true }],
  [{ x: 0.3, y: 0.22 }, { x: 0.7, y: 0.22 }, { x: 0.5, y: 0.5 }, { x: 0.3, y: 0.78, flip: true }, { x: 0.7, y: 0.78, flip: true }],
  [{ x: 0.3, y: 0.22 }, { x: 0.7, y: 0.22 }, { x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }, { x: 0.3, y: 0.78, flip: true }, { x: 0.7, y: 0.78, flip: true }],
  [{ x: 0.3, y: 0.2 }, { x: 0.7, y: 0.2 }, { x: 0.5, y: 0.37 }, { x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }, { x: 0.3, y: 0.78, flip: true }, { x: 0.7, y: 0.78, flip: true }],
  [{ x: 0.3, y: 0.18 }, { x: 0.7, y: 0.18 }, { x: 0.3, y: 0.38 }, { x: 0.7, y: 0.38 }, { x: 0.3, y: 0.62, flip: true }, { x: 0.7, y: 0.62, flip: true }, { x: 0.3, y: 0.82, flip: true }, { x: 0.7, y: 0.82, flip: true }],
  [{ x: 0.3, y: 0.17 }, { x: 0.7, y: 0.17 }, { x: 0.3, y: 0.36 }, { x: 0.7, y: 0.36 }, { x: 0.5, y: 0.5 }, { x: 0.3, y: 0.64, flip: true }, { x: 0.7, y: 0.64, flip: true }, { x: 0.3, y: 0.83, flip: true }, { x: 0.7, y: 0.83, flip: true }],
  [{ x: 0.3, y: 0.15 }, { x: 0.7, y: 0.15 }, { x: 0.3, y: 0.32 }, { x: 0.7, y: 0.32 }, { x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }, { x: 0.3, y: 0.68, flip: true }, { x: 0.7, y: 0.68, flip: true }, { x: 0.3, y: 0.85, flip: true }, { x: 0.7, y: 0.85, flip: true }],
];

const ART_TOP = 35, ART_BOTTOM = 175, ART_LEFT = 12, ART_RIGHT = 108;
const AW = ART_RIGHT - ART_LEFT;
const AH = ART_BOTTOM - ART_TOP;

function pipToPixel(nx: number, ny: number) {
  return { cx: ART_LEFT + nx * AW, cy: ART_TOP + ny * AH };
}

/* ── Suit-themed pip backgrounds ── */
function PipBackground({ suit, pc, sc }: { suit: Suit; pc: string; sc: string }) {
  switch (suit) {
    case "wands": return (
      <g>
        {/* Flame wisps */}
        {[28, 52, 76, 96].map((x, i) => (
          <path key={i} d={`M${x},${170 - i * 8} Q${x + 3},${158 - i * 8} ${x - 2},${148 - i * 8}`}
            fill="none" stroke={pc} strokeWidth="0.5" strokeOpacity="0.12" />
        ))}
        {/* Warm glow at bottom */}
        <ellipse cx="60" cy="175" rx="45" ry="12" fill={pc} fillOpacity="0.04" />
      </g>
    );
    case "cups": return (
      <g>
        {/* Water waves */}
        <path d="M12,168 Q30,162 48,168 Q66,174 84,168 Q96,164 108,168" fill="none" stroke={sc} strokeWidth="0.4" strokeOpacity="0.12" />
        <path d="M12,174 Q30,168 48,174 Q66,180 84,174 Q96,170 108,174" fill="none" stroke={sc} strokeWidth="0.3" strokeOpacity="0.08" />
        {/* Subtle droplets */}
        {[30, 60, 90].map((x, i) => (
          <circle key={i} cx={x} cy={40 + i * 6} r="1" fill={sc} fillOpacity="0.08" />
        ))}
      </g>
    );
    case "swords": return (
      <g>
        {/* Wind lines */}
        {[45, 75, 105, 140].map((y, i) => (
          <path key={i} d={`M${14 + i * 8},${y} Q${40 + i * 6},${y - 3} ${70 + i * 4},${y}`}
            fill="none" stroke={sc} strokeWidth="0.3" strokeOpacity="0.08" />
        ))}
        {/* Cloud wisps at top */}
        <ellipse cx="40" cy="38" rx="18" ry="4" fill={sc} fillOpacity="0.04" />
        <ellipse cx="80" cy="42" rx="14" ry="3" fill={sc} fillOpacity="0.03" />
      </g>
    );
    case "pentacles": return (
      <g>
        {/* Earth/ground texture */}
        <path d="M12,170 Q60,164 108,170" fill="none" stroke={sc} strokeWidth="0.4" strokeOpacity="0.1" />
        {/* Subtle vine */}
        <path d="M16,42 Q20,60 18,80 Q22,100 20,120" fill="none" stroke={sc} strokeWidth="0.3" strokeOpacity="0.06" />
        <path d="M104,42 Q100,60 102,80 Q98,100 100,120" fill="none" stroke={sc} strokeWidth="0.3" strokeOpacity="0.06" />
      </g>
    );
  }
}

/* ── Court card shapes — unique per suit ── */
type CourtFn = (suit: Suit, pc: string, sc: string) => React.ReactElement;

const COURT_SHAPES: Record<CourtRank, CourtFn> = {
  page: (suit, pc, sc) => (
    <g>
      {/* Young figure */}
      <circle cx="60" cy="65" r="11" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
      {/* Hat / hair */}
      <path d="M50,60 Q52,50 60,48 Q68,50 70,60" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
      {suit === "wands" && <ellipse cx="62" cy="48" rx="5" ry="3" fill={pc} fillOpacity="0.25" />}
      {suit === "cups" && <path d="M56,48 Q60,42 64,48" fill="none" stroke={sc} strokeWidth="0.5" />}
      {/* Tunic */}
      <path d="M48,76 L44,130 Q60,126 76,130 L72,76 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.6" />
      {/* Belt */}
      <line x1="46" y1="96" x2="74" y2="96" stroke={sc} strokeWidth="0.6" strokeOpacity="0.4" />
      {/* Arms holding suit item */}
      <line x1="48" y1="82" x2="36" y2="95" stroke={sc} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="72" y1="82" x2="82" y2="92" stroke={sc} strokeWidth="0.8" strokeLinecap="round" />
      {/* Suit-specific item */}
      {suit === "wands" && <line x1="82" y1="70" x2="82" y2="110" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />}
      {suit === "cups" && <path d="M32,90 L30,100 Q34,105 38,100 Z" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.5" />}
      {suit === "swords" && <line x1="36" y1="72" x2="36" y2="108" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />}
      {suit === "pentacles" && <circle cx="36" cy="95" r="6" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.5" />}
      {/* Legs */}
      <line x1="54" y1="130" x2="50" y2="158" stroke={sc} strokeWidth="0.8" />
      <line x1="66" y1="130" x2="70" y2="158" stroke={sc} strokeWidth="0.8" />
      {/* Ground detail */}
      {suit === "pentacles" && <path d="M30,160 Q60,155 90,160" fill="none" stroke={sc} strokeWidth="0.4" strokeOpacity="0.2" />}
      {suit === "wands" && <path d="M50,158 Q60,162 70,158" fill="none" stroke={pc} strokeWidth="0.4" strokeOpacity="0.15" />}
    </g>
  ),

  knight: (suit, pc, sc) => (
    <g>
      {/* Horse body */}
      <ellipse cx="58" cy="128" rx="28" ry="14" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
      {/* Horse head and neck */}
      <path d="M82,118 Q92,105 88,90 Q86,85 82,88" fill={pc} fillOpacity="0.12" stroke={sc} strokeWidth="0.6" />
      <circle cx="88" cy="88" r="6" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
      {/* Horse ear */}
      <line x1="86" y1="83" x2="84" y2="78" stroke={sc} strokeWidth="0.5" />
      <line x1="90" y1="83" x2="92" y2="78" stroke={sc} strokeWidth="0.5" />
      {/* Horse mane */}
      <path d="M84,88 Q80,82 82,78 Q78,84 76,80" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Horse legs */}
      {[35, 44, 72, 80].map((x, i) => (
        <line key={i} x1={x} y1={140} x2={x + (i < 2 ? -3 : 3)} y2={162} stroke={sc} strokeWidth="0.7" />
      ))}
      {/* Horse tail */}
      <path d="M30,125 Q22,130 20,140 Q24,138 28,142" fill="none" stroke={sc} strokeWidth="0.7" strokeLinecap="round" />
      {/* Rider */}
      <circle cx="58" cy="82" r="9" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.8" />
      <rect x="48" y="91" width="20" height="28" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
      {/* Helmet/armor details per suit */}
      {suit === "wands" && <>
        <polygon points="52,75 58,65 64,75" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.4" />
        <line x1="58" y1="65" x2="58" y2="60" stroke={pc} strokeWidth="0.6" />
      </>}
      {suit === "cups" && <>
        <path d="M52,76 Q58,68 64,76" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        <ellipse cx="58" cy="68" rx="3" ry="2" fill={sc} fillOpacity="0.15" />
      </>}
      {suit === "swords" && <>
        <rect x="51" y="72" width="14" height="4" rx="1" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.3" />
        <line x1="58" y1="72" x2="58" y2="68" stroke={sc} strokeWidth="0.5" />
      </>}
      {suit === "pentacles" && <>
        <path d="M50,74 Q58,66 66,74" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.4" />
        <circle cx="58" cy="69" r="2.5" fill={sc} fillOpacity="0.2" />
      </>}
      {/* Suit weapon/item */}
      {suit === "wands" && <line x1="68" y1="88" x2="90" y2="60" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />}
      {suit === "cups" && <path d="M42,95 L38,105 Q42,110 46,105 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />}
      {suit === "swords" && <line x1="68" y1="90" x2="90" y2="65" stroke={sc} strokeWidth="1.3" strokeLinecap="round" />}
      {suit === "pentacles" && <circle cx="42" cy="98" r="7" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />}
    </g>
  ),

  queen: (suit, pc, sc) => (
    <g>
      {/* Throne back */}
      <rect x="28" y="55" width="64" height="95" rx="4" fill={pc} fillOpacity="0.06" stroke={sc} strokeWidth="0.4" />
      {/* Throne top decorations */}
      {suit === "wands" && <path d="M28,55 Q32,48 38,55 Q44,48 48,55" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />}
      {suit === "cups" && <path d="M28,55 Q44,44 60,55 Q76,44 92,55" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />}
      {suit === "swords" && <>
        <line x1="28" y1="55" x2="28" y2="48" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="92" y1="55" x2="92" y2="48" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
      </>}
      {suit === "pentacles" && <path d="M28,55 Q60,46 92,55" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />}
      {/* Figure */}
      <circle cx="60" cy="68" r="11" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.9" />
      {/* Crown */}
      <polygon points="50,58 53,48 57,55 60,44 63,55 67,48 70,58" fill={sc} fillOpacity="0.55" stroke={sc} strokeWidth="0.4" />
      {suit === "wands" && <circle cx="60" cy="45" r="2" fill={pc} fillOpacity="0.5" />}
      {suit === "cups" && <circle cx="60" cy="45" r="2" fill="#5dade2" fillOpacity="0.4" />}
      {suit === "swords" && <polygon points="58,45 60,41 62,45" fill={sc} fillOpacity="0.4" />}
      {suit === "pentacles" && <circle cx="60" cy="45" r="2" fill="#f4d03f" fillOpacity="0.5" />}
      {/* Robes */}
      <path d="M48,78 L40,148 Q60,144 80,148 L72,78 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.6" />
      {/* Robe decoration per suit */}
      {suit === "wands" && <path d="M54,100 Q60,95 66,100" fill="none" stroke={pc} strokeWidth="0.5" strokeOpacity="0.3" />}
      {suit === "cups" && <path d="M55,98 Q60,102 65,98" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />}
      {suit === "swords" && <line x1="60" y1="90" x2="60" y2="105" stroke={sc} strokeWidth="0.4" strokeOpacity="0.2" />}
      {suit === "pentacles" && <circle cx="60" cy="98" r="3" fill="none" stroke={sc} strokeWidth="0.3" strokeOpacity="0.2" />}
      {/* Suit item in hand */}
      {suit === "wands" && <line x1="78" y1="82" x2="92" y2="58" stroke={sc} strokeWidth="1.4" strokeLinecap="round" />}
      {suit === "cups" && <path d="M38,88 L34,98 Q38,104 42,98 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />}
      {suit === "swords" && <line x1="80" y1="78" x2="88" y2="50" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />}
      {suit === "pentacles" && <circle cx="40" cy="92" r="7" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />}
      {/* Other hand on armrest */}
      <line x1={suit === "cups" || suit === "pentacles" ? "72" : "48"} y1="85" x2={suit === "cups" || suit === "pentacles" ? "82" : "36"} y2="95" stroke={sc} strokeWidth="0.7" strokeLinecap="round" />
      {/* Feet hint */}
      <line x1="50" y1="148" x2="48" y2="156" stroke={sc} strokeWidth="0.6" />
      <line x1="70" y1="148" x2="72" y2="156" stroke={sc} strokeWidth="0.6" />
    </g>
  ),

  king: (suit, pc, sc) => (
    <g>
      {/* Grand throne */}
      <rect x="24" y="48" width="72" height="105" rx="4" fill={pc} fillOpacity="0.08" stroke={sc} strokeWidth="0.5" />
      <rect x="24" y="48" width="72" height="8" rx="2" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.3" />
      {/* Throne armrests */}
      <rect x="22" y="85" width="8" height="35" rx="2" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.3" />
      <rect x="90" y="85" width="8" height="35" rx="2" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.3" />
      {/* Throne suit decoration */}
      {suit === "wands" && <>
        <circle cx="26" cy="78" r="3" fill={pc} fillOpacity="0.2" />
        <circle cx="94" cy="78" r="3" fill={pc} fillOpacity="0.2" />
      </>}
      {suit === "cups" && <>
        <path d="M24,76 L22,80 Q26,84 30,80 Z" fill={sc} fillOpacity="0.1" />
        <path d="M96,76 L94,80 Q98,84 102,80 Z" fill={sc} fillOpacity="0.1" transform="scale(-1,1) translate(-120,0)" />
      </>}
      {suit === "swords" && <>
        <polygon points="26,76 28,72 30,76" fill={sc} fillOpacity="0.15" />
        <polygon points="90,76 92,72 94,76" fill={sc} fillOpacity="0.15" />
      </>}
      {suit === "pentacles" && <>
        <circle cx="26" cy="78" r="3" fill="none" stroke={sc} strokeWidth="0.4" strokeOpacity="0.3" />
        <circle cx="94" cy="78" r="3" fill="none" stroke={sc} strokeWidth="0.4" strokeOpacity="0.3" />
      </>}
      {/* Figure */}
      <circle cx="60" cy="62" r="12" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1" />
      {/* Grand crown */}
      <polygon points="46,52 50,36 56,48 60,30 64,48 70,36 74,52" fill={sc} fillOpacity="0.6" stroke={sc} strokeWidth="0.5" />
      {[50, 60, 70].map((x, i) => (
        <circle key={i} cx={x} cy={i === 1 ? 28 : 34} r="2.5" fill={sc} fillOpacity="0.5" />
      ))}
      {suit === "wands" && <circle cx="60" cy="28" r="2.5" fill={pc} fillOpacity="0.6" />}
      {suit === "cups" && <circle cx="60" cy="28" r="2.5" fill="#5dade2" fillOpacity="0.5" />}
      {suit === "swords" && <polygon points="58,28 60,24 62,28" fill={sc} fillOpacity="0.5" />}
      {suit === "pentacles" && <circle cx="60" cy="28" r="2.5" fill="#f4d03f" fillOpacity="0.5" />}
      {/* Beard hint */}
      <path d="M54,72 Q60,80 66,72" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.3" />
      {/* Robes */}
      <path d="M46,74 L36,150 Q60,146 84,150 L74,74 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
      {/* Robe collar */}
      <path d="M48,76 Q60,82 72,76" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.4" />
      {/* Scepter in right hand */}
      <line x1="84" y1="88" x2="88" y2="145" stroke={sc} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="88" cy="84" r="4" fill={sc} fillOpacity="0.35" stroke={sc} strokeWidth="0.5" />
      {/* Suit item */}
      {suit === "wands" && <line x1="36" y1="85" x2="30" y2="58" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />}
      {suit === "cups" && <path d="M32,92 L28,102 Q32,108 36,102 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />}
      {suit === "swords" && <>
        <line x1="36" y1="85" x2="30" y2="52" stroke={sc} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="26" y1="68" x2="34" y2="68" stroke={sc} strokeWidth="0.8" />
      </>}
      {suit === "pentacles" && <circle cx="34" cy="95" r="8" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />}
      {/* Feet on footrest */}
      <rect x="42" y="150" width="36" height="5" rx="1" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.3" />
    </g>
  ),
};

interface Props { card: TarotCard; }

export function MinorArcanaArt({ card }: Props) {
  const { suit, number, courtRank, primaryColor: pc, secondaryColor: sc } = card;
  if (!suit) return null;

  const pipSize = number === 1 ? 22 : number <= 3 ? 18 : number <= 6 ? 15 : 12;

  if (courtRank) {
    return (
      <>
        {COURT_SHAPES[courtRank](suit, pc, sc)}
      </>
    );
  }

  const layout = PIP_LAYOUTS[number] ?? [];
  return (
    <>
      <PipBackground suit={suit} pc={pc} sc={sc} />
      {layout.map((p, i) => {
        const { cx, cy } = pipToPixel(p.x, p.y);
        return (
          <SuitSymbol key={i} suit={suit} cx={cx} cy={cy} size={pipSize} color={pc} flip={p.flip} />
        );
      })}
    </>
  );
}

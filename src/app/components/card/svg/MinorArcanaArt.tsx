import React from "react";
import { SuitSymbol } from "./SuitSymbol";
import type { TarotCard, CourtRank } from "../../../data/cards";

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

type CourtShapeFn = (pc: string, sc: string) => React.ReactElement;

const COURT_SHAPES: Record<CourtRank, CourtShapeFn> = {
  page: (pc, sc) => (
    <g>
      <circle cx="60" cy="62" r="16" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="1" />
      <rect x="44" y="80" width="32" height="44" rx="4" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
      <circle cx="60" cy="58" r="10" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
      <rect x="56" y="100" width="8" height="24" fill={sc} fillOpacity="0.5" rx="2" />
    </g>
  ),
  knight: (pc, sc) => (
    <g>
      <ellipse cx="60" cy="130" rx="30" ry="16" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
      <circle cx="60" cy="72" r="20" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="1" />
      <polygon points="60,55 72,90 48,90" fill={sc} fillOpacity="0.3" />
      <rect x="40" y="88" width="40" height="30" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
    </g>
  ),
  queen: (pc, sc) => (
    <g>
      <rect x="36" y="78" width="48" height="56" rx="4" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="1" />
      <circle cx="60" cy="60" r="14" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1" />
      <polygon points="46,46 50,36 55,44 60,32 65,44 70,36 74,46" fill={sc} fillOpacity="0.7" />
      <circle cx="60" cy="60" r="10" fill={pc} fillOpacity="0.5" stroke={sc} strokeWidth="0.7" />
    </g>
  ),
  king: (pc, sc) => (
    <g>
      <rect x="30" y="70" width="60" height="70" rx="4" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="1.2" />
      <circle cx="60" cy="55" r="16" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1.2" />
      <polygon points="44,42 48,28 55,40 60,22 65,40 72,28 76,42" fill={sc} fillOpacity="0.8" />
      {([44, 60, 76] as const).map((x, i) => (
        <circle key={i} cx={x} cy={i === 1 ? 18 : 24} r="4" fill={sc} />
      ))}
      <line x1="84" y1="72" x2="84" y2="138" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="84" cy="68" r="5" fill={sc} />
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
        {COURT_SHAPES[courtRank](pc, sc)}
        <SuitSymbol suit={suit} cx={60} cy={105} size={pipSize} color={sc} />
      </>
    );
  }

  const layout = PIP_LAYOUTS[number] ?? [];
  return (
    <>
      {layout.map((p, i) => {
        const { cx, cy } = pipToPixel(p.x, p.y);
        return (
          <SuitSymbol key={i} suit={suit} cx={cx} cy={cy} size={pipSize} color={pc} flip={p.flip} />
        );
      })}
    </>
  );
}

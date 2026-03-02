import { BorderFrame } from "./svg/BorderFrame";
import { MajorArcanaArt } from "./svg/MajorArcanaArt";
import { MinorArcanaArt } from "./svg/MinorArcanaArt";
import type { TarotCard, Suit } from "../../data/cards";

const BORDER_COLORS: Record<string, string> = {
  major:     "#c8a84b",
  wands:     "#e67e22",
  cups:      "#3498db",
  swords:    "#95a5a6",
  pentacles: "#27ae60",
};

interface Props {
  card: TarotCard;
  isReversed?: boolean;
}

export function CardFront({ card, isReversed = false }: Props) {
  const W = 120, H = 210;
  const borderColor = card.arcana === "major"
    ? BORDER_COLORS.major
    : BORDER_COLORS[card.suit as Suit] ?? BORDER_COLORS.major;

  return (
    <svg
      width="100%" height="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: "block", transform: isReversed ? "rotate(180deg)" : undefined }}
    >
      <defs>
        <radialGradient id={`fg-${card.id}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={card.primaryColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={card.secondaryColor} stopOpacity="0.06" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width={W} height={H} rx="8" fill="#100024" />
      <rect width={W} height={H} rx="8" fill={`url(#fg-${card.id})`} />

      {/* Art area */}
      <g clipPath="none">
        {card.arcana === "major"
          ? <MajorArcanaArt number={card.number} primaryColor={card.primaryColor} secondaryColor={card.secondaryColor} />
          : <MinorArcanaArt card={card} />
        }
      </g>

      {/* Border frame */}
      <BorderFrame color={borderColor} width={W} height={H} />

      {/* Roman numeral / number (top) */}
      <text x={W / 2} y="20" textAnchor="middle" fontSize="9" fill={borderColor} fontFamily="Cinzel, serif" letterSpacing="1">
        {card.arcana === "major" ? toRoman(card.number) : card.number === 1 ? "A" : String(card.number)}
      </text>

      {/* Card name (bottom) */}
      <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="7.5" fill={borderColor} fontFamily="Cinzel, serif" letterSpacing="0.5">
        {card.name.toUpperCase()}
      </text>
    </svg>
  );
}

function toRoman(n: number): string {
  const vals = [[21,"XXI"],[20,"XX"],[19,"XIX"],[18,"XVIII"],[17,"XVII"],[16,"XVI"],[15,"XV"],[14,"XIV"],[13,"XIII"],[12,"XII"],[11,"XI"],[10,"X"],[9,"IX"],[8,"VIII"],[7,"VII"],[6,"VI"],[5,"V"],[4,"IV"],[3,"III"],[2,"II"],[1,"I"],[0,"0"]] as const;
  return (vals.find(([v]) => v === n)?.[1] ?? String(n));
}

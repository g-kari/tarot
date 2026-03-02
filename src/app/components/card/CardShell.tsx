"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CardBack } from "./CardBack";
import { CardFront } from "./CardFront";
import { spring } from "../../animations/variants";
import type { TarotCard } from "../../data/cards";

interface Props {
  card: TarotCard;
  isFaceUp: boolean;
  isReversed?: boolean;
  layoutId?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function CardShell({ card, isFaceUp, isReversed = false, layoutId, style, onClick }: Props) {
  const W = 120, H = 210;

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      style={{
        width: W,
        height: H,
        perspective: "1000px",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <motion.div
        animate={{ rotateY: isFaceUp ? 180 : 0 }}
        transition={spring}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back face */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
          <CardBack />
        </div>

        {/* Front face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardFront card={card} isReversed={isReversed} />
        </div>
      </motion.div>
    </motion.div>
  );
}

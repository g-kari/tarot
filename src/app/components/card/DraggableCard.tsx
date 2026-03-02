"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { CardShell } from "./CardShell";
import { cardVariants, spring } from "../../animations/variants";
import type { TarotCard } from "../../data/cards";

interface Props {
  card: TarotCard;
  isFaceUp?: boolean;
  isReversed?: boolean;
  index?: number;
  style?: React.CSSProperties;
}

export function DraggableCard({ card, isFaceUp = false, isReversed = false, index = 0, style }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: { card },
  });

  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
    touchAction: "none" as const,
  };

  return (
    <motion.div
      ref={setNodeRef}
      variants={cardVariants}
      initial="initial"
      animate={isDragging ? "dragging" : "inDeck"}
      whileHover="hover"
      transition={spring}
      style={{ ...dragStyle, ...style, position: "relative", zIndex: index }}
      {...listeners}
      {...attributes}
    >
      <CardShell card={card} isFaceUp={isFaceUp} isReversed={isReversed} layoutId={`card-${card.id}`} />
    </motion.div>
  );
}

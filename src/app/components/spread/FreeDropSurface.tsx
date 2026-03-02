"use client";

import { useRef } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { CardShell } from "../card/CardShell";
import { spring } from "../../animations/variants";
import { useTarotStore, type PlacedCard } from "../../store/useTarotStore";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { TarotCard } from "../../data/cards";

function FreePlacedCard({
  card,
  placed,
  scale,
}: {
  card: TarotCard;
  placed: PlacedCard;
  scale: number;
}) {
  const { revealCard, setSelected } = useTarotStore();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
      data: { card, isPlaced: true },
    });

  function handleClick() {
    if (placed.isRevealed) {
      setSelected(card.id);
    } else {
      revealCard(card.id);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0 : 1,
        touchAction: "none",
        cursor: "grab",
      }}
      {...listeners}
      {...attributes}
      onClick={handleClick}
    >
      <CardShell
        card={card}
        isFaceUp={placed.isRevealed}
        isReversed={placed.isReversed}
        scale={scale}
      />
      {placed.isRevealed && placed.isReversed && (
        <div
          style={{
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "Cinzel, serif",
            fontSize: 6.5,
            letterSpacing: 1.5,
            color: "rgba(220,100,80,0.5)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          ↕ 逆位置
        </div>
      )}
    </div>
  );
}

export function FreeDropSurface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNodeRef, isOver } = useDroppable({ id: "free-surface" });
  const { placedCards, getCardById, draggingCardId } = useTarotStore();
  const isMobile = useIsMobile();
  const cardScale = isMobile ? 0.72 : 1;

  const mergedRef = (el: HTMLDivElement | null) => {
    setNodeRef(el);
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <div
      ref={mergedRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        outline: isOver ? "1px dashed rgba(99,102,241,0.3)" : "none",
        outlineOffset: -4,
        borderRadius: 8,
        transition: "outline-color 0.2s",
      }}
    >
      {placedCards.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "EB Garamond, serif",
            fontSize: 12,
            color: "rgba(168,144,96,0.2)",
            letterSpacing: 2,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          カードをここにドラッグ
        </div>
      )}

      <AnimatePresence>
        {placedCards.map((placed) => {
          if (!placed.freePos) return null;
          const card = getCardById(placed.cardId);
          if (!card) return null;
          const isBeingDragged = draggingCardId === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: isBeingDragged ? 0 : 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={spring}
              style={{
                position: "absolute",
                left: `${placed.freePos.x * 100}%`,
                top: `${placed.freePos.y * 100}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 5,
              }}
            >
              <FreePlacedCard card={card} placed={placed} scale={cardScale} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

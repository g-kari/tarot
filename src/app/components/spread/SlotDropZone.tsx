"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { CardShell } from "../card/CardShell";
import { slotVariants, spring } from "../../animations/variants";
import { useTarotStore } from "../../store/useTarotStore";
import type { SpreadSlot } from "../../data/spreads";

interface Props {
  slot: SpreadSlot;
}

export function SlotDropZone({ slot }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: slot.id });
  const { placedCards, revealCard, getCardById } = useTarotStore();

  const placed = placedCards.find((p) => p.slotId === slot.id);
  const card = placed ? getCardById(placed.cardId) : undefined;

  const W = 120, H = 210;

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%)${slot.rotation ? ` rotate(${slot.rotation}deg)` : ""}`,
        width: W,
        height: H,
        zIndex: slot.rotation ? 2 : 1,
      }}
    >
      <AnimatePresence mode="wait">
        {card && placed ? (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={spring}
          >
            <CardShell
              card={card}
              isFaceUp={placed.isRevealed}
              isReversed={placed.isReversed}
              onClick={() => !placed.isRevealed && revealCard(card.id)}
              style={{ cursor: placed.isRevealed ? "default" : "pointer" }}
            />
            {!placed.isRevealed && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}>
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    width: 28, height: 28,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(168,144,96,0.35) 0%, transparent 70%)",
                  }}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            variants={slotVariants}
            animate={isOver ? "over" : "empty"}
            transition={spring}
            style={{
              width: W, height: H,
              borderRadius: 8,
              border: "1px dashed",
              background: isOver ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.015)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div style={{
              color: "rgba(168,144,96,0.4)",
              fontSize: 8,
              fontFamily: "Cinzel, serif",
              letterSpacing: 2,
              textAlign: "center",
              padding: "0 10px",
            }}>
              {slot.label.toUpperCase()}
            </div>
            <div style={{
              color: "rgba(99,102,241,0.25)",
              fontSize: 8,
              fontFamily: "EB Garamond, serif",
              textAlign: "center",
              padding: "0 12px",
              lineHeight: 1.4,
            }}>
              {slot.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { DraggableCard } from "../card/DraggableCard";
import { useTarotStore } from "../../store/useTarotStore";
import { spring } from "../../animations/variants";

interface Props {
  compact?: boolean;
}

const VISIBLE_STACK = 5;

export function DeckPile({ compact = false }: Props) {
  const { deck, isShuffling } = useTarotStore();
  const { setNodeRef, isOver } = useDroppable({ id: "deck-pile" });

  const visible = deck.slice(0, VISIBLE_STACK);
  const top = deck[0];
  const scale = compact ? 0.55 : 1;
  const W = Math.round(120 * scale);
  const H = Math.round(210 * scale);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 10 : 0, flexDirection: compact ? "row" : "column" }}>
      <div
        ref={setNodeRef}
        style={{ position: "relative", width: W, height: H, flexShrink: 0 }}
      >
        {/* Stack shadow cards - hidden in compact mode */}
        {!compact && visible.slice(1).reverse().map((card, i) => {
          const depth = visible.length - 1 - i;
          return (
            <motion.div
              key={card.id}
              animate={isShuffling ? {
                x: (Math.random() - 0.5) * 80,
                y: (Math.random() - 0.5) * 30,
                rotate: (Math.random() - 0.5) * 25,
              } : {
                x: depth * 1.5,
                y: depth * 1.5,
                rotate: (depth - visible.length / 2) * 0.4,
              }}
              transition={spring}
              style={{ position: "absolute", opacity: 0.55 + depth * 0.08 }}
            >
              <DraggableCard card={card} isFaceUp={false} index={depth} />
            </motion.div>
          );
        })}

        {/* Top (draggable) card */}
        <AnimatePresence>
          {top && (
            <motion.div
              key={top.id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: compact ? scale : 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={spring}
              style={{ position: "absolute", transformOrigin: "top left" }}
            >
              <DraggableCard card={top} isFaceUp={false} index={VISIBLE_STACK} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty deck */}
        {deck.length === 0 && (
          <div style={{
            width: W, height: H,
            border: "1px dashed rgba(99,102,241,0.25)",
            borderRadius: compact ? 5 : 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(99,102,241,0.3)",
            fontSize: compact ? 8 : 11,
            fontFamily: "Cinzel, serif",
            letterSpacing: 1,
          }}>
            EMPTY
          </div>
        )}

        {/* Drop glow */}
        {isOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute", inset: -3,
              borderRadius: 10,
              border: "1.5px solid rgba(99,102,241,0.5)",
              boxShadow: "0 0 14px rgba(99,102,241,0.3)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Card count */}
      <div style={{
        color: "rgba(168,144,96,0.45)",
        fontSize: compact ? 9 : 10,
        fontFamily: "Cinzel, serif",
        letterSpacing: 1,
        whiteSpace: "nowrap",
        ...(compact ? {} : {
          position: "absolute",
          bottom: -24,
          left: "50%",
          transform: "translateX(-50%)",
        }),
      }}>
        {deck.length}
      </div>
    </div>
  );
}

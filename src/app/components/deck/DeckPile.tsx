"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { DraggableCard } from "../card/DraggableCard";
import { useTarotStore } from "../../store/useTarotStore";
import { spring } from "../../animations/variants";

const VISIBLE_STACK = 5;

export function DeckPile() {
  const { deck, isShuffling } = useTarotStore();
  const { setNodeRef, isOver } = useDroppable({ id: "deck-pile" });

  const visible = deck.slice(0, VISIBLE_STACK);
  const top = deck[0];

  return (
    <div ref={setNodeRef} style={{ position: "relative", width: 120, height: 210 }}>
      {/* Stack shadow cards */}
      {visible.slice(1).reverse().map((card, i) => {
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
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={spring}
            style={{ position: "absolute" }}
          >
            <DraggableCard card={top} isFaceUp={false} index={VISIBLE_STACK} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty deck */}
      {deck.length === 0 && (
        <div style={{
          width: 120, height: 210,
          border: "2px dashed rgba(139,92,246,0.3)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(139,92,246,0.4)",
          fontSize: 11,
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
            position: "absolute", inset: -4,
            borderRadius: 10,
            border: "2px solid rgba(139,92,246,0.7)",
            boxShadow: "0 0 20px rgba(139,92,246,0.4)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Card count badge */}
      <div style={{
        position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)",
        color: "rgba(200,168,75,0.5)", fontSize: 10, fontFamily: "Cinzel, serif", letterSpacing: 1,
        whiteSpace: "nowrap",
      }}>
        {deck.length} CARDS
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTarotStore } from "../../store/useTarotStore";
import { buttonVariants } from "../../animations/variants";

const btnBase: React.CSSProperties = {
  display: "block",
  padding: "7px 16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 4,
  color: "rgba(168,144,96,0.7)",
  fontFamily: "Cinzel, serif",
  fontSize: 9,
  letterSpacing: 2.5,
  cursor: "pointer",
  outline: "none",
  whiteSpace: "nowrap",
};

export function DeckControls() {
  const { shuffleDeck, resetReading, isShuffling } = useTarotStore();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={shuffleDeck}
        disabled={isShuffling}
        style={{
          ...btnBase,
          opacity: isShuffling ? 0.4 : 1,
          borderColor: isShuffling ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.2)",
        }}
      >
        {isShuffling ? "SHUFFLING" : "SHUFFLE"}
      </motion.button>

      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={resetReading}
        style={{
          ...btnBase,
          color: "rgba(168,144,96,0.35)",
          fontSize: 8,
          letterSpacing: 2,
        }}
      >
        RESET
      </motion.button>
    </div>
  );
}

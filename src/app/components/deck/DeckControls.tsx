"use client";

import { motion } from "framer-motion";
import { useTarotStore } from "../../store/useTarotStore";
import { buttonVariants, tweenFast } from "../../animations/variants";

const btnBase: React.CSSProperties = {
  display: "block",
  padding: "8px 18px",
  background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(100,60,200,0.15))",
  border: "1px solid rgba(139,92,246,0.45)",
  borderRadius: 6,
  color: "#c8a84b",
  fontFamily: "Cinzel, serif",
  fontSize: 11,
  letterSpacing: 2,
  cursor: "pointer",
  outline: "none",
  whiteSpace: "nowrap",
};

export function DeckControls() {
  const { shuffleDeck, resetReading, isShuffling, deck } = useTarotStore();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={shuffleDeck}
        disabled={isShuffling}
        style={{
          ...btnBase,
          opacity: isShuffling ? 0.5 : 1,
          boxShadow: isShuffling ? "none" : "0 0 12px rgba(139,92,246,0.25)",
        }}
      >
        {isShuffling ? "✦ SHUFFLING ✦" : "✦ SHUFFLE ✦"}
      </motion.button>

      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={resetReading}
        style={{
          ...btnBase,
          background: "rgba(139,92,246,0.07)",
          borderColor: "rgba(139,92,246,0.25)",
          color: "rgba(180,140,100,0.6)",
          fontSize: 10,
          letterSpacing: 1.5,
        }}
      >
        RESET
      </motion.button>
    </div>
  );
}

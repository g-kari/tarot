"use client";

import { motion } from "framer-motion";
import { useTarotStore } from "../../store/useTarotStore";
import { SPREADS } from "../../data/spreads";
import { buttonVariants } from "../../animations/variants";

export function SpreadSelector() {
  const { activeSpread, setActiveSpread } = useTarotStore();

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {SPREADS.map((spread) => {
        const isActive = spread.id === activeSpread.id;
        return (
          <motion.button
            key={spread.id}
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setActiveSpread(spread)}
            style={{
              padding: "5px 12px",
              background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
              border: `1px solid ${isActive ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 4,
              color: isActive ? "rgba(168,144,96,0.8)" : "rgba(168,144,96,0.3)",
              fontFamily: "Cinzel, serif",
              fontSize: 8,
              letterSpacing: 2,
              cursor: "pointer",
              outline: "none",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            {spread.name.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTarotStore } from "../../store/useTarotStore";
import { SPREADS } from "../../data/spreads";
import { buttonVariants, spring } from "../../animations/variants";

export function SpreadSelector() {
  const { activeSpread, setActiveSpread } = useTarotStore();

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
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
              padding: "6px 14px",
              background: isActive
                ? "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(100,60,200,0.25))"
                : "rgba(139,92,246,0.06)",
              border: `1px solid ${isActive ? "rgba(139,92,246,0.7)" : "rgba(139,92,246,0.2)"}`,
              borderRadius: 5,
              color: isActive ? "#c8a84b" : "rgba(180,140,100,0.5)",
              fontFamily: "Cinzel, serif",
              fontSize: 9,
              letterSpacing: 1.5,
              cursor: "pointer",
              outline: "none",
              whiteSpace: "nowrap",
              boxShadow: isActive ? "0 0 12px rgba(139,92,246,0.3)" : "none",
              transition: "box-shadow 0.2s",
            }}
          >
            {spread.name.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}

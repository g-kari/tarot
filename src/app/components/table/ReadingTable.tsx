"use client";

import { SpreadLayout } from "../spread/SpreadLayout";
import { DeckPile } from "../deck/DeckPile";
import { DeckControls } from "../deck/DeckControls";
import { SpreadSelector } from "../spread/SpreadSelector";
import { CardMeaningPanel } from "../card/CardMeaningPanel";
import { useTarotStore } from "../../store/useTarotStore";
import { motion } from "framer-motion";

export function ReadingTable() {
  const { activeSpread } = useTarotStore();

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Top bar */}
      <div style={{
        position: "relative",
        zIndex: 10,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(5,6,9,0.6)",
        backdropFilter: "blur(8px)",
        flexShrink: 0,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: 11,
            letterSpacing: 5,
            color: "rgba(168,144,96,0.6)",
          }}
        >
          TAROT
        </motion.div>

        <SpreadSelector />
      </div>

      {/* Main area: deck on the left, spread on the right */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* Deck panel */}
        <div style={{
          width: 180,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "24px 0",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.2)",
          zIndex: 5,
        }}>
          <DeckPile />
          <DeckControls />
        </div>

        {/* Spread area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Spread name */}
          <motion.div
            key={activeSpread.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "Cinzel, serif",
              fontSize: 9,
              letterSpacing: 4,
              color: "rgba(99,102,241,0.3)",
              zIndex: 5,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {activeSpread.name.toUpperCase()}
          </motion.div>

          <SpreadLayout spread={activeSpread} />
          <CardMeaningPanel />
        </div>
      </div>

      {/* Ambient particles - very subtle */}
      <Particles />
    </div>
  );
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${12 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(168,144,96,0.5)" : "rgba(99,102,241,0.5)",
          }}
        />
      ))}
    </div>
  );
}

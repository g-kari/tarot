"use client";

import { SpreadLayout } from "../spread/SpreadLayout";
import { DeckPile } from "../deck/DeckPile";
import { DeckControls } from "../deck/DeckControls";
import { SpreadSelector } from "../spread/SpreadSelector";
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
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(139,92,246,0.12)",
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(4px)",
        flexShrink: 0,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontFamily: "Cinzel Decorative, Cinzel, serif",
            fontSize: 16,
            letterSpacing: 4,
            color: "#c8a84b",
            textShadow: "0 0 20px rgba(200,168,75,0.4)",
          }}
        >
          ✦ TAROT ✦
        </motion.div>

        <SpreadSelector />
      </div>

      {/* Main area: deck on the left, spread on the right */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* Deck panel */}
        <div style={{
          width: 200,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "24px 0",
          borderRight: "1px solid rgba(139,92,246,0.1)",
          background: "rgba(0,0,0,0.15)",
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "Cinzel, serif",
              fontSize: 10,
              letterSpacing: 3,
              color: "rgba(139,92,246,0.5)",
              zIndex: 5,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {activeSpread.name.toUpperCase()}
          </motion.div>

          <SpreadLayout spread={activeSpread} />
        </div>
      </div>

      {/* Ambient particles */}
      <Particles />
    </div>
  );
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${8 + i * 7.5}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(200,168,75,0.4)" : "rgba(139,92,246,0.4)",
          }}
        />
      ))}
    </div>
  );
}

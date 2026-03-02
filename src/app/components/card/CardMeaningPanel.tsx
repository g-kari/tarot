"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTarotStore } from "../../store/useTarotStore";

export function CardMeaningPanel() {
  const { placedCards, selectedCardId, activeSpread, getCardById, setSelected } = useTarotStore();

  const revealedPlaced = placedCards.filter((p) => p.isRevealed);
  const activePlaced = selectedCardId
    ? revealedPlaced.find((p) => p.cardId === selectedCardId)
    : revealedPlaced[revealedPlaced.length - 1];

  const card = activePlaced ? getCardById(activePlaced.cardId) : undefined;
  const slot = activePlaced
    ? activeSpread.slots.find((s) => s.id === activePlaced.slotId)
    : undefined;

  return (
    <AnimatePresence>
      {card && activePlaced && (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            background: "rgba(5,6,9,0.88)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.055)",
            padding: "14px 20px 16px",
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
            {(slot || activeSpread.slots.length === 0) && (
              <span style={{
                fontFamily: "Cinzel, serif",
                fontSize: 7,
                letterSpacing: 3,
                color: slot ? "rgba(99,102,241,0.45)" : "rgba(168,144,96,0.3)",
                textTransform: "uppercase",
                flexShrink: 0,
              }}>
                {slot ? slot.label : "自由配置"}
              </span>
            )}
            <span style={{
              fontFamily: "Cinzel, serif",
              fontSize: 12,
              letterSpacing: 2,
              color: "rgba(204,200,192,0.88)",
            }}>
              {card.name}
            </span>
            <span style={{
              fontFamily: "Cinzel, serif",
              fontSize: 7,
              letterSpacing: 1.5,
              color: activePlaced.isReversed ? "rgba(220,100,80,0.65)" : "rgba(168,144,96,0.55)",
              border: "1px solid",
              borderColor: activePlaced.isReversed ? "rgba(220,100,80,0.25)" : "rgba(168,144,96,0.2)",
              borderRadius: 3,
              padding: "1px 5px",
              flexShrink: 0,
            }}>
              {activePlaced.isReversed ? "逆位置" : "正位置"}
            </span>
          </div>

          {/* Meaning */}
          <p style={{
            fontFamily: "EB Garamond, serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: "rgba(196,192,184,0.72)",
            marginBottom: revealedPlaced.length > 1 ? 10 : 0,
          }}>
            {activePlaced.isReversed ? card.reversedMeaning : card.uprightMeaning}
          </p>

          {/* Keywords */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8, marginBottom: revealedPlaced.length > 1 ? 10 : 0 }}>
            {card.keywords.map((kw) => (
              <span key={kw} style={{
                fontFamily: "Cinzel, serif",
                fontSize: 6.5,
                letterSpacing: 1.5,
                color: "rgba(99,102,241,0.38)",
                border: "1px solid rgba(99,102,241,0.12)",
                borderRadius: 2,
                padding: "2px 6px",
              }}>
                {kw}
              </span>
            ))}
          </div>

          {/* Navigation dots — shown when multiple cards are revealed */}
          {revealedPlaced.length > 1 && (
            <div style={{ display: "flex", gap: 5, justifyContent: "center", paddingTop: 2 }}>
              {revealedPlaced.map((p) => {
                const isActive = p.cardId === activePlaced.cardId;
                return (
                  <button
                    key={p.cardId}
                    onClick={() => setSelected(p.cardId)}
                    style={{
                      width: isActive ? 14 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: isActive ? "rgba(168,144,96,0.6)" : "rgba(255,255,255,0.12)",
                      border: "none",
                      cursor: "pointer",
                      transition: "width 0.2s, background 0.2s",
                      flexShrink: 0,
                    }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

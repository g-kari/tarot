"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardShell } from "../card/CardShell";
import { FULL_DECK, type TarotCard, type Suit } from "../../data/cards";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Filter = "all" | "major" | Suit;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "全て" },
  { id: "major", label: "大アルカナ" },
  { id: "wands", label: "ワンド" },
  { id: "cups", label: "カップ" },
  { id: "swords", label: "ソード" },
  { id: "pentacles", label: "ペンタクル" },
];

function filterCards(filter: Filter): TarotCard[] {
  if (filter === "all") return FULL_DECK;
  if (filter === "major") return FULL_DECK.filter((c) => c.arcana === "major");
  return FULL_DECK.filter((c) => c.suit === filter);
}

export function CardGallery({ open, onClose }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<TarotCard | null>(null);
  const isMobile = useIsMobile();
  const cards = filterCards(filter);
  const cardScale = isMobile ? 0.5 : 0.65;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(5,6,9,0.96)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "12px 16px" : "14px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "Cinzel, serif",
              fontSize: 14,
              letterSpacing: 3,
              color: "rgba(168,144,96,0.8)",
            }}>
              カード図鑑
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.35)",
                fontSize: 20, cursor: "pointer", padding: "4px 8px",
              }}
            >
              ×
            </button>
          </div>

          {/* Filter tabs */}
          <div style={{
            display: "flex",
            gap: 4,
            padding: isMobile ? "8px 16px" : "10px 24px",
            overflowX: "auto",
            flexShrink: 0,
          }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); setSelected(null); }}
                style={{
                  padding: isMobile ? "4px 8px" : "5px 12px",
                  background: filter === f.id ? "rgba(99,102,241,0.12)" : "transparent",
                  border: `1px solid ${filter === f.id ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 4,
                  color: filter === f.id ? "rgba(168,144,96,0.8)" : "rgba(168,144,96,0.35)",
                  fontFamily: "Cinzel, serif",
                  fontSize: isMobile ? 7 : 8,
                  letterSpacing: 1.5,
                  cursor: "pointer",
                  outline: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid / Detail view */}
          <div style={{ flex: 1, overflow: "auto", padding: isMobile ? "12px 12px" : "16px 24px" }}>
            <AnimatePresence mode="wait">
              {selected ? (
                /* Detail view */
                <motion.div
                  key={`detail-${selected.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 0",
                  }}
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(null)}
                    style={{
                      alignSelf: "flex-start",
                      padding: "5px 14px",
                      background: "rgba(168,144,96,0.06)",
                      border: "1px solid rgba(168,144,96,0.15)",
                      borderRadius: 4,
                      color: "rgba(168,144,96,0.6)",
                      fontFamily: "Cinzel, serif",
                      fontSize: 8,
                      letterSpacing: 2,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    ← 戻る
                  </motion.button>

                  <CardShell card={selected} isFaceUp={true} isReversed={false} scale={isMobile ? 1 : 1.2} />

                  <div style={{ textAlign: "center", maxWidth: 360 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: 7,
                        letterSpacing: 1.5,
                        color: "rgba(99,102,241,0.4)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        borderRadius: 3,
                        padding: "2px 6px",
                      }}>
                        {selected.arcana === "major" ? `大アルカナ ${selected.number}` : `${selected.number}`}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: 18,
                      letterSpacing: 2,
                      color: "rgba(235,230,220,0.9)",
                      margin: "0 0 12px",
                    }}>
                      {selected.name}
                    </h3>

                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5, marginBottom: 16 }}>
                      {selected.keywords.map((kw) => (
                        <span key={kw} style={{
                          fontFamily: "EB Garamond, serif",
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: "rgba(99,102,241,0.07)",
                          color: "rgba(99,102,241,0.55)",
                          border: "1px solid rgba(99,102,241,0.12)",
                        }}>
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      marginBottom: 10,
                      textAlign: "left",
                    }}>
                      <div style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: 8,
                        letterSpacing: 2,
                        color: "rgba(168,144,96,0.5)",
                        marginBottom: 6,
                      }}>
                        正位置
                      </div>
                      <p style={{
                        fontFamily: "EB Garamond, serif",
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(196,192,184,0.75)",
                        margin: 0,
                      }}>
                        {selected.uprightMeaning}
                      </p>
                    </div>

                    <div style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      textAlign: "left",
                    }}>
                      <div style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: 8,
                        letterSpacing: 2,
                        color: "rgba(220,100,80,0.45)",
                        marginBottom: 6,
                      }}>
                        逆位置
                      </div>
                      <p style={{
                        fontFamily: "EB Garamond, serif",
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(196,192,184,0.75)",
                        margin: 0,
                      }}>
                        {selected.reversedMeaning}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Grid view */
                <motion.div
                  key={`grid-${filter}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fill, minmax(${Math.round(120 * cardScale) + 8}px, 1fr))`,
                    gap: isMobile ? 8 : 12,
                    justifyItems: "center",
                  }}
                >
                  {cards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.015, 0.5), duration: 0.2 }}
                      onClick={() => setSelected(card)}
                      style={{ cursor: "pointer", textAlign: "center" }}
                    >
                      <CardShell card={card} isFaceUp={true} isReversed={false} scale={cardScale} />
                      <div style={{
                        fontFamily: "EB Garamond, serif",
                        fontSize: isMobile ? 9 : 10,
                        color: "rgba(196,192,184,0.5)",
                        marginTop: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: Math.round(120 * cardScale),
                      }}>
                        {card.name}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

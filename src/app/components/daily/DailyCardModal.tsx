"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardShell } from "../card/CardShell";
import { FULL_DECK, type TarotCard } from "../../data/cards";
import { spring } from "../../animations/variants";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface DailyRecord {
  date: string;
  cardId: string;
  isReversed: boolean;
}

const STORAGE_KEY = "tarot-daily";

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function hashSeed(seed: string, mod: number): number {
  let h = 1;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) % 2147483647;
  }
  return ((h % mod) + mod) % mod;
}

function pickDailyCard(dateStr: string): { card: TarotCard; isReversed: boolean } {
  const cardIndex = hashSeed(dateStr, FULL_DECK.length);
  const card = FULL_DECK[cardIndex];
  const isReversed = hashSeed(dateStr + "-rev", 100) < 25;
  return { card, isReversed };
}

function loadDaily(): DailyRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DailyRecord) : null;
  } catch { return null; }
}

function saveDaily(record: DailyRecord): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(record)); } catch {}
}

export function DailyCardModal({ open, onClose }: Props) {
  const [isFaceUp, setIsFaceUp] = useState(false);
  const [alreadyDrawn, setAlreadyDrawn] = useState(false);
  const [daily, setDaily] = useState<{ card: TarotCard; isReversed: boolean } | null>(null);

  useEffect(() => {
    if (!open) return;
    const today = todayString();
    const saved = loadDaily();

    if (saved && saved.date === today) {
      const card = FULL_DECK.find((c) => c.id === saved.cardId);
      if (card) {
        setDaily({ card, isReversed: saved.isReversed });
        setIsFaceUp(true);
        setAlreadyDrawn(true);
        return;
      }
    }

    const pick = pickDailyCard(today);
    setDaily(pick);
    setIsFaceUp(false);
    setAlreadyDrawn(false);
    saveDaily({ date: today, cardId: pick.card.id, isReversed: pick.isReversed });

    const timer = setTimeout(() => setIsFaceUp(true), 800);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setIsFaceUp(false); setAlreadyDrawn(false); setDaily(null); }, 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && daily && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5,6,9,0.92)",
            backdropFilter: "blur(14px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={spring}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              padding: "32px 28px 24px",
              maxWidth: 380,
              width: "90vw",
              borderRadius: 16,
              background: "rgba(12,13,18,0.85)",
              border: "1px solid rgba(168,144,96,0.18)",
            }}
          >
            <h2 style={{
              margin: 0,
              fontFamily: "Cinzel, serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              color: "rgba(168,144,96,0.9)",
            }}>
              今日のカード
            </h2>

            <span style={{
              fontFamily: "EB Garamond, serif",
              fontSize: 13,
              color: "rgba(168,144,96,0.45)",
              marginTop: -12,
            }}>
              {todayString()}
            </span>

            <motion.div
              initial={alreadyDrawn ? { scale: 1 } : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...spring, delay: alreadyDrawn ? 0 : 0.1 }}
            >
              <CardShell
                card={daily.card}
                isFaceUp={isFaceUp}
                isReversed={daily.isReversed}
                scale={1.3}
              />
            </motion.div>

            <AnimatePresence>
              {isFaceUp && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  <span style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: 16,
                    color: "rgba(235,230,220,0.92)",
                    letterSpacing: 2,
                  }}>
                    {daily.card.name}
                  </span>

                  <span style={{
                    fontFamily: "EB Garamond, serif",
                    fontSize: 12,
                    padding: "2px 10px",
                    borderRadius: 8,
                    background: daily.isReversed ? "rgba(192,57,43,0.15)" : "rgba(99,102,241,0.12)",
                    color: daily.isReversed ? "rgba(231,76,60,0.85)" : "rgba(139,92,246,0.85)",
                    border: `1px solid ${daily.isReversed ? "rgba(192,57,43,0.25)" : "rgba(99,102,241,0.2)"}`,
                  }}>
                    {daily.isReversed ? "逆位置" : "正位置"}
                  </span>

                  <p style={{
                    fontFamily: "EB Garamond, serif",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "rgba(200,196,188,0.8)",
                    textAlign: "center",
                    margin: "4px 0 0",
                  }}>
                    {daily.isReversed ? daily.card.reversedMeaning : daily.card.uprightMeaning}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5, marginTop: 2 }}>
                    {daily.card.keywords.map((kw) => (
                      <span key={kw} style={{
                        fontFamily: "EB Garamond, serif",
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "rgba(168,144,96,0.08)",
                        color: "rgba(168,144,96,0.65)",
                        border: "1px solid rgba(168,144,96,0.12)",
                      }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              style={{
                marginTop: 4,
                padding: "9px 30px",
                fontFamily: "Cinzel, serif",
                fontSize: 11,
                letterSpacing: 2,
                color: "rgba(168,144,96,0.8)",
                background: "rgba(168,144,96,0.06)",
                border: "1px solid rgba(168,144,96,0.18)",
                borderRadius: 8,
                cursor: "pointer",
                outline: "none",
              }}
            >
              閉じる
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

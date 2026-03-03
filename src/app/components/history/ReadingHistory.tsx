"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadingHistory, type ReadingRecord } from "../../hooks/useReadingHistory";
import { FULL_DECK } from "../../data/cards";

interface Props {
  open: boolean;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function cardName(id: string): string {
  return FULL_DECK.find((c) => c.id === id)?.name ?? id;
}

export function ReadingHistory({ open, onClose }: Props) {
  const { records, deleteReading, clearHistory } = useReadingHistory();
  const [expanded, setExpanded] = useState<string | null>(null);

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
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            padding: 20,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(5,6,9,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              maxWidth: 500,
              width: "100%",
              maxHeight: "85vh",
              margin: "auto",
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
              padding: "16px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "Cinzel, serif",
                fontSize: 13,
                letterSpacing: 3,
                color: "rgba(168,144,96,0.8)",
              }}>
                リーディング履歴
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {records.length > 0 && (
                  <button
                    onClick={() => { if (confirm("全履歴を削除しますか？")) clearHistory(); }}
                    style={{
                      background: "none", border: "1px solid rgba(220,100,80,0.2)",
                      borderRadius: 3, padding: "3px 8px",
                      color: "rgba(220,100,80,0.5)", fontSize: 8,
                      fontFamily: "Cinzel, serif", letterSpacing: 1,
                      cursor: "pointer", outline: "none",
                    }}
                  >
                    全削除
                  </button>
                )}
                <button
                  onClick={onClose}
                  style={{
                    background: "none", border: "none", color: "rgba(255,255,255,0.3)",
                    fontSize: 18, cursor: "pointer", padding: "4px 8px",
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflow: "auto", padding: "12px 20px" }}>
              {records.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "40px 0",
                  fontFamily: "EB Garamond, serif",
                  fontSize: 14,
                  color: "rgba(196,192,184,0.35)",
                }}>
                  履歴がまだありません
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {records.map((rec: ReadingRecord) => (
                    <motion.div
                      key={rec.id}
                      layout
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 6,
                        padding: "12px 14px",
                        cursor: "pointer",
                      }}
                      onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
                    >
                      {/* Summary row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{
                            fontFamily: "Cinzel, serif",
                            fontSize: 10,
                            letterSpacing: 1.5,
                            color: "rgba(168,144,96,0.7)",
                            marginBottom: 4,
                          }}>
                            {rec.spreadName}
                            {rec.theme && (
                              <span style={{
                                marginLeft: 8,
                                color: "rgba(99,102,241,0.5)",
                                fontSize: 8,
                                border: "1px solid rgba(99,102,241,0.15)",
                                borderRadius: 2,
                                padding: "1px 5px",
                              }}>
                                {rec.theme}
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontFamily: "EB Garamond, serif",
                            fontSize: 11,
                            color: "rgba(196,192,184,0.4)",
                          }}>
                            {formatDate(rec.date)} · {rec.cards.length}枚
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteReading(rec.id); }}
                          style={{
                            background: "none", border: "none",
                            color: "rgba(220,100,80,0.35)", fontSize: 14,
                            cursor: "pointer", padding: "4px",
                          }}
                          title="削除"
                        >
                          ×
                        </button>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {expanded === rec.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{
                              marginTop: 10,
                              paddingTop: 10,
                              borderTop: "1px solid rgba(255,255,255,0.04)",
                            }}>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                                {rec.cards.map((c) => (
                                  <span key={c.cardId} style={{
                                    fontFamily: "EB Garamond, serif",
                                    fontSize: 11,
                                    color: c.isReversed ? "rgba(220,100,80,0.6)" : "rgba(196,192,184,0.6)",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    borderRadius: 3,
                                    padding: "2px 7px",
                                  }}>
                                    {cardName(c.cardId)}{c.isReversed ? " (逆)" : ""}
                                  </span>
                                ))}
                              </div>
                              {rec.aiReading && (
                                <p style={{
                                  fontFamily: "EB Garamond, serif",
                                  fontSize: 12,
                                  lineHeight: 1.6,
                                  color: "rgba(196,192,184,0.55)",
                                  whiteSpace: "pre-wrap",
                                }}>
                                  {rec.aiReading}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAIReading, READING_THEMES, type ReadingTheme } from "../../hooks/useAIReading";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaveReading?: (theme: string, reading: string) => void;
}

export function AIReadingPanel({ open, onClose, onSaveReading }: Props) {
  const { loading, reading, error, theme, requestReading, reset } = useAIReading();

  function handleClose() {
    reset();
    onClose();
  }

  function handleThemeSelect(t: ReadingTheme) {
    requestReading(t);
  }

  const showThemeSelector = !loading && !reading && !error;
  const themeLabel = theme ? READING_THEMES.find((t) => t.id === theme)?.label : null;

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
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(5,6,9,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "24px 28px",
              maxWidth: 440,
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{
                fontFamily: "Cinzel, serif",
                fontSize: 13,
                letterSpacing: 3,
                color: "rgba(168,144,96,0.8)",
              }}>
                AIリーディング
              </span>
              <button
                onClick={handleClose}
                style={{
                  background: "none", border: "none", color: "rgba(255,255,255,0.3)",
                  fontSize: 18, cursor: "pointer", padding: "4px 8px",
                }}
              >
                ×
              </button>
            </div>

            {/* Theme selector */}
            {showThemeSelector && (
              <div>
                <p style={{
                  fontFamily: "EB Garamond, serif",
                  fontSize: 14,
                  color: "rgba(196,192,184,0.65)",
                  marginBottom: 16,
                }}>
                  占いたいテーマを選んでください
                </p>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 8,
                }}>
                  {READING_THEMES.map((t) => (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleThemeSelect(t.id)}
                      style={{
                        padding: "12px 10px",
                        background: "rgba(99,102,241,0.06)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        borderRadius: 6,
                        color: "rgba(168,144,96,0.75)",
                        fontFamily: "Cinzel, serif",
                        fontSize: 11,
                        letterSpacing: 2,
                        cursor: "pointer",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {t.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: 32,
                    height: 32,
                    border: "2px solid rgba(99,102,241,0.2)",
                    borderTopColor: "rgba(99,102,241,0.7)",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                  }}
                />
                <p style={{
                  fontFamily: "EB Garamond, serif",
                  fontSize: 13,
                  color: "rgba(196,192,184,0.5)",
                }}>
                  {themeLabel}のリーディング中...
                </p>
              </div>
            )}

            {/* Reading result */}
            {reading && (
              <div>
                <div style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: 8,
                  letterSpacing: 2,
                  color: "rgba(99,102,241,0.4)",
                  marginBottom: 12,
                }}>
                  {themeLabel}
                </div>
                <p style={{
                  fontFamily: "EB Garamond, serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(204,200,192,0.85)",
                  whiteSpace: "pre-wrap",
                }}>
                  {reading}
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                  {onSaveReading && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onSaveReading(themeLabel ?? "総合運", reading);
                        handleClose();
                      }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        borderRadius: 5,
                        color: "rgba(99,102,241,0.7)",
                        fontFamily: "Cinzel, serif",
                        fontSize: 9,
                        letterSpacing: 2,
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      履歴に保存
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "rgba(168,144,96,0.08)",
                      border: "1px solid rgba(168,144,96,0.2)",
                      borderRadius: 5,
                      color: "rgba(168,144,96,0.65)",
                      fontFamily: "Cinzel, serif",
                      fontSize: 9,
                      letterSpacing: 2,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    閉じる
                  </motion.button>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{
                  fontFamily: "EB Garamond, serif",
                  fontSize: 13,
                  color: "rgba(220,100,80,0.7)",
                  marginBottom: 16,
                }}>
                  {error}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  style={{
                    padding: "8px 20px",
                    background: "rgba(168,144,96,0.08)",
                    border: "1px solid rgba(168,144,96,0.2)",
                    borderRadius: 5,
                    color: "rgba(168,144,96,0.65)",
                    fontFamily: "Cinzel, serif",
                    fontSize: 9,
                    letterSpacing: 2,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  戻る
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

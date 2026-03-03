"use client";

import { useState, useCallback, useRef } from "react";
import { SpreadLayout } from "../spread/SpreadLayout";
import { DeckPile } from "../deck/DeckPile";
import { DeckControls } from "../deck/DeckControls";
import { SpreadSelector } from "../spread/SpreadSelector";
import { CardMeaningPanel } from "../card/CardMeaningPanel";
import { PeerPanel } from "../common/PeerPanel";
import { ScreenshotButton } from "../common/ScreenshotButton";
import { AIReadingPanel } from "../ai/AIReadingPanel";
import { ReadingHistory } from "../history/ReadingHistory";
import { DailyCardModal } from "../daily/DailyCardModal";
import { CardGallery } from "../gallery/CardGallery";
import { useTarotStore } from "../../store/useTarotStore";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useReadingHistory } from "../../hooks/useReadingHistory";
import { motion, AnimatePresence } from "framer-motion";

export function ReadingTable() {
  const { activeSpread, placedCards, isViewOnly } = useTarotStore();
  const isMobile = useIsMobile();
  const { saveReading } = useReadingHistory();
  const spreadAreaRef = useRef<HTMLDivElement>(null);

  const [toast, setToast] = useState<string | null>(null);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [peerOpen, setPeerOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [dailyOpen, setDailyOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const hasRevealedCards = placedCards.some((p) => p.isRevealed);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  async function handleNotification() {
    if (!("Notification" in window)) { showToast("未対応"); return; }
    if (Notification.permission === "denied") { showToast("通知がブロック済み"); return; }
    if (Notification.permission === "default") {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") { showToast("権限が拒否されました"); return; }
    }
    const next = !notifEnabled;
    setNotifEnabled(next);
    if (next) {
      new Notification("Tarot", { body: "毎日のリーディングリマインダーが有効です。", icon: "/favicon.svg" });
      showToast("通知オン");
    } else {
      showToast("通知オフ");
    }
  }

  function handleSaveReading(theme: string, aiReading: string) {
    saveReading({
      spreadId: activeSpread.id,
      spreadName: activeSpread.name,
      theme,
      cards: placedCards
        .filter((p) => p.isRevealed)
        .map((p) => ({ cardId: p.cardId, slotId: p.slotId, isReversed: p.isReversed })),
      aiReading,
    });
    showToast("履歴に保存しました");
  }

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 12px",
    background: active ? "rgba(99,102,241,0.15)" : "transparent",
    border: `1px solid ${active ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 5,
    color: active ? "rgba(99,102,241,0.9)" : "rgba(168,144,96,0.75)",
    fontFamily: "Cinzel, serif",
    fontSize: 11,
    letterSpacing: 1.5,
    cursor: "pointer",
    outline: "none",
  });

  const topBar = (
    <div style={{
      position: "relative",
      zIndex: 30,
      padding: isMobile ? "10px 14px" : "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(8,10,16,0.7)",
      backdropFilter: "blur(8px)",
      flexShrink: 0,
    }}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: isMobile ? 12 : 14,
          letterSpacing: 5,
          color: isViewOnly ? "rgba(99,102,241,0.7)" : "rgba(168,144,96,0.8)",
        }}
      >
        {isViewOnly ? "共有中" : "TAROT"}
      </motion.div>

      <div style={{ display: "flex", gap: isMobile ? 4 : 6, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        {!isMobile && <SpreadSelector />}

        {/* Daily card */}
        <motion.button
          whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
          onClick={() => setDailyOpen(true)}
          title="今日のカード"
          style={btnStyle(false)}
        >
          今日
        </motion.button>

        {/* Gallery */}
        <motion.button
          whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
          onClick={() => setGalleryOpen(true)}
          title="カード図鑑"
          style={btnStyle(false)}
        >
          図鑑
        </motion.button>

        {/* History */}
        <motion.button
          whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
          onClick={() => setHistoryOpen(true)}
          title="リーディング履歴"
          style={btnStyle(false)}
        >
          履歴
        </motion.button>

        {/* AI Reading */}
        {!isViewOnly && (
          <motion.button
            whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
            onClick={() => setAiOpen(true)}
            title="AIリーディング"
            style={{
              ...btnStyle(false),
              color: hasRevealedCards ? "rgba(99,102,241,0.85)" : "rgba(99,102,241,0.4)",
              border: `1px solid ${hasRevealedCards ? "rgba(99,102,241,0.35)" : "rgba(99,102,241,0.15)"}`,
              background: hasRevealedCards ? "rgba(99,102,241,0.08)" : "transparent",
            }}
          >
            AI占い
          </motion.button>
        )}

        {/* Screenshot */}
        <ScreenshotButton targetRef={spreadAreaRef} />

        {/* Live Share */}
        <div style={{ position: "relative" }}>
          <motion.button
            whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
            onClick={() => setPeerOpen((v) => !v)}
            title="Live share via WebRTC"
            style={btnStyle(peerOpen)}
          >
            ライブ
          </motion.button>
          <AnimatePresence>
            {peerOpen && <PeerPanel onClose={() => setPeerOpen(false)} />}
          </AnimatePresence>
        </div>

        {/* Notification bell */}
        <motion.button
          whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
          onClick={handleNotification}
          title={notifEnabled ? "通知オフ" : "通知オン"}
          style={{
            padding: "6px 10px",
            background: "transparent",
            border: `1px solid ${notifEnabled ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.12)"}`,
            borderRadius: 5,
            color: notifEnabled ? "rgba(99,102,241,0.85)" : "rgba(168,144,96,0.5)",
            fontSize: 14,
            cursor: "pointer",
            outline: "none",
          }}
        >{notifEnabled ? "🔔" : "🔕"}</motion.button>
      </div>
    </div>
  );

  const spreadLabel = (
    <motion.div
      key={activeSpread.id}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "absolute",
        top: isMobile ? 10 : 12,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "Cinzel, serif",
        fontSize: 10,
        letterSpacing: 4,
        color: "rgba(99,102,241,0.45)",
        zIndex: 5,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {activeSpread.name.toUpperCase()}
    </motion.div>
  );

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {topBar}

      {/* Mobile: spread selector below top bar */}
      {isMobile && (
        <div style={{
          display: "flex",
          gap: 4,
          padding: "6px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(8,10,16,0.5)",
          overflowX: "auto",
          flexShrink: 0,
          zIndex: 20,
        }}>
          <SpreadSelector />
        </div>
      )}

      {isMobile ? (
        <>
          <div ref={spreadAreaRef} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {spreadLabel}
            <SpreadLayout spread={activeSpread} />
            <CardMeaningPanel />
          </div>

          <div style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "8px 12px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            zIndex: 10,
          }}>
            <DeckPile compact />
            <DeckControls horizontal />
          </div>
        </>
      ) : (
        <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
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

          <div ref={spreadAreaRef} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {spreadLabel}
            <SpreadLayout spread={activeSpread} />
            <CardMeaningPanel />
          </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 50,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(10,13,24,0.92)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              padding: "6px 14px",
              fontFamily: "Cinzel, serif",
              fontSize: 12,
              letterSpacing: 2,
              color: "rgba(168,144,96,0.9)",
              zIndex: 50,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <Particles />

      {/* Modals / Overlays */}
      <AIReadingPanel open={aiOpen} onClose={() => setAiOpen(false)} onSaveReading={handleSaveReading} />
      <ReadingHistory open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <DailyCardModal open={dailyOpen} onClose={() => setDailyOpen(false)} />
      <CardGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </div>
  );
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${12 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 2, height: 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(168,144,96,0.5)" : "rgba(99,102,241,0.5)",
          }}
        />
      ))}
    </div>
  );
}

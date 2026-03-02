"use client";

import { useState, useCallback } from "react";
import { SpreadLayout } from "../spread/SpreadLayout";
import { DeckPile } from "../deck/DeckPile";
import { DeckControls } from "../deck/DeckControls";
import { SpreadSelector } from "../spread/SpreadSelector";
import { CardMeaningPanel } from "../card/CardMeaningPanel";
import { PeerPanel } from "../common/PeerPanel";
import { useTarotStore } from "../../store/useTarotStore";
import { useIsMobile } from "../../hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";

export function ReadingTable() {
  const { activeSpread, isViewOnly } = useTarotStore();
  const isMobile = useIsMobile();
  const [toast, setToast] = useState<string | null>(null);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [peerOpen, setPeerOpen] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  async function handleNotification() {
    if (!("Notification" in window)) { showToast("Not supported"); return; }
    if (Notification.permission === "denied") { showToast("Notifications blocked"); return; }
    if (Notification.permission === "default") {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") { showToast("Permission denied"); return; }
    }
    const next = !notifEnabled;
    setNotifEnabled(next);
    if (next) {
      new Notification("Tarot", { body: "Daily reading reminders enabled.", icon: "/favicon.svg" });
      showToast("Notifications on");
    } else {
      showToast("Notifications off");
    }
  }

  const topBar = (
    <div style={{
      position: "relative",
      zIndex: 30,
      padding: isMobile ? "10px 14px" : "12px 20px",
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
          fontSize: isMobile ? 9 : 11,
          letterSpacing: 5,
          color: isViewOnly ? "rgba(99,102,241,0.5)" : "rgba(168,144,96,0.6)",
        }}
      >
        {isViewOnly ? "SHARED" : "TAROT"}
      </motion.div>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <SpreadSelector />

        {/* Live Share (WebRTC) */}
        <div style={{ position: "relative" }}>
          <motion.button
            whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
            onClick={() => setPeerOpen((v) => !v)}
            title="Live share via WebRTC"
            style={{
              padding: "5px 10px",
              background: peerOpen ? "rgba(99,102,241,0.12)" : "transparent",
              border: `1px solid ${peerOpen ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 4,
              color: peerOpen ? "rgba(99,102,241,0.8)" : "rgba(168,144,96,0.5)",
              fontFamily: "Cinzel, serif",
              fontSize: 8,
              letterSpacing: 1.5,
              cursor: "pointer",
              outline: "none",
              opacity: 0.85,
            }}
          >
            LIVE
          </motion.button>

          <AnimatePresence>
            {peerOpen && <PeerPanel onClose={() => setPeerOpen(false)} />}
          </AnimatePresence>
        </div>

        {/* Notification bell */}
        <motion.button
          whileHover={{ opacity: 1 }} whileTap={{ scale: 0.92 }}
          onClick={handleNotification}
          title={notifEnabled ? "Disable notifications" : "Enable notifications"}
          style={{
            padding: "5px 8px",
            background: "transparent",
            border: `1px solid ${notifEnabled ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 4,
            color: notifEnabled ? "rgba(99,102,241,0.7)" : "rgba(168,144,96,0.35)",
            fontSize: 11,
            cursor: "pointer",
            outline: "none",
            opacity: 0.7,
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
        fontSize: 8,
        letterSpacing: 4,
        color: "rgba(99,102,241,0.3)",
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

      {isMobile ? (
        <>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
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

          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
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
              fontSize: 9,
              letterSpacing: 2,
              color: "rgba(168,144,96,0.8)",
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

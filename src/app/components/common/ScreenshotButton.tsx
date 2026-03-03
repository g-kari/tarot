"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  targetRef: React.RefObject<HTMLElement | null>;
}

export function ScreenshotButton({ targetRef }: Props) {
  const [saving, setSaving] = useState(false);

  const capture = useCallback(async () => {
    const el = targetRef.current;
    if (!el || saving) return;

    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, {
        backgroundColor: "#050609",
        pixelRatio: 2,
      });

      // Try native share first (mobile), then download
      if (navigator.share && navigator.canShare) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "tarot-reading.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "タロットリーディング" });
          setSaving(false);
          return;
        }
      }

      // Fallback: download
      const link = document.createElement("a");
      link.download = `tarot-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // silently fail
    }
    setSaving(false);
  }, [targetRef, saving]);

  return (
    <motion.button
      whileHover={{ opacity: 1 }}
      whileTap={{ scale: 0.92 }}
      onClick={capture}
      disabled={saving}
      title="スクリーンショット"
      style={{
        padding: "6px 12px",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 5,
        color: saving ? "rgba(99,102,241,0.75)" : "rgba(168,144,96,0.65)",
        fontFamily: "Cinzel, serif",
        fontSize: 14,
        letterSpacing: 1.5,
        cursor: saving ? "wait" : "pointer",
        outline: "none",
      }}
    >
      {saving ? "保存中..." : "📷"}
    </motion.button>
  );
}

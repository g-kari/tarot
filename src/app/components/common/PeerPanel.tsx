"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWebRTCPeer } from "../../hooks/useWebRTCPeer";

const panelStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  right: 0,
  width: 320,
  maxWidth: "calc(100vw - 16px)",
  background: "rgba(8,10,18,0.96)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "0 0 8px 8px",
  padding: 16,
  zIndex: 100,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 4,
  color: "rgba(204,200,192,0.8)",
  fontFamily: "monospace",
  fontSize: 9,
  padding: "6px 8px",
  outline: "none",
  resize: "none" as const,
  boxSizing: "border-box" as const,
};

const btnStyle: React.CSSProperties = {
  padding: "6px 12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 4,
  color: "rgba(168,144,96,0.7)",
  fontFamily: "Cinzel, serif",
  fontSize: 8,
  letterSpacing: 1.5,
  cursor: "pointer",
  outline: "none",
  whiteSpace: "nowrap" as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: 7.5,
  letterSpacing: 2,
  color: "rgba(99,102,241,0.5)",
  display: "block",
  marginBottom: 5,
};

function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div style={{ marginBottom: 10 }}>
      <span style={labelStyle}>{label}</span>
      <div style={{ display: "flex", gap: 5 }}>
        <textarea
          readOnly
          value={value}
          rows={2}
          style={{ ...inputStyle, flex: 1, cursor: "default" }}
        />
        <button onClick={copy} style={{ ...btnStyle, flexShrink: 0 }}>
          {copied ? "✓" : "コピー"}
        </button>
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

export function PeerPanel({ onClose }: Props) {
  const [mode, setMode] = useState<"host" | "join">("host");
  const [offerInput, setOfferInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const {
    status,
    isHost,
    offerCode,
    answerCode,
    err,
    startHost,
    joinWithOffer,
    completeConnection,
    disconnect,
  } = useWebRTCPeer();

  const statusColor =
    status === "connected" ? "rgba(80,200,120,0.7)" :
    status === "disconnected" ? "rgba(220,80,80,0.7)" :
    "rgba(168,144,96,0.5)";

  const statusLabel =
    status === "idle" ? "" :
    status === "hosting" ? "ゲストを待っています…" :
    status === "joining" ? "アンサーを生成中…" :
    status === "connected" ? "接続済み" :
    "切断されました";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18 }}
      style={panelStyle}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "Cinzel, serif", fontSize: 9, letterSpacing: 3, color: "rgba(168,144,96,0.6)" }}>
          ライブ共有
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {statusLabel && (
            <span style={{ fontFamily: "Cinzel, serif", fontSize: 7.5, letterSpacing: 1.5, color: statusColor }}>
              {statusLabel}
            </span>
          )}
          <button onClick={onClose} style={{ ...btnStyle, padding: "4px 8px", color: "rgba(168,144,96,0.35)" }}>×</button>
        </div>
      </div>

      {/* Connected state */}
      {status === "connected" && (
        <div style={{ textAlign: "center", paddingBottom: 8 }}>
          <div style={{ fontSize: 10, color: "rgba(204,200,192,0.5)", fontFamily: "EB Garamond, serif", marginBottom: 10 }}>
            {isHost ? "リーディングをゲストにリアルタイム同期中。" : "ホストのリーディングを閲覧中。"}
          </div>
          <button onClick={disconnect} style={{ ...btnStyle, borderColor: "rgba(220,80,80,0.3)", color: "rgba(220,80,80,0.6)" }}>
            切断
          </button>
        </div>
      )}

      {/* Disconnected state */}
      {status === "disconnected" && (
        <div style={{ textAlign: "center", paddingBottom: 8 }}>
          <div style={{ fontSize: 10, color: "rgba(220,80,80,0.5)", fontFamily: "EB Garamond, serif", marginBottom: 10 }}>
            接続が切断されました。
          </div>
          <button onClick={disconnect} style={btnStyle}>閉じる</button>
        </div>
      )}

      {/* Setup state */}
      {(status === "idle" || status === "hosting" || status === "joining") && (
        <>
          {/* Mode tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
            {(["host", "join"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setOfferInput(""); setAnswerInput(""); }}
                style={{
                  ...btnStyle,
                  flex: 1,
                  borderColor: mode === m ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)",
                  color: mode === m ? "rgba(168,144,96,0.85)" : "rgba(168,144,96,0.35)",
                }}
              >
                {m === "host" ? "ホスト" : "参加"}
              </button>
            ))}
          </div>

          {mode === "host" && (
            <>
              <div style={{ fontSize: 10, color: "rgba(204,200,192,0.45)", fontFamily: "EB Garamond, serif", marginBottom: 10, lineHeight: 1.5 }}>
                オファーコードをゲストに共有してください。アンサーコードが返ってきたら、下に貼り付けてください。
              </div>

              {!offerCode ? (
                <button
                  onClick={startHost}
                  disabled={status === "hosting"}
                  style={{ ...btnStyle, width: "100%", opacity: status === "hosting" ? 0.5 : 1 }}
                >
                  {status === "hosting" ? "生成中…" : "オファーを作成"}
                </button>
              ) : (
                <>
                  <CopyField value={offerCode} label="オファーコード — ゲストに送信" />
                  <span style={labelStyle}>アンサーコード — ゲストから貼り付け</span>
                  <div style={{ display: "flex", gap: 5 }}>
                    <textarea
                      rows={2}
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="アンサーコードをここに貼り付け…"
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      onClick={() => completeConnection(answerInput)}
                      disabled={!answerInput.trim()}
                      style={{ ...btnStyle, flexShrink: 0, opacity: answerInput.trim() ? 1 : 0.4 }}
                    >
                      参加
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {mode === "join" && (
            <>
              <div style={{ fontSize: 10, color: "rgba(204,200,192,0.45)", fontFamily: "EB Garamond, serif", marginBottom: 10, lineHeight: 1.5 }}>
                ホストのオファーコードを貼り付け、アンサーコードを返してください。
              </div>

              {!answerCode ? (
                <>
                  <span style={labelStyle}>オファーコード — ホストから貼り付け</span>
                  <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                    <textarea
                      rows={2}
                      value={offerInput}
                      onChange={(e) => setOfferInput(e.target.value)}
                      placeholder="オファーコードをここに貼り付け…"
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      onClick={() => joinWithOffer(offerInput)}
                      disabled={!offerInput.trim() || status === "joining"}
                      style={{ ...btnStyle, flexShrink: 0, opacity: offerInput.trim() && status !== "joining" ? 1 : 0.4 }}
                    >
                      {status === "joining" ? "…" : "接続"}
                    </button>
                  </div>
                </>
              ) : (
                <CopyField value={answerCode} label="アンサーコード — ホストに送信" />
              )}
            </>
          )}

          {err && (
            <div style={{ marginTop: 8, fontSize: 9, color: "rgba(220,80,80,0.6)", fontFamily: "EB Garamond, serif" }}>
              {err}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

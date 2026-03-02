"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTarotStore } from "../store/useTarotStore";
import { SPREADS } from "../data/spreads";
import type { PlacedCard } from "../store/useTarotStore";

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

interface SyncMsg {
  spreadId: string;
  cards: PlacedCard[];
}

export type PeerStatus =
  | "idle"
  | "hosting"   // host: waiting for guest's answer
  | "joining"   // guest: waiting for host's offer, then generating answer
  | "connected"
  | "disconnected";

function waitForICE(pc: RTCPeerConnection): Promise<void> {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === "complete") { resolve(); return; }
    pc.onicegatheringstatechange = () => {
      if (pc.iceGatheringState === "complete") resolve();
    };
    setTimeout(resolve, 5000); // fallback after 5s
  });
}

function encodeDesc(desc: RTCSessionDescription | RTCSessionDescriptionInit): string {
  return btoa(JSON.stringify({ type: desc.type, sdp: (desc as RTCSessionDescriptionInit).sdp }));
}

function decodeDesc(raw: string): RTCSessionDescriptionInit {
  return JSON.parse(atob(raw.trim()));
}

export function useWebRTCPeer() {
  const [status, setStatus] = useState<PeerStatus>("idle");
  const [isHost, setIsHost] = useState(false);
  const [offerCode, setOfferCode] = useState("");
  const [answerCode, setAnswerCode] = useState("");
  const [err, setErr] = useState("");

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);

  const loadSharedReading = useTarotStore((s) => s.loadSharedReading);

  // Host: subscribe to store and forward state changes to peer
  useEffect(() => {
    if (!isHost) return;
    return useTarotStore.subscribe((state, prev) => {
      const dc = dcRef.current;
      if (dc?.readyState !== "open") return;
      if (state.placedCards === prev.placedCards && state.activeSpread === prev.activeSpread) return;
      const msg: SyncMsg = { spreadId: state.activeSpread.id, cards: state.placedCards };
      dc.send(JSON.stringify(msg));
    });
  }, [isHost]);

  function handleIncoming(ev: MessageEvent) {
    try {
      const msg: SyncMsg = JSON.parse(ev.data);
      const spread = SPREADS.find((s) => s.id === msg.spreadId);
      if (spread) loadSharedReading(spread, msg.cards);
    } catch {}
  }

  function makePC(): RTCPeerConnection {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    pcRef.current = pc;
    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      if (s === "disconnected" || s === "failed" || s === "closed") {
        setStatus("disconnected");
      }
    };
    return pc;
  }

  const startHost = useCallback(async () => {
    try {
      pcRef.current?.close();
      dcRef.current?.close();
      setIsHost(true);
      setErr("");
      setOfferCode("");
      setAnswerCode("");
      setStatus("hosting");

      const pc = makePC();
      const dc = pc.createDataChannel("sync", { ordered: true });
      dcRef.current = dc;

      dc.onopen = () => {
        setStatus("connected");
        const s = useTarotStore.getState();
        dc.send(JSON.stringify({ spreadId: s.activeSpread.id, cards: s.placedCards }));
      };
      dc.onclose = () => setStatus("disconnected");

      await pc.setLocalDescription(await pc.createOffer());
      await waitForICE(pc);
      if (pc.localDescription) setOfferCode(encodeDesc(pc.localDescription));
    } catch (e) {
      setErr(String(e));
      setStatus("idle");
    }
  }, []);

  const joinWithOffer = useCallback(async (raw: string) => {
    try {
      pcRef.current?.close();
      dcRef.current?.close();
      setIsHost(false);
      setErr("");
      setAnswerCode("");
      setStatus("joining");

      const pc = makePC();
      pc.ondatachannel = (e) => {
        const dc = e.channel;
        dcRef.current = dc;
        dc.onopen = () => setStatus("connected");
        dc.onclose = () => setStatus("disconnected");
        dc.onmessage = handleIncoming;
      };

      await pc.setRemoteDescription(decodeDesc(raw));
      await pc.setLocalDescription(await pc.createAnswer());
      await waitForICE(pc);
      if (pc.localDescription) setAnswerCode(encodeDesc(pc.localDescription));
    } catch (e) {
      setErr(String(e));
      setStatus("idle");
    }
  }, [loadSharedReading]);

  const completeConnection = useCallback(async (raw: string) => {
    try {
      const pc = pcRef.current;
      if (!pc) { setErr("No connection"); return; }
      await pc.setRemoteDescription(decodeDesc(raw));
    } catch (e) {
      setErr(String(e));
    }
  }, []);

  const disconnect = useCallback(() => {
    dcRef.current?.close();
    pcRef.current?.close();
    dcRef.current = null;
    pcRef.current = null;
    setStatus("idle");
    setIsHost(false);
    setOfferCode("");
    setAnswerCode("");
    setErr("");
  }, []);

  return {
    status,
    isHost,
    offerCode,
    answerCode,
    err,
    startHost,
    joinWithOffer,
    completeConnection,
    disconnect,
  };
}

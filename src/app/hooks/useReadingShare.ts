"use client";

import type { PlacedCard } from "../store/useTarotStore";
import type { SpreadDefinition } from "../data/spreads";

interface SharedState {
  s: string;
  c: Array<{ i: string; p: string; r: boolean; v: boolean }>;
}

export function encodeReading(spread: SpreadDefinition, placedCards: PlacedCard[]): string {
  const state: SharedState = {
    s: spread.id,
    c: placedCards.map((p) => ({
      i: p.cardId,
      p: p.slotId,
      r: p.isReversed,
      v: p.isRevealed,
    })),
  };
  return btoa(JSON.stringify(state));
}

export function decodeReading(raw: string): SharedState | null {
  try {
    return JSON.parse(atob(raw)) as SharedState;
  } catch {
    return null;
  }
}

export function getHashReading(): SharedState | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash.startsWith("#r=")) return null;
  return decodeReading(hash.slice(3));
}

export async function copyReadingLink(spread: SpreadDefinition, placedCards: PlacedCard[]) {
  const encoded = encodeReading(spread, placedCards);
  const url = `${window.location.origin}${window.location.pathname}#r=${encoded}`;
  await navigator.clipboard.writeText(url);
  return url;
}

export function clearHashReading() {
  if (typeof window === "undefined") return;
  history.replaceState(null, "", window.location.pathname);
}

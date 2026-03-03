"use client";

import { useState, useCallback } from "react";
import { useTarotStore } from "../store/useTarotStore";
import { FULL_DECK } from "../data/cards";

export const READING_THEMES = [
  { id: "general", label: "総合運" },
  { id: "love", label: "恋愛運" },
  { id: "career", label: "仕事運" },
  { id: "finance", label: "金運" },
  { id: "health", label: "健康運" },
  { id: "relationships", label: "人間関係" },
  { id: "growth", label: "自己成長" },
] as const;

export type ReadingTheme = (typeof READING_THEMES)[number]["id"];

const DAILY_KEY = "tarot-ai-last-reading";

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function hasUsedTodayReading(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(DAILY_KEY) === getTodayStr();
  } catch {
    return false;
  }
}

function markTodayUsed() {
  try {
    localStorage.setItem(DAILY_KEY, getTodayStr());
  } catch {
    // ignore
  }
}

interface AIReadingState {
  loading: boolean;
  reading: string | null;
  error: string | null;
  theme: ReadingTheme | null;
}

export function useAIReading() {
  const [state, setState] = useState<AIReadingState>({
    loading: false,
    reading: null,
    error: null,
    theme: null,
  });

  const requestReading = useCallback(async (theme: ReadingTheme) => {
    const { placedCards, activeSpread } = useTarotStore.getState();
    const revealedCards = placedCards.filter((p) => p.isRevealed);

    if (revealedCards.length === 0) {
      setState((s) => ({ ...s, error: "カードをめくってからリーディングしてください" }));
      return;
    }

    if (hasUsedTodayReading()) {
      setState((s) => ({ ...s, error: "本日のAIリーディングは使用済みです。明日またお試しください。" }));
      return;
    }

    setState({ loading: true, reading: null, error: null, theme });

    const themeLabel = READING_THEMES.find((t) => t.id === theme)?.label ?? "総合運";
    const cards = revealedCards.map((p) => {
      const card = FULL_DECK.find((c) => c.id === p.cardId);
      const slot = activeSpread.slots.find((s) => s.id === p.slotId);
      return {
        name: card?.name ?? p.cardId,
        position: slot?.label ?? "自由配置",
        isReversed: p.isReversed,
      };
    });

    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards,
          spreadName: activeSpread.name,
          theme: themeLabel,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      const data = await res.json() as { reading: string };
      markTodayUsed();
      setState({ loading: false, reading: data.reading, error: null, theme });
    } catch (err) {
      setState({
        loading: false,
        reading: null,
        error: err instanceof Error ? err.message : "リーディングに失敗しました",
        theme,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, reading: null, error: null, theme: null });
  }, []);

  return { ...state, requestReading, reset, usedToday: hasUsedTodayReading() };
}

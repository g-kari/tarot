"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface ReadingRecord {
  id: string;
  date: string;
  spreadId: string;
  spreadName: string;
  theme?: string;
  cards: { cardId: string; slotId: string; isReversed: boolean }[];
  aiReading?: string;
}

const STORAGE_KEY = "tarot-history";
const MAX_RECORDS = 50;

let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

function getRecords(): ReadingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReadingRecord[]) : [];
  } catch {
    return [];
  }
}

function setRecords(records: ReadingRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  notify();
}

function getSnapshot(): ReadingRecord[] {
  return getRecords();
}

function getServerSnapshot(): ReadingRecord[] {
  return [];
}

function subscribe(listener: () => void): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function useReadingHistory() {
  const records = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveReading = useCallback((record: Omit<ReadingRecord, "id" | "date">) => {
    const existing = getRecords();
    const newRecord: ReadingRecord = {
      ...record,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    const updated = [newRecord, ...existing].slice(0, MAX_RECORDS);
    setRecords(updated);
  }, []);

  const deleteReading = useCallback((id: string) => {
    setRecords(getRecords().filter((r) => r.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setRecords([]);
  }, []);

  return { records, saveReading, deleteReading, clearHistory };
}

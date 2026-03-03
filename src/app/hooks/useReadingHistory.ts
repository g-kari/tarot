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

// Cached snapshot for useSyncExternalStore referential equality
let cachedRaw: string | null = null;
let cachedRecords: ReadingRecord[] = [];
const EMPTY: ReadingRecord[] = [];

function getRecords(): ReadingRecord[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedRecords = raw ? (JSON.parse(raw) as ReadingRecord[]) : [];
    }
    return cachedRecords;
  } catch {
    return EMPTY;
  }
}

function setRecords(records: ReadingRecord[]) {
  const json = JSON.stringify(records);
  cachedRaw = json;
  cachedRecords = records;
  localStorage.setItem(STORAGE_KEY, json);
  notify();
}

function getSnapshot(): ReadingRecord[] {
  return getRecords();
}

function getServerSnapshot(): ReadingRecord[] {
  return EMPTY;
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

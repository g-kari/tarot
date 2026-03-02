"use client";

import { create } from "zustand";
import { TarotCard, FULL_DECK } from "../data/cards";
import { SpreadDefinition, THREE_CARD } from "../data/spreads";

export interface PlacedCard {
  cardId: string;
  slotId: string;
  isReversed: boolean;
  isRevealed: boolean;
}

interface TarotState {
  deck: TarotCard[];
  placedCards: PlacedCard[];
  activeSpread: SpreadDefinition;
  draggingCardId: string | null;
  isShuffling: boolean;
  selectedCardId: string | null;
  isViewOnly: boolean;

  shuffleDeck: () => void;
  dealToSlot: (cardId: string, slotId: string) => void;
  returnCardToDeck: (cardId: string) => void;
  revealCard: (cardId: string) => void;
  setActiveSpread: (spread: SpreadDefinition) => void;
  resetReading: () => void;
  setDragging: (cardId: string | null) => void;
  setSelected: (cardId: string | null) => void;
  loadSharedReading: (spread: SpreadDefinition, cards: PlacedCard[]) => void;
  getDraggingCard: () => TarotCard | undefined;
  getCardById: (id: string) => TarotCard | undefined;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const useTarotStore = create<TarotState>((set, get) => ({
  deck: [...FULL_DECK],
  placedCards: [],
  activeSpread: THREE_CARD,
  draggingCardId: null,
  isShuffling: false,
  selectedCardId: null,
  isViewOnly: false,

  shuffleDeck: () => {
    set({ isShuffling: true });
    setTimeout(() => {
      set((s) => ({ deck: shuffle(s.deck), isShuffling: false }));
    }, 700);
  },

  dealToSlot: (cardId, slotId) => {
    set((s) => {
      const isReversed = Math.random() < 0.25;
      const newPlaced = s.placedCards.filter((p) => p.slotId !== slotId);
      newPlaced.push({ cardId, slotId, isReversed, isRevealed: false });
      const deck = s.deck.filter((c) => c.id !== cardId);
      return { deck, placedCards: newPlaced };
    });
  },

  returnCardToDeck: (cardId) => {
    set((s) => ({
      placedCards: s.placedCards.filter((p) => p.cardId !== cardId),
      deck: [
        ...s.deck,
        FULL_DECK.find((c) => c.id === cardId)!,
      ],
    }));
  },

  revealCard: (cardId) => {
    set((s) => ({
      placedCards: s.placedCards.map((p) =>
        p.cardId === cardId ? { ...p, isRevealed: true } : p
      ),
      selectedCardId: cardId,
    }));
  },

  setActiveSpread: (spread) =>
    set({ activeSpread: spread, placedCards: [], selectedCardId: null }),

  resetReading: () =>
    set({ deck: [...FULL_DECK], placedCards: [], draggingCardId: null, selectedCardId: null, isViewOnly: false }),

  setDragging: (cardId) => set({ draggingCardId: cardId }),

  setSelected: (cardId) => set({ selectedCardId: cardId }),

  loadSharedReading: (spread, cards) => {
    const usedIds = new Set(cards.map((c) => c.cardId));
    set({
      activeSpread: spread,
      placedCards: cards,
      deck: FULL_DECK.filter((c) => !usedIds.has(c.id)),
      selectedCardId: cards.find((c) => c.isRevealed)?.cardId ?? null,
      isViewOnly: true,
    });
  },

  getDraggingCard: () => {
    const { draggingCardId } = get();
    if (!draggingCardId) return undefined;
    return FULL_DECK.find((c) => c.id === draggingCardId);
  },

  getCardById: (id) => FULL_DECK.find((c) => c.id === id),
}));

export interface SpreadSlot {
  id: string;
  label: string;
  description: string;
  /** Normalized 0-1 position within the spread container */
  pos: { x: number; y: number };
  rotation?: number;
}

export interface SpreadDefinition {
  id: string;
  name: string;
  slots: SpreadSlot[];
}

export const THREE_CARD: SpreadDefinition = {
  id: "three-card",
  name: "過去・現在・未来",
  slots: [
    { id: "past",    label: "過去",  description: "あったこと",  pos: { x: 0.18, y: 0.5 } },
    { id: "present", label: "現在",  description: "あること",    pos: { x: 0.5,  y: 0.5 } },
    { id: "future",  label: "未来",  description: "なること",    pos: { x: 0.82, y: 0.5 } },
  ],
};

export const CELTIC_CROSS: SpreadDefinition = {
  id: "celtic-cross",
  name: "ケルト十字",
  slots: [
    { id: "heart",       label: "中心",     description: "問題の核心",         pos: { x: 0.32, y: 0.5 } },
    { id: "crossing",    label: "障害",     description: "あなたを遮るもの",   pos: { x: 0.32, y: 0.5 }, rotation: 90 },
    { id: "foundation",  label: "土台",     description: "基盤",               pos: { x: 0.32, y: 0.74 } },
    { id: "recent-past", label: "近い過去", description: "過ぎ去ること",       pos: { x: 0.16, y: 0.5 } },
    { id: "crown",       label: "指針",     description: "可能性のある結果",   pos: { x: 0.32, y: 0.26 } },
    { id: "near-future", label: "近い未来", description: "近づくもの",         pos: { x: 0.48, y: 0.5 } },
    { id: "self",        label: "自己",     description: "あなたの立場",       pos: { x: 0.68, y: 0.74 } },
    { id: "environment", label: "環境",     description: "外部の影響",         pos: { x: 0.68, y: 0.58 } },
    { id: "hopes",       label: "希望と恐れ", description: "内なる希望と恐れ", pos: { x: 0.68, y: 0.42 } },
    { id: "outcome",     label: "結末",     description: "最終的な結果",       pos: { x: 0.68, y: 0.26 } },
  ],
};

export const FREE_PLACEMENT: SpreadDefinition = {
  id: "free-placement",
  name: "自由配置",
  slots: [],
};

export const SPREADS: SpreadDefinition[] = [THREE_CARD, CELTIC_CROSS, FREE_PLACEMENT];

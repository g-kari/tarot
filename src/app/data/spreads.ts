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
  name: "Past · Present · Future",
  slots: [
    { id: "past",    label: "Past",    description: "What was",         pos: { x: 0.18, y: 0.5 } },
    { id: "present", label: "Present", description: "What is",          pos: { x: 0.5,  y: 0.5 } },
    { id: "future",  label: "Future",  description: "What will be",     pos: { x: 0.82, y: 0.5 } },
  ],
};

export const CELTIC_CROSS: SpreadDefinition = {
  id: "celtic-cross",
  name: "Celtic Cross",
  slots: [
    { id: "heart",       label: "Heart",       description: "The heart of the matter",   pos: { x: 0.32, y: 0.5 } },
    { id: "crossing",    label: "Crossing",    description: "What crosses you",           pos: { x: 0.32, y: 0.5 }, rotation: 90 },
    { id: "foundation",  label: "Foundation",  description: "The basis",                  pos: { x: 0.32, y: 0.74 } },
    { id: "recent-past", label: "Recent Past", description: "What is passing",            pos: { x: 0.16, y: 0.5 } },
    { id: "crown",       label: "Crown",       description: "Possible outcome",           pos: { x: 0.32, y: 0.26 } },
    { id: "near-future", label: "Near Future", description: "What approaches",            pos: { x: 0.48, y: 0.5 } },
    { id: "self",        label: "Self",        description: "Your position",              pos: { x: 0.68, y: 0.74 } },
    { id: "environment", label: "Environment", description: "External influences",        pos: { x: 0.68, y: 0.58 } },
    { id: "hopes",       label: "Hopes/Fears", description: "Inner hopes and fears",      pos: { x: 0.68, y: 0.42 } },
    { id: "outcome",     label: "Outcome",     description: "The final outcome",          pos: { x: 0.68, y: 0.26 } },
  ],
};

export const SPREADS: SpreadDefinition[] = [THREE_CARD, CELTIC_CROSS];

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SlotDropZone } from "./SlotDropZone";
import type { SpreadDefinition } from "../../data/spreads";

interface Props {
  spread: SpreadDefinition;
}

const CARD_W = 120;
const CARD_H = 210;

export function SpreadLayout({ spread }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {spread.slots.map((slot) => (
        <div
          key={slot.id}
          style={{
            position: "absolute",
            left: `${slot.pos.x * 100}%`,
            top: `${slot.pos.y * 100}%`,
          }}
        >
          <SlotDropZone slot={slot} />
        </div>
      ))}
    </div>
  );
}

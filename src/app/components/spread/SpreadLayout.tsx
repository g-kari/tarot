"use client";

import { useRef } from "react";
import { SlotDropZone } from "./SlotDropZone";
import { FreeDropSurface } from "./FreeDropSurface";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { SpreadDefinition } from "../../data/spreads";

interface Props {
  spread: SpreadDefinition;
}

export function SpreadLayout({ spread }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const cardScale = isMobile ? 0.72 : 1;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {spread.slots.length === 0 ? (
        <FreeDropSurface />
      ) : (
        spread.slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              position: "absolute",
              left: `${slot.pos.x * 100}%`,
              top: `${slot.pos.y * 100}%`,
            }}
          >
            <SlotDropZone slot={slot} scale={cardScale} />
          </div>
        ))
      )}
    </div>
  );
}

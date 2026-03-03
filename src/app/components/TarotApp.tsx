"use client";

import { useEffect } from "react";
import { DndContext, DragOverlay, PointerSensor, KeyboardSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { TableclothBackground } from "./background/TableclothBackground";
import { ReadingTable } from "./table/ReadingTable";
import { CardShell } from "./card/CardShell";
import { useTarotStore } from "../store/useTarotStore";
import { useIsMobile } from "../hooks/useIsMobile";
import { spring } from "../animations/variants";

export default function TarotApp() {
  const {
    setDragging, getDraggingCard, dealToSlot, returnCardToDeck,
    placeCardFree, moveCard,
    placedCards, draggingCardId, isViewOnly, activeSpread,
  } = useTarotStore();

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragStart(e: DragStartEvent) {
    if (isViewOnly) return;
    setDragging(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setDragging(null);
    if (!over || isViewOnly) return;

    const cardId = String(active.id);
    const overId = String(over.id);

    if (overId === "deck-pile") {
      returnCardToDeck(cardId);
      return;
    }

    if (overId === "free-surface") {
      const surfaceRect = over.rect;
      const activeRect = active.rect.current.translated;
      if (surfaceRect && activeRect) {
        const cx = activeRect.left + activeRect.width / 2;
        const cy = activeRect.top + activeRect.height / 2;
        const pos = {
          x: Math.max(0.05, Math.min(0.95, (cx - surfaceRect.left) / surfaceRect.width)),
          y: Math.max(0.05, Math.min(0.95, (cy - surfaceRect.top) / surfaceRect.height)),
        };
        if (active.data.current?.isPlaced) {
          moveCard(cardId, pos);
        } else {
          placeCardFree(cardId, pos);
        }
      }
      return;
    }

    dealToSlot(cardId, overId);
  }

  const isMobile = useIsMobile();
  const cardScale = isMobile ? 0.72 : 1;
  const draggingCard = getDraggingCard();
  const draggingPlaced = placedCards.find((p) => p.cardId === draggingCardId);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <TableclothBackground />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        <DndContext
          sensors={isViewOnly ? [] : sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ReadingTable />

          <DragOverlay dropAnimation={null}>
            <AnimatePresence>
              {draggingCard && !isViewOnly && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  style={{
                    filter: "drop-shadow(0 8px 20px rgba(99,102,241,0.4))",
                    cursor: "grabbing",
                  }}
                  transition={spring}
                >
                  <CardShell
                    card={draggingCard}
                    isFaceUp={draggingPlaced?.isRevealed ?? false}
                    isReversed={draggingPlaced?.isReversed ?? false}
                    scale={cardScale}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { DndContext, DragOverlay, PointerSensor, KeyboardSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { TableclothBackground } from "./background/TableclothBackground";
import { ReadingTable } from "./table/ReadingTable";
import { CardShell } from "./card/CardShell";
import { useTarotStore } from "../store/useTarotStore";
import { spring } from "../animations/variants";

export default function TarotApp() {
  const { setDragging, getDraggingCard, dealToSlot, returnCardToDeck, draggingCardId, isViewOnly } = useTarotStore();

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
    } else {
      dealToSlot(cardId, overId);
    }
  }

  const draggingCard = getDraggingCard();

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

          <DragOverlay
            dropAnimation={{
              duration: 220,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            <AnimatePresence>
              {draggingCard && !isViewOnly && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  style={{
                    filter: "drop-shadow(0 14px 28px rgba(99,102,241,0.5))",
                    cursor: "grabbing",
                  }}
                  transition={spring}
                >
                  <CardShell card={draggingCard} isFaceUp={false} />
                </motion.div>
              )}
            </AnimatePresence>
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

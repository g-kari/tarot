import type { Variants } from "framer-motion";

export const spring = { type: "spring", stiffness: 300, damping: 28 } as const;
export const springBounce = { type: "spring", stiffness: 400, damping: 22 } as const;
export const tweenFast = { type: "tween", duration: 0.18, ease: "easeOut" } as const;

export const cardVariants: Variants = {
  initial:  { scale: 0.8, opacity: 0 },
  inDeck:   { scale: 1, opacity: 1, rotateZ: 0 },
  hover:    { scale: 1.06, rotateZ: 1, transition: tweenFast },
  dragging: { scale: 1.1, rotateZ: 3 },
  placed:   { scale: 1, rotateZ: 0 },
  exit:     { scale: 0.7, opacity: 0, transition: tweenFast },
};

export const slotVariants: Variants = {
  empty:    { borderColor: "rgba(139,92,246,0.25)", boxShadow: "none" },
  over:     { borderColor: "rgba(167,139,250,0.9)", boxShadow: "0 0 22px rgba(139,92,246,0.55), inset 0 0 16px rgba(139,92,246,0.18)" },
  filled:   { borderColor: "rgba(200,168,75,0.4)",  boxShadow: "0 0 10px rgba(200,168,75,0.15)" },
};

export const buttonVariants: Variants = {
  idle:  { scale: 1 },
  hover: { scale: 1.04, transition: tweenFast },
  tap:   { scale: 0.95, transition: tweenFast },
};

export const tooltipVariants: Variants = {
  hidden:  { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1,    transition: tweenFast },
};

export const spreadSelectorVariants: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0,   transition: springBounce },
};

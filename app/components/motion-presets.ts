import type { Variants } from "motion/react";

export const reboundDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 18 },
  },
};

export const reboundUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};

export const reboundLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};

export const reboundRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};

export const softReveal: Variants = {
  hidden: { opacity: 0, x: -28, y: 24, scale: 0.95, rotate: -4 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const delayed = (delay: number) => ({
  initial: "hidden" as const,
  animate: "visible" as const,
  transition: { delay },
});

export const gentleLoop = {
  y: [0, -6, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  },
};

// export const subtleScaleLoop = {
//   scale: [1, 0.97, 1],
//   transition: {
//     duration: 6,
//     repeat: Infinity,
//     repeatType: "mirror" as const,
//     ease: "easeInOut" as const,
//   },
// };

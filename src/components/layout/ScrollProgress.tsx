"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Accent progress line sits under the sticky nav — not over hero text. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 top-16 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#7C5CFF] via-[#35D6FF] to-[#7C5CFF]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Soft desktop cursor glow — Morpho/agency ambient depth. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setOn(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce]);

  if (!on) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[40] hidden lg:block"
      aria-hidden
    >
      <div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/12 blur-3xl transition-transform duration-150"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}

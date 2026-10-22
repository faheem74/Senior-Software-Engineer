"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Polpharma-style scroll-linked band (used below the hero only). */
export function ScrollRevealBand({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [48, -48]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduce ? [1, 1, 1, 1] : [0.35, 1, 1, 0.45],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}

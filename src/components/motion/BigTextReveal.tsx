"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Large editorial text block reveal — Polpharma-inspired. */
export function BigTextReveal({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) {
    return <p className={className}>{children}</p>;
  }

  return (
    <p className={cn("flex flex-wrap gap-x-[0.35em] gap-y-1", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

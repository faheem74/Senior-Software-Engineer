"use client";

import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Continuous tech strip — ambient motion like agency marquees. */
export function TechMarquee({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const items = [...siteConfig.primaryTechnologies, ...siteConfig.primaryTechnologies];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-white/10 bg-[#0D111A]/80 py-3",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max gap-8 whitespace-nowrap px-4 font-mono text-xs uppercase tracking-[0.22em] text-[#A6AFBF]",
          !reduce && "animate-marquee",
        )}
      >
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} className="inline-flex items-center gap-8">
            <span>{tech}</span>
            <span className="text-[#7C5CFF]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

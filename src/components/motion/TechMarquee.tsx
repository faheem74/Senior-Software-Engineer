"use client";

import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Continuous tech strip — stays directly under the hero. */
export function TechMarquee({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const row = siteConfig.primaryTechnologies;
  const items = [...row, ...row];

  return (
    <div
      className={cn(
        "relative z-10 overflow-hidden border-y border-white/10 bg-[#0D111A] py-4",
        className,
      )}
      aria-label="Technology stack"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0D111A] to-transparent sm:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0D111A] to-transparent sm:w-24"
        aria-hidden
      />
      <div
        className={cn(
          "flex w-max gap-10 whitespace-nowrap px-4 font-mono text-xs uppercase tracking-[0.24em] text-[#A6AFBF] sm:text-sm",
          !reduce && "animate-marquee",
        )}
      >
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} className="inline-flex items-center gap-10">
            <span className="text-[#F5F7FA]/90">{tech}</span>
            <span className="text-[#7C5CFF]" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Decorative orbital circles inspired by layered agency portfolios. */
export function FloatingOrbs({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[420px] sm:w-[420px]" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C5CFF]/20 sm:h-[540px] sm:w-[540px]" />

      {!reduce ? (
        <>
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF] shadow-[0_0_18px_rgba(124,92,255,0.8)]"
            style={{ ["--orbit-r" as string]: "150px" }}
          />
          <span
            className="animate-orbit-reverse absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35D6FF] shadow-[0_0_14px_rgba(53,214,255,0.8)]"
            style={{ ["--orbit-r" as string]: "210px" }}
          />
          <span
            className="animate-float-slow absolute right-[8%] top-[18%] h-24 w-24 rounded-full bg-[#7C5CFF]/25 blur-2xl"
          />
          <span
            className="animate-float-slow absolute bottom-[12%] left-[6%] h-32 w-32 rounded-full bg-[#35D6FF]/15 blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />
        </>
      ) : (
        <>
          <span className="absolute right-[10%] top-[20%] h-24 w-24 rounded-full bg-[#7C5CFF]/20 blur-2xl" />
          <span className="absolute bottom-[14%] left-[8%] h-28 w-28 rounded-full bg-[#35D6FF]/12 blur-3xl" />
        </>
      )}
    </div>
  );
}

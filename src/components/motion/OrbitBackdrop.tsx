"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Full-section orbital atmosphere inspired by GPG circular motion. */
export function OrbitBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C5CFF]/15" />
      {!reduce ? (
        <>
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]"
            style={{ ["--orbit-r" as string]: "260px" }}
          />
          <span
            className="animate-orbit-reverse absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35D6FF]"
            style={{ ["--orbit-r" as string]: "350px" }}
          />
        </>
      ) : null}
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#7C5CFF]/15 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#35D6FF]/10 blur-3xl" />
    </div>
  );
}

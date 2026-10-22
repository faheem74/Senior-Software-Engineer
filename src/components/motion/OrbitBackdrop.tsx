"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Full-section orbital atmosphere — GPG-inspired rings + particles. */
export function OrbitBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C5CFF]/10" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C5CFF]/12" />
      <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#35D6FF]/08" />
      {!reduce ? (
        <>
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF] shadow-[0_0_16px_rgba(124,92,255,0.7)]"
            style={{ ["--orbit-r" as string]: "210px" }}
          />
          <span
            className="animate-orbit-reverse absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35D6FF] shadow-[0_0_12px_rgba(53,214,255,0.7)]"
            style={{ ["--orbit-r" as string]: "280px" }}
          />
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35D6FF]/70"
            style={{
              ["--orbit-r" as string]: "360px",
              animationDuration: "32s",
            }}
          />
        </>
      ) : null}
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#7C5CFF]/15 blur-3xl animate-pulse-glow" />
      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#35D6FF]/10 blur-3xl" />
    </div>
  );
}

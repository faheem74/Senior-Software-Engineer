"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** GPG-inspired rings + orbital dots around the portrait. */
export function FloatingOrbs({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible",
        className,
      )}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C5CFF]/20 sm:h-[400px] sm:w-[400px]" />
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C5CFF]/25 sm:h-[500px] sm:w-[500px]" />
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#35D6FF]/15 sm:h-[580px] sm:w-[580px]" />

      {!reduce ? (
        <>
          <motion.span
            className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-[#7C5CFF] shadow-[0_0_18px_rgba(124,92,255,0.9)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{
              offsetPath: "circle(150px at center)",
            }}
          />
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF] shadow-[0_0_18px_rgba(124,92,255,0.8)]"
            style={{ ["--orbit-r" as string]: "150px" }}
          />
          <span
            className="animate-orbit-reverse absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35D6FF] shadow-[0_0_14px_rgba(53,214,255,0.8)]"
            style={{ ["--orbit-r" as string]: "210px" }}
          />
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35D6FF]/80"
            style={{ ["--orbit-r" as string]: "260px", animationDuration: "32s" }}
          />
          <span className="animate-float-slow absolute right-[4%] top-[14%] h-28 w-28 rounded-full bg-[#7C5CFF]/30 blur-2xl" />
          <span
            className="animate-float-slow absolute bottom-[8%] left-[2%] h-36 w-36 rounded-full bg-[#35D6FF]/18 blur-3xl"
            style={{ animationDelay: "1.2s" }}
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

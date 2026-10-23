"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Professional FB monogram mark for Faheem Bilal. */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <Link
      href="/"
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
      aria-label="Faheem Bilal home"
    >
      <motion.span
        className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl"
        whileHover={reduce ? undefined : { scale: 1.06, rotate: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <span className="absolute inset-0 bg-gradient-to-br from-[#7C5CFF] via-[#5B8CFF] to-[#35D6FF]" />
        <span className="absolute inset-[1px] rounded-[10px] bg-[#080A0F]/25" />
        <svg
          viewBox="0 0 40 40"
          className="relative z-10 h-6 w-6 text-white"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M12 8.5h16.5c.8 0 1.4.6 1.4 1.4v2.2c0 .8-.6 1.4-1.4 1.4H17.2v3.2H26c.8 0 1.4.6 1.4 1.4v2c0 .8-.6 1.4-1.4 1.4h-8.8V30c0 .8-.6 1.5-1.4 1.5H12.5c-.8 0-1.5-.7-1.5-1.5V10c0-.9.7-1.5 1.5-1.5h-.5z"
          />
          <circle cx="30.5" cy="11" r="2.2" fill="#35D6FF" opacity="0.95" />
        </svg>
        {!reduce ? (
          <motion.span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#35D6FF] shadow-[0_0_12px_rgba(53,214,255,0.9)]"
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </motion.span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight text-[#F5F7FA]">
            Faheem Bilal
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#7A8499]">
            Software Engineer
          </span>
        </span>
      ) : null}
    </Link>
  );
}

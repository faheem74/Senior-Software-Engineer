"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#7C5CFF] text-white shadow-[0_0_28px_rgba(124,92,255,0.35)] hover:bg-[#8f74ff] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-[#35D6FF]/12 text-[#35D6FF] border border-[#35D6FF]/30 hover:bg-[#35D6FF]/20 hover:-translate-y-0.5 active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#F5F7FA] hover:bg-white/5 hover:-translate-y-0.5 active:scale-[0.98]",
  outline:
    "border border-white/15 bg-transparent text-[#F5F7FA] hover:border-[#7C5CFF]/50 hover:bg-[#7C5CFF]/10 hover:-translate-y-0.5 active:scale-[0.98]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  external?: boolean;
  children?: ReactNode;
}

export function Button({
  className,
  variant = "primary",
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60 disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-colors",
    variants[variant],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

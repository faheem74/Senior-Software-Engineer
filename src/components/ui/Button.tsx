"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:bg-blue-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-400/25 hover:-translate-y-0.5 active:scale-[0.98]",
  ghost:
    "bg-transparent text-slate-200 hover:bg-white/5 hover:-translate-y-0.5 active:scale-[0.98]",
  outline:
    "border border-slate-500/30 bg-transparent text-slate-100 hover:border-blue-400/50 hover:bg-blue-500/10 hover:-translate-y-0.5 active:scale-[0.98]",
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
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-colors",
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

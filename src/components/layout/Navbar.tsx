"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-500/15 bg-[#070B14]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]">
            FB
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-50 sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-blue-500/15 text-sky-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-200 hover:bg-white/5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-500/15 bg-[#0B1220] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div onClick={() => setOpen(false)}>
              <Button href="/contact" className="mt-2 w-full">
                Let&apos;s Talk
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [
      "home",
      "about",
      "skills",
      "services",
      "experience",
      "projects",
      "ai-cloud",
      "contact",
    ];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#080A0F]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/#home" className="group flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#35D6FF] text-xs font-semibold text-white">
            FB
          </span>
          <span className="text-sm font-semibold tracking-tight text-[#F5F7FA]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {siteConfig.nav.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[13px] transition-colors",
                  isActive
                    ? "bg-[#7C5CFF]/15 text-[#35D6FF]"
                    : "text-[#A6AFBF] hover:bg-white/5 hover:text-[#F5F7FA]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Button href="/#contact" variant="primary" className="px-4 py-2 text-xs">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#F5F7FA] hover:bg-white/5 xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0D111A] xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-[#F5F7FA] hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div onClick={() => setOpen(false)}>
              <Button href="/#contact" className="mt-2 w-full">
                Let&apos;s Talk
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

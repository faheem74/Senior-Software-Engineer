"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/MagneticButton";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[#080A0F]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Magnetic strength={10}>
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#35D6FF] text-xs font-semibold text-white transition group-hover:shadow-[0_0_20px_rgba(124,92,255,0.55)]">
              FB
            </span>
            <span className="text-sm font-semibold tracking-tight text-[#F5F7FA]">
              {siteConfig.name}
            </span>
          </Link>
        </Magnetic>

        <nav className="relative hidden items-center gap-0.5 xl:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-2.5 py-1.5 text-[13px] transition-colors",
                  active
                    ? "text-[#35D6FF]"
                    : "text-[#A6AFBF] hover:text-[#F5F7FA]",
                )}
              >
                {item.label}
                {active && !reduce ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-1.5 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#35D6FF]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                {active && reduce ? (
                  <span className="absolute inset-x-1.5 -bottom-0.5 h-[2px] rounded-full bg-[#7C5CFF]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Magnetic strength={12}>
            <Button href="/contact" variant="primary" className="px-4 py-2 text-xs">
              Let&apos;s Talk
            </Button>
          </Magnetic>
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
        <motion.div
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden border-t border-white/10 bg-[#0D111A] xl:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            {siteConfig.nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={reduce ? false : { x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[#F5F7FA] hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Button href="/contact" className="mt-2 w-full">
              Let&apos;s Talk
            </Button>
          </nav>
        </motion.div>
      ) : null}
    </header>
  );
}

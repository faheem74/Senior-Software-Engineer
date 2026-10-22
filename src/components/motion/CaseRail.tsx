"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
};

/** Agency-style horizontal case rail with entrance + hover motion. */
export function CaseRail({
  items,
  className,
}: {
  items: CaseItem[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="w-[min(85vw,320px)] shrink-0 snap-start"
            initial={reduce ? false : { opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: i * 0.07,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reduce ? undefined : { y: -10, scale: 1.025 }}
          >
            <Link
              href={item.href}
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111722] p-6 transition hover:border-[#7C5CFF]/50"
            >
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#7C5CFF]/20 blur-2xl transition duration-500 group-hover:bg-[#7C5CFF]/45" />
              <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#35D6FF]/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#7C5CFF] to-[#35D6FF] transition-all duration-500 group-hover:w-full" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#35D6FF]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#F5F7FA]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A6AFBF]">
                  {item.subtitle}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#35D6FF]">
                Explore
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

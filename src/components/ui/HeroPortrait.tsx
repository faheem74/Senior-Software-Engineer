"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { FloatingOrbs } from "@/components/motion/FloatingOrbs";
import { cn } from "@/lib/utils";

export function HeroPortrait({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-md", className)}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingOrbs />

      <div className="relative z-10 mx-auto w-full max-w-[380px]">
        <div className="animate-pulse-glow absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#7C5CFF]/40 via-transparent to-[#35D6FF]/30 blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#111722] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          {/* Explicit height avoids fill/aspect collapse in some layouts */}
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={siteConfig.profileImage}
              alt={`${siteConfig.name} — professional portrait in navy suit`}
              fill
              priority
              sizes="(max-width:768px) 85vw, 380px"
              className="object-cover object-[center_12%]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-sm font-semibold text-[#F5F7FA]">{siteConfig.name}</p>
            <p className="text-xs text-[#A6AFBF]">Senior Software Engineer</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

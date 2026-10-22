"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { FloatingOrbs } from "@/components/motion/FloatingOrbs";
import { cn } from "@/lib/utils";

/** Circular portrait with GPG-style orbital rings. */
export function HeroPortrait({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  return (
    <motion.div
      className={cn(
        "relative mx-auto flex w-full max-w-md justify-center overflow-hidden",
        className,
      )}
      initial={reduce ? false : { opacity: 0, scale: 0.88, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <FloatingOrbs />

      <motion.div
        className="relative z-10"
        style={reduce ? undefined : { x: sx, y: sy }}
      >
        <div className="animate-pulse-glow absolute -inset-8 rounded-full bg-gradient-to-br from-[#7C5CFF]/45 via-transparent to-[#35D6FF]/35 blur-2xl" />

        {/* Outer animated ring */}
        <motion.div
          className="absolute -inset-3 rounded-full border border-[#7C5CFF]/40"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-6 rounded-full border border-dashed border-[#35D6FF]/25"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border-2 border-white/20 bg-[#111722] shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:h-[340px] sm:w-[340px]">
          <Image
            src={siteConfig.profileImage}
            alt={`${siteConfig.name} — professional portrait in navy suit`}
            fill
            priority
            sizes="(max-width:640px) 280px, 340px"
            className="object-cover object-[center_12%] transition duration-700 hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-[#080A0F]/70 via-transparent to-transparent" />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-[#F5F7FA]">{siteConfig.name}</p>
          <p className="text-xs text-[#A6AFBF]">Senior Software Engineer</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

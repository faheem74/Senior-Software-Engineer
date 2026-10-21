"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function RoleRotator() {
  const roles = siteConfig.rotatingRoles;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduce, roles.length]);

  if (reduce) {
    return (
      <p className="font-mono text-sm text-[#35D6FF] sm:text-base">
        {roles[0]}
      </p>
    );
  }

  return (
    <div className="relative h-7 overflow-hidden sm:h-8" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 font-mono text-sm text-[#35D6FF] sm:text-base"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

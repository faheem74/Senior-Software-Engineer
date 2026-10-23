"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** GPG-inspired orbital preloader — original FB branding. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    try {
      if (sessionStorage.getItem("fb-preloader")) {
        setShow(false);
        return;
      }
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("fb-preloader", "1");
      } catch {
        /* ignore */
      }
    }, 900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080A0F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="relative h-44 w-44">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const angle = (i / 7) * Math.PI * 1.35 - 0.6;
                const r = 48 + i * 8;
                return (
                  <span
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.max(5, 12 - i),
                      height: Math.max(5, 12 - i),
                      left: `calc(50% + ${Math.cos(angle) * r}px)`,
                      top: `calc(50% + ${Math.sin(angle) * r}px)`,
                      transform: "translate(-50%, -50%)",
                      background: `rgba(124, 92, 255, ${1 - i * 0.1})`,
                      boxShadow: "0 0 12px rgba(124,92,255,0.55)",
                    }}
                  />
                );
              })}
            </motion.div>
            <motion.p
              className="absolute inset-0 flex items-center justify-center text-2xl font-semibold tracking-[0.28em] text-[#F5F7FA]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              FB
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

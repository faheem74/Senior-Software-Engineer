"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Short branded splash — always clears so pages never look empty. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const hide = () => {
      if (!cancelled) setShow(false);
    };

    if (reduce) {
      hide();
      return;
    }

    try {
      if (sessionStorage.getItem("fb-preloader")) {
        hide();
        return;
      }
    } catch {
      /* ignore */
    }

    const t = window.setTimeout(() => {
      hide();
      try {
        sessionStorage.setItem("fb-preloader", "1");
      } catch {
        /* ignore */
      }
    }, 700);

    // Hard failsafe — never block content
    const failsafe = window.setTimeout(hide, 1600);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.clearTimeout(failsafe);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#080A0F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        >
          <div className="relative h-28 w-28">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i / 6) * Math.PI * 2;
                const r = 40;
                return (
                  <span
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-[#7C5CFF]"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * r}px)`,
                      top: `calc(50% + ${Math.sin(angle) * r}px)`,
                      transform: "translate(-50%, -50%)",
                      opacity: 1 - i * 0.12,
                    }}
                  />
                );
              })}
            </motion.div>
            <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold tracking-[0.28em] text-[#F5F7FA]">
              FB
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

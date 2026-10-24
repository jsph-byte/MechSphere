import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, PictureInPicture2 } from "lucide-react";

/**
 * YouTube-style picture-in-picture for running simulations.
 * Wrap the in-page simulation: when it scrolls out of view while running,
 * a small floating player appears (draggable, above the mobile bottom nav)
 * so the run stays visible. `mini` is a compact, auto-looping copy of the
 * visualization element.
 */
export default function SimPlayer({ title, playing, onDismiss, children, mini }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  // Keep the player inside the viewport while dragging (computed on open).
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const compute = () => {
      const w = Math.min(window.innerWidth - 24, 320);
      setDragConstraints({
        left: -(window.innerWidth - w - 12),
        right: 0,
        top: -(window.innerHeight - 260),
        bottom: 0,
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const showMini = playing && !inView;

  return (
    <>
      <div ref={ref}>{children}</div>
      {createPortal(
        <AnimatePresence>
          {showMini && (
            <motion.div
              key="mini-player"
              role="dialog"
              aria-label={`${title} — mini player`}
              drag
              dragMomentum={false}
              dragElastic={0.12}
              dragConstraints={dragConstraints}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 32, opacity: { duration: 0.15 } }}
              style={{ touchAction: "none" }}
              className="fixed right-3 bottom-[calc(5.5rem_+_env(safe-area-inset-bottom))] z-50 w-[calc(100vw_-_1.5rem)] max-w-[320px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl backdrop-blur md:right-6 md:bottom-6"
            >
              <div className="flex cursor-grab items-center justify-between gap-2 border-b border-border px-2 py-1.5 active:cursor-grabbing">
                <span className="flex items-center gap-1.5 truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <PictureInPicture2 className="h-3 w-3 shrink-0 text-orange-400" />
                  {title}
                </span>
                <button
                  onClick={onDismiss}
                  aria-label="Close mini player"
                  className="-mr-1 flex h-8 w-8 shrink-0 touch-manipulation items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-2">{mini}</div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
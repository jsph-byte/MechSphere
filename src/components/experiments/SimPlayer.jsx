import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, PictureInPicture2 } from "lucide-react";

/**
 * YouTube-style picture-in-picture for running simulations.
 * Wrap the in-page simulation: when it scrolls out of view while running,
 * a small floating player appears bottom-right so the run stays visible.
 * `mini` is a compact, auto-looping copy of the visualization element.
 */
export default function SimPlayer({ title, playing, onDismiss, children, mini }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const showMini = playing && !inView;

  return (
    <>
      <div ref={ref}>{children}</div>
      {showMini &&
        createPortal(
          <div
            className="fixed bottom-24 right-3 z-50 w-[290px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl md:bottom-6 md:right-6"
            role="dialog"
            aria-label={`${title} — mini player`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5">
              <span className="flex items-center gap-1.5 truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <PictureInPicture2 className="h-3 w-3 shrink-0 text-orange-400" />
                {title}
              </span>
              <button
                onClick={onDismiss}
                aria-label="Close mini player"
                className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-2">{mini}</div>
          </div>,
          document.body
        )}
    </>
  );
}
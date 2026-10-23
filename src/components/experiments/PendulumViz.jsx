import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { fmt } from "@/lib/format";

/** Animated pendulum. Angle model: θ(t) = θ0·cos(2π·t/T) (small-angle model).
 *  autoLoop: used by the floating mini-player — start on mount. */
export default function PendulumViz({ length, angleDeg, period, onPlayStarted, autoLoop = false }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let id;
    const step = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      tRef.current += dt;
      setT(tRef.current);
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [playing]);

  useEffect(() => {
    if (autoLoop) setPlaying(true);
  }, [autoLoop]);

  const thetaNow = angleDeg * Math.cos((2 * Math.PI * t) / (period || 1)) * (Math.PI / 180);
  const W = 400, H = 250, pivotX = W / 2, pivotY = 26, rodPx = 190;
  const bobX = pivotX + rodPx * Math.sin(thetaNow);
  const bobY = pivotY + rodPx * Math.cos(thetaNow);

  const start = () => { if (!playing) { setPlaying(true); onPlayStarted?.(); } };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Pendulum · L = {fmt(length)} m
        </span>
        <button
          onClick={() => (playing ? setPlaying(false) : start())}
          className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "Pause" : "Release"}
        </button>
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Animated pendulum">
          {/* ceiling */}
          <line x1={pivotX - 60} y1={pivotY} x2={pivotX + 60} y2={pivotY} stroke="currentColor" className="text-border" strokeWidth="4" />
          {/* vertical reference */}
          <line x1={pivotX} y1={pivotY} x2={pivotX} y2={pivotY + rodPx + 26} strokeDasharray="4 4" stroke="currentColor" className="text-muted-foreground" strokeWidth="1" opacity="0.4" />
          {/* angle arc */}
          <path
            d={`M ${pivotX + 40} ${pivotY + 40} A 40 40 0 0 0 ${pivotX + 40 * Math.sin(thetaNow)} ${pivotY + 40 * Math.cos(thetaNow)}`}
            fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5"
          />
          {/* rod */}
          <line x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} stroke="currentColor" className="text-foreground" strokeWidth="2.5" />
          {/* bob */}
          <circle cx={bobX} cy={bobY} r="13" fill="currentColor" className="text-orange-500" />
          <text x={pivotX + 52} y={pivotY + 58} fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">
            θ = {fmt(Math.abs(thetaNow * 180 / Math.PI))}°
          </text>
        </svg>
      </div>
    </div>
  );
}
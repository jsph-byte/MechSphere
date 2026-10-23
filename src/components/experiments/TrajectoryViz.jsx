import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { fmt } from "@/lib/format";

/** Animated ideal-projectile trajectory with live marker. Pure SVG, deterministic.
 *  autoLoop: used by the floating mini-player — start on mount and loop forever. */
export default function TrajectoryViz({ res, onPlayStarted, autoLoop = false }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!playing || !res.valid) return;
    let last = performance.now();
    let id;
    const step = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      tRef.current += dt;
      if (tRef.current >= res.t) {
        if (autoLoop) { tRef.current = 0; setT(0); }
        else { tRef.current = res.t; setT(res.t); setPlaying(false); return; }
      }
      setT(tRef.current);
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [playing, res.t, res.valid, autoLoop]);

  useEffect(() => {
    if (autoLoop && res.valid) { tRef.current = 0; setT(0); setPlaying(true); }
  }, [autoLoop, res.valid]);

  if (!res.valid) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        Fix the input errors to see the trajectory.
      </div>
    );
  }

  const start = () => { tRef.current = 0; setT(0); setPlaying(true); onPlayStarted?.(); };

  const xMax = res.R * 1.06 || 1;
  const yMax = Math.max(res.H * 1.5, 1);
  const W = 400, H = 230, PADL = 34, PADR = 10, PADT = 18, PADB = 36;
  const sx = (x) => PADL + (x / xMax) * (W - PADL - PADR);
  const sy = (y) => H - PADB - (y / yMax) * (H - PADT - PADB);
  const mx = res.vx * t;
  // marker position from the exact model (g derived from the inputs, not hard-coded)
  const gEff = (2 * res.vy0) / (res.t || 1);
  const markerY = Math.max(0, res.vy0 * t - 0.5 * gEff * t * t);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Trajectory</span>
        <button
          onClick={start}
          className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
        >
          {t === 0 && !playing ? <Play className="h-3.5 w-3.5" /> : <RotateCcw className="h-3.5 w-3.5" />}
          {playing ? "Replay" : "Launch"}
        </button>
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Projectile trajectory plot">
          {/* ground */}
          <line x1={PADL - 14} y1={H - PADB} x2={W - PADR} y2={H - PADB} stroke="currentColor" className="text-border" strokeWidth="2" />
          {/* max height guide */}
          <line x1={sx(res.R / 2)} y1={sy(res.H)} x2={sx(res.R / 2)} y2={sy(0)} strokeDasharray="4 4" stroke="currentColor" className="text-muted-foreground" strokeWidth="1" opacity="0.5" />
          {/* trajectory */}
          <polyline
            points={res.points.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ")}
            fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="2.5"
          />
          {/* projectile marker */}
          <circle cx={sx(mx)} cy={sy(markerY)} r="6" fill="currentColor" className="text-orange-500" />
          {/* labels */}
          <text x={sx(res.R / 2)} y={sy(res.H) - 6} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground">
            H = {fmt(res.H)} m
          </text>
          <text x={sx(res.R)} y={H - 20} textAnchor="end" fontSize="10" fill="currentColor" className="text-muted-foreground">
            R = {fmt(res.R)} m
          </text>
          <text x={sx(mx)} y={sy(markerY) - 10} textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
            t = {fmt(t, 3)} s
          </text>
        </svg>
      </div>
    </div>
  );
}
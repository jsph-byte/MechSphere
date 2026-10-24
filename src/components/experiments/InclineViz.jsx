import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { fmt } from "@/lib/format";

/** Inclined plane with force vectors. Sign convention: down the plane = positive.
 *  autoLoop: used by the floating mini-player — start on mount. */
export default function InclineViz({ angleDeg, res, onPlayStarted, autoLoop = false }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!playing || !res?.valid || !res.sliding) return;
    let last = performance.now();
    let id;
    const step = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      tRef.current += dt;
      if (tRef.current > 3) tRef.current = 0; // loop the slide
      setT(tRef.current);
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [playing, res?.valid, res?.sliding]);

  useEffect(() => {
    if (autoLoop && res?.valid && res.sliding) setPlaying(true);
  }, [autoLoop, res?.valid, res?.sliding]);

  if (!res?.valid) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        Fix the input errors to see the diagram.
      </div>
    );
  }

  const W = 400, H = 260, OX = 30, OY = H - 30; // bottom-left corner of ramp
  const th = (angleDeg * Math.PI) / 180;
  const rampLen = 330;
  const rampH = Math.min(rampLen * Math.sin(th), OY - 20);
  const rampRun = rampLen * Math.cos(th);
  // top end of hypotenuse (block starts here, slides down toward the corner)
  const topX = OX + rampRun, topY = OY - rampH;

  // block slides from top toward corner: fraction along hypotenuse
  const sFrac = res.sliding ? Math.min(0.75, 0.5 * Math.abs(res.a) * t * t / 6) : 0;
  const bx = topX - sFrac * rampRun;
  const by = topY + sFrac * rampH;

  // force arrow helper (unit vectors in screen coords)
  const arrow = (x, y, dx, dy, color, label) => {
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len; // unit vector toward the tip
    const px = -uy, py = ux; // perpendicular
    const tipX = x + dx, tipY = y + dy;
    const baseX = tipX - ux * 9, baseY = tipY - uy * 9;
    return (
      <g stroke={color} fill={color}>
        <line x1={x} y1={y} x2={baseX} y2={baseY} strokeWidth="2.5" />
        <polygon points={`${tipX},${tipY} ${baseX + px * 4},${baseY + py * 4} ${baseX - px * 4},${baseY - py * 4}`} strokeWidth="0" />
        <text x={tipX + ux * 14} y={tipY + uy * 14 + 3} fontSize="10" stroke="none" textAnchor="middle">{label}</text>
      </g>
    );
  };

  // directions in screen space
  const upPlane = { dx: Math.cos(th), dy: -Math.sin(th) };     // friction opposes sliding
  const intoNormal = { dx: Math.sin(th), dy: Math.cos(th) };   // away from surface (outward normal)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Free-body diagram (down the plane = positive)
        </span>
        <button
          onClick={() => { setPlaying((p) => !p); if (!playing) onPlayStarted?.(); }}
          disabled={!res.sliding}
          className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {res.sliding ? (playing ? "Pause" : "Slide") : "Not sliding"}
        </button>
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Block on inclined plane with force vectors">
          {/* ramp */}
          <polygon points={`${OX},${OY} ${topX},${topY} ${OX},${OY}`} fill="none" />
          <polygon points={`${OX},${OY} ${topX},${topY} ${OX},${topY}`} fill="currentColor" className="text-secondary" stroke="currentColor" strokeWidth="1.5" />
          {/* angle marker */}
          <path d={`M ${OX + 46} ${OY} A 46 46 0 0 0 ${OX + 46 * Math.cos(th)} ${OY - 46 * Math.sin(th)}`} fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" />
          <text x={OX + 54} y={OY - 8} fontSize="11" fill="currentColor" className="text-cyan-400 font-mono">θ = {fmt(angleDeg, 3)}°</text>
          {/* block */}
          <rect x={bx - 16} y={by - 10} width="32" height="22" rx="3" transform={`rotate(${angleDeg} ${bx} ${by})`} fill="currentColor" className="text-orange-500" />
          {/* vectors */}
          {arrow(bx, by, 0, 52, "#f97316", `W = ${fmt(res.weight)} N`)}
          {arrow(bx, by, intoNormal.dx * 46, -intoNormal.dy * 46, "#06b6d4", `N = ${fmt(res.normal)} N`)}
          {res.friction > 0 && arrow(bx, by, upPlane.dx * 38, upPlane.dy * 38, "#a1a1aa", `f = ${fmt(res.friction)} N`)}
        </svg>
        {!res.sliding && (
          <div className="px-1 pb-1 text-[11px] font-medium text-amber-500">
            With these values the block does not accelerate down the plane — kinetic friction (which assumes it is already moving) fully opposes the driving force.
          </div>
        )}
      </div>
    </div>
  );
}
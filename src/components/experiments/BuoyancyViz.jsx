import React from "react";
import { fmt } from "@/lib/format";

/** Tank schematic: block positioned by its equilibrium submerged fraction,
 *  with buoyant-force and weight arrows scaled to their magnitudes.
 *  Illustrative diagram driven by the buoyancy() calculation — not a fluid solver. */
export default function BuoyancyViz({ res, fluidLabel }) {
  if (!res?.valid) return null;

  const W = 340;
  const H = 250;
  const surfaceY = 78;
  const bottomY = 222;
  const blockW = 64;
  const blockH = 60;
  const f = res.submergedFraction;

  let topY;
  if (res.state === "sinking") topY = bottomY - blockH - 4;
  else if (res.state === "neutral") topY = surfaceY + 12;
  else topY = surfaceY - blockH * (1 - f);

  const cx = 170;
  const cy = topY + blockH / 2;
  const maxF = Math.max(res.weight, res.buoyantForce) || 1;
  const arrowLen = (v) => 20 + (42 * v) / maxF;
  const fbLen = arrowLen(res.buoyantForce);
  const wLen = arrowLen(res.weight);

  const arrow = (x, y0, y1, colorClass, label) => (
    <g>
      <line x1={x} y1={y0} x2={x} y2={y1} stroke="currentColor" className={colorClass} strokeWidth="3" />
      <path
        d={`M ${x - 5} ${y1 + (y1 < y0 ? 8 : -8)} L ${x} ${y1} L ${x + 5} ${y1 + (y1 < y0 ? 8 : -8)}`}
        fill="currentColor"
        className={colorClass}
      />
      <text
        x={x + 10}
        y={(y0 + y1) / 2 + 3}
        fontSize="11"
        fontWeight="700"
        fill="currentColor"
        className={colorClass}
      >
        {label}
      </text>
    </g>
  );

  const stateText =
    res.state === "floating"
      ? `Floating — ${fmt(f * 100, 3)}% submerged`
      : res.state === "neutral"
        ? "Neutrally buoyant — fully submerged, no net force"
        : "Sinks — weight exceeds the maximum buoyant force";

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Tank schematic ({fluidLabel})
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Object floating or sinking in a fluid">
          {/* fluid */}
          <rect x="70" y={surfaceY} width="200" height={bottomY - surfaceY} fill="currentColor" className="text-cyan-500" opacity="0.18" />
          <line x1="70" y1={surfaceY} x2="270" y2={surfaceY} stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" strokeDasharray="5 4" />
          {/* tank */}
          <path d={`M 70 70 L 70 ${bottomY} L 270 ${bottomY} L 270 70`} fill="none" stroke="currentColor" className="text-border" strokeWidth="4" />
          {/* block */}
          <rect
            x={cx - blockW / 2}
            y={topY}
            width={blockW}
            height={blockH}
            rx="4"
            fill="currentColor"
            className={res.state === "sinking" ? "text-red-500" : res.state === "neutral" ? "text-cyan-500" : "text-orange-500"}
            opacity="0.75"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* force arrows */}
          {arrow(cx, cy, cy - fbLen, "text-cyan-400", `F_b = ${fmt(res.buoyantForce, 4)} N`)}
          {arrow(cx, cy, cy + wLen, "text-orange-500", `W = ${fmt(res.weight, 4)} N`)}
          <text x="170" y={H - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" className="text-muted-foreground">
            {stateText}
          </text>
        </svg>
      </div>
    </div>
  );
}
import React from "react";
import { fmt } from "@/lib/format";

/** Pipe schematic: wide section → contraction → narrow section, with animated
 *  flow lines (SVG SMIL animation) and computed speed/area/pressure labels.
 *  Idealized steady-flow visualization, not a CFD result. */
export default function BernoulliViz({ d1, d2, v1, v2, p1, p2, qLps, dz }) {
  const W = 420;
  const H = 230;
  const yc1 = 118;
  const h1 = Math.max(6, Math.min(50, d1 * 200)); // m → px half-height
  const h2 = Math.max(5, Math.min(50, d2 * 200));
  const yc2 = yc1 - Math.max(-16, Math.min(16, dz * 10)); // dz > 0 → section 2 drawn higher

  const t1 = yc1 - h1;
  const b1 = yc1 + h1;
  const t2 = yc2 - h2;
  const b2 = yc2 + h2;

  const flowLine = (y) => (
    <line x1="28" y1={y} x2="392" y2={y} stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" opacity="0.6">
      <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1s" repeatCount="indefinite" />
    </line>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Pipe schematic (flow left → right · idealized steady flow)
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Pipe with a contraction; fluid speeds up in the narrow section">
          {/* pipe walls */}
          <path
            d={`M 28 ${t1} L 150 ${t1} C 195 ${t1} 205 ${t2} 250 ${t2} L 392 ${t2}`}
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth="3"
          />
          <path
            d={`M 28 ${b1} L 150 ${b1} C 195 ${b1} 205 ${b2} 250 ${b2} L 392 ${b2}`}
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth="3"
          />
          <line x1="28" y1={t1} x2="28" y2={b1} stroke="currentColor" className="text-border" strokeWidth="3" />
          <line x1="392" y1={t2} x2="392" y2={b2} stroke="currentColor" className="text-border" strokeWidth="3" />

          {/* animated flow lines */}
          <g strokeDasharray="10 8">
            {flowLine(yc1)}
            {flowLine(yc1 - h1 * 0.45)}
            {flowLine(yc1 + h1 * 0.45)}
          </g>
          {/* flow direction arrow */}
          <path d="M 34 60 h 40 m -9 -6 l 9 6 l -9 6" stroke="currentColor" className="text-orange-400" strokeWidth="2" fill="none" />
          <text x="82" y="64" fontSize="10" fontWeight="600" fill="currentColor" className="text-muted-foreground">
            flow
          </text>

          {/* section labels */}
          <text x="88" y={b1 + 16} textAnchor="middle" fontSize="10.5" fill="currentColor" className="text-muted-foreground font-mono">
            v₁ = {fmt(v1)} m/s
          </text>
          <text x="88" y={b1 + 29} textAnchor="middle" fontSize="10.5" fill="currentColor" className="text-muted-foreground font-mono">
            P₁ = {fmt(p1 / 1000)} kPa
          </text>
          <text x="320" y={t2 - 10} textAnchor="middle" fontSize="10.5" fill="currentColor" className="text-cyan-400 font-mono">
            v₂ = {fmt(v2)} m/s
          </text>
          <text x="320" y={b2 + 16} textAnchor="middle" fontSize="10.5" fill="currentColor" className="text-muted-foreground font-mono">
            P₂ = {fmt(p2 / 1000)} kPa
          </text>
          <text x="210" y={H - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" className="text-muted-foreground">
            Q = {fmt(qLps)} L/s constant — narrower area means faster speed and lower pressure
          </text>
        </svg>
      </div>
    </div>
  );
}
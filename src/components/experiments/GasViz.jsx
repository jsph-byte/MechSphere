import React from "react";
import { fmt } from "@/lib/format";

// Deterministic pseudo-random particle positions (fixed table, not simulation).
const PARTICLES = [
  [0.1, 0.2], [0.3, 0.5], [0.55, 0.15], [0.7, 0.55], [0.85, 0.3],
  [0.18, 0.72], [0.42, 0.35], [0.62, 0.8], [0.9, 0.65], [0.05, 0.42],
  [0.25, 0.9], [0.5, 0.68], [0.78, 0.1], [0.95, 0.85], [0.35, 0.12],
  [0.65, 0.45], [0.15, 0.55], [0.82, 0.5],
];

/** Schematic piston comparison for two gas states. Schematic, not a molecular simulation. */
export default function GasViz({ label1, v1, p1, label2, v2, p2, t1K, t2K }) {
  const W = 400, H = 210;
  const CH = 150; // cylinder height px
  const vScale = (v) => Math.min(1, Math.max(0.06, v / 10)); // map liters 0..10 → 0..1
  const piston = (x0, label, v, p, tK) => {
    const gasH = CH * vScale(v);
    const topY = H - 30 - CH + (CH - gasH);
    return (
      <g>
        <text x={x0 + 45} y={22} textAnchor="middle" fontSize="11" fill="currentColor" className="text-muted-foreground" fontWeight="600">{label}</text>
        {/* cylinder walls */}
        <path d={`M ${x0} ${H - 30} L ${x0} ${H - 30 - CH} M ${x0 + 90} ${H - 30} L ${x0 + 90} ${H - 30 - CH}`} stroke="currentColor" className="text-border" strokeWidth="3" />
        {/* gas region */}
        <rect x={x0} y={H - 30 - gasH} width="90" height={gasH} fill="currentColor" className="text-cyan-500" opacity={Math.min(0.35, 0.08 + p / 900)} />
        {PARTICLES.map(([fx, fy], i) => (
          <circle key={i} cx={x0 + 8 + fx * 74} cy={H - 26 - fy * (gasH - 12)} r="2.6" fill="currentColor" className="text-cyan-400" />
        ))}
        {/* piston */}
        <rect x={x0 - 2} y={topY - 8} width="94" height="8" fill="currentColor" className="text-orange-500" rx="2" />
        <text x={x0 + 45} y={H - 14} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
          V = {fmt(v)} L · P = {fmt(p)} kPa · T = {fmt(tK, 5)} K
        </text>
      </g>
    );
  };
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Piston schematic (particles are illustrative, not a molecular simulation)
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Two gas states as pistons">
          {piston(45, label1, v1, p1, t1K)}
          {piston(265, label2, v2, p2, t2K)}
          <path d="M 200 105 h 55 m -10 -7 l 10 7 l -10 7" stroke="currentColor" className="text-orange-400" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
}
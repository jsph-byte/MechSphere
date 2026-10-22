import React from "react";
import { fmt } from "@/lib/format";

/** Bar schematic with a conceptual hot→cold colour gradient (illustrative, not a
 *  measured temperature field) and an animated heat-flow arrow sized to the
 *  computed Fourier's-law rate. */
export default function ConductionViz({ hotC, coldC, rateW, materialLabel, lengthM }) {
  const W = 420;
  const H = 200;
  const barY = 82;
  const barH = 44;

  const arrowScale = Math.min(90, 30 + Math.sqrt(Math.max(rateW, 0)) * 1.4);
  const cx = 210;
  const cy = barY + barH / 2;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Conduction path (gradient is illustrative, not a measured field)
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Bar conducting heat from its hot end to its cold end">
          <defs>
            <linearGradient id="condGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* bar */}
          <rect x="40" y={barY} width="340" height={barH} rx="5" fill="url(#condGrad)" opacity="0.85" stroke="currentColor" className="text-border" strokeWidth="2" />

          {/* end temperatures */}
          <text x="40" y={barY - 12} fontSize="11" fontWeight="700" fill="#ef4444">
            T_hot = {fmt(hotC)} °C
          </text>
          <text x="380" y={barY - 12} textAnchor="end" fontSize="11" fontWeight="700" fill="#3b82f6">
            T_cold = {fmt(coldC)} °C
          </text>

          {/* animated heat-flow arrow */}
          <path
            d={`M ${cx - arrowScale} ${cy} h ${2 * arrowScale} m -12 -7 l 12 7 l -12 7`}
            stroke="currentColor"
            className="text-orange-400"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="10 6"
          >
            <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <text x={cx} y={cy - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" className="text-orange-400 font-mono">
            q = {fmt(rateW)} W
          </text>

          {/* labels */}
          <text x={cx} y={barY + barH + 22} textAnchor="middle" fontSize="10.5" fill="currentColor" className="text-muted-foreground">
            {materialLabel} · L = {fmt(lengthM)} m · steady one-dimensional conduction
          </text>
        </svg>
      </div>
    </div>
  );
}
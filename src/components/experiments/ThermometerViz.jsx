import React from "react";
import { fmt } from "@/lib/format";

/** Simple vertical temperature bar showing initial → final temperature. */
export default function ThermometerViz({ t0, tf, min = -50, max = 150, warning }) {
  const clamp = (v) => Math.min(1, Math.max(0, (v - min) / (max - min)));
  const W = 120, H = 220, BARX = 40, BARY = 16, BARH = 180, BARW = 22;
  const yOf = (v) => BARY + (1 - clamp(v)) * BARH;
  const hot = tf >= t0;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Temperature change
      </div>
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[180px]" role="img" aria-label="Temperature bar chart">
          {/* scale */}
          {[min, (min + max) / 2, max].map((v) => (
            <g key={v}>
              <line x1={BARX - 6} y1={yOf(v)} x2={BARX + BARW + 6} y2={yOf(v)} stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="3 3" />
              <text x={BARX - 10} y={yOf(v) + 3} fontSize="9" textAnchor="end" fill="currentColor" className="text-muted-foreground font-mono">{v}</text>
            </g>
          ))}
          {/* track */}
          <rect x={BARX} y={BARY} width={BARW} height={BARH} rx="11" fill="currentColor" className="text-secondary" />
          {/* fill between t0 and tf */}
          <rect
            x={BARX} y={Math.min(yOf(t0), yOf(tf))} width={BARW}
            height={Math.max(2, Math.abs(yOf(tf) - yOf(t0)))} rx="10"
            fill="currentColor" className={hot ? "text-orange-500" : "text-cyan-500"}
          />
          {/* markers */}
          <line x1={BARX - 4} y1={yOf(t0)} x2={BARX + BARW + 4} y2={yOf(t0)} stroke="currentColor" className="text-foreground" strokeWidth="2" />
          <text x={BARX + BARW + 8} y={yOf(tf) + 3} fontSize="9" fill="currentColor" className="text-muted-foreground font-mono">
            {fmt(tf, 4)} °C
          </text>
        </svg>
        {warning && (
          <div className="mx-1 mb-1 rounded-md border border-amber-500/40 bg-amber-500/10 p-2 text-[11px] font-medium text-amber-500">
            {warning}
          </div>
        )}
      </div>
    </div>
  );
}
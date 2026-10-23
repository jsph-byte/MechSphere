import React, { useState } from "react";
import { Equal, X } from "lucide-react";
import { QUANTITIES, dimsEqual, dimsString } from "@/lib/dimensional";
import { cn } from "@/lib/utils";

/** Secondary mode: quick dimension match between two selected quantities. */
export default function QuantityComparison() {
  const [a, setA] = useState("force");
  const [b, setB] = useState("temperature");
  const qa = QUANTITIES.find((q) => q.id === a);
  const qb = QUANTITIES.find((q) => q.id === b);
  const compatible = dimsEqual(qa.dims, qb.dims);
  const selectCls = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantity A</span>
            <select value={a} onChange={(e) => setA(e.target.value)} className={selectCls}>
              {QUANTITIES.map((q) => <option key={q.id} value={q.id}>{q.label} [{dimsString(q.dims)}]</option>)}
            </select>
          </label>
          <div className="hidden pb-2.5 text-center font-mono text-lg text-muted-foreground sm:block">vs</div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantity B</span>
            <select value={b} onChange={(e) => setB(e.target.value)} className={selectCls}>
              {QUANTITIES.map((q) => <option key={q.id} value={q.id}>{q.label} [{dimsString(q.dims)}]</option>)}
            </select>
          </label>
        </div>
        <div className={cn("mt-4 flex items-start gap-2 rounded-lg border p-3.5 text-sm font-medium", compatible ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-destructive/40 bg-destructive/10 text-destructive")}>
          {compatible ? <Equal className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
          {compatible ? (
            <span>Compatible — {qa.label} [{dimsString(qa.dims)}] and {qb.label} [{dimsString(qb.dims)}] share the same dimensions, so they can be added, subtracted, or equated directly.</span>
          ) : (
            <span>Incompatible for direct equality or addition — {qa.label} [{dimsString(qa.dims)}] and {qb.label} [{dimsString(qb.dims)}] have different physical dimensions, so equating or adding them is meaningless.</span>
          )}
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Incompatible ≠ unusable together:</strong> this check only rules out
        direct equality, addition, and subtraction. Incompatible quantities can still combine through other
        operations — acceleration [L·T⁻²] multiplied by time [T] produces velocity [L·T⁻¹], and force [M·L·T⁻²]
        divided by area [L²] produces pressure. Use the Equation Checker to analyze those combinations.
      </p>
    </div>
  );
}
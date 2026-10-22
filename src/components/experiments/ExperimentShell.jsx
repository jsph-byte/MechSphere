import React from "react";
import { Link } from "react-router-dom";
import { RotateCcw, ChevronLeft, Info } from "lucide-react";
import PredictFirst from "@/components/experiments/PredictFirst";
import { cn } from "@/lib/utils";

/**
 * Shared experiment page scaffold:
 * title/intro → assumptions → visualization + controls + results (children)
 * → explanation → Predict First → reset.
 */
export default function ExperimentShell({
  title, tagline, intro, assumptions, children, explanation, predict, onReset, backLabel = "All experiments",
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to="/lab" className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-3.5 w-3.5" /> {backLabel}
          </Link>
          <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {tagline && <p className="mt-1 text-sm text-cyan-400">{tagline}</p>}
        </div>
        <button
          onClick={onReset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{intro}</p>

      <Assumptions assumptions={assumptions} />

      {children}

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">
          Why this happens
        </h2>
        {explanation}
      </section>

      {predict && <PredictFirst {...predict} />}
    </div>
  );
}

export function Assumptions({ assumptions }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
      <div>
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-cyan-400">Model assumptions</div>
        <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
          {assumptions.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function ErrorList({ errors }) {
  if (!errors) return null;
  const msgs = Object.values(errors);
  if (!msgs.length) return null;
  return (
    <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs font-medium text-destructive">
      {msgs.map((m, i) => <div key={i}>{m}</div>)}
    </div>
  );
}

export function Stat({ label, value, unit, accent }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn("mt-1 font-mono text-lg font-semibold tabular-nums", accent === "orange" ? "text-orange-400" : accent === "cyan" ? "text-cyan-400" : "text-foreground")}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}

export function VizPanel({ title, children, footer }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {title && (
        <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">{footer}</div>}
    </div>
  );
}
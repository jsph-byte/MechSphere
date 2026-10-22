import React, { useState } from "react";
import { Lightbulb, PlayCircle, Check, X, RotateCcw } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * Predict → Experiment → Compare → Understand.
 * The user commits to a prediction BEFORE the computed outcome is revealed,
 * then sees the comparison against the live calculation.
 *
 * props:
 *  - experimentId / label: for progress tracking
 *  - question, options: [{label}] (strings also accepted), correctIndex
 *  - explanation: shown after reveal
 *  - computeComparison: () => ({ before, after }) — computed live from current inputs
 */
export default function PredictFirst({
  experimentId, label, question, options, correctIndex, explanation, computeComparison,
}) {
  const { recordPrediction } = useProgress();
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [comparison, setComparison] = useState(null);
  const opts = options.map((o) => (typeof o === "string" ? { label: o } : o));
  const correct = selected !== null && selected === correctIndex;

  const reveal = () => {
    if (selected === null) return;
    setComparison(computeComparison());
    setRevealed(true);
    recordPrediction(selected === correctIndex, `${label} — Predict First`);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
    setComparison(null);
  };

  return (
    <section className="rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/[0.07] to-transparent p-5">
      <div className="mb-1 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-orange-400" />
        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-orange-400">
          Predict first
        </h2>
        <span className="text-[11px] text-muted-foreground">commit before you compute</span>
      </div>
      <p className="mb-3 text-sm font-medium text-foreground">{question}</p>

      {!revealed ? (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            {opts.map((o, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors",
                  selected === i
                    ? "border-orange-500 bg-orange-500/15 text-orange-300"
                    : "border-border bg-card text-foreground hover:border-ring"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={reveal}
              disabled={selected === null}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PlayCircle className="h-4 w-4" /> Run &amp; compare
            </button>
            {selected === null && <span className="text-xs text-muted-foreground">Choose a prediction to enable</span>}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {comparison && (
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{comparison.beforeLabel || "Before"}</div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-foreground">{comparison.before}</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{comparison.afterLabel || "After"}</div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-cyan-400">{comparison.after}</div>
              </div>
            </div>
          )}
          <div className={cn("flex items-start gap-2 rounded-lg border p-3 text-sm font-medium", correct ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-destructive/40 bg-destructive/10 text-destructive")}>
            {correct ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
            <div>
              {correct ? "Correct prediction!" : "Not quite —"} your answer: “{opts[selected].label}”. Correct: “{opts[correctIndex].label}”.
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Understand: </span>{explanation}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Try another prediction
          </button>
        </div>
      )}
    </section>
  );
}
import React, { useState } from "react";
import { Lightbulb, Check, X, ChevronRight, RotateCcw, ClipboardCheck } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * Sequential prediction test — this IS the lab's pre-test / post-test.
 * One question at a time: commit to an answer → reveal (with optional live
 * comparison computed from the current inputs) → move on to the next,
 * different question → score summary at the end.
 *
 * questions: [{ question, options: string[], correctIndex (or `correct`),
 * explanation, computeComparison? () => { beforeLabel, before, afterLabel, after } }]
 */
export default function PredictFirst({ experimentId, label, testType = "pre", questions = [] }) {
  const { recordPrediction, submitAssessment } = useProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  if (!questions || questions.length === 0) return null;

  const q = questions[index];
  const opts = q.options.map((o) => (typeof o === "string" ? { label: o } : o));
  const correctIndex = q.correctIndex !== undefined ? q.correctIndex : q.correct;
  const correct = selected === correctIndex;
  const isPre = testType === "pre";

  const reveal = () => {
    if (selected === null || revealed) return;
    if (q.computeComparison) setComparison(q.computeComparison());
    setRevealed(true);
    setResults((r) => [...r, selected === correctIndex]);
    recordPrediction(selected === correctIndex, `${label} — ${isPre ? "Pre" : "Post"}-Test`);
  };

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
      setComparison(null);
    } else {
      const score = results.filter(Boolean).length;
      submitAssessment(experimentId, testType, {
        answers: results,
        score,
        total: questions.length,
        pct: Math.round((100 * score) / questions.length),
        at: Date.now(),
      });
      setDone(true);
    }
  };

  const retake = () => {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setComparison(null);
    setResults([]);
    setDone(false);
  };

  const theme = isPre
    ? {
        section: "border-orange-500/30 bg-gradient-to-b from-orange-500/[0.07] to-transparent",
        title: "text-orange-400",
        active: "border-orange-500 bg-orange-500/15 text-orange-300",
        button: "bg-orange-500 hover:bg-orange-600",
        bar: "bg-orange-500",
      }
    : {
        section: "border-cyan-500/30 bg-gradient-to-b from-cyan-500/[0.07] to-transparent",
        title: "text-cyan-400",
        active: "border-cyan-500 bg-cyan-500/15 text-cyan-300",
        button: "bg-cyan-500 hover:bg-cyan-600",
        bar: "bg-cyan-500",
      };

  const score = results.filter(Boolean).length;

  return (
    <section className={cn("rounded-xl border p-5", theme.section)}>
      <div className="mb-1 flex flex-wrap items-center gap-2">
        {isPre ? <Lightbulb className="h-4 w-4 text-orange-400" /> : <ClipboardCheck className="h-4 w-4 text-cyan-400" />}
        <h2 className={cn("font-heading text-sm font-bold uppercase tracking-wider", theme.title)}>
          {isPre ? "Pre-test — predict first" : "Post-test — test yourself"}
        </h2>
        <span className="text-[11px] text-muted-foreground">
          {isPre
            ? "commit before you compute — answer, then move to the next question"
            : "after experimenting, check what you now understand"}
        </span>
      </div>

      {done ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className={cn("font-mono text-3xl font-bold", theme.title)}>
              {score}/{questions.length}
            </div>
            <div className="text-sm text-muted-foreground">
              <div className="font-semibold text-foreground">
                {score === questions.length ? "Perfect score!" : score >= questions.length / 2 ? "Solid work." : "Keep experimenting with the simulation above."}
              </div>
              <div>{Math.round((100 * score) / questions.length)}% — saved to your progress.</div>
            </div>
            <button
              onClick={retake}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retake
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {results.map((r, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold",
                  r ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-destructive/40 bg-destructive/10 text-destructive"
                )}
              >
                {r ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} Q{i + 1}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* progress */}
          <div className="mb-3 flex items-center gap-2">
            <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
              Question {index + 1} of {questions.length}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              <div className={cn("h-full rounded-full transition-all", theme.bar)} style={{ width: `${(100 * index) / questions.length}%` }} />
            </div>
          </div>

          <p className="mb-3 text-sm font-medium text-foreground">{q.question}</p>

          {!revealed ? (
            <>
              <div className="grid gap-2 sm:grid-cols-2">
                {opts.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors",
                      selected === i ? theme.active : "border-border bg-card text-foreground hover:border-ring"
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
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
                    theme.button
                  )}
                >
                  <Check className="h-4 w-4" /> Check answer
                </button>
                {selected === null && <span className="text-xs text-muted-foreground">Choose an answer to continue</span>}
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
                  {correct ? "Correct!" : "Not quite —"} your answer: “{opts[selected].label}”. Correct: “{opts[correctIndex].label}”.
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Understand: </span>{q.explanation}
              </div>
              <button
                onClick={next}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity",
                  theme.button
                )}
              >
                {index + 1 < questions.length ? (
                  <>Next question <ChevronRight className="h-4 w-4" /></>
                ) : (
                  <>Finish {isPre ? "pre-test" : "post-test"} <ClipboardCheck className="h-4 w-4" /></>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
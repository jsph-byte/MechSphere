import React from "react";
import { Link } from "react-router-dom";
import { Check, X, Minus, RotateCcw, ChevronLeft } from "lucide-react";
import { SECTION_LABELS } from "@/components/assessments/AssessmentRunner";
import { cn } from "@/lib/utils";

/** Honest pre → post comparison, computed from stored results. */
export function ScoreComparison({ pre, post }) {
  const dScore = post.score - pre.score;
  const dPct = post.pct - pre.pct;
  return (
    <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-5">
      <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">
        Pre-test → Post-test comparison
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Pre-test</div>
          <div className="mt-0.5 font-mono text-sm font-semibold">
            {pre.score}/{pre.total} — {pre.pct.toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Post-test</div>
          <div className="mt-0.5 font-mono text-sm font-semibold">
            {post.score}/{post.total} — {post.pct.toFixed(1)}%
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium">
        {dScore > 0
          ? `You answered ${dScore} more question${dScore === 1 ? "" : "s"} correctly on the post-test (+${dPct.toFixed(1)} percentage points).`
          : dScore === 0
            ? "Your post-test score matched your pre-test score — no change measured."
            : `Your post-test score was lower by ${-dScore} question${dScore === -1 ? "" : "s"} (−${Math.abs(dPct).toFixed(1)} percentage points) — reported exactly as measured.`}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        This comparison is evidence of how your assessment performance changed between the two tests — it is not
        definitive proof of mastery. Return to the simulation to explore any topic that felt difficult.
      </p>
    </div>
  );
}

/** Post-submission results: score, sections, comparison, and full answer review. */
export default function AssessmentResults({ meta, testType, result, questions, pre, post, onRetake }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-heading text-xl font-bold">
            {meta.title} — {testType === "pre" ? "Pre-Test" : "Post-Test"} results
          </h2>
          <div className="font-mono text-3xl font-bold tabular-nums text-orange-400">
            {result.score}
            <span className="text-base text-muted-foreground">/{result.total}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {result.pct.toFixed(1)}% · {result.score} correct · {result.total - result.score} incorrect
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">
          Performance by section
        </h3>
        <div className="space-y-2.5">
          {["fundamentals", "application", "analysis"].map((key) => {
            const sec = result.sections[key] || { correct: 0, total: 0 };
            const pct = sec.total ? (100 * sec.correct) / sec.total : 0;
            return (
              <div key={key}>
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">{SECTION_LABELS[key]}</span>
                  <span className="font-mono">
                    {sec.correct}/{sec.total}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-cyan-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {pre && post && <ScoreComparison pre={pre} post={post} />}

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">Answer review</h3>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const given = result.answers[i];
            const unanswered = given === null || given === undefined;
            const ok = given === q.correct;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-3",
                  unanswered
                    ? "border-orange-500/40 bg-orange-500/5"
                    : ok
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-destructive/30 bg-destructive/5"
                )}
              >
                <div className="flex items-start gap-2 text-sm font-medium">
                  {unanswered ? (
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  ) : ok ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}
                  <span>
                    Q{i + 1}. {q.question}
                  </span>
                </div>
                <div className="mt-1.5 pl-6 text-xs leading-relaxed">
                  {unanswered ? (
                    <div className="font-semibold text-orange-400">Unanswered — counted as incorrect.</div>
                  ) : (
                    <div className={ok ? "text-emerald-400" : "text-destructive"}>
                      Your answer: “{q.options[given]}”
                      {!ok && <> — correct answer: “{q.options[q.correct]}”</>}
                    </div>
                  )}
                  {ok && !unanswered && <div className="text-emerald-400">Correct.</div>}
                  <div className="mt-1 text-muted-foreground">
                    <span className="font-semibold text-foreground">Understand: </span>
                    {q.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          to={meta.route}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to the simulation
        </Link>
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-ring hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" /> Retake this test
        </button>
      </div>
    </div>
  );
}
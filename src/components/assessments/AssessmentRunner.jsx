import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, RotateCcw } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const SECTION_LABELS = {
  fundamentals: "Fundamentals",
  application: "Application",
  analysis: "Prediction & Analysis",
};

/**
 * One-question-per-screen assessment runner.
 * Four options, Previous/Next, autosaved draft (resumable), confirmation
 * before submitting incomplete work, and NO correct answers or
 * explanations revealed before submission.
 */
export default function AssessmentRunner({ experimentId, testType, questions, onFinish }) {
  const { progress, saveAssessmentDraft, clearAssessmentDraft } = useProgress();
  const total = questions.length;
  const draft = progress.assessments?.[experimentId]?.[testType]?.draft;

  const [answers, setAnswers] = useState(() =>
    Array.from({ length: total }, (_, i) => (draft?.answers && i < draft.answers.length ? draft.answers[i] : null))
  );
  const [resumed, setResumed] = useState(() => (draft?.answers || []).some((a) => a !== null));
  const [index, setIndex] = useState(() => {
    const saved = draft?.answers;
    if (!saved || !saved.length) return 0;
    const firstEmpty = saved.findIndex((a) => a === null || a === undefined);
    return firstEmpty === -1 ? total - 1 : firstEmpty;
  });
  const [confirming, setConfirming] = useState(false);

  const answeredCount = answers.filter((a) => a !== null).length;

  const updateAnswers = (idx, value) => {
    const next = answers.slice();
    next[idx] = value;
    setAnswers(next);
    saveAssessmentDraft(experimentId, testType, next);
  };

  // Keyboard: 1–4 to answer, arrow keys to navigate.
  useEffect(() => {
    const onKey = (e) => {
      if (confirming) return;
      if (["1", "2", "3", "4"].includes(e.key)) updateAnswers(index, Number(e.key) - 1);
      else if (e.key === "ArrowRight" && index < total - 1) setIndex(index + 1);
      else if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const finalize = () => {
    let score = 0;
    const sections = {};
    questions.forEach((q, i) => {
      const sec = sections[q.section] || { correct: 0, total: 0 };
      const ok = answers[i] === q.correct;
      if (ok) {
        score += 1;
        sec.correct += 1;
      }
      sec.total += 1;
      sections[q.section] = sec;
    });
    onFinish({ answers: answers.slice(), score, total, pct: (100 * score) / total, sections, at: Date.now() });
  };

  const startOver = () => {
    setAnswers(Array(total).fill(null));
    setIndex(0);
    setResumed(false);
    clearAssessmentDraft(experimentId, testType);
  };

  const q = questions[index];

  return (
    <div className="space-y-4">
      {resumed && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-500/30 bg-orange-500/5 px-4 py-3 text-xs">
          <span className="font-medium text-orange-300">
            Resumed your saved progress — {answeredCount} of {total} answered.
          </span>
          <button
            onClick={startOver}
            className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Start over
          </button>
        </div>
      )}

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
          <span className="font-heading uppercase tracking-wider text-muted-foreground">
            Question {index + 1} of {total}
          </span>
          <span className="font-mono text-muted-foreground">
            {answeredCount}/{total} answered
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${(100 * answeredCount) / total}%` }} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          {SECTION_LABELS[q.section] || q.section}
        </div>
        <p className="text-base font-medium leading-relaxed md:text-lg">{q.question}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => updateAnswers(index, i)}
              aria-pressed={answers[index] === i}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                answers[index] === i
                  ? "border-orange-500 bg-orange-500/15 text-orange-300"
                  : "border-border bg-background text-foreground hover:border-ring"
              )}
            >
              <span
                className={cn(
                  "hidden h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs sm:inline-flex",
                  answers[index] === i ? "border-orange-500/50 text-orange-300" : "border-border text-muted-foreground"
                )}
              >
                {i + 1}
              </span>
              {opt}
            </button>
          ))}
        </div>
        <p className="mt-3 hidden text-[11px] text-muted-foreground sm:block">
          Keyboard: press <span className="font-mono">1–4</span> to answer, <span className="font-mono">←</span>/<span className="font-mono">→</span> to move between questions.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        {index < total - 1 ? (
          <button
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => (answeredCount < total ? setConfirming(true) : finalize())}
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Submit test
          </button>
        )}
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-xl">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
              <div>
                <h3 className="font-heading text-sm font-bold">Submit with unanswered questions?</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  You still have {total - answeredCount} unanswered question{total - answeredCount === 1 ? "" : "s"}. Unanswered questions are
                  counted as incorrect and highlighted in your review.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:border-ring"
              >
                Go back
              </button>
              <button onClick={finalize} className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
                Submit anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
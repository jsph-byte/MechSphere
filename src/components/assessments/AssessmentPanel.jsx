import React from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, ChevronRight } from "lucide-react";
import { ASSESSMENTS } from "@/data/assessments";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * Pre/post assessment status card embedded at the bottom of an experiment page.
 * Shows drafts in progress, latest/best scores, attempts, and the honest
 * pre→post comparison once both tests exist.
 */
export default function AssessmentPanel({ experimentId }) {
  const { progress, storageFailed } = useProgress();
  const meta = ASSESSMENTS[experimentId];
  if (!meta) return null;

  const st = progress.assessments?.[experimentId] || {};
  const pre = st.pre?.latest;
  const post = st.post?.latest;

  const row = (type, name, hint) => {
    const t = st[type] || {};
    const draft = t.draft;
    const latest = t.latest;
    const answered = draft?.answers?.filter((a) => a !== null).length ?? 0;
    const status = latest
      ? `Last: ${latest.score}/15 · Best: ${t.bestScore}/15 · ${t.attempts || 1} attempt${(t.attempts || 1) === 1 ? "" : "s"}`
      : draft
        ? `In progress — ${answered}/15 answered`
        : "Not taken yet";
    return (
      <div key={type} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3">
        <div>
          <div className="text-sm font-semibold">
            {name} <span className="ml-1 text-[11px] font-normal text-muted-foreground">{hint}</span>
          </div>
          <div className={cn("text-xs", latest ? "text-cyan-400" : "text-muted-foreground")}>{status}</div>
        </div>
        <Link
          to={`/lab/assessment/${experimentId}/${type}`}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300 transition-colors hover:bg-orange-500/20"
        >
          {draft && !latest ? "Resume" : latest ? "Retake" : "Take"}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center gap-2">
        <ClipboardCheck className="h-4 w-4 text-cyan-400" />
        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">Test yourself</h2>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Each test has exactly 15 questions — fundamentals, application, and prediction &amp; analysis. Your pre-test
        score never blocks the simulation: use it to predict, then compare with the post-test.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {row("pre", "Pre-test", "before you experiment")}
        {row("post", "Post-test", "after you experiment")}
      </div>
      {pre && post && (
        <p className="mt-3 text-xs font-medium text-muted-foreground">
          Pre-test {pre.score}/15 ({pre.pct.toFixed(1)}%) → Post-test {post.score}/15 ({post.pct.toFixed(1)}%):{" "}
          <span className={post.score >= pre.score ? "text-emerald-400" : "text-destructive"}>
            {post.score === pre.score
              ? "no change measured"
              : `${post.score > pre.score ? "+" : "−"}${Math.abs(post.score - pre.score)} question${Math.abs(post.score - pre.score) === 1 ? "" : "s"}, ${post.pct - pre.pct >= 0 ? "+" : "−"}${Math.abs(post.pct - pre.pct).toFixed(1)} percentage points`}
          </span>
        </p>
      )}
      {storageFailed && (
        <p className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-2.5 text-xs font-medium text-destructive">
          Saving failed — this browser is blocking local storage, so your test progress cannot be kept after you leave.
        </p>
      )}
    </section>
  );
}
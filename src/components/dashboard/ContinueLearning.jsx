import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { ASSESSMENTS } from "@/data/assessments";
import { useProgress } from "@/lib/progress";

/**
 * "Continue learning" section for the Dashboard. Every item is derived from
 * the user's real saved progress — nothing is suggested that doesn't exist
 * and nothing is fabricated.
 */
export default function ContinueLearning() {
  const { progress } = useProgress();
  const items = [];

  // 1. Unfinished pre/post tests (drafts with answers saved).
  for (const [id, t] of Object.entries(progress.assessments || {})) {
    const meta = ASSESSMENTS[id];
    if (!meta) continue;
    for (const type of ["pre", "post"]) {
      const d = t?.[type]?.draft;
      if (d && !t?.[type]?.latest) {
        const n = (d.answers || []).filter((a) => a !== null).length;
        items.push({
          key: `${id}-${type}-draft`,
          label: `Resume the ${type}-test for ${meta.title}`,
          sub: `${n} of 15 questions answered — saved automatically`,
          to: `/lab/assessment/${id}/${type}`,
        });
      }
    }
  }

  // 2. Experiments with an unfinished learning cycle, most recent first.
  const runIds = Object.entries(progress.experiments || {})
    .sort((a, b) => (b[1].lastAt || 0) - (a[1].lastAt || 0))
    .map(([id]) => id);
  for (const id of runIds) {
    const meta = ASSESSMENTS[id];
    if (!meta) continue;
    const t = progress.assessments?.[id] || {};
    if (!t.pre?.latest) {
      if (!t.pre?.draft) {
        items.push({
          key: `${id}-pre`,
          label: `Take the pre-test for ${meta.title}`,
          sub: "You ran the experiment — complete the learning cycle",
          to: `/lab/assessment/${id}/pre`,
        });
      }
    } else if (!t.post?.latest) {
      items.push({
        key: `${id}-post`,
        label: `Ready for review: take the post-test for ${meta.title}`,
        sub: `Pre-test score: ${t.pre.latest.score}/${t.pre.latest.total} — see how much you learned`,
        to: `/lab/assessment/${id}/post`,
      });
    }
  }

  // 3. Suggested next activity: an experiment never run yet (registry order).
  for (const [id, meta] of Object.entries(ASSESSMENTS)) {
    if (progress.experiments?.[id]) continue;
    items.push({
      key: `${id}-new`,
      label: `Try a new experiment: ${meta.title}`,
      sub: "Not visited yet — a fresh one from the lab catalog",
      to: meta.route,
    });
    break;
  }

  const list = items.slice(0, 4);
  if (list.length === 0) return null;

  return (
    <section className="rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/[0.06] to-transparent p-5">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="h-4 w-4 text-orange-400" />
        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-orange-400">Continue learning</h2>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {list.map((it) => (
          <Link
            key={it.key}
            to={it.to}
            className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-orange-500/50"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{it.label}</div>
              <div className="truncate text-xs text-muted-foreground">{it.sub}</div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-orange-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}
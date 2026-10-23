import React, { useState } from "react";
import { Play, Lightbulb, Orbit, Layers, Ruler, Trophy, Check, Lock, AlertTriangle, ClipboardCheck, Repeat, TrendingUp, Compass } from "lucide-react";
import { ACHIEVEMENTS, useProgress } from "@/lib/progress";
import { ASSESSMENTS } from "@/data/assessments";
import { TOPICS } from "@/data/questions";
import { cn } from "@/lib/utils";

const ICONS = { Play, Lightbulb, Orbit, Layers, Ruler, Trophy, ClipboardCheck, Repeat, TrendingUp, Compass };

function StatTile({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-2xl font-bold text-cyan-400 tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

export default function MyProgress() {
  const { progress, resetProgress } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const { experiments, predictions, challenges, conversions, comparisons } = progress;
  const expCount = Object.values(experiments).reduce((s, e) => s + e.count, 0);
  const pct = (a, b) => (b > 0 ? `${Math.round((a / b) * 100)}%` : "—");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">My Progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All progress is anonymous and stored locally in this browser only — it never leaves your device and does not sync across devices or browsers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Experiments run" value={expCount} sub={`${Object.keys(experiments).length} different experiments`} />
        <StatTile label="Predictions submitted" value={predictions.total} sub={predictions.total ? `${pct(predictions.correct, predictions.total)} correct` : "none yet"} />
        <StatTile label="Challenge answers" value={challenges.answered} sub={challenges.answered ? `${pct(challenges.correct, challenges.answered)} correct` : "none yet"} />
        <StatTile label="Unit conversions" value={conversions} sub={`${comparisons} material comparison${comparisons === 1 ? "" : "s"}`} />
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Topic performance</h2>
        {Object.keys(challenges.topics).length === 0 ? (
          <p className="text-sm text-muted-foreground">Answer Engineering Challenge questions to build a topic-by-topic picture of your strengths.</p>
        ) : (
          <div className="space-y-2.5">
            {Object.entries(challenges.topics).map(([id, t]) => {
              const label = TOPICS.find((x) => x.id === id)?.label || id;
              const p = Math.round((t.correct / t.total) * 100);
              return (
                <div key={id}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="font-mono text-muted-foreground">{t.correct}/{t.total} · {p}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className={cn("h-full rounded-full transition-all", p >= 70 ? "bg-emerald-500" : p >= 40 ? "bg-amber-500" : "bg-destructive")} style={{ width: `${p}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="pt-1 text-[11px] text-muted-foreground">
              Best correct-answer streak: <span className="font-mono text-orange-400">{challenges.bestStreak}</span>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Achievements</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const earned = !!progress.achievements[a.id];
            const Icon = ICONS[a.icon] || Trophy;
            return (
              <div key={a.id} className={cn("flex items-start gap-3 rounded-lg border p-3.5", earned ? "border-orange-500/40 bg-orange-500/[0.07]" : "border-border bg-background opacity-60")}>
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", earned ? "bg-orange-500/20 text-orange-400" : "bg-secondary text-muted-foreground")}>
                  {earned ? <Icon className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    {earned && <Check className="h-3.5 w-3.5 text-orange-400" />}
                    {a.name}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{a.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">Achievements unlock only when their conditions are genuinely met — nothing here is pre-earned or fabricated.</p>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Learning history by experiment</h2>
        <p className="mb-3 text-[11px] text-muted-foreground">
          Pre-test and post-test status per experiment — latest score, best score, attempts, and the honest
          change between your pre-test and post-test. “—” means not taken yet.
        </p>
        {Object.entries(ASSESSMENTS).every(([id]) => {
          const t = progress.assessments?.[id];
          return !(t?.pre?.latest || t?.post?.latest || progress.experiments?.[id]);
        }) ? (
          <p className="text-sm text-muted-foreground">Run an experiment or take a test to start building your learning history.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(ASSESSMENTS).map(([id, meta]) => {
              const t = progress.assessments?.[id] || {};
              const runs = progress.experiments?.[id];
              if (!(t.pre?.latest || t.post?.latest || runs)) return null;
              const cell = (type) => {
                const x = t[type];
                if (!x?.latest) return <span className="text-muted-foreground">—</span>;
                return (
                  <span className="font-mono tabular-nums">
                    {x.latest.score}/{x.latest.total}
                    <span className="block text-[10px] text-muted-foreground">
                      best {x.bestScore} · {(x.attempts || 1)}×
                    </span>
                  </span>
                );
              };
              const pre = t.pre?.latest, post = t.post?.latest;
              const delta = pre && post ? post.score - pre.score : null;
              return (
                <div key={id} className="rounded-lg border border-border bg-background px-3 py-2.5">
                  <div className="grid grid-cols-2 items-center gap-2 sm:grid-cols-[1fr_auto_auto_auto_auto] sm:gap-4 sm:text-sm">
                    <div className="text-sm font-semibold">{meta.title}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {runs ? `${runs.count} run${runs.count === 1 ? "" : "s"}` : "not run"}
                    </div>
                    <div className="text-xs">
                      <span className="mr-1 text-[10px] uppercase text-muted-foreground">pre</span>
                      {cell("pre")}
                    </div>
                    <div className="text-xs">
                      <span className="mr-1 text-[10px] uppercase text-muted-foreground">post</span>
                      {cell("post")}
                    </div>
                    <div className="text-xs">
                      {delta === null ? (
                        <span className="text-muted-foreground">—</span>
                      ) : delta > 0 ? (
                        <span className="font-mono font-semibold text-emerald-400">+{delta}</span>
                      ) : delta < 0 ? (
                        <span className="font-mono font-semibold text-destructive">{delta}</span>
                      ) : (
                        <span className="font-mono font-semibold text-muted-foreground">±0</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent activity</h2>
        {progress.recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing yet — your latest actions across the app will appear here.</p>
        ) : (
          <ul className="space-y-1.5">
            {progress.recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-xs">
                <span className="text-foreground">{r.label}</span>
                <span className="shrink-0 font-mono text-muted-foreground">{new Date(r.at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
        <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-destructive">
          <AlertTriangle className="h-4 w-4" /> Reset progress
        </h2>
        <p className="mt-1.5 text-xs text-muted-foreground">Permanently erases all local progress, achievements, and history on this device. This cannot be undone.</p>
        {!confirming ? (
          <button onClick={() => setConfirming(true)} className="mt-3 rounded-lg border border-destructive/50 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
            Reset all progress…
          </button>
        ) : (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-medium text-foreground">Type <span className="font-mono text-destructive">RESET</span> to confirm:</div>
            <div className="flex gap-2">
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                aria-label="Type RESET to confirm"
                className="w-32 rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                disabled={confirmText !== "RESET"}
                onClick={() => { resetProgress(); setConfirming(false); setConfirmText(""); }}
                className="rounded-lg bg-destructive px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Erase everything
              </button>
              <button onClick={() => { setConfirming(false); setConfirmText(""); }} className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FlaskConical, Layers, Wrench, Trophy, ArrowRight, Lightbulb, Check, X, Award, ChevronRight, BookOpen,
} from "lucide-react";
import { QUESTIONS, TOPICS } from "@/data/questions";
import { FACTS } from "@/data/facts";
import { todayIndex } from "@/lib/format";
import { ACHIEVEMENTS, useProgress } from "@/lib/progress";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import { cn } from "@/lib/utils";

const MODULES = [
  { to: "/lab", label: "Experiment Lab", desc: "20 interactive engineering simulations", icon: FlaskConical, accent: "text-orange-400" },
  { to: "/materials", label: "Material Explorer", desc: "Referenced property library & comparison", icon: Layers, accent: "text-cyan-400" },
  { to: "/toolkit", label: "Engineering Toolkit", desc: "Units, dimensions & constants", icon: Wrench, accent: "text-orange-400" },
  { to: "/challenge", label: "Engineering Challenge", desc: "Curated practice questions", icon: Trophy, accent: "text-cyan-400" },
];

const EXPERIMENT_LABELS = {
  projectile: "Projectile Motion", pendulum: "Simple Pendulum", incline: "Inclined Plane",
  gas: "Ideal Gas Explorer", heat: "Specific Heat",
};

function DailyChallenge() {
  const { recordChallengeAnswer } = useProgress();
  const q = useMemo(() => {
    const mcqs = QUESTIONS.filter((x) => x.type === "mcq");
    return mcqs[todayIndex(mcqs.length)];
  }, []);
  const [picked, setPicked] = useState(null);
  const topic = TOPICS.find((t) => t.id === q.topic);

  return (
    <section className="rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/[0.08] to-transparent p-5">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-orange-400" />
        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-orange-400">Daily engineering challenge</h2>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{q.difficulty}</span>
      </div>
      <p className="mt-2.5 text-sm font-medium leading-relaxed">{q.question}</p>
      {picked === null ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => { setPicked(i); recordChallengeAnswer({ topic: q.topic, difficulty: q.difficulty, correct: i === q.answer, streak: i === q.answer ? 1 : 0, question: q.question, givenAnswer: opt }); }}
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-orange-500/60">
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-2.5">
          <div className={cn("flex items-start gap-2 rounded-lg border p-3 text-sm font-medium", picked === q.answer ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-destructive/40 bg-destructive/10 text-destructive")}>
            {picked === q.answer ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
            Correct answer: {q.options[q.answer]}
          </div>
          <div className="rounded-lg border border-border bg-card p-3 text-xs leading-relaxed text-muted-foreground">{q.explanation}</div>
          <Link to="/challenge" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline">
            <BookOpen className="h-3.5 w-3.5" /> More practice in {topic?.label}
          </Link>
        </div>
      )}
    </section>
  );
}

export default function Dashboard() {
  const { progress } = useProgress();
  const fact = FACTS[todayIndex(FACTS.length)];
  const firstUse = progress.recent.length === 0 && Object.keys(progress.experiments).length === 0;
  const expCount = Object.values(progress.experiments).reduce((s, e) => s + e.count, 0);
  const earnedCount = Object.keys(progress.achievements).length;
  const recentExperiments = progress.recent.filter((r) => r.type === "experiment").slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-cyan-500/[0.06] p-6 md:p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400">Explore · Experiment · Engineer</div>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Welcome to <span className="text-orange-400">MechSphere</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          An interactive workshop for mechanical engineering fundamentals. Commit to a prediction, run the experiment, and see the math agree — or disagree — with your intuition.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link to="/lab" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-600">
            <FlaskConical className="h-5 w-5" /> Start Experiment
          </Link>
          <Link to="/challenge" className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            Quick challenge <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* First-use state OR progress summary */}
      {firstUse ? (
        <section className="rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/[0.04] p-5">
          <h2 className="font-heading text-sm font-bold text-cyan-400">New here? The MechSphere loop is:</h2>
          <ol className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="rounded-lg border border-border bg-card p-3"><span className="font-semibold text-orange-400">1. Predict</span> — commit to an answer before running anything.</li>
            <li className="rounded-lg border border-border bg-card p-3"><span className="font-semibold text-orange-400">2. Experiment</span> — adjust sliders and watch live, accurate physics.</li>
            <li className="rounded-lg border border-border bg-card p-3"><span className="font-semibold text-orange-400">3. Compare</span> — see your prediction against the computed result.</li>
            <li className="rounded-lg border border-border bg-card p-3"><span className="font-semibold text-orange-400">4. Understand</span> — read why the relationship behaves that way.</li>
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">Start with Projectile Motion — it's the classic. Your progress will build here as you go.</p>
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Experiments run", value: expCount },
            { label: "Predictions made", value: progress.predictions.total },
            { label: "Challenge answers", value: progress.challenges.answered },
            { label: "Achievements", value: `${earnedCount}/${ACHIEVEMENTS.length}` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-mono text-xl font-bold text-cyan-400 tabular-nums">{s.value}</div>
            </div>
          ))}
        </section>
      )}

      <ContinueLearning />

      {/* Module cards */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m) => (
          <Link key={m.to} to={m.to} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-orange-500/50">
            <m.icon className={`h-6 w-6 ${m.accent}`} />
            <div className="mt-3 font-heading text-sm font-bold">{m.label}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
              Open <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <DailyChallenge />

        <div className="space-y-4">
          {/* Fact of the day */}
          <section className="rounded-xl border border-cyan-500/25 bg-cyan-500/[0.05] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Lightbulb className="h-4 w-4" /> Engineering fact of the day
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact}</p>
          </section>

          {/* Recently used experiments */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recently used experiments</h2>
            {recentExperiments.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {firstUse ? "None yet — launch one from the Experiment Lab." : "No experiments yet — the Lab is one tap away."}
              </p>
            ) : (
              <ul className="mt-2.5 space-y-1.5">
                {recentExperiments.map((r, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <span>{r.label.replace("Ran ", "")}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{new Date(r.at).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/lab" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline">
              <FlaskConical className="h-3.5 w-3.5" /> Open the Experiment Lab
            </Link>
          </section>

          {/* Achievements preview */}
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Award className="h-4 w-4 text-orange-400" /> Achievements
              </h2>
              <Link to="/progress" className="text-[11px] font-semibold text-cyan-400 hover:underline">View all</Link>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {ACHIEVEMENTS.map((a) => {
                const earned = !!progress.achievements[a.id];
                return (
                  <span key={a.id} className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-semibold",
                    earned ? "border-orange-500/40 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground"
                  )}>
                    {earned ? "★" : "·"} {a.name}
                  </span>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {earnedCount === 0 ? "None earned yet — run your first experiment to unlock one." : `${earnedCount} of ${ACHIEVEMENTS.length} earned on this device.`}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
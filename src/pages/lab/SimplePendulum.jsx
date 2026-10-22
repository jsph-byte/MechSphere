import React, { useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import PendulumViz from "@/components/experiments/PendulumViz";
import { pendulum } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

const DEFAULTS = { length: 1.0, angleDeg: 20 };

export default function SimplePendulum() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const res = pendulum(s);
  const set = (k) => (v) => setS((p) => ({ ...p, [k]: v }));
  const largeAngle = res.valid && s.angleDeg > 15;

  // Auto-updating sweep: period across the slider's length range (g = 9.81 m/s²).
  const chartData = sweep(0.1, 2.5, 40, (L) => ({ T: 2 * Math.PI * Math.sqrt(L / 9.81) }));

  return (
    <ExperimentShell
      title="Simple Pendulum"
      tagline="T = 2π·√(L/g) — small-angle approximation"
      intro="A pendulum stores energy by trading height for speed. Its period depends on just two things: the length of the string and gravity — not the mass of the bob, and (approximately) not how far you release it."
      assumptions={[
        "The string is massless and does not stretch.",
        "The bob is a point mass; air resistance is ignored.",
        "The formula T = 2π·√(L/g) is a small-angle approximation — most accurate below ~15°.",
        "At larger angles the true period is longer than this formula predicts.",
        "g = 9.81 m/s² (Earth).",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          For small swings, the restoring force is nearly proportional to the displacement — the condition for simple harmonic motion — giving <span className="font-mono text-cyan-400">T = 2π·√(L/g)</span>. Notice what is missing: mass cancels because gravity's pull and the bob's inertia both grow with m, and amplitude drops out of the small-angle formula. Longer pendulums run slower: quadrupling the length doubles the period.
        </p>
      }
      predict={{
        experimentId: "pendulum",
        label: "Simple Pendulum",
        question: "If you quadruple the pendulum length, what happens to its period?",
        options: ["It stays the same", "It doubles", "It quadruples", "It halves"],
        correctIndex: 1,
        explanation: "T ∝ √L, so L × 4 gives T × 2. To double a pendulum clock's tick you need four times the length.",
        computeComparison: () => {
          const a = pendulum({ ...s });
          const b = pendulum({ ...s, length: s.length * 4 });
          return {
            beforeLabel: `Current: L = ${fmt(s.length)} m`, before: `T ≈ ${fmt(a.T)} s`,
            afterLabel: `Quadrupled: L = ${fmt(s.length * 4)} m`, after: `T ≈ ${fmt(b.T)} s`,
          };
        },
      }}
    >
      <PendulumViz
        length={res.valid ? s.length : 1}
        angleDeg={s.angleDeg}
        period={res.valid ? res.T : 1}
        onPlayStarted={() => recordExperiment("pendulum", "Ran Simple Pendulum")}
      />
      <ErrorList errors={res.errors} />

      {largeAngle && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs font-medium text-amber-500">
          You released from {fmt(s.angleDeg, 3)}°. The displayed period uses the small-angle formula, which underestimates the true period at large angles (≈7% short at 30°, ≈18% short at 60°).
        </div>
      )}

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
        <ControlSlider label="Pendulum length L" value={s.length} onChange={set("length")} min={0.1} max={2.5} step={0.05} unit="m" error={res.errors?.length} />
        <ControlSlider label="Release angle θ₀" value={s.angleDeg} onChange={set("angleDeg")} min={1} max={60} step={1} unit="°" error={res.errors?.angleDeg} help="Keep below ~15° for the small-angle formula to be accurate." />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="Period T (approx.)" value={res.valid ? fmt(res.T) : "—"} unit="s" accent="orange" />
        <Stat label="Frequency f = 1/T" value={res.valid ? fmt(1 / res.T) : "—"} unit="Hz" accent="cyan" />
        <Stat label="Length L" value={res.valid ? fmt(s.length) : "—"} unit="m" />
      </div>

      <ExperimentChart
        title="Period vs length — updates with your inputs"
        note="The model curve T = 2π·√(L/g) at g = 9.81 m/s², swept across the slider range. The dashed marker is your current length; in the small-angle model the curve does not depend on mass or release angle."
        xLabel="Length L (m)"
        xMarker={Number.isFinite(s.length) ? s.length : undefined}
        data={chartData}
        series={[{ key: "T", name: "Period T (s)", color: "#f97316" }]}
      />

      <p className="text-xs leading-relaxed text-muted-foreground">
        Qualitative motion: the bob is momentarily at rest at the release angle, moves fastest at the bottom of the swing, and rises to the same height on the other side (ideal model). The animation uses θ(t) = θ₀·cos(2πt/T) — the small-angle solution.
      </p>
    </ExperimentShell>
  );
}
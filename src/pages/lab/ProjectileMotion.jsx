import React, { useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import TrajectoryViz from "@/components/experiments/TrajectoryViz";
import { projectile } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

const DEFAULTS = { v0: 15, angleDeg: 45, g: 9.81 };

export default function ProjectileMotion() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const res = projectile(s);
  const set = (k) => (v) => setS((p) => ({ ...p, [k]: v }));

  // Auto-updating sweep: range & height across all angles at the current speed & gravity.
  const v0c = Number.isFinite(s.v0) && s.v0 > 0 ? s.v0 : 15;
  const gc = Number.isFinite(s.g) && s.g > 0 ? s.g : 9.81;
  const chartData = sweep(0, 90, 45, (angle) => {
    const r = projectile({ v0: v0c, angleDeg: angle, g: gc });
    return r.valid ? { R: r.R, H: r.H } : null;
  });

  return (
    <ExperimentShell
      title="Projectile Motion"
      tagline="vx = v₀·cos θ · vy = v₀·sin θ · t = 2v₀·sin θ / g"
      intro="A projectile's motion splits into two independent parts: constant-velocity horizontal motion and uniformly accelerated vertical motion. Adjust the launch and watch how range, height, and flight time respond — instantly and live."
      assumptions={[
        "No air resistance — the only force is gravity.",
        "Launch and landing heights are equal (level ground).",
        "Gravity is constant in magnitude and direction over the flight.",
        "The projectile is a point mass (no spin or rotation).",
        "Angles in degrees, speeds in m/s, g in m/s² (default 9.81 m/s², Earth).",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Gravity acts only vertically, so the horizontal velocity <span className="font-mono text-cyan-400">vx = v₀·cos θ</span> never changes, while the vertical velocity changes by 9.81 m/s every second. Because range is <span className="font-mono text-cyan-400">R = v₀²·sin(2θ)/g</span>, it grows with the <em>square</em> of speed and peaks at θ = 45° — where sin(2θ) = 1. Height depends only on the vertical component: <span className="font-mono text-cyan-400">H = v₀²·sin²θ/(2g)</span>.
        </p>
      }
      predict={{
        experimentId: "projectile",
        label: "Projectile Motion",
        question: "If you double the initial speed (same angle), what happens to the horizontal range?",
        options: ["It stays the same", "It doubles", "It triples", "It quadruples"],
        correctIndex: 3,
        explanation: "Range scales with v₀², so doubling speed multiplies range by 4. This is why small launch-speed improvements have outsized effects on distance.",
        computeComparison: () => {
          const a = projectile(s);
          const b = projectile({ ...s, v0: s.v0 * 2 });
          return {
            beforeLabel: `Current: v₀ = ${fmt(s.v0, 3)} m/s`, before: `R = ${fmt(a.R)} m`,
            afterLabel: `Doubled: v₀ = ${fmt(s.v0 * 2, 3)} m/s`, after: `R = ${fmt(b.R)} m`,
          };
        },
      }}
    >
      <TrajectoryViz res={res} onPlayStarted={() => recordExperiment("projectile", "Ran Projectile Motion")} />

      <ErrorList errors={res.errors} />

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        <ControlSlider label="Initial velocity v₀" value={s.v0} onChange={set("v0")} min={1} max={60} step={0.5} unit="m/s" error={res.errors?.v0} />
        <ControlSlider label="Launch angle θ" value={s.angleDeg} onChange={set("angleDeg")} min={0} max={90} step={1} unit="°" error={res.errors?.angleDeg} />
        <ControlSlider
          label="Gravity g" value={s.g} onChange={set("g")} min={1.6} max={24.8} step={0.01} unit="m/s²"
          error={res.errors?.g}
          help="Earth ≈ 9.81 · Moon ≈ 1.62 · Jupiter ≈ 24.79"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="Horizontal range R" value={res.valid ? fmt(res.R) : "—"} unit="m" accent="orange" />
        <Stat label="Max height H" value={res.valid ? fmt(res.H) : "—"} unit="m" accent="cyan" />
        <Stat label="Flight time t" value={res.valid ? fmt(res.t) : "—"} unit="s" />
        <Stat label="Horizontal velocity vx" value={res.valid ? fmt(res.vx) : "—"} unit="m/s" />
        <Stat label="Initial vertical velocity vy₀" value={res.valid ? fmt(res.vy0) : "—"} unit="m/s" />
        <Stat label="Launch speed v₀" value={res.valid ? fmt(s.v0) : "—"} unit="m/s" />
      </div>

      <ExperimentChart
        title="Range & height vs launch angle — updates with your inputs"
        note={`Model curve swept at your current v₀ = ${fmt(v0c)} m/s and g = ${fmt(gc)} m/s². Range R = v₀²·sin(2θ)/g peaks at 45°; the dashed marker is your current launch angle.`}
        xLabel="Launch angle θ (°)"
        xMarker={Number.isFinite(s.angleDeg) ? s.angleDeg : undefined}
        data={chartData}
        series={[
          { key: "R", name: "Range R (m)", color: "#f97316" },
          { key: "H", name: "Max height H (m)", color: "#22d3ee" },
        ]}
      />
    </ExperimentShell>
  );
}
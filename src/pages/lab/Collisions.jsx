import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { collision } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import { cn } from "@/lib/utils";

const DEFAULTS = { type: "elastic", m1: 2, m2: 4, u1: 5, u2: -1 };
const TYPES = [
  { id: "elastic", label: "Elastic (bounce)" },
  { id: "inelastic", label: "Perfectly inelastic (stick)" },
];

/** Two carts on a track: before (top lane) and after (bottom lane). */
function CollisionViz({ res, s }) {
  const cart = (x, w, y, cls, label) => (
    <g>
      <rect x={x - w / 2} y={y} width={w} height="22" rx="4" fill="currentColor" className={cls} opacity="0.8" />
      <text x={x} y={y + 15} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{label}</text>
    </g>
  );
  const arrow = (x, y, v, label) => (
    <g>
      <line x1={x} y1={y} x2={x + Math.sign(v || 1) * 34} y2={y} stroke="currentColor" className="text-cyan-400" strokeWidth="2" />
      <polygon points={`${x + Math.sign(v || 1) * 40},${y} ${x + Math.sign(v || 1) * 32},${y - 4} ${x + Math.sign(v || 1) * 32},${y + 4}`} fill="currentColor" className="text-cyan-400" />
      <text x={x + Math.sign(v || 1) * 20} y={y - 8} textAnchor="middle" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">{label}</text>
    </g>
  );
  const w1 = 24 + Math.min(30, s.m1 * 2);
  const w2 = 24 + Math.min(30, s.m2 * 2);
  return (
    <svg viewBox="0 0 420 170" className="w-full" role="img" aria-label="Collision before and after">
      <line x1="16" y1="62" x2="404" y2="62" stroke="currentColor" className="text-border" strokeWidth="3" />
      <line x1="16" y1="140" x2="404" y2="140" stroke="currentColor" className="text-border" strokeWidth="3" />
      <text x="20" y="24" fontSize="10" fontWeight="700" fill="currentColor" className="text-muted-foreground">BEFORE</text>
      <text x="20" y="104" fontSize="10" fontWeight="700" fill="currentColor" className="text-muted-foreground">AFTER</text>
      {cart(140, w1, 40, "text-orange-500", `${fmt(s.m1)} kg`)}
      {cart(290, w2, 40, "text-cyan-500", `${fmt(s.m2)} kg`)}
      {arrow(140 + w1 / 2, 34, s.u1, `u₁ = ${fmt(s.u1, 3)} m/s`)}
      {arrow(290 + w2 / 2, 34, s.u2, `u₂ = ${fmt(s.u2, 3)}`)}
      {res.valid && cart(140, w1, 118, "text-orange-500", `${fmt(s.m1)} kg`)}
      {res.valid && cart(290, w2, 118, "text-cyan-500", `${fmt(s.m2)} kg`)}
      {res.valid && arrow(140 + w1 / 2, 112, res.v1, `v₁' = ${fmt(res.v1, 3)} m/s`)}
      {res.valid && arrow(290 + w2 / 2, 112, res.v2, `v₂' = ${fmt(res.v2, 3)}`)}
    </svg>
  );
}

export default function Collisions() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("collisions", "Ran Collisions & Momentum Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = collision(s);
  const chartData = sweep(0.5, 20, 39, (m2) => {
    const r = collision({ ...s, m2 });
    return r.valid ? { v1: r.v1, v2: r.v2 } : null;
  });

  return (
    <ExperimentShell
      title="Collisions & Momentum"
      tagline="m₁u₁ + m₂u₂ = m₁v₁' + m₂v₂' · elastic: KE also conserved"
      intro="Line up two carts and let them meet. Momentum always survives the crash unchanged; kinetic energy only does if the collision is elastic. Set the masses and speeds and watch which quantity keeps its books balanced."
      assumptions={[
        "Motion is one-dimensional along the track; sign = direction.",
        "No friction with the track during the collision.",
        "Elastic model: no energy lost to heat, sound, or deformation.",
        "Perfectly inelastic model: the carts deform and stick, moving together afterwards.",
        "Real collisions sit between these two extremes (0 < e < 1).",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Momentum conservation is bookkeeping: the internal forces the carts exert on each other are equal and
          opposite (Newton's third law), so whatever one loses the other gains — always. Kinetic energy is
          different: in a sticking collision it drops (energy becomes heat and dents), and only an elastic
          collision keeps it whole. With equal masses in an elastic hit, the carts literally{" "}
          <em>exchange</em> velocities — try m₁ = m₂.
        </p>
      }
      predict={{ experimentId: "collisions", label: "Collisions & Momentum", pre: PREDICTIONS.collisions.pre, post: PREDICTIONS.collisions.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Collision type</div>
        <div className="grid grid-cols-2 gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => { set("type")(t.id); }}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                s.type === t.id ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <VizPanel title="Collision schematic (before → after)">
        <CollisionViz res={res} s={s} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
        <ControlSlider label="Mass 1 m₁" value={s.m1} onChange={set("m1")} min={0.5} max={20} step={0.5} unit="kg" error={res.errors?.m1} />
        <ControlSlider label="Mass 2 m₂" value={s.m2} onChange={set("m2")} min={0.5} max={20} step={0.5} unit="kg" error={res.errors?.m2} />
        <ControlSlider label="Initial speed u₁" value={s.u1} onChange={set("u1")} min={-10} max={10} step={0.5} unit="m/s" error={res.errors?.u1} />
        <ControlSlider label="Initial speed u₂" value={s.u2} onChange={set("u2")} min={-10} max={10} step={0.5} unit="m/s" error={res.errors?.u2} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <Stat label="Final speed v₁'" value={res.valid ? fmt(res.v1) : "—"} unit="m/s" accent="orange" />
        <Stat label="Final speed v₂'" value={res.valid ? fmt(res.v2) : "—"} unit="m/s" accent="cyan" />
        <Stat label="Momentum (always)" value={res.valid ? fmt(res.pTotal) : "—"} unit="kg·m/s" />
        <Stat label="KE initial" value={res.valid ? fmt(res.keInitial) : "—"} unit="J" />
        <Stat label="KE lost to heat/deformation" value={res.valid ? fmt(res.keLost) : "—"} unit="J" accent="orange" />
      </div>

      <ExperimentChart
        title="Final speeds vs mass 2 — updates with your inputs"
        note={`Model curves at your current m₁ = ${fmt(s.m1)} kg, u₁ = ${fmt(s.u1, 3)} m/s, u₂ = ${fmt(s.u2, 3)} m/s (${s.type === "elastic" ? "elastic" : "perfectly inelastic"}). When m₂ equals m₁ in an elastic hit, cart 1 stops dead and hands over all its speed.`}
        xLabel="Mass m₂ (kg)"
        xMarker={Number.isFinite(s.m2) ? s.m2 : undefined}
        data={chartData}
        series={[
          { key: "v1", name: "Final v₁' (m/s)", color: "#f97316" },
          { key: "v2", name: "Final v₂' (m/s)", color: "#22d3ee" },
        ]}
      />
    </ExperimentShell>
  );
}
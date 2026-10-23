import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import BernoulliViz from "@/components/experiments/BernoulliViz";
import { preTest as bernoulliPre, postTest as bernoulliPost } from "@/data/assessments/bernoulli";
import { pipeFlow } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

const DEFAULTS = { d1cm: 12, d2cm: 5, qLps: 20, rho: 1000, p1kPa: 200, dz: 0 };

export default function BernoulliFlow() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const touch = () => {
    if (!touched.current) {
      touched.current = true;
      recordExperiment("bernoulli", "Ran Bernoulli Flow Lab");
    }
  };

  const res = pipeFlow({
    d1: s.d1cm / 100,
    d2: s.d2cm / 100,
    flowRate: s.qLps / 1000,
    rho: s.rho,
    p1: s.p1kPa * 1000,
    dz: s.dz,
  });
  // Auto-updating sweep: predicted narrow-section pressure across the d₂ slider range.
  const d1c = Number.isFinite(s.d1cm) && s.d1cm > 0 ? s.d1cm : 12;
  const qLc = Number.isFinite(s.qLps) && s.qLps > 0 ? s.qLps : 20;
  const rhoc = Number.isFinite(s.rho) && s.rho > 0 ? s.rho : 1000;
  const p1c = Number.isFinite(s.p1kPa) ? s.p1kPa : 200;
  const dzc = Number.isFinite(s.dz) ? s.dz : 0;
  const chartData = sweep(2, 12, 40, (d2cm) => {
    const r = pipeFlow({ d1: d1c / 100, d2: d2cm / 100, flowRate: qLc / 1000, rho: rhoc, p1: p1c * 1000, dz: dzc });
    return r.valid ? { P2: r.p2 / 1000 } : null;
  });
  const set = (k) => (v) => {
    touch();
    setS((p) => ({ ...p, [k]: v }));
  };

  // Model-validity note: P2 below atmospheric (gauge) is a suction region; below
  // −101.3 kPa gauge the absolute pressure would be negative — impossible.
  let warning = null;
  if (res.valid) {
    if (res.p2 < -101325)
      warning =
        "The ideal model predicts a negative absolute pressure here — physically impossible for a liquid. Real flows cavitate (vapour bubbles form), so this result is outside the model's validity. Reduce the speed-up or raise the reference pressure.";
    else if (res.p2 < 0)
      warning =
        "Predicted gauge pressure is below atmospheric — a suction region. The ideal model still applies, but real systems near these conditions face pump and cavitation limits.";
  }

  return (
    <ExperimentShell
      title="Bernoulli Flow Lab"
      tagline="A₁·v₁ = A₂·v₂ · P + ½ρv² + ρgz = constant"
      intro="Push a steady flow through a pipe that narrows and watch the trade: mass conservation forces the speed up where the area shrinks, and Bernoulli's energy balance forces the pressure down to pay for it."
      assumptions={[
        "Incompressible fluid with constant density.",
        "Steady flow — the pattern does not change with time.",
        "Viscosity, turbulence, and energy (friction) losses are neglected — an idealized model, not a prediction for every real pipe system.",
        "Uniform (one-dimensional) velocity profile at each cross-section.",
        "Reference pressure P₁ is gauge; elevation difference dz = z₂ − z₁ for the narrow section.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Continuity <span className="font-mono text-cyan-400">Q = A·v</span> comes from mass conservation: the same
          volume per second must pass every section, so shrinking the area raises the speed in exact proportion. With
          energy conserved per unit volume,{" "}
          <span className="font-mono text-cyan-400">P₂ = P₁ − ½ρ(v₂² − v₁²) − ρg·dz</span>: the pressure drops by
          the rise in dynamic pressure plus any elevation gain. Real pipes lose extra pressure to friction, so treat
          these numbers as an ideal upper bound on performance.
        </p>
      }
      predict={{
        experimentId: "bernoulli",
        label: "Bernoulli Flow Lab",
        pre: [
          {
            question: "The volume flow rate stays constant while the fluid enters the narrower section. Its speed in the narrow section will…",
            options: ["Increase", "Decrease", "Stay the same", "Drop to zero"],
            correctIndex: 0,
            explanation:
              "Continuity: Q = A·v is fixed, so a smaller cross-sectional area A must be matched by a larger speed v. Bernoulli then trades that speed for lower pressure.",
            computeComparison: () => ({
              beforeLabel: `Wide section (d₁ = ${fmt(s.d1cm)} cm)`,
              before: `v₁ = ${fmt(res.v1)} m/s`,
              afterLabel: `Narrow section (d₂ = ${fmt(s.d2cm)} cm)`,
              after: `v₂ = ${fmt(res.v2)} m/s`,
            }),
          },
          ...bernoulliPre,
        ],
        post: bernoulliPost,
      }}
    >
      <ErrorList errors={res.errors} />

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
          <ControlSlider label="Wide diameter d₁" value={s.d1cm} onChange={set("d1cm")} min={4} max={20} step={0.5} unit="cm" error={res.errors?.d1} />
          <ControlSlider label="Narrow diameter d₂" value={s.d2cm} onChange={set("d2cm")} min={2} max={12} step={0.5} unit="cm" error={res.errors?.d2} />
          <ControlSlider label="Volume flow rate Q" value={s.qLps} onChange={set("qLps")} min={5} max={60} step={1} unit="L/s" error={res.errors?.flowRate} />
          <ControlSlider label="Fluid density ρ" value={s.rho} onChange={set("rho")} min={600} max={2000} step={10} unit="kg/m³" error={res.errors?.rho} />
          <ControlSlider label="Reference pressure P₁ (gauge)" value={s.p1kPa} onChange={set("p1kPa")} min={100} max={400} step={5} unit="kPa" error={res.errors?.p1} />
          <ControlSlider
            label="Elevation dz (narrow vs wide)"
            value={s.dz}
            onChange={set("dz")}
            min={-2}
            max={2}
            step={0.1}
            unit="m"
            error={res.errors?.dz}
            help="Positive = narrow section higher"
          />
        </div>
        <div className="space-y-3">
          <BernoulliViz
            d1={s.d1cm / 100}
            d2={s.d2cm / 100}
            v1={res.valid ? res.v1 : 0}
            v2={res.valid ? res.v2 : 0}
            p1={s.p1kPa * 1000}
            p2={res.valid ? res.p2 : s.p1kPa * 1000}
            qLps={s.qLps}
            dz={s.dz}
          />
          {warning && (
            <div className="rounded-lg border border-orange-500/40 bg-orange-500/10 p-3 text-xs font-medium leading-relaxed text-orange-400">
              {warning}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Speed v₁ (wide)" value={res.valid ? fmt(res.v1) : "—"} unit="m/s" />
        <Stat label="Speed v₂ (narrow)" value={res.valid ? fmt(res.v2) : "—"} unit="m/s" accent="cyan" />
        <Stat label="Area A₁" value={res.valid ? fmt(res.A1 * 10000) : "—"} unit="cm²" />
        <Stat label="Area A₂" value={res.valid ? fmt(res.A2 * 10000) : "—"} unit="cm²" />
        <Stat label="Pressure P₂ (gauge)" value={res.valid ? fmt(res.p2 / 1000) : "—"} unit="kPa" accent="orange" />
        <Stat label="Dynamic pressure change" value={res.valid ? fmt(res.dynamicRise / 1000) : "—"} unit="kPa" accent="cyan" />
      </div>

      <ExperimentChart
        title="Narrow-section pressure vs pipe diameter — updates with your inputs"
        note={`Model curve P₂ = P₁ − ½ρ(v₂² − v₁²) − ρg·dz at your current Q = ${fmt(qLc)} L/s, ρ = ${fmt(rhoc)} kg/m³, P₁ = ${fmt(p1c)} kPa, and dz = ${fmt(dzc)} m. The narrower the section, the faster the flow and the lower the pressure; the dashed marker is your current d₂.`}
        xLabel="Narrow diameter d₂ (cm)"
        xMarker={Number.isFinite(s.d2cm) ? s.d2cm : undefined}
        data={chartData}
        series={[{ key: "P2", name: "Pressure P₂ (kPa, gauge)", color: "#f97316" }]}
      />

    </ExperimentShell>
  );
}
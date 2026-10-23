import React, { useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ThermometerViz from "@/components/experiments/ThermometerViz";
import { specificHeat } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { PREDICTIONS } from "@/data/predictions";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { MATERIALS } from "@/data/materials";
import { cn } from "@/lib/utils";

const SAND = {
  id: "sand", name: "Dry sand", c: 830,
  source: "Representative value for dry quartz sand, Engineering ToolBox / Çengel, Heat & Mass Transfer.",
};

const SAMPLES = [
  { id: "water", label: "Water", c: 4186, ref: "Reference value at ~20 °C (engineering standard)." },
  { id: "copper-c11000", label: "Copper C11000", c: 385, ref: "Callister & Rethwisch, 10th ed." },
  { id: "sand", label: "Dry sand", c: SAND.c, ref: SAND.source },
];

const DEFAULTS = { sample: "water", mass: 1.0, t0: 20, q: 50 };

export default function SpecificHeat() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const sample = SAMPLES.find((x) => x.id === s.sample);
  const res = specificHeat({ mass: s.mass, initialTempC: s.t0, energyJ: s.q * 1000, c: sample.c });
  const set = (k) => (v) => setS((p) => ({ ...p, [k]: v }));

  // Auto-updating sweep: temperature change vs mass at the current heat input & material.
  const qc = Number.isFinite(s.q) ? s.q : 50;
  const chartData = sweep(0.1, 5, 40, (m) => {
    const r = specificHeat({ mass: m, initialTempC: s.t0, energyJ: qc * 1000, c: sample.c });
    return r.valid ? { dT: r.deltaT } : null;
  });

  // Model validity checks: Q = mcΔT assumes no phase change.
  let warning = null;
  if (res.valid && s.sample === "water") {
    if (res.finalTempC > 100) warning = "Result exceeds 100 °C — water would boil. Q = mcΔT stops at the boiling point; further energy goes into vaporization (latent heat), so this result is outside the model.";
    else if (res.finalTempC < 0) warning = "Result is below 0 °C — water would freeze. Q = mcΔT stops at the freezing point; further energy removal goes into fusion (latent heat), so this result is outside the model.";
  }
  if (res.valid && s.sample === "copper-c11000" && res.finalTempC > 1085) {
    warning = "Result exceeds copper's melting point (≈1085 °C) — the sample would melt, so this result is outside the no-phase-change model.";
  }

  return (
    <ExperimentShell
      title="Specific Heat"
      tagline="Q = m·c·ΔT"
      intro="Add the same heat to water, copper, and sand and they warm up very differently. Specific heat capacity c is the 'thermal appetite' of a material: how many joules it takes to raise one kilogram by one kelvin."
      assumptions={[
        "No phase change occurs (no melting, boiling, or freezing).",
        "No heat is lost to, or gained from, the surroundings.",
        "c is constant over the temperature range (a good approximation for small changes).",
        "Energy added is positive; energy removed is negative.",
        "Kelvin and Celsius intervals are identical, so ΔT in K equals ΔT in °C.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Rearranging <span className="font-mono text-cyan-400">Q = mcΔT</span> gives <span className="font-mono text-cyan-400">ΔT = Q/(mc)</span>: temperature rise shrinks as mass or specific heat grows. Water's huge c (4186 J/(kg·K)) makes it an outstanding coolant and heat bank; copper's small c (385) is why a copper pan lid gets scorching hot almost instantly. The value used for each sample is shown with its reference.
        </p>
      }
      predict={{
        experimentId: "heat",
        label: "Specific Heat",
        pre: [
          {
            question: "You add the same heat energy to equal masses of water and copper. Which warms up more?",
            options: ["Water warms more", "Copper warms more", "Both warm equally"],
            correctIndex: 1,
            explanation: "ΔT = Q/(mc). Copper's specific heat (385 J/(kg·K)) is about 11× smaller than water's (4186), so the same energy produces about 11× the temperature rise.",
            computeComparison: () => {
              const q = s.q * 1000;
              const dTw = q / (s.mass * 4186);
              const dTc = q / (s.mass * 385);
              return {
                beforeLabel: `Water: c = 4186 J/(kg·K)`, before: `ΔT = ${fmt(dTw)} K`,
                afterLabel: `Copper: c = 385 J/(kg·K)`, after: `ΔT = ${fmt(dTc)} K`,
              };
            },
          },
          ...PREDICTIONS.heat.pre,
        ],
        post: PREDICTIONS.heat.post,
      }}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Sample material</div>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLES.map((x) => (
                <button
                  key={x.id}
                  onClick={() => { setS((p) => ({ ...p, sample: x.id })); recordExperiment("heat", "Ran Specific Heat"); }}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                    s.sample === x.id ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground hover:border-ring"
                  )}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              c = {fmt(sample.c)} J/(kg·K) — {sample.ref}
            </div>
          </div>

          <ErrorList errors={res.errors} />

          <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
            <ControlSlider label="Sample mass m" value={s.mass} onChange={set("mass")} min={0.1} max={5} step={0.1} unit="kg" error={res.errors?.mass} />
            <ControlSlider label="Initial temperature T₀" value={s.t0} onChange={set("t0")} min={-10} max={100} step={1} unit="°C" />
            <ControlSlider label="Heat energy Q (+ adds, − removes)" value={s.q} onChange={set("q")} min={-100} max={100} step={1} unit="kJ" error={res.errors?.energyJ} />
          </div>
        </div>

        <ThermometerViz t0={s.t0} tf={res.valid ? res.finalTempC : s.t0} warning={warning} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="Temperature change ΔT" value={res.valid ? fmt(res.deltaT) : "—"} unit="K" accent="orange" />
        <Stat label="Final temperature T" value={res.valid ? fmt(res.finalTempC) : "—"} unit="°C" accent="cyan" />
        <Stat label="Heat energy Q" value={res.valid ? fmt(s.q * 1000) : "—"} unit="J" />
      </div>

      <ExperimentChart
        title="Temperature change vs mass — updates with your inputs"
        note={`Model curve ΔT = Q/(mc) at your current Q = ${fmt(qc * 1000)} J and ${sample.label}'s c = ${fmt(sample.c)} J/(kg·K). The dashed marker is your current mass.`}
        xLabel="Sample mass m (kg)"
        xMarker={Number.isFinite(s.mass) ? s.mass : undefined}
        data={chartData}
        series={[{ key: "dT", name: "Temperature change ΔT (K)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
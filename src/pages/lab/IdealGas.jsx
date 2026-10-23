import React, { useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import GasViz from "@/components/experiments/GasViz";
import { gasLaw, cToK, kToC } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { PREDICTIONS } from "@/data/predictions";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const DEFAULTS = { p1: 100, v1: 2, t1c: 27, unknown: "p2", p2: 200, v2: 2, t2c: 27 };

const UNKNOWN_META = {
  p2: { label: "Final pressure P₂", unit: "kPa", knowns: ["v2", "t2c"] },
  v2: { label: "Final volume V₂", unit: "L", knowns: ["p2", "t2c"] },
  t2: { label: "Final temperature T₂", unit: "K", knowns: ["p2", "v2"] },
};

export default function IdealGas() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const set = (k) => (v) => setS((p) => ({ ...p, [k]: v }));

  const payload = {
    p1: s.p1, v1: s.v1, t1: cToK(s.t1c),
    p2: s.p2, v2: s.v2, t2: cToK(s.t2c), unknown: s.unknown,
  };
  const res = gasLaw(payload);
  const meta = UNKNOWN_META[s.unknown];

  // Auto-updating sweep: isothermal (constant T₁) pressure–volume curve through state 1.
  const boyleOk = Number.isFinite(s.p1) && s.p1 > 0 && Number.isFinite(s.v1) && s.v1 > 0;
  const boyleData = boyleOk ? sweep(0.5, 10, 38, (v) => ({ P: (s.p1 * s.v1) / v })) : [];

  const resultK = s.unknown === "t2" && res.valid ? res.value : null;
  const vizState2 = {
    p2: s.unknown === "p2" && res.valid ? res.value : s.p2,
    v2: s.unknown === "v2" && res.valid ? res.value : s.v2,
    t2K: s.unknown === "t2" && res.valid ? res.value : cToK(s.t2c),
  };

  return (
    <ExperimentShell
      title="Ideal Gas Explorer"
      tagline="P₁V₁/T₁ = P₂V₂/T₂ (fixed amount of gas)"
      intro="For a fixed amount of ideal gas, pressure, volume, and absolute temperature are locked together: you cannot change two without paying for it in the third. Pick which final variable you want to solve for, set the other five, and see the equilibrium fall out."
      assumptions={[
        "The gas is ideal: particles are point-like with no interactions (valid at low density).",
        "The amount of gas is fixed — nothing leaks in or out.",
        "Both states are equilibrium states; the path between them doesn't matter.",
        "All temperatures are absolute (kelvin): T(K) = T(°C) + 273.15.",
        "Pressure, volume, and absolute temperature must all be positive to be physical.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          The combined gas law <span className="font-mono text-cyan-400">P₁V₁/T₁ = P₂V₂/T₂</span> says the ratio PV/T is the same for both states. Compress the gas (V↓) at constant T and P must rise; heat it (T↑) at constant V and P rises; expand it and each of these can be offset by the other. Kelvin matters: doubling 27 °C is not doubling 54 °C — it's doubling 300 K → 600 K (= 327 °C).
        </p>
      }
      predict={{
        experimentId: "gas",
        label: "Ideal Gas",
        pre: [
          {
            question: "At constant temperature, you slowly compress the gas to half its volume. What happens to the pressure?",
            options: ["It stays the same", "It halves", "It doubles", "It quadruples"],
            correctIndex: 2,
            explanation: "Boyle's law: with T fixed, P ∝ 1/V, so halving the volume doubles the pressure. The comparison uses your current state 1 values.",
            computeComparison: () => ({
              beforeLabel: `Current: V = ${fmt(s.v1)} L`, before: `P = ${fmt(s.p1)} kPa`,
              afterLabel: `Compressed: V = ${fmt(s.v1 / 2)} L`, after: `P = ${fmt(s.p1 * 2)} kPa`,
            }),
          },
          ...PREDICTIONS.gas.pre,
        ],
        post: PREDICTIONS.gas.post,
      }}
    >
      <GasViz
        label1="State 1" v1={s.p1 > 0 && s.v1 > 0 ? s.v1 : 0.1} p1={s.p1 > 0 ? s.p1 : 0.1} t1K={cToK(s.t1c)}
        label2="State 2" v2={vizState2.v2 > 0 ? vizState2.v2 : 0.1} p2={vizState2.p2 > 0 ? vizState2.p2 : 0.1} t2K={vizState2.t2K}
      />

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Solve for</div>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(UNKNOWN_META).map((u) => (
            <button
              key={u}
              onClick={() => { setS((p) => ({ ...p, unknown: u })); recordExperiment("gas", "Ran Ideal Gas Explorer"); }}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors",
                s.unknown === u ? "border-cyan-500 bg-cyan-500/15 text-cyan-300" : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {UNKNOWN_META[u].label}
            </button>
          ))}
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-3">
        <ControlSlider label="Initial pressure P₁" value={s.p1} onChange={set("p1")} min={10} max={500} step={5} unit="kPa" error={res.errors?.p1} />
        <ControlSlider label="Initial volume V₁" value={s.v1} onChange={set("v1")} min={0.5} max={10} step={0.1} unit="L" error={res.errors?.v1} />
        <ControlSlider label="Initial temperature T₁" value={s.t1c} onChange={set("t1c")} min={-20} max={500} step={5} unit="°C" help={`= ${fmt(cToK(s.t1c), 5)} K`} />
        {s.unknown !== "p2" && <ControlSlider label="Final pressure P₂" value={s.p2} onChange={set("p2")} min={10} max={500} step={5} unit="kPa" error={res.errors?.p2} />}
        {s.unknown !== "v2" && <ControlSlider label="Final volume V₂" value={s.v2} onChange={set("v2")} min={0.5} max={10} step={0.1} unit="L" error={res.errors?.v2} />}
        {s.unknown !== "t2" && <ControlSlider label="Final temperature T₂" value={s.t2c} onChange={set("t2c")} min={-20} max={500} step={5} unit="°C" help={`= ${fmt(cToK(s.t2c), 5)} K`} />}
      </div>

      {res.valid && (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.07] p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">{meta.label}</div>
          <div className="mt-1 font-mono text-3xl font-bold text-cyan-300">
            {fmt(res.value)}
            <span className="ml-2 text-base font-normal text-muted-foreground">{meta.unit}</span>
          </div>
          {resultK !== null && (
            <div className="mt-1 text-sm text-muted-foreground">
              = {fmt(kToC(resultK))} °C — remember this is an absolute temperature; intervals from here are fine in °C.
            </div>
          )}
        </div>
      )}

      {boyleData.length > 0 && (
        <ExperimentChart
          title="Pressure vs volume at constant temperature — updates with your inputs"
          note={`Isothermal Boyle's-law curve through your current state 1 (P₁ = ${fmt(s.p1)} kPa, V₁ = ${fmt(s.v1)} L, T₁ held constant). P ∝ 1/V — halving the volume doubles the pressure; the dashed marker is state 1.`}
          xLabel="Volume V (L)"
          xMarker={s.v1}
          data={boyleData}
          series={[{ key: "P", name: "Pressure P (kPa)", color: "#22d3ee" }]}
        />
      )}
    </ExperimentShell>
  );
}
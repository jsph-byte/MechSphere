import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import GasViz from "@/components/experiments/GasViz";
import { gasProcess, cToK, kToC } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import { cn } from "@/lib/utils";

const DEFAULTS = { type: "isothermal", p1: 100, v1: 2, t1c: 27, target: 4 };

const TYPES = [
  { id: "isothermal", label: "Isothermal (T const)", drive: "v2" },
  { id: "isobaric", label: "Isobaric (P const)", drive: "t2" },
  { id: "isochoric", label: "Isochoric (V const)", drive: "t2" },
  { id: "adiabatic", label: "Adiabatic (Q = 0)", drive: "v2" },
];

export default function GasProcesses() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const touch = () => {
    if (!touched.current) { touched.current = true; recordExperiment("gasprocess", "Ran Heating & Gas Processes Lab"); }
  };
  const set = (k) => (v) => { touch(); setS((p) => ({ ...p, [k]: v })); };

  const type = TYPES.find((t) => t.id === s.type);
  const res = gasProcess({ p1: s.p1, v1: s.v1, t1: cToK(s.t1c), type: s.type, target: s.target });
  const tDriven = type.drive === "t2";

  const chartData = tDriven
    ? sweep(200, 900, 35, (t) => {
        const r = gasProcess({ p1: s.p1, v1: s.v1, t1: cToK(s.t1c), type: s.type, target: t });
        return r.valid ? { W: r.work } : null;
      })
    : sweep(0.5, 10, 38, (v) => {
        const r = gasProcess({ p1: s.p1, v1: s.v1, t1: cToK(s.t1c), type: s.type, target: v });
        return r.valid ? { W: r.work } : null;
      });

  return (
    <ExperimentShell
      title="Heating & Gas Processes"
      tagline="isothermal P V const · isobaric V ∝ T · isochoric P ∝ T · adiabatic P Vᵞ const"
      intro="Squeeze or heat a gas and it follows one of four classic rulebooks depending on what you hold fixed. Pick the process, drive one variable, and watch the whole state — and the work done — fall out of conservation."
      assumptions={[
        "The gas is ideal and its amount is fixed.",
        "All temperatures are absolute (kelvin).",
        "Adiabatic uses γ = 1.4 (diatomic gas such as air); isothermal needs a perfect heat reservoir.",
        "Work is boundary work done BY the gas (positive = expansion).",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Each process holds one thing hostage. Isothermal: heat reservoirs keep T fixed, so P ∝ 1/V and the
          work is <span className="font-mono text-cyan-400">P₁V₁·ln(V₂/V₁)</span>. Isobaric: the piston floats at
          constant pressure, so V ∝ T. Isochoric: the sealed rigid box allows no work at all — every joule of
          heat goes into pressure. Adiabatic: insulation means work is paid entirely from internal energy, so
          compression heats the gas — the pump that warms your bicycle pump.
        </p>
      }
      predict={{ experimentId: "gasprocess", label: "Heating & Gas Processes", pre: PREDICTIONS.gasprocess.pre, post: PREDICTIONS.gasprocess.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Process</div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => { touch(); setS((p) => ({ ...p, type: t.id })); }}
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

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <ControlSlider label="Initial pressure P₁" value={s.p1} onChange={set("p1")} min={10} max={500} step={5} unit="kPa" error={res.errors?.p1} />
            <ControlSlider label="Initial volume V₁" value={s.v1} onChange={set("v1")} min={0.5} max={10} step={0.1} unit="L" error={res.errors?.v1} />
            <ControlSlider label="Initial temperature T₁" value={s.t1c} onChange={set("t1c")} min={-20} max={500} step={5} unit="°C" help={`= ${fmt(cToK(s.t1c), 5)} K`} />
            <ControlSlider
              label={tDriven ? "Final temperature T₂ (drive)" : "Final volume V₂ (drive)"}
              value={s.target}
              onChange={set("target")}
              min={tDriven ? 200 : 0.5}
              max={tDriven ? 900 : 10}
              step={tDriven ? 10 : 0.1}
              unit={tDriven ? "K" : "L"}
              error={res.errors?.target}
              help={tDriven ? `= ${fmt(kToC(s.target), 4)} °C` : `${type.label} path`}
            />
          </div>
        </div>
        <GasViz
          label1="State 1" v1={s.v1 > 0 ? s.v1 : 0.1} p1={s.p1 > 0 ? s.p1 : 0.1} t1K={cToK(s.t1c)}
          label2="State 2" v2={res.valid ? res.v2 : s.v1} p2={res.valid ? res.p2 : s.p1} t2K={res.valid ? res.t2 : cToK(s.t1c)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Final pressure P₂" value={res.valid ? fmt(res.p2) : "—"} unit="kPa" accent="orange" />
        <Stat label="Final volume V₂" value={res.valid ? fmt(res.v2) : "—"} unit="L" accent="cyan" />
        <Stat label="Final temperature T₂" value={res.valid ? `${fmt(res.t2, 5)} K` : "—"} unit={res.valid ? `(${fmt(kToC(res.t2), 4)} °C)` : ""} />
        <Stat label="Work done BY the gas" value={res.valid ? fmt(res.work) : "—"} unit="J" accent="orange" />
      </div>

      <ExperimentChart
        title={`Work vs ${tDriven ? "final temperature" : "final volume"} — updates with your inputs`}
        note={`Model curve for the ${type.label.toLowerCase()} path from your current state 1 (P₁ = ${fmt(s.p1)} kPa, V₁ = ${fmt(s.v1)} L, T₁ = ${fmt(cToK(s.t1c), 5)} K). Positive work = the gas expands against its surroundings; the dashed marker is your current target.`}
        xLabel={tDriven ? "Final temperature T₂ (K)" : "Final volume V₂ (L)"}
        xMarker={Number.isFinite(s.target) ? s.target : undefined}
        data={chartData}
        series={[{ key: "W", name: "Work by gas W (J)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
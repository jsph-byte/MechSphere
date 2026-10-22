import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ConductionViz from "@/components/experiments/ConductionViz";
import AssessmentPanel from "@/components/assessments/AssessmentPanel";
import { conduction } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

// Typical ~300 K values from standard references (Incropera et al., Fundamentals of
// Heat and Mass Transfer). Real values vary with alloy, purity, and temperature.
const MATERIALS_K = [
  { id: "copper", label: "Copper", k: 401 },
  { id: "aluminum", label: "Aluminum (pure)", k: 237 },
  { id: "steel", label: "Mild steel", k: 45 },
  { id: "stainless", label: "Stainless 304", k: 16 },
  { id: "glass", label: "Window glass", k: 0.8 },
  { id: "wood", label: "Wood (oak)", k: 0.17 },
  { id: "polystyrene", label: "Polystyrene foam", k: 0.035 },
];

const DEFAULTS = { material: "copper", k: 401, length: 0.5, area: 0.01, thot: 125, tcold: 25 };

export default function HeatConduction() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const touch = () => {
    if (!touched.current) {
      touched.current = true;
      recordExperiment("conduction", "Ran Heat Conduction Lab");
    }
  };

  const mat = MATERIALS_K.find((m) => m.id === s.material);
  const res = conduction({ k: s.k, length: s.length, area: s.area, deltaT: s.thot - s.tcold });

  // Auto-updating sweep: heat rate vs thickness at the current material & conditions.
  const kc = Number.isFinite(s.k) && s.k > 0 ? s.k : 401;
  const ac = Number.isFinite(s.area) && s.area > 0 ? s.area : 0.01;
  const dtc = Number.isFinite(s.thot) && Number.isFinite(s.tcold) && s.thot - s.tcold > 0 ? s.thot - s.tcold : 100;
  const chartData = sweep(0.05, 2, 39, (L) => {
    const r = conduction({ k: kc, length: L, area: ac, deltaT: dtc });
    return r.valid ? { q: r.rate } : null;
  });
  const set = (k) => (v) => {
    touch();
    setS((p) => ({ ...p, [k]: v }));
  };
  const pick = (m) => {
    touch();
    setS((p) => ({ ...p, material: m.id, k: m.k }));
  };

  return (
    <ExperimentShell
      title="Heat Conduction Lab"
      tagline="q = k · A · ΔT / L"
      intro="Hold one end of a copper rod in a flame and the other end soon burns your hand — but a wooden stick of the same size never does. Fourier's law quantifies exactly why: the heat-transfer rate scales with conductivity and area, and against thickness."
      assumptions={[
        "Steady state — the temperature at each point no longer changes with time.",
        "One-dimensional conduction through a uniform material (side walls perfectly insulated).",
        "k is constant over the temperature range (an approximation; k varies with temperature).",
        "Perfect thermal contact at both ends; no contact resistance.",
        "No convection or radiation losses from the surfaces.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Fourier's law <span className="font-mono text-cyan-400">q = kAΔT/L</span> is a rate, not an amount: it says
          how many joules per second cross the sample at steady state. Doubling the thickness halves the rate; doubling
          the area or the temperature drive doubles it; and swapping copper (k ≈ 401) for polystyrene foam (k ≈ 0.035)
          cuts the rate by a factor of more than 10 000. Written as{" "}
          <span className="font-mono text-cyan-400">ΔT = q·R</span> with thermal resistance{" "}
          <span className="font-mono text-cyan-400">R = L/(kA)</span>, conduction behaves exactly like Ohm's law — thick
          insulators are big resistors.
        </p>
      }
      predict={{
        experimentId: "conduction",
        label: "Heat Conduction Lab",
        question: "You double the sample's thickness while keeping k, A, and ΔT the same. The steady-state heat-transfer rate will…",
        options: ["Double", "Halve", "Stay the same", "Become zero"],
        correctIndex: 1,
        explanation:
          "q = kAΔT/L is inversely proportional to the thickness L: twice the thickness means twice the distance each unit of heat must be conducted through, halving the rate.",
        computeComparison: () => {
          const base = (s.k * s.area * (s.thot - s.tcold)) / s.length;
          const doubled = (s.k * s.area * (s.thot - s.tcold)) / (2 * s.length);
          return {
            beforeLabel: `Current thickness L = ${fmt(s.length)} m`,
            before: `q = ${fmt(base)} W`,
            afterLabel: "Doubled thickness 2L",
            after: `q = ${fmt(doubled)} W`,
          };
        },
      }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Sample material</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {MATERIALS_K.map((m) => (
            <button
              key={m.id}
              onClick={() => pick(m)}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                s.material === m.id
                  ? "border-orange-500 bg-orange-500/15 text-orange-300"
                  : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          k = {fmt(s.k)} W/(m·K) — typical ~300 K handbook values; real values vary with alloy, purity, and temperature.
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
        <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
          <ControlSlider label="Thermal conductivity k" value={s.k} onChange={set("k")} min={0.02} max={450} step={0.01} unit="W/(m·K)" error={res.errors?.k} />
          <ControlSlider label="Sample length L" value={s.length} onChange={set("length")} min={0.05} max={2} step={0.01} unit="m" error={res.errors?.length} />
          <ControlSlider label="Cross-sectional area A" value={s.area} onChange={set("area")} min={0.001} max={0.1} step={0.001} unit="m²" error={res.errors?.area} />
          <ControlSlider label="Hot-end temperature" value={s.thot} onChange={set("thot")} min={25} max={400} step={5} unit="°C" error={res.errors?.deltaT} />
          <ControlSlider label="Cold-end temperature" value={s.tcold} onChange={set("tcold")} min={-20} max={150} step={5} unit="°C" />
        </div>
        <ConductionViz
          hotC={s.thot}
          coldC={s.tcold}
          rateW={res.valid ? res.rate : 0}
          materialLabel={mat ? mat.label : "Custom material"}
          lengthM={s.length}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Heat-transfer rate q" value={res.valid ? fmt(res.rate) : "—"} unit="W" accent="orange" />
        <Stat label="Heat flux q/A" value={res.valid ? fmt(res.heatFlux) : "—"} unit="W/m²" accent="cyan" />
        <Stat label="Temperature difference ΔT" value={res.valid ? fmt(s.thot - s.tcold) : "—"} unit="K" />
        <Stat label="Thermal resistance L/(kA)" value={res.valid ? fmt(res.thermalResistance) : "—"} unit="K/W" />
      </div>

      <ExperimentChart
        title="Heat rate vs thickness — updates with your inputs"
        note={`Model curve q = kAΔT/L at your current k = ${fmt(kc)} W/(m·K), A = ${fmt(ac)} m², and ΔT = ${fmt(dtc)} K. The hyperbola shows why insulation works: the dashed marker is your current length.`}
        xLabel="Sample length L (m)"
        xMarker={Number.isFinite(s.length) ? s.length : undefined}
        data={chartData}
        series={[{ key: "q", name: "Heat rate q (W)", color: "#f97316" }]}
      />

      <AssessmentPanel experimentId="conduction" />
    </ExperimentShell>
  );
}
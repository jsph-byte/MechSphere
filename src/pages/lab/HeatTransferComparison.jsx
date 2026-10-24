import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import { conduction } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import HeatModesPanel from "@/components/experiments/HeatModesPanel";

// Typical ~300 K conductivities (Incropera et al.) — same reference set as the Conduction lab.
const MATERIALS_K = [
  { id: "copper", label: "Copper", k: 401 },
  { id: "aluminum", label: "Aluminium (pure)", k: 237 },
  { id: "steel", label: "Mild steel", k: 45 },
  { id: "stainless", label: "Stainless 304", k: 16 },
  { id: "glass", label: "Window glass", k: 0.8 },
  { id: "wood", label: "Wood (oak)", k: 0.17 },
  { id: "polystyrene", label: "Polystyrene foam", k: 0.035 },
];

const DEFAULTS = { length: 0.5, area: 0.01, thot: 125, tcold: 25 };

export default function HeatTransferComparison() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("heatcompare", "Ran Heat Transfer Comparison Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const deltaT = s.thot - s.tcold;
  const rows = MATERIALS_K.map((m) => {
    const r = conduction({ k: m.k, length: s.length, area: s.area, deltaT });
    return { ...m, q: r.valid ? r.rate : null };
  }).filter((r) => r.q !== null);

  const qMax = Math.max(...rows.map((r) => r.q));
  const qMin = Math.min(...rows.map((r) => r.q));
  const logSpan = Math.log10(qMax) - Math.log10(qMin) || 1;
  const widthPct = (q) => 4 + (96 * (Math.log10(q) - Math.log10(qMin))) / logSpan;

  const fastest = rows[0];
  const slowest = rows[rows.length - 1];

  return (
    <ExperimentShell
      title="Heat Transfer Comparison"
      tagline="q = k·A·ΔT/L — same geometry, seven materials"
      intro="Hold a copper rod and a foam handle of identical shape over the same flame and one burns you in seconds while the other barely warms. Everything here is identical except k — so the bars isolate exactly what conductivity is worth."
      assumptions={[
        "All samples share the same length, area, and end temperatures.",
        "Steady one-dimensional conduction (Fourier's law).",
        "k values are typical ~300 K handbook figures; real values vary with alloy and temperature.",
        "No convection or radiation losses; perfect end contact.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          With A, L and ΔT fixed, the rate{" "}
          <span className="font-mono text-cyan-400">q = kAΔT/L</span> is a straight multiple of k alone — the bars
          are a picture of the k values themselves, on a logarithmic width scale because copper conducts over 10
          000× more than foam. That spread is the whole business of thermal design: metals move heat, foams stop
          it, and stainless steel sits awkwardly in between.
        </p>
      }
      predict={{ experimentId: "heatcompare", label: "Heat Transfer Comparison", pre: PREDICTIONS.heatcompare.pre, post: PREDICTIONS.heatcompare.post }}
    >
      <ErrorList errors={deltaT <= 0 ? { deltaT: "The hot end must be hotter than the cold end." } : null} />

      <VizPanel title={`Heat rate per material — same geometry (bar widths log-scaled, live)`} footer="Model output from Fourier's law with your current geometry — not measured data.">
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-xs font-medium text-muted-foreground">{r.label}</span>
              <div className="h-5 flex-1 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-orange-500/85"
                  style={{ width: `${widthPct(r.q)}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-right font-mono text-xs tabular-nums text-foreground">{fmt(r.q)} W</span>
            </div>
          ))}
        </div>
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
        <ControlSlider label="Sample length L" value={s.length} onChange={set("length")} min={0.05} max={2} step={0.05} unit="m" />
        <ControlSlider label="Cross-sectional area A" value={s.area} onChange={set("area")} min={0.001} max={0.1} step={0.001} unit="m²" />
        <ControlSlider label="Hot-end temperature" value={s.thot} onChange={set("thot")} min={25} max={400} step={5} unit="°C" />
        <ControlSlider label="Cold-end temperature" value={s.tcold} onChange={set("tcold")} min={-20} max={150} step={5} unit="°C" />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Stat label="Fastest: copper q" value={fmt(fastest.q)} unit="W" accent="orange" />
        <Stat label="Slowest: foam q" value={fmt(slowest.q)} unit="W" accent="cyan" />
        <Stat label="Conduction ratio copper : foam" value={fmt(fastest.q / slowest.q)} unit="×" accent="orange" />
      </div>

      <HeatModesPanel />
    </ExperimentShell>
  );
}
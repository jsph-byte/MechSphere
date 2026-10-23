import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { thermalExpansion } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import { cn } from "@/lib/utils";

// Typical linear expansion coefficients ~room temperature (standard references).
const MATERIALS = [
  { id: "aluminum", label: "Aluminium", alpha: 23e-6 },
  { id: "copper", label: "Copper", alpha: 17e-6 },
  { id: "steel", label: "Mild steel", alpha: 12e-6 },
  { id: "glass", label: "Glass", alpha: 9e-6 },
  { id: "invar", label: "Invar", alpha: 1.2e-6 },
];

const DEFAULTS = { material: "aluminum", alpha: 23e-6, length0: 2, deltaT: 50 };
const EXAGGERATION = 300; // drawing scale-up so millimetres are visible

/** Two bars: original length and the expanded length (heavily exaggerated). */
function ExpansionViz({ s, res }) {
  const basePx = 260;
  const growPx = res.valid ? res.dL * EXAGGERATION : 0;
  return (
    <svg viewBox="0 0 420 130" className="w-full" role="img" aria-label="Bar before and after thermal expansion">
      <text x="30" y="30" fontSize="10" fill="currentColor" className="text-muted-foreground">original</text>
      <rect x="30" y="38" width={basePx} height="20" rx="3" fill="currentColor" className="text-muted-foreground" opacity="0.55" />
      <text x="30" y="76" fontSize="10" fill="currentColor" className="text-orange-400">after ΔT (exaggerated ×{EXAGGERATION})</text>
      <rect x="30" y="84" width={basePx + growPx} height="20" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
      <line x1={30 + basePx + growPx} y1="80" x2={30 + basePx + growPx} y2="110" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={30 + basePx + growPx + 6} y="99" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">
        ΔL = {res.valid ? fmt(res.dL * 1000, 4) : "—"} mm
      </text>
      <text x="30" y="122" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        L₀ = {fmt(s.length0)} m · ΔT = {fmt(s.deltaT, 3)} K
      </text>
    </svg>
  );
}

export default function ThermalExpansion() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("expansion", "Ran Thermal Expansion Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const mat = MATERIALS.find((m) => m.id === s.material);
  const res = thermalExpansion({ alpha: s.alpha, length0: s.length0, deltaT: s.deltaT });
  const chartData = sweep(-100, 200, 40, (dT) => {
    const r = thermalExpansion({ alpha: s.alpha, length0: s.length0, deltaT: dT });
    return r.valid ? { dL: r.dL * 1000 } : null;
  });

  return (
    <ExperimentShell
      title="Thermal Expansion"
      tagline="ΔL = α·L₀·ΔT · ΔV ≈ 3α·V₀·ΔT"
      intro="Heat a 2-metre aluminium rail by 50 K and it grows 2.3 mm — invisible on a ruler, but enough to buckle a railroad track with no expansion joints. This lab shows just how small, and how important, that strain is."
      assumptions={[
        "The material is homogeneous and expands uniformly (α constant over the range).",
        "Free expansion — nothing restrains the material.",
        "α values are typical ~20 °C reference values; they vary with temperature and alloy.",
        "Volume model ΔV ≈ 3α·V₀·ΔT holds for isotropic solids only.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Warmer atoms sit farther apart on average, and the whole object scales with that spacing:{" "}
          <span className="font-mono text-cyan-400">ΔL = αL₀ΔT</span>. Growth is proportional to both the
          starting length and the temperature swing — which is why long pipelines, bridges and rails are the
          structures that care. Aluminium (α ≈ 23×10⁻⁶/K) expands nearly 20× as much as invar (≈1.2×10⁻⁶/K),
          the alloy built for precision instruments.
        </p>
      }
      predict={{ experimentId: "expansion", label: "Thermal Expansion", pre: PREDICTIONS.expansion.pre, post: PREDICTIONS.expansion.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Material</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              onClick={() => { if (!touched.current) { touched.current = true; recordExperiment("expansion", "Ran Thermal Expansion Lab"); } setS((p) => ({ ...p, material: m.id, alpha: m.alpha })); }}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                s.material === m.id ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          α = {fmt(s.alpha * 1e6, 4)}×10⁻⁶ 1/K — typical handbook value ({mat ? mat.label : "custom"}).
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <VizPanel title="Expansion schematic (change exaggerated ×300 for visibility)">
        <ExpansionViz s={s} res={res} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        <ControlSlider label="Expansion coefficient α" value={s.alpha * 1e6} onChange={(v) => set("alpha")(v / 1e6)} min={0.5} max={30} step={0.1} unit="×10⁻⁶/K" error={res.errors?.alpha} />
        <ControlSlider label="Initial length L₀" value={s.length0} onChange={set("length0")} min={0.5} max={20} step={0.5} unit="m" error={res.errors?.length0} />
        <ControlSlider label="Temperature change ΔT (+ heat, − cool)" value={s.deltaT} onChange={set("deltaT")} min={-100} max={200} step={5} unit="K" error={res.errors?.deltaT} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Length change ΔL" value={res.valid ? fmt(res.dL * 1000, 5) : "—"} unit="mm" accent="orange" />
        <Stat label="New length L₀ + ΔL" value={res.valid ? fmt(res.newLength, 5) : "—"} unit="m" accent="cyan" />
        <Stat label="Volume change ΔV (1 m³ block)" value={res.valid ? fmt(res.dV * 1000, 4) : "—"} unit="L" />
        <Stat label="Thermal strain ΔL/L₀" value={res.valid ? `${fmt(res.dL / s.length0 * 1e6, 4)}×10⁻⁶` : "—"} unit="" />
      </div>

      <ExperimentChart
        title="Length change vs temperature change — updates with your inputs"
        note={`Model curve ΔL = αL₀ΔT at your current α = ${fmt(s.alpha * 1e6, 4)}×10⁻⁶/K and L₀ = ${fmt(s.length0)} m. Cooling (ΔT < 0) contracts the bar; the dashed marker is your current ΔT.`}
        xLabel="Temperature change ΔT (K)"
        xMarker={Number.isFinite(s.deltaT) ? s.deltaT : undefined}
        data={chartData}
        series={[{ key: "dL", name: "Length change ΔL (mm)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
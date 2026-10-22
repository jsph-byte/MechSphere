import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import BuoyancyViz from "@/components/experiments/BuoyancyViz";
import AssessmentPanel from "@/components/assessments/AssessmentPanel";
import { buoyancy } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const FLUIDS = [
  { id: "fresh", label: "Fresh water", rho: 1000, ref: "≈ 1000 kg/m³, standard reference value." },
  { id: "sea", label: "Sea water", rho: 1025, ref: "≈ 1025 kg/m³, typical ocean-surface value." },
  { id: "oil", label: "Vegetable oil", rho: 920, ref: "≈ 920 kg/m³, typical value." },
  { id: "mercury", label: "Mercury", rho: 13546, ref: "≈ 13 546 kg/m³ at room temperature." },
];

const DEFAULTS = { objectDensity: 600, volumeL: 20, fluid: "fresh", g: 9.81 };

export default function Buoyancy() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const touch = () => {
    if (!touched.current) {
      touched.current = true;
      recordExperiment("buoyancy", "Ran Buoyancy Lab");
    }
  };

  const fluid = FLUIDS.find((f) => f.id === s.fluid);
  const res = buoyancy({
    objectDensity: s.objectDensity,
    volume: s.volumeL / 1000,
    fluidDensity: fluid.rho,
    g: s.g,
  });
  // Auto-updating sweep: equilibrium submerged fraction vs object density in the current fluid.
  const chartData = sweep(100, 3000, 58, (rho) => ({ frac: Math.min(1, rho / fluid.rho) * 100 }));
  const set = (k) => (v) => {
    touch();
    setS((p) => ({ ...p, [k]: v }));
  };

  return (
    <ExperimentShell
      title="Buoyancy Lab"
      tagline="F_b = ρ_fluid · V_displaced · g"
      intro="Drop an object into a fluid and watch what equilibrium it finds. Archimedes' principle says the fluid pushes back with a force equal to the weight of fluid pushed aside — so whether something floats depends on densities, not on weight alone."
      assumptions={[
        "The fluid is incompressible and of uniform density.",
        "The object is rigid and homogeneous, so its average density is well defined.",
        "Surface tension and viscous drag are neglected — only F_b and weight act.",
        "F_b depends on the fluid density and the displaced volume, not on the object's total weight alone.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          A floating object sinks until it displaces exactly its own weight of fluid, so{" "}
          <span className="font-mono text-cyan-400">F_b = W</span> and the submerged fraction is{" "}
          <span className="font-mono text-cyan-400">ρ_obj/ρ_fluid</span> — a pure density ratio. Denser fluid gives
          more buoyant force per displaced volume, so the same object rides higher in sea water than in oil. If the
          object's density exceeds the fluid's, even full submersion cannot produce enough force, and it sinks with{" "}
          <span className="font-mono text-cyan-400">F_b = ρ_fluid·V·g &lt; W</span>.
        </p>
      }
      predict={{
        experimentId: "buoyancy",
        label: "Buoyancy Lab",
        question: "An object floats in fresh water. You move it into sea water, which is slightly denser. While it keeps floating, the buoyant force on it…",
        options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
        correctIndex: 2,
        explanation:
          "A floating object always displaces exactly its own weight of fluid, so F_b = W in both fluids — unchanged. The denser sea water only reduces the submerged fraction, so the object rides slightly higher.",
        computeComparison: () => {
          const ro = s.objectDensity;
          return {
            beforeLabel: "In fresh water (1000 kg/m³)",
            before: `${fmt(Math.min(1, ro / 1000) * 100)}% submerged`,
            afterLabel: "In sea water (1025 kg/m³)",
            after: `${fmt(Math.min(1, ro / 1025) * 100)}% submerged`,
          };
        },
      }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Fluid</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FLUIDS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                touch();
                setS((p) => ({ ...p, fluid: f.id }));
              }}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                s.fluid === f.id
                  ? "border-orange-500 bg-orange-500/15 text-orange-300"
                  : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          ρ_fluid = {fmt(fluid.rho)} kg/m³ — {fluid.ref}
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
          <ControlSlider label="Object density ρ_obj" value={s.objectDensity} onChange={set("objectDensity")} min={100} max={3000} step={10} unit="kg/m³" error={res.errors?.objectDensity} />
          <ControlSlider label="Object volume V" value={s.volumeL} onChange={set("volumeL")} min={1} max={100} step={1} unit="L" error={res.errors?.volume} />
          <ControlSlider label="Gravitational acceleration g" value={s.g} onChange={set("g")} min={1.6} max={25} step={0.01} unit="m/s²" error={res.errors?.g} />
        </div>
        <BuoyancyViz res={res.valid ? res : null} fluidLabel={fluid.label} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <Stat label="Object weight W" value={res.valid ? fmt(res.weight) : "—"} unit="N" accent="orange" />
        <Stat label="Buoyant force F_b" value={res.valid ? fmt(res.buoyantForce) : "—"} unit="N" accent="cyan" />
        <Stat label="Max F_b (fully submerged)" value={res.valid ? fmt(res.maxBuoyantForce) : "—"} unit="N" />
        <Stat label="Submerged fraction" value={res.valid ? `${fmt(res.submergedFraction * 100, 3)}%` : "—"} unit="" />
        <Stat label="Displaced volume" value={res.valid ? fmt(res.displacedVolume * 1000) : "—"} unit="L" accent="cyan" />
      </div>

      <ExperimentChart
        title="Submerged fraction vs object density — updates with your inputs"
        note={`Model curve in your current fluid (${fluid.label}, ρ = ${fmt(fluid.rho)} kg/m³): floating objects submerge exactly ρ_obj/ρ_fluid of their volume, and the curve flattens at 100% where objects sink. The dashed marker is your current object.`}
        xLabel="Object density ρ (kg/m³)"
        xMarker={Number.isFinite(s.objectDensity) ? s.objectDensity : undefined}
        data={chartData}
        series={[{ key: "frac", name: "Submerged fraction (%)", color: "#22d3ee" }]}
      />

      <AssessmentPanel experimentId="buoyancy" />
    </ExperimentShell>
  );
}
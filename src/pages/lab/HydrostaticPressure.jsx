import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { hydrostatic, P_ATM } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import { cn } from "@/lib/utils";

const FLUIDS = [
  { id: "fresh", label: "Fresh water", rho: 1000 },
  { id: "sea", label: "Sea water", rho: 1025 },
  { id: "oil", label: "Crude oil", rho: 870 },
  { id: "mercury", label: "Mercury", rho: 13546 },
];

const DEFAULTS = { fluid: "fresh", depth: 10, area: 1, g: 9.81 };

/** Tank with a depth marker and the pressure at that depth. */
function TankViz({ s, res, maxDepthM = 40 }) {
  const H = 210, topY = 22, botY = 188;
  const surfY = topY + 10;
  const frac = Math.min(1, Math.max(0, s.depth / maxDepthM));
  const dY = surfY + frac * (botY - surfY);
  return (
    <svg viewBox="0 0 420 210" className="w-full" role="img" aria-label="Tank of fluid with a depth marker">
      <rect x="90" y={surfY} width="240" height={botY - surfY} fill="currentColor" className="text-cyan-500" opacity="0.16" />
      <line x1="90" y1={surfY} x2="330" y2={surfY} stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d={`M 90 ${topY} L 90 ${botY} L 330 ${botY} L 330 ${topY}`} fill="none" stroke="currentColor" className="text-border" strokeWidth="4" />
      <line x1="150" y1={dY} x2="290" y2={dY} stroke="currentColor" className="text-orange-400" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx={210} cy={dY} r="5" fill="currentColor" className="text-orange-500" />
      <text x="214" y={dY - 10} fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
        h = {fmt(s.depth, 4)} m
      </text>
      <text x="338" y={dY + 4} fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        P = {res?.valid ? fmt(res.pGauge / 1000) : "—"} kPa gauge
      </text>
      <text x="96" y={surfY - 6} fontSize="10" fill="currentColor" className="text-muted-foreground">surface (P = P_atm = 101.3 kPa absolute)</text>
      <text x="210" y={botY - 8} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        bottom: P_abs = {res?.valid ? fmt(res.pAbs / 1000) : "—"} kPa
      </text>
    </svg>
  );
}

export default function HydrostaticPressure() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("hydrostatic", "Ran Hydrostatic Pressure Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const fluid = FLUIDS.find((f) => f.id === s.fluid);
  const res = hydrostatic({ rho: fluid.rho, depth: s.depth, area: s.area, g: s.g });
  const chartData = sweep(0, 40, 40, (d) => {
    const r = hydrostatic({ rho: fluid.rho, depth: d, area: s.area, g: s.g });
    return r.valid ? { P: r.pGauge / 1000 } : null;
  });

  return (
    <ExperimentShell
      title="Hydrostatic Pressure"
      tagline="P = ρ·g·h (gauge) · P_abs = P_atm + ρgh · F = P·A"
      intro="Dive down and the water stacks weight on your shoulders: every metre of depth adds the same ρgh of pressure, regardless of the tank's shape or total volume. This is why dams are thick at the bottom and why your ears pop by 10 metres."
      assumptions={[
        "The fluid is static (no flow) and incompressible with uniform density.",
        "Pressure at one depth acts equally in all directions (Pascal's principle).",
        "The surface is open to the atmosphere (P_atm = 101.3 kPa).",
        "The area force assumes the whole area sits at the stated depth.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Pressure at depth is just the weight of the fluid column above divided by area:{" "}
          <span className="font-mono text-cyan-400">P = ρgh</span>. It grows linearly with depth and cares about
          density alone — mercury stacks pressure 13× faster than water. Add the atmosphere on top and you get
          absolute pressure. Only the <em>gauge</em> part pushes walls outward, and the total force on a surface
          is simply <span className="font-mono text-cyan-400">F = P·A</span> — big, deeply submerged gates feel
          enormous loads.
        </p>
      }
      predict={{ experimentId: "hydrostatic", label: "Hydrostatic Pressure", pre: PREDICTIONS.hydrostatic.pre, post: PREDICTIONS.hydrostatic.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Fluid</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FLUIDS.map((f) => (
            <button
              key={f.id}
              onClick={() => { if (!touched.current) { touched.current = true; recordExperiment("hydrostatic", "Ran Hydrostatic Pressure Lab"); } setS((p) => ({ ...p, fluid: f.id })); }}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                s.fluid === f.id ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">ρ = {fmt(fluid.rho)} kg/m³ — standard reference density.</div>
      </div>

      <ErrorList errors={res.errors} />

      <VizPanel title="Tank schematic (not to scale)">
        <TankViz s={s} res={res.valid ? res : null} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        <ControlSlider label="Depth h" value={s.depth} onChange={set("depth")} min={0} max={40} step={0.5} unit="m" error={res.errors?.depth} help="Every 10 m of water ≈ 1 extra atmosphere." />
        <ControlSlider label="Surface area A (e.g. gate)" value={s.area} onChange={set("area")} min={0.1} max={5} step={0.1} unit="m²" error={res.errors?.area} />
        <ControlSlider label="Gravity g" value={s.g} onChange={set("g")} min={1.6} max={24.8} step={0.01} unit="m/s²" error={res.errors?.g} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Gauge pressure ρgh" value={res.valid ? fmt(res.pGauge / 1000) : "—"} unit="kPa" accent="orange" />
        <Stat label="Absolute pressure" value={res.valid ? fmt(res.pAbs / 1000) : "—"} unit="kPa" accent="cyan" />
        <Stat label={`Force on A = ${fmt(s.area)} m²`} value={res.valid ? fmt(res.force / 1000) : "—"} unit="kN" />
        <Stat label="Atmospheric reference" value={fmt(P_ATM / 1000, 5)} unit="kPa" />
      </div>

      <ExperimentChart
        title="Gauge pressure vs depth — updates with your inputs"
        note={`Model curve P = ρgh in your current fluid (ρ = ${fmt(fluid.rho)} kg/m³, g = ${fmt(s.g, 4)} m/s²). The straight line is the tell: pressure grows linearly with depth. The dashed marker is your current depth.`}
        xLabel="Depth h (m)"
        xMarker={Number.isFinite(s.depth) ? s.depth : undefined}
        data={chartData}
        series={[{ key: "P", name: "Gauge pressure P (kPa)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
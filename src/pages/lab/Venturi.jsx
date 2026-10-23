import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { pipeFlow } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";

const DEFAULTS = { d1cm: 10, d2cm: 4, qLps: 10, rho: 1000, g: 9.81 };

/** Pipe with a contraction and two manometer tubes showing the level difference. */
function VenturiViz({ s, res }) {
  const W = 420, H = 210;
  const yc = 150, h1 = Math.max(6, Math.min(30, s.d1cm * 2.2)), h2 = Math.max(5, Math.min(30, s.d2cm * 2.2));
  const t1 = yc - h1, b1 = yc + h1, t2 = yc - h2, b2 = yc + h2;
  // manometer columns: reference height + level drop from the pressure difference
  const colTop = 24;
  const scale = 14; // px per metre of Δh (clamped)
  const dhPx = Math.max(-70, Math.min(70, res.valid ? ((res.p1 - res.p2) / (s.rho * s.g)) * scale : 0));
  const tubeX1 = 120, tubeX2 = 300;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Venturi tube with manometer tubes">
      <path d={`M 28 ${t1} L 150 ${t1} C 195 ${t1} 205 ${t2} 250 ${t2} L 392 ${t2}`} fill="none" stroke="currentColor" className="text-border" strokeWidth="3" />
      <path d={`M 28 ${b1} L 150 ${b1} C 195 ${b1} 205 ${b2} 250 ${b2} L 392 ${b2}`} fill="none" stroke="currentColor" className="text-border" strokeWidth="3" />
      {/* manometer tubes */}
      <line x1={tubeX1} y1={colTop} x2={tubeX1} y2={t1} stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
      <line x1={tubeX2} y1={colTop} x2={tubeX2} y2={t2} stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
      <rect x={tubeX1 - 5} y={colTop + 60} width="10" height={Math.max(4, (t1 - colTop) - 60 + 10)} fill="currentColor" className="text-cyan-500" opacity="0.7" />
      <rect x={tubeX2 - 5} y={colTop + 60 + Math.max(0, dhPx)} width="10" height={Math.max(4, (t2 - colTop) - 60 - Math.max(0, dhPx) + 10)} fill="currentColor" className="text-cyan-500" opacity="0.7" />
      <line x1={tubeX1} y1={colTop + 62} x2={tubeX2} y2={colTop + 62} stroke="currentColor" className="text-orange-400" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={(tubeX1 + tubeX2) / 2} y={colTop + 56} textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
        Δh = {res.valid ? fmt((res.p1 - res.p2) / (s.rho * s.g)) : "—"} m
      </text>
      <text x="88" y={b1 + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        v₁ = {res.valid ? fmt(res.v1) : "—"} m/s
      </text>
      <text x="340" y={t2 - 8} textAnchor="middle" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">
        v₂ = {res.valid ? fmt(res.v2) : "—"} m/s
      </text>
      <text x="210" y={H - 6} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground">
        Q = {fmt(s.qLps)} L/s constant · ΔP = ρ·g·Δh · tube levels schematic
      </text>
    </svg>
  );
}

export default function Venturi() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("venturi", "Ran Venturi & Continuity Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = pipeFlow({ d1: s.d1cm / 100, d2: s.d2cm / 100, flowRate: s.qLps / 1000, rho: s.rho, p1: 0, dz: 0 });
  const dP = res.valid ? res.p1 - res.p2 : null; // Pa, drop across the contraction
  const dh = res.valid && s.rho > 0 && s.g > 0 ? dP / (s.rho * s.g) : null;
  const chartData = sweep(1, 10, 36, (d2cm) => {
    const r = pipeFlow({ d1: s.d1cm / 100, d2: d2cm / 100, flowRate: s.qLps / 1000, rho: s.rho, p1: 0, dz: 0 });
    return r.valid && s.rho > 0 && s.g > 0 ? { h: (r.p1 - r.p2) / (s.rho * s.g) } : null;
  });

  return (
    <ExperimentShell
      title="Venturi & Continuity"
      tagline="Q = A₁v₁ = A₂v₂ · ΔP = ½ρ(v₂² − v₁²) = ρ·g·Δh"
      intro="A Venturi meter is Bernoulli made practical: force the flow through a throat, and the pressure drop across the contraction becomes a readable liquid-column height — a flow meter with no moving parts."
      assumptions={[
        "Incompressible, steady, non-viscous flow (ideal Bernoulli model).",
        "The pipe is horizontal (no elevation term).",
        "The manometer liquid is the same fluid, at rest in the tubes.",
        "Real meters include a discharge coefficient (< 1) for losses — this is the ideal value.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Continuity fixes the speed-up: with{" "}
          <span className="font-mono text-cyan-400">Q = A·v</span> constant, quartering the throat area quadruples
          v. Bernoulli converts that to a pressure drop{" "}
          <span className="font-mono text-cyan-400">ΔP = ½ρ(v₂² − v₁²)</span>, and a static column of the same
          fluid of height Δh produces exactly{" "}
          <span className="font-mono text-cyan-400">ρgΔh</span> of pressure — so the manometer literally displays
          ΔP as a height. Measure the height, recover the speeds, recover the flow rate.
        </p>
      }
      predict={{ experimentId: "venturi", label: "Venturi & Continuity", pre: PREDICTIONS.venturi.pre, post: PREDICTIONS.venturi.post }}
    >
      <ErrorList errors={res.errors} />

      <VizPanel title="Venturi meter schematic (tube levels illustrative)">
        <VenturiViz s={s} res={res} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
        <ControlSlider label="Wide diameter d₁" value={s.d1cm} onChange={set("d1cm")} min={4} max={20} step={0.5} unit="cm" error={res.errors?.d1} />
        <ControlSlider label="Throat diameter d₂" value={s.d2cm} onChange={set("d2cm")} min={1} max={12} step={0.5} unit="cm" error={res.errors?.d2} />
        <ControlSlider label="Volume flow rate Q" value={s.qLps} onChange={set("qLps")} min={1} max={40} step={1} unit="L/s" error={res.errors?.flowRate} />
        <ControlSlider label="Fluid density ρ" value={s.rho} onChange={set("rho")} min={600} max={2000} step={10} unit="kg/m³" error={res.errors?.rho} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Speed v₁ (wide)" value={res.valid ? fmt(res.v1) : "—"} unit="m/s" />
        <Stat label="Speed v₂ (throat)" value={res.valid ? fmt(res.v2) : "—"} unit="m/s" accent="cyan" />
        <Stat label="Pressure drop ΔP" value={res.valid ? fmt(dP / 1000) : "—"} unit="kPa" accent="orange" />
        <Stat label="Manometer height Δh" value={res.valid ? fmt(dh) : "—"} unit="m of fluid" accent="cyan" />
      </div>

      <ExperimentChart
        title="Manometer height vs throat diameter — updates with your inputs"
        note={`Model curve at your current Q = ${fmt(s.qLps)} L/s, ρ = ${fmt(s.rho)} kg/m³, d₁ = ${fmt(s.d1cm)} cm. Throttling the throat raises the reading fast (ΔP grows with v₂²); a throat wider than d₁ would read negative (pressure recovery). The dashed marker is your current d₂.`}
        xLabel="Throat diameter d₂ (cm)"
        xMarker={Number.isFinite(s.d2cm) ? s.d2cm : undefined}
        data={chartData}
        series={[{ key: "h", name: "Manometer Δh (m)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
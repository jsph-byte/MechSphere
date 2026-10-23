import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { torque, lever, G_DEFAULT } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";

const DEFAULTS = { r: 0.3, force: 80, angleDeg: 90, loadKg: 60, loadArmM: 0.5, effortArmM: 1.5 };

/** Balanced-beam schematic: load on the left arm, effort applied at the right arm. */
function LeverViz({ s, lev }) {
  const scale = 80; // px per metre
  const pivotX = 210, beamY = 84;
  const loadX = pivotX - s.loadArmM * scale;
  const effX = pivotX + s.effortArmM * scale;
  const effLen = 34 + Math.min(44, (lev?.valid ? lev.effortForce : 200) * 0.18);
  return (
    <svg viewBox="0 0 420 170" className="w-full" role="img" aria-label="Lever beam balanced on a pivot">
      <polygon points={`${pivotX},${beamY + 44} ${pivotX - 16},${beamY + 4} ${pivotX + 16},${beamY + 4}`} fill="currentColor" className="text-border" />
      <line x1={loadX - 26} y1={beamY} x2={effX + 26} y2={beamY} stroke="currentColor" className="text-foreground" strokeWidth="4" />
      <rect x={loadX - 18} y={beamY - 30} width="36" height="30" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
      <text x={loadX} y={beamY - 11} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{fmt(s.loadKg)} kg</text>
      <line x1={loadX} y1={beamY - 34} x2={loadX} y2={beamY - 48} stroke="currentColor" className="text-orange-400" strokeWidth="2" />
      <text x={loadX} y={beamY - 52} textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">load</text>
      <line x1={effX} y1={beamY - 6} x2={effX} y2={beamY - 6 - effLen} stroke="currentColor" className="text-cyan-400" strokeWidth="2.5" />
      <polygon points={`${effX},${beamY - 12 - effLen} ${effX - 5},${beamY - 4 - effLen} ${effX + 5},${beamY - 4 - effLen}`} fill="currentColor" className="text-cyan-400" />
      <text x={effX} y={beamY - 18 - effLen} textAnchor="middle" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">
        effort {lev?.valid ? fmt(lev.effortForce) : "—"} N
      </text>
      <text x={pivotX} y={beamY + 58} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        d_load = {fmt(s.loadArmM, 3)} m · d_effort = {fmt(s.effortArmM, 3)} m
      </text>
    </svg>
  );
}

export default function TorqueLevers() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("torque", "Ran Torque & Levers Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = torque({ r: s.r, force: s.force, angleDeg: s.angleDeg });
  const lev = lever({ loadKg: s.loadKg, loadArmM: s.loadArmM, effortArmM: s.effortArmM, g: G_DEFAULT });
  const chartData = sweep(0, 180, 36, (angle) => {
    const r = torque({ r: s.r, force: s.force, angleDeg: angle });
    return r.valid ? { tau: r.torque } : null;
  });

  return (
    <ExperimentShell
      title="Torque & Levers"
      tagline="τ = r·F·sinθ · balance: m₁·d₁ = m₂·d₂"
      intro="Force gets things moving in a line; torque gets things spinning. It depends on where you push and at what angle — which is why door handles live far from the hinges and wrenches are long. A lever is just torque balance with a payload."
      assumptions={[
        "Torque is measured about a single pivot point.",
        "The beam is rigid, straight, and its own weight is ignored.",
        "Angle θ is measured between the lever arm and the force direction.",
        "Lever balance assumes both forces act vertically on a horizontal beam.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-cyan-400">τ = r·F·sinθ</span> rewards geometry: pushing perpendicular
          (sin 90° = 1) gives every newton its full rotational worth, while pushing along the arm does nothing. A
          lever balances when the two torques about the pivot cancel —{" "}
          <span className="font-mono text-cyan-400">load·d_load = effort·d_effort</span> — so moving the pivot
          closer to the load buys mechanical advantage. That single equation is a crowbar, a wheelbarrow, and a
          seesaw at once.
        </p>
      }
      predict={{ experimentId: "torque", label: "Torque & Levers", pre: PREDICTIONS.torque.pre, post: PREDICTIONS.torque.post }}
    >
      <ErrorList errors={res.errors} />

      <VizPanel title="Balanced lever (beam weight ignored)">
        <LeverViz s={s} lev={lev.valid ? lev : null} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-3">
        <ControlSlider label="Lever arm r (torque calc)" value={s.r} onChange={set("r")} min={0.05} max={2} step={0.05} unit="m" error={res.errors?.r} />
        <ControlSlider label="Applied force F" value={s.force} onChange={set("force")} min={0} max={300} step={5} unit="N" error={res.errors?.force} />
        <ControlSlider label="Angle θ between arm & force" value={s.angleDeg} onChange={set("angleDeg")} min={0} max={180} step={1} unit="°" error={res.errors?.angleDeg} />
        <ControlSlider label="Lever load mass" value={s.loadKg} onChange={set("loadKg")} min={1} max={200} step={1} unit="kg" error={lev.errors?.loadKg} />
        <ControlSlider label="Load distance from pivot" value={s.loadArmM} onChange={set("loadArmM")} min={0.1} max={2} step={0.05} unit="m" error={lev.errors?.loadArmM} />
        <ControlSlider label="Effort distance from pivot" value={s.effortArmM} onChange={set("effortArmM")} min={0.1} max={3} step={0.05} unit="m" error={lev.errors?.effortArmM} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <Stat label="Torque τ = rF sinθ" value={res.valid ? fmt(res.torque) : "—"} unit="N·m" accent="orange" />
        <Stat label="Perpendicular force F·sinθ" value={res.valid ? fmt(res.component) : "—"} unit="N" accent="cyan" />
        <Stat label="Load weight m·g" value={lev.valid ? fmt(lev.loadWeight) : "—"} unit="N" />
        <Stat label="Effort force needed" value={lev.valid ? fmt(lev.effortForce) : "—"} unit="N" accent="cyan" />
        <Stat label="Mechanical advantage" value={lev.valid ? fmt(lev.mechanicalAdvantage) : "—"} unit="×" accent="orange" />
      </div>

      <ExperimentChart
        title="Torque vs force angle — updates with your inputs"
        note={`Model curve τ = r·F·sinθ at your current r = ${fmt(s.r, 3)} m and F = ${fmt(s.force)} N. Torque peaks at 90° and returns to zero pushing along the arm (0° or 180°); the dashed marker is your current angle.`}
        xLabel="Angle θ (°)"
        xMarker={Number.isFinite(s.angleDeg) ? s.angleDeg : undefined}
        data={chartData}
        series={[{ key: "tau", name: "Torque τ (N·m)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
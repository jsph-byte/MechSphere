import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { workEnergy } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";

const DEFAULTS = { force: 100, angleDeg: 30, distance: 5, mass: 20, time: 10 };

/** Crate pulled by a force at an angle, over a displacement. */
function WorkViz({ s, res }) {
  const th = (s.angleDeg * Math.PI) / 180;
  const fx = 90, fy = 96, len = 62;
  const tipX = fx + len * Math.cos(th);
  const tipY = fy - len * Math.sin(th);
  return (
    <svg viewBox="0 0 420 160" className="w-full" role="img" aria-label="Crate pulled along the ground by an angled force">
      <line x1="16" y1="112" x2="404" y2="112" stroke="currentColor" className="text-border" strokeWidth="3" />
      <rect x={fx} y={fy - 26} width="52" height="26" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
      <line x1={fx + 26} y1={fy - 26} x2={tipX + (fx + 26 - tipX) * -1} y2={tipY - 8} stroke="currentColor" className="text-cyan-400" strokeWidth="0" />
      <line x1={fx + 26} y1={fy - 26} x2={tipX} y2={tipY} stroke="currentColor" className="text-cyan-400" strokeWidth="2.5" />
      <polygon points={`${tipX + 6},${tipY} ${tipX - 7},${tipY - 4} ${tipX - 4},${tipY + 7}`} fill="currentColor" className="text-cyan-400" />
      <text x={tipX + 8} y={tipY - 4} fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">F = {fmt(s.force)} N</text>
      <text x={fx + 26} y={fy + 4} textAnchor="middle" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">θ = {fmt(s.angleDeg, 3)}°</text>
      <line x1={110} y1={140} x2={330} y2={140} stroke="currentColor" className="text-orange-400" strokeWidth="2.5" strokeDasharray="8 5" />
      <polygon points={`340,140 328,134 328,146`} fill="currentColor" className="text-orange-400" />
      <text x={225} y={156} textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
        d = {fmt(s.distance)} m → W = F·d·cosθ = {res?.valid ? fmt(res.work) : "—"} J
      </text>
    </svg>
  );
}

export default function WorkEnergy() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("work", "Ran Work, Energy & Power Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = workEnergy(s);
  const chartData = sweep(0, 90, 30, (angle) => {
    const r = workEnergy({ ...s, angleDeg: angle });
    return r.valid ? { W: r.work } : null;
  });

  return (
    <ExperimentShell
      title="Work, Energy & Power"
      tagline="W = F·d·cosθ · W = ΔKE · P = W/t"
      intro="Work is force that actually gets something moving: only the component along the displacement counts, which is why the angle matters. All the work you put into a freely-moving object becomes kinetic energy — and power tells you how fast you did it."
      assumptions={[
        "The force is constant in magnitude and direction over the displacement.",
        "Friction and other resisting forces are ignored in the work→speed conversion.",
        "The object starts from rest in the speed calculation.",
        "Power is the average over the chosen duration.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-cyan-400">W = F·d·cosθ</span> multiplies three honest witnesses of
          motion: how hard you push, how far it goes, and how much of the push points along the path. At 90° the
          cosine is zero — a perpendicular force does no work at all (carrying a box horizontally does no work
          against gravity). If nothing resists, every joule of work becomes{" "}
          <span className="font-mono text-cyan-400">½mv²</span> of kinetic energy, and{" "}
          <span className="font-mono text-cyan-400">P = W/t</span> measures the delivery rate — the same joule
          can be spent in a second or an hour, with very different power.
        </p>
      }
      predict={{ experimentId: "work", label: "Work, Energy & Power", pre: PREDICTIONS.work.pre, post: PREDICTIONS.work.post }}
    >
      <ErrorList errors={res.errors} />

      <VizPanel title="Force, displacement, and the angle between them">
        <WorkViz s={s} res={res} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-5">
        <ControlSlider label="Force F" value={s.force} onChange={set("force")} min={0} max={500} step={5} unit="N" error={res.errors?.force} />
        <ControlSlider label="Angle θ to displacement" value={s.angleDeg} onChange={set("angleDeg")} min={0} max={90} step={1} unit="°" error={res.errors?.angleDeg} />
        <ControlSlider label="Distance d" value={s.distance} onChange={set("distance")} min={0} max={20} step={0.5} unit="m" error={res.errors?.distance} />
        <ControlSlider label="Object mass m" value={s.mass} onChange={set("mass")} min={0.5} max={100} step={0.5} unit="kg" error={res.errors?.mass} />
        <ControlSlider label="Time t" value={s.time} onChange={set("time")} min={0.5} max={60} step={0.5} unit="s" error={res.errors?.time} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Stat label="Work done W" value={res.valid ? fmt(res.work) : "—"} unit="J" accent="orange" />
        <Stat label="Average power P = W/t" value={res.valid ? fmt(res.power) : "—"} unit="W" accent="cyan" />
        <Stat label="Speed if all W → KE" value={res.valid ? fmt(res.speedFromWork) : "—"} unit="m/s" />
      </div>

      <ExperimentChart
        title="Work vs pull angle — updates with your inputs"
        note={`Model curve W = F·d·cosθ at your current F = ${fmt(s.force)} N and d = ${fmt(s.distance)} m. The cosine falls from full value at 0° to zero at 90° — the dashed marker is your current angle.`}
        xLabel="Angle θ (°)"
        xMarker={Number.isFinite(s.angleDeg) ? s.angleDeg : undefined}
        data={chartData}
        series={[{ key: "W", name: "Work W (J)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
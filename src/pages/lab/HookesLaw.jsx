import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { spring } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";

const DEFAULTS = { k: 200, x: 0.15, mass: 1 };

/** Wall + spring + mass, drawn stretched or compressed by x (exaggerated scale). */
function SpringViz({ s, res }) {
  const px = Math.max(-160, Math.min(160, s.x * 800)); // exaggerate for visibility
  const anchorX = 60;
  const massX = anchorX + 60 + px;
  const segs = 8;
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const fx = anchorX + ((60 + px) * i) / segs;
    pts.push(`${fx},${i % 2 === 0 ? 78 : 66}`);
  }
  return (
    <svg viewBox="0 0 420 160" className="w-full" role="img" aria-label="Spring anchored to a wall with a stretched mass">
      <rect x={anchorX - 14} y="50" width="14" height="44" fill="currentColor" className="text-border" />
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="2.5" />
      <rect x={massX} y="58" width="44" height="28" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
      <text x={massX + 22} y={77} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{fmt(s.mass)} kg</text>
      <line x1={massX + 22} y1={96} x2={massX + 22 + Math.sign(px || 1) * 30} y2={96} stroke="currentColor" className="text-orange-400" strokeWidth="2" />
      <polygon points={`${massX + 22 + Math.sign(px || 1) * 38},96 ${massX + 22 + Math.sign(px || 1) * 28},92 ${massX + 22 + Math.sign(px || 1) * 28},100`} fill="currentColor" className="text-orange-400" />
      <text x={massX + 22 + Math.sign(px || 1) * 20} y={112} textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
        F = {res?.valid ? fmt(res.force) : "—"} N
      </text>
      <text x="16" y="24" fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        x = {fmt(s.x, 3)} m (drawing exaggerated) · U = ½kx² = {res?.valid ? fmt(res.energy) : "—"} J
      </text>
    </svg>
  );
}

export default function HookesLaw() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("spring", "Ran Hooke's Law Springs Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = spring(s);
  const chartData = sweep(-0.4, 0.4, 40, (x) => {
    const r = spring({ ...s, x });
    return r.valid ? { F: r.force, U: r.energy } : null;
  });

  return (
    <ExperimentShell
      title="Hooke's Law Springs"
      tagline="F = k·x · U = ½k·x² · f = (1/2π)·√(k/m)"
      intro="Pull a spring twice as far and it pulls back twice as hard — until you exceed its elastic limit. The same law powers car suspensions, door hinges, and every mass-on-a-spring oscillation in physics."
      assumptions={[
        "The spring is linear (Hooke's law) within the modelled range.",
        "No energy is lost to friction or internal heating.",
        "The spring's own mass is negligible compared with the attached mass.",
        "x is measured from the natural (unstretched) length; stretch positive, compression negative.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-cyan-400">F = k·x</span> is a restoring force: it always points back
          toward equilibrium, and doubling the displacement doubles it. Because force grows linearly, the work
          you store is the <em>average</em> force times the distance —{" "}
          <span className="font-mono text-cyan-400">U = ½kx²</span> — so energy grows with the square of the
          stretch. Attach a mass and the same restoring law produces simple harmonic motion at{" "}
          <span className="font-mono text-cyan-400">f = (1/2π)√(k/m)</span>: stiff springs run fast, heavy masses
          run slow.
        </p>
      }
      predict={{ experimentId: "spring", label: "Hooke's Law Springs", pre: PREDICTIONS.spring.pre, post: PREDICTIONS.spring.post }}
    >
      <ErrorList errors={res.errors} />

      <VizPanel title="Spring schematic (displacement exaggerated for visibility)">
        <SpringViz s={s} res={res} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        <ControlSlider label="Spring constant k" value={s.k} onChange={set("k")} min={10} max={500} step={5} unit="N/m" error={res.errors?.k} help="Soft car spring ≈ 20 000 N/m — toys are in the hundreds." />
        <ControlSlider label="Displacement x (+ stretch, − compress)" value={s.x} onChange={set("x")} min={-0.4} max={0.4} step={0.01} unit="m" error={res.errors?.x} />
        <ControlSlider label="Attached mass m" value={s.mass} onChange={set("mass")} min={0.1} max={5} step={0.1} unit="kg" error={res.errors?.mass} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Spring force F = k·x" value={res.valid ? fmt(res.force) : "—"} unit="N" accent="orange" />
        <Stat label="Stored energy U = ½kx²" value={res.valid ? fmt(res.energy) : "—"} unit="J" accent="cyan" />
        <Stat label="Oscillation frequency f" value={res.valid ? fmt(res.freq, 4) : "—"} unit="Hz" />
        <Stat label="Oscillation period T = 1/f" value={res.valid ? fmt(res.period, 4) : "—"} unit="s" />
      </div>

      <ExperimentChart
        title="Force & stored energy vs displacement — updates with your inputs"
        note={`Model curves at your current k = ${fmt(s.k)} N/m. Force is linear in x; energy U = ½kx² is the parabola — doubling the stretch quadruples the stored energy. The dashed marker is your current x.`}
        xLabel="Displacement x (m)"
        xMarker={Number.isFinite(s.x) ? s.x : undefined}
        data={chartData}
        series={[
          { key: "F", name: "Force F (N)", color: "#f97316" },
          { key: "U", name: "Energy U (J)", color: "#22d3ee" },
        ]}
      />
    </ExperimentShell>
  );
}
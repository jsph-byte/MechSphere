import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { circuit } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import { cn } from "@/lib/utils";

const DEFAULTS = { mode: "series", voltage: 12, r1: 10, r2: 20 };

/** Simple DC circuit schematic: battery + two resistors (series or parallel). */
function CircuitViz({ s, res }) {
  const resistor = (x, y, w, label, pw) => (
    <g>
      <rect x={x} y={y - 9} width={w} height="18" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
      <text x={x + w / 2} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{label}</text>
      <text x={x + w / 2} y={y - 15} textAnchor="middle" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">{pw}</text>
    </g>
  );
  const battery = (x, y) => (
    <g>
      <line x1={x - 6} y1={y - 14} x2={x + 6} y2={y - 14} stroke="currentColor" className="text-foreground" strokeWidth="3" />
      <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="currentColor" className="text-foreground" strokeWidth="3" />
      <text x={x} y={y + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" className="text-foreground font-mono">{fmt(s.voltage, 3)} V</text>
    </g>
  );
  const wire = "text-border";
  return (
    <svg viewBox="0 0 420 210" className="w-full" role="img" aria-label="DC circuit schematic">
      {s.mode === "series" ? (
        <>
          <rect x="60" y="30" width="300" height="150" fill="none" stroke="currentColor" className={wire} strokeWidth="2.5" />
          {battery(60, 105)}
          <line x1="60" y1="30" x2="60" y2="105" stroke="currentColor" className={wire} strokeWidth="2.5" />
          <line x1="60" y1="105" x2="60" y2="180" stroke="currentColor" className={wire} strokeWidth="2.5" />
          {resistor(130, 30, 60, `${fmt(s.r1)} Ω`, res?.valid ? `${fmt(res.p1, 3)} W` : "")}
          {resistor(230, 30, 60, `${fmt(s.r2)} Ω`, res?.valid ? `${fmt(res.p2, 3)} W` : "")}
          <text x="210" y="196" textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
            I = {res?.valid ? fmt(res.current, 4) : "—"} A (same everywhere in series)
          </text>
        </>
      ) : (
        <>
          <line x1="80" y1="40" x2="340" y2="40" stroke="currentColor" className={wire} strokeWidth="2.5" />
          <line x1="80" y1="180" x2="340" y2="180" stroke="currentColor" className={wire} strokeWidth="2.5" />
          <line x1="80" y1="40" x2="80" y2="180" stroke="currentColor" className={wire} strokeWidth="0" />
          {battery(80, 110)}
          <line x1="80" y1="40" x2="80" y2="96" stroke="currentColor" className={wire} strokeWidth="2.5" />
          <line x1="80" y1="124" x2="80" y2="180" stroke="currentColor" className={wire} strokeWidth="2.5" />
          <line x1="160" y1="40" x2="160" y2="180" stroke="currentColor" className={wire} strokeWidth="2.5" />
          <line x1="280" y1="40" x2="280" y2="180" stroke="currentColor" className={wire} strokeWidth="2.5" />
          {resistor(160, 90, 0, "", "")}
          {resistor(155, 100, 10, fmt(s.r1), res?.valid ? "" : "")}
          <rect x="152" y="85" width="16" height="50" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
          <text x="160" y="113" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" transform="rotate(90 160 110)">{fmt(s.r1)} Ω</text>
          <rect x="272" y="85" width="16" height="50" rx="3" fill="currentColor" className="text-orange-500" opacity="0.85" />
          <text x="280" y="113" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" transform="rotate(90 280 110)">{fmt(s.r2)} Ω</text>
          <text x="160" y="70" textAnchor="middle" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">{res?.valid ? `${fmt(res.p1, 3)} W` : ""}</text>
          <text x="280" y="70" textAnchor="middle" fontSize="10" fill="currentColor" className="text-cyan-400 font-mono">{res?.valid ? `${fmt(res.p2, 3)} W` : ""}</text>
          <text x="210" y="198" textAnchor="middle" fontSize="10" fill="currentColor" className="text-orange-400 font-mono">
            V = {fmt(s.voltage, 3)} V across each branch (parallel)
          </text>
        </>
      )}
    </svg>
  );
}

export default function OhmsLaw() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("ohm", "Ran Ohm's Law Circuits Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = circuit(s);
  const chartData = sweep(1, 24, 46, (v) => {
    const r = circuit({ ...s, voltage: v });
    return r.valid ? { I: r.current } : null;
  });

  return (
    <ExperimentShell
      title="Ohm's Law Circuits"
      tagline="V = I·R · series R = R₁+R₂ · parallel R = R₁R₂/(R₁+R₂) · P = VI"
      intro="One battery, two resistors, two ways to connect them. In series the current fights both resistances in turn; in parallel each resistor gets the full voltage and the currents add. Flip the mode and watch the same parts behave completely differently."
      assumptions={[
        "Ideal battery and wires (no internal resistance).",
        "Resistors obey Ohm's law (constant R, temperature-independent).",
        "Steady DC — no transients, capacitance, or inductance.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-cyan-400">V = I·R</span> links the battery's push to the flow it
          produces. Series connections stack resistance (
          <span className="font-mono text-cyan-400">R₁ + R₂</span>) because the same current squeezes through
          both; parallel connections split the current across branches and the total resistance drops below the
          smaller resistor. Power{" "}
          <span className="font-mono text-cyan-400">P = V·I = I²R</span> is what turns into heat — check which
          resistor runs hotter in each mode.
        </p>
      }
      predict={{ experimentId: "ohm", label: "Ohm's Law Circuits", pre: PREDICTIONS.ohm.pre, post: PREDICTIONS.ohm.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Connection mode</div>
        <div className="grid grid-cols-2 gap-2">
          {["series", "parallel"].map((m) => (
            <button
              key={m}
              onClick={() => { if (!touched.current) { touched.current = true; recordExperiment("ohm", "Ran Ohm's Law Circuits Lab"); } setS((p) => ({ ...p, mode: m })); }}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold capitalize transition-colors",
                s.mode === m ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <VizPanel title="Circuit schematic (ideal battery and wires)">
        <CircuitViz s={s} res={res.valid ? res : null} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        <ControlSlider label="Battery voltage V" value={s.voltage} onChange={set("voltage")} min={1} max={24} step={0.5} unit="V" error={res.errors?.voltage} />
        <ControlSlider label="Resistance R₁" value={s.r1} onChange={set("r1")} min={1} max={100} step={1} unit="Ω" error={res.errors?.r1} />
        <ControlSlider label="Resistance R₂" value={s.r2} onChange={set("r2")} min={1} max={100} step={1} unit="Ω" error={res.errors?.r2} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <Stat label={`Total resistance (${s.mode})`} value={res.valid ? fmt(res.rTotal) : "—"} unit="Ω" accent="cyan" />
        <Stat label="Current I = V/R" value={res.valid ? fmt(res.current, 4) : "—"} unit="A" accent="orange" />
        <Stat label="Total power P = VI" value={res.valid ? fmt(res.totalPower) : "—"} unit="W" accent="orange" />
        <Stat label="Power in R₁" value={res.valid ? fmt(res.p1, 4) : "—"} unit="W" />
        <Stat label="Power in R₂" value={res.valid ? fmt(res.p2, 4) : "—"} unit="W" />
      </div>

      <ExperimentChart
        title="Current vs battery voltage — updates with your inputs"
        note={`Model curve I = V/R at your current ${s.mode} resistance (R = ${res.valid ? fmt(res.rTotal) : "—"} Ω). Ohm's law is a straight line through the origin; the dashed marker is your current voltage.`}
        xLabel="Battery voltage V (V)"
        xMarker={Number.isFinite(s.voltage) ? s.voltage : undefined}
        data={chartData}
        series={[{ key: "I", name: "Current I (A)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
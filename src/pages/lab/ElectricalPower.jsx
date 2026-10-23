import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { electricEnergy } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";

const DEFAULTS = { voltage: 230, current: 2, hours: 8, rate: 12 };

const PRESETS = [
  { id: "ac", label: "Air conditioner (1.5 kW ≈ 230 V × 6.5 A)", voltage: 230, current: 6.5, hours: 8 },
  { id: "fridge", label: "Refrigerator (≈ 230 V × 0.5 A, always on)", voltage: 230, current: 0.5, hours: 24 },
  { id: "bulb", label: "LED bulb (≈ 230 V × 0.03 A, evenings)", voltage: 230, current: 0.03, hours: 5 },
  { id: "kettle", label: "Electric kettle (≈ 230 V × 9 A, 0.25 h/day)", voltage: 230, current: 9, hours: 0.25 },
];

/** Simple usage meters for power and daily energy. */
function MeterViz({ res, s }) {
  const powerFrac = Math.min(100, (res.valid ? res.powerW : 0) / 2200);
  const energyFrac = Math.min(100, (res.valid ? res.energyKwh : 0) / 25);
  const meter = (label, frac, valueText, color) => (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={`font-mono text-xs font-semibold ${color}`}>{valueText}</span>
      </div>
      <div className="h-3.5 overflow-hidden rounded-full bg-border/60">
        <div className={`h-full rounded-full ${color === "text-orange-400" ? "bg-orange-500/85" : "bg-cyan-500/85"}`} style={{ width: `${Math.max(2, frac)}%` }} />
      </div>
    </div>
  );
  return (
    <div className="space-y-4 py-1">
      {meter("Power draw (scale 0–2.2 kW)", powerFrac, res.valid ? `${fmt(res.powerW)} W` : "—", "text-orange-400")}
      {meter("Energy used (scale 0–25 kWh)", energyFrac, res.valid ? `${fmt(res.energyKwh)} kWh` : "—", "text-cyan-400")}
      <div className="text-[11px] leading-relaxed text-muted-foreground">
        Meters update with your inputs. Energy E = P × t: a kettle is powerful but brief, a fridge is weak but
        tireless — the daily kWh is what your meter bills.
      </div>
    </div>
  );
}

export default function ElectricalPower() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const touch = () => {
    if (!touched.current) { touched.current = true; recordExperiment("electricpower", "Ran Electrical Power & Energy Lab"); }
  };
  const set = (k) => (v) => { touch(); setS((p) => ({ ...p, [k]: v })); };

  const res = electricEnergy(s);
  const chartData = sweep(0.5, 24, 46, (h) => {
    const r = electricEnergy({ ...s, hours: h });
    return r.valid ? { E: r.energyKwh } : null;
  });

  return (
    <ExperimentShell
      title="Electrical Power & Energy"
      tagline="P = V·I · E = P·t (kWh) · cost = E × rate"
      intro="Every appliance is a power rating on a bill: watts now, kilowatt-hours over the month. Set the electrical demand and running time and see how the meter — and the cost — accumulate."
      assumptions={[
        "Constant power draw over the whole duration (no thermostats or duty cycling).",
        "Voltage and current are DC-equivalent (RMS) values.",
        "Cost uses your local rate per kWh; taxes and fixed charges are excluded.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-cyan-400">P = V·I</span> is the instantaneous drain; multiply by time
          and you get <span className="font-mono text-cyan-400">E = P·t</span> in kilowatt-hours — the unit your
          meter counts. Because energy = power × time, a 2000 W kettle for 6 minutes costs the same as a 10 W LED
          for 20 hours. Reducing a bill means cutting power, hours, or both.
        </p>
      }
      predict={{ experimentId: "electricpower", label: "Electrical Power & Energy", pre: PREDICTIONS.electricpower.pre, post: PREDICTIONS.electricpower.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Try an appliance</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => { touch(); setS((prev) => ({ ...prev, voltage: p.voltage, current: p.current, hours: p.hours })); }}
              className="rounded-lg border border-border bg-background px-2 py-2 text-left text-[11px] font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <VizPanel title="Usage meters (live)">
        <MeterViz res={res} s={s} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
        <ControlSlider label="Voltage V" value={s.voltage} onChange={set("voltage")} min={12} max={250} step={1} unit="V" error={res.errors?.voltage} />
        <ControlSlider label="Current I" value={s.current} onChange={set("current")} min={0.01} max={15} step={0.01} unit="A" error={res.errors?.current} />
        <ControlSlider label="Running time t" value={s.hours} onChange={set("hours")} min={0.5} max={24} step={0.25} unit="h" error={res.errors?.hours} />
        <ControlSlider label="Electricity rate" value={s.rate} onChange={set("rate")} min={0} max={30} step={0.1} unit="per kWh" error={res.errors?.ratePerKwh} help="Enter your local rate per kWh." />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Power P = V·I" value={res.valid ? fmt(res.powerW) : "—"} unit="W" accent="orange" />
        <Stat label="Same in kilowatts" value={res.valid ? fmt(res.powerW / 1000, 4) : "—"} unit="kW" />
        <Stat label={`Energy over ${fmt(s.hours, 3)} h`} value={res.valid ? fmt(res.energyKwh, 4) : "—"} unit="kWh" accent="cyan" />
        <Stat label="Cost at your rate" value={res.valid ? fmt(res.cost, 5) : "—"} unit="(rate × kWh)" accent="orange" />
      </div>

      <ExperimentChart
        title="Energy used vs running time — updates with your inputs"
        note={`Model curve E = P·t at your current draw (${res.valid ? fmt(res.powerW) : "—"} W). Every extra hour costs the same kWh — the dashed marker is your current running time.`}
        xLabel="Running time t (h)"
        xMarker={Number.isFinite(s.hours) ? s.hours : undefined}
        data={chartData}
        series={[{ key: "E", name: "Energy E (kWh)", color: "#22d3ee" }]}
      />
    </ExperimentShell>
  );
}
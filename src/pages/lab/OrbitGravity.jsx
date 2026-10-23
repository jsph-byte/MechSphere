import React, { useRef, useState } from "react";
import ExperimentShell, { Stat, ErrorList, VizPanel } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import { orbit, ORBIT_BODIES } from "@/lib/physics";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { PREDICTIONS } from "@/data/predictions";
import { cn } from "@/lib/utils";

const DEFAULTS = { body: "earth", altitudeKm: 400 };

/** Planet with a circular orbit and a satellite with its velocity arrow. */
function OrbitViz({ res, altitudeKm }) {
  const cx = 210, cy = 130, planetR = 46, orbitR = 105;
  const satX = cx + orbitR;
  const satY = cy;
  return (
    <svg viewBox="0 0 420 220" className="w-full" role="img" aria-label="Circular orbit around a planet">
      <circle cx={cx} cy={cy} r={planetR} fill="currentColor" className="text-cyan-600" opacity="0.7" />
      <circle cx={cx} cy={cy} r={planetR} fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="currentColor" className="text-muted-foreground" strokeWidth="1.5" strokeDasharray="5 5" />
      <line x1={cx} y1={cy} x2={satX} y2={satY} stroke="currentColor" className="text-border" strokeWidth="1" />
      <circle cx={satX} cy={satY} r="6" fill="currentColor" className="text-orange-500" />
      <line x1={satX} y1={satY} x2={satX + 40} y2={satY - 26} stroke="currentColor" className="text-orange-400" strokeWidth="2" />
      <polygon points={`${satX + 48},${satY - 31} ${satX + 36},${satY - 33} ${satX + 44},${satY - 21}`} fill="currentColor" className="text-orange-400" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{res?.bodyName || "Body"}</text>
      <text x={cx + 8} y={cy + orbitR / 2} fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        r = R + h = {res?.valid ? fmt(res.r / 1000) : "—"} km
      </text>
      <text x={satX - 4} y={satY - 38} fontSize="10" textAnchor="end" fill="currentColor" className="text-orange-400 font-mono">
        v = {res?.valid ? fmt(res.v / 1000, 4) : "—"} km/s
      </text>
      <text x={16} y={20} fontSize="10" fill="currentColor" className="text-muted-foreground font-mono">
        h = {fmt(altitudeKm, 4)} km above the surface
      </text>
    </svg>
  );
}

export default function OrbitGravity() {
  const [s, setS] = useState(DEFAULTS);
  const { recordExperiment } = useProgress();
  const touched = useRef(false);
  const set = (k) => (v) => {
    if (!touched.current) { touched.current = true; recordExperiment("orbit", "Ran Orbit & Gravity Lab"); }
    setS((p) => ({ ...p, [k]: v }));
  };

  const res = orbit(s);
  const chartData = sweep(100, 40000, 39, (h) => {
    const r = orbit({ body: s.body, altitudeKm: h });
    return r.valid ? { v: r.v / 1000 } : null;
  });

  return (
    <ExperimentShell
      title="Orbit & Gravity"
      tagline="v = √(GM/r) · T = 2π·√(r³/GM)"
      intro="Throw something fast enough sideways and it misses the ground forever — that is all an orbit is. The higher the orbit, the slower the speed and the longer the lap. Set an altitude and find the exact speed a satellite needs."
      assumptions={[
        "Circular orbit — a specific idealized orbit shape (real ones can be elliptical).",
        "The central body is spherically symmetric with the stated GM.",
        "No atmosphere, drag, or third-body perturbations.",
        "The satellite's own gravity is negligible.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          In a circular orbit, gravity is exactly the centripetal force:{" "}
          <span className="font-mono text-cyan-400">GMm/r² = mv²/r</span>, so{" "}
          <span className="font-mono text-cyan-400">v = √(GM/r)</span> — independent of the satellite's mass. A
          feather and a space station orbit identically. Because r sits under the square root, small altitude
          changes mean small speed changes, but the period{" "}
          <span className="font-mono text-cyan-400">T = 2π√(r³/GM)</span> grows fast (Kepler's third law): twice
          the radius costs 2.8× the period.
        </p>
      }
      predict={{ experimentId: "orbit", label: "Orbit & Gravity", pre: PREDICTIONS.orbit.pre, post: PREDICTIONS.orbit.post }}
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Central body</div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(ORBIT_BODIES).map(([id, b]) => (
            <button
              key={id}
              onClick={() => { if (!touched.current) { touched.current = true; recordExperiment("orbit", "Ran Orbit & Gravity Lab"); } setS((p) => ({ ...p, body: id })); }}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                s.body === id ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-background text-muted-foreground hover:border-ring"
              )}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          GM = {fmt(ORBIT_BODIES[s.body].GM, 6)} m³/s² · surface radius R = {fmt(ORBIT_BODIES[s.body].radiusM / 1000, 5)} km — standard planetary reference values.
        </div>
      </div>

      <ErrorList errors={res.errors} />

      <VizPanel title="Orbit schematic (not to scale)">
        <OrbitViz res={res.valid ? res : null} altitudeKm={s.altitudeKm} />
      </VizPanel>

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
        <ControlSlider label="Altitude h above surface" value={s.altitudeKm} onChange={set("altitudeKm")} min={0} max={40000} step={50} unit="km" error={res.errors?.altitudeKm} help="ISS ≈ 400 km · GPS ≈ 20 200 km · geostationary ≈ 35 786 km" />
        <div className="flex flex-col justify-center gap-1.5 rounded-lg border border-border bg-background p-3 text-[11px] leading-relaxed text-muted-foreground">
          <span>Geostationary orbit (24 h period): {s.body === "earth" ? "h ≈ 35 786 km" : "not applicable on this body"}</span>
          <span>Local gravity at your altitude is NOT zero — see the g stat below. Astronauts float because everything falls together.</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Orbit radius r" value={res.valid ? fmt(res.r / 1000) : "—"} unit="km" accent="cyan" />
        <Stat label="Orbital speed v" value={res.valid ? fmt(res.v / 1000, 4) : "—"} unit="km/s" accent="orange" />
        <Stat label="Orbital period T" value={res.valid ? fmt(res.T / 60) : "—"} unit="min" />
        <Stat label="Local gravity at altitude" value={res.valid ? fmt(res.gLocal, 4) : "—"} unit="m/s²" />
      </div>

      <ExperimentChart
        title="Orbital speed vs altitude — updates with your inputs"
        note={`Model curve v = √(GM/r) for ${ORBIT_BODIES[s.body].name}. Higher orbits are slower — the dashed marker is your current altitude.`}
        xLabel="Altitude h (km)"
        xMarker={Number.isFinite(s.altitudeKm) ? s.altitudeKm : undefined}
        data={chartData}
        series={[{ key: "v", name: "Orbital speed v (km/s)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
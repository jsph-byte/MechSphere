import React, { useState } from "react";
import ExperimentShell, { Stat, ErrorList } from "@/components/experiments/ExperimentShell";
import ControlSlider from "@/components/experiments/ControlSlider";
import InclineViz from "@/components/experiments/InclineViz";
import { incline } from "@/lib/physics";
import ExperimentChart, { sweep } from "@/components/experiments/ExperimentChart";
import SimPlayer from "@/components/experiments/SimPlayer";
import { PREDICTIONS } from "@/data/predictions";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

const DEFAULTS = { angleDeg: 30, mass: 10, mu: 0.2 };

export default function InclinedPlane() {
  const [s, setS] = useState(DEFAULTS);
  const [pip, setPip] = useState(false);
  const { recordExperiment } = useProgress();
  const res = incline(s);
  const set = (k) => (v) => setS((p) => ({ ...p, [k]: v }));

  // Auto-updating sweep: acceleration vs angle at the current mass & friction.
  const mc = Number.isFinite(s.mass) && s.mass > 0 ? s.mass : 10;
  const muc = Number.isFinite(s.mu) && s.mu >= 0 ? s.mu : 0.2;
  const chartData = sweep(5, 85, 40, (angle) => {
    const r = incline({ angleDeg: angle, mass: mc, mu: muc });
    return r.valid ? { a: r.a } : null;
  });

  return (
    <ExperimentShell
      title="Inclined Plane"
      tagline="N = mg·cos θ · f = μk·N · Fnet = mg·sin θ − f"
      intro="A ramp splits gravity into two components: one pulling the block down the slope, one pressing it into the surface. The surface answers with a normal force, and friction opposes the sliding. Set the slope and watch the force balance shift."
      assumptions={[
        "Sign convention: forces and acceleration are positive DOWN the plane.",
        "Kinetic friction applies — the model assumes the block is already sliding.",
        "Friction coefficient μk is constant (does not depend on speed).",
        "Air resistance is ignored; g = 9.81 m/s².",
        "If acceleration computes ≤ 0, the assumed sliding direction/friction model needs reconsideration — kinetic friction cannot start motion, and a resting block is governed by static friction instead.",
      ]}
      onReset={() => setS(DEFAULTS)}
      explanation={
        <p className="text-sm leading-relaxed text-muted-foreground">
          Only the component <span className="font-mono text-cyan-400">mg·sin θ</span> drives the block down the slope, while the surface can only supply the perpendicular component <span className="font-mono text-cyan-400">N = mg·cos θ</span> as a normal force. Kinetic friction scales with that normal force: <span className="font-mono text-cyan-400">f = μk·mg·cos θ</span>. Steepen the ramp and two things happen at once: the driving force grows (sin θ ↑) and friction shrinks (cos θ ↓) — which is why every block eventually slides. With no friction the acceleration is g·sin θ, independent of mass.
        </p>
      }
      predict={{
        experimentId: "incline",
        label: "Inclined Plane",
        pre: [
          {
            question: "If you increase the incline angle (block still sliding), what happens to the normal force N = mg·cos θ?",
            options: ["It increases", "It stays the same", "It decreases"],
            correctIndex: 2,
            explanation: "cos θ shrinks as the ramp steepens, so both the normal force and kinetic friction μk·N decrease. On a vertical wall (θ → 90°) the normal force would vanish entirely.",
            computeComparison: () => {
              const a = incline(s);
              const newAngle = Math.min(85, s.angleDeg + 20);
              const b = incline({ ...s, angleDeg: newAngle });
              return {
                beforeLabel: `Current: θ = ${fmt(s.angleDeg, 3)}°`, before: `N = ${fmt(a.normal)} N`,
                afterLabel: `Steeper: θ = ${fmt(newAngle, 3)}°`, after: `N = ${fmt(b.normal)} N`,
              };
            },
          },
          ...PREDICTIONS.incline.pre,
        ],
        post: PREDICTIONS.incline.post,
      }}
    >
      <SimPlayer
        title="Inclined plane"
        playing={pip && res.valid && res.sliding}
        onDismiss={() => setPip(false)}
        mini={<InclineViz angleDeg={s.angleDeg} res={res} autoLoop />}
      >
        <InclineViz
          angleDeg={s.angleDeg}
          res={res}
          onPlayStarted={() => { recordExperiment("incline", "Ran Inclined Plane"); setPip(true); }}
        />
      </SimPlayer>

      <ErrorList errors={res.errors} />

      {res.valid && !res.sliding && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs font-medium text-amber-500">
          The computed acceleration is {fmt(res.a)} m/s² — negative under this convention. The block does not accelerate down the plane with these values. Remember: kinetic friction only applies while sliding; whether a resting block starts to move is a static-friction question this model cannot answer.
        </div>
      )}

      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
        <ControlSlider label="Incline angle θ" value={s.angleDeg} onChange={set("angleDeg")} min={5} max={75} step={1} unit="°" error={res.errors?.angleDeg} />
        <ControlSlider label="Object mass m" value={s.mass} onChange={set("mass")} min={1} max={50} step={0.5} unit="kg" error={res.errors?.mass} />
        <ControlSlider label="Kinetic friction μk" value={s.mu} onChange={set("mu")} min={0} max={1} step={0.01} unit="—" error={res.errors?.mu} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="Weight W = mg" value={res.valid ? fmt(res.weight) : "—"} unit="N" />
        <Stat label="Gravity along plane mg·sin θ" value={res.valid ? fmt(res.parallel) : "—"} unit="N" accent="orange" />
        <Stat label="Normal force N" value={res.valid ? fmt(res.normal) : "—"} unit="N" accent="cyan" />
        <Stat label="Kinetic friction f = μk·N" value={res.valid ? fmt(res.friction) : "—"} unit="N" />
        <Stat label="Net force down plane" value={res.valid ? fmt(res.fnet) : "—"} unit="N" />
        <Stat label="Acceleration a" value={res.valid ? fmt(res.a) : "—"} unit="m/s²" accent="orange" />
      </div>

      <ExperimentChart
        title="Acceleration vs incline angle — updates with your inputs"
        note={`Model curve at your current m = ${fmt(mc)} kg and μk = ${fmt(muc)}. Negative values mean the block would not slide down at that angle under the kinetic-friction model — the curve crosses zero where μk·cos θ = sin θ. The dashed marker is your current angle.`}
        xLabel="Incline angle θ (°)"
        xMarker={Number.isFinite(s.angleDeg) ? s.angleDeg : undefined}
        data={chartData}
        series={[{ key: "a", name: "Acceleration a (m/s²)", color: "#f97316" }]}
      />
    </ExperimentShell>
  );
}
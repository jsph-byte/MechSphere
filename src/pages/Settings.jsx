import React, { useState } from "react";
import { Sun, Moon, Send, Info, FlaskConical, CheckCircle2, Wifi, WifiOff } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useProgress } from "@/lib/progress";
import { useOnline } from "@/hooks/useOnline";
import { cn } from "@/lib/utils";

const CHECKLIST = [
  "Projectile: v₀ = 10, θ = 45°, g = 9.81 → R ≈ 10.19 m, H ≈ 2.55 m, t ≈ 1.44 s",
  "Pendulum: L = 1 m → T ≈ 2.01 s; L = 0.25 m → T ≈ 1.00 s",
  "Incline: 30°, m = 10 kg, μk = 0 → a = 4.90 m/s²; with μk = 0.3 → a = 2.36 m/s²",
  "Gas: 100 kPa, 2 m³, 300 K → 4 m³, 300 K gives P₂ = 50 kPa",
  "Heat: 2 kg water + 10 K needs Q = 83.7 kJ; 3850 J on 0.5 kg copper → ΔT = 20 K",
  "Units: 5 km = 3.107 mi; 100 °F = 37.8 °C; 10 hp = 7.46 kW; 1 psi = 6894.8 Pa",
];

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { progress, addFeedback } = useProgress();
  const online = useOnline();
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  const submitFeedback = () => {
    if (!feedback.trim()) return;
    addFeedback(feedback.trim());
    setFeedback("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Settings &amp; About</h1>
        <p className="mt-1 text-sm text-muted-foreground">Theme, offline status, documentation, and feedback.</p>
      </div>

      {/* Appearance */}
      <section className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
        <div>
          <div className="text-sm font-semibold">Appearance</div>
          <p className="text-xs text-muted-foreground">Currently in {theme === "dark" ? "dark" : "light"} mode.</p>
        </div>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold hover:border-ring"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-cyan-500" />}
          Switch to {theme === "dark" ? "light" : "dark"}
        </button>
      </section>

      {/* Offline status */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {online ? <Wifi className="h-4 w-4 text-emerald-400" /> : <WifiOff className="h-4 w-4 text-amber-500" />}
          Connection status: {online ? "Online" : "Offline"}
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          All experiments, unit conversions, material data, constants, and the question bank are computed and stored on your device — they keep working with no internet connection once the app has loaded. The app also ships a service worker and web manifest that cache the app shell for offline start-up wherever the hosting platform serves them; on hosts that do not, you may still need a connection to open the app initially. Offline caching has not been verified on every hosting environment — treat "keep working after loading" as the tested guarantee.
        </p>
      </section>

      {/* About */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-cyan-400" />
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">About MechSphere</h2>
        </div>
        <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">The problem: </span>
            mechanics and thermodynamics are usually taught through static formulas, but understanding comes from watching how systems respond when you change one variable at a time. MechSphere makes that loop — predict, experiment, compare, understand — the core of the learning experience.
          </p>
          <p>
            <span className="font-semibold text-foreground">Intended users: </span>
            mechanical engineering students, freshmen in introductory engineering and physics courses, students reviewing principles, and instructors demonstrating physical relationships.
          </p>
          <p>
            <span className="font-semibold text-foreground">Principles demonstrated: </span>
            kinematics and projectile motion, simple harmonic motion, friction and force decomposition on inclined planes, the combined gas law, and calorimetry (Q = mcΔT), supported by material property data, unit analysis, and dimensional consistency.
          </p>
          <p>
            <span className="font-semibold text-foreground">Limitations: </span>
            every simulation is a simplified model — no air resistance, idealized friction, ideal-gas assumptions, constant specific heats, and no phase changes. Property values are approximate, room-temperature representatives. Small-angle pendulum results are labeled as approximations.
          </p>
          <p>
            <span className="font-semibold text-foreground">Educational simulation ≠ design tool: </span>
            MechSphere is built for learning and demonstration. Real engineering design requires certified material data, safety factors, codes and standards (ASTM, ISO, ASME), and professional review — never use this app's outputs for actual design decisions.
          </p>
        </div>
      </section>

      {/* Validation checklist */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-2 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">
          <FlaskConical className="h-4 w-4" /> Calculation validation checklist
        </h2>
        <p className="mb-3 text-xs text-muted-foreground">Hand-verified test cases every calculation module must reproduce (reference results computed independently):</p>
        <ul className="space-y-1.5">
          {CHECKLIST.map((c, i) => (
            <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* Feedback */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-1 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">Feedback</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Comments are <span className="font-semibold text-foreground">stored locally on this device only</span> — they are not submitted to any server, and no personal information is collected.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
          placeholder="What works well? What was confusing? (no email or name needed)"
          aria-label="Feedback"
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={submitFeedback}
            disabled={!feedback.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" /> Save feedback
          </button>
          {sent && <span className="text-xs font-medium text-emerald-400">Saved on this device.</span>}
        </div>
        {progress.feedback.length > 0 && (
          <div className="mt-4">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Saved entries ({progress.feedback.length})</div>
            <ul className="space-y-1.5">
              {progress.feedback.map((f, i) => (
                <li key={i} className={cn("rounded-lg border border-border bg-background p-2.5 text-xs text-muted-foreground")}>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Privacy */}
      <section className="rounded-xl border border-border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Privacy: </span>
        MechSphere requires no account or login, collects no personal information, and stores all progress, history, and feedback in your browser's local storage. Clearing your browser data erases it permanently.
      </section>
    </div>
  );
}
import React, { useState } from "react";
import { Sun, Moon, Info, FlaskConical, CheckCircle2, Wifi, WifiOff, Download, Upload, AlertTriangle } from "lucide-react";
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

function BackupSection() {
  const { progress, importProgress } = useProgress();
  const [message, setMessage] = useState(null); // { error } | { info }
  const [pending, setPending] = useState(null); // validated data awaiting confirmation

  const doExport = () => {
    try {
      const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mechsphere-progress.json";
      a.click();
      URL.revokeObjectURL(url);
      setMessage({ info: "Backup file downloaded — keep it somewhere safe." });
    } catch (e) {
      setMessage({ error: "Could not create the backup file in this browser." });
    }
  };

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => setMessage({ error: "Could not read the selected file." });
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || typeof data !== "object" || Array.isArray(data) ||
          typeof data.experiments !== "object" || typeof data.assessments !== "object") {
          setMessage({ error: "That file is not a valid MechSphere progress backup." });
          return;
        }
        const runs = Object.values(data.experiments || {}).reduce((s, x) => s + (x?.count || 0), 0);
        const tests = Object.values(data.assessments || {}).filter((t) => t?.pre?.latest || t?.post?.latest).length;
        setMessage({
          info: `Backup looks valid — ${runs} experiment run${runs === 1 ? "" : "s"} and ${tests} experiment${tests === 1 ? "" : "s"} with test results found.`,
        });
        setPending(data);
      } catch (err) {
        setMessage({ error: "Could not read the file as JSON." });
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    try {
      importProgress(pending);
      setMessage({ info: "Progress imported — your achievements were re-checked against the imported data." });
    } catch (err) {
      setMessage({ error: err.message });
    }
    setPending(null);
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-1 font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">Backup &amp; transfer</h2>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
        Your progress lives only in this browser. Export a backup file to move it to another device or keep it
        safe before clearing browser data; import restores it in full. The file is validated before anything is
        overwritten, and you confirm before it replaces your current progress.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={doExport}
          className="inline-flex items-center gap-1.5 rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-300 transition-colors hover:bg-orange-500/20"
        >
          <Download className="h-3.5 w-3.5" /> Export progress
        </button>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
          <Upload className="h-3.5 w-3.5" /> Import backup
          <input type="file" accept="application/json,.json" onChange={onPickFile} className="hidden" aria-label="Import backup file" />
        </label>
      </div>
      {message && (
        <p className={cn("mt-3 rounded-lg border p-2.5 text-xs font-medium",
          message.error ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400")}>
          {message.info || message.error}
        </p>
      )}
      {pending && (
        <div className="mt-3 rounded-lg border border-orange-500/40 bg-orange-500/[0.07] p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
            <p className="text-xs font-medium text-foreground">
              Replace your current on-device progress with the imported backup? This cannot be undone.
            </p>
          </div>
          <div className="mt-2.5 flex justify-end gap-2">
            <button onClick={() => { setPending(null); setMessage(null); }} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:border-ring">
              Cancel
            </button>
            <button onClick={confirmImport} className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
              Replace progress
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const online = useOnline();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Settings &amp; About</h1>
        <p className="mt-1 text-sm text-muted-foreground">Theme, offline status, documentation, and backups.</p>
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

      <BackupSection />

      {/* Privacy */}
      <section className="rounded-xl border border-border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Privacy: </span>
        MechSphere requires no account or login, collects no personal information, and stores all progress and history in your browser's local storage. Clearing your browser data erases it permanently — export a backup first if you want to keep it.
      </section>
    </div>
  );
}
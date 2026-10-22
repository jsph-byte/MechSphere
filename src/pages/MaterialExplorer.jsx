import React, { useMemo, useState } from "react";
import { Search, Scale, ChevronDown, ChevronRight, Check, X, Lightbulb } from "lucide-react";
import { MATERIALS, MATERIAL_SOURCE } from "@/data/materials";
import { fmt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const PROPERTIES = [
  { key: "density", label: "Density", unit: "kg/m³", get: (m) => m.density, lowerIs: "lighter" },
  { key: "specificHeat", label: "Specific heat capacity", unit: "J/(kg·K)", get: (m) => m.specificHeat },
  { key: "thermalConductivity", label: "Thermal conductivity", unit: "W/(m·K)", get: (m) => m.thermalConductivity, higherIs: "better for heat transfer" },
  { key: "youngsModulus", label: "Young's modulus E", unit: "GPa", get: (m) => m.youngsModulus ? m.youngsModulus / 1e9 : null },
];

const SELECTION_SCENARIOS = [
  {
    id: "heatsink",
    title: "Heat sink for a power transistor",
    requirement: "Move heat away as fast as possible; mass and cost are secondary.",
    options: ["Copper C11000", "Stainless Steel 304", "Gray Cast Iron"],
    answer: "Copper C11000",
    explanation:
      "Copper's thermal conductivity (~398 W/(m·K)) is about 25× stainless steel's (16) and ~9× gray iron's (46). If mass or cost mattered more, aluminum 6061 (167 W/(m·K)) would be a lighter, cheaper compromise — this library's trade-off table shows exactly how much conduction you give up.",
  },
  {
    id: "bracket",
    title: "Aircraft inspection-panel bracket",
    requirement: "Minimize mass; the shape is fixed by the surrounding structure; adequate stiffness required.",
    options: ["Aluminum 6061-T6", "Carbon Steel 1045", "Brass C36000"],
    answer: "Aluminum 6061-T6",
    explanation:
      "For a fixed geometry, stiffness scales with E and mass with ρ. The aluminum bracket is ~1/3 the mass of an identical steel one (~1/3 as stiff, too — note E/ρ is nearly identical, so the win comes from the fixed-shape mass constraint, not a magic ratio). Brass is heavier and softer. In a stress-driven design where you can grow thickness, steel could actually win — always check which requirement binds.",
  },
  {
    id: "machine-base",
    title: "Machine-tool base casting",
    requirement: "Complex cast shape that damps vibration; low cost per part.",
    options: ["Gray Cast Iron", "Aluminum 7075-T6", "Copper C11000"],
    answer: "Gray Cast Iron",
    explanation:
      "Gray iron casts into complex shapes cheaply and its graphite flakes damp vibration — the classic machine-base material. It is brittle and weak in tension, but a base sees compression. 7075 aluminum would need machining and conducts vibration; copper would be absurdly heavy and expensive.",
  },
];

function PropertyRow({ prop, mat, approx }) {
  const v = prop.get(mat);
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-muted-foreground">{prop.label}</span>
      <span className="text-right font-mono tabular-nums">
        {v === null || v === undefined ? (
          <span className="text-xs text-muted-foreground">not applicable (fluid)</span>
        ) : (
          <>
            {fmt(v)} <span className="text-xs text-muted-foreground">{prop.unit}</span>
          </>
        )}
        {approx && v !== null && <sup className="ml-1 text-[9px] text-amber-500">approx.</sup>}
      </span>
    </div>
  );
}

export default function MaterialExplorer() {
  const { recordMaterialView, recordComparison, recordSelectionAnswer } = useProgress();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [tab, setTab] = useState("library"); // library | compare | select
  const [selA, setSelA] = useState("aluminum-6061");
  const [selB, setSelB] = useState("carbon-steel-1045");
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MATERIALS;
    return MATERIALS.filter((m) =>
      [m.name, m.category, m.grade, ...m.uses].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const matA = MATERIALS.find((m) => m.id === selA);
  const matB = MATERIALS.find((m) => m.id === selB);
  const scenario = SELECTION_SCENARIOS[scenarioIdx];
  const answered = answers[scenario.id];
  const options = scenario.options.map((name) => MATERIALS.find((m) => m.name === name));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Material Explorer</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A referenced library of common engineering materials. Values are approximate room-temperature representatives — always check certified data before design.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { id: "library", label: "Library" },
          { id: "compare", label: "Compare" },
          { id: "select", label: "Selection Challenge" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors",
              tab === t.id ? "border-cyan-500 bg-cyan-500/15 text-cyan-300" : "border-border bg-card text-muted-foreground hover:border-ring"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "library" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search materials, uses, or categories…"
              className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((m) => {
              const open = openId === m.id;
              return (
                <div key={m.id} className="overflow-hidden rounded-xl border border-border bg-card">
                  <button
                    onClick={() => { setOpenId(open ? null : m.id); if (!open) recordMaterialView(m.id); }}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <div>
                      <div className="font-heading text-sm font-bold">{m.name}</div>
                      <div className="text-[11px] text-muted-foreground">{m.grade} · {m.category}</div>
                    </div>
                    {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  {open && (
                    <div className="border-t border-border px-4 py-2">
                      {PROPERTIES.map((p) => <PropertyRow key={p.key} prop={p} mat={m} approx />)}
                      <div className="mt-2 py-2 text-xs leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-foreground">Common uses: </span>{m.uses.join(", ")}.
                      </div>
                      <div className="pb-2 text-xs leading-relaxed text-muted-foreground">{m.note}</div>
                    </div>
                  )}
                </div>
              );
            })}
            {!filtered.length && (
              <div className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No materials match “{query}”. Try “copper”, “steel”, or “heat”.
              </div>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">{MATERIAL_SOURCE}</p>
        </>
      )}

      {tab === "compare" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Material A", value: selA, set: setSelA, exclude: selB },
              { label: "Material B", value: selB, set: setSelB, exclude: selA },
            ].map((box) => (
              <label key={box.label} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{box.label}</div>
                <select
                  value={box.value}
                  onChange={(e) => { box.set(e.target.value); recordComparison(); }}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {MATERIALS.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.id === box.exclude}>{m.name}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border bg-secondary/50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Property</span><span className="text-cyan-400">{matA.name}</span><span className="text-orange-400">{matB.name}</span>
            </div>
            {PROPERTIES.map((p) => (
              <div key={p.key} className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border px-4 py-2.5 text-sm last:border-0">
                <span className="text-muted-foreground">{p.label} <span className="text-[10px]">({p.unit})</span></span>
                <span className="font-mono tabular-nums">{p.get(matA) === null ? "—" : fmt(p.get(matA))}</span>
                <span className="font-mono tabular-nums">{p.get(matB) === null ? "—" : fmt(p.get(matB))}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Reading the table: lower density means a lighter part for the same shape; higher thermal conductivity moves heat faster; higher Young's modulus means more stiffness per unit area. {MATERIAL_SOURCE}
          </p>
        </>
      )}

      {tab === "select" && (
        <div className="space-y-4">
          <div className="flex items-start gap-2.5 rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
            <div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-cyan-400">Design scenario</div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Real material selection is never “best material” — it's the best fit for stated requirements. Pick a material for each scenario; MechSphere explains the trade-offs using the library data.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {SELECTION_SCENARIOS.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => setScenarioIdx(i)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                  i === scenarioIdx ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-border bg-card text-muted-foreground hover:border-ring"
                )}
              >
                {sc.title}
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="font-heading text-base font-bold">{scenario.title}</div>
            <p className="mt-1 text-sm text-cyan-400">Requirement: {scenario.requirement}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {options.map((m) => {
                const isCorrect = m.name === scenario.answer;
                const chosen = answered === m.name;
                return (
                  <button
                    key={m.id}
                    disabled={!!answered}
                    onClick={() => { setAnswers((a) => ({ ...a, [scenario.id]: m.name })); recordSelectionAnswer(); }}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default",
                      answered && isCorrect && "border-emerald-500/60 bg-emerald-500/15 text-emerald-300",
                      answered && !isCorrect && chosen && "border-destructive/60 bg-destructive/10 text-destructive",
                      answered && !isCorrect && !chosen && "border-border bg-background text-muted-foreground",
                      !answered && "border-border bg-background text-foreground hover:border-ring"
                    )}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="mt-4 space-y-2">
                <div className={cn("flex items-start gap-2 rounded-lg border p-3 text-sm font-medium", answered === scenario.answer ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-destructive/40 bg-destructive/10 text-destructive")}>
                  {answered === scenario.answer ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
                  A defensible choice: {scenario.answer}. {answered === scenario.answer ? "Well reasoned —" : "But notice:"} see the trade-offs below.
                </div>
                <div className="rounded-lg border border-border bg-background p-3 text-xs leading-relaxed text-muted-foreground">{scenario.explanation}</div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Scale className="h-3.5 w-3.5" /> No material is universally best — requirements decide. Compare the numbers yourself in the Compare tab.
          </div>
        </div>
      )}
    </div>
  );
}
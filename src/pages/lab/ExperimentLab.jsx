import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Target, Clock, Triangle, Wind, Flame, Waves, Gauge, Thermometer, Cog, Search, ChevronRight } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "mechanics", name: "Mechanics and Motion", icon: Cog },
  { id: "fluids", name: "Fluid Mechanics", icon: Waves },
  { id: "thermal", name: "Heat and Thermal Physics", icon: Thermometer },
  { id: "gas", name: "Gas Laws and Thermodynamics", icon: Gauge },
];

const EXPERIMENTS = [
  {
    id: "projectile", to: "/lab/projectile", category: "mechanics", icon: Target, accent: "text-orange-400",
    title: "Projectile Motion",
    desc: "Launch a projectile and see how speed, angle, and gravity shape its flight.",
  },
  {
    id: "pendulum", to: "/lab/pendulum", category: "mechanics", icon: Clock, accent: "text-cyan-400",
    title: "Simple Pendulum",
    desc: "Release a pendulum and discover what its period really depends on.",
  },
  {
    id: "incline", to: "/lab/incline", category: "mechanics", icon: Triangle, accent: "text-orange-400",
    title: "Inclined Plane",
    desc: "Break gravity into components and watch friction fight the slide.",
  },
  {
    id: "buoyancy", to: "/lab/buoyancy", category: "fluids", icon: Waves, accent: "text-cyan-400",
    title: "Buoyancy Lab",
    desc: "Archimedes' principle: find out what floats, what sinks, and why.",
  },
  {
    id: "bernoulli", to: "/lab/bernoulli", category: "fluids", icon: Wind, accent: "text-cyan-400",
    title: "Bernoulli Flow Lab",
    desc: "Narrow the pipe and trade pressure for speed — continuity and Bernoulli in action.",
  },
  {
    id: "heat", to: "/lab/heat", category: "thermal", icon: Flame, accent: "text-orange-400",
    title: "Specific Heat",
    desc: "Add or remove heat and compare how water, copper, and sand respond.",
  },
  {
    id: "conduction", to: "/lab/conduction", category: "thermal", icon: Thermometer, accent: "text-orange-400",
    title: "Heat Conduction",
    desc: "Fourier's law: thickness, area, and material decide how fast heat flows.",
  },
  {
    id: "gas", to: "/lab/gas", category: "gas", icon: Gauge, accent: "text-cyan-400",
    title: "Ideal Gas Explorer",
    desc: "Compress, heat, and expand a fixed amount of ideal gas between two states.",
  },
];

const PLANNED = [
  { category: "Mechanics and Motion", titles: ["Collisions & Momentum", "Orbit & Gravity", "Work, Energy & Power", "Hooke's Law Springs", "Torque & Levers"] },
  { category: "Fluid Mechanics", titles: ["Hydrostatic Pressure", "Venturi & Continuity"] },
  { category: "Heat and Thermal Physics", titles: ["Thermal Expansion", "Heat Transfer Comparison"] },
  { category: "Gas Laws and Thermodynamics", titles: ["Heating & Gas Processes"] },
  { category: "Electrical Engineering", titles: ["Ohm's Law Circuits", "Electrical Power & Energy"] },
];

export default function ExperimentLab() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const { progress } = useProgress();

  const q = query.trim().toLowerCase();
  const match = (e) =>
    (cat === "all" || e.category === cat) &&
    (!q || e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q));

  const badges = (id) => {
    const a = progress.assessments?.[id];
    const chips = [];
    if (a?.pre?.latest) chips.push(`Pre ${a.pre.latest.score}/15`);
    if (a?.post?.latest) chips.push(`Post ${a.post.latest.score}/15`);
    return chips;
  };

  const grouped = CATEGORIES.map((c) => ({
    cat: c,
    exps: EXPERIMENTS.filter((e) => e.category === c.id && match(e)),
  })).filter((g) => g.exps.length > 0);

  const plannedVisible = PLANNED.map((p) => ({
    ...p,
    titles: p.titles.filter((t) => !q || t.toLowerCase().includes(q)),
  })).filter((p) => p.titles.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Experiment Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse by category, commit to a prediction, run the experiment, and test yourself — the MechSphere way of
          learning engineering.
        </p>
      </div>

      {/* search + category filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search experiments…"
            aria-label="Search experiments"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", name: "All", icon: null }, ...CATEGORIES].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                cat === c.id
                  ? "border-orange-500 bg-orange-500/15 text-orange-300"
                  : "border-border bg-card text-muted-foreground hover:border-ring"
              )}
            >
              {c.icon && <c.icon className="h-3.5 w-3.5" />}
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 && plannedVisible.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No experiments match “{query}”. Try a different search.
        </div>
      )}

      {grouped.map(({ cat: c, exps }) => (
        <section key={c.id} className="space-y-3">
          <div className="flex items-center gap-2">
            <c.icon className="h-4 w-4 text-cyan-400" />
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">{c.name}</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exps.map((e) => {
              const chips = badges(e.id);
              return (
                <Link
                  key={e.to}
                  to={e.to}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-orange-500/50"
                >
                  <div className="flex items-center justify-between">
                    <e.icon className={`h-6 w-6 ${e.accent}`} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="mt-3 font-heading text-base font-bold">{e.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.desc}</p>
                  {chips.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 text-xs font-semibold text-orange-400">Start Experiment →</div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {/* honestly-marked roadmap, not clickable placeholders */}
      {plannedVisible.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Coming soon — not built yet
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="text-xs text-muted-foreground">
            These labs are on the roadmap but are not implemented yet — they are listed for planning only.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plannedVisible.map((p) => (
              <div key={p.category} className="rounded-xl border border-dashed border-border bg-card/50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{p.category}</div>
                <ul className="mt-2 space-y-1">
                  {p.titles.map((t) => (
                    <li key={t} className="text-xs text-muted-foreground">
                      · {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
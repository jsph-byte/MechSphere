import React from "react";

// Conceptual (NOT quantitative) overview of the three heat-transfer modes.
// The lab's numbers come from Fourier's law — conduction only. These
// illustrations explain mechanisms and are deliberately not to scale.

const MODES = [
  {
    id: "conduction",
    title: "Conduction",
    law: "Fourier's law — q = k·A·ΔT/L (what the lab's bars compute)",
    body: "Heat passes through stationary matter: energetic molecules vibrate against cooler neighbours, and in metals free electrons carry most of the load. Nothing moves position — only energy does, hand to hand.",
    where: "Rod in a flame, house wall, engine block to coolant.",
  },
  {
    id: "convection",
    title: "Convection",
    law: "Newton's cooling law — q = h·A·ΔT, with h ~5–25 W/(m²·K) for still air, 50–1000+ for moving liquids",
    body: "The fluid itself moves: heated fluid becomes buoyant and rises, cool fluid sinks, and the loop continuously hauls heat away. Because fluid is transported, flow is part of the physics — fans and pumps count.",
    where: "Radiator fins, coffee cooling, wind chill, CPU fans.",
  },
  {
    id: "radiation",
    title: "Thermal radiation",
    law: "Stefan–Boltzmann — q = ε·σ·A·(T⁴hot − T⁴cold), σ ≈ 5.67×10⁻⁸ W/(m²·K⁴)",
    body: "Every warm surface emits electromagnetic waves — no medium needed, which is why the Sun warms Earth through empty space. It grows with the fourth power of absolute temperature: double T and radiation grows 16×.",
    where: "Sunlight, campfire glow, thermal cameras, spacecraft radiators.",
  },
];

function ModeArt({ id }) {
  if (id === "conduction") {
    return (
      <svg viewBox="0 0 220 70" className="h-16 w-full" role="img" aria-label="Conceptual: heat conducted along a rod from hot end to cold end">
        <defs>
          <linearGradient id="hm-cond" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path d="M16 40q-7-11 2-16q4-3 6 2q3-7 8-2q8 6 3 16z" fill="#f97316" />
        <rect x="40" y="27" width="148" height="16" rx="3" fill="url(#hm-cond)" />
        {[64, 96, 128, 160, 188].map((x) => (
          <g key={x}>
            <circle cx={x} cy={35} r="3.5" fill="#0b1220" stroke="#e2e8f0" strokeWidth="1" />
            <path d={`M${x - 8} 35h-3M${x + 8} 35h3`} stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.8" />
          </g>
        ))}
        <text x="40" y="60" fontSize="8" fill="#94a3b8">hot end</text>
        <text x="162" y="60" fontSize="8" fill="#94a3b8">cold end</text>
      </svg>
    );
  }
  if (id === "convection") {
    return (
      <svg viewBox="0 0 220 70" className="h-16 w-full" role="img" aria-label="Conceptual: fluid circulating in a loop over a hot plate">
        <rect x="42" y="8" width="136" height="48" rx="6" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeOpacity="0.45" />
        <rect x="48" y="50" width="124" height="5" rx="2" fill="#f97316" />
        <path d="M80 38 C82 22, 138 22, 140 38 C142 54, 78 54, 80 38" stroke="#e2e8f0" strokeWidth="1.4" fill="none" strokeDasharray="5 4" strokeOpacity="0.85" />
        <path d="M110 20 l-5 -6 h10 z" fill="#e2e8f0" />
        <circle cx="95" cy="45" r="3" fill="#f97316" />
        <circle cx="112" cy="43" r="3" fill="#f97316" />
        <circle cx="126" cy="30" r="3" fill="#38bdf8" />
        <circle cx="88" cy="26" r="3" fill="#38bdf8" />
        <text x="46" y="66" fontSize="8" fill="#94a3b8">hot plate</text>
        <text x="118" y="12" fontSize="8" fill="#94a3b8">rises, cools, sinks</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 70" className="h-16 w-full" role="img" aria-label="Conceptual: waves travelling from a warm emitter to an absorber">
      <rect x="10" y="22" width="34" height="26" rx="4" fill="#f97316" />
      <text x="12" y="60" fontSize="8" fill="#94a3b8">emitter</text>
      {[28, 35, 42].map((y, i) => (
        <path
          key={y}
          d={`M50 ${y} q8 ${i % 2 === 0 ? -6 : 6} 16 0 t16 0 t16 0 t16 0 t16 0 t16 0`}
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.9"
        />
      ))}
      <rect x="178" y="22" width="34" height="26" rx="4" fill="#38bdf8" />
      <text x="182" y="60" fontSize="8" fill="#94a3b8">absorber</text>
    </svg>
  );
}

export default function HeatModesPanel() {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-cyan-400">
        The three ways heat moves — conceptual overview
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        The bars above compute conduction only (Fourier's law). These illustrations explain the mechanisms
        themselves — they are conceptual drawings, not to scale and not quantitative.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {MODES.map((m) => (
          <div key={m.id} className="rounded-lg border border-border bg-background p-3">
            <ModeArt id={m.id} />
            <div className="mt-2 font-heading text-sm font-bold">{m.title}</div>
            <div className="mt-1 font-mono text-[11px] leading-snug text-cyan-400">{m.law}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{m.body}</p>
            <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground">Where you meet it: </span>{m.where}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
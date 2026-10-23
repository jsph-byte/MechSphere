// Heat Transfer Comparison Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; Fourier's law q = k·A·ΔT/L, same geometry across materials.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Heat conduction is the transfer of energy through…",
    options: ["bulk fluid motion", "direct molecular collisions within a material", "electromagnetic waves", "evaporation"],
    correct: 1,
    explanation: "Conduction passes energy atom-to-atom through the solid (or stationary fluid) itself.",
  },
  {
    section: "fundamentals",
    question: "Fourier's law for steady one-dimensional conduction is…",
    options: ["q = k·A·ΔT/L", "q = m·c·ΔT", "q = h·A·T⁴", "q = ρ·g·h"],
    correct: 0,
    explanation: "Rate = conductivity × area × temperature gradient (ΔT/L).",
  },
  {
    section: "fundamentals",
    question: "Thermal conductivity k is measured in…",
    options: ["W/(m·K)", "J/(kg·K)", "W", "K/m"],
    correct: 0,
    explanation: "Watts conducted per metre per kelvin. J/(kg·K) is specific heat capacity — don't confuse them.",
  },
  {
    section: "fundamentals",
    question: "The other two heat-transfer mechanisms besides conduction are…",
    options: ["convection and radiation", "friction and sound", "induction and diffusion", "compression and expansion"],
    correct: 0,
    explanation: "Convection (bulk fluid motion) and radiation (electromagnetic waves) complete the trio.",
  },
  {
    section: "fundamentals",
    question: "This lab compares seven materials with identical geometry and end temperatures. The heat-rate differences therefore isolate…",
    options: ["the temperature difference", "the thermal conductivity k alone", "the length", "the area"],
    correct: 1,
    explanation: "Everything else is fixed in q = kAΔT/L — the bars are a picture of k itself.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A copper bar (k = 401) with A = 0.01 m², L = 0.5 m, ΔT = 100 K conducts heat at about…",
    options: ["802 W", "401 W", "8.02 kW", "80.2 W"],
    correct: 0,
    explanation: "q = 401 × 0.01 × 100/0.5 = 401 × 2 = 802 W.",
  },
  {
    section: "application",
    question: "A polystyrene foam slab (k = 0.035) with the same geometry conducts…",
    options: ["about 0.07 W", "about 0.7 W", "about 7 W", "about 70 W"],
    correct: 0,
    explanation: "q = 0.035 × 0.01 × 100/0.5 = 0.07 W — over 10 000× less than copper.",
  },
  {
    section: "application",
    question: "The copper : foam conduction ratio with identical geometry is about…",
    options: ["11 500×", "115×", "11×", "2×"],
    correct: 0,
    explanation: "401/0.035 ≈ 11 460 — the reason the lab plots bar widths on a log scale.",
  },
  {
    section: "application",
    question: "Doubling the length of a wall (same material, same ΔT) changes the heat rate to…",
    options: ["double", "half", "the same", "a quarter"],
    correct: 1,
    explanation: "q ∝ 1/L: twice as thick conducts half as fast — the logic of insulation thickness.",
  },
  {
    section: "application",
    question: "Doubling the window area (same glass, same ΔT) changes the conducted heat to…",
    options: ["double", "half", "unchanged", "quadruple"],
    correct: 0,
    explanation: "q ∝ A: twice the area means twice the heat path — why glazing area drives energy bills.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Ordering copper (401), aluminium (237), steel (45), stainless (16), glass (0.8) by conduction rate (identical geometry, fastest first):",
    options: ["copper > aluminium > steel > stainless > glass", "aluminium > copper > steel > glass > stainless", "glass > steel > copper", "all equal"],
    correct: 0,
    explanation: "With everything else fixed, ranking by k IS the ranking of q.",
  },
  {
    section: "analysis",
    question: "A pan has a stainless handle instead of an aluminium one. In hand (pun intended), stainless is chosen because…",
    options: ["it is stronger", "its low k (~16 vs 237) keeps the handle far cooler for the same contact heat", "it is shinier", "aluminium is toxic"],
    correct: 1,
    explanation: "Low conductivity delays heat arrival at your hand — the same property that makes aluminium a heat-sink champion makes it a terrible handle.",
  },
  {
    section: "analysis",
    question: "A wall's insulation (foam, k = 0.035) and studs (wood, k ≈ 0.17) are both needed. Compared with wood, foam conducts…",
    options: ["about 5× less", "about 5× more", "the same", "about 50× more"],
    correct: 0,
    explanation: "0.17/0.035 ≈ 4.9 — small in relative terms, which is why thermal bridging through studs matters in real walls.",
  },
  {
    section: "analysis",
    question: "The lab's heat-exchanger pipes are copper, but the pipe hangers are a low-k plastic. The reason for the difference is…",
    options: ["cost only", "copper moves heat into the fluid efficiently; plastic hangers block heat leaking to the structure", "colour coding", "weight"],
    correct: 1,
    explanation: "One design wants conduction maximized (pipes) and the other minimized (supports) — the same physics used in opposite directions.",
  },
  {
    section: "analysis",
    question: "The lab's model ignores convection and radiation at the surfaces. For a thin copper bar in moving air, the true heat flow would be limited more by…",
    options: ["conduction inside the copper", "the convective film coefficient at its surface", "its colour", "nothing"],
    correct: 1,
    explanation: "Copper's huge k makes internal conduction easy; the air film then dominates — why real designs add fins to grow the surface area.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Fourier's law is a steady-state model, which means…",
    options: ["temperatures change constantly", "the temperature profile inside the bar no longer changes with time", "the bar is adiabatic", "k varies"],
    correct: 1,
    explanation: "At steady state the gradient is locked (linear for uniform k) and the flow rate is constant along the bar.",
  },
  {
    section: "fundamentals",
    question: "In q = k·A·ΔT/L, the quantity ΔT/L is…",
    options: ["the temperature gradient", "the heat flux", "the thermal resistance", "the specific heat"],
    correct: 0,
    explanation: "Kelvin per metre — the slope that drives conductive flow, like voltage gradient drives current.",
  },
  {
    section: "fundamentals",
    question: "Thermal resistance of a slab is…",
    options: ["L/(k·A)", "k·A/L", "k/L", "A/L"],
    correct: 0,
    explanation: "R_th = L/(kA) is the exact analogue of electrical resistance: q = ΔT/R_th.",
  },
  {
    section: "fundamentals",
    question: "Which mechanism can transfer heat through empty vacuum?",
    options: ["conduction", "convection", "radiation only", "none"],
    correct: 2,
    explanation: "Radiation needs no medium — that's how the Sun warms Earth and how thermos walls keep soup hot.",
  },
  {
    section: "fundamentals",
    question: "Forced convection differs from natural convection by…",
    options: ["its temperature", "an external driver (fan/pump) moving the fluid instead of buoyancy alone", "using radiation", "requiring vacuum"],
    correct: 1,
    explanation: "Fans and pumps multiply heat transfer rates over the gentle circulations of buoyancy-driven natural convection.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A heat sink made of aluminium (k = 237), A = 0.02 m², L = 0.01 m, ΔT = 15 K conducts about…",
    options: ["71 W", "711 W", "7.1 kW", "35.6 W"],
    correct: 2,
    explanation: "q = k·A·(ΔT/L) = 237 × 0.02 × (15/0.01) = 4.74 × 1500 = 7110 W ≈ 7.1 kW — a thin, wide plate moves serious heat.",
  },
  {
    section: "application",
    question: "A stainless steel wall (k = 16) of a food vat: A = 2 m², L = 3 cm, ΔT = 40 K. Heat flows at about…",
    options: ["427 W", "42.7 kW", "4.27 kW", "213 W"],
    correct: 1,
    explanation: "q = 16 × 2 × (40/0.03) = 32 × 1333 ≈ 42 700 W ≈ 42.7 kW.",
  },
  {
    section: "application",
    question: "A window pane (k ≈ 0.8, A = 1.5 m², L = 4 mm) with ΔT = 20 K conducts about…",
    options: ["6 W", "600 W", "60 W", "6 kW"],
    correct: 3,
    explanation: "q = 0.8 × 1.5 × (20/0.004) = 1.2 × 5000 = 6000 W = 6 kW through the glass itself. Real windows lose far less overall because the thin air films on each side dominate the resistance — a reminder that surface effects often beat material k.",
  },
  {
    section: "application",
    question: "A heat sink must carry 100 W with ΔT = 10 K across a 5 mm aluminium (237) base. The needed area is about…",
    options: ["0.0021 m²", "0.021 m²", "0.21 m²", "2.1 m²"],
    correct: 0,
    explanation: "A = qL/(kΔT) = 100 × 0.005/(237 × 10) = 0.5/2370 ≈ 2.1×10⁻⁴ m² — about 21 cm², the size of a phone chip's heat spreader.",
  },
  {
    section: "application",
    question: "Two identical slabs in series (same area): 2 cm foam (0.035) then 2 cm wood (0.17), ΔT = 30 K across both. The series resistance makes the pair conduct like…",
    options: ["a single slab with k ≈ 0.058", "a single slab with k ≈ 0.21", "the foam alone", "the wood alone"],
    correct: 0,
    explanation: "R_total ∝ L₁/k₁ + L₂/k₂ = 0.02/0.035 + 0.02/0.17 = 0.571 + 0.118 = 0.689 → k_eff = 0.04/0.689 ≈ 0.058 — closer to the worse insulator.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "The lab shows copper conducting ~11 500× more than foam at identical geometry. A log-scaled bar chart is used because…",
    options: ["linear bars would show foam as invisible zero", "logs are more accurate", "copper is always right", "foam conducts nothing at all"],
    correct: 0,
    explanation: "On a linear scale the foam bar would be 1/11 500th of copper's width — unreadable; log scaling is an honest visualisation choice, which the lab states.",
  },
  {
    section: "analysis",
    question: "For a kettle's heating element, you want the casing to…",
    options: ["insulate (low k) so hands stay safe", "conduct (high k) so heat passes rapidly to the water", "radiate maximally", "store heat"],
    correct: 1,
    explanation: "Same part of the machine can demand opposite conductivities: element → water wants high k; element → hand wants low k. Real design separates them with geometry and materials.",
  },
  {
    section: "analysis",
    question: "Doubling ΔT across a wall doubles its heat loss. In winter, dropping indoor temperature from 21 °C to 19 °C (outside 0 °C) reduces loss by about…",
    options: ["about 9%", "about 50%", "about 2%", "nothing"],
    correct: 0,
    explanation: "ΔT falls 21→19 K of 21: q ∝ ΔT drops by 2/21 ≈ 9.5% — the direct pay-off of thermostat setbacks.",
  },
  {
    section: "analysis",
    question: "A student claims the lab's bars 'prove copper is the best material for everything'. The correct critique is…",
    options: ["it is true", "the chart only ranks conduction rate for identical geometry — 'best' depends on the job (cost, weight, corrosion, insulation needs)", "copper is actually the worst conductor", "the chart is wrong"],
    correct: 1,
    explanation: "No material is universally best: the lab demonstrates a property, and engineering selection weighs the whole requirement set.",
  },
  {
    section: "analysis",
    question: "Why does double-glazing insulate far better than a single pane?",
    options: ["glass becomes thicker", "the trapped air gap (very low k, immobilized) adds dominant thermal resistance", "two panes double conduction", "vacuum inside"],
    correct: 1,
    explanation: "Still air's k ≈ 0.026 is far below glass's 0.8: the gap, not more glass, provides the resistance — same Fourier physics, smarter layering.",
  },
];
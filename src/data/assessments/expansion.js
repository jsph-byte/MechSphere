// Thermal Expansion Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; ΔL = α·L₀·ΔT, ΔV ≈ 3α·V₀·ΔT.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "When most materials are heated, their atoms…",
    options: ["shrink", "sit farther apart on average, so the object grows", "multiply", "change element"],
    correct: 1,
    explanation: "Greater average spacing with temperature is the microscopic origin of thermal expansion.",
  },
  {
    section: "fundamentals",
    question: "The linear expansion formula is…",
    options: ["ΔL = α·L₀·ΔT", "ΔL = α·ΔT", "ΔL = L₀/ΔT", "ΔL = α·L₀/ΔT"],
    correct: 0,
    explanation: "The strain (ΔL/L₀) equals α·ΔT: longer objects and bigger temperature swings grow more.",
  },
  {
    section: "fundamentals",
    question: "The coefficient α is measured in…",
    options: ["1/K (per kelvin)", "K", "m/K", "dimensionless"],
    correct: 0,
    explanation: "α = strain per kelvin: units of K⁻¹ (typically 10⁻⁶/K for metals).",
  },
  {
    section: "fundamentals",
    question: "For an isotropic solid, the volume expansion coefficient is about…",
    options: ["α", "2α", "3α", "α²"],
    correct: 2,
    explanation: "Growth in all three directions multiplies: ΔV ≈ 3α·V₀·ΔT.",
  },
  {
    section: "fundamentals",
    question: "Cooling a bar below its starting temperature makes ΔT…",
    options: ["positive", "negative — the bar contracts", "zero", "larger always"],
    correct: 1,
    explanation: "ΔT < 0 gives ΔL < 0: the bar shrinks by the same physics that makes it grow when heated.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 2 m aluminium rail (α = 23×10⁻⁶/K) warms by 50 K. It grows by…",
    options: ["2.3 mm", "23 mm", "0.23 mm", "2.3 cm"],
    correct: 0,
    explanation: "ΔL = 23×10⁻⁶ × 2 × 50 = 2.3×10⁻³ m = 2.3 mm.",
  },
  {
    section: "application",
    question: "A 2 m mild steel bar (α = 12×10⁻⁶/K) under the same 50 K rise grows…",
    options: ["2.3 mm", "1.2 mm", "3.5 mm", "12 mm"],
    correct: 1,
    explanation: "ΔL = 12×10⁻⁶ × 2 × 50 = 1.2 mm — about half the aluminium's growth.",
  },
  {
    section: "application",
    question: "A 1 m³ aluminium block heated 50 K (α = 23×10⁻⁶) grows in volume by about…",
    options: ["1.15×10⁻³ m³ (1.15 L)", "3.45×10⁻³ m³ (3.45 L)", "3.45×10⁻⁴ m³", "0.115 L"],
    correct: 1,
    explanation: "ΔV ≈ 3αV₀ΔT = 3 × 23×10⁻⁶ × 1 × 50 = 3.45×10⁻³ m³.",
  },
  {
    section: "application",
    question: "A 10 m bridge span (steel, α = 12×10⁻⁶) experiences a 60 K seasonal swing. Its length change is about…",
    options: ["7.2 mm", "72 mm", "0.72 mm", "12 mm"],
    correct: 0,
    explanation: "ΔL = 12×10⁻⁶ × 10 × 60 = 7.2×10⁻³ m = 7.2 mm — why expansion joints exist.",
  },
  {
    section: "application",
    question: "Invar's α is about 1.2×10⁻⁶/K. A 1 m invar rod warming 50 K grows by…",
    options: ["0.06 mm", "0.6 mm", "1.2 mm", "6 mm"],
    correct: 0,
    explanation: "ΔL = 1.2×10⁻⁶ × 1 × 50 = 6×10⁻⁵ m = 0.06 mm — nearly 20× less than aluminium.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Railway tracks are laid with small gaps in summer-temperature conditions because…",
    options: ["aesthetics", "winter contraction would otherwise leave gaps anyway, and summer expansion would buckle solid rails", "trains prefer gaps", "it saves steel"],
    correct: 1,
    explanation: "Continuous welded rail manages the same 2.3 mm-per-2 m strain with pre-tension; unjointed rail would buckle in heat.",
  },
  {
    section: "analysis",
    question: "You double the initial length of a bar (same material, same ΔT). The strain ΔL/L₀…",
    options: ["doubles", "halves", "stays the same — only ΔL doubles", "quadruples"],
    correct: 2,
    explanation: "Strain = αΔT is fixed by material and temperature; the absolute growth ΔL scales with L₀.",
  },
  {
    section: "analysis",
    question: "A bimetallic strip (brass bonded to invar) bends when heated because…",
    options: ["both metals grow identically", "brass (higher α) expands more than invar, forcing the strip to curl toward the invar side", "glue melts", "invar shrinks"],
    correct: 1,
    explanation: "Mismatched expansion turns temperature into bending — the mechanism inside old thermostats.",
  },
  {
    section: "analysis",
    question: "A glass jar's metal lid is stuck. Running hot water over the LID helps because…",
    options: ["glass expands more than metal", "metal's larger α loosens the lid before the glass responds", "water lubricates", "heat melts the threads"],
    correct: 1,
    explanation: "Metals typically expand several times more than glass per kelvin; targeted heating frees the lid while the jar mouth barely moves.",
  },
  {
    section: "analysis",
    question: "The lab's α values are ~20 °C handbook values. Using a constant α for a 500 °C swing…",
    options: ["is exact", "is an approximation — α itself drifts with temperature", "reverses sign", "is invalid by a factor of 10 always"],
    correct: 1,
    explanation: "α varies with temperature (roughly linear-ish over moderate ranges); over extreme swings engineers use tabulated α(T).",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Thermal strain ΔL/L₀ equals…",
    options: ["α·ΔT", "α·L₀", "ΔT/α", "α + ΔT"],
    correct: 0,
    explanation: "Strain is the coefficient times temperature change — length-independent, a pure material response.",
  },
  {
    section: "fundamentals",
    question: "The linear expansion model assumes…",
    options: ["free, unrestrained expansion with constant α over the range", "the bar is clamped rigidly", "α grows with length", "phase changes are included"],
    correct: 0,
    explanation: "Restrained expansion generates stress instead of strain — a different (and crucial) engineering problem.",
  },
  {
    section: "fundamentals",
    question: "Which material would you choose for a length-standard reference bar?",
    options: ["Aluminium (α ≈ 23×10⁻⁶/K)", "Invar (α ≈ 1.2×10⁻⁶/K)", "Plastic (α ≈ 70×10⁻⁶/K)", "Any metal"],
    correct: 1,
    explanation: "Minimal α means minimal dimensional drift — why invar was used for survey tapes and clock pendulums.",
  },
  {
    section: "fundamentals",
    question: "Solids heated while FULLY RESTRAINED (no room to grow) develop…",
    options: ["nothing", "compressive thermal stress", "extra length anyway", "negative mass"],
    correct: 1,
    explanation: "Blocked expansion converts strain into stress (σ = E·αΔT) — enough to crack concrete or buckle rails.",
  },
  {
    section: "fundamentals",
    question: "ΔV ≈ 3α·V₀·ΔT uses 3α because…",
    options: ["volume is 3-dimensional; each dimension contributes αΔT", "3 is a safety factor", "density triples", "V is always cubic"],
    correct: 0,
    explanation: "(1+ε)³ ≈ 1+3ε for small strains: the three growth directions compound into the volume coefficient.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 30 m copper pipe (α = 17×10⁻⁶) cools by 40 K overnight. It shortens by about…",
    options: ["20.4 mm", "2.04 mm", "204 mm", "5.1 mm"],
    correct: 0,
    explanation: "ΔL = 17×10⁻⁶ × 30 × (−40) = −20.4×10⁻³ m — a 2 cm contraction that pulls at joints.",
  },
  {
    section: "application",
    question: "A 250 mm steel gauge block heated 10 K (α = 12×10⁻⁶) grows by…",
    options: ["30 μm", "3 μm", "300 μm", "0.3 μm"],
    correct: 0,
    explanation: "ΔL = 12×10⁻⁶ × 0.25 × 10 = 3×10⁻⁵ m = 30 μm — metrology labs control temperature for exactly this reason.",
  },
  {
    section: "application",
    question: "An aluminium rod must grow exactly 1.0 mm under a 100 K rise (α = 23×10⁻⁶). Its length should be…",
    options: ["about 0.43 m", "about 4.3 m", "about 0.23 m", "about 2.3 m"],
    correct: 0,
    explanation: "L₀ = ΔL/(αΔT) = 0.001/(23×10⁻⁶ × 100) ≈ 0.435 m.",
  },
  {
    section: "application",
    question: "A 5 L steel fuel tank (α = 12×10⁻⁶) warms 30 K. Its capacity grows by about…",
    options: ["5.4 mL", "1.8 mL", "18 mL", "0.6 mL"],
    correct: 0,
    explanation: "ΔV ≈ 3αV₀ΔT = 3 × 12×10⁻⁶ × 5 L × 30 = 5.4×10⁻³ L = 5.4 mL.",
  },
  {
    section: "application",
    question: "A pendulum clock's brass rod (α ≈ 19×10⁻⁶) lengthens on a hot day. The clock…",
    options: ["runs fast", "runs slow — longer pendulum, longer period", "is unaffected", "stops"],
    correct: 1,
    explanation: "T ∝ √L: even micrometres of growth per day matter — compensated pendulums mix metals to cancel it.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "An engineer must choose between a 2 m aluminium bar and a 2 m invar bar for a 200 K environment with tight clearance. Invar is better because…",
    options: ["it is cheaper", "its ΔL (≈0.48 mm) is ~19× smaller than aluminium's (≈9.2 mm)", "aluminium melts", "invar is lighter"],
    correct: 1,
    explanation: "ΔL_al = 23×10⁻⁶×2×200 = 9.2 mm vs ΔL_invar = 1.2×10⁻⁶×2×200 = 0.48 mm — material choice dominates expansion design.",
  },
  {
    section: "analysis",
    question: "Concrete roads are cut into segments with joints. Without them, a 20 °C rise in a 12 m slab (α ≈ 10×10⁻⁶) would try to grow…",
    options: ["0.24 mm — negligible", "2.4 mm per slab, accumulating kilometres of force", "24 mm", "zero"],
    correct: 1,
    explanation: "ΔL = 10×10⁻⁶ × 12 × 20 = 2.4 mm; unrestrained across hundreds of slabs, the accumulated strain becomes destructive compressive stress.",
  },
  {
    section: "analysis",
    question: "Bridges use expansion joints and rocker bearings because…",
    options: ["they look technical", "free expansion would otherwise become huge restrained stresses (σ = EαΔT)", "steel is rare", "water needs paths"],
    correct: 1,
    explanation: "For steel, σ = E·α·ΔT can reach ~2.4 MPa per kelvin — a 40 °C swing alone approaches yield; joints convert the stress back to motion.",
  },
  {
    section: "analysis",
    question: "A 100 m measuring tape made of steel used at 35 °C (calibrated at 20 °C, α = 12×10⁻⁶) reads distances as…",
    options: ["correct", "about 1.8 mm long per 100 m — the tape itself stretched", "short", "double"],
    correct: 1,
    explanation: "ΔL = 12×10⁻⁶ × 100 × 15 = 18 mm over the full tape: each tape-metre is stretched, so readings run ~18 mm short per 100 m unless corrected.",
  },
  {
    section: "analysis",
    question: "The lab exaggerates the drawn expansion ×300 because…",
    options: ["the physics is wrong", "real strains (parts per thousand) are invisible at true scale — a visualisation honesty note", "screens are small", "metals are transparent"],
    correct: 1,
    explanation: "ΔL/L₀ ≈ 0.1% is real but invisible; the lab labels the exaggeration explicitly rather than implying visible growth — a lesson in reading visualizations critically.",
  },
];
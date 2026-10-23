// Hooke's Law Springs Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; F = k·x, U = ½k·x², T = 2π√(m/k).

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Hooke's law states that the force a spring exerts is…",
    options: ["constant regardless of stretch", "proportional to its extension (F = k·x)", "proportional to the square of extension", "always zero at rest"],
    correct: 1,
    explanation: "F = k·x: the restoring force grows in proportion to the displacement, pulling back toward equilibrium.",
  },
  {
    section: "fundamentals",
    question: "The spring constant k measures…",
    options: ["the spring's length", "stiffness — newtons of force per metre of stretch", "the spring's mass", "its colour change"],
    correct: 1,
    explanation: "k (N/m) says how much force is needed per metre of extension: bigger k, stiffer spring.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of the spring constant is…",
    options: ["N/m", "N·m", "J", "kg"],
    correct: 0,
    explanation: "Force divided by length: newtons per metre.",
  },
  {
    section: "fundamentals",
    question: "The elastic potential energy stored in a stretched spring is…",
    options: ["k·x", "½·k·x²", "k·x²", "½·k·x"],
    correct: 1,
    explanation: "Energy = average force × distance = ½(kx)·x = ½kx² — the area under the force-extension line.",
  },
  {
    section: "fundamentals",
    question: "Hooke's law stops being valid when…",
    options: ["the spring is compressed", "the elastic limit is exceeded — the deformation becomes permanent", "the temperature drops", "the mass is doubled"],
    correct: 1,
    explanation: "Beyond the elastic limit the material yields: stretch no longer returns when the load is removed, and F = kx fails.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A spring with k = 200 N/m is stretched 0.10 m. The restoring force is…",
    options: ["2 N", "20 N", "200 N", "0.02 N"],
    correct: 1,
    explanation: "F = k·x = 200 × 0.10 = 20 N.",
  },
  {
    section: "application",
    question: "Same spring, same stretch: the stored elastic energy is…",
    options: ["1.0 J", "2.0 J", "0.5 J", "10 J"],
    correct: 0,
    explanation: "U = ½kx² = ½ × 200 × 0.01 = 1.0 J.",
  },
  {
    section: "application",
    question: "A 5 kg mass hangs on a spring (k = 250 N/m, g = 9.81). The static stretch is about…",
    options: ["0.20 m", "0.12 m", "0.50 m", "0.02 m"],
    correct: 0,
    explanation: "x = mg/k = 5 × 9.81/250 = 0.196 m ≈ 0.20 m.",
  },
  {
    section: "application",
    question: "A 1 kg mass oscillates on a k = 200 N/m spring. Its natural frequency is about…",
    options: ["2.25 Hz", "1.41 Hz", "14.1 Hz", "0.45 Hz"],
    correct: 0,
    explanation: "f = (1/2π)√(k/m) = (1/6.283)√200 ≈ 14.14/6.283 ≈ 2.25 Hz.",
  },
  {
    section: "application",
    question: "A spring stretches 0.05 m under a 10 N load. Its spring constant is…",
    options: ["50 N/m", "200 N/m", "500 N/m", "2 N/m"],
    correct: 1,
    explanation: "k = F/x = 10/0.05 = 200 N/m.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double the stretch of a spring. The stored energy…",
    options: ["doubles", "quadruples", "halves", "stays the same"],
    correct: 1,
    explanation: "U ∝ x²: twice the stretch stores four times the energy.",
  },
  {
    section: "analysis",
    question: "You double the spring constant (same stretch). The restoring force and stored energy…",
    options: ["both double", "force doubles; energy doubles too (U = ½kx²)", "both halve", "force doubles; energy quadruples"],
    correct: 1,
    explanation: "Both F = kx and U = ½kx² are linear in k at fixed x — a stiffer spring pulls twice as hard and stores twice the energy.",
  },
  {
    section: "analysis",
    question: "A mass-spring system oscillates. Its period depends on…",
    options: ["mass and spring constant only (T = 2π√(m/k))", "amplitude", "gravity", "the mass's colour"],
    correct: 0,
    explanation: "Unlike pendulums, horizontal mass-spring periods ignore g; amplitude only matters outside the linear Hooke regime.",
  },
  {
    section: "analysis",
    question: "A car's suspension spring compresses 0.15 m under the car's weight. Hitting a bump that compresses it a further 0.15 m multiplies the spring force by…",
    options: ["4×", "2×", "1.5×", "unchanged"],
    correct: 1,
    explanation: "F ∝ x: total compression doubles (0.30 m), so the force doubles — the simple proportionality drivers feel as 'stiffness'.",
  },
  {
    section: "analysis",
    question: "Engineers measure a spring stretched beyond its elastic limit. The lab model…",
    options: ["still applies exactly", "no longer applies — the lab explicitly warns the stretch is outside Hooke's law", "gives half the true force", "reverses sign"],
    correct: 1,
    explanation: "The lab's formulas hold only inside the elastic region and say so — a reminder that every model has a validity range.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The ½ in U = ½k·x² comes from…",
    options: ["rounding", "the force growing linearly from 0 to kx during the stretch (average force ½kx)", "the spring's mass", "air resistance"],
    correct: 1,
    explanation: "Work to stretch = average force × distance = (0 + kx)/2 × x = ½kx² — the area of the force-extension triangle.",
  },
  {
    section: "fundamentals",
    question: "A compression spring's force…",
    options: ["points along the compression, outward (restoring)", "points inward", "is zero", "doubles automatically"],
    correct: 0,
    explanation: "The restoring force always opposes the displacement: compressed springs push out, stretched springs pull in.",
  },
  {
    section: "fundamentals",
    question: "The mass-spring oscillator's period formula T = 2π√(m/k) assumes…",
    options: ["small oscillations within Hooke's law and a massless spring", "large amplitudes", "vertical orientation only", "no gravity anywhere"],
    correct: 0,
    explanation: "It needs F ∝ x (elastic region), negligible spring mass, and small damping.",
  },
  {
    section: "fundamentals",
    question: "Why can two springs share the same k but different lengths?",
    options: ["k depends on material, coil diameter, and wire geometry — not just length", "all springs have the same k", "longer is always stiffer", "k is fixed by colour"],
    correct: 0,
    explanation: "Spring rate comes from the whole design (wire thickness, coil count, diameter); length alone doesn't set stiffness.",
  },
  {
    section: "fundamentals",
    question: "In U = ½k·x², the variable x is measured from…",
    options: ["the spring's fixed end", "the natural (unstretched) length", "maximum compression", "the floor"],
    correct: 1,
    explanation: "x is displacement from the natural length — the reference where F and U are both zero.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 300 N/m spring must supply 45 N. The required extension is…",
    options: ["0.15 m", "0.12 m", "0.20 m", "1.5 m"],
    correct: 0,
    explanation: "x = F/k = 45/300 = 0.15 m.",
  },
  {
    section: "application",
    question: "A toy spring (k = 80 N/m) is compressed 0.25 m and stores…",
    options: ["2.5 J", "5.0 J", "10 J", "20 J"],
    correct: 0,
    explanation: "U = ½ × 80 × 0.0625 = 2.5 J.",
  },
  {
    section: "application",
    question: "A 2 kg mass on a k = 320 N/m spring oscillates with a period of about…",
    options: ["0.50 s", "0.94 s", "0.25 s", "1.57 s"],
    correct: 0,
    explanation: "T = 2π√(2/320) = 2π(0.0791) ≈ 0.497 s.",
  },
  {
    section: "application",
    question: "Stretching a k = 500 N/m spring by 0.10 m requires work of…",
    options: ["50 J", "25 J", "2.5 J", "5.0 J"],
    correct: 2,
    explanation: "W = U = ½ × 500 × 0.01 = 2.5 J — the work you do is stored as elastic energy.",
  },
  {
    section: "application",
    question: "A 0.4 kg mass hangs from a k = 100 N/m spring (g = 9.81). The static stretch is about…",
    options: ["0.039 m", "0.078 m", "0.39 m", "0.020 m"],
    correct: 0,
    explanation: "x = mg/k = 0.4 × 9.81/100 ≈ 0.039 m.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A trampoline's springs feel stiffer as you sink deeper. This suggests…",
    options: ["Hooke's law with constant k", "springs engage progressively or move past their linear region — k is not constant", "gravity grows", "the springs get shorter"],
    correct: 1,
    explanation: "Real systems often combine springs or leave the linear region; constant-k behaviour would feel evenly resistant at all depths.",
  },
  {
    section: "analysis",
    question: "You quadruple the oscillating mass on the same spring. The period…",
    options: ["quadruples", "doubles", "halves", "is unchanged"],
    correct: 1,
    explanation: "T ∝ √m: four times the mass doubles the period (and halves the frequency).",
  },
  {
    section: "analysis",
    question: "Two identical springs are used. Configuration A: side by side (parallel) sharing a load. Configuration B: end to end (series). A is…",
    options: ["softer than B", "stiffer than B — parallel springs share the load, doubling effective k", "identical to B", "impossible to compare"],
    correct: 1,
    explanation: "Parallel: each spring stretches the same x but shares the force → k_eff = 2k. Series: the same force flows through both, each adding stretch → k_eff = k/2.",
  },
  {
    section: "analysis",
    question: "A pogo stick spring is compressed 0.20 m storing 40 J. Releasing it fully converts that to kinetic energy of a 20 kg rider, launching them at about…",
    options: ["2.0 m/s", "6.3 m/s", "4.0 m/s", "20 m/s"],
    correct: 0,
    explanation: "v = √(2U/m) = √(2 × 40/20) = √4 = 2.0 m/s (ideal, no losses).",
  },
  {
    section: "analysis",
    question: "A scale uses a spring to read weight. On the Moon it reads…",
    options: ["the same mass as on Earth", "about 1/6 of the Earth reading — spring scales measure force, not mass", "zero always", "more than on Earth"],
    correct: 1,
    explanation: "A spring balance responds to force (mg); lower g means less stretch. Only a balance-scale (comparing masses) reads true mass everywhere.",
  },
];
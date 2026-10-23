// Simple Pendulum Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; T = 2π√(L/g), small-angle approximation, g = 9.81 m/s².

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The period of a simple pendulum is the time it takes to…",
    options: ["swing from one side to the other", "complete one full back-and-forth cycle", "reach its lowest point", "lose half its energy"],
    correct: 1,
    explanation: "One period = a full cycle: out, back, and returning to the starting state.",
  },
  {
    section: "fundamentals",
    question: "The standard simple-pendulum period formula T = 2π√(L/g) is…",
    options: ["exact for all angles", "a small-angle approximation, accurate up to roughly 15°", "only valid at 45°", "valid only in vacuum"],
    correct: 1,
    explanation: "sinθ ≈ θ (radians) drives the formula; beyond about 15° the real period grows a few percent above it.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of frequency is the…",
    options: ["second", "hertz (1/s)", "metre", "radian"],
    correct: 1,
    explanation: "Frequency counts cycles per second, so its unit is the hertz — the inverse of the period's unit.",
  },
  {
    section: "fundamentals",
    question: "The restoring force that pulls a pendulum back toward the centre is…",
    options: ["a component of the bob's weight", "air drag", "the string's tension alone", "the bob's inertia"],
    correct: 0,
    explanation: "Gravity's component along the arc, mg·sinθ, points toward the lowest point and drives the oscillation.",
  },
  {
    section: "fundamentals",
    question: "Which variable does NOT appear in the simple-pendulum period formula?",
    options: ["length L", "gravitational acceleration g", "the bob's mass m", "all three appear"],
    correct: 2,
    explanation: "Mass cancels: heavier bobs feel proportionally more force and more inertia, so the period is mass-independent.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A pendulum with L = 1 m on Earth (g = 9.81 m/s²) has a period of about…",
    options: ["1.00 s", "2.01 s", "3.14 s", "6.28 s"],
    correct: 1,
    explanation: "T = 2π√(1/9.81) = 2π(0.3193) ≈ 2.01 s.",
  },
  {
    section: "application",
    question: "A pendulum of length 0.25 m (g = 9.81 m/s²) has a period of about…",
    options: ["0.50 s", "1.00 s", "2.01 s", "4.00 s"],
    correct: 1,
    explanation: "T = 2π√(0.25/9.81) ≈ 2π(0.1595) ≈ 1.00 s — quarter the length halves the period.",
  },
  {
    section: "application",
    question: "The frequency of a pendulum with a 2.0 s period is…",
    options: ["2.0 Hz", "0.5 Hz", "0.25 Hz", "1.0 Hz"],
    correct: 1,
    explanation: "f = 1/T = 1/2.0 = 0.5 Hz.",
  },
  {
    section: "application",
    question: "A pendulum swings through 12 full cycles in 30 s. Its period is…",
    options: ["0.40 s", "2.5 s", "0.83 s", "12 s"],
    correct: 1,
    explanation: "T = 30/12 = 2.5 s per cycle.",
  },
  {
    section: "application",
    question: "A pendulum of length 2.0 m (g = 9.81 m/s²) has a period of about…",
    options: ["1.42 s", "2.84 s", "4.02 s", "2.01 s"],
    correct: 1,
    explanation: "T = 2π√(2/9.81) = 2π(0.4515) ≈ 2.84 s.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You quadruple a pendulum's length. Its period…",
    options: ["quadruples", "doubles", "halves", "stays the same"],
    correct: 1,
    explanation: "T ∝ √L: four times the length gives √4 = 2 times the period.",
  },
  {
    section: "analysis",
    question: "A pendulum moved to the Moon (g ≈ 1.62 m/s²) with the same length will…",
    options: ["swing about 2.5× faster", "swing about 2.5× slower", "keep the same period", "stop oscillating"],
    correct: 1,
    explanation: "T ∝ 1/√g: √(9.81/1.62) ≈ 2.46, so the period grows about 2.5× — lunar pendulums run slow.",
  },
  {
    section: "analysis",
    question: "You replace a pendulum's steel bob with a wooden one of the same size (same length, small angle). The period…",
    options: ["increases", "decreases", "stays the same", "depends on the wood's density"],
    correct: 2,
    explanation: "Period is independent of mass — the exchange changes nothing (apart from tiny air-drag effects this model ignores).",
  },
  {
    section: "analysis",
    question: "Releasing the same pendulum from 10° instead of 5° (both small angles) changes the measured period by…",
    options: ["about double", "about four times", "almost nothing — both are inside the small-angle regime", "a factor of sin5°/sin10°"],
    correct: 2,
    explanation: "Within the small-angle approximation the period does not depend on amplitude at all — isochronism.",
  },
  {
    section: "analysis",
    question: "A clock's pendulum runs slow. The correct adjustment is to…",
    options: ["lengthen the pendulum", "shorten the pendulum", "add mass to the bob", "increase the swing amplitude"],
    correct: 1,
    explanation: "Slow means the period is too long; shortening L reduces T ∝ √L and speeds the clock up. Mass and amplitude won't help.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The period formula T = 2π√(L/g) is called an approximation because…",
    options: ["π is not known exactly", "it replaces sinθ with θ (radians), which only holds for small angles", "strings stretch", "air resistance is always large"],
    correct: 1,
    explanation: "The exact restoring force uses sinθ; the formula assumes sinθ ≈ θ, accurate only for small swings.",
  },
  {
    section: "fundamentals",
    question: "At the lowest point of the swing, the pendulum bob has…",
    options: ["maximum speed, with gravity having no tangential component", "zero speed", "maximum height", "zero tension"],
    correct: 0,
    explanation: "All the height energy has become kinetic energy there; gravity acts along the string, so speed is maximal.",
  },
  {
    section: "fundamentals",
    question: "The dimensions of the quantity under the square root in T = 2π√(L/g) are…",
    options: ["[T²], giving a time overall", "[L], giving a length overall", "dimensionless", "[L/T]"],
    correct: 0,
    explanation: "L/g has units of s² (m ÷ m/s²), so √(L/g) is a time and the whole formula is a time — a quick dimensional sanity check.",
  },
  {
    section: "fundamentals",
    question: "The energy of an ideal pendulum swaps between…",
    options: ["kinetic and gravitational potential energy", "heat and light", "tension and compression", "chemical and kinetic energy"],
    correct: 0,
    explanation: "Height at the extremes stores potential energy; at the bottom it has all become kinetic energy.",
  },
  {
    section: "fundamentals",
    question: "The pendulum's motion is called simple harmonic because the restoring force is…",
    options: ["constant", "proportional to the displacement (for small angles)", "always downward", "proportional to velocity"],
    correct: 1,
    explanation: "F ≈ −mg·θ·L is proportional to angular displacement — the defining feature of simple harmonic motion.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A child's swing has an effective length of 2.0 m (g = 9.81 m/s²). Its period is about…",
    options: ["1.42 s", "2.84 s", "4.02 s", "2.01 s"],
    correct: 1,
    explanation: "T = 2π√(2/9.81) = 2π(0.4515) ≈ 2.84 s.",
  },
  {
    section: "application",
    question: "You want a pendulum with a 3.0 s period on Earth. Its length should be about…",
    options: ["0.71 m", "1.45 m", "2.23 m", "4.50 m"],
    correct: 2,
    explanation: "L = g(T/2π)² = 9.81(3/6.283)² = 9.81(0.4775)² ≈ 2.23 m.",
  },
  {
    section: "application",
    question: "A pendulum with L = 0.5 m has a frequency of about… (g = 9.81 m/s²)",
    options: ["0.35 Hz", "0.70 Hz", "1.42 Hz", "2.84 Hz"],
    correct: 1,
    explanation: "T = 2π√(0.5/9.81) ≈ 1.42 s, so f = 1/1.42 ≈ 0.70 Hz.",
  },
  {
    section: "application",
    question: "A grandfather clock's pendulum is 0.994 m long. At g = 9.81 m/s² its period is closest to…",
    options: ["1.00 s", "2.00 s", "3.00 s", "0.50 s"],
    correct: 1,
    explanation: "T = 2π√(0.994/9.81) ≈ 2.00 s — the classic “seconds pendulum”, whose one-way swing takes about 1 s.",
  },
  {
    section: "application",
    question: "A pendulum released from rest at 10° rises on the other side (ideal model) to…",
    options: ["5°", "10°", "20°", "0°"],
    correct: 1,
    explanation: "With no losses, energy conservation makes the far swing reach the same height — the same 10°.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "One pendulum is 4× longer than another. Its frequency is…",
    options: ["4× larger", "2× larger", "half as large", "a quarter as large"],
    correct: 2,
    explanation: "f ∝ 1/√L: 4× length doubles T, halving f.",
  },
  {
    section: "analysis",
    question: "A pendulum taken up a mountain (g slightly smaller) runs…",
    options: ["slightly fast", "slightly slow", "at exactly the same rate", "only when cold"],
    correct: 1,
    explanation: "Smaller g increases T = 2π√(L/g), so the clock loses time at altitude — a real effect pendulum clocks showed.",
  },
  {
    section: "analysis",
    question: "You double a pendulum's length AND move it to a planet with 4× Earth's gravity. Its period…",
    options: ["doubles", "halves", "stays the same", "quadruples"],
    correct: 2,
    explanation: "T ∝ √(L/g): both L and g are multiplied by 4, so the ratio — and the period — are unchanged.",
  },
  {
    section: "analysis",
    question: "A pendulum is released at 60° — well outside the small-angle range. Compared with the formula's prediction, its real period is…",
    options: ["shorter", "longer", "identical", "impossible to swing"],
    correct: 1,
    explanation: "At large angles sinθ < θ, so the restoring force is weaker than the formula assumes and the period grows (about +7% at 60°).",
  },
  {
    section: "analysis",
    question: "To build a metronome marking 60 beats per minute with a pendulum, you need a period of…",
    options: ["1.0 s, needing L ≈ 0.25 m", "2.0 s, needing L ≈ 1 m", "0.5 s, needing L ≈ 0.06 m", "any length works"],
    correct: 0,
    explanation: "60 beats/min = 1 beat per second; L = g(T/2π)² = 9.81(1/6.283)² ≈ 0.248 m.",
  },
];
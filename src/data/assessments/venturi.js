// Venturi & Continuity Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; Q = A·v, ΔP = ½ρ(v₂²−v₁²), Δh = ΔP/(ρg), water ρ = 1000 kg/m³.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The continuity equation for steady incompressible flow states…",
    options: ["A₁v₁ = A₂v₂", "A₁v₂ = A₂v₁", "v ∝ A", "Q = A + v"],
    correct: 0,
    explanation: "Volume flow rate Q = Av is conserved: shrink the area and the speed must grow proportionally.",
  },
  {
    section: "fundamentals",
    question: "A Venturi meter measures flow rate using…",
    options: ["a moving paddle", "the pressure drop across a deliberate contraction", "water temperature", "the fluid's colour"],
    correct: 1,
    explanation: "Continuity fixes the speed-up at the throat; Bernoulli converts that into a readable pressure drop — no moving parts.",
  },
  {
    section: "fundamentals",
    question: "Volume flow rate is measured in…",
    options: ["m/s", "m³/s (cubic metres per second)", "Pa", "N"],
    correct: 1,
    explanation: "Q = A(m²) × v(m/s) → m³/s; the lab also shows litres per second (1 L/s = 0.001 m³/s).",
  },
  {
    section: "fundamentals",
    question: "Cross-sectional area of a circular pipe of diameter d is…",
    options: ["π·d²", "π·d²/4", "2π·d", "d²"],
    correct: 1,
    explanation: "A = πr² = π(d/2)² = πd²/4 — halving the diameter leaves a quarter of the area.",
  },
  {
    section: "fundamentals",
    question: "The pressure reading of a manometer converts to liquid-column height via…",
    options: ["Δh = ΔP/(ρ·g)", "Δh = ΔP·ρ·g", "Δh = ρg/ΔP", "Δh = ΔP·g"],
    correct: 0,
    explanation: "A static column of height Δh produces pressure ρgΔh — so dividing the pressure drop by ρg gives the height.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Water flows at 0.01 m³/s through a 10 cm diameter pipe. The average speed is about…",
    options: ["1.27 m/s", "12.7 m/s", "0.13 m/s", "3.18 m/s"],
    correct: 0,
    explanation: "A = π(0.05)² ≈ 0.00785 m²; v = Q/A = 0.01/0.00785 ≈ 1.27 m/s.",
  },
  {
    section: "application",
    question: "The flow enters a 4 cm throat. The speed there is about…",
    options: ["2.5 m/s", "7.96 m/s", "1.27 m/s", "31.8 m/s"],
    correct: 1,
    explanation: "A = π(0.02)² ≈ 0.001257 m²; v = 0.01/0.001257 ≈ 7.96 m/s — the (10/4)² = 6.25× area ratio.",
  },
  {
    section: "application",
    question: "With those speeds (1.27 → 7.96 m/s, water), the pressure drop across the contraction is about…",
    options: ["3.1 kPa", "30.9 kPa", "0.3 kPa", "98.1 kPa"],
    correct: 1,
    explanation: "ΔP = ½ρ(v₂²−v₁²) = ½×1000×(63.3−1.6) ≈ 30.9 kPa.",
  },
  {
    section: "application",
    question: "That pressure drop corresponds to a water manometer height of about…",
    options: ["0.31 m", "3.15 m", "0.03 m", "9.81 m"],
    correct: 1,
    explanation: "Δh = ΔP/(ρg) = 30 850/9810 ≈ 3.15 m.",
  },
  {
    section: "application",
    question: "A garden hose delivers 0.0002 m³/s (0.2 L/s) through a 2 cm nozzle. The exit speed is about…",
    options: ["0.64 m/s", "6.4 m/s", "1.6 m/s", "0.08 m/s"],
    correct: 0,
    explanation: "A = π(0.01)² ≈ 3.14×10⁻⁴ m²; v = 0.0002/0.000314 ≈ 0.64 m/s.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You halve the throat diameter (same flow rate). The throat speed…",
    options: ["doubles", "quadruples — speed scales with area, i.e. d²", "halves", "is unchanged"],
    correct: 1,
    explanation: "v = Q/A ∝ 1/d²: half the diameter leaves a quarter of the area, so the water moves 4× faster.",
  },
  {
    section: "analysis",
    question: "Because the pressure drop goes as v₂², halving the throat diameter multiplies the manometer reading by roughly…",
    options: ["4× (speed) squared = 16×", "4×", "2×", "8×"],
    correct: 0,
    explanation: "v₂ grows 4×; ΔP ∝ v₂² grows ~16× — the steep part of the lab's Δh-vs-d₂ curve.",
  },
  {
    section: "analysis",
    question: "The manometer in the lab is filled with the SAME fluid as the pipe. If it used a denser manometer fluid, the column height would be…",
    options: ["taller", "shorter — Δh = ΔP/(ρfluid·g) shrinks as the fluid density grows", "identical", "zero"],
    correct: 1,
    explanation: "A denser indicating fluid needs less height for the same pressure — why real manometers use mercury.",
  },
  {
    section: "analysis",
    question: "This meter reads flow with no moving parts, but ideal Bernoulli ignores viscosity. For very slow, syrup-like flow, the ideal ΔP would…",
    options: ["match reality", "underestimate the true pressure drop — viscous losses add to it", "overestimate it", "become negative"],
    correct: 1,
    explanation: "Real meters need a discharge coefficient < 1 because friction adds losses the ideal model omits; slow viscous flows exaggerate this.",
  },
  {
    section: "analysis",
    question: "A Venturi scrubber in a carburetor uses the throat's low pressure to…",
    options: ["compress fuel", "draw fuel up into the fast, low-pressure air stream", "cool the engine", "measure speed digitally"],
    correct: 1,
    explanation: "Fast flow at the throat drops below atmospheric — fuel is literally sucked in: Bernoulli at work under every old bonnet.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Why is continuity (Q = Av) exact for incompressible flow?",
    options: ["liquids are rigid", "the same volume must pass every cross-section per second — it has nowhere else to go", "pipes are wide", "velocity is constant"],
    correct: 1,
    explanation: "Water can't be stored inside a full rigid pipe: volume in = volume out at every instant.",
  },
  {
    section: "fundamentals",
    question: "In a Venturi, the pressure is lowest…",
    options: ["in the wide section", "at the throat, where speed is highest", "at the walls", "downstream of the meter"],
    correct: 1,
    explanation: "Bernoulli trades pressure for speed: maximum speed = minimum pressure at the constriction.",
  },
  {
    section: "fundamentals",
    question: "The Venturi meter's ideal model assumes…",
    options: ["steady, incompressible, non-viscous flow along a horizontal pipe", "turbulent flow", "compressible gas flow", "a moving piston"],
    correct: 0,
    explanation: "Those are the three standard Bernoulli assumptions; real devices add a discharge coefficient for losses.",
  },
  {
    section: "fundamentals",
    question: "How is the Venturi lab's objective different from the Bernoulli Flow lab's?",
    options: ["they are identical", "Venturi focuses on measuring flow rate from the manometer reading; Bernoulli focuses on the speed-pressure trade along a varying pipe", "Venturi is about heat", "Bernoulli is about density"],
    correct: 1,
    explanation: "The same physics, two engineering uses: the Venturi meter quantifies Q from Δh; the Bernoulli lab explores the energy balance itself.",
  },
  {
    section: "fundamentals",
    question: "A nozzle accelerates flow from area A₁ to A₂ = A₁/4. By continuity, the velocity…",
    options: ["is quartered", "quadruples", "halves", "is unchanged"],
    correct: 1,
    explanation: "v₂ = v₁·(A₁/A₂) = 4v₁: area ratio fixes the speed ratio in incompressible flow.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Air (ρ = 1.2) flows through a duct at 3 m/s and reaches a contraction where it moves 12 m/s. The pressure drop is about…",
    options: ["43 Pa", "86 Pa", "430 Pa", "8.6 Pa"],
    correct: 1,
    explanation: "ΔP = ½×1.2×(12²−3²) = 0.6×135 = 81 Pa ≈ 86 Pa — air's low density makes the drop small, hence sensitive instruments.",
  },
  {
    section: "application",
    question: "A Venturi throat of 5 cm carries 0.02 m³/s. The throat speed is about…",
    options: ["10.2 m/s", "5.1 m/s", "20.4 m/s", "2.5 m/s"],
    correct: 0,
    explanation: "A = π(0.025)² ≈ 0.001963 m²; v = 0.02/0.001963 ≈ 10.2 m/s.",
  },
  {
    section: "application",
    question: "A water manometer across a venturi reads Δh = 0.5 m. The pressure drop is about…",
    options: ["0.5 kPa", "4.9 kPa", "49 kPa", "98 kPa"],
    correct: 1,
    explanation: "ΔP = ρgΔh = 1000 × 9.81 × 0.5 ≈ 4.9 kPa.",
  },
  {
    section: "application",
    question: "In a 6 cm pipe (v₁ = 2 m/s) narrowing to 3 cm, the throat speed is…",
    options: ["4 m/s", "8 m/s", "2 m/s", "1 m/s"],
    correct: 1,
    explanation: "Area ratio (6/3)² = 4 → v₂ = 4 × 2 = 8 m/s.",
  },
  {
    section: "application",
    question: "A fire hose must deliver 0.0125 m³/s. For an exit speed of 25 m/s the nozzle area must be…",
    options: ["0.0005 m² (about 2.5 cm diameter)", "0.005 m²", "0.3 m²", "0.05 m²"],
    correct: 0,
    explanation: "A = Q/v = 0.0125/25 = 0.0005 m² → d = √(4A/π) ≈ 0.025 m.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double the flow rate through the same Venturi. The manometer height…",
    options: ["doubles", "quadruples — ΔP ∝ v²", "halves", "is unchanged"],
    correct: 1,
    explanation: "All speeds double; ΔP = ½ρΔ(v²) scales with the SQUARE of speed → Δh ×4.",
  },
  {
    section: "analysis",
    question: "A student proposes measuring the throat pressure with the manometer connected to the WIDE section only. The reading would…",
    options: ["still be correct", "miss the drop — you need the difference between wide and throat", "double the Δh", "explode"],
    correct: 1,
    explanation: "The meter works on the pressure DIFFERENCE between two points; one tap measures only a reference pressure.",
  },
  {
    section: "analysis",
    question: "In ideal Bernoulli, flow through the wide section after the throat returns to its original pressure. Real meters show slightly less recovery because…",
    options: ["energy is created", "viscous friction converts some pressure head irreversibly to heat", "the throat stores water", "gravity reverses"],
    correct: 1,
    explanation: "Diffusion losses downstream of the throat are why measured recovery never quite matches the ideal model.",
  },
  {
    section: "analysis",
    question: "To get a LARGER manometer reading for a small flow (better resolution), an engineer should…",
    options: ["widen the throat", "narrow the throat further", "increase the pipe diameter", "reduce the density"],
    correct: 1,
    explanation: "A smaller throat raises v₂ and especially ΔP ∝ v₂², amplifying the reading — until cavitation or losses limit it.",
  },
  {
    section: "analysis",
    question: "At very high throat speeds, water's pressure at the throat can drop near zero absolute. The real-world danger is…",
    options: ["nothing — ideal model holds", "cavitation: bubbles form violently and collapse, eroding the meter", "the manometer freezes", "continuity reverses"],
    correct: 1,
    explanation: "The ideal model has no lower pressure bound; real water flashes to vapour below its vapour pressure — a design limit the lab's assumptions don't capture.",
  },
];
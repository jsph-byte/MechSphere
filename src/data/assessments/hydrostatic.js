// Hydrostatic Pressure Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; P_gauge = ρ·g·h, P_abs = P_ref + ρ·g·h, g = 9.81 m/s².

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Hydrostatic pressure at a depth h in a fluid is…",
    options: ["ρ·g·h", "ρ·g·h²", "m·g·h", "ρ·h/g"],
    correct: 0,
    explanation: "P = ρgh: the weight of the fluid column above, per unit area.",
  },
  {
    section: "fundamentals",
    question: "Gauge pressure is…",
    options: ["total pressure", "pressure relative to the reference (usually atmospheric) pressure", "negative pressure", "pressure in pascals"],
    correct: 1,
    explanation: "Gauge = absolute − reference. A tyre gauge reads zero at atmospheric pressure.",
  },
  {
    section: "fundamentals",
    question: "Hydrostatic pressure in a static fluid acts…",
    options: ["only downward", "equally in all directions at a given depth", "only sideways", "only upward"],
    correct: 1,
    explanation: "Pascal's principle: at a given depth, pressure pushes equally on any surface, whatever its orientation.",
  },
  {
    section: "fundamentals",
    question: "Which pair of quantities does hydrostatic pressure NOT depend on?",
    options: ["depth and fluid density", "gravity", "the total volume of fluid", "none — all three matter"],
    correct: 2,
    explanation: "P = ρgh has no volume term: a 1 cm tube and a lake at 10 m depth give the same pressure.",
  },
  {
    section: "fundamentals",
    question: "1 atmosphere of pressure is about…",
    options: ["1.013 kPa", "101.3 kPa", "1013 kPa", "10.13 kPa"],
    correct: 1,
    explanation: "Standard atmosphere = 101 325 Pa ≈ 101.3 kPa.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "The gauge pressure 10 m under fresh water (ρ = 1000 kg/m³) is about…",
    options: ["9.81 kPa", "98.1 kPa", "981 kPa", "101.3 kPa"],
    correct: 1,
    explanation: "P = ρgh = 1000 × 9.81 × 10 = 98 100 Pa ≈ 98.1 kPa — roughly one atmosphere per 10 m of water.",
  },
  {
    section: "application",
    question: "The absolute pressure at that same depth (atmospheric = 101.3 kPa) is about…",
    options: ["101.3 kPa", "199.4 kPa", "98.1 kPa", "299.1 kPa"],
    correct: 1,
    explanation: "P_abs = 101.3 + 98.1 = 199.4 kPa — about 2 atm at 10 m.",
  },
  {
    section: "application",
    question: "A submarine at 200 m depth (sea water ρ ≈ 1025) experiences gauge pressure of about…",
    options: ["2.03 MPa", "20.3 kPa", "0.98 MPa", "101 kPa"],
    correct: 0,
    explanation: "P = 1025 × 9.81 × 200 ≈ 2.011×10⁶ Pa ≈ 2.01 MPa (≈ 20 atm).",
  },
  {
    section: "application",
    question: "The force of hydrostatic pressure on a 1 m² vertical dam gate at average depth 5 m (fresh water) is about…",
    options: ["4.9 kN", "49.1 kN", "98.1 kN", "981 kN"],
    correct: 1,
    explanation: "F = P·A = ρgh·A = 1000 × 9.81 × 5 × 1 = 49 050 N ≈ 49 kN.",
  },
  {
    section: "application",
    question: "At what depth in fresh water is the gauge pressure 196.2 kPa?",
    options: ["10 m", "20 m", "5 m", "40 m"],
    correct: 1,
    explanation: "h = P/(ρg) = 196 200/(1000 × 9.81) = 20 m.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You dive from 5 m to 15 m depth. Your gauge pressure…",
    options: ["doubles", "triples", "increases by the same absolute amount (ΔP = ρgΔh = 98.1 kPa)", "stays the same"],
    correct: 1,
    explanation: "Gauge pressure is linear in depth: 0→5 m adds 49 kPa, 5→15 m adds 98 kPa, making the 15 m value 3× the 5 m value (147 vs 49 kPa).",
  },
  {
    section: "analysis",
    question: "A tall thin tube and a wide swimming pool both filled to 10 m (same fluid). The pressure at the bottom is…",
    options: ["larger in the pool", "larger in the tube", "identical — pressure depends on depth, not volume or shape", "zero in the tube"],
    correct: 2,
    explanation: "The hydrostatic paradox: only the height of fluid above matters. Shape and total volume are irrelevant.",
  },
  {
    section: "analysis",
    question: "Your ears 'pop' diving down because…",
    options: ["water enters the ear canal and the outside pressure rises with depth", "sound changes underwater", "the eardrum vibrates more", "pressure decreases with depth"],
    correct: 0,
    explanation: "Rising external pressure pushes on the eardrum until you equalize — direct evidence of ρgh.",
  },
  {
    section: "analysis",
    question: "Switching the fluid from water (1000) to mercury (13 600 kg/m³) at the same depth multiplies gauge pressure by…",
    options: ["13.6", "136", "1.36", "1"],
    correct: 0,
    explanation: "P ∝ ρ: mercury is 13.6× denser — which is why barometers need only 0.76 m of it.",
  },
  {
    section: "analysis",
    question: "A dam wall is thicker at the base than the top because…",
    options: ["builders over-design", "hydrostatic pressure grows linearly with depth, so the base must resist more force", "the base is in earth", "water is heavier at the bottom"],
    correct: 1,
    explanation: "The pressure triangle on a dam wall grows with depth — the structural thickness must grow with it.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Absolute pressure equals…",
    options: ["gauge pressure only", "reference pressure + gauge pressure", "gauge − atmospheric", "ρgh alone"],
    correct: 1,
    explanation: "P_abs = P_ref + ρgh: the lab lets you set the reference (atmospheric for open water, other values for sealed systems).",
  },
  {
    section: "fundamentals",
    question: "The hydrostatic pressure formula's direction-independence is summarized by…",
    options: ["Archimedes' principle", "Pascal's principle (pressure transmits equally in a static fluid)", "Newton's third law", "Bernoulli's equation"],
    correct: 1,
    explanation: "A static fluid at a given depth pushes equally in every direction — the basis of hydraulic systems.",
  },
  {
    section: "fundamentals",
    question: "Pressure is defined as…",
    options: ["force × area", "force per unit area", "energy per area", "mass per volume"],
    correct: 1,
    explanation: "P = F/A, in pascals (N/m²) — a small force on a tiny area can be a huge pressure.",
  },
  {
    section: "fundamentals",
    question: "In P = ρgh, g appears because…",
    options: ["fluids are heavy in proportion to gravity", "pressure is the weight of the fluid column per area", "of tradition", "fluids accelerate"],
    correct: 1,
    explanation: "A fluid column's weight (mg = ρV·g) presses on its base; dividing by area leaves ρgh.",
  },
  {
    section: "fundamentals",
    question: "The hydrostatic model assumes the fluid is…",
    options: ["static and (here) incompressible with constant density", "flowing rapidly", "compressible like a gas", "weightless"],
    correct: 0,
    explanation: "Hydrostatics = fluids at rest; density constant with depth is a good model for liquids.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Olive oil (ρ ≈ 915 kg/m³) at 2 m depth has a gauge pressure of about…",
    options: ["17.9 kPa", "19.6 kPa", "9.2 kPa", "1.8 kPa"],
    correct: 0,
    explanation: "P = 915 × 9.81 × 2 ≈ 17 946 Pa ≈ 17.9 kPa.",
  },
  {
    section: "application",
    question: "A hiker at 2500 m (atmosphere ≈ 75 kPa) dives 3 m into a lake. The absolute pressure is about…",
    options: ["104 kPa", "29 kPa", "75 kPa", "98 kPa"],
    correct: 0,
    explanation: "P_abs = 75 + 1000×9.81×3/1000 = 75 + 29.4 ≈ 104 kPa — the reference pressure matters as much as depth.",
  },
  {
    section: "application",
    question: "A sealed tank holds air at 300 kPa above a 4 m column of water. The pressure at the bottom is…",
    options: ["339 kPa", "300 kPa", "304 kPa", "400 kPa"],
    correct: 0,
    explanation: "P_abs = 300 + 39.2 ≈ 339 kPa — pressurized header tanks keep taps flowing upstairs.",
  },
  {
    section: "application",
    question: "A rectangular gate 2 m wide reaches from the surface to 6 m depth in fresh water. The total hydrostatic force on it is about…",
    options: ["353 kN", "176 kN", "707 kN", "59 kN"],
    correct: 0,
    explanation: "Average pressure = ρg(h/2) = 1000×9.81×3 = 29.4 kPa; F = P_avg × A = 29 430 × (2×6) ≈ 353 kN.",
  },
  {
    section: "application",
    question: "In a manometer open to the atmosphere, the height difference reads 0.25 m of mercury (ρ = 13 600). The gauge pressure is about…",
    options: ["2.0 kPa", "33.4 kPa", "13.6 kPa", "0.34 kPa"],
    correct: 1,
    explanation: "P = 13 600 × 9.81 × 0.25 ≈ 33 354 Pa ≈ 33.4 kPa — mercury's density keeps manometers compact.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A lab counts on pressure at 30 cm of water being 'negligible' in a leak test. ρgh at 0.3 m is about…",
    options: ["0.3 kPa — usually negligible compared with pipe pressures", "30 kPa — significant", "3 kPa — critical", "98 kPa"],
    correct: 0,
    explanation: "P = 1000×9.81×0.3 ≈ 2.9 kPa. Whether 'negligible' is valid depends on the other pressures in the system — model judgment.",
  },
  {
    section: "analysis",
    question: "On Mars (g ≈ 3.71 m/s²), the gauge pressure 10 m down a Martian water tank would be…",
    options: ["about 37 kPa instead of 98 kPa — P ∝ g", "the same", "higher", "zero"],
    correct: 0,
    explanation: "P = ρgh scales linearly with g: 1000 × 3.71 × 10 = 37.1 kPa.",
  },
  {
    section: "analysis",
    question: "Two divers, one in a fresh lake (1000) and one in the Dead Sea (1240 kg/m³), descend to the same 10 m. The Dead Sea diver feels…",
    options: ["less pressure", "more pressure — about 24% more gauge pressure", "identical pressure", "no pressure"],
    correct: 1,
    explanation: "P ∝ ρ: 1240/1000 = 1.24 → 121.6 kPa vs 98.1 kPa gauge. Denser brines press harder.",
  },
  {
    section: "analysis",
    question: "A barometer uses 0.76 m of mercury to measure the atmosphere. Using water instead would require a column of about…",
    options: ["0.76 m", "10.3 m", "76 m", "1.03 m"],
    correct: 1,
    explanation: "h = P/(ρg) = 101 325/(1000×9.81) ≈ 10.3 m — mercury's density is why barometers are desk-sized.",
  },
  {
    section: "analysis",
    question: "A dam's design pressure uses gauge values (no atmospheric term). Why is that safe?",
    options: ["atmosphere is imaginary", "atmospheric pressure acts on BOTH sides of the wall and cancels", "gauge pressure is always larger", "dams are in vacuum"],
    correct: 1,
    explanation: "The atmosphere pushes on the downstream face too, so the NET structural load is the gauge pressure ρgh — one of engineering's everyday cancellations.",
  },
];
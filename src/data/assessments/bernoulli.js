// Bernoulli Flow Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// All numerical answers hand-verified.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "For steady incompressible flow through a pipe, the continuity equation states that…",
    options: ["A₁·v₁ = A₂·v₂", "P₁ = P₂ everywhere", "v₁ = v₂ in all sections", "A·v decreases along the pipe"],
    correct: 0,
    explanation: "Conservation of mass for an incompressible fluid: the volume flow rate Q = A·v is the same at every cross-section.",
  },
  {
    section: "fundamentals",
    question: "Bernoulli's equation is best understood as a statement of…",
    options: ["conservation of mass", "conservation of energy per unit volume for ideal flow", "Newton's third law", "conservation of temperature"],
    correct: 1,
    explanation: "P + ½ρv² + ρgz staying constant is mechanical energy (pressure + kinetic + potential) per unit volume for ideal steady flow.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of volume flow rate Q is…",
    options: ["m/s", "m²/s", "m³/s", "L·s"],
    correct: 2,
    explanation: "Q = A·v has units of m² × m/s = m³/s (cubic metres per second).",
  },
  {
    section: "fundamentals",
    question: "Which of these is NOT an assumption of the simple Bernoulli model used in this lab?",
    options: ["The flow is steady", "The fluid is incompressible", "Viscosity (friction) is negligible", "The pipe must be vertical"],
    correct: 3,
    explanation: "Bernoulli's equation works for any orientation of pipe — horizontal, vertical, or tilted. Steady, incompressible, inviscid flow along a streamline are the real assumptions.",
  },
  {
    section: "fundamentals",
    question: "For a circular pipe of inner diameter d, the cross-sectional area open to flow equals…",
    options: ["π·d²/4", "π·d²/2", "2·π·d", "d²"],
    correct: 0,
    explanation: "The area of a circle is πr², and with r = d/2 this gives A = π·d²/4.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Water flows at 4.0 m/s through a pipe section of area 0.0050 m². The volume flow rate is…",
    options: ["0.0008 m³/s", "0.020 m³/s", "0.80 m³/s", "20 m³/s"],
    correct: 1,
    explanation: "Q = A·v = 0.0050 × 4.0 = 0.020 m³/s.",
  },
  {
    section: "application",
    question: "A pipe carries Q = 0.020 m³/s. At a section with cross-sectional area 0.0040 m², the average speed is…",
    options: ["0.08 m/s", "2.0 m/s", "5.0 m/s", "50 m/s"],
    correct: 2,
    explanation: "v = Q/A = 0.020/0.0040 = 5.0 m/s.",
  },
  {
    section: "application",
    question: "At constant volume flow rate, a pipe's diameter doubles. The average speed in the wider section becomes…",
    options: ["twice as large", "four times as large", "half as large", "one quarter as large"],
    correct: 3,
    explanation: "Doubling d multiplies the area by 4 (A = πd²/4), so with Q fixed, v drops to one quarter.",
  },
  {
    section: "application",
    question: "Water (ρ = 1000 kg/m³) speeds up from 2.0 m/s to 6.0 m/s at the same elevation. The pressure drop from the speed change, ½ρ(v₂² − v₁²), is…",
    options: ["1.6 kPa", "16 kPa", "160 kPa", "8.0 kPa"],
    correct: 1,
    explanation: "½ × 1000 × (36 − 4) = 16 000 Pa = 16 kPa of pressure converted into kinetic energy.",
  },
  {
    section: "application",
    question: "Upstream gauge pressure is 200 kPa, the speed-up costs 16 kPa of pressure, and the two sections are level. The predicted downstream gauge pressure is…",
    options: ["216 kPa", "184 kPa", "200 kPa", "16 kPa"],
    correct: 1,
    explanation: "P₂ = P₁ − ½ρ(v₂² − v₁²) = 200 − 16 = 184 kPa.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "In a real (viscous) pipe flow, the measured downstream pressure compared with this lab's ideal Bernoulli prediction would be…",
    options: ["higher, because viscosity adds energy", "lower, because friction converts mechanical energy into heat", "exactly the same", "exactly zero"],
    correct: 1,
    explanation: "The ideal model neglects losses; real friction dissipates energy, so the actual pressure is lower than the ideal prediction.",
  },
  {
    section: "analysis",
    question: "The narrow section sits 2.0 m HIGHER than the wide section (ρ = 1000 kg/m³, g = 9.81 m/s²). The elevation gain adds a pressure penalty of ρgΔz ≈ …",
    options: ["0.20 kPa", "2.0 kPa", "19.6 kPa", "196 kPa"],
    correct: 2,
    explanation: "ρgΔz = 1000 × 9.81 × 2.0 = 19 620 Pa ≈ 19.6 kPa of pressure converted into gravitational potential energy.",
  },
  {
    section: "analysis",
    question: "An idealized flow passes through a constriction. The correct combination of changes in the narrow section is…",
    options: ["speed up, pressure down", "speed up, pressure up", "speed down, pressure down", "speed unchanged, pressure down"],
    correct: 0,
    explanation: "Continuity forces the speed up when area shrinks; Bernoulli's energy trade-off then forces the pressure down.",
  },
  {
    section: "analysis",
    question: "The ideal model predicts a pressure so low that the absolute pressure would be negative. In reality, the fluid would most likely…",
    options: ["continue flowing normally", "cavitate — form vapour bubbles as the assumptions break down", "freeze solid", "speed up without limit"],
    correct: 1,
    explanation: "A liquid cannot sustain negative absolute pressure; it boils locally (cavitation), and the idealized model has been pushed outside its physical validity.",
  },
  {
    section: "analysis",
    question: "A garden-hose nozzle makes water exit faster by narrowing the opening. The main principle at work is…",
    options: ["conservation of momentum", "continuity (A·v = constant) combined with Bernoulli's energy trade-off", "Archimedes' principle", "thermal expansion"],
    correct: 1,
    explanation: "The same flow rate through a smaller area demands higher speed, paid for by lower pressure — continuity plus Bernoulli.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The continuity equation A·v = Q for steady incompressible flow is a direct expression of…",
    options: ["conservation of energy", "conservation of mass", "Newton's second law", "conservation of momentum"],
    correct: 1,
    explanation: "Whatever volume enters a pipe section per second must leave it per second — mass conservation for an incompressible fluid.",
  },
  {
    section: "fundamentals",
    question: "Bernoulli's equation says that along one streamline of an ideal steady flow, the quantity P + ½ρv² + ρgz is…",
    options: ["zero", "constant", "steadily increasing", "steadily decreasing"],
    correct: 1,
    explanation: "For ideal (inviscid, incompressible, steady) flow the sum of pressure, kinetic, and elevation energy per unit volume stays constant along a streamline.",
  },
  {
    section: "fundamentals",
    question: "If the elevation is the same at both sections, Bernoulli's equation reduces to a trade-off between…",
    options: ["pressure and speed", "temperature and pressure", "mass and volume", "pipe area and length"],
    correct: 0,
    explanation: "With z constant, P + ½ρv² = constant: faster flow must mean lower pressure, and vice versa.",
  },
  {
    section: "fundamentals",
    question: "Which quantity does NOT appear in Bernoulli's equation?",
    options: ["Pressure", "Fluid speed", "Fluid density", "Fluid temperature"],
    correct: 3,
    explanation: "Bernoulli's equation involves pressure, density, speed, and elevation — temperature appears only indirectly through fluid properties.",
  },
  {
    section: "fundamentals",
    question: "'Steady' flow means that…",
    options: ["the fluid is not moving", "the flow pattern at each point does not change with time", "the speed is the same at every point", "the pipe is horizontal"],
    correct: 1,
    explanation: "In steady flow the velocity at any fixed point is constant in time — the fluid still moves, but the pattern does not change.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Water flows at Q = 0.10 m³/s through a circular pipe of diameter 0.20 m. The average speed is about… (A = πd²/4)",
    options: ["3.2 m/s", "0.32 m/s", "32 m/s", "1.6 m/s"],
    correct: 0,
    explanation: "A = π(0.20)²/4 = 0.0314 m²; v = 0.10/0.0314 ≈ 3.2 m/s.",
  },
  {
    section: "application",
    question: "Section 1 has diameter 12 cm and section 2 has diameter 4 cm. At the same flow rate, v₂/v₁ equals…",
    options: ["9", "3", "1/3", "1/9"],
    correct: 0,
    explanation: "Area scales with d², so A₁/A₂ = (12/4)² = 9 and v₂ = 9·v₁ by continuity.",
  },
  {
    section: "application",
    question: "Oil (ρ = 800 kg/m³) moves at 1.5 m/s in a wide section and 4.5 m/s in a narrow one, both level. The dynamic pressure difference ½ρ(v₂² − v₁²) is about…",
    options: ["3.6 kPa", "7.2 kPa", "14.4 kPa", "0.72 kPa"],
    correct: 1,
    explanation: "½ × 800 × (20.25 − 2.25) = 7200 Pa = 7.2 kPa.",
  },
  {
    section: "application",
    question: "Upstream gauge pressure is 300 kPa, the speed-up costs 40 kPa of pressure, and the sections are level. Predicted gauge pressure in the narrow section is…",
    options: ["260 kPa", "340 kPa", "300 kPa", "0 kPa"],
    correct: 0,
    explanation: "P₂ = 300 − 40 = 260 kPa.",
  },
  {
    section: "application",
    question: "A pipe of diameter 8 cm carries 15 L/s of water. The average speed is about… (A = πd²/4)",
    options: ["30 m/s", "3.0 m/s", "0.30 m/s", "7.5 m/s"],
    correct: 1,
    explanation: "A = π(0.08)²/4 ≈ 0.00503 m²; Q = 0.015 m³/s; v = 0.015/0.00503 ≈ 3.0 m/s.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Keeping the volume flow rate fixed, you shrink the narrow section even further. The ideal-model pressure in that section will…",
    options: ["rise", "fall", "stay the same", "become independent of speed"],
    correct: 1,
    explanation: "Smaller area → higher speed → larger ½ρv² term, so pressure must drop further to conserve energy.",
  },
  {
    section: "analysis",
    question: "Compared with the horizontal case, running the same flow DOWNHILL (the second section 1.0 m lower) makes the downstream pressure…",
    options: ["higher by about 9.8 kPa", "lower by about 9.8 kPa", "unchanged", "exactly zero"],
    correct: 0,
    explanation: "Dropping in elevation converts potential energy into pressure: ρgΔz = 1000 × 9.81 × 1.0 ≈ +9.8 kPa at the lower section.",
  },
  {
    section: "analysis",
    question: "For very slow, very viscous flow (like honey), the real pressure drop across a constriction would be…",
    options: ["much larger than the ideal Bernoulli prediction", "the same as the ideal Bernoulli prediction", "much smaller than the ideal prediction", "negative"],
    correct: 0,
    explanation: "Bernoulli neglects viscosity entirely; in viscous-dominated flows, friction losses add pressure drop far beyond the ideal energy trade-off.",
  },
  {
    section: "analysis",
    question: "Two identical pumps push water at the same flow rate: pipe A has a smooth gentle contraction, pipe B an abrupt one. The real power needed is…",
    options: ["the same for both", "larger for B, because abrupt changes cause flow separation and losses not modeled by Bernoulli", "larger for A", "zero for both"],
    correct: 1,
    explanation: "The ideal model treats geometry only through area; real abrupt contractions add separation and turbulence losses — that is the danger of applying Bernoulli to every geometry.",
  },
  {
    section: "analysis",
    question: "A pitot tube on an aircraft reads airspeed using the fact that faster flow has lower static pressure. This works because…",
    options: ["Bernoulli's energy trade-off links speed and pressure along the flow", "air is compressible at all speeds", "of Archimedes' principle", "of thermal expansion"],
    correct: 0,
    explanation: "It is the same P + ½ρv² trade-off: bring the flow to a stop and the pressure rises by ½ρv², which the instrument compares with the static pressure.",
  },
];
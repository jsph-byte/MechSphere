// Ideal Gas Explorer Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; P1·V1/T1 = P2·V2/T2 with absolute temperature (K).

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Gas-law temperature calculations must use…",
    options: ["Celsius", "Fahrenheit", "Kelvin — absolute temperature", "any scale, converted consistently with the same zero"],
    correct: 2,
    explanation: "The gas laws are proportional to T itself, not to temperature differences — only Kelvin (absolute) keeps the proportions valid.",
  },
  {
    section: "fundamentals",
    question: "An ideal gas is one whose molecules are modeled as…",
    options: ["tiny spheres with no interactions except elastic collisions", "strongly attracting particles", "fixed-position lattice atoms", "charged ions"],
    correct: 0,
    explanation: "The ideal model neglects molecular volume and intermolecular forces — a good approximation for dilute gases.",
  },
  {
    section: "fundamentals",
    question: "Boyle's law states that at constant temperature, pressure and volume are…",
    options: ["directly proportional", "inversely proportional (P·V = constant)", "unrelated", "equal"],
    correct: 1,
    explanation: "Squeezing a gas into half the volume doubles the pressure: P·V is fixed at constant T.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of pressure is the…",
    options: ["newton", "pascal (N/m²)", "joule", "kilogram"],
    correct: 1,
    explanation: "Pressure is force per area, measured in pascals; 1 kPa = 1000 Pa.",
  },
  {
    section: "fundamentals",
    question: "In the combined gas law P₁V₁/T₁ = P₂V₂/T₂, the amount of gas is assumed to be…",
    options: ["increasing", "constant — no gas enters or leaks out", "irrelevant", "halved"],
    correct: 1,
    explanation: "A fixed, closed amount of gas links the two states; changing the amount needs the full ideal-gas equation with n.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A gas at 100 kPa and 2 m³ is compressed isothermally to 4 m³? No — expanded to 4 m³. The new pressure is…",
    options: ["200 kPa", "50 kPa", "100 kPa", "25 kPa"],
    correct: 1,
    explanation: "Boyle: P₂ = P₁V₁/V₂ = 100 × 2/4 = 50 kPa.",
  },
  {
    section: "application",
    question: "20 °C on the Kelvin scale is…",
    options: ["253 K", "273 K", "293 K", "313 K"],
    correct: 2,
    explanation: "K = °C + 273.15, so 20 °C = 293 K (293.15 exactly).",
  },
  {
    section: "application",
    question: "A sealed rigid can of gas at 300 K is heated to 600 K. Its pressure…",
    options: ["doubles to 200 kPa if it started at 100 kPa", "halves", "stays the same", "quadruples"],
    correct: 0,
    explanation: "At constant volume, P ∝ T (Gay-Lussac): doubling the absolute temperature doubles the pressure.",
  },
  {
    section: "application",
    question: "A balloon holds 0.5 m³ at 150 kPa. At the same temperature, the volume it would occupy at 300 kPa is…",
    options: ["1.0 m³", "0.25 m³", "0.5 m³", "0.75 m³"],
    correct: 1,
    explanation: "V₂ = P₁V₁/P₂ = 150 × 0.5/300 = 0.25 m³.",
  },
  {
    section: "application",
    question: "A gas starts at 100 kPa, 2 m³, 300 K and is heated at constant pressure to 450 K. The new volume is…",
    options: ["1.33 m³", "2.0 m³", "3.0 m³", "4.5 m³"],
    correct: 2,
    explanation: "Charles: V ∝ T at constant P → V₂ = 2 × 450/300 = 3.0 m³.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double the Kelvin temperature of a gas in a rigid box. The molecules' average kinetic energy…",
    options: ["doubles", "halves", "is unchanged", "quadruples"],
    correct: 0,
    explanation: "Average kinetic energy is proportional to absolute temperature — the microscopic meaning of heating a gas.",
  },
  {
    section: "analysis",
    question: "A weather balloon rises into much colder air and its gas cools at roughly constant pressure. Its volume…",
    options: ["increases", "decreases", "stays constant", "first increases, then decreases"],
    correct: 1,
    explanation: "At constant pressure V ∝ T (Charles), so cooling shrinks the balloon's volume.",
  },
  {
    section: "analysis",
    question: "A student plugs 25 (°C) into P₁V₁/T₁ = P₂V₂/T₂ instead of 298 K. Their answer is…",
    options: ["correct anyway", "wrong, because the ratio of Celsius temperatures does not match the ratio of true temperatures", "wrong only for negative temperatures", "impossible to evaluate"],
    correct: 1,
    explanation: "25/50 °C is 0.5, but 298/323 K is 0.92 — Celsius ratios distort every result; absolute temperature is mandatory.",
  },
  {
    section: "analysis",
    question: "Why does a sealed chip bag look inflated at a mountain picnic?",
    options: ["the chips release gas", "the lower outside air pressure lets the fixed amount of trapped gas expand", "the bag shrinks", "temperature and pressure never change with altitude"],
    correct: 1,
    explanation: "The trapped gas meets lower external pressure at altitude and expands until its pressure balances — Boyle's law in action.",
  },
  {
    section: "analysis",
    question: "The ideal-gas model would break down LEAST for…",
    options: ["a dense, cold gas near condensation", "a hot, dilute gas far from condensation", "a liquid", "a gas at very high pressure"],
    correct: 1,
    explanation: "Ideal behaviour holds when molecules are small compared to the space between them — hot and dilute conditions.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Absolute zero (0 K) is the temperature at which…",
    options: ["gases freeze solid", "ideal-gas molecular kinetic energy reaches its minimum", "water boils", "pressure becomes infinite"],
    correct: 1,
    explanation: "Extrapolating P ∝ T hits zero pressure at 0 K = −273.15 °C — the point where classical kinetic energy is minimal.",
  },
  {
    section: "fundamentals",
    question: "Charles's law relates volume and temperature when…",
    options: ["pressure is constant", "volume is constant", "mass changes", "the gas is ideal and cold"],
    correct: 0,
    explanation: "V ∝ T at constant pressure (and fixed amount of gas).",
  },
  {
    section: "fundamentals",
    question: "Gay-Lussac's law relates pressure and temperature when…",
    options: ["volume is constant", "pressure is constant", "temperature is constant", "the gas expands freely"],
    correct: 0,
    explanation: "P ∝ T at constant volume — the behaviour of any sealed rigid container of gas.",
  },
  {
    section: "fundamentals",
    question: "In PV = nRT, the symbol n represents…",
    options: ["number of molecules directly", "amount of substance in moles", "newtons of force", "a dimensionless constant"],
    correct: 1,
    explanation: "n is the mole count of gas; R is the universal gas constant (8.314 J/(mol·K)).",
  },
  {
    section: "fundamentals",
    question: "Which assumption is NOT part of the ideal-gas model?",
    options: ["molecular collisions are elastic", "molecules occupy negligible volume", "molecules attract each other strongly", "motion is random"],
    correct: 2,
    explanation: "The ideal gas neglects intermolecular forces — that is precisely why it fails near condensation.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A gas at 250 kPa and 300 K in a 1.2 m³ tank is cooled to 250 K at constant volume. The new pressure is about…",
    options: ["208 kPa", "300 kPa", "275 kPa", "192 kPa"],
    correct: 0,
    explanation: "P₂ = 250 × 250/300 ≈ 208 kPa.",
  },
  {
    section: "application",
    question: "3.0 L of gas at 200 kPa is compressed to 1.0 L at constant temperature. The pressure becomes…",
    options: ["67 kPa", "200 kPa", "600 kPa", "1200 kPa"],
    correct: 2,
    explanation: "P₂ = 200 × 3.0/1.0 = 600 kPa.",
  },
  {
    section: "application",
    question: "A gas occupies 2.0 L at 27 °C. At constant pressure and 127 °C it occupies…",
    options: ["2.67 L", "1.5 L", "4.0 L", "9.4 L"],
    correct: 0,
    explanation: "Use K: V₂ = 2.0 × 400/300 = 2.67 L (27 °C = 300 K, 127 °C = 400 K).",
  },
  {
    section: "application",
    question: "A diver's air bubble with volume 1 cm³ forms at 30 m depth (absolute pressure ≈ 400 kPa). At the surface (100 kPa) its volume is about…",
    options: ["0.25 cm³", "1 cm³", "4 cm³", "8 cm³"],
    correct: 2,
    explanation: "Boyle: V₂ = 1 × 400/100 = 4 cm³ — the reason ascending divers must exhale continuously.",
  },
  {
    section: "application",
    question: "Starting from 100 kPa, 2 m³, 300 K, the gas is changed to 200 kPa, 2 m³. The new temperature must be…",
    options: ["150 K", "300 K", "600 K", "900 K"],
    correct: 2,
    explanation: "T₂ = T₁·P₂/P₁ = 300 × 200/100 = 600 K (volume unchanged).",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A rigid tank of gas is heated. Its pressure rises because…",
    options: ["the gas molecules multiply", "faster molecules hit the walls harder and more often", "the tank expands", "gravity increases inside"],
    correct: 1,
    explanation: "Higher temperature raises molecular speeds, increasing both the impulse per collision and the collision rate with the walls.",
  },
  {
    section: "analysis",
    question: "Half the gas in a sealed, temperature-constant cylinder is pumped out. The pressure…",
    options: ["doubles", "halves", "stays the same", "quadruples"],
    correct: 1,
    explanation: "At fixed V and T, pressure is proportional to the amount of gas — half the molecules exert half the pressure (Avogadro/Amontons).",
  },
  {
    section: "analysis",
    question: "A piston compresses a gas quickly, warming it. The combined law still tracks the state as long as…",
    options: ["the amounts are fixed and you use the states before and after (equilibrium)", "the gas never warms", "the piston moves slowly only", "the gas is not ideal"],
    correct: 0,
    explanation: "P₁V₁/T₁ = P₂V₂/T₂ compares two equilibrium states of a fixed amount of gas — it does not care how fast you moved between them.",
  },
  {
    section: "analysis",
    question: "A car tyre's pressure reads higher after a long drive. The best explanation is…",
    options: ["the tyre gained air", "flexing and friction warmed the air inside; at nearly constant volume, P ∝ T", "the road squeezed the tyre", "air pressure outside dropped"],
    correct: 1,
    explanation: "Warming the enclosed gas at ~constant volume raises its pressure in proportion to the absolute temperature change.",
  },
  {
    section: "analysis",
    question: "The lab's Boyle's-law curve (P vs V at constant T) has the shape of…",
    options: ["a straight rising line", "a descending curve approaching the axes (hyperbola)", "a parabola opening upward", "a horizontal line"],
    correct: 1,
    explanation: "P = constant/V plots a hyperbola: pressure climbs steeply as volume shrinks toward zero.",
  },
];
// Ohm's Law Circuits Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; V = I·R, series R = R₁+R₂, parallel R = R₁R₂/(R₁+R₂), P = V·I.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Ohm's law relates voltage, current, and resistance as…",
    options: ["V = I·R", "V = I/R", "V = R/I", "I = V·R"],
    correct: 0,
    explanation: "One volt across one ohm drives one amp: V = IR, the backbone of DC circuit analysis.",
  },
  {
    section: "fundamentals",
    question: "In a series circuit, the current is…",
    options: ["split between components", "the same through every component", "zero at the end", "doubled through each"],
    correct: 1,
    explanation: "One path means one current: whatever leaves the battery passes through every element in turn.",
  },
  {
    section: "fundamentals",
    question: "In a parallel circuit, the voltage across each branch is…",
    options: ["split between branches", "the same full supply voltage", "zero", "inversely proportional to branch current"],
    correct: 1,
    explanation: "Branches share the same two nodes, so each sees the full voltage; the currents add instead.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of electrical resistance is the…",
    options: ["volt", "ampere", "ohm (Ω)", "watt"],
    correct: 2,
    explanation: "Resistance in ohms: volts of push per ampere of flow.",
  },
  {
    section: "fundamentals",
    question: "Electrical power dissipated by a resistor is…",
    options: ["P = V·I", "P = V/I", "P = I/V", "P = R·I² only"],
    correct: 0,
    explanation: "P = VI = I²R = V²/R — all equivalent; energy leaves as heat.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 12 V battery drives 10 Ω and 20 Ω in series. The current is…",
    options: ["0.4 A", "1.2 A", "0.8 A", "2.4 A"],
    correct: 0,
    explanation: "R_total = 30 Ω; I = 12/30 = 0.4 A.",
  },
  {
    section: "application",
    question: "In that series circuit, the voltage across the 20 Ω resistor is…",
    options: ["4.8 V", "8.0 V", "12 V", "2.4 V"],
    correct: 1,
    explanation: "V = IR = 0.4 × 20 = 8 V (the 10 Ω takes 4 V; they add to 12 V).",
  },
  {
    section: "application",
    question: "The same two resistors in parallel across 12 V give a total resistance of…",
    options: ["30 Ω", "15 Ω", "6.67 Ω", "20 Ω"],
    correct: 2,
    explanation: "R = (10×20)/(10+20) = 200/30 ≈ 6.67 Ω — less than either resistor.",
  },
  {
    section: "application",
    question: "That parallel circuit draws a total current of…",
    options: ["1.2 A", "1.8 A", "0.4 A", "0.6 A"],
    correct: 1,
    explanation: "I = 12/6.67 ≈ 1.8 A (1.2 A through the 10 Ω + 0.6 A through the 20 Ω).",
  },
  {
    section: "application",
    question: "A 12 V, series 30 Ω circuit: the power dissipated by the whole circuit is…",
    options: ["4.8 W", "0.4 W", "14.4 W", "48 W"],
    correct: 0,
    explanation: "P = VI = 12 × 0.4 = 4.8 W.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Adding a resistor in SERIES to a fixed battery…",
    options: ["increases total resistance and reduces current", "increases current", "leaves current unchanged", "doubles the voltage"],
    correct: 0,
    explanation: "I = V/R_total: more series resistance means less current from the same battery.",
  },
  {
    section: "analysis",
    question: "Adding a resistor in PARALLEL to a fixed battery…",
    options: ["raises total resistance", "lowers total resistance and increases total current", "does nothing", "lowers the battery voltage"],
    correct: 1,
    explanation: "A new branch gives current a new path: R_total drops, I_total = V/R_total rises — why plugging in many heaters trips breakers.",
  },
  {
    section: "analysis",
    question: "Which resistor runs hotter in the SERIES circuit (10 Ω and 20 Ω, 12 V)?",
    options: ["the 10 Ω", "the 20 Ω — P = I²R with the same I gives more dissipation at higher R", "they are equal", "neither heats"],
    correct: 1,
    explanation: "Same current everywhere: P = I²R, so the 20 Ω dissipates 3.2 W vs 1.6 W.",
  },
  {
    section: "analysis",
    question: "In the PARALLEL circuit (10 Ω and 20 Ω across 12 V), which resistor runs hotter?",
    options: ["the 10 Ω — P = V²/R is larger at smaller R", "the 20 Ω", "equal", "the battery"],
    correct: 0,
    explanation: "Same voltage across both: P = V²/R gives 14.4 W on the 10 Ω vs 7.2 W on the 20 Ω — the opposite of series!",
  },
  {
    section: "analysis",
    question: "A student doubles the battery voltage in a fixed ohmic circuit. The current…",
    options: ["halves", "doubles — I = V/R is linear for ohmic resistors", "quadruples", "is unchanged"],
    correct: 1,
    explanation: "The lab's I–V chart is a straight line through the origin: ohmic components scale current with voltage.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Kirchhoff's voltage law says the signed voltages around any loop…",
    options: ["sum to the battery voltage", "sum to zero — energy gained equals energy lost per charge", "grow with each element", "are equal everywhere"],
    correct: 1,
    explanation: "Series voltages must add up to the supply: charge can't gain or lose net energy in a loop.",
  },
  {
    section: "fundamentals",
    question: "Kirchhoff's current law says currents at a junction…",
    options: ["disappear", "sum to zero — inflow equals outflow (charge conservation)", "are all equal", "double"],
    correct: 1,
    explanation: "Charge can't pile up at a node: parallel branch currents add to the supply current.",
  },
  {
    section: "fundamentals",
    question: "The lab's model assumes…",
    options: ["ideal batteries and wires (zero internal resistance)", "real battery chemistry", "AC operation", "capacitive effects"],
    correct: 0,
    explanation: "With ideal sources and wires, all resistance lives in the resistors; real batteries add internal resistance and sag under load.",
  },
  {
    section: "fundamentals",
    question: "Equivalent resistance of two resistors in parallel is always…",
    options: ["larger than the bigger one", "smaller than the smaller one", "between them", "their sum"],
    correct: 1,
    explanation: "Parallel R = R₁R₂/(R₁+R₂) sits below the smallest branch resistance — current always gets an easier path.",
  },
  {
    section: "fundamentals",
    question: "A conductor obeys Ohm's law when its V–I graph is…",
    options: ["a straight line through the origin", "a curve", "horizontal", "vertical"],
    correct: 0,
    explanation: "Constant R means linear V–I; light bulbs (hot filaments) bend away from it.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 9 V battery drives 15 Ω and 30 Ω in series. The current is…",
    options: ["0.2 A", "0.3 A", "0.6 A", "0.9 A"],
    correct: 0,
    explanation: "R = 45 Ω; I = 9/45 = 0.2 A.",
  },
  {
    section: "application",
    question: "The voltage across the 15 Ω resistor there is…",
    options: ["3 V", "6 V", "4.5 V", "9 V"],
    correct: 0,
    explanation: "V = 0.2 × 15 = 3 V (the 30 Ω takes the other 6 V).",
  },
  {
    section: "application",
    question: "Three 30 Ω resistors in parallel give…",
    options: ["90 Ω", "30 Ω", "10 Ω", "3.3 Ω"],
    correct: 2,
    explanation: "Equal resistors in parallel: R/n = 30/3 = 10 Ω.",
  },
  {
    section: "application",
    question: "A 24 V supply across 6 Ω and 12 Ω in parallel draws total power of…",
    options: ["144 W", "72 W", "48 W", "288 W"],
    correct: 0,
    explanation: "R_eq = 4 Ω; P = V²/R = 576/4 = 144 W (96 W on the 6 Ω + 48 W on the 12 Ω).",
  },
  {
    section: "application",
    question: "A 5 Ω and 20 Ω in series pass 0.5 A. The total voltage needed is…",
    options: ["2.5 V", "10 V", "12.5 V", "25 V"],
    correct: 2,
    explanation: "R = 25 Ω; V = 0.5 × 25 = 12.5 V.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Identical bulbs in series all dim when one more is added because…",
    options: ["bulbs wear out", "total resistance rises, current falls, and every bulb's brightness (P = I²R) drops", "voltage splits unevenly", "the battery weakens"],
    correct: 1,
    explanation: "One current serves all: fewer amps means less power everywhere — why series strings are poor for lighting.",
  },
  {
    section: "analysis",
    question: "Household sockets are wired in parallel so that…",
    options: ["devices share current equally", "each device gets full voltage and can be switched independently", "resistance stays high", "less copper is used"],
    correct: 1,
    explanation: "Parallel wiring keeps every appliance at rated voltage regardless of the others — the trade-off is rising total current.",
  },
  {
    section: "analysis",
    question: "You need a 50 Ω resistance but have only 100 Ω resistors. Two of them…",
    options: ["in series give 200 Ω", "in parallel give 50 Ω", "in series give 50 Ω", "cannot help"],
    correct: 1,
    explanation: "Two equal resistors in parallel halve: 100×100/200 = 50 Ω.",
  },
  {
    section: "analysis",
    question: "A real 12 V battery has 1 Ω of internal resistance and drives a 23 Ω load. Compared with the ideal-battery model, the real circuit…",
    options: ["draws more current", "draws the same 0.5 A but wastes 0.25 W heating the battery internally", "draws less current only if the load is bigger", "delivers more than 12 V"],
    correct: 1,
    explanation: "I = 12/(23 + 1) = 0.5 A; the terminal voltage sags to 11.5 V, so 0.25 W (I²·r) is lost inside the battery — internal resistance diverts energy as heat.",
  },
  {
    section: "analysis",
    question: "Which statement is TRUE about the two circuits (series vs parallel) with the same parts and battery?",
    options: ["series draws less total current and less total power", "parallel draws less current", "both draw identical power", "series draws more power"],
    correct: 0,
    explanation: "Series: 30 Ω, 0.4 A, 4.8 W. Parallel: 6.67 Ω, 1.8 A, 21.6 W. Lower resistance in parallel means much more current and power — the lab's core comparison.",
  },
];
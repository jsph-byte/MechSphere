// Heating & Gas Processes Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; ideal gas, γ = 1.4, W in joules (kPa·L = J).

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "An isothermal process is one with…",
    options: ["constant temperature", "constant pressure", "constant volume", "no heat transfer"],
    correct: 0,
    explanation: "Iso-thermal: temperature fixed; heat exchanged with a reservoir keeps T constant while P·V stays fixed.",
  },
  {
    section: "fundamentals",
    question: "An isobaric process keeps…",
    options: ["temperature constant", "pressure constant", "volume constant", "heat flow zero"],
    correct: 1,
    explanation: "Iso-baric: pressure fixed (e.g., a piston moving under a constant load); V ∝ T.",
  },
  {
    section: "fundamentals",
    question: "An isochoric process keeps…",
    options: ["volume constant", "pressure constant", "temperature constant", "work at maximum"],
    correct: 0,
    explanation: "Iso-choric: rigid sealed container, no boundary work possible; heat changes P ∝ T.",
  },
  {
    section: "fundamentals",
    question: "In an adiabatic process…",
    options: ["temperature is constant", "no heat enters or leaves the gas (Q = 0)", "volume is constant", "pressure is constant"],
    correct: 1,
    explanation: "Perfect insulation: work is exchanged entirely with the gas's internal energy, so T changes.",
  },
  {
    section: "fundamentals",
    question: "Boundary work done BY the gas is positive when the gas…",
    options: ["expands (pushes the piston out)", "is compressed", "is heated at constant volume", "cools"],
    correct: 0,
    explanation: "W = ∫P dV: expansion means the gas does positive work on the surroundings; compression gives negative W.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Isothermal expansion: gas at 100 kPa expands from 2 L to 4 L at constant T. The work done by the gas is about…",
    options: ["69.3 J", "138.6 J", "200 J", "100 J"],
    correct: 1,
    explanation: "W = P₁V₁·ln(V₂/V₁) = 100 kPa × 2 L × ln 2 = 200 J × 0.693 ≈ 138.6 J (kPa·L = J).",
  },
  {
    section: "application",
    question: "In that isothermal expansion, the final pressure is…",
    options: ["100 kPa", "50 kPa", "200 kPa", "25 kPa"],
    correct: 1,
    explanation: "Boyle at constant T: P₂ = P₁V₁/V₂ = 100 × 2/4 = 50 kPa.",
  },
  {
    section: "application",
    question: "Isobaric heating: gas at 100 kPa expands from 2 L to 4 L. The work done by the gas is…",
    options: ["100 J", "200 J", "400 J", "0 J"],
    correct: 1,
    explanation: "W = P·ΔV = 100 kPa × 2 L = 200 J.",
  },
  {
    section: "application",
    question: "Isochoric heating from 300 K to 600 K at 100 kPa raises the pressure to…",
    options: ["50 kPa", "100 kPa", "200 kPa", "400 kPa"],
    correct: 2,
    explanation: "P ∝ T at constant V: doubling absolute temperature doubles the pressure.",
  },
  {
    section: "application",
    question: "In that isochoric heating, the work done is…",
    options: ["maximum", "zero — the volume never changes", "equal to the heat", "negative"],
    correct: 1,
    explanation: "W = ∫P dV with dV = 0: no boundary work at all, all heat goes to internal energy.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A bicycle pump gets warm during fast pumping because…",
    options: ["friction of the piston", "the compression is near-adiabatic: work raises the gas's internal energy before heat can escape", "the pump is near the sun", "air is hot anyway"],
    correct: 1,
    explanation: "Fast compression leaves no time for heat exchange (Q ≈ 0), so T rises — the lab's adiabatic mode.",
  },
  {
    section: "analysis",
    question: "Adiabatic compression of air (γ = 1.4) from 2 L to 1 L multiplies pressure by…",
    options: ["2", "2^1.4 ≈ 2.64", "1.4", "4"],
    correct: 1,
    explanation: "PV^γ = const: halving V gives P × 2^1.4 ≈ 2.64 — steeper than the isothermal 2×.",
  },
  {
    section: "analysis",
    question: "Expanding the same gas adiabatically from 2 L to 4 L changes its temperature…",
    options: ["up", "down — the gas spends internal energy doing the work", "not at all", "to zero"],
    correct: 1,
    explanation: "With Q = 0, expansion work comes straight from internal energy: adiabatic expansion cools (how spray cans get cold).",
  },
  {
    section: "analysis",
    question: "Between isothermal and adiabatic expansion from the same start to the same final volume, the isothermal path does…",
    options: ["less work", "more work — its pressure stays higher throughout (P ∝ 1/V vs P ∝ 1/V^γ)", "the same work", "negative work"],
    correct: 1,
    explanation: "The adiabatic pressure collapses faster (V^1.4), so its P–V area (work) is smaller.",
  },
  {
    section: "analysis",
    question: "A pressure cooker safety note: heating a sealed rigid vessel raises pressure fast. The governing model is…",
    options: ["isochoric: P ∝ T", "isobaric", "isothermal", "adiabatic always"],
    correct: 0,
    explanation: "Sealed + rigid = constant volume; every kelvin adds pressure proportionally — the lab's isochoric mode.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The first law of thermodynamics for a closed system is…",
    options: ["Q − W = ΔU", "PV = nRT always", "W = Q always", "ΔU = 0 always"],
    correct: 0,
    explanation: "Heat added minus work done by the gas equals the change in internal energy.",
  },
  {
    section: "fundamentals",
    question: "For an ideal gas, internal energy depends only on…",
    options: ["pressure", "volume", "temperature", "density always"],
    correct: 2,
    explanation: "U ∝ T for an ideal gas: any process's ΔT reveals its ΔU directly.",
  },
  {
    section: "fundamentals",
    question: "The adiabatic exponent γ for air (diatomic) is about…",
    options: ["1.0", "1.4", "1.67", "2.0"],
    correct: 1,
    explanation: "γ = c_p/c_v ≈ 1.4 for diatomic gases like air; 1.67 for monatomic gases.",
  },
  {
    section: "fundamentals",
    question: "Which process can do NO boundary work?",
    options: ["isothermal", "isobaric", "isochoric", "adiabatic"],
    correct: 2,
    explanation: "Constant volume means dV = 0, so W = 0 regardless of pressure.",
  },
  {
    section: "fundamentals",
    question: "PV^γ = constant applies to…",
    options: ["any process", "a reversible adiabatic process of an ideal gas", "isothermal only", "isobaric only"],
    correct: 1,
    explanation: "The adiabatic path equation (with constant γ) — one of the lab's four rulebooks.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "Adiabatic compression of air (γ = 1.4) from 100 kPa and 2 L to 0.2 L gives a final pressure of about…",
    options: ["1000 kPa", "2512 kPa", "6310 kPa", "100 kPa"],
    correct: 1,
    explanation: "P₂ = 100 × (10)^1.4 = 100 × 25.12 ≈ 2512 kPa — a 10× volume squeeze multiplies pressure 25×.",
  },
  {
    section: "application",
    question: "Same compression from 300 K: the final temperature is about…",
    options: ["300 K", "754 K", "3000 K", "481 K"],
    correct: 1,
    explanation: "T₂ = T₁(V₁/V₂)^(γ−1) = 300 × 10^0.4 ≈ 300 × 2.512 ≈ 754 K (~481 °C — diesel engines ignite fuel this way).",
  },
  {
    section: "application",
    question: "A gas at 150 kPa expands isobarically from 1 L to 3 L. The work done by the gas is…",
    options: ["150 J", "300 J", "450 J", "75 J"],
    correct: 1,
    explanation: "W = P·ΔV = 150 kPa × 2 L = 300 J (kPa·L = J).",
  },
  {
    section: "application",
    question: "An isothermal gas at 200 kPa and 5 L is compressed to 2 L. The work done BY the gas is about…",
    options: ["−916 J (i.e., 916 J of work done ON the gas)", "+916 J", "−1000 J exactly", "0 J"],
    correct: 0,
    explanation: "W = P₁V₁·ln(V₂/V₁) = 200 × 5 × ln(0.4) = 1000 × (−0.916) ≈ −916 J: compression means the surroundings do positive work on the gas.",
  },
  {
    section: "application",
    question: "Heating a sealed 10 L air tank from 27 °C to 127 °C at 200 kPa raises the pressure to…",
    options: ["200 kPa", "267 kPa", "333 kPa", "400 kPa"],
    correct: 1,
    explanation: "P ∝ T_absolute: 300 K → 400 K gives P₂ = 200 × 400/300 ≈ 267 kPa.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A spray can cools as it discharges because the expanding gas…",
    options: ["absorbs heat quickly (isothermal)", "does adiabatic expansion work, spending internal energy and dropping T", "loses pressure slowly", "evaporates liquid only"],
    correct: 1,
    explanation: "Rapid expansion ≈ Q = 0: the work of pushing the gas out cools what remains.",
  },
  {
    section: "analysis",
    question: "Diesel engines need no spark plug because…",
    options: ["fuel ignites spontaneously in air", "adiabatic compression raises air to ~750+ K, above the fuel's ignition temperature", "electricity is unsafe there", "the piston creates sparks"],
    correct: 1,
    explanation: "The lab's adiabatic numbers (10× compression → ~750 K) are the engineering reason compression ignition works.",
  },
  {
    section: "analysis",
    question: "Compressing a gas ISOTHERMALLY removes heat equal to…",
    options: ["zero", "the work input — internal energy (T) is unchanged, so Q = W (negative)", "the internal energy gain", "the latent heat"],
    correct: 1,
    explanation: "ΔU = 0 at constant T, so the first law forces Q = −W_compression: the reservoir must carry away exactly the work done on the gas.",
  },
  {
    section: "analysis",
    question: "Which path between the same two volumes does more work ON the gas during compression?",
    options: ["isothermal (slow, cooled)", "adiabatic (fast, insulated) — its pressure rises with T", "equal", "neither does work"],
    correct: 1,
    explanation: "Adiabatic compression heats the gas, raising the pressure curve, so the area under it (work input) is larger.",
  },
  {
    section: "analysis",
    question: "The lab's four process models share one assumption set. The limitation to remember is…",
    options: ["they are exact for real gases", "they assume an ideal gas with reversible (quasi-static) paths — real machines deviate with friction and finite speed", "they only work in winter", "work cannot be computed"],
    correct: 1,
    explanation: "Quasi-static ideal-gas paths are the reference frame of thermodynamics; real devices get efficiency factors against these ideal limits.",
  },
];
// Specific Heat Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; Q = m·c·ΔT, water c = 4186, copper c = 385 J/(kg·K).

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Specific heat capacity c tells you…",
    options: ["how hot a material can get", "the energy needed to raise 1 kg of it by 1 K", "how fast a material conducts heat", "how dense a material is"],
    correct: 1,
    explanation: "c is the 'thermal appetite': joules per kilogram per kelvin of temperature change.",
  },
  {
    section: "fundamentals",
    question: "In Q = m·c·ΔT, the temperature change ΔT…",
    options: ["must be in Fahrenheit", "is the same number in K and °C", "must always be negative", "depends on the mass"],
    correct: 1,
    explanation: "Kelvin and Celsius intervals are identical, so ΔT = 20 K means the same as ΔT = 20 °C.",
  },
  {
    section: "fundamentals",
    question: "The standard SI unit of specific heat capacity is…",
    options: ["J/(kg·K)", "J/kg", "J·kg·K", "W/(m·K)"],
    correct: 0,
    explanation: "Joules per kilogram-kelvin. W/(m·K) is thermal conductivity — a different quantity entirely.",
  },
  {
    section: "fundamentals",
    question: "The formula Q = m·c·ΔT assumes…",
    options: ["the material can melt or boil during the process", "no phase change occurs", "heat always flows in", "the container matters"],
    correct: 1,
    explanation: "It covers heating/cooling within one phase; melting or boiling needs latent heat instead.",
  },
  {
    section: "fundamentals",
    question: "Heat, as a quantity of energy, is measured in…",
    options: ["watts", "joules", "kelvins", "newtons"],
    correct: 1,
    explanation: "Heat is energy transferred because of temperature difference — joules. Watts measure rate (J/s).",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "How much energy raises 2.0 kg of water by 10 K? (c = 4186 J/(kg·K))",
    options: ["8.4 kJ", "83.7 kJ", "837 kJ", "4.19 kJ"],
    correct: 1,
    explanation: "Q = 2.0 × 4186 × 10 = 83 720 J ≈ 83.7 kJ.",
  },
  {
    section: "application",
    question: "3850 J is added to 0.5 kg of copper (c = 385 J/(kg·K)). Its temperature rises by…",
    options: ["10 K", "20 K", "40 K", "5 K"],
    correct: 1,
    explanation: "ΔT = Q/(mc) = 3850/(0.5 × 385) = 20 K.",
  },
  {
    section: "application",
    question: "The same 10 000 J heats 1 kg of water and 1 kg of copper. Copper's temperature rise is about…",
    options: ["the same as water's", "11× larger than water's", "11× smaller", "impossible to compare"],
    correct: 1,
    explanation: "ΔT ∝ 1/c: with c = 385 vs 4186, copper warms 4186/385 ≈ 10.9× more.",
  },
  {
    section: "application",
    question: "A 0.5 kg sample of water at 20 °C absorbs 167.4 kJ (no losses). Its final temperature is…",
    options: ["40 °C", "60 °C", "100 °C", "80 °C"],
    correct: 2,
    explanation: "ΔT = 167 400/(0.5 × 4186) = 80 K, so T = 20 + 80 = 100 °C — right at the boiling point, where this model stops.",
  },
  {
    section: "application",
    question: "Removing 4186 J from 1 kg of water changes its temperature by…",
    options: ["+1 K", "−1 K", "−4186 K", "0 K"],
    correct: 1,
    explanation: "Negative Q means cooling: ΔT = −4186/(1 × 4186) = −1 K.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double the mass of water but supply the same energy. The temperature rise…",
    options: ["doubles", "halves", "stays the same", "quadruples"],
    correct: 1,
    explanation: "ΔT = Q/(mc): twice the mass means half the rise — more thermal 'cargo' to warm.",
  },
  {
    section: "analysis",
    question: "Coastal cities have milder climates than deserts mainly because water…",
    options: ["reflects all sunlight", "has a very high specific heat, so oceans warm and cool slowly", "evaporates instantly", "is denser than sand"],
    correct: 1,
    explanation: "c_water ≈ 4186 vs c_sand ≈ 830 J/(kg·K): oceans store enormous heat per kelvin, damping temperature swings.",
  },
  {
    section: "analysis",
    question: "A copper pan lid gets scorching hot seconds after the flame starts, while the same-mass water inside stays lukewarm. The reason is…",
    options: ["copper conducts electricity", "copper's small c means little energy produces a large temperature rise", "water heats faster than copper", "the flame only touches the lid"],
    correct: 1,
    explanation: "With c = 385 vs 4186, the same absorbed joules raise copper's temperature about 11× more than water's.",
  },
  {
    section: "analysis",
    question: "You keep heating the water sample past 100 °C in this simulation. The displayed result is…",
    options: ["physically correct for liquid water", "outside the model — the energy would go into vaporization instead", "exactly doubled", "negative"],
    correct: 1,
    explanation: "At the boiling point added energy goes into latent heat of vaporization, not temperature — Q = mcΔT stops applying, so the lab warns you.",
  },
  {
    section: "analysis",
    question: "Two identical pots receive the same burner power for the same time, one with oil (c ≈ 2000) and one with water (c = 4186). The oil…",
    options: ["warms less", "warms more, roughly twice as fast per kilogram", "warms at the same rate", "never warms"],
    correct: 1,
    explanation: "ΔT = Q/(mc): per kilogram, the smaller-c oil needs about half the energy for the same temperature rise.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Rearranging Q = m·c·ΔT to predict temperature change gives…",
    options: ["ΔT = Q·m·c", "ΔT = Q/(m·c)", "ΔT = m·c/Q", "ΔT = Q·c/m"],
    correct: 1,
    explanation: "Divide both sides by m·c: temperature rise shrinks as mass or specific heat grows.",
  },
  {
    section: "fundamentals",
    question: "Water's unusually large specific heat makes it useful as a…",
    options: ["structural material", "coolant and heat-storage fluid", "electrical insulator", "lubricant"],
    correct: 1,
    explanation: "Absorbing lots of heat with little temperature rise is exactly what engine coolant and heating systems need.",
  },
  {
    section: "fundamentals",
    question: "The lab's calculation also assumes…",
    options: ["heat losses to the surroundings are negligible", "the sample boils continuously", "the container stores most of the heat", "the sample is always water"],
    correct: 0,
    explanation: "Q = m·c·ΔT credits ALL energy to the sample; real calorimetry must account for losses and container heat.",
  },
  {
    section: "fundamentals",
    question: "Temperature measures…",
    options: ["the total heat energy in a body", "the average kinetic energy of its particles", "its mass in kelvins", "the speed of light in it"],
    correct: 1,
    explanation: "Temperature tracks microscopic kinetic energy per particle; heat is the total energy transferred.",
  },
  {
    section: "fundamentals",
    question: "Which sample has the LARGEST specific heat capacity?",
    options: ["Copper (385)", "Dry sand (830)", "Water (4186)", "Aluminium (900)"],
    correct: 2,
    explanation: "Water's 4186 J/(kg·K) dwarfs common solids — the outlier of everyday materials.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "An electric heater delivers 2000 J to 0.8 kg of aluminium (c = 900 J/(kg·K)). The temperature rise is about…",
    options: ["1.8 K", "2.8 K", "5.6 K", "18 K"],
    correct: 1,
    explanation: "ΔT = 2000/(0.8 × 900) = 2000/720 ≈ 2.8 K.",
  },
  {
    section: "application",
    question: "Cooling 1.5 kg of water from 60 °C to 20 °C releases about…",
    options: ["62.8 kJ", "251 kJ", "125.6 kJ", "418.6 kJ"],
    correct: 1,
    explanation: "Q = 1.5 × 4186 × 40 = 251 160 J ≈ 251 kJ — the heat a radiator could deliver with a modest tank.",
  },
  {
    section: "application",
    question: "Equal 50 kJ amounts heat 1 kg of copper (385) and 1 kg of sand (830). Their temperature rises are about…",
    options: ["130 K and 60 K", "60 K and 130 K", "both 50 K", "13 K and 6 K"],
    correct: 0,
    explanation: "ΔT = 50 000/385 ≈ 130 K for copper; 50 000/830 ≈ 60 K for sand — the smaller c warms more.",
  },
  {
    section: "application",
    question: "A hot 2 kg copper block at 100 °C is dropped into 2 kg of water at 20 °C. Ignoring losses, the final temperature is about…",
    options: ["60 °C", "27 °C", "50 °C", "40 °C"],
    correct: 1,
    explanation: "Heat lost = heat gained: 2·385·(100−T) = 2·4186·(T−20) → 38 500 + 83 720 = (385+4186)·T → T ≈ 26.7 °C — the water's large c barely lets it warm.",
  },
  {
    section: "application",
    question: "How much energy cools 3 kg of water by 5 K?",
    options: ["20.9 kJ", "62.8 kJ", "6.28 kJ", "418.6 kJ"],
    correct: 1,
    explanation: "Q = 3 × 4186 × 5 = 62 790 J ≈ 62.8 kJ (removed).",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "On a sunny beach, sand burns your feet while the sea stays cool. The main reason is…",
    options: ["sand is closer to the sun", "sand's smaller c means the same absorbed energy raises its temperature much more", "water reflects all heat", "sand conducts heat away faster"],
    correct: 1,
    explanation: "c_sand ≈ 830 vs c_water ≈ 4186: per joule absorbed, sand heats about 5× more per kilogram.",
  },
  {
    section: "analysis",
    question: "A copper block and a water bath of equal mass absorb identical energy. Which reaches the higher temperature, and by roughly how much?",
    options: ["Water, about 11× higher", "Copper, about 11× higher", "Equal rises", "Copper, about 2× higher"],
    correct: 1,
    explanation: "ΔT ratio = c_water/c_copper = 4186/385 ≈ 10.9 — the defining contrast this lab demonstrates.",
  },
  {
    section: "analysis",
    question: "You use this Q = m·c·ΔT model for a sample being heated from −10 °C to +10 °C through its freezing point. The result is…",
    options: ["reliable throughout", "invalid across the phase change — latent heat is missing from the model", "valid only above 0 °C", "doubled automatically"],
    correct: 1,
    explanation: "Crossing a phase boundary diverts energy into fusion/vaporization; the model must stop at the transition and warn you.",
  },
  {
    section: "analysis",
    question: "An engineer wants a fluid that stores heat with the smallest possible temperature swing in a small tank. She picks…",
    options: ["copper", "mercury (c ≈ 140)", "water", "air (c ≈ 1005)"],
    correct: 2,
    explanation: "High c per kilogram AND high density make water the champion for compact thermal storage.",
  },
  {
    section: "analysis",
    question: "Halfway through heating, you double the power of the heater. The temperature curve's…",
    options: ["slope doubles, because ΔT per second = P/(mc)", "value doubles", "slope halves", "intercept changes"],
    correct: 0,
    explanation: "d(ΔT)/dt = P/(mc) — power sets the slope of the temperature-vs-time line, a rate view of the same Q = mcΔT model.",
  },
];
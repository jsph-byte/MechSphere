// Heat Conduction Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Thermal conductivities: typical ~300 K values (Incropera et al., Fundamentals of
// Heat and Mass Transfer); real values vary with alloy and temperature.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Heat transfer through a solid bar by molecular interaction, with no bulk movement of material, is called…",
    options: ["convection", "conduction", "radiation", "evaporation"],
    correct: 1,
    explanation: "Conduction transfers energy through the material itself; convection requires bulk fluid motion, radiation needs no medium.",
  },
  {
    section: "fundamentals",
    question: "Fourier's law for steady one-dimensional conduction through a uniform slab is…",
    options: ["q = k·A·ΔT / L", "q = m·c·ΔT", "q = εσT⁴", "q = ½ρv²"],
    correct: 0,
    explanation: "q = kAΔT/L: the rate scales with conductivity, area, and temperature difference, and inversely with thickness.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of thermal conductivity k is…",
    options: ["W/(m·K)", "J/kg", "W/m²", "K/m"],
    correct: 0,
    explanation: "k measures watts conducted per metre of thickness per kelvin of temperature difference.",
  },
  {
    section: "fundamentals",
    question: "Heat flows spontaneously from…",
    options: ["low temperature to high temperature", "high temperature to low temperature", "cold objects to cold objects", "equally in both directions"],
    correct: 1,
    explanation: "The second law of thermodynamics: heat transfers naturally from hot to cold, never the reverse without work input.",
  },
  {
    section: "fundamentals",
    question: "'Steady state' in this conduction model means…",
    options: ["the bar's temperature is the same everywhere", "the temperature at each point no longer changes with time", "the bar is melting", "no heat is flowing"],
    correct: 1,
    explanation: "At steady state, heat enters one end and leaves the other at equal rates, so every point holds a fixed temperature — a gradient remains, but it does not evolve.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A copper bar (k = 401 W/(m·K)) has L = 0.50 m, A = 0.010 m², and ΔT = 100 K. The steady heat-transfer rate is about…",
    options: ["80 W", "802 W", "8020 W", "8.0 W"],
    correct: 1,
    explanation: "q = kAΔT/L = 401 × 0.010 × 100 / 0.50 = 802 W.",
  },
  {
    section: "application",
    question: "The same copper bar, but with the length doubled to 1.0 m (everything else unchanged). The new heat rate is…",
    options: ["401 W", "802 W", "1604 W", "200 W"],
    correct: 0,
    explanation: "q is inversely proportional to L, so doubling the length halves the rate: 802/2 = 401 W.",
  },
  {
    section: "application",
    question: "A fiberglass-insulated panel: k = 0.035 W/(m·K), A = 2.0 m², ΔT = 20 K, L = 0.10 m. The heat rate is about…",
    options: ["0.14 W", "1.4 W", "14 W", "140 W"],
    correct: 2,
    explanation: "q = 0.035 × 2.0 × 20 / 0.10 = 14 W — insulation's low k keeps the loss tiny.",
  },
  {
    section: "application",
    question: "Copper (k ≈ 401 W/(m·K)) and mild steel (k ≈ 45 W/(m·K)) bars have identical geometry and ΔT. Compared with steel, copper conducts about…",
    options: ["9× more heat", "the same heat", "9× less heat", "100× less heat"],
    correct: 0,
    explanation: "q scales linearly with k, and 401/45 ≈ 9.",
  },
  {
    section: "application",
    question: "If the temperature difference across a wall doubles, the steady heat-transfer rate…",
    options: ["halves", "stays the same", "doubles", "quadruples"],
    correct: 2,
    explanation: "q = kAΔT/L is directly proportional to ΔT.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Tripling the cross-sectional area A while holding k, L, and ΔT fixed changes the heat rate by…",
    options: ["×3", "×1/3", "no change", "×9"],
    correct: 0,
    explanation: "q is directly proportional to A: three times the conducting area carries three times the heat.",
  },
  {
    section: "analysis",
    question: "A metal door handle feels colder than a wooden door at the same room temperature because…",
    options: ["metal is actually at a lower temperature", "metal's high k pulls heat away from your skin much faster", "wood contains no heat", "wood is a better conductor than metal"],
    correct: 1,
    explanation: "Both are at room temperature; high-k metal drains heat from your 33 °C skin far faster, so it feels colder.",
  },
  {
    section: "analysis",
    question: "Adding extra insulation to a wall reduces heat loss mainly because…",
    options: ["the insulation's very low k adds thermal resistance in series with the wall", "the wall's area shrinks", "ΔT across the wall increases", "insulation reflects all radiation"],
    correct: 0,
    explanation: "A low-k layer in series adds resistance R = L/(kA); even a thin layer of very low k dramatically cuts the rate.",
  },
  {
    section: "analysis",
    question: "In reality, k varies with temperature. The constant-k model used in this lab is…",
    options: ["exact at all temperatures", "an approximation, most accurate over modest temperature ranges", "valid only at 0 K", "unusable for metals"],
    correct: 1,
    explanation: "Material properties are listed at a reference temperature (about 300 K here); over a wide range the true k changes and the linear model degrades.",
  },
  {
    section: "analysis",
    question: "A pan has a copper base (k ≈ 401) and a stainless-steel handle (k ≈ 16). The handle stays cooler during cooking mainly because…",
    options: ["stainless steel conducts heat about 25× more slowly than copper, so less heat reaches the far end", "stainless steel is heavier", "copper absorbs all the heat", "handles are hollow"],
    correct: 0,
    explanation: "The low-k stainless handle resists heat flow, keeping the grip end at a much lower temperature than a copper handle would be.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Which heat-transfer mechanism requires direct molecular contact with NO bulk fluid motion?",
    options: ["conduction", "convection", "radiation", "all three equally"],
    correct: 0,
    explanation: "Conduction is energy passed between neighbouring molecules; convection is bulk fluid motion, radiation is electromagnetic waves.",
  },
  {
    section: "fundamentals",
    question: "In q = k·A·ΔT/L, the symbol L represents…",
    options: ["the bar's width", "the heat-flow path length between the two end temperatures", "the bar's mass", "the length of the room"],
    correct: 1,
    explanation: "L is the thickness the heat must travel through — the distance between the hot and cold faces.",
  },
  {
    section: "fundamentals",
    question: "Thermal conductivity k measures a material's ability to…",
    options: ["store heat", "conduct heat", "reflect light", "withstand high temperature"],
    correct: 1,
    explanation: "k is the proportionality constant in Fourier's law — a larger k means the material conducts heat more readily.",
  },
  {
    section: "fundamentals",
    question: "The heat-transfer rate q in Fourier's law has units of…",
    options: ["joules (J)", "watts (W)", "kelvin (K)", "watts per square metre (W/m²)"],
    correct: 1,
    explanation: "q is energy per unit time — watts. (W/m² would be heat flux, q/A.)",
  },
  {
    section: "fundamentals",
    question: "Which of these is the best thermal insulator?",
    options: ["copper (k ≈ 401 W/(m·K))", "aluminum (k ≈ 237 W/(m·K))", "polystyrene foam (k ≈ 0.035 W/(m·K))", "mild steel (k ≈ 45 W/(m·K))"],
    correct: 2,
    explanation: "The lowest k resists heat flow the most — polystyrene foam conducts about 10 000× less readily than copper.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "An aluminum bar (k = 237 W/(m·K)) has L = 0.30 m, A = 0.0050 m², and ΔT = 60 K. The heat rate is about…",
    options: ["23.7 W", "237 W", "2370 W", "7.1 W"],
    correct: 1,
    explanation: "q = 237 × 0.0050 × 60 / 0.30 = 237 W.",
  },
  {
    section: "application",
    question: "A glass window pane: k = 0.80 W/(m·K), L = 0.0040 m, A = 1.5 m², ΔT = 15 K. The heat loss is about…",
    options: ["4.8 W", "48 W", "480 W", "4500 W"],
    correct: 3,
    explanation: "q = 0.80 × 1.5 × 15 / 0.0040 = 4500 W — thin glass is a poor insulator despite its modest k, which is why double glazing exists.",
  },
  {
    section: "application",
    question: "A steel part (k = 45 W/(m·K)) with L = 0.10 m, A = 0.020 m², and ΔT = 50 K conducts about…",
    options: ["45 W", "450 W", "4500 W", "225 W"],
    correct: 1,
    explanation: "q = 45 × 0.020 × 50 / 0.10 = 450 W.",
  },
  {
    section: "application",
    question: "Doubling BOTH the area and the length of a bar (k and ΔT fixed) makes the heat rate…",
    options: ["double", "halve", "stay the same", "quadruple"],
    correct: 2,
    explanation: "q = kAΔT/L: the ×2 from area cancels the ×2 in the denominator, leaving q unchanged.",
  },
  {
    section: "application",
    question: "Two rods with identical A, L, and ΔT: copper (k ≈ 401) and stainless steel (k ≈ 16). The ratio q_copper/q_steel is about…",
    options: ["25", "4", "400", "1"],
    correct: 0,
    explanation: "With geometry equal, q is proportional to k: 401/16 ≈ 25.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "On a colder day, the outside temperature drops so ΔT across a wall doubles. Compared with the milder day, the wall now loses…",
    options: ["half as much heat", "the same heat", "twice as much heat", "four times as much heat"],
    correct: 2,
    explanation: "q = kAΔT/L is directly proportional to ΔT — double the temperature drive, double the loss.",
  },
  {
    section: "analysis",
    question: "A thick wool blanket feels warmer than a thin cotton sheet at the same temperature because…",
    options: ["wool has a higher thermal conductivity", "trapped air's low conductivity and the larger thickness slow heat leaving your body", "wool generates heat", "the sheet radiates more energy"],
    correct: 1,
    explanation: "Wool traps immobilized air (very low k) and adds thickness — both raise the resistance L/(kA) between your warm body and the room.",
  },
  {
    section: "analysis",
    question: "The model assumes insulated side walls so heat flows only along the bar (one-dimensional). If the sides were exposed to air, the real heat loss would be…",
    options: ["less than predicted", "greater than predicted, because extra paths (convection and radiation from the sides) carry heat away", "identical to the prediction", "exactly zero"],
    correct: 1,
    explanation: "Real side losses add parallel heat paths the 1-D model ignores — the idealized prediction then underestimates the loss.",
  },
  {
    section: "analysis",
    question: "A composite wall has two layers in series. In steady state, the heat rate through each layer is the same, and the dominant resistance belongs to…",
    options: ["the thick, low-k insulation layer", "the thin metal skin", "both layers equally", "neither — q is set only by the total area"],
    correct: 0,
    explanation: "Resistances in series add (R = L/(kA) each); the layer with the biggest R — thick and low-k — controls the overall heat rate, like the largest resistor in a series circuit.",
  },
  {
    section: "analysis",
    question: "A stove-top designer wants fast, even heat spreading from the burner. The best material from this lab is…",
    options: ["polystyrene foam", "copper", "wood", "window glass"],
    correct: 1,
    explanation: "Copper's very high k (≈ 401 W/(m·K)) spreads heat quickly and evenly; the insulators do the opposite.",
  },
];
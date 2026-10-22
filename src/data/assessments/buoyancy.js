// Buoyancy Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// All values hand-verified; g = 9.81 m/s² where used.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "According to Archimedes' principle, the buoyant force on an object immersed in a fluid equals the…",
    options: ["weight of the fluid the object displaces", "total volume of the object", "density of the object times its volume", "weight of the object"],
    correct: 0,
    explanation: "The buoyant force equals the weight of displaced fluid: F_b = ρ_fluid · V_displaced · g.",
  },
  {
    section: "fundamentals",
    question: "In what direction does the buoyant force act on an immersed object?",
    options: ["Downward", "Upward", "Horizontal", "Along the object's surface"],
    correct: 1,
    explanation: "Pressure increases with depth, so the net pressure force on the object pushes it upward.",
  },
  {
    section: "fundamentals",
    question: "What is the SI unit of density?",
    options: ["g/cm³", "kg/m³", "kg/L", "N/m³"],
    correct: 1,
    explanation: "The base SI combination is kilograms per cubic metre (kg/m³); g/cm³ equals 1000 kg/m³.",
  },
  {
    section: "fundamentals",
    question: "The formula F_b = ρ_fluid · V_displaced · g shows that the buoyant force depends on all of the following EXCEPT…",
    options: ["the fluid's density", "the displaced volume", "gravitational acceleration", "the object's density"],
    correct: 3,
    explanation: "F_b depends only on fluid density, displaced volume, and g — not on what the object is made of.",
  },
  {
    section: "fundamentals",
    question: "An object floats when its average density is…",
    options: ["greater than the fluid's", "less than the fluid's", "exactly equal to the fluid's", "unrelated to the fluid's"],
    correct: 1,
    explanation: "ρ_obj < ρ_fluid means the full-volume buoyant force can exceed the weight, so the object floats. Equal densities give neutral buoyancy.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A block fully submerged in fresh water (ρ = 1000 kg/m³) displaces 0.0020 m³ of water. With g = 9.81 m/s², the buoyant force is closest to…",
    options: ["1.96 N", "19.6 N", "196 N", "0.196 N"],
    correct: 1,
    explanation: "F_b = 1000 × 0.0020 × 9.81 = 19.62 ≈ 19.6 N.",
  },
  {
    section: "application",
    question: "An object of volume 0.010 m³ and density 500 kg/m³ has a weight of about… (g = 9.81 m/s²)",
    options: ["4.9 N", "49 N", "98 N", "490 N"],
    correct: 1,
    explanation: "W = ρ·V·g = 500 × 0.010 × 9.81 = 49.05 ≈ 49 N.",
  },
  {
    section: "application",
    question: "A wooden block of density 600 kg/m³ floats on fresh water (1000 kg/m³). What fraction of its volume is submerged?",
    options: ["6%", "40%", "60%", "100%"],
    correct: 2,
    explanation: "Floating requires the displaced weight to equal W, so the submerged fraction = ρ_obj/ρ_fluid = 600/1000 = 0.60.",
  },
  {
    section: "application",
    question: "A submarine's average density is set exactly equal to the surrounding sea water. It will…",
    options: ["rise to the surface", "sink to the bottom", "remain at any depth where it is placed (neutrally buoyant)", "accelerate upward"],
    correct: 2,
    explanation: "With equal densities, buoyant force equals weight at full submersion, so there is no net force at any depth.",
  },
  {
    section: "application",
    question: "A 0.50 m³ raft of density 800 kg/m³ floats on water (1000 kg/m³). The volume of displaced water is…",
    options: ["0.10 m³", "0.30 m³", "0.40 m³", "0.50 m³"],
    correct: 2,
    explanation: "Submerged fraction = 800/1000 = 0.8, so V_displaced = 0.8 × 0.50 = 0.40 m³.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A boat sails from a river (fresh water) into the open sea (slightly denser water). While floating, the buoyant force on the boat…",
    options: ["increases", "decreases", "stays the same", "becomes zero"],
    correct: 2,
    explanation: "A floating boat always displaces exactly its own weight of fluid (F_b = W). Denser sea water only reduces the submerged volume needed — the boat rides higher.",
  },
  {
    section: "analysis",
    question: "A fully submerged submarine descends deeper in a fluid of uniform density. The buoyant force on it…",
    options: ["increases with depth", "decreases with depth", "stays the same", "first increases, then decreases"],
    correct: 2,
    explanation: "F_b depends on displaced volume and fluid density, neither of which changes with depth in an ideal incompressible fluid.",
  },
  {
    section: "analysis",
    question: "Ice has a density of about 917 kg/m³ and sea water about 1025 kg/m³. Roughly what fraction of an iceberg sits below the surface?",
    options: ["about 50%", "about 75%", "about 89%", "about 98%"],
    correct: 2,
    explanation: "Submerged fraction = 917/1025 ≈ 0.895 — about 89% of an iceberg is under water.",
  },
  {
    section: "analysis",
    question: "The same solid object floats in both water (1000 kg/m³) and oil (900 kg/m³). Compared with water, in oil it…",
    options: ["floats with a smaller submerged volume", "floats with a larger submerged volume", "sinks immediately", "displaces less fluid weight"],
    correct: 1,
    explanation: "In both fluids F_b = W, so the displaced weight is identical; the lighter oil requires a larger displaced volume to provide it.",
  },
  {
    section: "analysis",
    question: "A solid steel block sinks in water, but a steel ship floats. The best explanation is…",
    options: [
      "steel becomes less dense when shaped into a ship",
      "the enclosed air makes the ship's overall average density (total mass over total volume) lower than water's",
      "water pushes harder on curved surfaces",
      "the ship's engines provide lift",
    ],
    correct: 1,
    explanation: "Shaping steel into a hollow hull adds a huge volume of air, lowering the average density below 1000 kg/m³ so the ship floats.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Archimedes' principle (buoyant force = weight of displaced fluid) is a direct consequence of…",
    options: ["conservation of mass", "fluid pressure increasing with depth, giving a net upward push on the object", "the object's inertia", "surface tension"],
    correct: 1,
    explanation: "Deeper fluid presses harder, so the upward pressure on the bottom of the object exceeds the downward pressure on top — the difference is the buoyant force.",
  },
  {
    section: "fundamentals",
    question: "An object sinks in a fluid when…",
    options: ["its density is less than the fluid's", "its density is greater than the fluid's", "it weighs more than 1 N", "its volume is smaller than 1 m³"],
    correct: 1,
    explanation: "If ρ_obj > ρ_fluid, even the full-volume buoyant force is smaller than the weight, so the object sinks.",
  },
  {
    section: "fundamentals",
    question: "For an object floating in equilibrium, the buoyant force compared with the object's weight is…",
    options: ["slightly larger", "slightly smaller", "exactly equal", "zero"],
    correct: 2,
    explanation: "Equilibrium requires zero net force, so F_b = W exactly for a floating object.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of force, including buoyant force, is the…",
    options: ["kilogram (kg)", "kg/m³", "newton (N)", "pascal (Pa)"],
    correct: 2,
    explanation: "Force is measured in newtons; the pascal is the unit of pressure (N/m²).",
  },
  {
    section: "fundamentals",
    question: "'Neutrally buoyant' means the object…",
    options: ["floats entirely above the surface", "remains suspended at its current depth without rising or sinking", "always rises", "always sinks"],
    correct: 1,
    explanation: "Neutral buoyancy is F_b = W while fully submerged, so the object stays wherever it is placed.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A diver's toy is fully submerged in sea water (ρ = 1025 kg/m³), displacing 0.050 m³. With g = 9.81 m/s², the buoyant force is about…",
    options: ["50.3 N", "503 N", "5030 N", "98.1 N"],
    correct: 1,
    explanation: "F_b = 1025 × 0.050 × 9.81 = 502.8 ≈ 503 N.",
  },
  {
    section: "application",
    question: "A block of wood with density 400 kg/m³ floats on water (1000 kg/m³). What percentage of its volume is ABOVE the waterline?",
    options: ["60%", "40%", "25%", "10%"],
    correct: 0,
    explanation: "Submerged fraction = 400/1000 = 40%, so 60% of the block sits above the surface.",
  },
  {
    section: "application",
    question: "A 2.0 m³ concrete block (ρ = 2400 kg/m³) is fully submerged in water. Its weight is about… (g = 9.81 m/s²)",
    options: ["4.7 kN", "47 kN", "470 kN", "9.8 kN"],
    correct: 1,
    explanation: "W = 2400 × 2.0 × 9.81 = 47 088 N ≈ 47 kN.",
  },
  {
    section: "application",
    question: "An object weighs 98.1 N and has a density of 800 kg/m³. While floating in water (1000 kg/m³, g = 9.81), it displaces…",
    options: ["0.0080 m³", "0.010 m³", "0.0125 m³", "0.100 m³"],
    correct: 1,
    explanation: "A floating object displaces its own weight of water: 98.1 / (1000 × 9.81) = 0.010 m³. (Its own total volume is 98.1/(800×9.81) = 0.0125 m³.)",
  },
  {
    section: "application",
    question: "A balloon with total mass 2.0 kg encloses 3.0 m³ of gas. Air density ≈ 1.2 kg/m³, g = 9.81 m/s². The net force on the balloon is about…",
    options: ["15.7 N upward", "19.6 N downward", "35.3 N downward", "5.5 N upward"],
    correct: 0,
    explanation: "F_b = 1.2 × 3.0 × 9.81 = 35.3 N; W = 2.0 × 9.81 = 19.6 N; net = 35.3 − 19.6 ≈ 15.7 N upward.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You slowly load cargo onto a floating barge. It…",
    options: ["rises out of the water", "sinks deeper, displacing additional water whose weight equals the added cargo", "stays at the same draft", "becomes neutrally buoyant"],
    correct: 1,
    explanation: "Each extra kilogram of cargo must be matched by a kilogram of displaced water, so the barge sinks until the extra displacement balances the load.",
  },
  {
    section: "analysis",
    question: "Two objects of different materials but identical volume are both fully submerged in the same fluid. The buoyant forces on them are…",
    options: ["equal — both displace the same volume of the same fluid", "larger on the denser one", "smaller on the denser one", "zero for the denser one"],
    correct: 0,
    explanation: "Fully submerged, each displaces its full volume; F_b = ρ_fluid·V·g is identical regardless of the object's own density.",
  },
  {
    section: "analysis",
    question: "A floating object is taken to the Moon, where g ≈ 1.62 m/s² instead of 9.81 m/s². Its submerged fraction…",
    options: ["increases", "decreases", "stays the same", "depends on the object's mass"],
    correct: 2,
    explanation: "The submerged fraction = ρ_obj/ρ_fluid, which contains no g — weight and buoyant force shrink together, so the floating level is unchanged.",
  },
  {
    section: "analysis",
    question: "A floating cube of density 500 kg/m³ is gently pushed deeper into the water and released. It will…",
    options: ["stay submerged", "accelerate back up toward its equilibrium floating level", "continue sinking", "rise and launch out of the water"],
    correct: 1,
    explanation: "Below equilibrium, the displaced volume is larger than needed, so F_b > W and the net force is upward — the basis of buoyancy-driven oscillation.",
  },
  {
    section: "analysis",
    question: "A hydrometer measures a fluid's density by how deep it floats. In a denser fluid, the same hydrometer floats…",
    options: ["deeper", "higher (shallower)", "at the same depth", "upside down"],
    correct: 1,
    explanation: "The displaced weight must always equal the fixed instrument weight, so a denser fluid needs less displaced volume — the hydrometer rides higher.",
  },
];
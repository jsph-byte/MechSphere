// Engineering material reference data.
// Approximate room-temperature values compiled from:
//  - Callister & Rethwisch, "Materials Science and Engineering: An Introduction" (10th ed.)
//  - ASM Handbook, Volume 1: Properties and Selection
// Actual properties vary with alloy, composition, temperature, and processing.
// These values are for education and rough comparison only — never for final design.

export const MATERIALS = [
  {
    id: "aluminum-6061",
    name: "Aluminum 6061-T6",
    grade: "Alloy 6061, T6 temper",
    category: "Nonferrous alloy",
    density: 2700, // kg/m^3
    specificHeat: 900, // J/(kg·K)
    thermalConductivity: 167, // W/(m·K)
    youngsModulus: 68.9e9, // Pa
    uses: ["Aircraft structures", "Bike frames", "Heat exchangers", "General structural parts"],
    note: "Weldable, corrosion-resistant, easy to machine. A workhorse structural aluminum alloy.",
  },
  {
    id: "aluminum-7075",
    name: "Aluminum 7075-T6",
    grade: "Alloy 7075, T6 temper",
    category: "Nonferrous alloy",
    density: 2810,
    specificHeat: 960,
    thermalConductivity: 130,
    youngsModulus: 71.7e9,
    uses: ["High-stress aircraft parts", "Rock-climbing gear", "Molds"],
    note: "Stronger than 6061 but harder to weld and less corrosion-resistant.",
  },
  {
    id: "carbon-steel-1045",
    name: "Carbon Steel AISI 1045",
    grade: "AISI/SAE 1045, medium carbon",
    category: "Ferrous alloy",
    density: 7850,
    specificHeat: 486,
    thermalConductivity: 50,
    youngsModulus: 200e9,
    uses: ["Shafts and axles", "Gears", "Bolts and studs", "Machine parts"],
    note: "Strong and cheap; rusts without protection. Often used in the normalized condition.",
  },
  {
    id: "stainless-304",
    name: "Stainless Steel 304",
    grade: "AISI 304 (18/8 austenitic)",
    category: "Ferrous alloy",
    density: 8000,
    specificHeat: 500,
    thermalConductivity: 16,
    youngsModulus: 193e9,
    uses: ["Food and chemical equipment", "Kitchenware", "Medical instruments", "Architecture"],
    note: "Excellent corrosion resistance, but conducts heat ~3× worse than carbon steel.",
  },
  {
    id: "copper-c11000",
    name: "Copper C11000",
    grade: "Electrolytic tough pitch (ETP) copper",
    category: "Nonferrous metal",
    density: 8930,
    specificHeat: 385,
    thermalConductivity: 398,
    youngsModulus: 117e9,
    uses: ["Wiring and busbars", "Heat sinks", "Plumbing", "Heat exchanger tubing"],
    note: "Outstanding electrical and thermal conductor; relatively soft, heavy, and expensive.",
  },
  {
    id: "cast-iron-gray",
    name: "Gray Cast Iron",
    grade: "ASTM A48, Class 30 (gray iron)",
    category: "Ferrous alloy",
    density: 7200,
    specificHeat: 460,
    thermalConductivity: 46,
    youngsModulus: 110e9,
    uses: ["Engine blocks", "Machine bases", "Pipes", "Cookware"],
    note: "Damps vibration well and is cheap to cast, but brittle and weak in tension.",
  },
  {
    id: "brass-c36000",
    name: "Brass C36000",
    grade: "Free-cutting brass (~36% Zn)",
    category: "Copper alloy",
    density: 8500,
    specificHeat: 380,
    thermalConductivity: 115,
    youngsModulus: 97e9,
    uses: ["Screw machine parts", "Valves and fittings", "Musical instruments", "Decorative hardware"],
    note: "Excellent machinability; more expensive than steel.",
  },
  {
    id: "water",
    name: "Water (liquid, 20 °C)",
    grade: "Thermal reference substance",
    category: "Fluid reference",
    density: 998,
    specificHeat: 4186,
    thermalConductivity: 0.598,
    youngsModulus: null, // a liquid has no static Young's modulus
    uses: ["Thermal reference for specific heat", "Cooling systems", "Heating systems"],
    note: "Included as the reference for calorimetry: the specific heat of water defines the calorie.",
  },
];

export const MATERIAL_SOURCE =
  "Approximate room-temperature values compiled from Callister & Rethwisch, Materials Science and Engineering: An Introduction (10th ed.) and ASM Handbook Vol. 1. Values vary with alloy, composition, temperature, and processing — treat them as representative, not exact.";

export function specificStiffness(m) {
  if (!m.youngsModulus) return null;
  return m.youngsModulus / m.density; // Pa/(kg/m^3) = (m/s)^2
}
// Dimensional analysis engine. Each quantity is a vector of exponents over the
// fundamental dimensions [L, M, T, Θ]. Operations manipulate exponents
// numerically — never by comparing label strings.

export const FUNDAMENTALS = ["L", "M", "T", "Θ"];

const SUPS = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
export const sup = (n) => String(n).split("").map((c) => SUPS[c] ?? c).join("");

export const ZERO_DIMS = [0, 0, 0, 0];

export const QUANTITIES = [
  { id: "length", label: "Length", symbol: "l", dims: [1, 0, 0, 0] },
  { id: "mass", label: "Mass", symbol: "m", dims: [0, 1, 0, 0] },
  { id: "time", label: "Time", symbol: "t", dims: [0, 0, 1, 0] },
  { id: "velocity", label: "Velocity", symbol: "v", dims: [1, 0, -1, 0] },
  { id: "acceleration", label: "Acceleration", symbol: "a", dims: [1, 0, -2, 0] },
  { id: "force", label: "Force", symbol: "F", dims: [1, 1, -2, 0] },
  { id: "pressure", label: "Pressure", symbol: "p", dims: [-1, 1, -2, 0] },
  { id: "energy", label: "Energy", symbol: "E", dims: [2, 1, -2, 0] },
  { id: "power", label: "Power", symbol: "P", dims: [2, 1, -3, 0] },
  { id: "density", label: "Density", symbol: "ρ", dims: [-3, 1, 0, 0] },
  { id: "temperature", label: "Temperature", symbol: "T", dims: [0, 0, 0, 1] },
  { id: "specificHeat", label: "Specific heat capacity", symbol: "c", dims: [2, 0, -2, -1] },
  { id: "area", label: "Area", symbol: "A", dims: [2, 0, 0, 0] },
  { id: "volume", label: "Volume", symbol: "V", dims: [3, 0, 0, 0] },
];

export const quantityById = (id) => QUANTITIES.find((q) => q.id === id);

// --- exponent arithmetic ---
export const addDims = (a, b) => a.map((v, i) => v + b[i]);          // multiplication
export const subDims = (a, b) => a.map((v, i) => v - b[i]);          // division
export const scaleDims = (a, n) => a.map((v) => v * n);              // integer powers
export const dimsEqual = (a, b) => a.every((v, i) => v === b[i]);

/** Readable signature in conventional order (M, L, T, Θ), e.g. M·L²·T⁻². */
const DISPLAY_ORDER = [1, 0, 2, 3]; // indices of M, L, T, Θ in the exponent vector
export function dimsString(d) {
  const parts = [];
  for (const i of DISPLAY_ORDER) {
    const v = d[i];
    if (v === 0) continue;
    parts.push(v === 1 ? FUNDAMENTALS[i] : `${FUNDAMENTALS[i]}${sup(v)}`);
  }
  return parts.length ? parts.join("·") : "dimensionless";
}
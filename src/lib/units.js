// Unit conversion data + logic. Every category converts through a consistent
// internal base unit (SI where one exists); temperature is special-cased for offsets.
// Conversion factors are standard verified values (NIST SP 811 / ISO 80000).

export const UNIT_CATEGORIES = [
  {
    id: "length", label: "Length", base: "m",
    units: [
      ["m", "Meter", 1], ["km", "Kilometer", 1000], ["cm", "Centimeter", 0.01],
      ["mm", "Millimeter", 0.001], ["um", "Micrometer", 1e-6],
      ["in", "Inch", 0.0254], ["ft", "Foot", 0.3048], ["yd", "Yard", 0.9144], ["mi", "Mile", 1609.344],
    ],
  },
  {
    id: "mass", label: "Mass", base: "kg",
    units: [
      ["kg", "Kilogram", 1], ["g", "Gram", 0.001], ["mg", "Milligram", 1e-6], ["t", "Metric ton", 1000],
      ["oz", "Ounce", 0.028349523125], ["lb", "Pound", 0.45359237], ["ton", "US ton", 907.18474],
    ],
  },
  {
    id: "time", label: "Time", base: "s",
    units: [
      ["s", "Second", 1], ["ms", "Millisecond", 0.001], ["min", "Minute", 60], ["h", "Hour", 3600],
      ["day", "Day", 86400], ["wk", "Week", 604800], ["yr", "Year (365.25 d)", 31557600],
    ],
  },
  {
    id: "area", label: "Area", base: "m²",
    units: [
      ["m2", "Square meter", 1], ["cm2", "Square centimeter", 1e-4], ["km2", "Square kilometer", 1e6],
      ["ha", "Hectare", 1e4], ["in2", "Square inch", 6.4516e-4], ["ft2", "Square foot", 0.09290304],
      ["acre", "Acre", 4046.8564224], ["mi2", "Square mile", 2589988.110336],
    ],
  },
  {
    id: "volume", label: "Volume", base: "m³",
    units: [
      ["m3", "Cubic meter", 1], ["L", "Liter", 0.001], ["mL", "Milliliter", 1e-6], ["cm3", "Cubic centimeter", 1e-6],
      ["gal", "US gallon", 0.003785411784], ["qt", "US quart", 0.000946352946],
      ["ft3", "Cubic foot", 0.028316846592], ["in3", "Cubic inch", 1.6387064e-5],
    ],
  },
  {
    id: "speed", label: "Speed", base: "m/s",
    units: [
      ["ms", "Meter/second", 1], ["kmh", "Kilometer/hour", 1 / 3.6], ["mph", "Mile/hour", 0.44704],
      ["fts", "Foot/second", 0.3048], ["kn", "Knot", 0.5144444444444],
    ],
  },
  {
    id: "acceleration", label: "Acceleration", base: "m/s²",
    units: [
      ["ms2", "Meter/second²", 1], ["g", "Standard gravity (gn)", 9.80665],
      ["fts2", "Foot/second²", 0.3048], ["Gal", "Gal", 0.01],
    ],
  },
  {
    id: "force", label: "Force", base: "N",
    units: [
      ["N", "Newton", 1], ["kN", "Kilonewton", 1000], ["mN", "Millinewton", 0.001],
      ["dyn", "Dyne", 1e-5], ["lbf", "Pound-force", 4.4482216152605], ["kgf", "Kilogram-force", 9.80665],
    ],
  },
  {
    id: "pressure", label: "Pressure", base: "Pa",
    units: [
      ["Pa", "Pascal", 1], ["kPa", "Kilopascal", 1e3], ["MPa", "Megapascal", 1e6],
      ["bar", "Bar", 1e5], ["mbar", "Millibar", 100], ["atm", "Atmosphere", 101325],
      ["psi", "Pound/inch²", 6894.757293168], ["torr", "Torr", 133.32236842105263],
    ],
  },
  {
    id: "energy", label: "Energy", base: "J",
    units: [
      ["J", "Joule", 1], ["kJ", "Kilojoule", 1e3], ["MJ", "Megajoule", 1e6],
      ["cal", "Calorie (thermochem.)", 4.184], ["kcal", "Kilocalorie (food cal)", 4184],
      ["Wh", "Watt-hour", 3600], ["kWh", "Kilowatt-hour", 3.6e6],
      ["BTU", "BTU (IT)", 1055.05585262], ["ftlbf", "Foot-pound", 1.3558179483314004],
      ["eV", "Electronvolt", 1.602176634e-19],
    ],
  },
  {
    id: "power", label: "Power", base: "W",
    units: [
      ["W", "Watt", 1], ["kW", "Kilowatt", 1e3], ["MW", "Megawatt", 1e6], ["mW", "Milliwatt", 0.001],
      ["hp", "Horsepower (mech.)", 745.6998715823], ["ftlbfs", "Foot-pound/second", 1.3558179483314004],
      ["BTUh", "BTU/hour", 0.29307107],
    ],
  },
  {
    id: "temperature", label: "Temperature", base: "K",
    units: [
      ["C", "Celsius", 0], ["K", "Kelvin", 0], ["F", "Fahrenheit", 0], ["R", "Rankine", 0],
    ],
  },
  {
    id: "density", label: "Density", base: "kg/m³",
    units: [
      ["kgm3", "Kilogram/m³", 1], ["gcm3", "Gram/cm³", 1000], ["gmL", "Gram/mL", 1000],
      ["kgl", "Kilogram/L", 1000], ["lbft3", "Pound/ft³", 16.018463373960138], ["lbin3", "Pound/in³", 27679.904710203125],
    ],
  },
];

export function categoryById(id) {
  return UNIT_CATEGORIES.find((c) => c.id === id) || UNIT_CATEGORIES[0];
}

// Temperature conversions go through kelvin, handling offsets correctly.
function toKelvin(value, unit) {
  if (unit === "C") return value + 273.15;
  if (unit === "F") return ((value + 459.67) * 5) / 9;
  if (unit === "R") return value * (5 / 9);
  return value; // K
}
function fromKelvin(k, unit) {
  if (unit === "C") return k - 273.15;
  if (unit === "F") return (k * 9) / 5 - 459.67;
  if (unit === "R") return k * (9 / 5);
  return k;
}

/**
 * Convert a value within a category. Returns {valid, value} or {valid:false, error}.
 */
export function convert(value, categoryId, fromId, toId) {
  const cat = categoryById(categoryId);
  const from = cat.units.find((u) => u[0] === fromId);
  const to = cat.units.find((u) => u[0] === toId);
  if (!from || !to) return { valid: false, error: "Please choose source and target units." };
  const num = typeof value === "string" ? value.trim() : value;
  if (num === "" || num === null || num === undefined || !Number.isFinite(Number(num)))
    return { valid: false, error: "Enter a valid number to convert." };
  const v = Number(num);
  if (cat.id === "temperature") return { valid: true, value: fromKelvin(toKelvin(v, fromId), toId) };
  return { valid: true, value: (v * from[2]) / to[2] };
}
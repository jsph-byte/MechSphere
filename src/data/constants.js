// Curated, verified engineering constants. Sources: CODATA 2018, ISO 80000 / NIST SP 811.
export const CONSTANTS = [
  { symbol: "g₀", name: "Standard gravitational acceleration", value: 9.80665, unit: "m/s²", description: "Defined standard value (ISO 80000-3). Intro mechanics usually rounds to 9.81 m/s²." },
  { symbol: "g", name: "Earth surface gravity (typical)", value: 9.81, unit: "m/s²", description: "Common textbook value; local gravity varies from ~9.78 to ~9.83 m/s²." },
  { symbol: "G", name: "Gravitational constant", value: 6.6743e-11, unit: "m³/(kg·s²)", description: "Universal constant in Newton's law of gravitation (CODATA 2018)." },
  { symbol: "c", name: "Speed of light in vacuum", value: 2.99792458e8, unit: "m/s", description: "Exact by definition of the metre." },
  { symbol: "R", name: "Universal gas constant", value: 8.314462618, unit: "J/(mol·K)", description: "Used in the ideal gas law PV = nRT (CODATA 2018)." },
  { symbol: "N_A", name: "Avogadro constant", value: 6.02214076e23, unit: "1/mol", description: "Particles per mole; exact by definition since 2019." },
  { symbol: "k_B", name: "Boltzmann constant", value: 1.380649e-23, unit: "J/K", description: "Relates temperature to particle energy; exact since 2019." },
  { symbol: "atm", name: "Standard atmosphere", value: 101325, unit: "Pa", description: "Defined reference pressure (exact)." },
  { symbol: "c_w", name: "Specific heat of liquid water (20 °C)", value: 4186, unit: "J/(kg·K)", description: "Reference value near room temperature; varies slightly with temperature." },
  { symbol: "ρ_w", name: "Density of water (20 °C)", value: 998, unit: "kg/m³", description: "Maximum density (999.97 kg/m³) occurs near 4 °C." },
  { symbol: "L_f,w", name: "Latent heat of fusion of water", value: 334000, unit: "J/kg", description: "Energy to melt ice at 0 °C — outside MechSphere's no-phase-change model." },
  { symbol: "σ", name: "Stefan–Boltzmann constant", value: 5.670374419e-8, unit: "W/(m²·K⁴)", description: "Radiative heat transfer constant (CODATA 2018)." },
  { symbol: "e", name: "Elementary charge", value: 1.602176634e-19, unit: "C", description: "Charge of one electron; exact since 2019." },
  { symbol: "T₀", name: "Ice point temperature", value: 273.15, unit: "K", description: "0 °C in kelvin — the offset used in all gas-law calculations." },
];
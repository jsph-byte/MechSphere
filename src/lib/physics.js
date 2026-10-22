// Pure, deterministic calculation functions for MechSphere experiments.
// No randomness, no external calls. All results are mathematically exact
// within the stated model assumptions.

export const G_DEFAULT = 9.81; // m/s^2, documented default
const DEG = Math.PI / 180;

/**
 * Ideal projectile motion (no air resistance, launch and landing at same height).
 * vx = v0·cos(θ);  vy0 = v0·sin(θ);  t = 2·vy0/g;  H = vy0²/(2g);  R = v0²·sin(2θ)/g
 */
export function projectile({ v0, angleDeg, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(v0) || v0 <= 0)
    errors.v0 = "Initial velocity must be a number greater than 0 m/s.";
  if (!Number.isFinite(angleDeg) || angleDeg < 0 || angleDeg > 90)
    errors.angleDeg = "Launch angle must be between 0° and 90°.";
  if (!Number.isFinite(g) || g <= 0)
    errors.g = "Gravitational acceleration must be greater than 0 m/s².";
  if (Object.keys(errors).length) return { valid: false, errors };

  const th = angleDeg * DEG;
  const vx = v0 * Math.cos(th);
  const vy0 = v0 * Math.sin(th);
  const t = (2 * vy0) / g;
  const H = (vy0 * vy0) / (2 * g);
  const R = (v0 * v0 * Math.sin(2 * th)) / g;
  const points = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const tt = (t * i) / n;
    points.push({ x: vx * tt, y: Math.max(0, vy0 * tt - 0.5 * g * tt * tt) });
  }
  return { valid: true, errors: null, vx, vy0, t, H, R, points };
}

/**
 * Simple pendulum, small-angle period approximation: T = 2π·√(L/g).
 * Valid only for small oscillation angles (roughly ≤ 15°); accuracy degrades as amplitude grows.
 */
export function pendulum({ length, angleDeg, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(length) || length <= 0)
    errors.length = "Pendulum length must be a number greater than 0 m.";
  if (!Number.isFinite(angleDeg) || angleDeg <= 0 || angleDeg > 60)
    errors.angleDeg = "Release angle must be between 0° and 60°.";
  if (!Number.isFinite(g) || g <= 0)
    errors.g = "Gravitational acceleration must be greater than 0 m/s².";
  if (Object.keys(errors).length) return { valid: false, errors };

  const T = 2 * Math.PI * Math.sqrt(length / g);
  return { valid: true, errors: null, T };
}

/**
 * Block sliding down an inclined plane with kinetic friction.
 * Sign convention: positive direction is DOWN the plane.
 * N = m·g·cos(θ);  fk = μk·N;  Fnet = m·g·sin(θ) − fk;  a = Fnet/m
 * If a ≤ 0, the assumed sliding direction/friction model needs reconsideration
 * (kinetic friction assumes the block is already moving).
 */
export function incline({ angleDeg, mass, mu, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(angleDeg) || angleDeg <= 0 || angleDeg >= 90)
    errors.angleDeg = "Incline angle must be between 0° and 90°.";
  if (!Number.isFinite(mass) || mass <= 0)
    errors.mass = "Mass must be a number greater than 0 kg.";
  if (!Number.isFinite(mu) || mu < 0)
    errors.mu = "Coefficient of kinetic friction must be 0 or greater.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const th = angleDeg * DEG;
  const weight = mass * g;
  const parallel = weight * Math.sin(th); // gravity component down the plane
  const perpendicular = weight * Math.cos(th); // gravity component into the plane
  const normal = perpendicular;
  const friction = mu * normal; // kinetic friction magnitude
  const fnet = parallel - friction;
  const a = fnet / mass;
  return {
    valid: true,
    errors: null,
    weight,
    parallel,
    perpendicular,
    normal,
    friction,
    fnet,
    a,
    sliding: a > 0,
  };
}

/**
 * Combined gas law for a fixed amount of ideal gas: P1·V1/T1 = P2·V2/T2.
 * Temperatures in kelvin. `unknown` ∈ {'p2','v2','t2'}; all other five values must be > 0.
 */
export function gasLaw({ p1, v1, t1, p2, v2, t2, unknown }) {
  const errors = {};
  const needs = { p2: ["p1", "v1", "t1", "v2", "t2"], v2: ["p1", "v1", "t1", "p2", "t2"], t2: ["p1", "v1", "t1", "p2", "v2"] };
  const required = needs[unknown] || [];
  const src = { p1, v1, t1, p2, v2, t2 };
  required.forEach((k) => {
    const val = src[k];
    if (!Number.isFinite(val) || val <= 0) errors[k] = "All supplied state values must be numbers greater than 0.";
  });
  if (errors && Object.keys(errors).length) return { valid: false, errors };

  if (unknown === "p2") {
    return { valid: true, errors: null, value: (p1 * v1 * t2) / (t1 * v2) };
  }
  if (unknown === "v2") {
    return { valid: true, errors: null, value: (p1 * v1 * t2) / (t1 * p2) };
  }
  return { valid: true, errors: null, value: (p2 * v2 * t1) / (p1 * v1) };
}

/**
 * Specific heat: Q = m·c·ΔT. ΔT = Q/(m·c); Tf = T0 + ΔT.
 * Simplified model: no phase change, no heat loss to surroundings.
 */
export function specificHeat({ mass, initialTempC, energyJ, c }) {
  const errors = {};
  if (!Number.isFinite(mass) || mass <= 0)
    errors.mass = "Sample mass must be a number greater than 0 kg.";
  if (!Number.isFinite(energyJ))
    errors.energyJ = "Heat energy must be a number (negative to remove heat).";
  if (!Number.isFinite(c) || c <= 0) errors.c = "Specific heat capacity must be greater than 0.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const deltaT = energyJ / (mass * c);
  const finalTempC = initialTempC + deltaT;
  return { valid: true, errors: null, deltaT, finalTempC };
}

/** Celsius ↔ Kelvin helpers. Absolute zero: 0 K = −273.15 °C. */
export const cToK = (c) => c + 273.15;
export const kToC = (k) => k - 273.15;

/**
 * Archimedes' principle. W = ρ_obj·V·g; fully submerged Fb = ρ_fluid·V·g.
 * Freely floating equilibrium: submerged fraction f = ρ_obj/ρ_fluid (≤ 1),
 * displaced volume = f·V, and Fb = W exactly. ρ_obj > ρ_fluid → sinks
 * (fully submerged, Fb = ρ_fluid·V·g < W). ρ_obj = ρ_fluid → neutral.
 * Assumes an incompressible, uniform fluid and a rigid homogeneous object.
 */
export function buoyancy({ objectDensity, volume, fluidDensity, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(objectDensity) || objectDensity <= 0)
    errors.objectDensity = "Object density must be a number greater than 0 kg/m³.";
  if (!Number.isFinite(volume) || volume <= 0)
    errors.volume = "Object volume must be a number greater than 0 m³.";
  if (!Number.isFinite(fluidDensity) || fluidDensity <= 0)
    errors.fluidDensity = "Fluid density must be a number greater than 0 kg/m³.";
  if (!Number.isFinite(g) || g <= 0)
    errors.g = "Gravitational acceleration must be greater than 0 m/s².";
  if (Object.keys(errors).length) return { valid: false, errors };

  const weight = objectDensity * volume * g;
  const maxBuoyantForce = fluidDensity * volume * g;
  const neutral = objectDensity === fluidDensity;
  const floats = objectDensity < fluidDensity;
  const submergedFraction = Math.min(1, objectDensity / fluidDensity);
  const displacedVolume = submergedFraction * volume;
  const buoyantForce = floats || neutral ? weight : maxBuoyantForce;
  return {
    valid: true, errors: null,
    weight, maxBuoyantForce, buoyantForce,
    submergedFraction, displacedVolume,
    state: neutral ? "neutral" : floats ? "floating" : "sinking",
  };
}

/**
 * Ideal steady incompressible flow through a pipe with two sections.
 * Continuity (mass conservation): Q = A1·v1 = A2·v2, A = π·d²/4.
 * Bernoulli (energy per unit volume, with elevation):
 *   P2 = P1 − ½ρ(v2² − v1²) − ρ·g·(z2 − z1)
 * P values are gauge. Neglects viscosity, turbulence, and energy losses —
 * an idealized approximation, not a model of every real pipe system.
 */
export function pipeFlow({ d1, d2, flowRate, rho, p1, dz = 0, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(d1) || d1 <= 0) errors.d1 = "Wide-section diameter must be greater than 0 m.";
  if (!Number.isFinite(d2) || d2 <= 0) errors.d2 = "Narrow-section diameter must be greater than 0 m.";
  if (!Number.isFinite(flowRate) || flowRate <= 0) errors.flowRate = "Volume flow rate must be greater than 0 m³/s.";
  if (!Number.isFinite(rho) || rho <= 0) errors.rho = "Fluid density must be greater than 0 kg/m³.";
  if (!Number.isFinite(p1)) errors.p1 = "Reference pressure must be a number.";
  if (!Number.isFinite(dz)) errors.dz = "Elevation difference must be a number.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const A1 = (Math.PI * d1 * d1) / 4;
  const A2 = (Math.PI * d2 * d2) / 4;
  const v1 = flowRate / A1;
  const v2 = flowRate / A2;
  const dynamicRise = 0.5 * rho * (v2 * v2 - v1 * v1);
  const elevationDrop = rho * g * dz;
  const p2 = p1 - dynamicRise - elevationDrop;
  return { valid: true, errors: null, A1, A2, v1, v2, dynamicRise, elevationDrop, p2 };
}

/**
 * Fourier's law of one-dimensional steady-state conduction: q = k·A·ΔT / L.
 * Uniform material, constant k over the temperature range, insulated side
 * walls (no lateral loss), perfect thermal contact at both ends.
 */
export function conduction({ k, length, area, deltaT }) {
  const errors = {};
  if (!Number.isFinite(k) || k <= 0) errors.k = "Thermal conductivity must be greater than 0 W/(m·K).";
  if (!Number.isFinite(length) || length <= 0) errors.length = "Sample length must be greater than 0 m.";
  if (!Number.isFinite(area) || area <= 0) errors.area = "Cross-sectional area must be greater than 0 m².";
  if (!Number.isFinite(deltaT) || deltaT <= 0)
    errors.deltaT = "Temperature difference must be greater than 0 K — the hot end must be hotter than the cold end.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const rate = (k * area * deltaT) / length;
  const heatFlux = (k * deltaT) / length;
  const thermalResistance = length / (k * area);
  return { valid: true, errors: null, rate, heatFlux, thermalResistance };
}
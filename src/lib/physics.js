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

/**
 * 1-D two-body collision on a frictionless track.
 * Elastic (e = 1): v1' = ((m1−m2)u1 + 2m2·u2)/(m1+m2); v2' = ((m2−m1)u2 + 2m1·u1)/(m1+m2)
 * Perfectly inelastic (stick together): v' = (m1u1 + m2u2)/(m1+m2).
 * Momentum is always conserved; kinetic energy only in the elastic case.
 */
export function collision({ m1, m2, u1, u2, type = "elastic" }) {
  const errors = {};
  if (!Number.isFinite(m1) || m1 <= 0) errors.m1 = "Mass 1 must be greater than 0 kg.";
  if (!Number.isFinite(m2) || m2 <= 0) errors.m2 = "Mass 2 must be greater than 0 kg.";
  if (!Number.isFinite(u1)) errors.u1 = "Initial speed 1 must be a number (sign = direction).";
  if (!Number.isFinite(u2)) errors.u2 = "Initial speed 2 must be a number (sign = direction).";
  if (Object.keys(errors).length) return { valid: false, errors };

  const pTotal = m1 * u1 + m2 * u2;
  const keInitial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
  if (type === "inelastic") {
    const v = pTotal / (m1 + m2);
    const keFinal = 0.5 * (m1 + m2) * v * v;
    return { valid: true, errors: null, pTotal, keInitial, v1: v, v2: v, keFinal, keLost: keInitial - keFinal };
  }
  const v1p = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
  const v2p = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
  const keFinal = 0.5 * m1 * v1p * v1p + 0.5 * m2 * v2p * v2p;
  return { valid: true, errors: null, pTotal, keInitial, v1: v1p, v2: v2p, keFinal, keLost: keInitial - keFinal };
}

/** Standard gravitational parameters (GM) and mean radii for orbit calculations. */
export const ORBIT_BODIES = {
  earth: { name: "Earth", GM: 3.986004418e14, radiusM: 6.371e6 },
  moon: { name: "Moon", GM: 4.9048695e12, radiusM: 1.7374e6 },
  mars: { name: "Mars", GM: 4.282837e13, radiusM: 3.3895e6 },
};

/**
 * Circular orbit at altitude h above a body: r = R + h.
 * v = √(GM/r); T = 2π√(r³/GM); local gravity g = GM/r².
 * A circular orbit is a specific idealized orbit — real orbits can be elliptical.
 */
export function orbit({ body = "earth", altitudeKm }) {
  const errors = {};
  const b = ORBIT_BODIES[body] || ORBIT_BODIES.earth;
  if (!Number.isFinite(altitudeKm) || altitudeKm < 0)
    errors.altitudeKm = "Altitude must be 0 km or greater.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const r = b.radiusM + altitudeKm * 1000;
  const v = Math.sqrt(b.GM / r);
  const T = 2 * Math.PI * Math.sqrt((r * r * r) / b.GM);
  const gLocal = b.GM / (r * r);
  return { valid: true, errors: null, bodyName: b.name, r, v, T, gLocal };
}

/**
 * Work done by a constant force at an angle to the motion: W = F·d·cosθ.
 * If all that work becomes kinetic energy of a mass starting at rest: v = √(2W/m).
 * Average power over a chosen duration: P = W/t.
 */
export function workEnergy({ force, angleDeg, distance, mass, time }) {
  const errors = {};
  if (!Number.isFinite(force) || force < 0) errors.force = "Force magnitude must be 0 or greater.";
  if (!Number.isFinite(angleDeg)) errors.angleDeg = "Angle must be a number.";
  if (!Number.isFinite(distance) || distance < 0) errors.distance = "Distance must be 0 or greater.";
  if (!Number.isFinite(mass) || mass <= 0) errors.mass = "Mass must be greater than 0 kg.";
  if (!Number.isFinite(time) || time <= 0) errors.time = "Time must be greater than 0 s.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const th = angleDeg * DEG;
  const work = force * distance * Math.cos(th);
  const power = work / time;
  const speedFromWork = Math.sqrt((2 * Math.max(work, 0)) / mass);
  return { valid: true, errors: null, work, power, speedFromWork };
}

/**
 * Hooke's law for a linear spring: F = k·x (x sign: stretch positive).
 * Stored elastic energy U = ½kx². Mass–spring oscillation: f = (1/2π)·√(k/m), T = 1/f.
 * Valid while the spring stays within its linear elastic range.
 */
export function spring({ k, x, mass }) {
  const errors = {};
  if (!Number.isFinite(k) || k <= 0) errors.k = "Spring constant k must be greater than 0 N/m.";
  if (!Number.isFinite(x)) errors.x = "Extension x must be a number (sign = stretch or compress).";
  if (!Number.isFinite(mass) || mass <= 0) errors.mass = "Mass must be greater than 0 kg.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const force = k * x;
  const energy = 0.5 * k * x * x;
  const freq = Math.sqrt(k / mass) / (2 * Math.PI);
  return { valid: true, errors: null, force, energy, freq, period: 1 / freq };
}

/** Torque about a pivot: τ = r·F·sinθ (θ between the lever arm and the force). */
export function torque({ r, force, angleDeg }) {
  const errors = {};
  if (!Number.isFinite(r) || r <= 0) errors.r = "Lever arm must be greater than 0 m.";
  if (!Number.isFinite(force) || force < 0) errors.force = "Force must be 0 or greater.";
  if (!Number.isFinite(angleDeg)) errors.angleDeg = "Angle must be a number.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const th = angleDeg * DEG;
  return { valid: true, errors: null, torque: r * force * Math.sin(th), component: force * Math.sin(th) };
}

/**
 * Balanced lever (class-1 seesaw): load·d_load = effort·d_effort about the pivot.
 * Required effort force F = m·g·d_load/d_effort; mechanical advantage = d_effort/d_load.
 */
export function lever({ loadKg, loadArmM, effortArmM, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(loadKg) || loadKg <= 0) errors.loadKg = "Load must be greater than 0 kg.";
  if (!Number.isFinite(loadArmM) || loadArmM <= 0) errors.loadArmM = "Load arm must be greater than 0 m.";
  if (!Number.isFinite(effortArmM) || effortArmM <= 0) errors.effortArmM = "Effort arm must be greater than 0 m.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const loadWeight = loadKg * g;
  const effortForce = (loadKg * g * loadArmM) / effortArmM;
  return {
    valid: true, errors: null, loadWeight, effortForce,
    mechanicalAdvantage: effortArmM / loadArmM,
  };
}

/** Standard atmospheric pressure at sea level. */
export const P_ATM = 101325;

/**
 * Hydrostatic pressure in a static fluid: gauge P = ρ·g·h; absolute P = P_atm + ρgh.
 * Total force on a flat area at that depth: F = gauge P · A (assumes the area's
 * full surface sits at depth h — an approximation for tall gates).
 */
export function hydrostatic({ rho, depth, area, g = G_DEFAULT }) {
  const errors = {};
  if (!Number.isFinite(rho) || rho <= 0) errors.rho = "Fluid density must be greater than 0 kg/m³.";
  if (!Number.isFinite(depth) || depth < 0) errors.depth = "Depth must be 0 m or greater.";
  if (!Number.isFinite(area) || area <= 0) errors.area = "Area must be greater than 0 m².";
  if (!Number.isFinite(g) || g <= 0) errors.g = "Gravitational acceleration must be greater than 0 m/s².";
  if (Object.keys(errors).length) return { valid: false, errors };

  const pGauge = rho * g * depth;
  return {
    valid: true, errors: null,
    pGauge, pAbs: P_ATM + pGauge, force: pGauge * area,
  };
}

/**
 * Linear thermal expansion: ΔL = α·L0·ΔT (α per kelvin, ~room-temperature values).
 * Isotropic volume expansion: ΔV ≈ 3α·V0·ΔT. Valid for small ΔT, uniform temperature.
 */
export function thermalExpansion({ alpha, length0, deltaT, volume0 = 1 }) {
  const errors = {};
  if (!Number.isFinite(alpha) || alpha <= 0) errors.alpha = "Expansion coefficient must be greater than 0 1/K.";
  if (!Number.isFinite(length0) || length0 <= 0) errors.length0 = "Initial length must be greater than 0 m.";
  if (!Number.isFinite(deltaT)) errors.deltaT = "Temperature change must be a number.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const dL = alpha * length0 * deltaT;
  return {
    valid: true, errors: null,
    dL, newLength: length0 + dL,
    dV: 3 * alpha * volume0 * deltaT,
  };
}

/**
 * Ideal-gas processes from state 1 (P1, V1, T1 absolute):
 *   isothermal (Boyle): P1V1 = P2V2, T2 = T1, W = P1V1·ln(V2/V1) — driven by V2
 *   isobaric (Charles): V ∝ T at fixed P — driven by T2
 *   isochoric (Gay-Lussac): P ∝ T at fixed V, W = 0 — driven by T2
 *   adiabatic: P1V1^γ = P2V2^γ, W = (P1V1 − P2V2)/(γ−1) — driven by V2 (γ = 1.4 for air)
 * Work is done BY the gas (positive = expansion). Ideal-gas model throughout.
 */
export function gasProcess({ p1, v1, t1, type = "isothermal", target, gamma = 1.4 }) {
  const errors = {};
  if (!Number.isFinite(p1) || p1 <= 0) errors.p1 = "Initial pressure must be greater than 0 kPa.";
  if (!Number.isFinite(v1) || v1 <= 0) errors.v1 = "Initial volume must be greater than 0 L.";
  if (!Number.isFinite(t1) || t1 <= 0) errors.t1 = "Initial temperature must be greater than 0 K.";
  if (!Number.isFinite(target) || target <= 0) errors.target = "The driven final value must be greater than 0.";
  if (!Number.isFinite(gamma) || gamma <= 1) errors.gamma = "Heat-capacity ratio γ must be greater than 1.";
  if (Object.keys(errors).length) return { valid: false, errors };

  if (type === "isobaric") {
    const t2 = target;
    const v2 = (v1 * t2) / t1;
    return { valid: true, errors: null, p2: p1, v2, t2, work: p1 * (v2 - v1) };
  }
  if (type === "isochoric") {
    const t2 = target;
    const p2 = (p1 * t2) / t1;
    return { valid: true, errors: null, p2, v2: v1, t2, work: 0 };
  }
  if (type === "adiabatic") {
    const v2 = target;
    const p2 = p1 * Math.pow(v1 / v2, gamma);
    const t2 = t1 * Math.pow(v1 / v2, gamma - 1);
    return { valid: true, errors: null, p2, v2, t2, work: (p1 * v1 - p2 * v2) / (gamma - 1) };
  }
  const v2 = target;
  const p2 = (p1 * v1) / v2;
  return { valid: true, errors: null, p2, v2, t2: t1, work: p1 * v1 * Math.log(v2 / v1) };
}

/**
 * Series or parallel two-resistor DC circuit (ideal):
 * series R = R1+R2 (same current); parallel R = R1R2/(R1+R2) (same voltage).
 * I = V/R; power P = V·I; per-resistor power as I²R (series) or V²/R (parallel).
 */
export function circuit({ voltage, r1, r2, mode = "series" }) {
  const errors = {};
  if (!Number.isFinite(voltage) || voltage <= 0) errors.voltage = "Voltage must be greater than 0 V.";
  if (!Number.isFinite(r1) || r1 <= 0) errors.r1 = "Resistance 1 must be greater than 0 Ω.";
  if (!Number.isFinite(r2) || r2 <= 0) errors.r2 = "Resistance 2 must be greater than 0 Ω.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const series = mode !== "parallel";
  const rTotal = series ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const current = voltage / rTotal;
  const p1 = series ? current * current * r1 : (voltage * voltage) / r1;
  const p2 = series ? current * current * r2 : (voltage * voltage) / r2;
  return { valid: true, errors: null, rTotal, current, totalPower: voltage * current, p1, p2 };
}

/**
 * Electrical energy and cost: P = V·I; E (kWh) = P (kW) × hours; cost = E × rate.
 * Uses the stated constant power over the whole duration (no duty cycling).
 */
export function electricEnergy({ voltage, current, hours, ratePerKwh }) {
  const errors = {};
  if (!Number.isFinite(voltage) || voltage <= 0) errors.voltage = "Voltage must be greater than 0 V.";
  if (!Number.isFinite(current) || current <= 0) errors.current = "Current must be greater than 0 A.";
  if (!Number.isFinite(hours) || hours <= 0) errors.hours = "Hours must be greater than 0.";
  if (!Number.isFinite(ratePerKwh) || ratePerKwh < 0) errors.ratePerKwh = "Rate must be 0 or greater.";
  if (Object.keys(errors).length) return { valid: false, errors };

  const powerW = voltage * current;
  const energyKwh = (powerW / 1000) * hours;
  return { valid: true, errors: null, powerW, energyKwh, cost: energyKwh * ratePerKwh };
}
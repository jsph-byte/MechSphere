// Orbit & Gravity Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; v = √(GM/r), T = 2π√(r³/GM), circular two-body model.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Newton's law of gravitation says the attraction between two masses…",
    options: ["grows with distance", "grows with the product of the masses and shrinks with distance²", "depends only on the larger mass", "acts only on the surface"],
    correct: 1,
    explanation: "F = G·m₁m₂/r²: more mass pulls harder; distance squared weakens it fast.",
  },
  {
    section: "fundamentals",
    question: "An orbit is essentially…",
    options: ["floating without gravity", "falling toward the planet while moving sideways fast enough to keep missing it", "held up by the atmosphere", "balanced by centrifugal force in stillness"],
    correct: 1,
    explanation: "An orbiting body is in continuous free fall; its tangential speed keeps the curvature of its fall matching the planet's.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of gravitational acceleration is…",
    options: ["m/s²", "N", "kg", "J"],
    correct: 0,
    explanation: "Gravitational acceleration is an acceleration: metres per second squared.",
  },
  {
    section: "fundamentals",
    question: "A circular orbit requires the gravitational force to act as…",
    options: ["a braking force", "the centripetal force pulling toward the centre", "a pushing force outward", "no force at all"],
    correct: 1,
    explanation: "Gravity supplies exactly the centripetal force mv²/r needed to bend the path into a circle.",
  },
  {
    section: "fundamentals",
    question: "This lab's orbit model is best described as…",
    options: ["a full n-body simulation", "an idealized circular two-body problem", "an atmospheric flight model", "a relativistic model"],
    correct: 1,
    explanation: "One small object around one spherical central body, circular path, no perturbations — the classic idealization.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "The speed needed for a circular orbit just at Earth's surface (r = 6.371×10⁶ m) is about…",
    options: ["1.12 km/s", "7.91 km/s", "11.2 km/s", "3.0 km/s"],
    correct: 1,
    explanation: "v = √(GM/r) = √(3.986×10¹⁴/6.371×10⁶) ≈ 7.91 km/s — the textbook 'surface circular orbit' speed.",
  },
  {
    section: "application",
    question: "That surface-skimming orbit's period is about…",
    options: ["42 minutes", "84 minutes", "1436 minutes", "24 hours"],
    correct: 1,
    explanation: "T = 2π√(r³/GM) ≈ 5061 s ≈ 84.3 min.",
  },
  {
    section: "application",
    question: "A geostationary satellite orbits about 35 786 km above Earth's surface. Its orbital period is…",
    options: ["90 minutes", "12 hours", "one sidereal day (~23 h 56 min)", "one lunar month"],
    correct: 2,
    explanation: "Matching Earth's rotation makes it hang over one spot — that fixes the ~24 h period and hence the unique altitude.",
  },
  {
    section: "application",
    question: "The ISS orbits at ~400 km altitude with a period of about…",
    options: ["92 minutes", "45 minutes", "12 hours", "24 hours"],
    correct: 0,
    explanation: "T = 2π√((6.771×10⁶)³/GM) ≈ 5544 s ≈ 92 min — astronauts see ~16 sunrises a day.",
  },
  {
    section: "application",
    question: "At that 400 km altitude, Earth's gravity is about…",
    options: ["zero", "8.7 m/s² — about 89% of surface gravity", "exactly 9.81 m/s²", "4.9 m/s²"],
    correct: 1,
    explanation: "g = GM/r² = 3.986×10¹⁴/(6.771×10⁶)² ≈ 8.70 m/s²: only ~11% weaker than at the surface.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You move to an orbit with 4× the radius. The orbital period…",
    options: ["doubles", "quadruples", "grows 8× (T ∝ r^1.5)", "halves"],
    correct: 2,
    explanation: "Kepler's third law: T² ∝ r³, so 4× radius gives 4^1.5 = 8× the period.",
  },
  {
    section: "analysis",
    question: "Astronauts float inside the ISS because…",
    options: ["there is no gravity there", "they and the station are in free fall together", "the station spins to cancel gravity", "air pressure lifts them"],
    correct: 1,
    explanation: "Gravity still acts (≈8.7 m/s²); everything falls together, so nothing pushes against anything — apparent weightlessness.",
  },
  {
    section: "analysis",
    question: "A satellite in a higher circular orbit moves…",
    options: ["faster — more energy", "slower — v ∝ 1/√r", "at the same speed", "faster only if heavier"],
    correct: 1,
    explanation: "v = √(GM/r) falls as radius grows: distant satellites crawl, near ones race — mass never enters.",
  },
  {
    section: "analysis",
    question: "A satellite releases a bolt while orbiting. The bolt…",
    options: ["falls straight to Earth", "stays alongside, orbiting with the satellite", "shoots backward", "burns instantly"],
    correct: 1,
    explanation: "The bolt has the same orbital velocity and experiences the same gravity — it follows the same orbit. (This is why orbital debris is a real problem.)",
  },
  {
    section: "analysis",
    question: "If Earth's mass were 4× larger (same radius), the surface circular-orbit speed would…",
    options: ["double", "halve", "stay the same", "quadruple"],
    correct: 0,
    explanation: "v = √(GM/r) scales with √M: four times the mass doubles the required speed.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Kepler's third law for circular orbits states…",
    options: ["T ∝ r", "T² ∝ r³", "T ∝ r³", "T² ∝ r"],
    correct: 1,
    explanation: "The square of the period grows with the cube of the orbital radius — a direct consequence of Newtonian gravity.",
  },
  {
    section: "fundamentals",
    question: "Orbital speed depends on…",
    options: ["the satellite's mass", "the central body's mass and the orbital radius only", "the satellite's shape", "the satellite's fuel"],
    correct: 1,
    explanation: "v = √(GM/r): heavy or light satellites need identical speeds on the same orbit.",
  },
  {
    section: "fundamentals",
    question: "Weightlessness in orbit is best described as…",
    options: ["absence of gravity", "apparent weightlessness from free fall", "a property of vacuum", "zero net force"],
    correct: 1,
    explanation: "Net force is NOT zero — gravity is the centripetal force. 'Weightless' means nothing pushes back on you.",
  },
  {
    section: "fundamentals",
    question: "G (the gravitational constant) vs g (surface gravity):…",
    options: ["they are the same quantity in different units", "G is universal (6.674×10⁻¹¹ N·m²/kg²); g depends on the planet", "g is universal; G varies", "neither appears in orbital mechanics"],
    correct: 1,
    explanation: "G is the same everywhere; g = GM/R² is derived per planet and shrinks as 1/r² with altitude.",
  },
  {
    section: "fundamentals",
    question: "For circular-orbit problems we treat the central body as…",
    options: ["fixed, with the satellite's gravity ignored on it", "orbiting the satellite equally", "a flat plane", "massless"],
    correct: 0,
    explanation: "The two-body idealization: the central mass dominates, so it barely moves — a superb approximation for satellites.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "The Moon orbits at r ≈ 384 400 km. Using T² ∝ r³ and T_surface ≈ 84.3 min at r = 6371 km, the Moon's period is about…",
    options: ["14 days", "27 days", "365 days", "7 days"],
    correct: 1,
    explanation: "T = 84.3 × (384 400/6371)^1.5 = 84.3 × 467 ≈ 39 400 min ≈ 27.4 days — the sidereal month.",
  },
  {
    section: "application",
    question: "A GPS satellite orbits at ~26 560 km from Earth's centre with a 12 h period. A satellite orbiting at 4× that radius takes about…",
    options: ["24 h", "48 h", "96 h", "12 h"],
    correct: 2,
    explanation: "T ∝ r^1.5 (Kepler's third law): 4× radius gives 4^1.5 = 8 × 12 h = 96 h.",
  },
  {
    section: "application",
    question: "Earth's escape speed is 11.2 km/s. Compared with the surface circular-orbit speed (7.91 km/s), the ratio is…",
    options: ["√2 ≈ 1.41", "2", "4", "1"],
    correct: 0,
    explanation: "v_escape = √2 × v_circular at the same radius — a universal ratio for any central body.",
  },
  {
    section: "application",
    question: "Mars has about 1/9 Earth's mass and about half its radius. Compared with Earth's 7.91 km/s surface orbit speed, Mars' is…",
    options: ["also 7.91 km/s", "about 3.7 km/s", "about 1.8 km/s", "about 15.8 km/s"],
    correct: 1,
    explanation: "v scales as √(M/r): √((1/9)/(1/2)) = √(2/9) ≈ 0.47, so v ≈ 7.91 × 0.47 ≈ 3.7 km/s.",
  },
  {
    section: "application",
    question: "A satellite at r = 10 000 km from Earth's centre (GM = 3.986×10¹⁴) needs a speed of about…",
    options: ["6.31 km/s", "7.91 km/s", "4.98 km/s", "2.00 km/s"],
    correct: 0,
    explanation: "v = √(3.986×10¹⁴/10⁷) = √(3.986×10⁷) ≈ 6313 m/s ≈ 6.31 km/s.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A satellite in a perfectly circular orbit at constant altitude has…",
    options: ["constant speed but constantly changing velocity direction", "constant velocity", "zero acceleration", "increasing speed"],
    correct: 0,
    explanation: "Speed is fixed, but the direction bends every instant — that acceleration (gravity inward) is what makes it an orbit.",
  },
  {
    section: "analysis",
    question: "Two satellites share the same orbital radius but one is 10× heavier. Their periods are…",
    options: ["identical", "the heavy one 10× slower", "the heavy one 10× faster", "impossible to compare"],
    correct: 0,
    explanation: "Orbital period is mass-independent: T = 2π√(r³/GM_central). Satellite mass cancels — a hallmark of gravitation.",
  },
  {
    section: "analysis",
    question: "A mission raises a satellite from a low orbit to one at 4× the radius. Its orbital speed…",
    options: ["doubles", "halves", "drops to 1/2 (v ∝ 1/√r)", "quadruples"],
    correct: 2,
    explanation: "v ∝ 1/√r: 4× radius → v/2. Higher orbits are slower — but the total energy is still higher.",
  },
  {
    section: "analysis",
    question: "This lab reports 'circular orbit' results. If a satellite arrives at that altitude moving 20% too fast, it will…",
    options: ["settle into a larger circle", "enter an elliptical orbit (or escape, if fast enough)", "spiral down", "stop immediately"],
    correct: 1,
    explanation: "Exact circular speed gives a circle; anything else gives an ellipse (below escape speed) or escape (above) — the circle is a special case.",
  },
  {
    section: "analysis",
    question: "Geostationary TV satellites must all orbit at the SAME altitude. The reason is…",
    options: ["regulation", "only one radius gives a 24 h period with Earth's GM", "fuel efficiency", "they would collide otherwise"],
    correct: 1,
    explanation: "T = 2π√(r³/GM) is a one-to-one map: the 24 h requirement fixes r ≈ 42 164 km from Earth's centre, uniquely.",
  },
];
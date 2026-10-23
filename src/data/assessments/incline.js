// Inclined Plane Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; a = g(sinθ − μk·cosθ), N = mg·cosθ, g = 9.81 m/s².

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The normal force on an object resting on a frictionless incline acts…",
    options: ["vertically upward", "perpendicular to the surface", "along the surface", "horizontally"],
    correct: 1,
    explanation: "A surface can only push perpendicular to itself; the along-surface job is done by friction (if present) and gravity.",
  },
  {
    section: "fundamentals",
    question: "The component of gravity pulling an object down an incline of angle θ is…",
    options: ["mg·cosθ", "mg·sinθ", "mg·tanθ", "mg"],
    correct: 1,
    explanation: "Resolving weight into surface axes: along-slope = mg·sinθ, into-surface = mg·cosθ.",
  },
  {
    section: "fundamentals",
    question: "Kinetic friction acts…",
    options: ["perpendicular to the surfaces", "against the relative sliding motion between surfaces", "in the direction of motion", "only at rest"],
    correct: 1,
    explanation: "Kinetic friction opposes sliding and equals μk·N, independent of speed in this model.",
  },
  {
    section: "fundamentals",
    question: "Static friction differs from kinetic friction because static friction…",
    options: ["is always zero", "adjusts up to a maximum of μs·N to prevent motion", "equals μk·N always", "acts only while sliding"],
    correct: 1,
    explanation: "Static friction is self-adjusting: it matches the applied force up to its ceiling μs·N, then sliding begins.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of the friction coefficient μ is…",
    options: ["newton", "no unit — it is a dimensionless ratio", "kg", "m/s²"],
    correct: 1,
    explanation: "μ = F/N is a ratio of two forces, so it is dimensionless (typically 0 to 1).",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 10 kg block sits on a 30° frictionless incline. The gravity component along the slope is about…",
    options: ["49.1 N", "85.0 N", "98.1 N", "24.3 N"],
    correct: 0,
    explanation: "mg·sin30° = 10 × 9.81 × 0.5 = 49.05 ≈ 49.1 N.",
  },
  {
    section: "application",
    question: "Same block, same incline: the normal force is about…",
    options: ["49.1 N", "85.0 N", "98.1 N", "0 N"],
    correct: 1,
    explanation: "N = mg·cos30° = 10 × 9.81 × 0.866 ≈ 85.0 N — less than the full weight on a slope.",
  },
  {
    section: "application",
    question: "A block slides down a frictionless 30° incline. Its acceleration is…",
    options: ["9.81 m/s²", "4.91 m/s²", "8.50 m/s²", "zero"],
    correct: 1,
    explanation: "a = g·sin30° = 9.81 × 0.5 ≈ 4.91 m/s².",
  },
  {
    section: "application",
    question: "With μk = 0.30 on that 30° incline, the acceleration becomes about…",
    options: ["4.91 m/s²", "2.36 m/s²", "1.62 m/s²", "0 m/s²"],
    correct: 1,
    explanation: "a = g(sin30° − 0.30·cos30°) = 9.81(0.5 − 0.2598) ≈ 2.36 m/s².",
  },
  {
    section: "application",
    question: "A 10 kg block, μk = 0.3, 30° incline: the kinetic friction force is about…",
    options: ["29.4 N", "25.5 N", "49.1 N", "85.0 N"],
    correct: 1,
    explanation: "F = μk·N = 0.30 × 85.0 ≈ 25.5 N, directed up the slope.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double the block's mass on the same incline with the same μk. Its acceleration…",
    options: ["doubles", "halves", "stays the same", "quadruples"],
    correct: 2,
    explanation: "Both the driving force and the friction scale with mass, so mass cancels — the acceleration is unchanged.",
  },
  {
    section: "analysis",
    question: "As you raise the incline angle from 30° toward 90° (same μk), the normal force…",
    options: ["increases", "decreases toward zero", "stays constant", "doubles"],
    correct: 1,
    explanation: "N = mg·cosθ shrinks as θ grows, reaching zero at 90° where the wall supports nothing.",
  },
  {
    section: "analysis",
    question: "A block at rest on a ramp slowly steepens. It starts to slide when…",
    options: ["the angle reaches 45°", "mg·sinθ exceeds the maximum static friction μs·N", "the ramp is vertical", "the block's weight doubles"],
    correct: 1,
    explanation: "Sliding begins when the along-slope weight component beats the static friction ceiling — the “angle of repose”, where tanθ = μs.",
  },
  {
    section: "analysis",
    question: "For a given sliding block, μs is normally…",
    options: ["smaller than μk", "larger or equal to μk — it takes more force to start sliding than to keep sliding", "exactly equal always", "negative"],
    correct: 1,
    explanation: " μs ≥ μk is the rule: the jolt needed to break static friction exceeds the force to maintain sliding.",
  },
  {
    section: "analysis",
    question: "A box slides down a ramp at constant velocity. The best interpretation is…",
    options: ["friction is zero", "kinetic friction exactly balances the gravity component (μk = tanθ)", "gravity is absent", "the box is accelerating downward"],
    correct: 1,
    explanation: "Constant velocity means zero net force: mg·sinθ = μk·mg·cosθ, so μk = tanθ.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Why resolve gravity into components on an incline?",
    options: ["gravity changes on a slope", "the motion is along the surface, so forces are compared along and perpendicular to it", "the normal force requires it by definition", "to keep the units consistent"],
    correct: 1,
    explanation: "Choosing axes along/perpendicular to the slope turns Newton's second law into two independent, simple equations.",
  },
  {
    section: "fundamentals",
    question: "The maximum static friction force on an object pressed with normal force N is…",
    options: ["μk·N", "μs·N", "N", "mg"],
    correct: 1,
    explanation: "Static friction can be anything up to its ceiling μs·N; μk·N applies only once sliding.",
  },
  {
    section: "fundamentals",
    question: "On a frictionless incline, the acceleration down the slope is g·sinθ. At θ = 0° this gives…",
    options: ["g", "zero — the object stays at rest", "undefined", "mg"],
    correct: 1,
    explanation: "On flat ground there is no along-surface gravity component, so nothing accelerates (frictionless or not).",
  },
  {
    section: "fundamentals",
    question: "Friction between two surfaces arises mainly from…",
    options: ["gravity between the objects", "microscopic interlocking and adhesion of surface asperities", "air pressure", "magnetic fields"],
    correct: 1,
    explanation: "At the microscopic scale, roughness interlocking and molecular adhesion resist sliding — idealized here by μ·N.",
  },
  {
    section: "fundamentals",
    question: "The downhill acceleration formula a = g(sinθ − μk·cosθ) is valid only when…",
    options: ["the object is at rest", "the object is already sliding down the plane", "the incline is vertical", "there is no normal force"],
    correct: 1,
    explanation: "Kinetic friction (μk) applies during sliding; a stationary object needs the static analysis instead.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 5 kg block on a 20° incline (frictionless) accelerates at about…",
    options: ["1.71 m/s²", "3.35 m/s²", "4.62 m/s²", "9.81 m/s²"],
    correct: 1,
    explanation: "a = 9.81·sin20° = 9.81 × 0.342 ≈ 3.35 m/s².",
  },
  {
    section: "application",
    question: "A block with μs = 0.50 on a ramp begins to slide at an angle of about…",
    options: ["26.6°", "30°", "45°", "60°"],
    correct: 0,
    explanation: "Angle of repose: tanθ = μs → θ = arctan(0.5) ≈ 26.6°.",
  },
  {
    section: "application",
    question: "A 20 kg crate slides down a 15° ramp with μk = 0.25. Its acceleration is about…",
    options: ["0.17 m/s²", "2.11 m/s²", "2.54 m/s²", "3.81 m/s²"],
    correct: 0,
    explanation: "a = 9.81(sin15° − 0.25·cos15°) = 9.81(0.2588 − 0.2415) ≈ 0.17 m/s² — friction almost balances the downhill pull, so the crate barely accelerates.",
  },
  {
    section: "application",
    question: "Pushing a 10 kg box up a frictionless 30° incline at constant speed requires a force of about…",
    options: ["49.1 N", "85.0 N", "98.1 N", "0 N"],
    correct: 0,
    explanation: "You must exactly cancel the downhill component mg·sin30° ≈ 49.1 N — less than lifting the box vertically.",
  },
  {
    section: "application",
    question: "A 2 kg block on a 45° frictionless incline has a normal force of about…",
    options: ["13.9 N", "19.6 N", "9.81 N", "28.0 N"],
    correct: 0,
    explanation: "N = mg·cos45° = 2 × 9.81 × 0.7071 ≈ 13.9 N.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Raising the incline angle (with μk fixed) makes the block's acceleration…",
    options: ["increase", "decrease", "stay constant", "first increase, then decrease"],
    correct: 0,
    explanation: "sinθ grows and cosθ shrinks, so gravity wins more and friction presses less — acceleration rises toward g.",
  },
  {
    section: "analysis",
    question: "A truck's loose box begins sliding in the cargo bed when the driver brakes hard. The physics reason is…",
    options: ["the box gets heavier", "insufficient static friction to provide the needed deceleration along the bed", "kinetic friction vanishes while braking", "the normal force disappears"],
    correct: 1,
    explanation: "Decelerating the bed requires a horizontal friction force on the box; beyond μs·N, static friction lets go and the box slides.",
  },
  {
    section: "analysis",
    question: "Same ramp, same block, but the ramp is moved to the Moon (g ≈ 1.62 m/s²). The block's sliding acceleration…",
    options: ["stays the same", "shrinks in the same proportion as g", "increases", "becomes exactly zero"],
    correct: 1,
    explanation: "a = g(sinθ − μk·cosθ) scales linearly with g — about 6× smaller on the Moon. The motion is slower but the physics is identical.",
  },
  {
    section: "analysis",
    question: "On a ramp with μk = 0.40, sliding at constant speed happens at an angle of about…",
    options: ["arctan(0.40) ≈ 21.8°", "arcsin(0.40) ≈ 23.6°", "45°", "arccos(0.40) ≈ 66.4°"],
    correct: 0,
    explanation: "Constant speed means mg·sinθ = μk·mg·cosθ → tanθ = μk, so θ = arctan(0.40) ≈ 21.8°.",
  },
  {
    section: "analysis",
    question: "A skier waxes their skis, lowering μk on the same slope. Compared with before, their terminal speed along the slope…",
    options: ["is lower", "is higher — reduced friction leaves more net downhill force", "is unchanged", "becomes zero"],
    correct: 1,
    explanation: "Lower μk reduces the opposing friction term in a = g(sinθ − μk·cosθ), so the skier accelerates more and reaches a higher speed.",
  },
];
// Collisions & Momentum Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; elastic: v1'=((m1−m2)u1+2m2u2)/(m1+m2), inelastic: v=(m1u1+m2u2)/(m1+m2).

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Linear momentum is defined as…",
    options: ["mass × velocity (p = m·v)", "mass × speed²", "force × distance", "½mv²"],
    correct: 0,
    explanation: "Momentum is a vector: p = m·v, in kg·m/s.",
  },
  {
    section: "fundamentals",
    question: "In every collision between an isolated pair of objects, the quantity that is ALWAYS conserved is…",
    options: ["kinetic energy", "momentum", "speed", "temperature"],
    correct: 1,
    explanation: "Internal forces come in equal-opposite pairs, so total momentum never changes — energy is only sometimes preserved.",
  },
  {
    section: "fundamentals",
    question: "An ELASTIC collision is one in which…",
    options: ["the objects stick together", "kinetic energy is also conserved", "momentum is lost", "the objects must have equal masses"],
    correct: 1,
    explanation: "Elastic = momentum AND kinetic energy both conserved; sticking together defines the inelastic case.",
  },
  {
    section: "fundamentals",
    question: "In a perfectly inelastic collision, the two objects…",
    options: ["bounce apart elastically", "stick together and move with one common velocity", "exchange velocities", "stop dead always"],
    correct: 1,
    explanation: "Maximum kinetic energy is lost consistent with momentum conservation, and both share the final velocity.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of momentum is…",
    options: ["N", "kg·m/s", "J", "kg·m/s²"],
    correct: 1,
    explanation: "Mass (kg) times velocity (m/s) — equivalently N·s (impulse).",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 2 kg ball at 5 m/s hits a 4 kg ball at rest head-on (elastic). The 2 kg ball's final velocity is…",
    options: ["−1.67 m/s", "+1.67 m/s", "0 m/s", "−3.33 m/s"],
    correct: 0,
    explanation: "v1' = ((2−4)/(2+4))·5 = (−2/6)·5 ≈ −1.67 m/s — it bounces back.",
  },
  {
    section: "application",
    question: "Same collision: the 4 kg ball's final velocity is…",
    options: ["1.67 m/s", "3.33 m/s", "5.00 m/s", "0 m/s"],
    correct: 1,
    explanation: "v2' = (2m1/(m1+m2))·u1 = (4/6)·5 ≈ 3.33 m/s.",
  },
  {
    section: "application",
    question: "A 2 kg ball at 5 m/s sticks to a 4 kg ball at rest. Their common velocity is…",
    options: ["2.50 m/s", "1.67 m/s", "3.33 m/s", "0.83 m/s"],
    correct: 1,
    explanation: "v = (2×5 + 4×0)/(2+4) = 10/6 ≈ 1.67 m/s.",
  },
  {
    section: "application",
    question: "The initial momentum in that sticking collision is…",
    options: ["10 kg·m/s", "20 kg·m/s", "0 kg·m/s", "30 kg·m/s"],
    correct: 0,
    explanation: "p = m1u1 + m2u2 = 2(5) + 4(0) = 10 kg·m/s — and it stays 10 after (6 kg × 1.67 m/s).",
  },
  {
    section: "application",
    question: "Two equal masses collide elastically; ball A arrives at 4 m/s, ball B at rest. Afterwards…",
    options: ["both move at 2 m/s", "A stops and B moves at 4 m/s", "both bounce back", "A continues at 4 m/s"],
    correct: 1,
    explanation: "Equal masses in a 1-D elastic collision exchange velocities — A stops dead, B carries all the motion.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "In the elastic 2 kg vs 4 kg collision, the initial kinetic energy is 25 J. After the collision it is…",
    options: ["0 J", "25 J — unchanged", "12.5 J", "50 J"],
    correct: 1,
    explanation: "½·2·1.67² + ½·4·3.33² = 2.78 + 22.22 = 25 J: elastic collisions preserve kinetic energy.",
  },
  {
    section: "analysis",
    question: "Two identical cars lock bumpers after a crash (perfectly inelastic). Compared with their combined incoming momentum, the wreckage's momentum is…",
    options: ["less", "greater", "exactly equal", "zero"],
    correct: 2,
    explanation: "Momentum survives every collision — it is kinetic energy that the crumpling converts to heat and deformation.",
  },
  {
    section: "analysis",
    question: "A rocket accelerates forward by ejecting gas backward. This works because…",
    options: ["gas pushes on the air", "momentum conservation: the rocket + exhaust momentum must stay balanced", "the gas has no mass", "gravity assists"],
    correct: 1,
    explanation: "Rearward momentum given to the exhaust requires equal forward momentum for the rocket — even in vacuum.",
  },
  {
    section: "analysis",
    question: "A lump of clay hits a wall and sticks (0 m/s after). Its momentum…",
    options: ["was conserved between clay and wall+Earth", "disappeared", "doubled", "became heat only"],
    correct: 0,
    explanation: "The wall (and Earth) absorbs the recoil momentum imperceptibly — momentum is conserved in the larger system even when it looks 'lost'.",
  },
  {
    section: "analysis",
    question: "You double BOTH masses in a perfectly inelastic collision (same incoming velocities). The kinetic energy converted to heat…",
    options: ["halves", "stays the same", "doubles", "quadruples"],
    correct: 2,
    explanation: "Both the incoming and outgoing kinetic energies scale with mass, so their difference (the loss) also doubles.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The impulse–momentum theorem states that a force applied over time changes momentum by…",
    options: ["F·d", "F·Δt (impulse)", "m·g", "½at²"],
    correct: 1,
    explanation: "Impulse = F·Δt = Δp: the same momentum change can come from a big force briefly or a small force for longer.",
  },
  {
    section: "fundamentals",
    question: "Kinetic energy is conserved in which of these?",
    options: ["a car crash with crumpling", "an ideal rubber-ball bounce off concrete", "any collision at all", "neither"],
    correct: 1,
    explanation: "Hard, springy collisions are (nearly) elastic; crumpling, sticking, and denting all dissipate kinetic energy.",
  },
  {
    section: "fundamentals",
    question: "Momentum is a vector, which means…",
    options: ["only its magnitude matters", "direction matters — opposite velocities carry opposite momentum", "it can be negative energy", "it has no units"],
    correct: 1,
    explanation: "Head-on objects can have zero TOTAL momentum despite large individual momenta.",
  },
  {
    section: "fundamentals",
    question: "A system's momentum can only change when…",
    options: ["it collides internally", "an external net force acts on it", "its energy changes", "it gets hot"],
    correct: 1,
    explanation: "Internal forces cancel pairwise; only outside net force (impulse) alters total momentum.",
  },
  {
    section: "fundamentals",
    question: "In the lab's elastic-collision formula, the coefficient of restitution is…",
    options: ["0", "1", "0.5", "infinite"],
    correct: 1,
    explanation: "Elastic means relative speed of separation equals relative speed of approach: e = 1.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 1500 kg car at 20 m/s rear-ends a stationary 2500 kg truck and they lock together. The wreck slides at…",
    options: ["7.5 m/s", "12.5 m/s", "20 m/s", "5.0 m/s"],
    correct: 0,
    explanation: "v = (1500×20 + 0)/(1500+2500) = 30 000/4000 = 7.5 m/s.",
  },
  {
    section: "application",
    question: "In that crash the kinetic energy before is 300 kJ. After locking together it is…",
    options: ["300 kJ", "112.5 kJ", "450 kJ", "0 kJ"],
    correct: 1,
    explanation: "½·4000·7.5² = 112.5 kJ — about 187.5 kJ (63%) went into crumpling and heat.",
  },
  {
    section: "application",
    question: "A 0.15 kg baseball at 40 m/s is caught and stops in the glove. The impulse delivered to the ball is…",
    options: ["6 kg·m/s backward of motion", "2.7 kg·m/s", "40 kg·m/s", "0 kg·m/s"],
    correct: 0,
    explanation: "Δp = 0 − (0.15×40) = −6 kg·m/s: an impulse of 6 N·s opposite the motion.",
  },
  {
    section: "application",
    question: "A 1 kg ball moving right at 6 m/s elastically hits a 1 kg ball moving left at 2 m/s. Afterwards their velocities are…",
    options: ["both end at 2 m/s right", "the ball moving right ends at 2 m/s left; the ball moving left ends at 6 m/s right — they swap velocities", "both stop", "both continue unchanged"],
    correct: 1,
    explanation: "Equal masses in a 1-D elastic collision exchange velocities exactly — momentum and kinetic energy are both preserved by the swap.",
  },
  {
    section: "application",
    question: "Two skaters (50 kg and 70 kg) at rest push apart. The 50 kg skater moves at 2.8 m/s. The 70 kg skater moves at…",
    options: ["2.0 m/s", "3.92 m/s", "1.4 m/s", "0 m/s"],
    correct: 0,
    explanation: "Zero initial momentum: 50(2.8) = 70(v) → v = 2.0 m/s in the opposite direction.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Why do modern cars have crumple zones?",
    options: ["to conserve kinetic energy", "to lengthen the collision time, reducing the peak force on occupants (F = Δp/Δt)", "to increase momentum", "to make the car lighter"],
    correct: 1,
    explanation: "The occupant's momentum change is fixed; stretching the stopping time divides the impulse over more time and lowers the peak force.",
  },
  {
    section: "analysis",
    question: "A heavy truck and a small car collide. Both feel…",
    options: ["the same magnitude of force and momentum change", "the truck more, because it is heavier", "the car more", "zero force"],
    correct: 0,
    explanation: "Newton's third law: identical forces in magnitude. The lighter car suffers a larger velocity CHANGE because Δv = F·Δt/m.",
  },
  {
    section: "analysis",
    question: "A superball and a clay ball of equal mass hit a wall at the same speed. The wall receives…",
    options: ["more impulse from the clay", "more impulse from the superball (it reverses, so Δp is twice)", "equal impulse from both", "no impulse"],
    correct: 1,
    explanation: "Reversing at speed v changes momentum by 2mv; stopping changes it by mv — the bounce transfers twice the impulse.",
  },
  {
    section: "analysis",
    question: "In a head-on perfectly inelastic crash, the wreck moves in the direction of…",
    options: ["the heavier vehicle", "the vehicle with more momentum (mass × speed)", "always the faster one", "neither — it stops always"],
    correct: 1,
    explanation: "The final velocity follows the TOTAL momentum — mass and speed both matter, not mass alone.",
  },
  {
    section: "analysis",
    question: "Your lab shows kinetic energy lost when two unequal balls stick together. Where did it go?",
    options: ["nowhere — the model is wrong", "into permanent deformation, sound, and heat during the sticking", "into momentum", "into gravitational potential energy"],
    correct: 1,
    explanation: "'Lost' kinetic energy becomes internal energy: denting, heating, and sound — the everyday signature of inelastic collisions.",
  },
];
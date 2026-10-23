// Projectile Motion Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; g = 9.81 m/s², no air resistance, equal launch/landing heights.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "At the very top of its flight, a projectile's vertical velocity component is…",
    options: ["at its maximum", "zero", "negative", "equal to the launch speed"],
    correct: 1,
    explanation: "Gravity decelerates the upward motion until vy = 0 at the peak; the horizontal component keeps its full value there.",
  },
  {
    section: "fundamentals",
    question: "In ideal projectile motion (no air resistance), the horizontal acceleration is…",
    options: ["g, downward", "zero", "g, horizontal", "constant and positive"],
    correct: 1,
    explanation: "With no air resistance, no horizontal force acts, so ax = 0 and the horizontal velocity stays constant.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of the launch angle used in the range equation is…",
    options: ["degrees or radians — any angle unit, inside a trig function", "metres", "seconds", "newtons"],
    correct: 0,
    explanation: "Angles only appear inside sine/cosine, so any consistent angle unit works; the other quantities carry the real units.",
  },
  {
    section: "fundamentals",
    question: "Which quantity is NOT needed to compute the horizontal range of a projectile launched and landing at the same height?",
    options: ["launch speed", "launch angle", "gravitational acceleration", "the projectile's mass"],
    correct: 3,
    explanation: "R = v²sin(2θ)/g contains only speed, angle, and g — mass cancels because gravitational acceleration is mass-independent.",
  },
  {
    section: "fundamentals",
    question: "A projectile's trajectory in ideal (no air resistance) motion is a…",
    options: ["straight line", "circle", "parabola", "sine wave along a flat path"],
    correct: 2,
    explanation: "Constant horizontal velocity plus quadratic vertical drop x ∝ t² traces a parabola.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A ball is launched at 10 m/s at 30° (g = 9.81 m/s²). Its initial horizontal and vertical velocity components are…",
    options: ["vx = 5.00, vy = 8.66 m/s", "vx = 8.66, vy = 5.00 m/s", "vx = 10, vy = 10 m/s", "vx = 0, vy = 10 m/s"],
    correct: 1,
    explanation: "vx = v·cos30° = 10(0.866) = 8.66 m/s; vy = v·sin30° = 10(0.5) = 5.00 m/s.",
  },
  {
    section: "application",
    question: "A projectile is launched at 20 m/s at 45° (g = 9.81 m/s², level ground). Its range is closest to…",
    options: ["20.4 m", "40.8 m", "81.5 m", "10.2 m"],
    correct: 1,
    explanation: "R = v²sin(2θ)/g = 400·sin90°/9.81 = 400/9.81 ≈ 40.8 m.",
  },
  {
    section: "application",
    question: "Same launch: 20 m/s at 45°. The maximum height reached is about…",
    options: ["2.55 m", "5.10 m", "10.19 m", "20.4 m"],
    correct: 2,
    explanation: "H = v²sin²θ/(2g) = 400·(0.5)/19.62 ≈ 10.19 m.",
  },
  {
    section: "application",
    question: "A projectile launched at 10 m/s at 30° stays in the air for about… (g = 9.81 m/s²)",
    options: ["0.51 s", "1.02 s", "1.44 s", "2.04 s"],
    correct: 1,
    explanation: "t = 2v·sinθ/g = 2(10)(0.5)/9.81 ≈ 1.02 s.",
  },
  {
    section: "application",
    question: "At the top of its flight, a projectile launched at 20 m/s at 45° has a speed of…",
    options: ["0 m/s", "about 14.1 m/s", "20 m/s", "about 10.2 m/s"],
    correct: 1,
    explanation: "At the peak vy = 0 but vx = v·cos45° = 20(0.7071) ≈ 14.1 m/s — that is the total speed there.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double the launch speed (same angle, level ground). The range…",
    options: ["doubles", "quadruples", "stays the same", "halves"],
    correct: 1,
    explanation: "R ∝ v², so doubling the launch speed multiplies the range by four.",
  },
  {
    section: "analysis",
    question: "Ignoring air resistance, a launch at 30° and a launch at 60° with the SAME speed have ranges that are…",
    options: ["equal", "the 30° one is larger", "the 60° one is larger", "unrelated"],
    correct: 0,
    explanation: "Complementary angles share the same sin(2θ) value (sin60° = sin120°), so the ranges are identical — only times and heights differ.",
  },
  {
    section: "analysis",
    question: "Two identical balls are released at the same moment: one dropped from rest, one launched horizontally from the same height. They land…",
    options: ["the dropped ball first", "the launched ball first", "at the same time", "it depends on the launch speed"],
    correct: 2,
    explanation: "Vertical motion is independent of horizontal motion: both start with vy = 0 and fall the same height with the same g.",
  },
  {
    section: "analysis",
    question: "This simulation neglects air resistance. For a real cricket ball hit at high speed, the measured range would be…",
    options: ["larger than the ideal prediction", "smaller than the ideal prediction", "identical", "sometimes larger, sometimes smaller"],
    correct: 1,
    explanation: "Drag opposes the motion, shortening real trajectories below the ideal parabola — the ideal model is an upper bound.",
  },
  {
    section: "analysis",
    question: "A firefighting jet and a garden hose leave the same nozzle at the same angle but the jet is much faster. The jet's water lands…",
    options: ["at the same spot", "farther away, growing quickly with speed", "farther away, in exact proportion to speed", "closer"],
    correct: 1,
    explanation: "Range ∝ v²: doubling the exit speed quadruples the reach, which is why pressure matters so much for firefighting.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "The two independent parts of ideal projectile motion are…",
    options: ["speed and direction", "constant-velocity horizontal motion and free-fall vertical motion", "up and down halves of the parabola", "mass and weight"],
    correct: 1,
    explanation: "ax = 0 (uniform horizontal motion) and ay = −g (accelerated vertical motion); the parabola is their combination.",
  },
  {
    section: "fundamentals",
    question: "The vertical velocity component of a projectile 1 s after launch (upward, g = 9.81 m/s²) has changed by…",
    options: ["+9.81 m/s", "−9.81 m/s", "0 m/s", "−4.90 m/s"],
    correct: 1,
    explanation: "Gravity reduces vy by 9.81 m/s every second of flight.",
  },
  {
    section: "fundamentals",
    question: "The maximum range on level ground (no air resistance) occurs at a launch angle of…",
    options: ["30°", "45°", "60°", "90°"],
    correct: 1,
    explanation: "sin(2θ) peaks at θ = 45°, where the speed is split equally between horizontal carry and height.",
  },
  {
    section: "fundamentals",
    question: "The time a projectile takes to return to its launch height depends on…",
    options: ["its mass", "only the vertical velocity component (and g)", "only the horizontal component", "the range"],
    correct: 1,
    explanation: "t = 2vy/g — the vertical motion alone sets the flight time.",
  },
  {
    section: "fundamentals",
    question: "In the range equation R = v²·sin(2θ)/g, the launch and landing heights are assumed to be…",
    options: ["different", "equal", "irrelevant to the equation's validity", "measured from sea level"],
    correct: 1,
    explanation: "That formula is only valid for level ground; unequal heights need the full kinematic equations instead.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A stone is thrown at 15 m/s at 40° (g = 9.81 m/s²). Its time of flight on level ground is closest to…",
    options: ["1.31 s", "1.96 s", "2.29 s", "0.98 s"],
    correct: 1,
    explanation: "vy = 15·sin40° = 9.64 m/s; t = 2(9.64)/9.81 ≈ 1.96 s.",
  },
  {
    section: "application",
    question: "Using that 15 m/s, 40° throw, the horizontal range is about…",
    options: ["14.5 m", "22.6 m", "29.4 m", "44.6 m"],
    correct: 1,
    explanation: "R = vx·t = 15·cos40° × 1.96 = 11.49 × 1.96 ≈ 22.5 m (or R = v²sin80°/g = 225·0.985/9.81 ≈ 22.6 m).",
  },
  {
    section: "application",
    question: "A dart is thrown horizontally at 12 m/s from a 1.25 m high table (g = 9.81 m/s²). It lands about…",
    options: ["3.0 m from the table", "6.0 m from the table", "1.2 m from the table", "12 m from the table"],
    correct: 0,
    explanation: "Fall time: t = √(2h/g) = √(2.5/9.81) ≈ 0.505 s; range = 12 × 0.505 ≈ 6.05 m.",
  },
  {
    section: "application",
    question: "A projectile's launch velocity components are vx = 6 m/s and vy = 8 m/s. Its launch speed and angle are…",
    options: ["10 m/s at 53°", "14 m/s at 37°", "10 m/s at 37°", "8 m/s at 45°"],
    correct: 0,
    explanation: "v = √(36+64) = 10 m/s; θ = arctan(8/6) ≈ 53° above horizontal.",
  },
  {
    section: "application",
    question: "At half of its total flight time (level launch), a projectile has risen…",
    options: ["half of its maximum height", "its maximum height", "a quarter of the maximum height", "zero height"],
    correct: 1,
    explanation: "The vertical velocity reaches zero exactly at half the flight time, which is the peak of the parabola.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "On the Moon (g ≈ 1.62 m/s²) versus Earth, the same launch speed and angle produces…",
    options: ["a shorter range", "a range about 6× longer", "the same range", "a flatter but equally long trajectory"],
    correct: 1,
    explanation: "R ∝ 1/g: 9.81/1.62 ≈ 6, so lunar trajectories carry about six times farther — Apollo astronauts demonstrated this.",
  },
  {
    section: "analysis",
    question: "A ball thrown at 45° reaches a wall 20 m away while still rising. Compared with its 45° peak height on open ground, at the wall it is…",
    options: ["higher than the peak", "lower than the peak but still rising", "exactly at the peak", "descending"],
    correct: 1,
    explanation: "The peak occurs halfway along the range; before that point the ball is still rising below its maximum height.",
  },
  {
    section: "analysis",
    question: "A stunt driver launches off a ramp at 30 m/s at 15°. If the ramp angle is doubled to 30° (same speed), the flight time…",
    options: ["doubles exactly", "also doubles, because t ∝ sinθ", "quadruples", "stays the same"],
    correct: 1,
    explanation: "t = 2v·sinθ/g; sin30° = 2·sin15°, so doubling sinθ doubles the air time.",
  },
  {
    section: "analysis",
    question: "Which change improves a shot-putter's distance the most (ideal model)?",
    options: ["doubling the release height", "increasing release speed by 10%", "releasing at 30° instead of 40°", "using a heavier shot"],
    correct: 1,
    explanation: "Range grows with v² — a 10% speed gain adds about 21% range, while modest angle corrections matter less and mass not at all.",
  },
  {
    section: "analysis",
    question: "Your simulation gives a range of 40.8 m for 20 m/s at 45°. A student measures 34 m in a real test with the same launch. The best conclusion is…",
    options: ["the simulation is broken", "air resistance and launch imperfections explain a real result below the ideal model", "g must be larger in real life", "the ball must have been spinning too fast"],
    correct: 1,
    explanation: "The ideal model is an upper bound; drag, spin, and release-height variation all shorten real ranges — that discrepancy is a lesson about model limitations, not a bug.",
  },
];
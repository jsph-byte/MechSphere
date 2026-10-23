// Work, Energy & Power Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; W = F·d·cosθ, KE = ½mv², PE = mgh, P = W/t, g = 9.81 m/s².

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "In physics, work is done when…",
    options: ["you get tired", "a force moves its point of application through a distance", "you hold a heavy box still", "a force exists at all"],
    correct: 1,
    explanation: "W = F·d·cosθ needs displacement; holding still (d = 0) does zero work, however tiring.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of work and energy is the…",
    options: ["watt", "joule", "newton", "pascal"],
    correct: 1,
    explanation: "1 J = 1 N·m. The watt is power (J/s).",
  },
  {
    section: "fundamentals",
    question: "Kinetic energy is given by…",
    options: ["m·v", "½·m·v²", "m·g·h", "F·d"],
    correct: 1,
    explanation: "KE = ½mv² — the energy of motion, always positive.",
  },
  {
    section: "fundamentals",
    question: "The θ in W = F·d·cosθ is the angle between…",
    options: ["the force and the displacement", "the force and the vertical", "the displacement and the ground", "two forces"],
    correct: 0,
    explanation: "Only the force component along the motion (F·cosθ) does work; a perpendicular force does none.",
  },
  {
    section: "fundamentals",
    question: "Power is…",
    options: ["stored energy", "the rate of doing work (P = W/t)", "the same as force", "energy lost to friction"],
    correct: 1,
    explanation: "Power measures how FAST energy is transferred: 1 watt = 1 joule per second.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "You pull a sled with 100 N along 5 m of ground, at 60° to the motion. The work done is…",
    options: ["500 J", "250 J", "433 J", "0 J"],
    correct: 1,
    explanation: "W = 100 × 5 × cos60° = 100 × 5 × 0.5 = 250 J.",
  },
  {
    section: "application",
    question: "A 2 kg ball rolls at 5 m/s. Its kinetic energy is…",
    options: ["10 J", "25 J", "50 J", "5 J"],
    correct: 1,
    explanation: "KE = ½ × 2 × 25 = 25 J.",
  },
  {
    section: "application",
    question: "Lifting a 20 kg box 2 m at constant speed requires about… (g = 9.81 m/s²)",
    options: ["39.2 J", "392 J", "1962 J", "40 J"],
    correct: 1,
    explanation: "W = mgh = 20 × 9.81 × 2 ≈ 392 J.",
  },
  {
    section: "application",
    question: "A motor does 3000 J of work in 10 s. Its power is…",
    options: ["30 W", "300 W", "3000 W", "30 000 W"],
    correct: 1,
    explanation: "P = W/t = 3000/10 = 300 W.",
  },
  {
    section: "application",
    question: "A 60 kg hiker climbs a 50 m hill. The gravitational potential energy gained is about…",
    options: ["29.4 kJ", "2.94 kJ", "294 kJ", "600 J"],
    correct: 0,
    explanation: "PE = mgh = 60 × 9.81 × 50 = 29 430 J ≈ 29.4 kJ.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You double a car's speed. Its kinetic energy…",
    options: ["doubles", "quadruples", "halves", "stays the same"],
    correct: 1,
    explanation: "KE ∝ v²: twice the speed means four times the energy — and roughly four times the braking distance.",
  },
  {
    section: "analysis",
    question: "A worker carries a heavy box horizontally at constant speed. The work done BY the worker on the box (ideal model) is…",
    options: ["large", "zero — the force on the box is vertical while it moves horizontally", "equal to the box's weight × the distance", "negative"],
    correct: 1,
    explanation: "The supporting force is perpendicular to the motion: cos90° = 0, so the carry itself does no work (starting and stopping aside).",
  },
  {
    section: "analysis",
    question: "A ball is dropped from 2 m. Ignoring air resistance, its speed at the ground is about…",
    options: ["4.4 m/s", "6.3 m/s", "9.8 m/s", "19.6 m/s"],
    correct: 1,
    explanation: "mgh = ½mv² → v = √(2gh) = √(2×9.81×2) ≈ 6.26 m/s — mass cancels.",
  },
  {
    section: "analysis",
    question: "Two machines lift identical loads to the same height; machine A does it in half the time. Compared with B, A…",
    options: ["does more work", "has twice the power with the same work", "does less work", "wastes all energy"],
    correct: 1,
    explanation: "Same height and load = same work; power = work/time, so finishing in half the time means double the power.",
  },
  {
    section: "analysis",
    question: "The work–energy theorem says the net work done on an object equals…",
    options: ["its total energy", "its change in kinetic energy", "its potential energy", "zero always"],
    correct: 1,
    explanation: "W_net = ΔKE: net force over a distance is exactly what speeds things up or slows them down.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Work done by a force can be negative when…",
    options: ["the force is weak", "the force component opposes the displacement (90° < θ < 270°)", "the distance is zero", "the object is heavy"],
    correct: 1,
    explanation: "cosθ < 0 makes W negative — friction braking a slide does negative work, removing kinetic energy.",
  },
  {
    section: "fundamentals",
    question: "Gravitational potential energy m·g·h is measured relative to…",
    options: ["sea level always", "any chosen reference height — only CHANGES in PE matter", "the centre of Earth", "the object's centre"],
    correct: 1,
    explanation: "h is arbitrary up to an offset; physics only ever uses ΔPE between two states.",
  },
  {
    section: "fundamentals",
    question: "1 horsepower equals about…",
    options: ["746 W", "1000 W", "746 kW", "550 kW"],
    correct: 0,
    explanation: "1 hp = 745.7 W — the historical output of a draft horse over a working day.",
  },
  {
    section: "fundamentals",
    question: "Mechanical energy is the sum of…",
    options: ["heat and light", "kinetic and potential energy", "work and power", "force and momentum"],
    correct: 1,
    explanation: "KE + PE is the mechanical energy that conservation laws track in ideal systems.",
  },
  {
    section: "fundamentals",
    question: "The dimensions of power are…",
    options: ["[M·L²·T⁻³]", "[M·L²·T⁻²]", "[M·L·T⁻²]", "[M·L·T⁻³]"],
    correct: 0,
    explanation: "Power = energy/time: [M·L²·T⁻²]/[T] = [M·L²·T⁻³] — checkable in the Equation Checker.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 1200 kg car accelerates from rest to 20 m/s. The net work done on it is…",
    options: ["120 kJ", "240 kJ", "480 kJ", "24 kJ"],
    correct: 1,
    explanation: "W = ΔKE = ½ × 1200 × 400 = 240 000 J = 240 kJ.",
  },
  {
    section: "application",
    question: "Pushing a lawnmower with 150 N at 30° below horizontal over 10 m does…",
    options: ["1500 J", "1300 J", "750 J", "0 J"],
    correct: 1,
    explanation: "W = 150 × 10 × cos30° ≈ 150 × 10 × 0.866 ≈ 1299 J ≈ 1300 J.",
  },
  {
    section: "application",
    question: "A 70 kg runner develops steady mechanical power of about 300 W sprinting. Over 60 s the work done is…",
    options: ["5 J", "18 kJ", "300 kJ", "1.8 kJ"],
    correct: 1,
    explanation: "W = P·t = 300 × 60 = 18 000 J = 18 kJ.",
  },
  {
    section: "application",
    question: "A pump lifts 500 kg of water up 10 m every minute. Its power output is about…",
    options: ["491 W", "818 W", "49 050 W", "9810 W"],
    correct: 1,
    explanation: "W = mgh = 500 × 9.81 × 10 = 49 050 J per 60 s → P = 49 050/60 ≈ 818 W.",
  },
  {
    section: "application",
    question: "A 0.5 kg ball thrown at 12 m/s has kinetic energy…",
    options: ["36 J", "72 J", "6 J", "144 J"],
    correct: 0,
    explanation: "KE = ½ × 0.5 × 144 = 36 J.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "A pendulum's total mechanical energy (ideal)…",
    options: ["peaks at the bottom", "stays constant, swapping KE and PE", "grows each swing", "peaks at the extremes"],
    correct: 1,
    explanation: "Without losses, KE + PE is conserved: max PE at the extremes, max KE at the bottom, same total throughout.",
  },
  {
    section: "analysis",
    question: "A crate is pushed at constant velocity across a rough floor. The net work on it is…",
    options: ["positive and large", "zero — pushing work is cancelled by friction work", "negative", "equal to its KE"],
    correct: 1,
    explanation: "Constant speed means ΔKE = 0, so by the work–energy theorem the net work is exactly zero: your positive work all becomes heat.",
  },
  {
    section: "analysis",
    question: "Two identical parcels are dropped, one on the Moon (g ≈ 1.62) and one on Earth, from the same height. At impact…",
    options: ["Earth's has more KE", "both have equal KE — the same mgh converts to KE", "the Moon's has more KE", "neither gains KE"],
    correct: 0,
    explanation: "PE = mgh is 6× larger on Earth, so the impact KE differs by the same factor — the Moon parcel lands gently.",
  },
  {
    section: "analysis",
    question: "A diesel engine and an electric motor deliver the same power. In 1 hour of identical load each does…",
    options: ["different work depending on fuel", "the same work — equal power × equal time", "the electric one more work", "the diesel one more work"],
    correct: 1,
    explanation: "Work = P·t: matching power and duration means identical energy delivered, regardless of the source.",
  },
  {
    section: "analysis",
    question: "A rollercoaster cart starts 30 m high (frictionless track). Its speed at the bottom is about…",
    options: ["24.3 m/s", "15.3 m/s", "9.9 m/s", "30 m/s"],
    correct: 0,
    explanation: "v = √(2gh) = √(2 × 9.81 × 30) ≈ √588.6 ≈ 24.3 m/s — again mass-independent.",
  },
];
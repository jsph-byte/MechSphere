// Torque & Levers Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; τ = r·F·sinθ, lever MA = effort arm / load arm, g = 9.81 m/s².

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Torque is the rotational analogue of…",
    options: ["mass", "force", "energy", "power"],
    correct: 1,
    explanation: "Force pushes translation; torque turns things — same idea, one dimension up.",
  },
  {
    section: "fundamentals",
    question: "The formula for torque about a pivot is…",
    options: ["τ = r·F·sinθ", "τ = F/r", "τ = m·g·h", "τ = ½mr²"],
    correct: 0,
    explanation: "Only the force component perpendicular to the lever arm turns the object: τ = rF·sinθ.",
  },
  {
    section: "fundamentals",
    question: "The SI unit of torque is…",
    options: ["J (joule)", "N·m (newton-metre)", "N/m", "W"],
    correct: 1,
    explanation: "Torque is force × distance: N·m. Though dimensionally like joules, torque is never expressed in J.",
  },
  {
    section: "fundamentals",
    question: "A force applied perpendicular to the lever arm produces…",
    options: ["zero torque", "maximum torque (sin90° = 1)", "negative torque", "half torque"],
    correct: 1,
    explanation: "Perpendicular push is fully effective; pushing along the arm (θ = 0) does nothing at all.",
  },
  {
    section: "fundamentals",
    question: "A body is in rotational equilibrium when…",
    options: ["it is at rest", "the net torque on it is zero", "its torque is maximum", "it spins uniformly fast"],
    correct: 1,
    explanation: "Balanced clockwise and counterclockwise torques — the lever rule: F₁d₁ = F₂d₂.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A 80 N force pushes a door perpendicular to its face 0.25 m from the hinge. The torque is…",
    options: ["20 N·m", "8 N·m", "320 N·m", "5 N·m"],
    correct: 0,
    explanation: "τ = rF·sin90° = 0.25 × 80 = 20 N·m.",
  },
  {
    section: "application",
    question: "A lever has a 1.5 m effort arm and a 0.5 m load arm. Its mechanical advantage is…",
    options: ["3", "0.33", "1", "9"],
    correct: 0,
    explanation: "MA = effort arm / load arm = 1.5/0.5 = 3 — one newton of effort balances three newtons of load.",
  },
  {
    section: "application",
    question: "Lifting a 60 kg load (≈ 589 N) with that lever takes an effort force of about…",
    options: ["196 N", "589 N", "1767 N", "295 N"],
    correct: 0,
    explanation: "Effort = load/MA = 589/3 ≈ 196 N — about 20 kg of push for a 60 kg load.",
  },
  {
    section: "application",
    question: "A 100 N weight sits 0.5 m left of a pivot. Balancing it needs a force of 50 N at…",
    options: ["0.25 m on the other side", "1.0 m on the other side", "0.5 m on the same side", "anywhere"],
    correct: 1,
    explanation: "Balance torques: 100 × 0.5 = 50 × d → d = 1.0 m.",
  },
  {
    section: "application",
    question: "A wrench handle is 0.30 m and you push 150 N perpendicular to it. The torque on the bolt is…",
    options: ["45 N·m", "500 N·m", "20 N·m", "0.45 N·m"],
    correct: 0,
    explanation: "τ = 0.30 × 150 = 45 N·m.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Why are door handles placed far from the hinges?",
    options: ["tradition only", "the larger lever arm means the same push produces much more torque (τ = rF)", "to balance the door's weight", "hinges are weak"],
    correct: 1,
    explanation: "Torque grows with r: pushing at the far edge multiplies your turning effect compared with near the hinge.",
  },
  {
    section: "analysis",
    question: "You cannot loosen a rusty bolt with a short wrench. Lengthening the wrench helps because…",
    options: ["the wrench gets heavier", "the same force gains a longer lever arm, multiplying torque", "the bolt gets tired", "friction decreases with length"],
    correct: 1,
    explanation: "τ = rF: doubling r doubles the torque from the same effort.",
  },
  {
    section: "analysis",
    question: "With a nutcracker (lever), doubling the effort arm length while keeping the load arm fixed…",
    options: ["halves the force you need", "doubles the mechanical advantage", "halves the mechanical advantage", "changes nothing"],
    correct: 1,
    explanation: "MA = effort arm/load arm: lengthening the numerator doubles the force multiplication.",
  },
  {
    section: "analysis",
    question: "A mechanic pushes ON the rotation axis of a wheel (aiming right at the axle). The torque produced is…",
    options: ["maximum", "zero — sin0° = 0, force through the pivot turns nothing", "negative", "half"],
    correct: 1,
    explanation: "A force whose line of action passes through the pivot has zero lever arm and zero torque.",
  },
  {
    section: "analysis",
    question: "A see-saw balances with two children of different weights. The heavier child must sit…",
    options: ["farther from the pivot", "closer to the pivot so their torque matches the lighter child's", "anywhere", "on the pivot"],
    correct: 1,
    explanation: "Equal torques need equal products of weight and distance: a bigger weight needs a smaller distance.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Torque's dependence on sinθ means that for a FIXED force, torque is greatest at…",
    options: ["0° (force along the arm)", "90° (force perpendicular to the arm)", "180°", "45° only"],
    correct: 1,
    explanation: "sin90° = 1 is the maximum; this is why pedals, wrenches, and cranks are designed for perpendicular push.",
  },
  {
    section: "fundamentals",
    question: "Mechanical advantage of a lever is defined as…",
    options: ["output force / input force", "input distance / output distance", "load mass", "the lever's weight"],
    correct: 0,
    explanation: "MA = F_load/F_effort = effort arm/load arm for an ideal lever.",
  },
  {
    section: "fundamentals",
    question: "The centre of mass of a uniform rod is at…",
    options: ["one end", "its midpoint", "a third along", "unknown without mass"],
    correct: 1,
    explanation: "Uniform density places the COM at the geometric centre — where a pivot balances it.",
  },
  {
    section: "fundamentals",
    question: "A couple (two equal, opposite, offset forces) produces…",
    options: ["zero net force but a pure torque", "zero torque", "pure translation", "negative energy"],
    correct: 0,
    explanation: "Forces cancel; the offset torques add — a 'free' torque with no net push (how hands turn a steering wheel).",
  },
  {
    section: "fundamentals",
    question: "Rotational equilibrium for a stationary object requires…",
    options: ["only zero net force", "both zero net force and zero net torque", "only zero net torque", "nonzero torque"],
    correct: 1,
    explanation: "No push AND no twist: both conditions must hold for complete static equilibrium.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A crowbar lifts a 900 N rock with a 1.8 m effort arm and a 0.2 m load arm. The needed effort is about…",
    options: ["100 N", "900 N", "8100 N", "20 N"],
    correct: 0,
    explanation: "MA = 1.8/0.2 = 9; effort = 900/9 = 100 N.",
  },
  {
    section: "application",
    question: "A bicycle crank is 0.17 m long; a rider pushes with 250 N perpendicular. The torque at the axle is…",
    options: ["42.5 N·m", "250 N·m", "14.7 N·m", "425 N·m"],
    correct: 0,
    explanation: "τ = 0.17 × 250 = 42.5 N·m — a typical hard-pedalling torque.",
  },
  {
    section: "application",
    question: "A uniform 4 m plank weighing 200 N pivots at one end. Holding it horizontal at the far end needs about…",
    options: ["200 N", "100 N", "400 N", "50 N"],
    correct: 1,
    explanation: "The plank's weight acts at its centre (2 m); your hand at 4 m: 200×2 = F×4 → F = 100 N.",
  },
  {
    section: "application",
    question: "A wheel nut needs 60 N·m. Your wrench is 0.3 m. The perpendicular force required is…",
    options: ["180 N", "200 N", "18 N", "60 N"],
    correct: 1,
    explanation: "F = τ/r = 60/0.3 = 200 N (a strong push — or use a longer wrench).",
  },
  {
    section: "application",
    question: "A wheelbarrow's load sits 0.5 m from the wheel axle; your hands are 1.5 m from it. The MA is…",
    options: ["3", "0.33", "2", "1.5"],
    correct: 0,
    explanation: "MA = 1.5/0.5 = 3 — the wheelbarrow triples your lifting force.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Moving a see-saw's pivot toward the heavier child…",
    options: ["helps the lighter child lift them (longer relative arm for the light side)", "helps the heavier child", "changes nothing", "breaks equilibrium permanently"],
    correct: 0,
    explanation: "Shrinking the heavy side's arm reduces its torque — the classic lever trick for mismatched weights.",
  },
  {
    section: "analysis",
    question: "A lever with MA = 4 requires one-quarter the effort force. The price paid is…",
    options: ["nothing — levers create energy", "the effort end must move 4× farther than the load", "the load becomes heavier", "torque is lost"],
    correct: 1,
    explanation: "Energy is conserved: force gain comes from distance loss — the golden rule of machines (work in ≥ work out).",
  },
  {
    section: "analysis",
    question: "A bench vise and a long wrench both fight a stubborn bolt. A cheater pipe slipped over the wrench handle works because…",
    options: ["it cools the bolt", "it extends the lever arm r, multiplying the same hand force's torque", "it adds weight", "bolts sense tools"],
    correct: 1,
    explanation: "τ = rF: more r, more torque — though it can exceed the bolt's design torque and snap it.",
  },
  {
    section: "analysis",
    question: "Your lab shows a lever balanced when F₁d₁ = F₂d₂. You double BOTH forces keeping distances fixed. The beam…",
    options: ["tips toward the larger original side", "stays balanced — both torques scaled equally", "becomes unstable always", "rotates clockwise always"],
    correct: 1,
    explanation: "Scaling every force by the same factor scales both torques equally — equilibrium survives proportional changes.",
  },
  {
    section: "analysis",
    question: "Why does a fishing rod (a class-3 lever) sacrifice force for distance at the tip?",
    options: ["design error", "the short effort arm near the hand trades force for large, fast motion of the tip — ideal for casting", "rods cannot rotate", "fish are light"],
    correct: 1,
    explanation: "Not every lever wants force multiplication: whips, rods, and your forearm accept MA < 1 to get speed and range.",
  },
];
// Sequential prediction-test question banks — the labs' pre-tests & post-tests.
// Questions presented one at a time (PredictFirst): answer → next question.
// Labs with full 15-question banks (buoyancy, bernoulli, conduction) reuse the
// hand-verified banks in src/data/assessments/*.js instead of this file.
// Values hand-verified against the stated model equations.

export const PREDICTIONS = {
  projectile: {
    pre: [
      {
        question: "At which launch angle is the range maximized (level ground, no air resistance)?",
        options: ["30°", "45°", "60°", "90°"],
        correctIndex: 1,
        explanation: "R = v₀²·sin(2θ)/g is largest when sin(2θ) = 1, i.e. θ = 45°.",
      },
      {
        question: "Two identical launches at 30° and 60°: how do their ranges compare?",
        options: ["The 30° launch goes farther", "The 60° launch goes farther", "They are equal", "It depends on the mass"],
        correctIndex: 2,
        explanation: "Complementary angles give the same range: sin(60°) = sin(120°). The 60° shot flies higher but just as far.",
      },
    ],
    post: [
      {
        question: "At the highest point of its flight, the projectile's vertical velocity is…",
        options: ["0 m/s", "At its maximum", "Equal to v₀", "Half of v₀"],
        correctIndex: 0,
        explanation: "Gravity keeps slowing the rise until vy = 0 at the peak — then the fall begins.",
      },
      {
        question: "Launch at 20 m/s, 30°. Flight time ≈ ? (g = 9.81 m/s²)",
        options: ["1.0 s", "2.0 s", "4.1 s", "0.5 s"],
        correctIndex: 1,
        explanation: "t = 2·v₀·sinθ/g = 2 × 20 × 0.5 / 9.81 ≈ 2.04 s.",
      },
      {
        question: "Doubling the launch speed multiplies the maximum height by…",
        options: ["2", "4", "8", "No change"],
        correctIndex: 1,
        explanation: "H = v₀²·sin²θ/(2g) scales with v₀² — doubling v₀ gives 4× the height.",
      },
      {
        question: "Throughout the flight (no air resistance), what stays constant?",
        options: ["Total speed", "Vertical velocity", "Horizontal velocity", "Kinetic energy"],
        correctIndex: 2,
        explanation: "Gravity acts only vertically, so vx = v₀·cosθ never changes; vy changes by g every second.",
      },
    ],
  },

  pendulum: {
    pre: [
      {
        question: "Does the period of a small-angle pendulum depend on the bob's mass?",
        options: ["Yes — heavier bobs swing slower", "Yes — heavier bobs swing faster", "No", "Only at very large angles"],
        correctIndex: 2,
        explanation: "T = 2π·√(L/g) contains no mass: gravity's pull and the bob's inertia both scale with m and cancel.",
      },
      {
        question: "To double a pendulum's period, its length must be multiplied by…",
        options: ["2", "4", "8", "The length has no effect"],
        correctIndex: 1,
        explanation: "T ∝ √L, so L × 4 gives T × 2 — why pendulum clocks have long, adjustable rods.",
      },
    ],
    post: [
      {
        question: "Where in the swing is the bob's speed maximum?",
        options: ["At the release point", "At the bottom of the swing", "At the highest point of the other side", "Everywhere — it is constant"],
        correctIndex: 1,
        explanation: "Height trades for speed: maximum kinetic energy (and speed) occurs at the lowest point.",
      },
      {
        question: "L = 0.25 m, g = 9.81 m/s². Period ≈ ?",
        options: ["0.5 s", "1.0 s", "2.0 s", "4.0 s"],
        correctIndex: 1,
        explanation: "T = 2π·√(0.25/9.81) ≈ 1.00 s — one of nature's tidy coincidences.",
      },
      {
        question: "Released from 60°, the small-angle formula T = 2π√(L/g)…",
        options: ["Overestimates the true period", "Is exact", "Underestimates the true period", "Doubles"],
        correctIndex: 2,
        explanation: "The restoring force grows less than proportionally at large angles; the true period is up to ≈18% longer at 60°.",
      },
      {
        question: "The same pendulum swings on the Moon (g ≈ 1.62 m/s²). Compared to Earth its period is…",
        options: ["Shorter", "The same", "Longer", "Zero"],
        correctIndex: 2,
        explanation: "T ∝ 1/√g — weaker gravity restores the bob more slowly, about 2.5× the Earth period.",
      },
    ],
  },

  incline: {
    pre: [
      {
        question: "On a frictionless 30° incline, the acceleration down the plane is ≈ ?",
        options: ["9.81 m/s²", "4.9 m/s²", "8.5 m/s²", "0 m/s²"],
        correctIndex: 1,
        explanation: "a = g·sinθ = 9.81 × 0.5 ≈ 4.9 m/s².",
      },
      {
        question: "As you steepen the ramp, the normal force N = mg·cosθ…",
        options: ["Increases", "Stays the same", "Decreases", "Varies randomly"],
        correctIndex: 2,
        explanation: "cos θ shrinks as θ grows, pressing the block less into the surface.",
      },
    ],
    post: [
      {
        question: "The frictionless acceleration g·sinθ depends on mass…",
        options: ["Directly — heavier blocks slide faster", "Not at all", "Inversely — heavier is slower", "Only while sliding"],
        correctIndex: 1,
        explanation: "Both driving force (mg sinθ) and inertia (m) scale with mass, which then cancels.",
      },
      {
        question: "With μk = 0.5, the angle where friction exactly balances the pull of gravity is ≈ ?",
        options: ["26.6°", "30°", "45°", "60°"],
        correctIndex: 0,
        explanation: "Sliding threshold: tanθ = μk → θ = arctan(0.5) ≈ 26.6°.",
      },
      {
        question: "On a steeper slope, the kinetic friction magnitude μk·N…",
        options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
        correctIndex: 1,
        explanation: "N = mg cosθ shrinks with θ, so friction fades on steeper ramps.",
      },
      {
        question: "A 2 kg and a 10 kg block (same μk, same angle) slide down. Their accelerations are…",
        options: ["The 10 kg block's is larger", "The 2 kg block's is larger", "Equal", "The 10 kg block does not move"],
        correctIndex: 2,
        explanation: "a = g(sinθ − μk·cosθ) — no mass anywhere in the expression.",
      },
    ],
  },

  gas: {
    pre: [
      {
        question: "A sealed rigid tank of gas is heated from 300 K to 600 K. Its pressure…",
        options: ["Halves", "Doubles", "Quadruples", "Is unchanged"],
        correctIndex: 1,
        explanation: "At constant V: P ∝ T(absolute), so doubling kelvin temperature doubles pressure.",
      },
      {
        question: "Which temperature scale must be used in gas-law calculations?",
        options: ["Celsius", "Kelvin", "Fahrenheit", "Any scale works"],
        correctIndex: 1,
        explanation: "Only absolute temperature makes P ∝ T meaningful — 0 K is true zero thermal energy.",
      },
    ],
    post: [
      {
        question: "Doubling the absolute temperature at constant pressure multiplies the volume by…",
        options: ["0.5", "1", "2", "4"],
        correctIndex: 2,
        explanation: "Charles's law: V ∝ T at fixed P, so 300 K → 600 K doubles the volume.",
      },
      {
        question: "Gas at 200 kPa and 300 K in a rigid tank is warmed to 450 K. New pressure ≈ ?",
        options: ["150 kPa", "200 kPa", "300 kPa", "450 kPa"],
        correctIndex: 2,
        explanation: "P₂ = P₁·T₂/T₁ = 200 × 450/300 = 300 kPa.",
      },
      {
        question: "A gas is compressed isothermally to one-third of its volume. Its pressure…",
        options: ["Triples", "Drops to one-third", "Becomes nine times", "Is unchanged"],
        correctIndex: 0,
        explanation: "Boyle's law: P ∝ 1/V at constant T — V ÷ 3 gives P × 3.",
      },
      {
        question: "In PV/T = constant, the constant is proportional to…",
        options: ["The container's shape", "The amount of gas", "The temperature", "The pressure"],
        correctIndex: 1,
        explanation: "PV/T = nR for a fixed amount of gas — more moles, bigger constant.",
      },
    ],
  },

  heat: {
    pre: [
      {
        question: "Which needs more heat to warm by 1 K: 1 kg of water or 1 kg of copper?",
        options: ["Water", "Copper", "Both the same", "It cannot be determined"],
        correctIndex: 0,
        explanation: "Water's specific heat (4186 J/(kg·K)) is ~11× copper's (385) — water is the thermal bank.",
      },
      {
        question: "ΔT = Q/(mc). Doubling the mass while keeping Q and c fixed…",
        options: ["Halves ΔT", "Doubles ΔT", "Leaves ΔT unchanged", "Quarters ΔT"],
        correctIndex: 0,
        explanation: "More mass means more material to share the same energy — half the temperature rise each.",
      },
    ],
    post: [
      {
        question: "How much heat warms 2 kg of water by 5 K? (c = 4186 J/(kg·K))",
        options: ["4.19 kJ", "41.9 kJ", "419 kJ", "8.37 kJ"],
        correctIndex: 1,
        explanation: "Q = mcΔT = 2 × 4186 × 5 = 41 860 J ≈ 41.9 kJ.",
      },
      {
        question: "Equal masses, different c, same heat input: the material with smaller c…",
        options: ["Warms more", "Warms less", "Reaches the same temperature", "Stores more heat"],
        correctIndex: 0,
        explanation: "ΔT = Q/(mc) — small c means little 'thermal appetite', so the same joules buy more kelvin.",
      },
      {
        question: "Water's high specific heat makes coastal climates…",
        options: ["More extreme", "Milder", "Unaffected", "Drier"],
        correctIndex: 1,
        explanation: "The sea warms and cools slowly, damping the temperature swings of nearby land.",
      },
      {
        question: "A 0.5 kg copper block (c = 385 J/(kg·K)) receives 3850 J. Its temperature rises by…",
        options: ["10 K", "20 K", "40 K", "2 K"],
        correctIndex: 1,
        explanation: "ΔT = Q/(mc) = 3850/(0.5 × 385) = 20 K.",
      },
    ],
  },

  collisions: {
    pre: [
      {
        question: "In an elastic collision, what is conserved?",
        options: ["Momentum only", "Kinetic energy only", "Both momentum and kinetic energy", "Neither"],
        correctIndex: 2,
        explanation: "Elastic means no energy is lost to heat or deformation: both p and KE are conserved.",
      },
      {
        question: "Two identical carts, one moving, one at rest, collide elastically. Afterwards…",
        options: ["Both move at half the original speed", "The moving cart stops and the other takes the full speed", "They bounce back the way they came", "They stick together"],
        correctIndex: 1,
        explanation: "Equal masses exchanging velocities: the moving cart hands all its speed to the resting one.",
      },
      {
        question: "In a perfectly inelastic collision the two objects…",
        options: ["Bounce off elastically", "Stick together and move as one", "Keep their separate speeds", "Lose all momentum"],
        correctIndex: 1,
        explanation: "They deform and lock together, sharing one final velocity — momentum conserved, KE not.",
      },
      {
        question: "Momentum is conserved in every collision because…",
        options: ["Friction acts equally", "Internal forces come in equal-and-opposite pairs (Newton's 3rd law)", "Energy never disappears", "Mass is constant"],
        correctIndex: 1,
        explanation: "Whatever one object gains the other loses — the internal forces cancel exactly.",
      },
    ],
    post: [
      {
        question: "A 2 kg cart at 3 m/s hits a stationary 2 kg cart and they stick together. Final speed = ?",
        options: ["0.75 m/s", "1.5 m/s", "3 m/s", "6 m/s"],
        correctIndex: 1,
        explanation: "v = (m₁u₁)/(m₁+m₂) = 6/4 = 1.5 m/s.",
      },
      {
        question: "In that same sticking collision, the kinetic energy…",
        options: ["Is conserved", "Is created", "Decreases (becomes heat and deformation)", "Increases"],
        correctIndex: 2,
        explanation: "KE drops from 9 J to 4.5 J — the missing 4.5 J went into crushing and warming the carts.",
      },
      {
        question: "A heavy truck elastically hits a stationary light car. The car comes away…",
        options: ["Slower than the truck's original speed", "Faster than the truck's original speed", "At exactly the truck's original speed", "Not moving"],
        correctIndex: 1,
        explanation: "With m_truck ≫ m_car, v_car' ≈ 2·u_truck — the light object gets kicked out at nearly double.",
      },
      {
        question: "Why are car crumple zones designed to make collisions inelastic?",
        options: ["To conserve kinetic energy", "To extend the impact time and absorb energy", "To increase rebound speed", "To protect the momentum"],
        correctIndex: 1,
        explanation: "A longer, deforming collision spreads the energy absorption — lower forces on passengers.",
      },
    ],
  },

  orbit: {
    pre: [
      {
        question: "Compared to a low orbit, a higher circular orbit has…",
        options: ["Higher speed, shorter period", "Lower speed, longer period", "The same speed", "Zero speed"],
        correctIndex: 1,
        explanation: "v = √(GM/r) falls with r while T = 2π√(r³/GM) grows — higher orbits are slower.",
      },
      {
        question: "The orbital speed of a satellite depends on…",
        options: ["The satellite's mass", "The central body's mass and the orbit radius", "The launch speed", "The satellite's shape"],
        correctIndex: 1,
        explanation: "Only GM and r appear in v = √(GM/r) — a feather and a hammer orbit identically.",
      },
      {
        question: "The ISS circles Earth about every 90 minutes. A satellite far higher than the ISS…",
        options: ["Orbits faster", "Has a shorter period", "Orbits slower with a much longer period", "Must fall down"],
        correctIndex: 2,
        explanation: "Kepler's third law: T grows with r^1.5 — geostationary satellites need a full 24 h.",
      },
      {
        question: "Astronauts float inside the ISS because…",
        options: ["There is no gravity there", "They are too far from Earth", "They and the station are in continuous free fall together", "The air pressure cancels gravity"],
        correctIndex: 2,
        explanation: "Gravity is still ~90% of surface strength; everything falls together, so nothing pushes on anything.",
      },
    ],
    post: [
      {
        question: "A geostationary communication satellite has a period of about…",
        options: ["90 minutes", "24 hours", "1 year", "12 hours"],
        correctIndex: 1,
        explanation: "It must turn with the Earth: one orbit per sidereal day ≈ 23 h 56 min.",
      },
      {
        question: "Doubling the orbital radius multiplies the period by about…",
        options: ["2", "2.8", "4", "8"],
        correctIndex: 1,
        explanation: "T ∝ r^1.5, and 2^1.5 ≈ 2.83.",
      },
      {
        question: "At ~400 km altitude, orbital speed is ≈ 7.67 km/s. At the surface (hypothetical orbit) it would be…",
        options: ["Smaller, ≈ 7.9 km/s", "Larger, ≈ 7.9 km/s", "The same", "Zero"],
        correctIndex: 1,
        explanation: "Lower r → higher speed: v = √(GM/r) gives ≈7.91 km/s at Earth's radius.",
      },
      {
        question: "If Earth's mass were somehow doubled, orbital speeds at the same radius would…",
        options: ["Decrease", "Increase by √2", "Double", "Be unchanged"],
        correctIndex: 1,
        explanation: "v = √(GM/r): doubling M under the square root multiplies v by √2 ≈ 1.41.",
      },
    ],
  },

  work: {
    pre: [
      {
        question: "The work done by a force pointing 90° to the displacement is…",
        options: ["Maximum", "Half of F·d", "Zero", "Negative"],
        correctIndex: 2,
        explanation: "W = F·d·cosθ and cos 90° = 0 — a perpendicular force does no work along the motion.",
      },
      {
        question: "Pulling a crate with the rope at angle θ above the horizontal, the work your pull does is…",
        options: ["F·d at full value", "Reduced by the factor cosθ", "Increased by sinθ", "Zero for any angle"],
        correctIndex: 1,
        explanation: "Only the horizontal component F·cosθ moves the crate along its path.",
      },
      {
        question: "Kinetic energy of mass m at speed v is…",
        options: ["m·v", "½·m·v²", "m·v²", "2·m·v"],
        correctIndex: 1,
        explanation: "KE = ½mv² — energy, unlike momentum, grows with the square of speed.",
      },
      {
        question: "Power is…",
        options: ["Stored energy", "A force applied over distance", "The rate of doing work (J/s)", "Momentum per second"],
        correctIndex: 2,
        explanation: "P = W/t — one watt is one joule per second.",
      },
    ],
    post: [
      {
        question: "Pushing a box 10 m with a horizontal 50 N force does W = ?",
        options: ["5 J", "50 J", "500 J", "5000 J"],
        correctIndex: 2,
        explanation: "W = F·d·cos0° = 50 × 10 = 500 J.",
      },
      {
        question: "The same 50 N force at 60° above the horizontal over the same 10 m does W ≈ ?",
        options: ["250 J", "433 J", "500 J", "100 J"],
        correctIndex: 0,
        explanation: "W = 50 × 10 × cos60° = 500 × 0.5 = 250 J.",
      },
      {
        question: "100 J of net work on a 2 kg object starting at rest gives it a speed of…",
        options: ["5 m/s", "7.1 m/s", "10 m/s", "50 m/s"],
        correctIndex: 2,
        explanation: "v = √(2W/m) = √(100) = 10 m/s.",
      },
      {
        question: "Climbing stairs, you do ~600 J per second of work against gravity. Your mechanical power is…",
        options: ["600 W", "600 J", "600 N", "Depends on your weight only"],
        correctIndex: 0,
        explanation: "Power is work per time: 600 J each second = 600 W — a strong human sprint-cycling briefly.",
      },
    ],
  },

  spring: {
    pre: [
      {
        question: "Within its linear range, doubling a spring's stretch doubles the…",
        options: ["Force", "Stored energy", "Both force and energy", "Stiffness"],
        correctIndex: 0,
        explanation: "Hooke's law F = k·x is linear — but energy U = ½kx² is not.",
      },
      {
        question: "The energy stored in a stretched spring is…",
        options: ["k·x", "½·k·x²", "k·x²", "2·k·x"],
        correctIndex: 1,
        explanation: "U = ½kx² — the average force (0 to kx) times the distance.",
      },
      {
        question: "A stiffer spring (larger k) with the same mass oscillates…",
        options: ["Slower", "Faster", "At the same rate", "Not at all"],
        correctIndex: 1,
        explanation: "f = (1/2π)·√(k/m) — stiffness restores faster, so frequency rises.",
      },
      {
        question: "The work you do stretching a spring goes into…",
        options: ["The spring's elastic potential energy", "Permanent deformation", "Heat only", "Nothing — it is lost"],
        correctIndex: 0,
        explanation: "Ideal springs store the work elastically and can return it on release.",
      },
    ],
    post: [
      {
        question: "k = 200 N/m stretched 0.1 m: the force is…",
        options: ["2 N", "20 N", "200 N", "2000 N"],
        correctIndex: 1,
        explanation: "F = k·x = 200 × 0.1 = 20 N.",
      },
      {
        question: "With k = 200 N/m and x = 0.1 m, the stored energy is…",
        options: ["0.5 J", "1 J", "2 J", "20 J"],
        correctIndex: 1,
        explanation: "U = ½kx² = ½ × 200 × 0.01 = 1 J.",
      },
      {
        question: "Doubling the stretch multiplies the stored energy by…",
        options: ["2", "4", "8", "No change"],
        correctIndex: 1,
        explanation: "U ∝ x² — double stretch, four times the stored energy.",
      },
      {
        question: "Doubling the mass hanging on the same spring makes the oscillation frequency…",
        options: ["Twice as high", "Half as high", "Lower by a factor of √2", "Unchanged"],
        correctIndex: 2,
        explanation: "f ∝ √(k/m): m × 2 gives f ÷ √2 ≈ f × 0.71.",
      },
    ],
  },

  torque: {
    pre: [
      {
        question: "Torque is the rotational analogue of…",
        options: ["Mass", "Force", "Energy", "Momentum"],
        correctIndex: 1,
        explanation: "Torque plays the role force plays in straight-line motion: it causes rotational acceleration.",
      },
      {
        question: "τ = r·F·sinθ is largest when the force is applied…",
        options: ["Along the lever arm", "Perpendicular to the lever arm", "At 30° to the arm", "At 180° to the arm"],
        correctIndex: 1,
        explanation: "sin 90° = 1 — push perpendicular to the wrench, not along it.",
      },
      {
        question: "Using a longer wrench handle on a stuck bolt, for the same hand force…",
        options: ["Torque increases", "Torque decreases", "Nothing changes", "The bolt rounds off"],
        correctIndex: 0,
        explanation: "τ = r·F: more lever arm, more twist for the same push.",
      },
      {
        question: "A seesaw balances when…",
        options: ["The two masses are equal", "The two torques are equal", "The two distances are equal", "The heights are equal"],
        correctIndex: 1,
        explanation: "Rotation stops when clockwise torque = counterclockwise torque: m₁·d₁ = m₂·d₂.",
      },
    ],
    post: [
      {
        question: "r = 0.25 m, F = 80 N, θ = 90°: the torque is…",
        options: ["8 N·m", "20 N·m", "80 N·m", "320 N·m"],
        correctIndex: 1,
        explanation: "τ = 0.25 × 80 × sin 90° = 20 N·m.",
      },
      {
        question: "A 30 kg child sits 2 m from the pivot. Where must a 60 kg adult sit to balance?",
        options: ["0.5 m", "1 m", "2 m", "4 m"],
        correctIndex: 1,
        explanation: "30 × 2 = 60 × d → d = 1 m. Twice the mass, half the arm.",
      },
      {
        question: "Pushing a door near its hinge instead of its handle…",
        options: ["Makes it easier to open", "Makes it harder — less torque for the same force", "Has no effect", "Makes it swing faster"],
        correctIndex: 1,
        explanation: "Small lever arm r means small torque — door handles live far from hinges for a reason.",
      },
      {
        question: "An engine delivers 100 N·m at 20 rad/s. Its power is…",
        options: ["5 W", "120 W", "2000 W", "200 W"],
        correctIndex: 2,
        explanation: "P = τ·ω = 100 × 20 = 2000 W.",
      },
    ],
  },

  hydrostatic: {
    pre: [
      {
        question: "Gauge pressure at depth h in a fluid equals…",
        options: ["ρ·h", "ρ·g·h", "g·h only", "ρ·g"],
        correctIndex: 1,
        explanation: "The weight of the fluid column above: P = ρgh. Density matters — mercury stacks pressure fastest.",
      },
      {
        question: "Going deeper in the same fluid, pressure…",
        options: ["Grows quadratically", "Grows linearly with depth", "Grows exponentially", "Stays constant"],
        correctIndex: 1,
        explanation: "P = ρgh is a straight line in h — every added metre adds the same ρg.",
      },
      {
        question: "At a given depth, fluid pressure acts…",
        options: ["Only downward", "Only upward", "Equally in all directions", "Only sideways"],
        correctIndex: 2,
        explanation: "Pascal's law — a fluid at rest pushes equally in every direction at one depth.",
      },
      {
        question: "Sea water vs fresh water at the same depth: pressure is…",
        options: ["Slightly higher in sea water", "Slightly lower in sea water", "Identical", "Zero"],
        correctIndex: 0,
        explanation: "Sea water is denser (≈1025 kg/m³), so the same column weighs more.",
      },
    ],
    post: [
      {
        question: "Gauge pressure 10 m below the surface of fresh water ≈ ?",
        options: ["9.8 kPa", "98 kPa", "981 kPa", "0.98 kPa"],
        correctIndex: 1,
        explanation: "ρgh = 1000 × 9.81 × 10 ≈ 98 kPa — roughly one extra atmosphere every 10 m.",
      },
      {
        question: "A dam wall needs its strongest reinforcement…",
        options: ["At the top", "At the bottom", "At the middle", "Equally everywhere"],
        correctIndex: 1,
        explanation: "Pressure grows with depth, so the base carries the most force — dam cross-sections are thick at the bottom.",
      },
      {
        question: "At 20 m depth, the gauge pressure compared to 10 m is…",
        options: ["Half", "Double", "Four times", "The same"],
        correctIndex: 1,
        explanation: "P ∝ h: twice the depth, twice the gauge pressure.",
      },
      {
        question: "A diver's watch is rated to survive gauge pressure. The dominant reason deep water crushes it is…",
        options: ["Water temperature", "The weight of the water column (ρgh)", "Currents", "Salt content"],
        correctIndex: 1,
        explanation: "Only depth and density set the pressure — temperature and salinity barely matter.",
      },
    ],
  },

  venturi: {
    pre: [
      {
        question: "In a Venturi tube's narrow throat, compared to the wide section, the fluid speed is…",
        options: ["Higher", "Lower", "The same", "Reversed"],
        correctIndex: 0,
        explanation: "Continuity: the same flow rate squeezed through less area must speed up.",
      },
      {
        question: "The continuity equation for incompressible steady flow states…",
        options: ["P₁ = P₂", "A₁·v₁ = A₂·v₂", "Energy is conserved", "ρ₁ = ρ₂"],
        correctIndex: 1,
        explanation: "Volume in equals volume out at every instant — A·v (the flow rate) is constant.",
      },
      {
        question: "In the throat, the static pressure is…",
        options: ["Higher than the wide section", "Lower than the wide section", "The same", "Zero"],
        correctIndex: 1,
        explanation: "Bernoulli: the speed-up is paid for by a pressure drop — that's the Venturi effect.",
      },
      {
        question: "A manometer connected across a Venturi meter measures…",
        options: ["The flow rate directly", "The pressure difference between sections", "The fluid's density", "The viscosity"],
        correctIndex: 1,
        explanation: "It reads ΔP; the flow rate is then inferred from ΔP = ½ρ(v₂² − v₁²).",
      },
    ],
    post: [
      {
        question: "Halving the throat diameter at the same flow rate multiplies the throat speed by…",
        options: ["2", "4", "8", "16"],
        correctIndex: 1,
        explanation: "A ∝ d², so halving d quarters the area — v must quadruple.",
      },
      {
        question: "The manometer level difference Δh relates to the pressure drop by…",
        options: ["ΔP = ρ·g·Δh", "ΔP = Δh/ρ", "ΔP = Δh·g", "ΔP = g/Δh"],
        correctIndex: 0,
        explanation: "A static liquid column of height Δh produces exactly ρgΔh of pressure — a pressure gauge made of fluid.",
      },
      {
        question: "Venturi meters, carburettors and atomizers all exploit the fact that…",
        options: ["Fast flow means low pressure, sucking fluid in", "Narrow pipes heat up", "Pressure always rises with speed", "Liquids are compressible"],
        correctIndex: 0,
        explanation: "The low-pressure throat draws other fluids into the stream — spray bottles work this way.",
      },
      {
        question: "If the throat pressure drops below the liquid's vapour pressure, the fluid…",
        options: ["Freezes", "Cavitates — vapour bubbles form and collapse", "Becomes denser", "Flows faster without limit"],
        correctIndex: 1,
        explanation: "Cavitation: the liquid boils cold, and collapsing bubbles can pit metal — pumps avoid it carefully.",
      },
    ],
  },

  expansion: {
    pre: [
      {
        question: "Heating a metal rod makes it…",
        options: ["Longer", "Shorter", "Heavier but the same length", "Nothing measurable"],
        correctIndex: 0,
        explanation: "Atomic spacing grows with temperature — the rod lengthens (and widens slightly) by ΔL = αL₀ΔT.",
      },
      {
        question: "Two rods of the same material, one twice as long, heated by the same ΔT: the longer one expands…",
        options: ["Less", "The same amount", "About twice as much", "Not at all"],
        correctIndex: 2,
        explanation: "ΔL = αL₀ΔT is proportional to length — twice the rod, twice the growth.",
      },
      {
        question: "Which of these expands the most for the same temperature rise?",
        options: ["Aluminium", "Steel", "Glass", "Invar"],
        correctIndex: 0,
        explanation: "Aluminium's α ≈ 23×10⁻⁶/K is roughly double steel's and 20× invar's.",
      },
      {
        question: "Bridges have expansion joints because…",
        options: ["They look better", "Summer expansion would otherwise buckle the deck", "They reduce weight", "They hide the bolts"],
        correctIndex: 1,
        explanation: "A long steel span grows centimetres between winter and summer — the joints give it room.",
      },
    ],
    post: [
      {
        question: "A 2 m aluminium bar (α = 23×10⁻⁶/K) heated by 50 K grows by about…",
        options: ["0.023 mm", "2.3 mm", "23 mm", "230 mm"],
        correctIndex: 1,
        explanation: "ΔL = αL₀ΔT = 23×10⁻⁶ × 2 × 50 = 2.3×10⁻³ m = 2.3 mm.",
      },
      {
        question: "For isotropic solids, the volume expansion coefficient is roughly…",
        options: ["Equal to α", "2× α", "3× α", "9× α"],
        correctIndex: 2,
        explanation: "Length grows in all three directions: β ≈ 3α.",
      },
      {
        question: "A bimetallic strip bends when heated because…",
        options: ["Both metals expand equally", "The two metals expand by different amounts", "Metals get softer", "Gravity acts more on one side"],
        correctIndex: 1,
        explanation: "Different α values make one side longer — the strip curves toward the slow-expander. Thermostats use this.",
      },
      {
        question: "Invar is used in precision instruments and surveyor's tapes because it…",
        options: ["Is very hard", "Expands almost nothing with temperature", "Conducts heat perfectly", "Is very light"],
        correctIndex: 1,
        explanation: "Its α ≈ 1.2×10⁻⁶/K is tiny, so its length barely changes with the weather.",
      },
    ],
  },

  heatcompare: {
    pre: [
      {
        question: "Which of these conducts heat fastest?",
        options: ["Copper", "Window glass", "Wood", "Foam"],
        correctIndex: 0,
        explanation: "Copper's k ≈ 401 W/(m·K) is 500× glass's and over 10 000× foam's.",
      },
      {
        question: "Fourier's law says q ∝ k. Copper vs foam, same geometry: the rate ratio is about…",
        options: ["100×", "1 000×", "Over 10 000×", "10×"],
        correctIndex: 2,
        explanation: "401 / 0.035 ≈ 11 500 — one number to remember about insulation.",
      },
      {
        question: "Insulating materials have low k because they…",
        options: ["Are heavy", "Trap still air, a poor conductor", "Are always white", "Are very dense"],
        correctIndex: 1,
        explanation: "Foam, wool and down all work the same way: immobilized air blocks conduction.",
      },
      {
        question: "A metal railing feels colder than a wooden bench on the same cold day because…",
        options: ["Metal is actually colder", "Metal pulls heat from your hand much faster", "Wood generates heat", "Metal reflects light"],
        correctIndex: 1,
        explanation: "Same temperature, different k: metal drains heat from your skin faster, so it feels colder.",
      },
    ],
    post: [
      {
        question: "Same geometry and ΔT: doubling the conductivity k…",
        options: ["Halves q", "Doubles q", "Quadruples q", "Does nothing"],
        correctIndex: 1,
        explanation: "q = kAΔT/L is directly proportional to k.",
      },
      {
        question: "Which wall material keeps a house warmest in winter?",
        options: ["Copper sheet", "Aluminium panel", "Steel plate", "Polystyrene foam"],
        correctIndex: 3,
        explanation: "The lowest k wins for insulation — foam, not metal.",
      },
      {
        question: "Doubling a bar's cross-sectional area A…",
        options: ["Halves the heat rate", "Doubles the heat rate", "Changes nothing", "Quarters it"],
        correctIndex: 1,
        explanation: "Twice the area is twice the parallel conduction paths: q ∝ A.",
      },
      {
        question: "Thermal resistance R = L/(kA) behaves like resistance in Ohm's law. Two insulating layers stacked…",
        options: ["Halve the total resistance", "Add their resistances", "Share the load equally", "Cancel out"],
        correctIndex: 1,
        explanation: "Resistances in series add: R_total = R₁ + R₂ — double glazing is two panes for good reason.",
      },
    ],
  },

  gasprocess: {
    pre: [
      {
        question: "In an isothermal process, the product P·V is…",
        options: ["Constant", "Increasing", "Decreasing", "Zero"],
        correctIndex: 0,
        explanation: "Boyle's law holds all along an isotherm: P₁V₁ = P₂V₂.",
      },
      {
        question: "During isobaric heating, the gas…",
        options: ["Shrinks", "Expands (V ∝ T)", "Stays the same volume", "Condenses"],
        correctIndex: 1,
        explanation: "Charles's law: at constant pressure the volume tracks the absolute temperature.",
      },
      {
        question: "Heating a gas in a sealed rigid container (isochoric), the pressure…",
        options: ["Falls", "Rises proportionally to T", "Stays constant", "Disappears"],
        correctIndex: 1,
        explanation: "Gay-Lussac's law: P ∝ T when the molecules have nowhere to expand.",
      },
      {
        question: "An adiabatic process is one with…",
        options: ["Constant temperature", "No heat exchanged with the surroundings", "Constant pressure", "Very slow motion"],
        correctIndex: 1,
        explanation: "Fast or insulated: Q = 0, so work done changes the gas's internal energy — and its temperature.",
      },
    ],
    post: [
      {
        question: "In an adiabatic compression, the gas temperature…",
        options: ["Falls", "Rises", "Stays constant", "Depends on the gas amount"],
        correctIndex: 1,
        explanation: "Your work goes straight into internal energy — a bike pump warms for this reason.",
      },
      {
        question: "An isothermal expansion does work while the gas temperature stays fixed. The energy comes from…",
        options: ["The gas's internal energy", "Heat absorbed from the surroundings", "Nothing — it is free", "Gravity"],
        correctIndex: 1,
        explanation: "Q = W: the gas banks heat from a reservoir to pay for the work it does.",
      },
      {
        question: "Which process does zero boundary work?",
        options: ["Isobaric", "Isochoric", "Isothermal", "Adiabatic"],
        correctIndex: 1,
        explanation: "W = P·ΔV and ΔV = 0 in a sealed rigid vessel.",
      },
      {
        question: "Compressing air adiabatically from 1 L to 0.1 L (γ = 1.4) makes the pressure…",
        options: ["10× larger", "About 25× larger", "Smaller", "Unchanged"],
        correctIndex: 1,
        explanation: "P₂ = P₁(V₁/V₂)^γ = 10^1.4 ≈ 25× — adiabatic curves are steeper than isotherms.",
      },
    ],
  },

  ohm: {
    pre: [
      {
        question: "Ohm's law states V = ?",
        options: ["I/R", "I·R", "I²·R", "V/I"],
        correctIndex: 1,
        explanation: "Voltage = current × resistance — the workhorse relation of circuit analysis.",
      },
      {
        question: "Two resistors in series give a total resistance of…",
        options: ["R₁ + R₂", "R₁·R₂/(R₁+R₂)", "The smaller one", "The larger one"],
        correctIndex: 0,
        explanation: "Series: the same current fights both resistances, so they add.",
      },
      {
        question: "Two resistors in parallel give a total resistance that is…",
        options: ["Greater than either", "Less than the smaller one", "Their sum", "Their average"],
        correctIndex: 1,
        explanation: "Parallel adds conductance paths — current has more ways through, so total resistance drops.",
      },
      {
        question: "Power dissipated by a resistor equals…",
        options: ["V/I", "V·I (and I²R)", "I·R", "V²·R"],
        correctIndex: 1,
        explanation: "P = V·I = I²R = V²/R — three forms of the same physics.",
      },
    ],
    post: [
      {
        question: "12 V across a 4 Ω resistor drives a current of…",
        options: ["2 A", "3 A", "6 A", "48 A"],
        correctIndex: 1,
        explanation: "I = V/R = 12/4 = 3 A.",
      },
      {
        question: "Keeping the voltage fixed, doubling the resistance…",
        options: ["Doubles the current", "Halves the current", "Quadruples it", "Changes nothing"],
        correctIndex: 1,
        explanation: "I = V/R — current and resistance are inversely related.",
      },
      {
        question: "Two 6 Ω resistors in parallel measure…",
        options: ["12 Ω", "6 Ω", "3 Ω", "0 Ω"],
        correctIndex: 2,
        explanation: "R = (6 × 6)/(6 + 6) = 3 Ω — parallel halves equal resistors.",
      },
      {
        question: "A 12 V battery drives 0.5 A through a lamp. The lamp dissipates…",
        options: ["6 W", "24 W", "12 W", "0.5 W"],
        correctIndex: 0,
        explanation: "P = V·I = 12 × 0.5 = 6 W.",
      },
    ],
  },

  electricpower: {
    pre: [
      {
        question: "A 230 V appliance draws 2 A. Its power is…",
        options: ["46 W", "115 W", "460 W", "2300 W"],
        correctIndex: 2,
        explanation: "P = V·I = 230 × 2 = 460 W.",
      },
      {
        question: "A kilowatt-hour (kWh) is a unit of…",
        options: ["Power", "Energy", "Current", "Voltage"],
        correctIndex: 1,
        explanation: "Power × time = energy — your electricity bill sells joules in kWh blocks.",
      },
      {
        question: "1 kWh equals about…",
        options: ["3.6 MJ", "3.6 kJ", "360 kJ", "36 MJ"],
        correctIndex: 0,
        explanation: "1000 W × 3600 s = 3.6×10⁶ J = 3.6 MJ.",
      },
      {
        question: "Electricity meters measure…",
        options: ["Current only", "Energy consumed (kWh)", "Voltage only", "Resistance"],
        correctIndex: 1,
        explanation: "They integrate power over time — the kWh you are billed for.",
      },
    ],
    post: [
      {
        question: "A 100 W bulb left on 10 hours consumes…",
        options: ["0.1 kWh", "1 kWh", "10 kWh", "100 kWh"],
        correctIndex: 1,
        explanation: "0.1 kW × 10 h = 1 kWh.",
      },
      {
        question: "Doubling the voltage across a fixed resistance multiplies the power by…",
        options: ["2", "4", "8", "No change"],
        correctIndex: 1,
        explanation: "P = V²/R — the V is squared, so 2V means 4P. Doubling I at fixed V only doubles P.",
      },
      {
        question: "A 1.5 kW air conditioner runs 8 hours. Energy used = ?",
        options: ["1.5 kWh", "12 kWh", "120 kWh", "5.3 kWh"],
        correctIndex: 1,
        explanation: "1.5 kW × 8 h = 12 kWh.",
      },
      {
        question: "Swapping a 60 W bulb for a 6 W LED, used 5 hours a day, saves per day…",
        options: ["0.027 kWh", "0.27 kWh", "2.7 kWh", "27 kWh"],
        correctIndex: 1,
        explanation: "54 W × 5 h = 270 Wh = 0.27 kWh every day — about 100 kWh a year.",
      },
    ],
  },
};
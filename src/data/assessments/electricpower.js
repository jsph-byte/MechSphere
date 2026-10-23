// Electrical Power & Energy Lab — pre-test & post-test banks.
// Section layout: Q1–5 fundamentals, Q6–10 application, Q11–15 prediction & analysis.
// Hand-verified values; P = V·I, E = P·t (kWh), cost = E × rate.

export const preTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Electrical power is given by…",
    options: ["P = V·I", "P = V/I", "P = I/V", "P = V + I"],
    correct: 0,
    explanation: "Watts = volts × amperes: the rate at which the appliance converts electrical energy.",
  },
  {
    section: "fundamentals",
    question: "The kilowatt-hour (kWh) is a unit of…",
    options: ["power", "energy", "current", "voltage"],
    correct: 1,
    explanation: "1 kWh = 1000 W × 3600 s = 3.6 MJ — energy, despite the 'watt' in its name.",
  },
  {
    section: "fundamentals",
    question: "Instantaneous power differs from energy consumed because power…",
    options: ["is the total used", "is the RATE of use — energy = power × time", "ignores voltage", "applies only to batteries"],
    correct: 1,
    explanation: "A 2000 W kettle is powerful but brief; a 10 W LED is weak but tireless. The bill counts energy.",
  },
  {
    section: "fundamentals",
    question: "In the formula E = P·t, doubling the running time…",
    options: ["halves the energy", "doubles the energy", "quadruples it", "does nothing"],
    correct: 1,
    explanation: "Energy accumulates linearly with time at constant power — every hour costs the same kWh.",
  },
  {
    section: "fundamentals",
    question: "Which appliance label shows POWER rather than energy?",
    options: ["a 2000 W rating on a kettle", "a 900 kWh yearly estimate on a fridge", "a 45 kWh battery", "a monthly bill total"],
    correct: 0,
    explanation: "The 'W' on a nameplate is the instantaneous draw; kWh figures are energy over a period.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "A device draws 2 A at 230 V. Its power is…",
    options: ["46 W", "460 W", "4600 W", "115 W"],
    correct: 1,
    explanation: "P = 230 × 2 = 460 W.",
  },
  {
    section: "application",
    question: "That 460 W device runs 8 hours a day. It consumes…",
    options: ["3.68 kWh", "36.8 kWh", "0.368 kWh", "368 kWh"],
    correct: 0,
    explanation: "E = 0.46 kW × 8 h = 3.68 kWh.",
  },
  {
    section: "application",
    question: "At a rate of 12 per kWh, those 3.68 kWh cost…",
    options: ["30.67", "44.16", "3.07", "441.6"],
    correct: 1,
    explanation: "cost = 3.68 × 12 = 44.16.",
  },
  {
    section: "application",
    question: "A 2000 W kettle runs 6 minutes. The energy used is…",
    options: ["0.2 kWh", "2.0 kWh", "12 kWh", "0.02 kWh"],
    correct: 0,
    explanation: "E = 2 kW × 0.1 h = 0.2 kWh — powerful but brief.",
  },
  {
    section: "application",
    question: "A 10 W LED bulb runs 20 hours. Its energy use is…",
    options: ["0.2 kWh — the same as that kettle run", "2.0 kWh", "0.02 kWh", "200 kWh"],
    correct: 0,
    explanation: "E = 0.01 kW × 20 h = 0.2 kWh: weak-but-tireless equals strong-but-brief.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "You halve the current through a device at the same voltage. Its power…",
    options: ["halves", "doubles", "stays the same", "quadruples"],
    correct: 0,
    explanation: "P = VI is linear in current: half the amps, half the watts.",
  },
  {
    section: "analysis",
    question: "The lab assumes constant power draw. A real refrigerator…",
    options: ["matches that exactly", "cycles its compressor on and off — the lab's flat 24 h run overstates or misstates its duty", "uses zero power", "gets more efficient with time"],
    correct: 1,
    explanation: "Thermostats make real appliances duty-cycle; average power is what matters — the lab's stated assumption is a simplification.",
  },
  {
    section: "analysis",
    question: "Doubling the voltage on a fixed resistance (e.g., a heater element)…",
    options: ["doubles power", "quadruples power — P = V²/R", "halves power", "leaves power unchanged"],
    correct: 1,
    explanation: "Both current AND voltage double, so P = V²/R grows fourfold — why connecting a 120 V heater to 240 V destroys it.",
  },
  {
    section: "analysis",
    question: "An air conditioner (1.5 kW) and a laptop (50 W) run all day. Which dominates the energy bill?",
    options: ["the laptop", "the air conditioner — 12 kWh vs 0.4 kWh for 8 h", "they are equal", "neither counts"],
    correct: 1,
    explanation: "E_ac = 1.5 × 8 = 12 kWh; E_laptop = 0.05 × 24 = 1.2 kWh (even running all day) — power dominates the bill.",
  },
  {
    section: "analysis",
    question: "To cut a device's daily energy by half you can…",
    options: ["halve its power or halve its running time (or any split)", "only halve the time", "only halve the power", "nothing works"],
    correct: 0,
    explanation: "E = P·t is a simple product — efficiency (lower P) and behaviour (lower t) both pay off proportionally.",
  },
];

export const postTest = [
  // ---- Fundamentals (Q1–5) ----
  {
    section: "fundamentals",
    question: "Using P = I²·R, a cable's heat loss grows…",
    options: ["linearly with current", "with the SQUARE of current — why transmission lines use high voltage/low current", "with voltage", "not at all"],
    correct: 1,
    explanation: "Doubling current quadruples cable losses: the engineering reason power grids transmit at huge voltage.",
  },
  {
    section: "fundamentals",
    question: "1 kWh equals…",
    options: ["3.6 MJ", "3600 J", "1000 J", "3.6 GJ"],
    correct: 0,
    explanation: "1000 W × 3600 s = 3.6×10⁶ J — the bridge between electricity bills and SI energy.",
  },
  {
    section: "fundamentals",
    question: "For a resistive load, P = V·I can also be written as…",
    options: ["P = V²/R and P = I²·R", "P = V·R", "P = R/I", "P = I/R²"],
    correct: 0,
    explanation: "Substituting V = IR gives both forms — useful depending on what you know.",
  },
  {
    section: "fundamentals",
    question: "Energy in kWh divided by time in hours gives…",
    options: ["average power in kW", "voltage", "current", "cost"],
    correct: 0,
    explanation: "P_avg = E/t: a 3.68 kWh day of one device means it averaged 153 W over 24 h.",
  },
  {
    section: "fundamentals",
    question: "The lab's cost calculation multiplies kWh by a rate you enter because…",
    options: ["rates vary by country and plan — the lab can't know yours", "rates are universal", "cost is measured in joules", "rates don't affect cost"],
    correct: 0,
    explanation: "Electricity pricing is local and tiered; the lab applies your own rate to computed energy instead of inventing one.",
  },
  // ---- Application (Q6–10) ----
  {
    section: "application",
    question: "An oven draws 12 A at 230 V. Its power is…",
    options: ["2.76 kW", "276 W", "27.6 kW", "19.2 W"],
    correct: 0,
    explanation: "P = 230 × 12 = 2760 W = 2.76 kW.",
  },
  {
    section: "application",
    question: "That oven runs 2 hours weekly. The yearly energy (52 weeks) is about…",
    options: ["287 kWh", "28.7 kWh", "2870 kWh", "574 kWh"],
    correct: 0,
    explanation: "E = 2.76 × 2 × 52 = 287 kWh.",
  },
  {
    section: "application",
    question: "At 15 per kWh that oven costs about… per year",
    options: ["about 4306", "about 430.6", "about 43.1", "about 43 060"],
    correct: 0,
    explanation: "E = 2.76 × 2 × 52 = 287.04 kWh; cost = 287.04 × 15 ≈ 4306.",
  },
  {
    section: "application",
    question: "A phone charger draws 0.05 A at 230 V. Left plugged in for a month (720 h) it uses about…",
    options: ["8.3 kWh", "0.83 kWh", "83 kWh", "0.08 kWh"],
    correct: 0,
    explanation: "P = 11.5 W; E = 0.0115 × 720 ≈ 8.3 kWh — small but not zero over long durations.",
  },
  {
    section: "application",
    question: "A factory machine draws 8 kW for 15 minutes per cycle, 40 cycles a day. Its daily energy is…",
    options: ["80 kWh", "8 kWh", "800 kWh", "40 kWh"],
    correct: 0,
    explanation: "E = 8 kW × 0.25 h × 40 = 80 kWh per day.",
  },
  // ---- Prediction & Analysis (Q11–15) ----
  {
    section: "analysis",
    question: "Two identical heaters run: one for 30 min, two in parallel for 15 min (same 30 min window). Energy used…",
    options: ["the parallel pair uses twice as much", "identical: 2 × P × 15 = P × 30", "the single one uses more", "zero either way"],
    correct: 1,
    explanation: "Energy is power × time summed: both schedules deliver the same total energy — but the parallel pair needs double the current capacity.",
  },
  {
    section: "analysis",
    question: "Grid transmission raises voltage 10× (same power delivered). The cable current…",
    options: ["rises 10×", "falls 10×, cutting resistive losses to about 1%", "is unchanged", "doubles"],
    correct: 1,
    explanation: "I = P/V falls 10×; losses P_loss = I²R fall 100× — the economic backbone of high-voltage transmission.",
  },
  {
    section: "analysis",
    question: "A utility bills 'per kWh'. Which change definitely lowers the bill (same usage pattern)?",
    options: ["a lower-power appliance", "a shorter usage time", "either — both cut E = P·t", "nothing can lower it"],
    correct: 2,
    explanation: "The bill literally prices energy: any reduction in power or time reduces kWh proportionally.",
  },
  {
    section: "analysis",
    question: "An old fridge (150 W average) is replaced by a modern one (80 W average). Over a year (8760 h) the saving is about…",
    options: ["613 kWh", "61 kWh", "6130 kWh", "1314 kWh"],
    correct: 0,
    explanation: "ΔP = 70 W × 8760 h ≈ 613 kWh — efficiency upgrades shine on always-on loads.",
  },
  {
    section: "analysis",
    question: "The lab shows E growing linearly with hours on its chart. A student expects the curve for a thermostat appliance. The honest answer is…",
    options: ["the lab is wrong", "the lab states its constant-power assumption; duty-cycling appliances need an average-power estimate instead", "energy always curves", "charts don't apply to appliances"],
    correct: 1,
    explanation: "The linear model is exact only for constant loads — the lab's assumptions panel says so, and that disclosure is part of good modeling.",
  },
];
// Assessment registry: experiment id → metadata + pre/post question banks.
// Every experiment with an entry here gets the full pre-test / post-test /
// results / comparison experience. Every bank holds exactly 15 pre-test and
// 15 post-test questions (5 fundamentals, 5 application, 5 prediction & analysis).

import { preTest as projectilePre, postTest as projectilePost } from "./projectile";
import { preTest as pendulumPre, postTest as pendulumPost } from "./pendulum";
import { preTest as inclinePre, postTest as inclinePost } from "./incline";
import { preTest as gasPre, postTest as gasPost } from "./gas";
import { preTest as heatPre, postTest as heatPost } from "./heat";
import { preTest as conductionPre, postTest as conductionPost } from "./conduction";
import { preTest as buoyancyPre, postTest as buoyancyPost } from "./buoyancy";
import { preTest as bernoulliPre, postTest as bernoulliPost } from "./bernoulli";
import { preTest as collisionsPre, postTest as collisionsPost } from "./collisions";
import { preTest as orbitPre, postTest as orbitPost } from "./orbit";
import { preTest as workPre, postTest as workPost } from "./work";
import { preTest as springPre, postTest as springPost } from "./spring";
import { preTest as torquePre, postTest as torquePost } from "./torque";
import { preTest as hydrostaticPre, postTest as hydrostaticPost } from "./hydrostatic";
import { preTest as venturiPre, postTest as venturiPost } from "./venturi";
import { preTest as expansionPre, postTest as expansionPost } from "./expansion";
import { preTest as heatcomparePre, postTest as heatcomparePost } from "./heatcompare";
import { preTest as gasprocessPre, postTest as gasprocessPost } from "./gasprocess";
import { preTest as ohmPre, postTest as ohmPost } from "./ohm";
import { preTest as electricpowerPre, postTest as electricpowerPost } from "./electricpower";

const entry = (id, title, route, pre, post) => ({ id, title, route, preTest: pre, postTest: post });

export const ASSESSMENTS = {
  projectile: entry("projectile", "Projectile Motion", "/lab/projectile", projectilePre, projectilePost),
  pendulum: entry("pendulum", "Simple Pendulum", "/lab/pendulum", pendulumPre, pendulumPost),
  incline: entry("incline", "Inclined Plane", "/lab/incline", inclinePre, inclinePost),
  gas: entry("gas", "Ideal Gas Explorer", "/lab/gas", gasPre, gasPost),
  heat: entry("heat", "Specific Heat", "/lab/heat", heatPre, heatPost),
  buoyancy: entry("buoyancy", "Buoyancy Lab", "/lab/buoyancy", buoyancyPre, buoyancyPost),
  bernoulli: entry("bernoulli", "Bernoulli Flow Lab", "/lab/bernoulli", bernoulliPre, bernoulliPost),
  conduction: entry("conduction", "Heat Conduction", "/lab/conduction", conductionPre, conductionPost),
  collisions: entry("collisions", "Collisions & Momentum", "/lab/collisions", collisionsPre, collisionsPost),
  orbit: entry("orbit", "Orbit & Gravity", "/lab/orbit", orbitPre, orbitPost),
  work: entry("work", "Work, Energy & Power", "/lab/work-energy", workPre, workPost),
  spring: entry("spring", "Hooke's Law Springs", "/lab/spring", springPre, springPost),
  torque: entry("torque", "Torque & Levers", "/lab/torque", torquePre, torquePost),
  hydrostatic: entry("hydrostatic", "Hydrostatic Pressure", "/lab/hydrostatic", hydrostaticPre, hydrostaticPost),
  venturi: entry("venturi", "Venturi & Continuity", "/lab/venturi", venturiPre, venturiPost),
  expansion: entry("expansion", "Thermal Expansion", "/lab/expansion", expansionPre, expansionPost),
  heatcompare: entry("heatcompare", "Heat Transfer Comparison", "/lab/heat-transfer", heatcomparePre, heatcomparePost),
  gasprocess: entry("gasprocess", "Heating & Gas Processes", "/lab/gas-process", gasprocessPre, gasprocessPost),
  ohm: entry("ohm", "Ohm's Law Circuits", "/lab/ohm", ohmPre, ohmPost),
  electricpower: entry("electricpower", "Electrical Power & Energy", "/lab/electrical-power", electricpowerPre, electricpowerPost),
};
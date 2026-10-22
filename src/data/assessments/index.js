// Assessment registry: experiment id → metadata + pre/post question banks.
// Every experiment with an entry here gets the full pre-test / post-test /
// results / comparison experience. Experiments without assessments yet are
// simply omitted (never shown broken buttons).

import { preTest as buoyancyPre, postTest as buoyancyPost } from "./buoyancy";
import { preTest as bernoulliPre, postTest as bernoulliPost } from "./bernoulli";
import { preTest as conductionPre, postTest as conductionPost } from "./conduction";

export const ASSESSMENTS = {
  buoyancy: {
    id: "buoyancy",
    title: "Buoyancy Lab",
    route: "/lab/buoyancy",
    preTest: buoyancyPre,
    postTest: buoyancyPost,
  },
  bernoulli: {
    id: "bernoulli",
    title: "Bernoulli Flow Lab",
    route: "/lab/bernoulli",
    preTest: bernoulliPre,
    postTest: bernoulliPost,
  },
  conduction: {
    id: "conduction",
    title: "Heat Conduction Lab",
    route: "/lab/conduction",
    preTest: conductionPre,
    postTest: conductionPost,
  },
};
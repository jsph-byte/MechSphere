import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Anonymous, device-local progress tracking. No account, no personal data.
// Everything lives in this browser's localStorage — progress does NOT sync
// across devices or browsers. Use Settings → Backup & transfer to move it.

const KEY = "mechsphere-progress-v1";

const EMPTY = {
  experiments: {},          // { experimentId: { count, lastAt } }
  predictions: { total: 0, correct: 0 },
  challenges: { answered: 0, correct: 0, bestStreak: 0, topics: {} }, // topics: { topic: { correct, total } }
  conversions: 0,
  conversionHistory: [],    // last 12 entries
  materialsViewed: [],
  comparisons: 0,
  selectionAnswers: 0,
  review: [],               // last 25 answered questions
  recent: [],               // last 12 activities { at, label, type }
  achievements: {},         // { id: unlockedAt }
  assessments: {},            // { experimentId: { pre: {...}, post: {...} } }
};

// Experiment id → lab category (for cross-category achievements).
const EXPERIMENT_CATEGORY = {
  projectile: "mechanics", pendulum: "mechanics", incline: "mechanics", collisions: "mechanics",
  orbit: "mechanics", work: "mechanics", spring: "mechanics", torque: "mechanics",
  buoyancy: "fluids", bernoulli: "fluids", hydrostatic: "fluids", venturi: "fluids",
  heat: "thermal", conduction: "thermal", expansion: "thermal", heatcompare: "thermal",
  gas: "gas", gasprocess: "gas",
  ohm: "electrical", electricpower: "electrical",
};

export const ACHIEVEMENTS = [
  { id: "first-experiment", name: "First Experiment", description: "Run your first experiment in the Lab.", icon: "Play" },
  { id: "prediction-explorer", name: "Prediction Explorer", description: "Submit 3 Predict First predictions.", icon: "Lightbulb" },
  { id: "motion-master", name: "Motion Master", description: "Run the projectile, pendulum, and inclined plane experiments.", icon: "Orbit" },
  { id: "material-investigator", name: "Material Investigator", description: "Open 5 materials and run 1 comparison.", icon: "Layers" },
  { id: "unit-conversion-pro", name: "Unit Conversion Pro", description: "Perform 25 unit conversions.", icon: "Ruler" },
  { id: "engineering-challenger", name: "Engineering Challenger", description: "Answer 10 Engineering Challenge questions.", icon: "Trophy" },
  { id: "first-pretest", name: "Pre-Test Pioneer", description: "Complete your first 15-question pre-test.", icon: "ClipboardCheck" },
  { id: "full-cycle", name: "Full Learning Cycle", description: "Complete both the pre-test and the post-test for one experiment.", icon: "Repeat" },
  { id: "score-improver", name: "Measured Improvement", description: "Score higher on a post-test than on its pre-test.", icon: "TrendingUp" },
  { id: "category-explorer", name: "Category Explorer", description: "Run experiments in at least 3 different lab categories.", icon: "Compass" },
];

function normalize(p) {
  return {
    ...EMPTY, ...p,
    experiments: p.experiments || {},
    predictions: { ...EMPTY.predictions, ...(p.predictions || {}) },
    challenges: { ...EMPTY.challenges, ...(p.challenges || {}) },
    achievements: p.achievements || {},
    assessments: p.assessments || {},
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    return normalize(JSON.parse(raw));
  } catch (e) {
    return { ...EMPTY };
  }
}

function computeAchievements(p) {
  const now = Date.now();
  const earned = { ...p.achievements };
  const done = (id) => { if (!earned[id]) earned[id] = now; };
  const exp = p.experiments || {};
  if (Object.keys(exp).length >= 1) done("first-experiment");
  if ((p.predictions?.total || 0) >= 3) done("prediction-explorer");
  if (exp.projectile && exp.pendulum && exp.incline) done("motion-master");
  if ((p.materialsViewed || []).length >= 5 && (p.comparisons || 0) >= 1) done("material-investigator");
  if ((p.conversions || 0) >= 25) done("unit-conversion-pro");
  if ((p.challenges?.answered || 0) >= 10) done("engineering-challenger");

  let fullCycle = 0, improved = 0;
  for (const t of Object.values(p.assessments || {})) {
    const pre = t?.pre?.latest, post = t?.post?.latest;
    if (pre) { done("first-pretest"); if (post) { fullCycle++; if (post.score > pre.score) improved++; } }
  }
  if (fullCycle >= 1) done("full-cycle");
  if (improved >= 1) done("score-improver");

  const cats = new Set(Object.keys(exp).map((id) => EXPERIMENT_CATEGORY[id]).filter(Boolean));
  if (cats.size >= 3) done("category-explorer");
  return earned;
}

function recentItem(type, label) {
  return { at: Date.now(), type, label };
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);
  const [storageFailed, setStorageFailed] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
      setStorageFailed(false);
    } catch (e) {
      // Saving failed (private mode, quota, blocked storage) — never claim progress was saved.
      setStorageFailed(true);
    }
  }, [progress]);

  const actions = useMemo(() => {
    const update = (fn) => setProgress((prev) => {
      const next = fn({ ...prev });
      next.achievements = computeAchievements(next);
      return next;
    });

    return {
      recordExperiment(id, label) {
        update((p) => {
          const prev = p.experiments[id] || { count: 0, lastAt: null };
          p.experiments[id] = { count: prev.count + 1, lastAt: Date.now() };
          p.recent = [recentItem("experiment", label), ...p.recent].slice(0, 12);
          return p;
        });
      },
      recordPrediction(correct, label) {
        update((p) => {
          p.predictions = { total: p.predictions.total + 1, correct: p.predictions.correct + (correct ? 1 : 0) };
          p.recent = [recentItem("prediction", label), ...p.recent].slice(0, 12);
          return p;
        });
      },
      recordChallengeAnswer({ topic, difficulty, correct, streak, question, givenAnswer }) {
        update((p) => {
          p.challenges.answered += 1;
          p.challenges.correct += correct ? 1 : 0;
          p.challenges.bestStreak = Math.max(p.challenges.bestStreak || 0, streak || 0);
          const t = p.challenges.topics[topic] || { correct: 0, total: 0 };
          p.challenges.topics[topic] = { correct: t.correct + (correct ? 1 : 0), total: t.total + 1 };
          p.review = [
            { at: Date.now(), topic, difficulty, correct, question, givenAnswer },
            ...p.review,
          ].slice(0, 25);
          p.recent = [recentItem("challenge", `Challenge question: ${topic}`), ...p.recent].slice(0, 12);
          return p;
        });
      },
      recordConversion(entry) {
        update((p) => {
          p.conversions += 1;
          p.conversionHistory = [entry, ...p.conversionHistory].slice(0, 12);
          return p;
        });
      },
      clearConversionHistory() {
        update((p) => ({ ...p, conversionHistory: [] }));
      },
      recordMaterialView(id) {
        update((p) => {
          if (!p.materialsViewed.includes(id)) p.materialsViewed = [...p.materialsViewed, id];
          return p;
        });
      },
      recordComparison() {
        update((p) => {
          p.comparisons += 1;
          p.recent = [recentItem("comparison", "Compared two materials"), ...p.recent].slice(0, 12);
          return p;
        });
      },
      recordSelectionAnswer() {
        update((p) => {
          p.selectionAnswers += 1;
          p.recent = [recentItem("selection", "Material selection challenge"), ...p.recent].slice(0, 12);
          return p;
        });
      },
      saveAssessmentDraft(experimentId, testType, answers) {
        update((p) => {
          p.assessments = p.assessments || {};
          const exp = (p.assessments[experimentId] = p.assessments[experimentId] || { pre: {}, post: {} });
          const t = (exp[testType] = exp[testType] || {});
          t.draft = { answers, startedAt: t.draft?.startedAt || Date.now() };
          return p;
        });
      },
      clearAssessmentDraft(experimentId, testType) {
        update((p) => {
          const t = p.assessments?.[experimentId]?.[testType];
          if (t) t.draft = null;
          return p;
        });
      },
      submitAssessment(experimentId, testType, result) {
        update((p) => {
          p.assessments = p.assessments || {};
          const exp = (p.assessments[experimentId] = p.assessments[experimentId] || { pre: {}, post: {} });
          const t = (exp[testType] = exp[testType] || {});
          t.attempts = (t.attempts || 0) + 1;
          t.latest = result; // { answers, score, total, pct, sections, at }
          t.bestScore = Math.max(t.bestScore || 0, result.score);
          t.draft = null;
          p.recent = [
            recentItem("assessment", `${experimentId} ${testType === "pre" ? "pre" : "post"}-test: ${result.score}/${result.total}`),
            ...p.recent,
          ].slice(0, 12);
          return p;
        });
      },
      /** Import a progress backup (validated). Throws on invalid files. */
      importProgress(raw) {
        if (!raw || typeof raw !== "object" || Array.isArray(raw) ||
          typeof raw.experiments !== "object" || typeof raw.assessments !== "object" ||
          !Array.isArray(raw.recent ?? EMPTY.recent)) {
          throw new Error("That file is not a valid MechSphere progress backup.");
        }
        setProgress(() => {
          const next = normalize(raw);
          next.achievements = computeAchievements(next);
          return next;
        });
      },
      resetProgress() {
        setProgress({ ...EMPTY, achievements: {} });
      },
    };
  }, []);

  const value = useMemo(() => ({ progress, storageFailed, ...actions }), [progress, storageFailed, actions]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => useContext(ProgressContext);
import React, { useMemo, useState } from "react";
import { Plus, Trash2, Equal } from "lucide-react";
import { QUANTITIES, ZERO_DIMS, addDims, subDims, scaleDims, dimsEqual, dimsString, sup } from "@/lib/dimensional";
import { cn } from "@/lib/utils";

// Structured equation builder for dimensional analysis.
// Model: LHS is a named variable = one quantity^power.
// RHS is a sum of terms; each term is a product/quotient of factors;
// each factor is quantity^power or a dimensionless constant (½).
// The engine evaluates exponents numerically — examples are never hardcoded.

const factorText = (f) => {
  if (f.kind === "constant") return "½";
  const q = QUANTITIES.find((x) => x.id === f.q);
  if (!q) return "?";
  return f.pow === 1 ? q.symbol : `${q.symbol}${sup(f.pow)}`;
};

const termText = (t) =>
  t.factors.map((f, i) => (i === 0 ? "" : f.op === "÷" ? "/" : "·") + factorText(f)).join("");

const sideText = (terms) =>
  terms.map((t, i) => (i === 0 ? "" : ` ${t.op} `) + termText(t)).join("");

/** Evaluate a list of terms. Returns { dims, steps, error }. */
function evalTerms(terms) {
  const steps = [];
  let dims = null;
  for (let ti = 0; ti < terms.length; ti++) {
    const term = terms[ti];
    let d = [...ZERO_DIMS];
    term.factors.forEach((f, fi) => {
      if (f.kind === "constant") return; // dimensionless: no exponent contribution
      const q = QUANTITIES.find((x) => x.id === f.q);
      if (!q) return;
      const scaled = scaleDims(q.dims, f.pow);
      d = fi > 0 && f.op === "÷" ? subDims(d, scaled) : addDims(d, scaled);
    });
    const label = termText(term);
    if (dims === null) {
      dims = d;
      steps.push({ label, dims: d });
    } else if (!dimsEqual(d, dims)) {
      return {
        error: `Cannot ${term.op === "+" ? "add" : "subtract"} term ${ti + 1} (“${label}”, [${dimsString(d)}]) to term 1 (“${steps[0].label}”, [${dimsString(dims)}]) — only quantities with matching dimensions can be added or subtracted.`,
      };
    } else {
      steps.push({ label, dims: d });
    }
  }
  return { dims: dims || [...ZERO_DIMS], steps };
}

const Q = (q, pow = 1, op = "×") => ({ kind: "quantity", q, pow, op });
const HALF = { kind: "constant" };
const T = (op, factors) => ({ op, factors });

// Guided examples — loaded as builder state and evaluated by the same engine.
const EXAMPLES = [
  { key: "A", title: "Distance: d = v·t", expected: "consistent", state: { useEquals: true, lhs: { name: "d", q: "length", pow: 1 }, rhsTerms: [T("+", [Q("velocity"), Q("time")])] } },
  { key: "B", title: "Final velocity: v_f = v_i + a·t", expected: "consistent", state: { useEquals: true, lhs: { name: "v_f", q: "velocity", pow: 1 }, rhsTerms: [T("+", [Q("velocity")]), T("+", [Q("acceleration"), Q("time")])] } },
  { key: "C", title: "Newton's second law: F = m·a", expected: "consistent", state: { useEquals: true, lhs: { name: "F", q: "force", pow: 1 }, rhsTerms: [T("+", [Q("mass"), Q("acceleration")])] } },
  { key: "D", title: "Work: E = F·d", expected: "consistent", state: { useEquals: true, lhs: { name: "E", q: "energy", pow: 1 }, rhsTerms: [T("+", [Q("force"), Q("length")])] } },
  { key: "E", title: "Density: ρ = m/V", expected: "consistent", state: { useEquals: true, lhs: { name: "ρ", q: "density", pow: 1 }, rhsTerms: [T("+", [Q("mass"), Q("volume", 1, "÷")])] } },
  { key: "F", title: "Pressure: p = F/A", expected: "consistent", state: { useEquals: true, lhs: { name: "p", q: "pressure", pow: 1 }, rhsTerms: [T("+", [Q("force"), Q("area", 1, "÷")])] } },
  { key: "G", title: "Power: P = E/t", expected: "consistent", state: { useEquals: true, lhs: { name: "P", q: "power", pow: 1 }, rhsTerms: [T("+", [Q("energy"), Q("time", 1, "÷")])] } },
  { key: "H", title: "Invalid addition: a + t", expected: "inconsistent", state: { useEquals: false, lhs: { name: "", q: "acceleration", pow: 1 }, rhsTerms: [T("+", [Q("acceleration")]), T("+", [Q("time")])] } },
  { key: "I", title: "Invalid equality: E = F", expected: "inconsistent", state: { useEquals: true, lhs: { name: "E", q: "energy", pow: 1 }, rhsTerms: [T("+", [Q("force")])] } },
  { key: "J", title: "Invalid distance: d = v + t", expected: "inconsistent", state: { useEquals: true, lhs: { name: "d", q: "length", pow: 1 }, rhsTerms: [T("+", [Q("velocity")]), T("+", [Q("time")])] } },
  { key: "K", title: "Kinetic energy: K = ½·m·v² (constants & powers)", expected: "consistent", state: { useEquals: true, lhs: { name: "K", q: "energy", pow: 1 }, rhsTerms: [T("+", [HALF, Q("mass"), Q("velocity", 2)])] } },
];

const clone = (o) => JSON.parse(JSON.stringify(o));

const selectCls = "rounded-lg border border-input bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export default function EquationChecker() {
  const [state, setState] = useState(() => clone(EXAMPLES[0].state));

  const setRhs = (fn) => setState((s) => ({ ...s, rhsTerms: fn(s.rhsTerms) }));
  const setLhs = (patch) => setState((s) => ({ ...s, lhs: { ...s.lhs, ...patch } }));

  const addTerm = () => setRhs((t) => [...t, T("+", [Q("velocity")])]);
  const removeTerm = (ti) => setRhs((t) => (t.length > 1 ? t.filter((_, i) => i !== ti) : t));
  const setTermOp = (ti, op) => setRhs((t) => t.map((x, i) => (i === ti ? { ...x, op } : x)));
  const addFactor = (ti) => setRhs((t) => t.map((x, i) => (i === ti ? { ...x, factors: [...x.factors, Q("time")] } : x)));
  const addHalf = (ti) => setRhs((t) => t.map((x, i) => (i === ti ? { ...x, factors: [...x.factors, { ...HALF }] } : x)));
  const removeFactor = (ti, fi) =>
    setRhs((t) => t.map((x, i) => (i === ti && x.factors.length > 1 ? { ...x, factors: x.factors.filter((_, j) => j !== fi) } : x)));
  const patchFactor = (ti, fi, patch) =>
    setRhs((t) => t.map((x, i) => (i === ti ? { ...x, factors: x.factors.map((f, j) => (j === fi ? { ...f, ...patch } : f)) } : x)));

  const result = useMemo(() => {
    const lhsQ = QUANTITIES.find((q) => q.id === state.lhs.q);
    const lhsDims = lhsQ ? scaleDims(lhsQ.dims, state.lhs.pow) : [...ZERO_DIMS];
    const rhs = evalTerms(state.rhsTerms);
    if (rhs.error) {
      return { ok: false, headline: "Dimensionally inconsistent", lhsDims, lhsQ, steps: rhs.steps, detail: rhs.error };
    }
    if (!state.useEquals) {
      return { ok: true, headline: "Expression evaluated", lhsDims, lhsQ, steps: rhs.steps, rhsDims: rhs.dims, expressionOnly: true };
    }
    const ok = dimsEqual(lhsDims, rhs.dims);
    return {
      ok,
      headline: ok ? "Dimensionally consistent" : "Dimensionally inconsistent",
      lhsDims, lhsQ, steps: rhs.steps, rhsDims: rhs.dims,
      detail: ok
        ? `The left side (${state.lhs.name || lhsQ?.label}) has dimensions [${dimsString(lhsDims)}], and the right side evaluates to [${dimsString(rhs.dims)}] — they match.`
        : `Mismatch at the “=” sign: the left side has [${dimsString(lhsDims)}] but the right side evaluates to [${dimsString(rhs.dims)}].`,
    };
  }, [state]);

  const lhsPreview = `${state.lhs.name || lhsName(state.lhs.q)}${state.lhs.pow !== 1 ? sup(state.lhs.pow) : ""}`;
  const preview = `${lhsPreview}${state.useEquals ? " = " : "≡ "}${sideText(state.rhsTerms)}`;

  return (
    <div className="space-y-4">
      {/* Examples */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Guided examples — loaded into the builder and evaluated by the same engine</div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.key}
              onClick={() => setState(clone(ex.state))}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-cyan-500/60 hover:text-foreground"
            >
              {ex.key}. {ex.title}
            </button>
          ))}
        </div>
      </div>

      {/* Builder */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Build your equation</div>
          <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <input type="checkbox" checked={state.useEquals} onChange={(e) => setState((s) => ({ ...s, useEquals: e.target.checked }))} className="accent-orange-500" />
            compare with “=”
          </label>
        </div>

        <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/[0.05] px-3 py-2 text-center font-mono text-base font-semibold text-foreground sm:text-lg">
          {preview}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
          {/* LHS */}
          <div className="space-y-2 rounded-lg border border-border bg-background p-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-cyan-400">
              {state.useEquals ? "Left side — variable" : "Target quantity (reference)"}
            </div>
            <input
              value={state.lhs.name}
              onChange={(e) => setLhs({ name: e.target.value })}
              placeholder="name, e.g. d"
              aria-label="Variable name"
              className={cn(selectCls, "w-full")}
            />
            <div className="flex gap-2">
              <select value={state.lhs.q} onChange={(e) => setLhs({ q: e.target.value })} aria-label="Left side quantity" className={cn(selectCls, "min-w-0 flex-1")}>
                {QUANTITIES.map((q) => <option key={q.id} value={q.id}>{q.label}</option>)}
              </select>
              <input
                type="number" min={-3} max={3} step={1} value={state.lhs.pow}
                onChange={(e) => setLhs({ pow: clampPow(e.target.value) })}
                aria-label="Left side power"
                className={cn(selectCls, "w-16 text-center")}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Set what the variable represents; the power raises it (e.g. A² → pow 2).
            </p>
          </div>

          {/* RHS terms */}
          <div className="space-y-3">
            {state.rhsTerms.map((term, ti) => (
              <div key={ti} className="rounded-lg border border-border bg-background p-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {ti > 0 ? (
                    <select value={term.op} onChange={(e) => setTermOp(ti, e.target.value)} aria-label={`Operator before term ${ti + 1}`} className={cn(selectCls, "w-16 text-center font-bold")}>
                      <option value="+">+</option>
                      <option value="−">−</option>
                    </select>
                  ) : (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Term {ti + 1}</span>
                  )}
                  <span className="font-mono text-sm text-muted-foreground">{termText(term)}</span>
                  <div className="ml-auto flex gap-1.5">
                    <button onClick={() => addFactor(ti)} className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:border-ring hover:text-foreground">
                      <Plus className="h-3 w-3" /> quantity
                    </button>
                    <button onClick={() => addHalf(ti)} className="rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:border-ring hover:text-foreground">
                      + ½
                    </button>
                    <button onClick={() => removeTerm(ti)} disabled={state.rhsTerms.length <= 1} aria-label={`Remove term ${ti + 1}`} className="rounded-md border border-border p-1 text-muted-foreground hover:border-destructive hover:text-destructive disabled:opacity-30">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {term.factors.map((f, fi) => (
                    <div key={fi} className="flex flex-wrap items-center gap-1.5">
                      {fi > 0 && (
                        <select value={f.op} onChange={(e) => patchFactor(ti, fi, { op: e.target.value })} aria-label="Operator" className={cn(selectCls, "w-14 text-center font-bold")}>
                          <option value="×">×</option>
                          <option value="÷">÷</option>
                        </select>
                      )}
                      {f.kind === "constant" ? (
                        <span className="rounded-lg border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground">½ (dimensionless)</span>
                      ) : (
                        <>
                          <select value={f.q} onChange={(e) => patchFactor(ti, fi, { q: e.target.value })} aria-label="Quantity" className={cn(selectCls, "min-w-0 flex-1 sm:max-w-[220px]")}>
                            {QUANTITIES.map((q) => <option key={q.id} value={q.id}>{q.label} [{dimsString(q.dims)}]</option>)}
                          </select>
                          <input
                            type="number" min={-3} max={3} step={1} value={f.pow}
                            onChange={(e) => patchFactor(ti, fi, { pow: clampPow(e.target.value) })}
                            aria-label="Power"
                            className={cn(selectCls, "w-16 text-center")}
                          />
                        </>
                      )}
                      <button onClick={() => removeFactor(ti, fi)} disabled={term.factors.length <= 1} aria-label="Remove factor" className="rounded-md border border-border p-1 text-muted-foreground hover:border-destructive hover:text-destructive disabled:opacity-30">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={addTerm} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-ring hover:text-foreground">
              <Plus className="h-3.5 w-3.5" /> Add term
            </button>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Each term groups its factors automatically (that is the builder's bracketing). Powers are integers
              from −3 to 3; division produces negative exponents, and a factor that cancels completely
              contributes a zero exponent (dimensionless).
            </p>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className={cn("rounded-xl border p-5", result.ok ? "border-emerald-500/40 bg-emerald-500/[0.07]" : "border-destructive/40 bg-destructive/[0.07]")}>
        <div className="flex items-center gap-2">
          <Equal className={cn("h-5 w-5", result.ok ? "text-emerald-400" : "text-destructive")} />
          <h3 className={cn("font-heading text-base font-bold", result.ok ? "text-emerald-400" : "text-destructive")}>{result.headline}</h3>
        </div>
        <p className="mt-1.5 font-mono text-sm text-foreground">{preview}</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {result.expressionOnly ? "Reference quantity" : "Left side"}
            </div>
            <div className="mt-0.5 font-mono text-sm">
              {lhsPreview} → [{dimsString(result.lhsDims)}]
            </div>
          </div>
          {!result.expressionOnly && (
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Right side</div>
              <div className="mt-0.5 font-mono text-sm">→ [{dimsString(result.rhsDims)}]</div>
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Intermediate dimensional steps</div>
          <ul className="space-y-1">
            {result.steps.map((s, i) => (
              <li key={i} className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs">
                Term {i + 1}: {s.label} → [{dimsString(s.dims)}]
              </li>
            ))}
          </ul>
        </div>

        <p className={cn("mt-3 text-sm font-medium", result.ok ? "text-emerald-400" : "text-destructive")}>{result.detail}</p>
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Necessary, not sufficient:</strong> dimensional consistency is a
        powerful check — every physically correct equation must pass it — but passing it does not prove an
        equation is right. Wrong coefficients, missing terms, or incorrect signs can still be dimensionally
        consistent. Note also that this checker treats temperature as absolute temperature [Θ]; a temperature
        <em> difference</em> carries the same dimensions, but equations mixing T and ΔT need extra care.
      </p>
    </div>
  );
}

function lhsName(q) {
  return QUANTITIES.find((x) => x.id === q)?.label || "quantity";
}

function clampPow(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 1;
  return Math.max(-3, Math.min(3, Math.round(n)));
}
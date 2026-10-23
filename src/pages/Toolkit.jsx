import React, { useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Check, Search, X, History } from "lucide-react";
import EquationChecker from "@/components/toolkit/EquationChecker";
import QuantityComparison from "@/components/toolkit/QuantityComparison";
import { UNIT_CATEGORIES, convert } from "@/lib/units";
import { fmt, todayIndex } from "@/lib/format";
import { CONSTANTS } from "@/data/constants";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

// ---------- Unit Converter ----------
function Converter() {
  const { recordConversion, progress, clearConversionHistory } = useProgress();
  const [cat, setCat] = useState("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [copied, setCopied] = useState(false);

  const category = UNIT_CATEGORIES.find((c) => c.id === cat);
  const res = convert(value, cat, from, to);
  const resultText = res.valid ? fmt(res.value, 8) : null;

  const changeCat = (id) => {
    const c = UNIT_CATEGORIES.find((x) => x.id === id);
    setCat(id);
    setFrom(c.units[0][0]);
    setTo(c.units[1][0]);
  };

  const swap = () => { setFrom(to); setTo(from); };

  const save = () => {
    if (!res.valid) return;
    recordConversion({
      value: Number(value), cat,
      from, to, out: res.value,
      label: `${value} ${from} → ${fmt(res.value, 8)} ${to} (${category.label})`,
    });
  };

  const copy = async () => {
    if (resultText === null) return;
    try {
      await navigator.clipboard.writeText(`${resultText} ${to}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) { /* clipboard unavailable */ }
    save();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantity</span>
            <select
              value={cat} onChange={(e) => changeCat(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {UNIT_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Value to convert</span>
            <input
              type="text" inputMode="decimal" value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Value to convert"
              className={cn("w-full rounded-lg border bg-background px-3 py-2.5 font-mono text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-ring", res.valid ? "border-input" : "border-destructive")}
            />
          </label>
        </div>
        <div className="grid items-end gap-2 sm:grid-cols-[1fr_auto_1fr]">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">From</span>
            <select
              value={from} onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {category.units.map((u) => <option key={u[0]} value={u[0]}>{u[1]} ({u[0]})</option>)}
            </select>
          </label>
          <button
            onClick={swap} aria-label="Swap units"
            className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">To</span>
            <select
              value={to} onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {category.units.map((u) => <option key={u[0]} value={u[0]}>{u[1]} ({u[0]})</option>)}
            </select>
          </label>
        </div>

        <div className="mt-5">
          {res.valid ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.07] p-4">
              <div className="flex-1">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Result</div>
                <div className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                  {resultText} <span className="text-base font-normal text-muted-foreground">{to}</span>
                </div>
              </div>
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-2 text-xs font-semibold text-white hover:bg-orange-600">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy result"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive">
              <X className="h-4 w-4" /> {res.error}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <History className="h-3.5 w-3.5" /> Conversion history ({progress.conversionHistory.length})
          </span>
          {progress.conversionHistory.length > 0 && (
            <button onClick={clearConversionHistory} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Clear</button>
          )}
        </div>
        {progress.conversionHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No conversions yet. Copy a result to save it to history (stored on this device only).</p>
        ) : (
          <ul className="space-y-1.5">
            {progress.conversionHistory.map((h, i) => (
              <li key={i} className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs tabular-nums text-muted-foreground">{h.label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}



// ---------- Constants reference ----------
function Constants() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CONSTANTS;
    return CONSTANTS.filter((c) => [c.symbol, c.name, c.unit, c.description].join(" ").toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search constants by symbol, name, or use…"
          className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((c) => (
          <div key={c.symbol} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-sm font-bold text-orange-400">{c.symbol}</span>
              <span className="font-mono text-sm tabular-nums text-cyan-400">
                {fmt(c.value, 7)} <span className="text-[11px] text-muted-foreground">{c.unit}</span>
              </span>
            </div>
            <div className="mt-1 text-xs font-semibold text-foreground">{c.name}</div>
            <div className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{c.description}</div>
          </div>
        ))}
        {!filtered.length && <div className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No constants match “{q}”.</div>}
      </div>
      <p className="text-[11px] text-muted-foreground">All data is bundled with the app — the constants reference works fully offline.</p>
    </div>
  );
}

export default function Toolkit() {
  const [tab, setTab] = useState("converter");
  const tabs = [
    { id: "converter", label: "Unit Converter" },
    { id: "equation", label: "Equation Checker" },
    { id: "quantity", label: "Quantity Comparison" },
    { id: "constants", label: "Constants" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Engineering Toolkit</h1>
        <p className="mt-1 text-sm text-muted-foreground">Verified conversion factors, a dimensional equation checker, and a referenced constants library.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors",
              tab === t.id ? "border-cyan-500 bg-cyan-500/15 text-cyan-300" : "border-border bg-card text-muted-foreground hover:border-ring")}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "converter" && <Converter />}
      {tab === "equation" && <EquationChecker />}
      {tab === "quantity" && <QuantityComparison />}
      {tab === "constants" && <Constants />}
    </div>
  );
}
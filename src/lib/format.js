// Display formatting helpers. Internal precision is preserved in calculations;
// rounding happens only here, at display time.

export function fmt(value, sig = 4) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  const v = parseFloat(value.toPrecision(sig));
  return v.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

export function todayIndex(length) {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start.getTime()) / 86400000);
  return day % length;
}
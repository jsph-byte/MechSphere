import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";

/** Generates `steps`+1 points from `from` to `to` (inclusive), mapped through fn.
 *  fn returns an object of series values for that x, or null to skip the point. */
export function sweep(from, to, steps, fn) {
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const x = from + ((to - from) * i) / steps;
    const row = fn(x);
    if (row) out.push({ x, ...row });
  }
  return out;
}

/**
 * Auto-updating line chart for experiment sweeps. Data is recomputed by the
 * parent on every render, so the curves track the current inputs live.
 * The dashed orange marker shows the current trial point.
 * Curves are model output (from the lab's stated equations), not measured data.
 */
export default function ExperimentChart({ title, note, data, series, xLabel, xMarker, height = 240 }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="p-3">
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 20, bottom: 22, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.25} />
              <XAxis
                dataKey="x"
                type="number"
                domain={["dataMin", "dataMax"]}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                stroke="#94a3b8"
                strokeOpacity={0.5}
                label={{ value: xLabel, position: "insideBottom", offset: -12, fontSize: 11, fill: "#94a3b8" }}
              />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} stroke="#94a3b8" strokeOpacity={0.5} width={54} />
              <Tooltip
                formatter={(value, name) => [Number(value).toPrecision(4), name]}
                labelFormatter={(x) => `${xLabel.replace(/\s*\(.*\)$/, "")}: ${Number(x).toPrecision(4)}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {xMarker !== undefined && Number.isFinite(xMarker) && (
                <ReferenceLine
                  x={xMarker}
                  stroke="#f97316"
                  strokeDasharray="5 4"
                  label={{ value: "current", position: "top", fontSize: 10, fill: "#f97316" }}
                />
              )}
              {series.map((ser) => (
                <Line
                  key={ser.key}
                  type="monotone"
                  dataKey={ser.key}
                  name={ser.name}
                  stroke={ser.color}
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        {note && <p className="px-1 pt-2 text-[11px] leading-relaxed text-muted-foreground">{note}</p>}
      </div>
    </div>
  );
}
import React from "react";
import { cn } from "@/lib/utils";

/** Slider + numeric input combo with unit label and validation error. */
export default function ControlSlider({
  label, value, onChange, min, max, step, unit, error, help, precision = 2,
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}{unit && <span className="ml-1 font-mono normal-case text-cyan-400">({unit})</span>}
        </label>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? "" : Number(v));
          }}
          aria-label={label}
          className={cn(
            "w-24 rounded-md border bg-background px-2 py-1 text-right font-mono text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            error ? "border-destructive" : "border-input"
          )}
        />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} slider`}
        className="w-full accent-orange-500"
      />
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      {error && <div className="text-xs font-medium text-destructive">{error}</div>}
      {help && !error && <div className="text-[11px] leading-snug text-muted-foreground">{help}</div>}
    </div>
  );
}
"use client";

import { useId } from "react";

export interface GradientValue {
  color: string;
  gradient: string;
}

interface GradientPickerProps {
  value: GradientValue;
  onChange: (value: GradientValue) => void;
}

// A handful of ready-made looks. Each one is just a base color — the actual
// CSS gradient is generated from it, so presets and custom picks share the
// same code path.
const PRESET_COLORS = [
  { name: "Green", color: "#16a34a" },
  { name: "Blue", color: "#2563eb" },
  { name: "Purple", color: "#7c3aed" },
  { name: "Pink", color: "#db2777" },
  { name: "Orange", color: "#ea580c" },
  { name: "Red", color: "#dc2626" },
  { name: "Teal", color: "#0d9488" },
  { name: "Slate", color: "#475569" },
];

/** #rrggbb -> [h, s, l] */
function hexToHsl(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

/** [h, s, l] -> #rrggbb */
function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Builds a 3-stop diagonal gradient from a single base color by shifting
 * lightness up and down. This is what lets a person pick ONE color and get
 * a good-looking gradient automatically, with no CSS or Tailwind involved.
 */
function gradientFromColor(hex: string): string {
  const [h, s, l] = hexToHsl(hex);
  const darker = hslToHex(h, s, clamp(l - 12, 8, 92));
  const lighter = hslToHex(h, s, clamp(l + 18, 8, 92));
  return `linear-gradient(135deg, ${darker} 0%, ${hex} 50%, ${lighter} 100%)`;
}

export function GradientPicker({ value, onChange }: GradientPickerProps) {
  const colorInputId = useId();

  function applyColor(color: string) {
    onChange({ color, gradient: gradientFromColor(color) });
  }

  return (
    <div className="space-y-3">
      {/* Live preview — no code, no class names, just the result */}
      <div
        className="h-16 w-full rounded-xl border border-gray-200 shadow-inner"
        style={{ background: value.gradient || value.color }}
      />

      {/* Ready-made styles */}
      <div>
        <span className="mb-1.5 block text-xs font-medium text-gray-500">
          Quick styles
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((preset) => {
            const isSelected =
              value.color.toLowerCase() === preset.color.toLowerCase();
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyColor(preset.color)}
                title={preset.name}
                aria-label={preset.name}
                aria-pressed={isSelected}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  isSelected
                    ? "border-gray-900 ring-2 ring-gray-300"
                    : "border-white shadow-sm hover:scale-105"
                }`}
                style={{ background: gradientFromColor(preset.color) }}
              />
            );
          })}
        </div>
      </div>

      {/* Custom color — opens the OS color picker, no hex typing required */}
      <div className="flex items-center gap-3">
        <label
          htmlFor={colorInputId}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <span
            className="h-5 w-5 rounded-full border border-gray-300"
            style={{ backgroundColor: value.color }}
          />
          Choose a custom color
          <input
            id={colorInputId}
            type="color"
            value={value.color}
            onChange={(e) => applyColor(e.target.value)}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}

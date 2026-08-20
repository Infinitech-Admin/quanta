"use client";

import { Check, Plus, X } from "lucide-react";

interface FeatureListEditorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function FeatureListEditor({ value, onChange }: FeatureListEditorProps) {
  function updateAt(index: number, text: string) {
    const next = [...value];
    next[index] = text;
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addRow() {
    onChange([...value, ""]);
  }

  return (
    <div className="space-y-2">
      {value.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check className="h-3 w-3" />
          </span>
          <input
            type="text"
            value={feature}
            onChange={(e) => updateAt(index, e.target.value)}
            placeholder="e.g. Made from internationally certified Premium Eco-Pulp"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <button
            type="button"
            onClick={() => removeAt(index)}
            aria-label="Remove feature"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700"
      >
        <Plus className="h-3.5 w-3.5" />
        Add a point
      </button>
    </div>
  );
}

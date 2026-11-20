"use client";

import { useRef } from "react";
import { GripVertical, Plus, X } from "lucide-react";

interface BulletListFieldProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

const rowInputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

export function BulletListField({
  label,
  items,
  onChange,
  placeholder = "Add a line…",
  helperText,
}: BulletListFieldProps) {
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  function updateItem(index: number, value: string) {
    const next = [...items];
    next[index] = value;
    onChange(next);
  }

  function addItem(afterIndex?: number) {
    const insertAt = afterIndex === undefined ? items.length : afterIndex + 1;
    const next = [...items];
    next.splice(insertAt, 0, "");
    onChange(next);
    requestAnimationFrame(() => inputRefs.current[insertAt]?.focus());
  }

  function removeItem(index: number) {
    const next = items.filter((_, i) => i !== index);
    onChange(next);
    requestAnimationFrame(() =>
      inputRefs.current[Math.max(0, index - 1)]?.focus(),
    );
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(index);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      removeItem(index);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="space-y-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5">
        {items.length === 0 && (
          <p className="px-1 py-1 text-xs text-gray-400">
            No lines yet — add one below.
          </p>
        )}
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 shrink-0 text-gray-300" />
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={rowInputClass}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-600"
              aria-label="Remove line"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem()}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          <Plus className="h-3.5 w-3.5" />
          Add line
        </button>
      </div>
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}

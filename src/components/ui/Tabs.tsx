"use client";

import { useState } from "react";

export interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Controlled mode: pass value + onChange together if the parent owns state
   *  (e.g. Events page syncing tabs with URL filters). Otherwise Tabs manages
   *  its own state internally. */
  value?: string;
}

// Renders the tab strip only. Pair with your own conditional render below it
// (see Events listing page) rather than baking panel content in here — pages
// need the active tab value for filtering data too, not just showing content.
export function Tabs({ items, defaultValue, value, onChange }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const active = value ?? internalValue;

  const select = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div role="tablist" className="flex gap-1 border-b border-line">
      {items.map((item) => {
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => select(item.value)}
            className={`relative px-4 py-2.5 text-small font-medium transition-colors ${
              isActive ? "text-ink" : "text-ink-600 hover:text-ink"
            }`}
          >
            {item.label}
            {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-signal" />}
          </button>
        );
      })}
    </div>
  );
}

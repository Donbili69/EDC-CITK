"use client";

import { useState } from "react";
import type { TimelineMilestone } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";

// TODO (end of project): redesign the timeline. See docs/ROADMAP.md.
// Click a milestone to expand it; click again to collapse. The first
// (oldest) milestone starts open.
export function JourneyTimeline({ milestones }: { milestones: TimelineMilestone[] }) {
  const [active, setActive] = useState(0);

  return (
    <ol className="relative ml-1 border-l border-line">
      {milestones.map((m, i) => {
        const open = i === active;
        return (
          <li key={`${m.date}-${m.title}`} className="relative pb-8 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute top-2 -left-[5px] h-2.5 w-2.5 ${open ? "bg-signal" : "bg-ink-200"}`}
            />
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(open ? -1 : i)}
              className="text-left"
            >
              <span className="block text-micro text-ink-600">{formatDate(m.date)}</span>
              <span
                className={`block text-body font-medium ${open ? "text-ink" : "text-ink-600 hover:text-ink"}`}
              >
                {m.title}
              </span>
            </button>
            {open && <p className="mt-2 max-w-prose text-ink-600">{m.description}</p>}
          </li>
        );
      })}
    </ol>
  );
}

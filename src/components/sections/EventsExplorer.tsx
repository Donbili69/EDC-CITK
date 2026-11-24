"use client";

import { useMemo, useState } from "react";
import type { EventStatus, EventSummary } from "@/lib/types";
import { Tabs } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/sections/EventCard";

const PAGE_SIZE = 6;

interface EventsExplorerProps {
  events: EventSummary[];
  years: string[];
  categories: string[];
}

// Filtering happens client-side over the list the page passes in. When the
// real API arrives, this can move to query params + server-side filtering
// without changing how the UI looks. The page owns data; this owns interaction.
export function EventsExplorer({ events, years, categories }: EventsExplorerProps) {
  const [status, setStatus] = useState<EventStatus>("upcoming");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const counts = useMemo(
    () => ({
      upcoming: events.filter((e) => e.status === "upcoming").length,
      ongoing: events.filter((e) => e.status === "ongoing").length,
      past: events.filter((e) => e.status === "past").length,
    }),
    [events],
  );

  const filtered = useMemo(() => {
    const list = events.filter(
      (e) =>
        e.status === status &&
        (!year || e.academicYear === year) &&
        (!category || e.category === category),
    );
    // Upcoming/ongoing: soonest first. Past: most recent first.
    return list.sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return status === "past" ? -diff : diff;
    });
  }, [events, status, year, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = year !== "" || category !== "";

  return (
    <div>
      <Tabs
        value={status}
        onChange={(v) => {
          setStatus(v as EventStatus);
          setPage(1);
        }}
        items={[
          { value: "upcoming", label: `Upcoming (${counts.upcoming})` },
          { value: "ongoing", label: `Ongoing (${counts.ongoing})` },
          { value: "past", label: `Past (${counts.past})` },
        ]}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <Select
          id="filter-year"
          label="Academic year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Select
          id="filter-category"
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={() => {
              setYear("");
              setCategory("");
              setPage(1);
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      <div role="tabpanel" className="mt-8">
        {pageItems.length === 0 ? (
          <p className="border border-dashed border-line py-16 text-center text-ink-600">
            No {status} events match these filters.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

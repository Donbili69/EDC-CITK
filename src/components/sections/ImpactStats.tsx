import type { ImpactStat } from "@/lib/types";

export function ImpactStats({ stats }: { stats: ImpactStat[] }) {
  return (
    <section className="border-b border-line">
      <div className="container-page grid grid-cols-2 divide-x divide-line border-l border-r border-line md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-5 py-10 text-center md:px-8">
            <div className="font-display text-display-md font-medium md:text-display-lg">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="mt-1 text-small text-ink-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

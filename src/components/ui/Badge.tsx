import type { ReactNode } from "react";

type Tone = "neutral" | "signal" | "spark";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink-600",
  signal: "bg-signal-50 text-signal-700",
  spark: "bg-spark-100 text-spark-600",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-sm px-2.5 py-1 text-micro font-medium ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}

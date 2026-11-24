import type { EventStatus } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { statusLabels } from "@/lib/utils/format";

const tones = { upcoming: "signal", ongoing: "spark", past: "neutral" } as const;

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return <Badge tone={tones[status]}>{statusLabels[status]}</Badge>;
}

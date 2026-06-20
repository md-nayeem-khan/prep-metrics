"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RubricDimension } from "@/types/mock";

// Renders a 1–5 self-rating selector for each rubric dimension. Used by the mock
// Submit dialog for every interview type (coding / system design / behavioral) and
// is the same control the standalone practice pages use inline.
export function RubricScorer({
  dimensions,
  values,
  onChange,
}: {
  dimensions: RubricDimension[];
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
}) {
  return (
    <div className="space-y-2">
      {dimensions.map((d) => (
        <div key={d.key} className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">{d.label}</div>
            <div className="text-muted-foreground text-xs">{d.description}</div>
          </div>
          <Select
            value={String(values[d.key] || "")}
            onValueChange={(v) => onChange(d.key, Number(v))}
          >
            <SelectTrigger className="w-20 shrink-0">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}

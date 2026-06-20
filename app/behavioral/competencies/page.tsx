"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageContainer } from "@/components/layout/page-container";

interface Coverage {
  competency: string;
  type: string;
  company: string | null;
  status: "Strong" | "Developing" | "Gap";
  storyCount: number;
  strongStoryCount: number;
  practiceCount: number;
  avgOverallScore: number;
}

interface CoverageResponse {
  coverage: Coverage[];
  summary: { total: number; strong: number; developing: number; gap: number };
}

const statusStyles: Record<string, string> = {
  Strong: "border-emerald-500/40 bg-emerald-500/10",
  Developing: "border-amber-500/40 bg-amber-500/10",
  Gap: "border-muted bg-muted/30",
};

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Strong: "default",
  Developing: "secondary",
  Gap: "outline",
};

function CoverageGrid({ items }: { items: Coverage[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <div key={c.competency} className={`rounded-md border p-3 ${statusStyles[c.status]}`}>
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium">{c.competency}</span>
            <Badge variant={statusVariant[c.status]} className="shrink-0">{c.status}</Badge>
          </div>
          <div className="text-muted-foreground mt-1 text-xs">
            {c.storyCount} {c.storyCount === 1 ? "story" : "stories"}
            {c.strongStoryCount > 0 && ` (${c.strongStoryCount} strong)`}
            {c.practiceCount > 0 && ` · practiced ${c.practiceCount}× · avg ${c.avgOverallScore.toFixed(1)}`}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CompetenciesPage() {
  const [data, setData] = useState<CoverageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (typeFilter !== "all") params.set("type", typeFilter);
    fetch(`/api/behavioral/analytics/competency-coverage?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load coverage"))))
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [typeFilter]);

  const lps = data?.coverage.filter((c) => c.type === "LeadershipPrinciple") ?? [];
  const generic = data?.coverage.filter((c) => c.type !== "LeadershipPrinciple") ?? [];

  return (
    <PageContainer
      pageTitle="Competency Coverage"
      pageDescription="Where you have strong, practiced STAR stories — and where the gaps are"
      pageHeaderAction={
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All competencies</SelectItem>
            <SelectItem value="LeadershipPrinciple">Amazon LPs</SelectItem>
            <SelectItem value="Competency">Generic competencies</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      {loading ? (
        <div className="space-y-4"><Skeleton className="h-24 w-full" /><Skeleton className="h-72 w-full" /></div>
      ) : error || !data ? (
        <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <AlertCircle className="text-destructive/50 h-10 w-10" /><p className="text-muted-foreground text-sm">{error ?? "No data"}</p>
        </CardContent></Card>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Total", value: data.summary.total },
              { label: "Strong", value: data.summary.strong, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Developing", value: data.summary.developing, color: "text-amber-600 dark:text-amber-400" },
              { label: "Gaps", value: data.summary.gap, color: "text-red-600 dark:text-red-400" },
            ].map((s) => (
              <Card key={s.label}><CardContent className="py-4">
                <div className={`text-2xl font-bold ${s.color ?? ""}`}>{s.value}</div>
                <div className="text-muted-foreground text-xs">{s.label}</div>
              </CardContent></Card>
            ))}
          </div>

          {lps.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="text-primary h-4 w-4" /> Amazon Leadership Principles</CardTitle></CardHeader>
              <CardContent><CoverageGrid items={lps} /></CardContent>
            </Card>
          )}
          {generic.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="text-primary h-4 w-4" /> Generic Competencies</CardTitle></CardHeader>
              <CardContent><CoverageGrid items={generic} /></CardContent>
            </Card>
          )}
        </div>
      )}
    </PageContainer>
  );
}

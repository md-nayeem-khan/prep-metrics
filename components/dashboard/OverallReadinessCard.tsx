"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Award } from "lucide-react";
import { calculateOverallReadiness } from "@/lib/analytics/overall-readiness";

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Ready: "default",
  "Almost Ready": "secondary",
  "Not Ready": "outline",
};

async function readScore(url: string): Promise<number | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const total = data?.readinessScore?.breakdown?.totalQuestions ?? data?.readinessScore?.breakdown?.totalProblems ?? 0;
    if (!total) return null; // no data for this track yet
    return typeof data?.readinessScore?.score === "number" ? data.readinessScore.score : null;
  } catch {
    return null;
  }
}

export function OverallReadinessCard() {
  const [result, setResult] = useState<{ pct: number; level: string; tracks: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [coding, systemDesign, behavioral] = await Promise.all([
        readScore("/api/analytics/readiness"),
        readScore("/api/system-design/analytics/readiness"),
        readScore("/api/behavioral/analytics/readiness"),
      ]);
      const blended = calculateOverallReadiness({ coding, systemDesign, behavioral });
      const labels: Record<string, string> = { coding: "Coding", systemDesign: "System Design", behavioral: "Behavioral" };
      setResult({
        pct: Math.round(blended.score * 100),
        level: blended.level,
        tracks: blended.included.map((t) => labels[t] ?? t),
      });
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Card><CardHeader><Skeleton className="h-5 w-48" /></CardHeader><CardContent><Skeleton className="h-10 w-full" /></CardContent></Card>;
  }

  if (!result || result.tracks.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="text-primary h-4 w-4" /> Overall Interview Readiness</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground text-sm">Log attempts across tracks to see your blended readiness.</p></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Trophy className="text-primary h-4 w-4" /> Overall Interview Readiness</CardTitle>
        <CardDescription>Blended across {result.tracks.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold">{result.pct}%</span>
          <Badge variant={statusVariant[result.level]}>
            {result.level === "Ready" && <Award className="mr-1 h-3 w-3" />}
            {result.level}
          </Badge>
        </div>
        <Progress value={result.pct} className="h-2" />
      </CardContent>
    </Card>
  );
}

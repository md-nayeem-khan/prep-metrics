"use client";

import { useEffect, useState } from "react";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, AlertCircle, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface ReadinessData {
  score: number;
  status: "Ready" | "Almost Ready" | "Not Ready";
  tips: string[];
}

const STATUS_MIN: Record<ReadinessData["status"], number> = {
  Ready: 80,
  "Almost Ready": 60,
  "Not Ready": 0,
};

const statusVariant: Record<
  ReadinessData["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  Ready: "default",
  "Almost Ready": "secondary",
  "Not Ready": "outline",
};

export function ReadinessCard() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReadiness() {
      try {
        const response = await fetch("/api/analytics/readiness");
        if (!response.ok) throw new Error("Failed to fetch readiness data");
        const result = await response.json();
        const status = result.readinessScore.level as ReadinessData["status"];
        const rawScore = Number(result.readinessScore.score);
        const normalizedScore = Number.isFinite(rawScore) ? rawScore : STATUS_MIN[status] / 100;
        const correctedScore = Math.max(normalizedScore, STATUS_MIN[status] / 100);
        setData({ score: correctedScore, status, tips: result.recommendations || [] });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchReadiness();
  }, []);

  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-24" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            Error Loading Readiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error ?? "No data available"}</p>
        </CardContent>
      </Card>
    );
  }

  const pct = Math.round((data.score ?? 0) * 100);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          Interview Readiness
        </CardTitle>
        <CardDescription>Your overall readiness score</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {/* Score */}
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold">{pct}%</span>
          <Badge variant={statusVariant[data.status]}>
            {data.status === "Ready" && <Award className="mr-1 h-3 w-3" />}
            {data.status}
          </Badge>
        </div>
        <Progress value={pct} className="h-2" />

        {/* Tips */}
        {data.tips.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {data.tips.slice(0, 4).map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {tip}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

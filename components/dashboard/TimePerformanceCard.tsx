"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle, XCircle, MinusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TIME_BENCHMARKS } from "@/types";

interface TimeStats {
  easy: { avg: number; count: number; met: boolean; hasData: boolean };
  medium: { avg: number; count: number; met: boolean; hasData: boolean };
  hard: { avg: number; count: number; met: boolean; hasData: boolean };
}

const BENCHMARKS_MINUTES = {
  easy: TIME_BENCHMARKS.easy / 60,
  medium: TIME_BENCHMARKS.medium / 60,
  hard: TIME_BENCHMARKS.hard / 60,
} as const;

const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export function TimePerformanceCard() {
  const [stats, setStats] = useState<TimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTimeStats() {
      try {
        const response = await fetch("/api/analytics/readiness");
        if (!response.ok) throw new Error("Failed to fetch time stats");
        const data = await response.json();
        const difficulties = data.byDifficulty || {};
        setStats({
          easy: {
            avg: Math.round(difficulties.easy?.avgTimeMinutes ?? 0),
            count: difficulties.easy?.solved ?? 0,
            hasData: (difficulties.easy?.solved ?? 0) > 0,
            met:
              (difficulties.easy?.solved ?? 0) > 0 &&
              (difficulties.easy?.avgTimeMinutes ?? 0) <= BENCHMARKS_MINUTES.easy,
          },
          medium: {
            avg: Math.round(difficulties.medium?.avgTimeMinutes ?? 0),
            count: difficulties.medium?.solved ?? 0,
            hasData: (difficulties.medium?.solved ?? 0) > 0,
            met:
              (difficulties.medium?.solved ?? 0) > 0 &&
              (difficulties.medium?.avgTimeMinutes ?? 0) <= BENCHMARKS_MINUTES.medium,
          },
          hard: {
            avg: Math.round(difficulties.hard?.avgTimeMinutes ?? 0),
            count: difficulties.hard?.solved ?? 0,
            hasData: (difficulties.hard?.solved ?? 0) > 0,
            met:
              (difficulties.hard?.solved ?? 0) > 0 &&
              (difficulties.hard?.avgTimeMinutes ?? 0) <= BENCHMARKS_MINUTES.hard,
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchTimeStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            Error Loading Time Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error ?? "No data available"}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Time Performance
        </CardTitle>
        <CardDescription>Average solve time vs target by difficulty</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {DIFFICULTIES.map((d) => {
          const s = stats[d];
          return (
            <div
              key={d}
              className={cn(
                "flex items-center justify-between rounded-lg border p-3",
                !s.hasData
                  ? "bg-muted/30"
                  : s.met
                  ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                  : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
              )}
            >
              <div className="flex items-center gap-3">
                {!s.hasData ? (
                  <MinusCircle className="h-4 w-4 text-muted-foreground" />
                ) : s.met ? (
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
                <div>
                  <p className="text-sm font-medium capitalize">{d}</p>
                  <p className="text-xs text-muted-foreground">{s.count} solved</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {s.hasData ? `${s.avg} min` : "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  target ≤{BENCHMARKS_MINUTES[d]} min
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

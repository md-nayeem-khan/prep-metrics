"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DailyProgressData {
  problemsSolved: number;
  timeSpentHours: number;
  dailyGoal: number;
}

export function DailyProgressCard() {
  const [data, setData] = useState<DailyProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDailyProgress() {
      try {
        const response = await fetch("/api/analytics/daily-progress?days=1&streak=true");
        if (!response.ok) throw new Error("Failed to fetch daily progress");
        const result = await response.json();
        const todayActivity = Array.isArray(result.data) ? result.data[0] : null;
        setData({
          problemsSolved: todayActivity?.problemsSolved || 0,
          timeSpentHours: (todayActivity?.totalTimeMinutes || 0) / 60,
          dailyGoal: 2,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchDailyProgress();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-32" />
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
            Error Loading Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error ?? "No data available"}</p>
        </CardContent>
      </Card>
    );
  }

  const goalProgress = Math.min((data.problemsSolved / data.dailyGoal) * 100, 100);
  const goalMet = data.problemsSolved >= data.dailyGoal;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck2 className="h-4 w-4 text-primary" />
          Today&apos;s Progress
        </CardTitle>
        <CardDescription>Problems solved and time invested today</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-4xl font-bold">{data.problemsSolved}</span>
            <span className="ml-1 text-sm text-muted-foreground">/ {data.dailyGoal} goal</span>
          </div>
          {goalMet && (
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Goal met!
            </Badge>
          )}
        </div>

        <Progress value={goalProgress} className="h-2" />

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Hours today</p>
            <p className="text-xl font-semibold">{data.timeSpentHours.toFixed(1)}h</p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Completion</p>
            <p className="text-xl font-semibold">{Math.round(goalProgress)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

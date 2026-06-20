"use client";

import { useEffect, useState } from "react";
import { BarChart3, Clock, Flame, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardHeaderStatsData {
  totalProblemsSolved: number;
  totalStudyHours: number;
  dailyAverageHours: number;
  currentStreak: number;
}

const stats = [
  {
    key: "totalProblemsSolved" as const,
    label: "Total Problems Solved",
    icon: BarChart3,
    format: (v: number) => String(v),
  },
  {
    key: "totalStudyHours" as const,
    label: "Total Study Time",
    icon: Clock,
    format: (v: number) => `${v}h`,
  },
  {
    key: "dailyAverageHours" as const,
    label: "Weekly Study Time",
    icon: Sparkles,
    format: (v: number) => `${v}h`,
  },
  {
    key: "currentStreak" as const,
    label: "Current Streak",
    icon: Flame,
    format: (v: number) => `${v} days`,
  },
];

export function DashboardHeaderStats() {
  const [data, setData] = useState<DashboardHeaderStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [statsRes, streakRes] = await Promise.all([
          fetch("/api/analytics/stats"),
          fetch("/api/analytics/streak?days=30"),
        ]);

        if (!statsRes.ok || !streakRes.ok) {
          throw new Error("Failed to fetch dashboard header stats");
        }

        const [statsData, streak] = await Promise.all([
          statsRes.json(),
          streakRes.json(),
        ]);

        setData({
          totalProblemsSolved:
            statsData.totalProblemsSolvedUnique ?? statsData.totalSolvedSubmissions ?? 0,
          totalStudyHours:
            Math.round(((statsData.totalTimeMinutes || 0) / 60) * 10) / 10,
          dailyAverageHours:
            Math.round(((streak.weeklyStats?.totalTimeSpent || 0) / 3600) * 10) / 10,
          currentStreak: streak.currentStreak || 0,
        });
      } catch {
        setData({
          totalProblemsSolved: 0,
          totalStudyHours: 0,
          dailyAverageHours: 0,
          currentStreak: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {stats.map(({ key, label, icon: Icon, format }) => (
        <Card key={key}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold text-foreground">
                  {data ? format(data[key]) : "—"}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

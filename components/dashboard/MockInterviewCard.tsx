"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, CheckCircle2, XCircle, Play, AlertCircle } from "lucide-react";
import Link from "next/link";
import { MOCK_TYPE_CONFIG, getMockTypeConfig } from "@/types/mock";
import type { MockTypeStats } from "@/lib/analytics/mock-metrics";

interface RecentInterview {
  id: string;
  date: string;
  label: string;
  type: string;
  solved: boolean;
  overallScore: number;
}

interface MockInterviewStats {
  totalCompleted: number;
  totalPassed: number;
  passRate: number;
  byType: MockTypeStats[];
  recentInterviews: RecentInterview[];
}

interface ApiMock {
  id: number | string;
  type: string;
  date: string;
  solved: boolean;
  overallScore?: number;
  problem?: { title?: string };
  systemDesignQuestion?: { title?: string };
  behavioralQuestion?: { prompt?: string };
}

const labelFor = (i: ApiMock): string =>
  i.problem?.title ?? i.systemDesignQuestion?.title ?? i.behavioralQuestion?.prompt ?? "Mock";

export function MockInterviewCard() {
  const [stats, setStats] = useState<MockInterviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMockStats() {
      try {
        const response = await fetch("/api/mock-interviews?limit=5&recent=true");
        if (!response.ok) throw new Error("Failed to fetch mock interview data");
        const data = await response.json();
        const interviews: ApiMock[] = data.mockInterviews || [];
        const s = data.stats;
        setStats({
          totalCompleted: s?.completed ?? 0,
          totalPassed: s?.passed ?? 0,
          passRate: s?.passRate ?? 0,
          byType: (s?.byType ?? []).filter((t: MockTypeStats) => t.total > 0),
          recentInterviews: interviews.slice(0, 5).map((i) => ({
            id: String(i.id),
            date: i.date,
            label: labelFor(i),
            type: i.type,
            solved: i.solved,
            overallScore: i.overallScore || 0,
          })),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchMockStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-5 w-36" /></CardHeader>
        <CardContent className="space-y-3"><Skeleton className="h-20 w-full" /><Skeleton className="h-10 w-full" /></CardContent>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" /> Error Loading Mock Interviews
          </CardTitle>
        </CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">{error ?? "No data"}</p></CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" /> Mock Interviews
        </CardTitle>
        <CardDescription>
          {stats.totalCompleted > 0
            ? `${stats.totalCompleted} completed · ${Math.round(stats.passRate)}% pass rate`
            : "No mock interviews yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {stats.byType.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {stats.byType.map((t) => {
              const cfg = MOCK_TYPE_CONFIG[t.type];
              const Icon = cfg.icon;
              return (
                <div key={t.type} className="rounded-lg border bg-muted/50 p-2 text-center">
                  <Icon className="mx-auto h-3.5 w-3.5 text-muted-foreground" />
                  <p className="mt-1 text-lg font-bold">{t.completed}</p>
                  <p className="text-xs text-muted-foreground">{cfg.shortLabel}</p>
                </div>
              );
            })}
          </div>
        )}

        {stats.recentInterviews.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Recent results</p>
            <div className="flex items-center gap-2">
              {stats.recentInterviews.map((i) => (
                <div
                  key={i.id}
                  title={`${getMockTypeConfig(i.type).shortLabel}: ${i.label} · ${i.overallScore}/5`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${i.solved ? "bg-emerald-500" : "bg-destructive"}`}
                >
                  {i.solved ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button asChild className="mt-auto">
          <Link href="/mock">
            <Play className="mr-2 h-4 w-4" />
            {stats.totalCompleted === 0 ? "Start First Interview" : "Start Mock Interview"}
          </Link>
        </Button>

        {stats.totalCompleted > 0 && (
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            {stats.passRate >= 70 ? "Great progress!" : "Keep practicing!"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

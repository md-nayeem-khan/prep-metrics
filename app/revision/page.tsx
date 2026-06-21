"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Calendar,
  RotateCcw,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";
import {
  dayKey,
  addDays as addTzDays,
  startOfDayInstant,
  formatInTimeZone,
  relativeDayLabel,
} from "@/lib/datetime/tz";
import { useTimezone } from "@/components/providers/timezone-provider";

interface RevisionItem {
  id: number;
  problemId: number;
  problemTitle: string;
  pattern: string;
  difficulty: "Easy" | "Medium" | "Hard";
  dueDate: string;
  interval: number;
  repetition: number;
  isOverdue: boolean;
  company?: string;
}

const DIFF_COLORS: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300",
  Hard: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300",
};

function getDateLabel(dateStr: string, isOverdue: boolean, tz: string) {
  if (isOverdue) return "Overdue";
  try {
    const date = new Date(dateStr);
    return relativeDayLabel(date, tz) ?? formatInTimeZone(date, tz, { month: "short", day: "numeric" });
  } catch {
    return "Unknown";
  }
}

export default function RevisionPage() {
  const router = useRouter();
  const { timezone } = useTimezone();
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRevisions() {
      try {
        const response = await fetch("/api/revisions");
        if (!response.ok) throw new Error("Failed to fetch revisions");
        const data = await response.json();
        const all = [...(data.dueToday || []), ...(data.upcoming || [])];
        const startOfToday = startOfDayInstant(new Date(), timezone);
        setRevisions(
          all.map((item: { id: number; submission?: { problem?: { id?: number; title?: string; patterns?: Array<{ pattern?: { name?: string } }>; difficulty?: string; company?: string } }; problemId?: number; nextReviewDate: string; intervalLevel?: number; repetitionCount?: number }) => ({
            id: item.id,
            problemId: item.submission?.problem?.id ?? item.problemId ?? 0,
            problemTitle: item.submission?.problem?.title ?? `Problem ${item.problemId}`,
            pattern: item.submission?.problem?.patterns?.[0]?.pattern?.name ?? "Unknown",
            difficulty: (item.submission?.problem?.difficulty ?? "Medium") as "Easy" | "Medium" | "Hard",
            dueDate: item.nextReviewDate,
            interval: item.intervalLevel ?? 0,
            repetition: item.repetitionCount ?? 0,
            isOverdue: new Date(item.nextReviewDate) < startOfToday,
            company: item.submission?.problem?.company,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load revisions");
      } finally {
        setLoading(false);
      }
    }
    fetchRevisions();
  }, [timezone]);

  const todayKey = dayKey(new Date(), timezone);
  const todayRevisions = revisions.filter(
    (r) => dayKey(new Date(r.dueDate), timezone) === todayKey || r.isOverdue
  );
  const upcomingRevisions = revisions.filter((r) => {
    const d = new Date(r.dueDate);
    return d >= addTzDays(new Date(), 1, timezone) && d < addTzDays(new Date(), 8, timezone);
  });

  if (loading) {
    return (
      <PageContainer pageTitle="Revision Schedule" pageDescription="Spaced repetition system for long-term retention">
        <div className="grid gap-6 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-36" />
                <Skeleton className="mt-1 h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-16 w-full rounded-lg" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer pageTitle="Revision Schedule">
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle className="h-10 w-10 text-destructive/50" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      pageTitle="Revision Schedule"
      pageDescription="Spaced repetition system for long-term retention"
      pageHeaderAction={
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <RotateCcw className="h-3 w-3" />
            {todayRevisions.length} Due Today
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <Clock className="h-3 w-3" />
            {upcomingRevisions.length} This Week
          </Badge>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Today&apos;s Reviews
            </CardTitle>
            <CardDescription>{todayRevisions.length} item{todayRevisions.length !== 1 ? "s" : ""} due</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayRevisions.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <p className="text-sm font-medium">All caught up for today!</p>
                <p className="text-xs text-muted-foreground">Great work on staying consistent.</p>
              </div>
            ) : (
              todayRevisions.slice(0, 8).map((r) => (
                <div
                  key={r.id}
                  className="flex items-start justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => router.push(`/problems/${r.problemId}?from=revision`)}
                      className="text-sm font-medium text-left hover:underline line-clamp-1"
                    >
                      {r.problemTitle}
                    </button>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                          DIFF_COLORS[r.difficulty] ?? DIFF_COLORS.Medium
                        )}
                      >
                        {r.difficulty}
                      </span>
                      <Badge variant="outline" className="text-xs">{r.pattern}</Badge>
                      {r.isOverdue && (
                        <Badge variant="destructive" className="text-xs">Overdue</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Upcoming This Week
            </CardTitle>
            <CardDescription>{upcomingRevisions.length} item{upcomingRevisions.length !== 1 ? "s" : ""} scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingRevisions.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <RotateCcw className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-medium">No upcoming revisions this week</p>
                <p className="text-xs text-muted-foreground">Keep solving to build your queue!</p>
              </div>
            ) : (
              upcomingRevisions.slice(0, 8).map((r) => (
                <div
                  key={r.id}
                  className="flex items-start justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => router.push(`/problems/${r.problemId}?from=revision`)}
                      className="text-sm font-medium text-left hover:underline line-clamp-1"
                    >
                      {r.problemTitle}
                    </button>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                          DIFF_COLORS[r.difficulty] ?? DIFF_COLORS.Medium
                        )}
                      >
                        {r.difficulty}
                      </span>
                      <Badge variant="outline" className="text-xs">{r.pattern}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {getDateLabel(r.dueDate, r.isOverdue, timezone)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

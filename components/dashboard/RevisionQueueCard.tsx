"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Calendar, AlertCircle } from "lucide-react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import Link from "next/link";

interface RevisionItem {
  id: string;
  problemTitle: string;
  pattern: string;
  nextReviewDate: string;
  intervalLevel: number;
  isOverdue: boolean;
}

function getDateLabel(dateStr: string, isOverdue: boolean) {
  if (isOverdue) return "Overdue";
  try {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  } catch {
    return "Unknown";
  }
}

export function RevisionQueueCard() {
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRevisions() {
      try {
        const response = await fetch("/api/revisions");
        if (!response.ok) throw new Error("Failed to fetch revisions");
        const data = await response.json();
        const now = new Date();
        const dueRevisions: RevisionItem[] = (data.dueToday || []).map((rev: { id: string; submission?: { problem?: { title?: string; patterns?: Array<{ pattern?: { name?: string } }> } }; nextReviewDate: string; intervalLevel: number }) => ({
          id: rev.id,
          problemTitle: rev.submission?.problem?.title || "Unknown Problem",
          pattern: rev.submission?.problem?.patterns?.[0]?.pattern?.name || "No Pattern",
          nextReviewDate: rev.nextReviewDate,
          intervalLevel: rev.intervalLevel,
          isOverdue: new Date(rev.nextReviewDate) < now,
        }));
        setRevisions(dueRevisions.slice(0, 5));
        setUpcomingCount(data.upcoming?.length || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchRevisions();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            Error Loading Revisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-primary" />
              Revision Queue
            </CardTitle>
            <CardDescription className="mt-1">
              {revisions.length === 0
                ? upcomingCount > 0
                  ? `${upcomingCount} upcoming this week`
                  : "All caught up!"
                : `${revisions.length} due today`}
            </CardDescription>
          </div>
          {revisions.length > 0 && (
            <Badge>{revisions.length}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        {revisions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center gap-1">
            <p className="text-2xl">🎉</p>
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs text-muted-foreground">No revisions due today</p>
            {upcomingCount > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {upcomingCount} upcoming in the next 7 days
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {revisions.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-lg border bg-muted/30 p-3 space-y-1.5"
                >
                  <p className="text-sm font-medium truncate">{rev.problemTitle}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{rev.pattern}</Badge>
                    <Badge
                      variant={rev.isOverdue ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      <Calendar className="mr-1 h-2.5 w-2.5" />
                      {getDateLabel(rev.nextReviewDate, rev.isOverdue)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            {upcomingCount > 0 && (
              <p className="text-xs text-center text-muted-foreground pt-1">
                +{upcomingCount} more revision{upcomingCount !== 1 ? "s" : ""} this week
              </p>
            )}
          </>
        )}
        <Button asChild variant="outline" className="mt-auto">
          <Link href="/revision">
            <RotateCcw className="mr-2 h-4 w-4" />
            Go to Revision
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

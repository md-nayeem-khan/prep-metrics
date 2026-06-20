"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Clock, HelpCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Weakness {
  pattern: string;
  reason: string;
  avgTime: number;
  hintUsageRate: number;
  problemCount: number;
  recommendation: string;
}

export function WeakAreasCard() {
  const [weaknesses, setWeaknesses] = useState<Weakness[]>([]);
  const [totalPatternsAnalyzed, setTotalPatternsAnalyzed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeaknesses() {
      try {
        const response = await fetch("/api/analytics/weaknesses?minProblems=2&timeframe=month");
        if (!response.ok) throw new Error("Failed to fetch weakness data");
        const data = await response.json();

        const weaknessData: Weakness[] = [];

        if (data.weakPatterns) {
          data.weakPatterns.forEach((p: { pattern: string; avgTime: number; hintUsageRate: number; count: number }) => {
            weaknessData.push({
              pattern: p.pattern,
              reason: "Slow Completion",
              avgTime: p.avgTime || 0,
              hintUsageRate: p.hintUsageRate || 0,
              problemCount: p.count || 0,
              recommendation: `Practice more ${p.pattern} problems to improve speed`,
            });
          });
        }

        if (data.hintDependentPatterns) {
          data.hintDependentPatterns.forEach((p: { pattern: string; avgTime: number; hintUsageRate: number; count: number }) => {
            if (!weaknessData.find((w) => w.pattern === p.pattern)) {
              weaknessData.push({
                pattern: p.pattern,
                reason: "High Hint Usage",
                avgTime: p.avgTime || 0,
                hintUsageRate: p.hintUsageRate || 0,
                problemCount: p.count || 0,
                recommendation: `Focus on understanding ${p.pattern} fundamentals`,
              });
            }
          });
        }

        if (data.recommendations?.length) {
          weaknessData.forEach((w, i) => {
            if (data.recommendations[i]) w.recommendation = data.recommendations[i];
          });
        }

        setWeaknesses(weaknessData.slice(0, 4));
        setTotalPatternsAnalyzed(data.summary?.totalPatternsAnalyzed || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchWeaknesses();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
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
            Error Loading Weaknesses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (weaknesses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Weak Areas
          </CardTitle>
          <CardDescription>Identifying improvement opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
            {totalPatternsAnalyzed === 0 ? (
              <>
                <AlertTriangle className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No problems solved yet</p>
                <p className="text-xs text-muted-foreground">
                  Start solving problems to identify areas for improvement
                </p>
              </>
            ) : (
              <>
                <CheckCircle className="h-10 w-10 text-green-500" />
                <p className="text-sm font-medium">Excellent performance!</p>
                <p className="text-xs text-muted-foreground">No weak areas detected. Keep it up!</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-primary" />
          Weak Areas
        </CardTitle>
        <CardDescription>
          {weaknesses.length} area{weaknesses.length !== 1 ? "s" : ""} need attention
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {weaknesses.map((w) => {
          const isCritical = w.avgTime > 40 || w.hintUsageRate > 0.5;
          return (
            <div
              key={w.pattern}
              className={cn(
                "rounded-lg border p-3 space-y-2",
                isCritical
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{w.pattern}</span>
                <Badge variant="outline" className="text-xs">
                  {w.reason}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {w.avgTime} min avg
                </span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  {Math.round(w.hintUsageRate * 100)}% hints
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{w.recommendation}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

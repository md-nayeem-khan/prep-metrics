"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatternStat {
  pattern: string;
  solved: number;
  avgTime: number;
  confidence: "Weak" | "Medium" | "Strong";
  hintUsageRate: number;
}

const CONFIDENCE_CONFIG = {
  Strong: { variant: "default" as const, value: 90, label: "Strong" },
  Medium: { variant: "secondary" as const, value: 55, label: "Medium" },
  Weak: { variant: "outline" as const, value: 20, label: "Weak" },
};

export function PatternStrengthCard() {
  const [patterns, setPatterns] = useState<PatternStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatterns() {
      try {
        const response = await fetch("/api/analytics/patterns/confidence");
        if (!response.ok) throw new Error("Failed to fetch pattern data");
        const data = await response.json();
        const patternStats: PatternStat[] = data.patterns.map((p: { pattern: string; totalSolved: number; avgTimeSeconds: number; confidence: "Weak" | "Medium" | "Strong"; hintUsageRate: number }) => ({
          pattern: p.pattern,
          solved: p.totalSolved,
          avgTime: Math.round(p.avgTimeSeconds / 60),
          confidence: p.confidence,
          hintUsageRate: p.hintUsageRate,
        }));
        setPatterns(
          patternStats.sort((a, b) => {
            const order = { Strong: 0, Medium: 1, Weak: 2 };
            return order[a.confidence] - order[b.confidence];
          })
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load pattern data");
      } finally {
        setLoading(false);
      }
    }
    fetchPatterns();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
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
            Error Loading Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const strongCount = patterns.filter((p) => p.confidence === "Strong").length;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          Pattern Strength
        </CardTitle>
        <CardDescription>
          {patterns.length > 0
            ? `${strongCount}/${patterns.length} patterns mastered`
            : "Pattern mastery analysis"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {patterns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
            <Brain className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No patterns practiced yet</p>
            <p className="text-xs text-muted-foreground">
              Start solving problems to see pattern analysis
            </p>
          </div>
        ) : (
          patterns.slice(0, 6).map((p) => {
            const cfg = CONFIDENCE_CONFIG[p.confidence];
            return (
              <div key={p.pattern} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium truncate">{p.pattern}</span>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-xs text-muted-foreground">{p.solved} solved</span>
                    <Badge variant={cfg.variant} className="text-xs">
                      {cfg.label}
                    </Badge>
                  </div>
                </div>
                <Progress value={cfg.value} className="h-1.5" />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Gauge, Award, AlertCircle } from "lucide-react";

interface ReadinessResponse {
  readinessScore: { score: number; level: "Ready" | "Almost Ready" | "Not Ready"; breakdown: { totalQuestions: number; strongAnswers: number; assistedAnswers: number; weakAnswers: number } };
  metrics: { scoredQuestions: number; avgOverallScore: number; quantifiedRate: number };
  recommendations: string[];
}

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Ready: "default",
  "Almost Ready": "secondary",
  "Not Ready": "outline",
};

export function BehavioralReadinessCard() {
  const [data, setData] = useState<ReadinessResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/behavioral/analytics/readiness")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load"))))
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-5 w-48" /><Skeleton className="h-4 w-64" /></CardHeader>
        <CardContent className="space-y-3"><Skeleton className="h-2 w-full" /><Skeleton className="h-4 w-24" /></CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-destructive flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Behavioral Readiness</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground text-sm">{error ?? "No data"}</p></CardContent>
      </Card>
    );
  }

  const { readinessScore: rs, metrics } = data;
  const pct = Math.round((rs.score ?? 0) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Gauge className="text-primary h-4 w-4" /> Behavioral Readiness</CardTitle>
        <CardDescription>STAR rubric-driven readiness across practiced questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold">{pct}%</span>
          <Badge variant={statusVariant[rs.level]}>
            {rs.level === "Ready" && <Award className="mr-1 h-3 w-3" />}
            {rs.level}
          </Badge>
        </div>
        <Progress value={pct} className="h-2" />
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div><div className="text-emerald-600 dark:text-emerald-400 font-semibold">{rs.breakdown.strongAnswers}</div><div className="text-muted-foreground text-xs">Strong</div></div>
          <div><div className="text-amber-600 dark:text-amber-400 font-semibold">{rs.breakdown.assistedAnswers}</div><div className="text-muted-foreground text-xs">Assisted</div></div>
          <div><div className="text-red-600 dark:text-red-400 font-semibold">{rs.breakdown.weakAnswers}</div><div className="text-muted-foreground text-xs">Weak</div></div>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>Avg score: <span className="text-foreground font-medium">{metrics.avgOverallScore.toFixed(1)}/5</span></span>
          <span>Quantified: <span className="text-foreground font-medium">{Math.round(metrics.quantifiedRate * 100)}%</span></span>
        </div>
        {data.recommendations.length > 0 && (
          <ul className="space-y-1.5">
            {data.recommendations.slice(0, 3).map((tip, i) => (
              <li key={i} className="text-muted-foreground flex items-start gap-2 text-sm">
                <span className="bg-primary mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" />{tip}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  READINESS_ALMOST_READY_THRESHOLD,
  READINESS_READY_THRESHOLD,
} from "@/types";

interface CompanyReadiness {
  company: string;
  percentage: number;
  problemsSolved: number;
  readiness: "Ready" | "Almost Ready" | "Not Ready";
}

export function CompanyReadinessCard() {
  const [companies, setCompanies] = useState<CompanyReadiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanyReadiness() {
      try {
        const response = await fetch("/api/analytics/company?timeframe=month");
        if (!response.ok) throw new Error("Failed to fetch company data");
        const data = await response.json();
        const companyData: CompanyReadiness[] = (data.companies ?? []).map((c: { company: string; readinessScore?: number; readinessLevel?: string; problemsSolved?: number }) => {
          const score = c.readinessScore ?? 0;
          const readiness =
            c.readinessLevel ||
            (score >= READINESS_READY_THRESHOLD
              ? "Ready"
              : score >= READINESS_ALMOST_READY_THRESHOLD
              ? "Almost Ready"
              : "Not Ready");
          return {
            company: c.company,
            percentage: Math.round(score * 100),
            problemsSolved: c.problemsSolved || 0,
            readiness,
          };
        });
        setCompanies(companyData.sort((a, b) => b.percentage - a.percentage));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanyReadiness();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
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
            Error Loading Company Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const badgeVariant = (r: string) =>
    r === "Ready" ? "default" : r === "Almost Ready" ? "secondary" : "outline";

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          Company Readiness
        </CardTitle>
        <CardDescription>{companies.length} companies tracked</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {companies.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No company data yet. Start solving company-specific problems!
          </p>
        ) : (
          companies.map((c) => (
            <div key={c.company} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{c.company}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{c.percentage}%</span>
                  <Badge variant={badgeVariant(c.readiness)} className="text-xs">
                    {c.readiness}
                  </Badge>
                </div>
              </div>
              <Progress value={c.percentage} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{c.problemsSolved} problems solved</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { BarChart3, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";

interface HighlightsData {
  dailyProgress: Array<{
    date: string;
    problems: number;
    timeSpent: number;
  }>;
}

export function AnalyticsHighlightsCard() {
  const [data, setData] = useState<HighlightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHighlights() {
      try {
        const progressRes = await fetch("/api/analytics/daily-progress?days=30");
        if (!progressRes.ok) throw new Error("Failed to fetch analytics highlights");
        const progress = await progressRes.json();
        const rows = Array.isArray(progress.data) ? progress.data : [];
        setData({
          dailyProgress: rows.map((day: { date: string; problemsSolved?: number; totalTimeMinutes?: number }) => ({
            date: new Date(day.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            problems: day.problemsSolved || 0,
            timeSpent: Math.round(((day.totalTimeMinutes || 0) / 60) * 10) / 10,
          })),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics highlights");
      } finally {
        setLoading(false);
      }
    }
    fetchHighlights();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-lg" />
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
            Analytics Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error ?? "No data available"}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          Daily Progress (Last 30 Days)
        </CardTitle>
        <CardDescription>Problems solved and hours spent per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data.dailyProgress}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                background: "var(--popover)",
                color: "var(--popover-foreground)",
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="problems"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              name="Problems Solved"
              opacity={0.85}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="timeSpent"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Hours Spent"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

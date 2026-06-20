"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageContainer } from "@/components/layout/page-container";

interface TopicStat {
  topic: string;
  category: string;
  totalQuestions: number;
  attempted: number;
  avgOverallScore: number;
  confidence: "Weak" | "Medium" | "Strong";
  masteryPercentage: number;
}

interface TopicsResponse {
  topics: TopicStat[];
  summary: { totalTopics: number; strong: number; medium: number; weak: number; avgMastery: number };
  categorySummary: { category: string; topicCount: number; avgMastery: number }[];
}

const confidenceVariant: Record<string, "default" | "secondary" | "outline"> = {
  Strong: "default",
  Medium: "secondary",
  Weak: "outline",
};

export default function SystemDesignTopicsPage() {
  const [data, setData] = useState<TopicsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/system-design/analytics/topics")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load topics"))))
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer
      pageTitle="System Design Topics"
      pageDescription="Mastery across core building-block topics, derived from your rubric self-ratings"
    >
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      ) : error || !data ? (
        <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <AlertCircle className="text-destructive/50 h-10 w-10" />
          <p className="text-muted-foreground text-sm">{error ?? "No data"}</p>
        </CardContent></Card>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Topics", value: data.summary.totalTopics },
              { label: "Strong", value: data.summary.strong, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Weak", value: data.summary.weak, color: "text-red-600 dark:text-red-400" },
              { label: "Avg Mastery", value: `${data.summary.avgMastery}%` },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="py-4">
                  <div className={`text-2xl font-bold ${s.color ?? ""}`}>{s.value}</div>
                  <div className="text-muted-foreground text-xs">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Layers className="text-primary h-4 w-4" /> Topic Mastery</CardTitle></CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="w-28 text-center">Attempted</TableHead>
                    <TableHead className="w-28 text-center">Avg Score</TableHead>
                    <TableHead className="w-28">Confidence</TableHead>
                    <TableHead className="w-40">Mastery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.topics.map((t) => (
                    <TableRow key={t.topic}>
                      <TableCell className="font-medium">{t.topic}</TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell text-sm">{t.category}</TableCell>
                      <TableCell className="text-center text-sm">{t.attempted}/{t.totalQuestions}</TableCell>
                      <TableCell className="text-center text-sm">{t.attempted > 0 ? t.avgOverallScore.toFixed(1) : "—"}</TableCell>
                      <TableCell><Badge variant={confidenceVariant[t.confidence]}>{t.confidence}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={t.masteryPercentage} className="h-2" />
                          <span className="text-muted-foreground w-9 text-right text-xs">{t.masteryPercentage}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}

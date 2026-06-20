"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Filter, RefreshCw, MessageSquare, AlertCircle, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/page-container";

interface BQuestion {
  id: number;
  prompt: string;
  category: string;
  competencies: { id: number; name: string; type: string }[];
  companies: string[];
  latestAttempt: { status: string; overallScore: number | null } | null;
  attemptCount: number;
}

interface FilterOptions {
  categories: string[];
  competencies: { id: number; name: string; type: string }[];
  companies: { id: number; name: string }[];
}

function scoreColor(score: number | null): string {
  if (score == null) return "text-muted-foreground";
  if (score >= 4) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 3) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

export default function BehavioralPage() {
  const [questions, setQuestions] = useState<BQuestion[]>([]);
  const [options, setOptions] = useState<FilterOptions>({ categories: [], competencies: [], companies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ category: "", competency: "", companyId: "" });

  useEffect(() => {
    fetch("/api/behavioral/filters")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setOptions({ categories: d.categories || [], competencies: d.competencies || [], companies: d.companies || [] }); })
      .catch(() => {});
  }, []);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category);
      if (filters.competency) params.set("competency", filters.competency);
      if (filters.companyId) params.set("companyId", filters.companyId);
      const res = await fetch(`/api/behavioral?${params}`);
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(fetchQuestions, 250);
    return () => clearTimeout(t);
  }, [fetchQuestions]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <PageContainer
      pageTitle="Behavioral"
      pageDescription="FAANG behavioral question bank with STAR rubric scoring and competency coverage"
    >
      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardContent className="py-3">
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="text-primary h-4 w-4 shrink-0" />
              <Select value={filters.category || "all"} onValueChange={(v) => setFilters((f) => ({ ...f, category: v === "all" ? "" : v }))}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {options.categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.competency || "all"} onValueChange={(v) => setFilters((f) => ({ ...f, competency: v === "all" ? "" : v }))}>
                <SelectTrigger className="w-52"><SelectValue placeholder="Competency / LP" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Competencies</SelectItem>
                  {options.competencies.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.companyId || "all"} onValueChange={(v) => setFilters((f) => ({ ...f, companyId: v === "all" ? "" : v }))}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Company" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {options.companies.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={() => setFilters({ category: "", competency: "", companyId: "" })}>
                  <RefreshCw className="mr-1.5 h-3 w-3" /> Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <Card><CardContent className="space-y-3 py-4">{[...Array(8)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</CardContent></Card>
        ) : error ? (
          <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <AlertCircle className="text-destructive/50 h-10 w-10" />
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchQuestions}><RefreshCw className="mr-2 h-3.5 w-3.5" /> Try Again</Button>
          </CardContent></Card>
        ) : questions.length === 0 ? (
          <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <MessageSquare className="text-muted-foreground/40 h-10 w-10" />
            <p className="text-sm font-medium">{hasActiveFilters ? "No questions match the filters" : "No questions yet"}</p>
            <p className="text-muted-foreground text-xs">{hasActiveFilters ? "Try adjusting your filters" : "Run the seed to load the FAANG question bank"}</p>
          </CardContent></Card>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead className="hidden md:table-cell">Competencies</TableHead>
                  <TableHead className="w-24 text-center">Last Score</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((q) => (
                  <TableRow key={q.id} className="cursor-pointer">
                    <TableCell>
                      <Link href={`/behavioral/${q.id}`} className="block">
                        <div className="font-medium">{q.prompt}</div>
                        <div className="text-muted-foreground text-xs">{q.category}{q.companies.length > 0 && ` · ${q.companies.slice(0, 3).join(", ")}`}</div>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {q.competencies.slice(0, 2).map((c) => <Badge key={c.id} variant="outline" className="text-xs font-normal">{c.name}</Badge>)}
                        {q.competencies.length > 2 && <span className="text-muted-foreground text-xs">+{q.competencies.length - 2}</span>}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {q.latestAttempt?.overallScore != null ? (
                        <span className={`font-semibold ${scoreColor(q.latestAttempt.overallScore)}`}>{q.latestAttempt.overallScore.toFixed(1)}</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">{q.attemptCount > 0 ? "—" : "Not started"}</span>
                      )}
                    </TableCell>
                    <TableCell><Link href={`/behavioral/${q.id}`}><ChevronRight className="text-muted-foreground h-4 w-4" /></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}

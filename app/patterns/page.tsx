"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Check, Brain, BarChart3, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { parseAsInteger, useQueryStates } from "nuqs";

import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useDataTable } from "@/hooks/use-data-table";
import { getSortingStateParser } from "@/lib/parsers";
import {
  getPatternColumns,
  type PatternStat,
} from "@/components/patterns/columns";
import { calculateMasteryFromSignals } from "@/lib/analytics/pattern-metrics";
import { calculatePatternSummary } from "@/lib/analytics/pattern-summary";

interface PatternRecord {
  id: number;
  name: string;
  category: string;
  description?: string | null;
}

type PatternForm = {
  name: string;
  category: string;
  description: string;
};

const PAGE_SIZE = 20;
const CONFIDENCE_ORDER: Record<string, number> = {
  Weak: 0,
  Medium: 1,
  Strong: 2,
};
const SORTABLE_IDS = [
  "name",
  "solved",
  "avgTimeMinutes",
  "masteryPercentage",
];

export default function PatternsPage() {
  const [patterns, setPatterns] = useState<PatternStat[]>([]);
  const [patternRecords, setPatternRecords] = useState<PatternRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [savingPattern, setSavingPattern] = useState(false);
  const [deletingPattern, setDeletingPattern] = useState(false);
  const [editingPatternId, setEditingPatternId] = useState<number | null>(null);
  const [pendingDeletePattern, setPendingDeletePattern] =
    useState<PatternRecord | null>(null);
  const [patternForm, setPatternForm] = useState<PatternForm>({
    name: "",
    category: "",
    description: "",
  });

  const [tableState, setTableState] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(PAGE_SIZE),
    sort: getSortingStateParser<PatternStat>(new Set(SORTABLE_IDS)).withDefault(
      [],
    ),
  });

  const fetchPatterns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [analyticsResponse, patternsResponse] = await Promise.all([
        fetch("/api/analytics/patterns/confidence"),
        fetch("/api/patterns"),
      ]);

      if (!patternsResponse.ok) {
        throw new Error("Failed to fetch pattern list");
      }

      const patternsData = await patternsResponse.json();
      const records: PatternRecord[] = Array.isArray(patternsData.patterns)
        ? patternsData.patterns
        : [];

      setPatternRecords(records);

      let analyticsPatterns: Array<Record<string, unknown>> = [];
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        analyticsPatterns = Array.isArray(analyticsData.patterns)
          ? analyticsData.patterns
          : [];
      }

      const analyticsByName = new Map(
        analyticsPatterns.map((item) => [
          String(item.pattern).toLowerCase(),
          item,
        ]),
      );

      const transformedPatterns: PatternStat[] = records.map((pattern) => {
        const analytics = analyticsByName.get(pattern.name.toLowerCase());
        const avgTimeSeconds = Number(analytics?.avgTimeSeconds || 0);
        const hintUsageRate = Number(analytics?.hintUsageRate || 0);
        const totalSolved = Number(analytics?.totalSolved || 0);
        const confidence =
          analytics?.confidence === "Strong" ||
          analytics?.confidence === "Medium" ||
          analytics?.confidence === "Weak"
            ? (analytics.confidence as PatternStat["confidence"])
            : "Weak";

        return {
          id: pattern.id,
          name: pattern.name,
          category: pattern.category || String(analytics?.category || "General"),
          solved: totalSolved,
          avgTimeMinutes: Math.round(avgTimeSeconds / 60),
          confidence,
          hintUsageRate,
          masteryPercentage:
            totalSolved > 0
              ? calculateMasteryFromSignals(
                  confidence,
                  avgTimeSeconds,
                  hintUsageRate,
                )
              : 0,
          problemIds: Array.isArray(analytics?.problemIds)
            ? (analytics.problemIds as number[])
            : [],
          solvedProblemIds: Array.isArray(analytics?.solvedProblemIds)
            ? (analytics.solvedProblemIds as number[])
            : [],
        };
      });

      setPatterns(transformedPatterns);
    } catch (err) {
      console.error("Error fetching patterns:", err);
      setPatterns([]);
      setPatternRecords([]);
      setError("Failed to load pattern data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatterns();
  }, [fetchPatterns]);

  const openCreateDialog = () => {
    setEditingPatternId(null);
    setPatternForm({ name: "", category: "", description: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (pattern: PatternStat) => {
    const record = patternRecords.find((item) => item.id === pattern.id);
    setEditingPatternId(pattern.id);
    setPatternForm({
      name: record?.name ?? pattern.name,
      category: record?.category ?? pattern.category,
      description: record?.description || "",
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (pattern: PatternStat) => {
    const record =
      patternRecords.find((item) => item.id === pattern.id) ?? {
        id: pattern.id,
        name: pattern.name,
        category: pattern.category,
      };
    setPendingDeletePattern(record);
    setDeleteDialogOpen(true);
  };

  const validatePatternForm = () => {
    if (!patternForm.name.trim()) {
      toast.error("Pattern name is required");
      return false;
    }
    if (!patternForm.category.trim()) {
      toast.error("Pattern category is required");
      return false;
    }
    return true;
  };

  const handleSavePattern = async () => {
    if (!validatePatternForm()) return;

    setSavingPattern(true);
    try {
      const endpoint = editingPatternId
        ? `/api/patterns/${editingPatternId}`
        : "/api/patterns";
      const method = editingPatternId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patternForm.name.trim(),
          category: patternForm.category.trim(),
          description: patternForm.description.trim() || null,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save pattern");
      }

      toast.success(editingPatternId ? "Pattern updated" : "Pattern created");
      setDialogOpen(false);
      await fetchPatterns();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Could not save pattern");
    } finally {
      setSavingPattern(false);
    }
  };

  const handleDeletePattern = async () => {
    if (!pendingDeletePattern) return;

    setDeletingPattern(true);
    try {
      const response = await fetch(
        `/api/patterns/${pendingDeletePattern.id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete pattern");
      }

      toast.success("Pattern deleted");
      setDeleteDialogOpen(false);
      setPendingDeletePattern(null);
      await fetchPatterns();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Could not delete pattern",
      );
    } finally {
      setDeletingPattern(false);
    }
  };

  const summaryStats = useMemo(
    () => calculatePatternSummary(patterns),
    [patterns],
  );

  // Client-side sort
  const sortedPatterns = useMemo(() => {
    const sort = tableState.sort;
    if (!sort.length) return patterns;
    const { id, desc } = sort[0];
    const dir = desc ? -1 : 1;
    return [...patterns].sort((a, b) => {
      if (id === "name") return dir * a.name.localeCompare(b.name);
      if (id === "confidence")
        return (
          dir *
          ((CONFIDENCE_ORDER[a.confidence] ?? 0) -
            (CONFIDENCE_ORDER[b.confidence] ?? 0))
        );
      const av = (a as unknown as Record<string, number>)[id] ?? 0;
      const bv = (b as unknown as Record<string, number>)[id] ?? 0;
      return dir * (av - bv);
    });
  }, [patterns, tableState.sort]);

  const pageCount = Math.max(
    1,
    Math.ceil(sortedPatterns.length / tableState.perPage),
  );

  const pageData = useMemo(() => {
    const start = (tableState.page - 1) * tableState.perPage;
    return sortedPatterns.slice(start, start + tableState.perPage);
  }, [sortedPatterns, tableState.page, tableState.perPage]);

  useEffect(() => {
    if (tableState.page > pageCount) void setTableState({ page: 1 });
  }, [pageCount, tableState.page, setTableState]);

  const columns = useMemo(
    () =>
      getPatternColumns({
        onEdit: openEditDialog,
        onDelete: openDeleteDialog,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [patternRecords],
  );

  const { table } = useDataTable({
    data: pageData,
    columns,
    pageCount,
    initialState: {
      pagination: { pageIndex: 0, pageSize: PAGE_SIZE },
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => String(row.id),
  });

  return (
    <PageContainer
      pageTitle="Algorithm Patterns"
      pageDescription="Master the building blocks of coding interviews"
      pageHeaderAction={
        <Button onClick={openCreateDialog}>
          <Plus className="mr-1 h-4 w-4" />
          New Pattern
        </Button>
      }
    >
      <div className="flex flex-1 flex-col gap-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-9 w-16" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </CardContent>
                </Card>
              ))
            : [
                { label: "Total Patterns", value: summaryStats.total, icon: Brain },
                {
                  label: "Problems Solved",
                  value: summaryStats.totalSolved,
                  icon: BarChart3,
                },
                {
                  label: "Avg Mastery",
                  value: `${summaryStats.avgMastery}%`,
                  icon: Check,
                },
              ].map(({ label, value, icon: Icon }) => (
                <Card key={label}>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        {label}
                      </p>
                      <p className="text-3xl font-bold">{value}</p>
                    </div>
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Patterns table */}
        {loading ? (
          <DataTableSkeleton columnCount={8} rowCount={8} />
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <Brain className="text-muted-foreground/40 h-10 w-10" />
              <p className="text-sm font-medium">Failed to load patterns</p>
              <p className="text-muted-foreground text-xs">{error}</p>
            </CardContent>
          </Card>
        ) : sortedPatterns.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <Brain className="text-muted-foreground/40 h-10 w-10" />
              <p className="text-sm font-medium">No patterns found</p>
              <p className="text-muted-foreground text-xs">
                Start solving problems to see pattern analytics here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <DataTable table={table}>
            <DataTableToolbar table={table} />
          </DataTable>
        )}
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingPatternId ? "Edit Pattern" : "Create Pattern"}
            </DialogTitle>
            <DialogDescription>
              Define the pattern name, category, and optional description.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="pattern-name">Pattern Name</Label>
              <Input
                id="pattern-name"
                value={patternForm.name}
                onChange={(e) =>
                  setPatternForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Example: Sliding Window"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pattern-category">Category</Label>
              <Input
                id="pattern-category"
                value={patternForm.category}
                onChange={(e) =>
                  setPatternForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                placeholder="Example: Array and String"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pattern-description">Description</Label>
              <Textarea
                id="pattern-description"
                value={patternForm.description}
                onChange={(e) =>
                  setPatternForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Optional notes"
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePattern} disabled={savingPattern}>
              {savingPattern
                ? "Saving…"
                : editingPatternId
                  ? "Update Pattern"
                  : "Create Pattern"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Delete Pattern</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="text-muted-foreground py-2 text-sm">
            Delete pattern{" "}
            <span className="text-foreground font-semibold">
              {pendingDeletePattern?.name}
            </span>
            ?
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setPendingDeletePattern(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeletePattern}
              disabled={deletingPattern}
            >
              {deletingPattern ? "Deleting…" : "Delete Pattern"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

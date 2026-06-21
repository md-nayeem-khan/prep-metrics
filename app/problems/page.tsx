"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Filter,
  AlertCircle,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddProblemForm } from "@/components/forms/AddProblemForm";
import { EditProblemForm } from "@/components/forms/EditProblemForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useDataTable } from "@/hooks/use-data-table";
import { getSortingStateParser } from "@/lib/parsers";
import {
  getProblemColumns,
  type ProblemRow,
} from "@/components/problems/columns";
import { useTimezone } from "@/components/providers/timezone-provider";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Problem extends ProblemRow {
  notes?: string;
  source?: string;
  companyIds?: number[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface CompanyFilterOption {
  id: number;
  name: string;
}

interface FilterOptions {
  patterns: string[];
  tags: string[];
  companyOptions: CompanyFilterOption[];
}

const PAGE_SIZE = 50;
const DIFFICULTY_ORDER: Record<string, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
  unrated: 3,
};
const SORTABLE_IDS = ["title", "difficulty", "lastAttempt"];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProblemsPage() {
  const { timezone } = useTimezone();
  // nuqs URL-synced server filters
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      difficulty: parseAsString.withDefault(""),
      pattern: parseAsString.withDefault(""),
      tag: parseAsString.withDefault(""),
      companyId: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
    },
    { history: "push", shallow: false },
  );

  // nuqs URL-synced table state (shared with useDataTable)
  const [tableState, setTableState] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(PAGE_SIZE),
    sort: getSortingStateParser<ProblemRow>(new Set(SORTABLE_IDS)).withDefault(
      [],
    ),
  });

  const [problems, setProblems] = useState<Problem[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    patterns: [],
    tags: [],
    companyOptions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProblem, setDeletingProblem] = useState<Problem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch filter options once
  const fetchFilterOptions = useCallback(async () => {
    try {
      const [filtersRes, companiesRes] = await Promise.all([
        fetch("/api/problems/filters"),
        fetch("/api/companies"),
      ]);
      const filtersData = filtersRes.ok ? await filtersRes.json() : null;
      const companiesData = companiesRes.ok ? await companiesRes.json() : null;
      setFilterOptions({
        patterns: Array.isArray(filtersData?.patterns)
          ? filtersData.patterns
          : [],
        tags: Array.isArray(filtersData?.tags) ? filtersData.tags : [],
        companyOptions: Array.isArray(companiesData?.companies)
          ? companiesData.companies.filter(
              (c: unknown) =>
                typeof c === "object" &&
                c !== null &&
                Number.isInteger((c as { id?: unknown }).id) &&
                typeof (c as { name?: unknown }).name === "string",
            )
          : [],
      });
    } catch {
      setFilterOptions({ patterns: [], tags: [], companyOptions: [] });
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  // Fetch problems when API filters change
  const fetchProblems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.difficulty) params.set("difficulty", filters.difficulty);
      if (filters.pattern) params.set("pattern", filters.pattern);
      if (filters.tag) params.set("tag", filters.tag);
      if (filters.companyId) params.set("companyId", filters.companyId);

      let res = await fetch(`/api/problems?${params}`);
      if (!res.ok && filters.companyId) {
        params.delete("companyId");
        res = await fetch(`/api/problems?${params}`);
      }
      if (!res.ok) throw new Error("Failed to fetch problems");
      const data = await res.json();
      setProblems(data.problems || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load problems");
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.difficulty,
    filters.pattern,
    filters.tag,
    filters.companyId,
  ]);

  useEffect(() => {
    const t = setTimeout(fetchProblems, 300);
    return () => clearTimeout(t);
  }, [fetchProblems]);

  // Client-side status filter
  const filteredProblems = useMemo(() => {
    if (!filters.status) return problems;
    return problems.filter((p) => {
      const isSolved =
        p.attemptCount > 0 && p.submissions.some((s) => s.status === "solved");
      if (filters.status === "solved") return isSolved;
      if (filters.status === "unsolved") return !isSolved;
      return true;
    });
  }, [problems, filters.status]);

  // Client-side sort (from nuqs sort param)
  const sortedProblems = useMemo(() => {
    const sort = tableState.sort;
    if (!sort.length) return filteredProblems;
    const { id, desc } = sort[0];
    const dir = desc ? -1 : 1;
    return [...filteredProblems].sort((a, b) => {
      if (id === "difficulty") {
        return (
          dir *
          ((DIFFICULTY_ORDER[a.difficulty] ?? 9) -
            (DIFFICULTY_ORDER[b.difficulty] ?? 9))
        );
      }
      if (id === "lastAttempt") {
        const av = a.lastAttempt ? new Date(a.lastAttempt).getTime() : 0;
        const bv = b.lastAttempt ? new Date(b.lastAttempt).getTime() : 0;
        return dir * (av - bv);
      }
      // title (string)
      return dir * a.title.localeCompare(b.title);
    });
  }, [filteredProblems, tableState.sort]);

  const pageCount = Math.max(
    1,
    Math.ceil(sortedProblems.length / tableState.perPage),
  );

  const pageData = useMemo(() => {
    const start = (tableState.page - 1) * tableState.perPage;
    return sortedProblems.slice(start, start + tableState.perPage);
  }, [sortedProblems, tableState.page, tableState.perPage]);

  // Reset to page 1 when the result set changes size
  useEffect(() => {
    if (tableState.page > pageCount) {
      void setTableState({ page: 1 });
    }
  }, [pageCount, tableState.page, setTableState]);

  const columns = useMemo(
    () =>
      getProblemColumns({
        onEdit: (problem) => {
          setEditingProblem(problem as Problem);
          setIsEditModalOpen(true);
        },
        onDelete: (problem) => {
          setDeletingProblem(problem as Problem);
          setIsDeleteModalOpen(true);
        },
        timezone,
      }),
    [timezone],
  );

  const { table } = useDataTable({
    data: pageData,
    columns,
    pageCount,
    initialState: {
      columnPinning: { right: ["actions"] },
      pagination: { pageIndex: 0, pageSize: PAGE_SIZE },
    },
    getRowId: (row) => String(row.id),
  });

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const handleDeleteProblem = async () => {
    if (!deletingProblem?.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/problems/${deletingProblem.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete problem");
      toast.success("Problem deleted", {
        description: `${deletingProblem.title} removed`,
      });
      setIsDeleteModalOpen(false);
      setDeletingProblem(null);
      await fetchProblems();
    } catch {
      toast.error("Failed to delete problem", {
        description: "Please try again",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PageContainer
      pageTitle="Problems"
      pageDescription="Track and manage your interview preparation problems"
      pageHeaderAction={<AddProblemForm />}
    >
      {/* Delete dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open && !isDeleting) setDeletingProblem(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Problem</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingProblem?.title}
              &quot;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProblem}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditProblemForm
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) setEditingProblem(null);
        }}
        problem={editingProblem}
        onSuccess={fetchProblems}
      />

      <div className="flex flex-1 flex-col gap-4">
        {/* Filters */}
        <Card>
          <CardContent className="py-3">
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="text-primary h-4 w-4 shrink-0" />
              {[
                {
                  key: "difficulty" as const,
                  placeholder: "Difficulty",
                  options: [
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "hard", label: "Hard" },
                  ],
                },
                {
                  key: "status" as const,
                  placeholder: "Status",
                  options: [
                    { value: "solved", label: "Solved" },
                    { value: "unsolved", label: "Unsolved" },
                  ],
                },
              ].map(({ key, placeholder, options }) => (
                <Select
                  key={key}
                  value={filters[key] || "all"}
                  onValueChange={(v) =>
                    setFilters({ [key]: v === "all" ? "" : v })
                  }
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {placeholder}s</SelectItem>
                    {options.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}

              <Select
                value={filters.pattern || "all"}
                onValueChange={(v) =>
                  setFilters({ pattern: v === "all" ? "" : v })
                }
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patterns</SelectItem>
                  {filterOptions.patterns.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.companyId || "all"}
                onValueChange={(v) =>
                  setFilters({ companyId: v === "all" ? "" : v })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {filterOptions.companyOptions.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.tag || "all"}
                onValueChange={(v) => setFilters({ tag: v === "all" ? "" : v })}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {filterOptions.tags.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFilters({
                      search: "",
                      difficulty: "",
                      pattern: "",
                      tag: "",
                      companyId: "",
                      status: "",
                    })
                  }
                >
                  <RefreshCw className="mr-1.5 h-3 w-3" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        {loading ? (
          <DataTableSkeleton columnCount={7} rowCount={8} />
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <AlertCircle className="text-destructive/50 h-10 w-10" />
              <p className="text-muted-foreground text-sm">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchProblems}>
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : sortedProblems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <BookOpen className="text-muted-foreground/40 h-10 w-10" />
              <p className="text-sm font-medium">
                {hasActiveFilters
                  ? "No problems match the filters"
                  : "No problems yet"}
              </p>
              <p className="text-muted-foreground text-xs">
                {hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Add your first problem to get started"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <DataTable table={table}>
            <DataTableToolbar table={table} />
          </DataTable>
        )}
      </div>
    </PageContainer>
  );
}

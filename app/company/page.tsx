"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Building2, BarChart3, AlertCircle, Plus } from "lucide-react";
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
import { toast } from "sonner";
import { parseAsInteger, useQueryStates } from "nuqs";

import { PageContainer } from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useDataTable } from "@/hooks/use-data-table";
import { getSortingStateParser } from "@/lib/parsers";
import {
  getCompanyColumns,
  type CompanyRow,
} from "@/components/company/columns";

type CompanyConfig = {
  id: number;
  name: string;
  icon: string;
  targetProblems: number;
};

type CompanyForm = {
  name: string;
  icon: string;
  targetProblems: string;
};

interface CompanyStat {
  company: string;
  solved: number;
  solvedProblemIds: number[];
  avgTime: number;
  hintPercentage: number;
  confidence: "Weak" | "Medium" | "Strong";
  masteryPercentage: number;
  topPatterns: string[];
  analyticsError: boolean;
}

const PAGE_SIZE = 20;
const SORTABLE_IDS = ["name", "solved", "avgTime", "masteryPercentage"];

export default function CompanyPage() {
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [companyConfigs, setCompanyConfigs] = useState<CompanyConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);
  const [deletingCompany, setDeletingCompany] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [pendingDeleteCompanyId, setPendingDeleteCompanyId] = useState<
    number | null
  >(null);
  const [companyForm, setCompanyForm] = useState<CompanyForm>({
    name: "",
    icon: "🏢",
    targetProblems: "0",
  });

  const [tableState, setTableState] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(PAGE_SIZE),
    sort: getSortingStateParser<CompanyRow>(new Set(SORTABLE_IDS)).withDefault(
      [],
    ),
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const companiesResponse = await fetch("/api/companies");
      if (!companiesResponse.ok) {
        throw new Error(
          `Companies HTTP error! status: ${companiesResponse.status}`,
        );
      }
      const companiesData = await companiesResponse.json();
      const companies: CompanyConfig[] = Array.isArray(companiesData.companies)
        ? companiesData.companies
        : [];
      setCompanyConfigs(companies);

      const resolvedStats: CompanyStat[] = await Promise.all(
        companies.map(async (company): Promise<CompanyStat> => {
          const fallback: CompanyStat = {
            company: company.name,
            solved: 0,
            solvedProblemIds: [],
            avgTime: 0,
            hintPercentage: 0,
            confidence: "Weak",
            masteryPercentage: 0,
            topPatterns: [],
            analyticsError: true,
          };
          try {
            const res = await fetch(`/api/analytics/company/${company.id}`);
            if (!res.ok) return fallback;
            const data = await res.json();
            return {
              company: data.company,
              solved: data.summary.solvedProblems,
              solvedProblemIds: Array.isArray(data.summary.solvedProblemIds)
                ? data.summary.solvedProblemIds
                : [],
              avgTime: Math.round((data.summary.avgTimeSeconds || 0) / 60),
              hintPercentage: data.summary.hintPercentage,
              confidence: data.summary.confidence || "Weak",
              masteryPercentage: data.summary.masteryPercentage || 0,
              topPatterns: Array.isArray(data.patternCoverage)
                ? data.patternCoverage
                    .slice(0, 2)
                    .map((p: { pattern: string }) => p.pattern)
                : [],
              analyticsError: false,
            };
          } catch {
            return fallback;
          }
        }),
      );

      const failedCount = resolvedStats.filter(
        (item) => item.analyticsError,
      ).length;
      if (failedCount > 0) {
        setError(
          `${failedCount} company analytics entr${failedCount === 1 ? "y" : "ies"} failed to load. Showing available data.`,
        );
      }

      setStats(resolvedStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateDialog = () => {
    setEditingCompanyId(null);
    setCompanyForm({ name: "", icon: "🏢", targetProblems: "0" });
    setDialogOpen(true);
  };

  const openEditDialog = (company: CompanyRow) => {
    setEditingCompanyId(company.id);
    setCompanyForm({
      name: company.name,
      icon: company.icon,
      targetProblems: String(company.targetProblems),
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (company: CompanyRow) => {
    setPendingDeleteCompanyId(company.id);
    setDeleteDialogOpen(true);
  };

  const validateCompanyForm = () => {
    if (!companyForm.name.trim()) {
      toast.error("Company name is required");
      return false;
    }
    const target = Number(companyForm.targetProblems);
    if (!Number.isFinite(target) || target < 0) {
      toast.error("Target problems must be a non-negative number");
      return false;
    }
    const normalizedName = companyForm.name.trim().toLowerCase();
    const duplicate = companyConfigs.find(
      (company) =>
        company.name.toLowerCase() === normalizedName &&
        company.id !== editingCompanyId,
    );
    if (duplicate) {
      toast.error("Company already exists");
      return false;
    }
    return true;
  };

  const handleSaveCompany = async () => {
    if (!validateCompanyForm()) return;

    setSavingCompany(true);
    try {
      const targetProblems = Math.max(
        0,
        Math.round(Number(companyForm.targetProblems)),
      );
      const endpoint = editingCompanyId
        ? `/api/companies/${editingCompanyId}`
        : "/api/companies";
      const method = editingCompanyId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: companyForm.name.trim(),
          icon: companyForm.icon.trim() || "🏢",
          targetProblems,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          err.error ||
            `Failed to ${editingCompanyId ? "update" : "create"} company`,
        );
      }

      await fetchData();
      toast.success(editingCompanyId ? "Company updated" : "Company added");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Could not save company");
    } finally {
      setSavingCompany(false);
    }
  };

  const handleDeleteCompany = async () => {
    if (!pendingDeleteCompanyId) return;

    setDeletingCompany(true);
    try {
      const response = await fetch(
        `/api/companies/${pendingDeleteCompanyId}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete company");
      }

      await fetchData();
      toast.success("Company deleted");
      setDeleteDialogOpen(false);
      setPendingDeleteCompanyId(null);
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Could not delete company",
      );
    } finally {
      setDeletingCompany(false);
    }
  };

  const companyRows: CompanyRow[] = useMemo(
    () =>
      companyConfigs.map((companyConfig) => {
        const stat = stats.find(
          (item) =>
            item.company.toLowerCase() === companyConfig.name.toLowerCase(),
        );
        return {
          ...companyConfig,
          solved: stat?.solved ?? 0,
          solvedProblemIds: stat?.solvedProblemIds ?? [],
          avgTime: stat?.avgTime ?? 0,
          hintPercentage: stat?.hintPercentage ?? 0,
          confidence: stat?.confidence ?? "Weak",
          masteryPercentage: stat?.masteryPercentage ?? 0,
          topPatterns: stat?.topPatterns ?? [],
          analyticsError: stat?.analyticsError ?? true,
        };
      }),
    [companyConfigs, stats],
  );

  const summary = useMemo(() => {
    const totalCompanies = companyRows.length;
    const solvedProblemIds = new Set<number>();
    companyRows.forEach((row) => {
      if (row.analyticsError) return;
      row.solvedProblemIds.forEach((id) => solvedProblemIds.add(id));
    });
    const activeMasteryRows = companyRows.filter(
      (row) => !row.analyticsError && row.solved > 0,
    );
    const avgMastery =
      activeMasteryRows.length > 0
        ? Math.round(
            activeMasteryRows.reduce(
              (acc, row) => acc + row.masteryPercentage,
              0,
            ) / activeMasteryRows.length,
          )
        : 0;
    return {
      totalCompanies,
      totalSolved: solvedProblemIds.size,
      avgMastery,
    };
  }, [companyRows]);

  // Client-side sort
  const sortedRows = useMemo(() => {
    const sort = tableState.sort;
    if (!sort.length) return companyRows;
    const { id, desc } = sort[0];
    const dir = desc ? -1 : 1;
    return [...companyRows].sort((a, b) => {
      if (id === "name") return dir * a.name.localeCompare(b.name);
      const av = (a as unknown as Record<string, number>)[id] ?? 0;
      const bv = (b as unknown as Record<string, number>)[id] ?? 0;
      return dir * (av - bv);
    });
  }, [companyRows, tableState.sort]);

  const pageCount = Math.max(
    1,
    Math.ceil(sortedRows.length / tableState.perPage),
  );

  const pageData = useMemo(() => {
    const start = (tableState.page - 1) * tableState.perPage;
    return sortedRows.slice(start, start + tableState.perPage);
  }, [sortedRows, tableState.page, tableState.perPage]);

  useEffect(() => {
    if (tableState.page > pageCount) void setTableState({ page: 1 });
  }, [pageCount, tableState.page, setTableState]);

  const columns = useMemo(
    () =>
      getCompanyColumns({
        onEdit: openEditDialog,
        onDelete: openDeleteDialog,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
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
      pageTitle="Company Readiness"
      pageDescription="Track your preparation progress for top companies"
      pageHeaderAction={
        <Button onClick={openCreateDialog}>
          <Plus className="mr-1 h-4 w-4" />
          New Company
        </Button>
      }
    >
      <div className="flex flex-1 flex-col gap-4">
        {error && (
          <Card className="border-destructive/40 bg-destructive/5">
            <CardContent className="text-destructive flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </CardContent>
          </Card>
        )}

        {/* Summary cards */}
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
                {
                  label: "Total Companies",
                  value: summary.totalCompanies,
                  icon: Building2,
                },
                {
                  label: "Problems Solved",
                  value: summary.totalSolved,
                  icon: BarChart3,
                },
                {
                  label: "Avg Mastery",
                  value: `${summary.avgMastery}%`,
                  icon: BarChart3,
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

        {/* Company table */}
        {loading ? (
          <DataTableSkeleton columnCount={8} rowCount={6} />
        ) : companyRows.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <Building2 className="text-muted-foreground/40 h-10 w-10" />
              <p className="text-sm font-medium">No companies found</p>
              <p className="text-muted-foreground text-xs">
                Add your first company to start tracking readiness.
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
              {editingCompanyId ? "Edit Company" : "Create Company"}
            </DialogTitle>
            <DialogDescription>
              Configure company card details and target problem count.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={companyForm.name}
                onChange={(e) =>
                  setCompanyForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Example: OpenAI"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="company-icon">Icon</Label>
                <Input
                  id="company-icon"
                  value={companyForm.icon}
                  onChange={(e) =>
                    setCompanyForm((prev) => ({
                      ...prev,
                      icon: e.target.value,
                    }))
                  }
                  placeholder="Example: 🏢"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-target">Target Problems</Label>
                <Input
                  id="company-target"
                  type="number"
                  min="0"
                  value={companyForm.targetProblems}
                  onChange={(e) =>
                    setCompanyForm((prev) => ({
                      ...prev,
                      targetProblems: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCompany} disabled={savingCompany}>
              {savingCompany
                ? "Saving…"
                : editingCompanyId
                  ? "Update Company"
                  : "Create Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="text-muted-foreground py-2 text-sm">
            Delete this company card?
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setPendingDeleteCompanyId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCompany}
              disabled={deletingCompany}
            >
              {deletingCompany ? "Deleting…" : "Delete Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

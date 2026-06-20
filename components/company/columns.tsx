"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { cn } from "@/lib/utils";
import { CompanyCellAction } from "@/components/company/cell-action";

export interface CompanyRow {
  id: number;
  name: string;
  icon: string;
  targetProblems: number;
  solved: number;
  solvedProblemIds: number[];
  avgTime: number;
  hintPercentage: number;
  confidence: "Weak" | "Medium" | "Strong";
  masteryPercentage: number;
  topPatterns: string[];
  analyticsError: boolean;
}

const CONFIDENCE_STYLES: Record<string, string> = {
  Strong:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
  Medium:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
  Weak: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300",
};

interface GetColumnsOptions {
  onEdit: (company: CompanyRow) => void;
  onDelete: (company: CompanyRow) => void;
}

export function getCompanyColumns({
  onEdit,
  onDelete,
}: GetColumnsOptions): ColumnDef<CompanyRow>[] {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company" />
      ),
      cell: ({ row }) => (
        <Link
          href={`/problems?companyId=${row.original.id}`}
          className="flex items-center gap-2 font-medium hover:underline"
        >
          <span className="text-xl leading-none">
            {row.original.icon || "🏢"}
          </span>
          {row.original.name}
        </Link>
      ),
      meta: { label: "Company" },
    },
    {
      id: "solved",
      accessorKey: "solved",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Solved" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold">
          {row.original.analyticsError ? "—" : row.original.solved}
        </span>
      ),
      meta: { label: "Solved" },
    },
    {
      id: "avgTime",
      accessorKey: "avgTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Avg Time" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.analyticsError ? "—" : `${row.original.avgTime}m`}
        </span>
      ),
      meta: { label: "Avg Time" },
    },
    {
      id: "topPatterns",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Top Patterns" />
      ),
      cell: ({ row }) => {
        const patterns = row.original.topPatterns;
        if (!patterns.length)
          return <span className="text-muted-foreground text-sm">—</span>;
        return (
          <div className="flex max-w-[240px] flex-wrap gap-1">
            {patterns.slice(0, 2).map((pattern) => (
              <Badge key={pattern} variant="secondary" className="text-xs">
                {pattern}
              </Badge>
            ))}
          </div>
        );
      },
      meta: { label: "Top Patterns" },
    },
    {
      id: "hintPercentage",
      accessorKey: "hintPercentage",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hints" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.analyticsError
            ? "—"
            : `${Math.round(row.original.hintPercentage)}%`}
        </span>
      ),
      meta: { label: "Hints" },
    },
    {
      id: "confidence",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Confidence" />
      ),
      cell: ({ row }) =>
        row.original.analyticsError ? (
          <Badge variant="outline" className="text-muted-foreground text-xs">
            N/A
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              CONFIDENCE_STYLES[row.original.confidence],
            )}
          >
            {row.original.confidence}
          </Badge>
        ),
      meta: { label: "Confidence" },
    },
    {
      id: "masteryPercentage",
      accessorKey: "masteryPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mastery" />
      ),
      cell: ({ row }) => {
        const pct = row.original.analyticsError
          ? 0
          : Math.max(0, Math.min(100, Math.round(row.original.masteryPercentage)));
        return (
          <div className="flex min-w-[130px] flex-col gap-1">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>Level</span>
              <span className="text-foreground font-medium">
                {row.original.analyticsError ? "—" : `${pct}%`}
              </span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>
        );
      },
      meta: { label: "Mastery" },
    },
    {
      id: "actions",
      enableSorting: false,
      size: 40,
      cell: ({ row }) => (
        <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
          <CompanyCellAction
            company={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ),
    },
  ];
}

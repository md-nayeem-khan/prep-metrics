"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { cn } from "@/lib/utils";
import { PatternCellAction } from "@/components/patterns/cell-action";

export interface PatternStat {
  id: number;
  name: string;
  category: string;
  solved: number;
  avgTimeMinutes: number;
  confidence: "Weak" | "Medium" | "Strong";
  hintUsageRate: number;
  masteryPercentage: number;
  problemIds: number[];
  solvedProblemIds: number[];
}

const CONFIDENCE_STYLES: Record<string, string> = {
  Strong:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
  Medium:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
  Weak: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300",
};

interface GetColumnsOptions {
  onEdit: (pattern: PatternStat) => void;
  onDelete: (pattern: PatternStat) => void;
}

export function getPatternColumns({
  onEdit,
  onDelete,
}: GetColumnsOptions): ColumnDef<PatternStat>[] {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pattern" />
      ),
      cell: ({ row }) => (
        <Link
          href={`/problems?pattern=${encodeURIComponent(row.original.name)}`}
          className="font-medium hover:underline"
        >
          {row.original.name}
        </Link>
      ),
      meta: { label: "Pattern" },
    },
    {
      id: "category",
      accessorKey: "category",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.category || "General"}
        </span>
      ),
      meta: { label: "Category" },
    },
    {
      id: "solved",
      accessorKey: "solved",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Solved" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.solved}</span>
      ),
      meta: { label: "Solved" },
    },
    {
      id: "avgTimeMinutes",
      accessorKey: "avgTimeMinutes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Avg Time" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.avgTimeMinutes}m
        </span>
      ),
      meta: { label: "Avg Time" },
    },
    {
      id: "hintUsageRate",
      accessorKey: "hintUsageRate",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hints" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {Math.round(row.original.hintUsageRate * 100)}%
        </span>
      ),
      meta: { label: "Hints" },
    },
    {
      id: "confidence",
      accessorKey: "confidence",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Confidence" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn("text-xs", CONFIDENCE_STYLES[row.original.confidence])}
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
      cell: ({ row }) => (
        <div className="flex min-w-[130px] flex-col gap-1">
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span>Level</span>
            <span className="text-foreground font-medium">
              {row.original.masteryPercentage}%
            </span>
          </div>
          <Progress value={row.original.masteryPercentage} className="h-2" />
        </div>
      ),
      meta: { label: "Mastery" },
    },
    {
      id: "actions",
      enableSorting: false,
      size: 40,
      cell: ({ row }) => (
        <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
          <PatternCellAction
            pattern={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ),
    },
  ];
}

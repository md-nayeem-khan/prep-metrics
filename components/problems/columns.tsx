"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { cn } from "@/lib/utils";
import { difficultyBadge, solvedBadge } from "@/lib/status-colors";
import { ProblemCellAction } from "@/components/problems/cell-action";

export interface ProblemRow {
  id: number;
  platform: string;
  problemId: string;
  title: string;
  difficulty: "easy" | "medium" | "hard" | "unrated";
  url?: string;
  company?: string;
  companies?: string[];
  patterns: { id: number; name: string; category: string }[];
  submissions: {
    timeSpentSeconds: number;
    status: string;
    submittedAt: string;
  }[];
  attemptCount: number;
  lastAttempt: string | null;
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Never";
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatMinutes(seconds?: number) {
  if (typeof seconds !== "number" || isNaN(seconds)) return null;
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

interface GetColumnsOptions {
  onEdit: (problem: ProblemRow) => void;
  onDelete: (problem: ProblemRow) => void;
}

export function getProblemColumns({
  onEdit,
  onDelete,
}: GetColumnsOptions): ColumnDef<ProblemRow>[] {
  return [
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const problem = row.original;
        return (
          <Link
            href={`/problems/${problem.id}`}
            className="flex flex-col gap-0.5"
          >
            <span className="font-medium line-clamp-1" title={problem.title}>
              {problem.title}
            </span>
            <span className="text-muted-foreground text-xs">
              {problem.platform} · {problem.problemId}
            </span>
          </Link>
        );
      },
      meta: { label: "Title" },
    },
    {
      id: "difficulty",
      accessorKey: "difficulty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Difficulty" />
      ),
      cell: ({ row }) => {
        const difficulty = row.original.difficulty;
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
              difficultyBadge(difficulty),
            )}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        );
      },
      meta: { label: "Difficulty" },
    },
    {
      id: "patterns",
      accessorKey: "patterns",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pattern" />
      ),
      cell: ({ row }) => {
        const patterns = row.original.patterns;
        if (!patterns.length)
          return <span className="text-muted-foreground text-sm">—</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {patterns.slice(0, 2).map((p) => (
              <Badge key={p.id} variant="secondary" className="text-xs">
                {p.name.length > 20 ? `${p.name.slice(0, 20)}…` : p.name}
              </Badge>
            ))}
            {patterns.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{patterns.length - 2}
              </Badge>
            )}
          </div>
        );
      },
      meta: { label: "Pattern" },
    },
    {
      id: "company",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company" />
      ),
      cell: ({ row }) => {
        const problem = row.original;
        const companyNames = Array.isArray(problem.companies)
          ? problem.companies
          : problem.company
            ? [problem.company]
            : [];
        if (!companyNames.length)
          return <span className="text-muted-foreground text-sm">—</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {companyNames.slice(0, 2).map((c) => (
              <Badge key={c} variant="outline" className="text-xs">
                {c}
              </Badge>
            ))}
            {companyNames.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{companyNames.length - 2}
              </Badge>
            )}
          </div>
        );
      },
      meta: { label: "Company" },
    },
    {
      id: "status",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const problem = row.original;
        if (problem.attemptCount === 0)
          return (
            <Badge variant="outline" className="text-muted-foreground">
              <XCircle className="mr-1 h-3 w-3" />
              Unsolved
            </Badge>
          );
        const isSolved = problem.submissions[0]?.status === "solved";
        return (
          <Badge variant="outline" className={solvedBadge(isSolved)}>
            {isSolved ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <Clock className="mr-1 h-3 w-3" />
            )}
            {isSolved ? "Solved" : "In Progress"}
          </Badge>
        );
      },
      meta: { label: "Status" },
    },
    {
      id: "lastAttempt",
      accessorKey: "lastAttempt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Attempt" />
      ),
      cell: ({ row }) => {
        const problem = row.original;
        const minutes = formatMinutes(problem.submissions[0]?.timeSpentSeconds);
        return (
          <span className="text-muted-foreground text-xs">
            {problem.lastAttempt
              ? `${formatDate(problem.lastAttempt)}${minutes ? ` · ${minutes}` : ""}`
              : "Never"}
          </span>
        );
      },
      meta: { label: "Last Attempt" },
    },
    {
      id: "actions",
      enableSorting: false,
      size: 40,
      cell: ({ row }) => {
        const problem = row.original;
        return (
          <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {problem.url && (
              <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex size-7 items-center justify-center rounded-md"
                aria-label="Open problem"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <ProblemCellAction
              problem={problem}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        );
      },
    },
  ];
}

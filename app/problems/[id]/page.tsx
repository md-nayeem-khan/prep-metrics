"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
  Calendar,
  Target,
  Lightbulb,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubmissionDetailsModal } from "@/components/modals/SubmissionDetailsModal";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Problem {
  id: number;
  title: string;
  platform: string;
  problemId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url?: string;
  company?: string;
  description?: string;
  patterns: Array<{ id: number; name: string }>;
  submissions: Array<{
    id: number;
    problemId: number;
    attemptNumber: number;
    timeSpentSeconds: number;
    status: string;
    notes?: string | null;
    submittedAt: string;
    attemptType: string;
    wasHintUsed: boolean;
    mistakeNote?: string | null;
    approachNote?: string | null;
    patternRecognitionSeconds?: number | null;
  }>;
}

interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
  totalTime: number;
}

interface NewSubmission {
  timeSpentMinutes: number;
  usedHints: boolean;
  isRevision: boolean;
  approach: string;
  notes: string;
  passed: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
  Medium: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
  Hard: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProblemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const problemId = params.id as string;
  const isFromRevisionPage = searchParams.get("from") === "revision";

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
    totalTime: 0,
  });

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionForm, setSubmissionForm] = useState<NewSubmission>({
    timeSpentMinutes: 0,
    usedHints: false,
    isRevision: false,
    approach: "",
    notes: "",
    passed: true,
  });
  const [submissionLoading, setSubmissionLoading] = useState(false);

  useEffect(() => {
    async function fetchProblem() {
      try {
        setLoading(true);
        const response = await fetch(`/api/problems/${problemId}`);
        if (!response.ok) throw new Error("Problem not found");
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load problem");
      } finally {
        setLoading(false);
      }
    }
    if (problemId) fetchProblem();
  }, [problemId]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer.isRunning && timer.startTime) {
      intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timer.startTime!) / 1000);
        setTimer((prev) => ({ ...prev, elapsedTime: elapsed }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer.isRunning, timer.startTime]);

  const startTimer = () =>
    setTimer((prev) => ({
      ...prev,
      isRunning: true,
      startTime: Date.now() - prev.elapsedTime * 1000,
    }));

  const pauseTimer = () =>
    setTimer((prev) => ({ ...prev, isRunning: false, startTime: null }));

  const resetTimer = () =>
    setTimer({ isRunning: false, startTime: null, elapsedTime: 0, totalTime: 0 });

  const openSubmissionForm = () => {
    if (timer.isRunning) pauseTimer();
    if (timer.elapsedTime > 0) {
      const minutes = Math.ceil(timer.elapsedTime / 60);
      setSubmissionForm((prev) => ({
        ...prev,
        timeSpentMinutes: minutes,
        isRevision: isFromRevisionPage ? true : prev.isRevision,
      }));
      toast.success(`Time set to ${minutes} min from timer`);
    } else if (isFromRevisionPage) {
      setSubmissionForm((prev) => ({ ...prev, isRevision: true }));
    }
    setShowSubmissionForm(true);
  };

  const handleSubmitAttempt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionForm.timeSpentMinutes) {
      toast.error("Please enter time spent or use the timer");
      return;
    }
    setSubmissionLoading(true);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: parseInt(problemId),
          timeSpentSeconds: submissionForm.timeSpentMinutes * 60,
          status: submissionForm.passed ? "solved" : "failed",
          wasHintUsed: submissionForm.usedHints,
          approachNote: submissionForm.approach,
          notes: submissionForm.notes,
          attemptType: submissionForm.isRevision ? "Revision" : "First",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit attempt");
      }
      toast.success("Attempt logged successfully!");
      setShowSubmissionForm(false);
      setSubmissionForm({
        timeSpentMinutes: 0,
        usedHints: false,
        isRevision: false,
        approach: "",
        notes: "",
        passed: true,
      });
      resetTimer();
      const updated = await fetch(`/api/problems/${problemId}`);
      if (updated.ok) setProblem(await updated.json());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit attempt");
    } finally {
      setSubmissionLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-52" />
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error || !problem) {
    return (
      <PageContainer>
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle className="h-10 w-10 text-destructive/60" />
            <p className="font-medium">Problem Not Found</p>
            <p className="text-sm text-muted-foreground">{error ?? "The problem could not be found."}</p>
            <Button variant="outline" size="sm" onClick={() => router.push("/problems")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Problems
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push("/problems")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold truncate">{problem.title}</h1>
        </div>
        {problem.url && (
          <Button variant="outline" size="icon" asChild>
            <a href={problem.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left — Timer + Submission History */}
        <div className="space-y-6 lg:col-span-3">
          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Solving Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl font-mono font-bold tabular-nums">
                  {formatTime(timer.elapsedTime)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetTimer}
                  disabled={timer.elapsedTime === 0}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                {!timer.isRunning ? (
                  <Button onClick={startTimer} className="flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={pauseTimer} variant="outline" className="flex-1">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                )}
                <Dialog open={showSubmissionForm} onOpenChange={setShowSubmissionForm}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="flex-1" onClick={openSubmissionForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Log Attempt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Log Attempt</DialogTitle>
                      <DialogDescription>
                        Record your solve time, approach, and notes for this attempt.
                      </DialogDescription>
                    </DialogHeader>
                    <form id="log-attempt-form" onSubmit={handleSubmitAttempt} className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeSpent">Time Spent (minutes) *</Label>
                        <Input
                          id="timeSpent"
                          type="number"
                          min="1"
                          required
                          value={submissionForm.timeSpentMinutes || ""}
                          onChange={(e) =>
                            setSubmissionForm((p) => ({
                              ...p,
                              timeSpentMinutes: parseInt(e.target.value) || 0,
                            }))
                          }
                          placeholder="Enter minutes"
                        />
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {(
                          [
                            { id: "passed", label: "Solved", key: "passed" },
                            { id: "isRevision", label: "Revision", key: "isRevision" },
                            { id: "usedHints", label: "Used Hints", key: "usedHints" },
                          ] as const
                        ).map(({ id, label, key }) => (
                          <div key={id} className="flex items-center gap-2">
                            <Checkbox
                              id={id}
                              checked={submissionForm[key]}
                              onCheckedChange={(checked) =>
                                setSubmissionForm((p) => ({ ...p, [key]: !!checked }))
                              }
                            />
                            <Label htmlFor={id} className="cursor-pointer">{label}</Label>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="approach">Approach / Solution</Label>
                        <Textarea
                          id="approach"
                          rows={3}
                          placeholder="Describe your approach…"
                          value={submissionForm.approach}
                          onChange={(e) =>
                            setSubmissionForm((p) => ({ ...p, approach: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          rows={2}
                          placeholder="Mistakes, learnings, insights…"
                          value={submissionForm.notes}
                          onChange={(e) =>
                            setSubmissionForm((p) => ({ ...p, notes: e.target.value }))
                          }
                        />
                      </div>
                    </form>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowSubmissionForm(false)}
                        disabled={submissionLoading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" form="log-attempt-form" disabled={submissionLoading}>
                        {submissionLoading ? "Submitting…" : "Log Attempt"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Submission History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-primary" />
                Submission History ({problem.submissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {problem.submissions.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <Target className="h-10 w-10 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    No attempts yet. Log your first attempt above!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Hints</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {problem.submissions.map((sub) => (
                        <TableRow key={sub.id}>
                          <TableCell className="text-sm">{formatDate(sub.submittedAt)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={sub.status === "solved" ? "default" : "destructive"}
                              className="gap-1"
                            >
                              {sub.status === "solved" ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {sub.status === "solved" ? "Solved" : "Failed"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {sub.attemptType === "Revision" ? "Revision" : "First"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {Math.floor(sub.timeSpentSeconds / 60)}m
                          </TableCell>
                          <TableCell>
                            {sub.wasHintUsed ? (
                              <Badge variant="outline" className="gap-1 text-xs">
                                <Lightbulb className="h-3 w-3" />
                                Used
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <SubmissionDetailsModal
                              submission={sub}
                              problemTitle={problem.title}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right — Problem Info */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-primary" />
                Problem Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Platform</p>
                <Badge variant="secondary">
                  {problem.platform} · {problem.problemId}
                </Badge>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Difficulty</p>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                    DIFFICULTY_COLORS[problem.difficulty] ?? DIFFICULTY_COLORS.Easy
                  )}
                >
                  {problem.difficulty}
                </span>
              </div>
              {problem.company && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Company</p>
                  <Badge variant="outline">{problem.company}</Badge>
                </div>
              )}
              {problem.patterns.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Patterns</p>
                  <div className="flex flex-wrap gap-1.5">
                    {problem.patterns.map((p) => (
                      <Badge key={p.id} variant="secondary" className="text-xs">
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {problem.description && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</p>
                  <p className="text-sm leading-relaxed text-foreground">{problem.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatInTimeZone } from "@/lib/datetime/tz";
import { useTimezone } from "@/components/providers/timezone-provider";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
  Target,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/page-container";
import { difficultyBadge, statusBadge } from "@/lib/status-colors";
import {
  MOCK_TYPES, MOCK_TYPE_CONFIG, getMockTypeConfig, type MockType, type MockQuestionSource,
} from "@/types/mock";
import type { MockTypeStats } from "@/lib/analytics/mock-metrics";

interface ApiMockInterview {
  id: number;
  type: string;
  status: string;
  date: string;
  timeLimit: number;
  timeTakenSeconds: number | null;
  solved: boolean;
  explanationScore: number | null;
  codeQualityScore: number | null;
  overallScore: number | null;
  problem: { title: string; difficulty: string } | null;
  systemDesignQuestion: { title: string; difficulty: string; category: string } | null;
  behavioralQuestion: { prompt: string; category: string } | null;
}

interface MockSummary {
  total: number;
  completed: number;
  passed: number;
  passRate: number;
  byType: MockTypeStats[];
}

interface BankOption { id: number; label: string }

const SOURCE_LABEL: Record<MockQuestionSource, string> = {
  bank: "Pick from bank",
  random: "Surprise me (random)",
  manual: "Enter manually",
};

const formatDuration = (seconds: number | null): string => {
  if (!seconds || seconds <= 0) return "-";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

const questionLabel = (i: ApiMockInterview): string =>
  i.problem?.title ?? i.systemDesignQuestion?.title ?? i.behavioralQuestion?.prompt ?? "Mock";

const questionDifficulty = (i: ApiMockInterview): string | null =>
  i.problem?.difficulty ?? i.systemDesignQuestion?.difficulty ?? null;

export default function MockPage() {
  const router = useRouter();
  const { timezone } = useTimezone();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interviews, setInterviews] = useState<ApiMockInterview[]>([]);
  const [summary, setSummary] = useState<MockSummary | null>(null);

  // Create dialog state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [type, setType] = useState<MockType>("coding");
  const [source, setSource] = useState<MockQuestionSource>("bank");
  const [bankOptions, setBankOptions] = useState<BankOption[]>([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankQuestionId, setBankQuestionId] = useState("");
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(45);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const config = getMockTypeConfig(type);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/mock-interviews?limit=100");
      if (!response.ok) throw new Error("Failed to load mock interviews");
      const data = await response.json();
      setInterviews(data.mockInterviews || []);
      setSummary(data.stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load mock interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInterviews(); }, []);

  // Reset adaptive fields whenever the interview type changes.
  const handleTypeChange = (next: MockType) => {
    const cfg = MOCK_TYPE_CONFIG[next];
    setType(next);
    setSource(cfg.questionSources[0]);
    setDifficulty(cfg.defaultDifficulty ?? "");
    setTimeLimitMinutes(cfg.defaultTimeLimitMinutes);
    setBankQuestionId("");
    setBankOptions([]);
    setTitle("");
    setPrompt("");
  };

  // Load the question bank when the user picks "bank".
  useEffect(() => {
    if (!isCreateOpen || source !== "bank") return;
    let cancelled = false;
    setBankLoading(true);
    fetch(`${config.bankEndpoint}?limit=200`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        const rows = d[config.bankCollectionKey] || [];
        setBankOptions(
          rows.map((row: Record<string, unknown>) => ({
            id: Number(row.id),
            label: String(row[config.bankLabelField] ?? "Untitled"),
          })),
        );
      })
      .catch(() => { if (!cancelled) setBankOptions([]); })
      .finally(() => { if (!cancelled) setBankLoading(false); });
    return () => { cancelled = true; };
  }, [isCreateOpen, source, type, config.bankEndpoint, config.bankCollectionKey, config.bankLabelField]);

  const handleCreateMock = async () => {
    if (!date) { toast.error("Date is required"); return; }
    if (!Number.isInteger(timeLimitMinutes) || timeLimitMinutes <= 0) {
      toast.error("Time limit must be a positive integer"); return;
    }
    if (source === "bank" && !bankQuestionId) {
      toast.error("Pick a question from the bank"); return;
    }
    const showTitle = config.bankLabelField === "title";
    if (source === "manual" && showTitle && !title.trim()) {
      toast.error("Title is required"); return;
    }
    if (source === "manual" && !showTitle && !prompt.trim()) {
      toast.error("Prompt is required"); return;
    }

    try {
      setSaving(true);
      const response = await fetch("/api/mock-interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          questionSource: source,
          date,
          timeLimit: timeLimitMinutes,
          difficulty: config.difficultyOptions.length ? difficulty : undefined,
          questionId: source === "bank" ? Number(bankQuestionId) : undefined,
          questionTitle: source === "manual" ? title.trim() : undefined,
          questionPrompt: source === "manual" ? prompt.trim() : undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to create mock interview");
      }

      const payload = await response.json();
      const createdId = payload?.mockInterview?.id;
      if (!createdId) throw new Error("Mock created but no interview ID was returned");

      setIsCreateOpen(false);
      toast.success("Mock interview created");
      router.push(`/mock/${createdId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create mock interview");
    } finally {
      setSaving(false);
    }
  };

  const showTitle = config.bankLabelField === "title";
  const showPrompt = type !== "coding";

  return (
    <PageContainer
      pageTitle="Mock Interviews"
      pageDescription="Run timed coding, system design, and behavioral interviews under pressure"
      pageHeaderAction={
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Mock Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Mock Interview</DialogTitle>
              <DialogDescription>
                Set up a timed interview session. Pick the type, choose a question, and start.
              </DialogDescription>
            </DialogHeader>

            <form
              id="create-mock-form"
              onSubmit={(e) => { e.preventDefault(); handleCreateMock(); }}
              className="grid gap-4 py-2"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Interview Type</Label>
                  <Select value={type} onValueChange={(v) => handleTypeChange(v as MockType)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {MOCK_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>{MOCK_TYPE_CONFIG[t].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Question Source</Label>
                  <Select value={source} onValueChange={(v) => setSource(v as MockQuestionSource)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {config.questionSources.map((s) => (
                        <SelectItem key={s} value={s}>{SOURCE_LABEL[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {source === "bank" && (
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Select value={bankQuestionId} onValueChange={setBankQuestionId} disabled={bankLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder={bankLoading ? "Loading…" : "Select a question"} />
                    </SelectTrigger>
                    <SelectContent>
                      {bankOptions.map((o) => (
                        <SelectItem key={o.id} value={String(o.id)}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!bankLoading && bankOptions.length === 0 && (
                    <p className="text-muted-foreground text-xs">No questions in the bank yet — try manual entry.</p>
                  )}
                </div>
              )}

              {source === "manual" && showTitle && (
                <div className="space-y-2">
                  <Label htmlFor="mock-title">Title</Label>
                  <Input
                    id="mock-title"
                    placeholder={type === "coding" ? "e.g. Course Schedule" : "e.g. Design a URL shortener"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              )}

              {source === "manual" && showPrompt && (
                <div className="space-y-2">
                  <Label htmlFor="mock-prompt">Prompt{showTitle ? " (optional)" : ""}</Label>
                  <Textarea
                    id="mock-prompt"
                    rows={3}
                    placeholder={
                      type === "behavioral"
                        ? "e.g. Tell me about a time you disagreed with your manager."
                        : "Describe the system to design and its constraints."
                    }
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {config.difficultyOptions.length > 0 && (
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {config.difficultyOptions.map((d) => (
                          <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="mock-time-limit">Time Limit (minutes)</Label>
                  <Input
                    id="mock-time-limit"
                    type="number"
                    min={1}
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mock-date">Date</Label>
                <Input id="mock-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </form>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button type="submit" form="create-mock-form" disabled={saving}>
                {saving ? "Creating..." : "Create and Start"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[0, 1].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-3"><Skeleton className="h-5 w-40" /></CardHeader>
                <CardContent><Skeleton className="h-10 w-24" /><Skeleton className="mt-2 h-4 w-52" /></CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><Skeleton className="h-5 w-36" /></CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
            </CardContent>
          </Card>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Error Loading Mock Interviews</h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" className="mt-4" onClick={fetchInterviews}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-pink-700" /> Total Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{summary?.completed ?? 0}</div>
                <p className="mt-1 text-sm text-muted-foreground">Across all interview types</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Pass Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{Math.round(summary?.passRate ?? 0)}%</div>
                <p className="mt-1 text-sm text-muted-foreground">On completed mock interviews</p>
              </CardContent>
            </Card>
          </div>

          {summary && summary.completed > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {summary.byType.map((s) => {
                const cfg = MOCK_TYPE_CONFIG[s.type];
                const Icon = cfg.icon;
                return (
                  <Card key={s.type}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Icon className="h-3.5 w-3.5" /> {cfg.label}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {s.completed} done · {Math.round(s.passRate)}% pass
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{s.avgOverallScore ? s.avgOverallScore.toFixed(1) : "—"}</div>
                        <div className="text-xs text-muted-foreground">avg /5</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Interview History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {interviews.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  No mock interviews yet. Create your first one.
                </div>
              ) : (
                <div className="space-y-3">
                  {interviews.map((interview) => {
                    const isCompleted = interview.status === "completed";
                    const cfg = getMockTypeConfig(interview.type);
                    const TypeIcon = cfg.icon;
                    const diff = questionDifficulty(interview);
                    return (
                      <div key={interview.id} className="rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="gap-1">
                                <TypeIcon className="h-3 w-3" /> {cfg.shortLabel}
                              </Badge>
                              <span className="text-lg font-semibold">{questionLabel(interview)}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatInTimeZone(new Date(interview.date), timezone, { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" /> Limit: {Math.round(interview.timeLimit / 60)}m
                              </span>
                              {isCompleted && (
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" /> Taken: {formatDuration(interview.timeTakenSeconds)}
                                </span>
                              )}
                              {diff && (
                                <Badge variant="outline" className={difficultyBadge(diff)}>{diff}</Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {!isCompleted && (
                              <Badge variant="outline" className={statusBadge("in_progress")}>
                                <Clock className="mr-1 h-3 w-3" /> In Progress
                              </Badge>
                            )}
                            {isCompleted && interview.solved && (
                              <Badge variant="outline" className={statusBadge("passed")}>
                                <CheckCircle2 className="mr-1 h-3 w-3" /> Passed
                              </Badge>
                            )}
                            {isCompleted && !interview.solved && (
                              <Badge variant="outline" className={statusBadge("failed")}>
                                <XCircle className="mr-1 h-3 w-3" /> Incomplete
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={() => router.push(`/mock/${interview.id}`)}
                            >
                              {isCompleted ? "View Details" : "Continue"}
                            </Button>
                          </div>
                        </div>

                        {isCompleted && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                            {interview.solved ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            {interview.type === "coding" ? (
                              <span>
                                Explanation: {interview.explanationScore ?? "-"} / 5, Code Quality: {interview.codeQualityScore ?? "-"} / 5
                              </span>
                            ) : (
                              <span>Overall: {interview.overallScore != null ? `${interview.overallScore.toFixed(1)} / 5` : "-"}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}

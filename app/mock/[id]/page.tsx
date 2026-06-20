"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle, ArrowLeft, CheckCircle2, Clock, Eye, Pause, Play, Plus, RotateCcw, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/common/section";
import { RubricScorer } from "@/components/mock/rubric-scorer";
import { staggerItem } from "@/lib/animations";
import { getMockTypeConfig, type MockType } from "@/types/mock";
import { previewMockOverall } from "@/lib/mock-score";

interface MockQuestion {
  title?: string;
  prompt?: string;
  difficulty?: string;
  category?: string;
  functionalRequirements?: string | null;
  nonFunctionalRequirements?: string | null;
  estimationNotes?: string | null;
  referenceSolution?: string | null;
  commonPitfalls?: string | null;
  whatTheyAssess?: string | null;
  followUps?: string | null;
  exemplarAnswer?: string | null;
  patterns?: string[];
  topics?: { id: number; name: string; category: string }[];
  competencies?: { id: number; name: string; type: string }[];
  linkedStories?: { id: number; title: string; strengthRating: number | null }[];
}

interface MockDetail {
  id: number;
  type: MockType;
  status: string;
  date: string;
  timeLimit: number;
  timeTakenSeconds: number | null;
  solved: boolean;
  explanationScore: number | null;
  codeQualityScore: number | null;
  overallScore: number | null;
  notes: string | null;
  storyId: number | null;
  question: MockQuestion;
}

interface StoryOption { id: number; title: string }

const formatClock = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
};

export default function MockInterviewDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const mockId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mock, setMock] = useState<MockDetail | null>(null);
  const [stories, setStories] = useState<StoryOption[]>([]);
  const [showReference, setShowReference] = useState(false);

  // Timer
  const [isRunning, setIsRunning] = useState(false);
  const [timerStartAt, setTimerStartAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Submit dialog
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [rubric, setRubric] = useState<Record<string, number>>({});
  const [timeTakenMinutes, setTimeTakenMinutes] = useState(0);
  const [status, setStatus] = useState("completed");
  const [solved, setSolved] = useState(true);
  const [usedReference, setUsedReference] = useState(false);
  const [approachNote, setApproachNote] = useState("");
  const [resultQuantified, setResultQuantified] = useState(false);
  const [usedNotes, setUsedNotes] = useState(false);
  const [reflectionNote, setReflectionNote] = useState("");
  const [storyId, setStoryId] = useState("");
  const [notes, setNotes] = useState("");

  const isCompleted = useMemo(() => mock?.status === "completed", [mock]);
  const config = getMockTypeConfig(mock?.type ?? "coding");
  const q = mock?.question;
  const headerTitle = q?.title ?? q?.prompt ?? "Mock Interview";

  const fetchMockDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/mock-interviews/${mockId}`);
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to load mock interview");
      }
      const data: MockDetail = await response.json();
      setMock(data);
      if (data.timeTakenSeconds) setElapsedSeconds(data.timeTakenSeconds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load mock interview");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (mockId) fetchMockDetails(); }, [mockId]);

  // Initialize the rubric to blank dimensions once the type is known.
  useEffect(() => {
    if (mock) {
      setRubric(Object.fromEntries(config.rubricDimensions.map((d) => [d.key, 0])));
    }
  }, [mock?.type]);

  // Behavioral story picker options.
  useEffect(() => {
    if (mock?.type !== "behavioral") return;
    fetch("/api/behavioral/stories")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.stories) setStories(d.stories.map((s: { id: number; title: string }) => ({ id: s.id, title: s.title }))); })
      .catch(() => {});
  }, [mock?.type]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning && timerStartAt) {
      intervalId = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - timerStartAt) / 1000));
      }, 1000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isRunning, timerStartAt]);

  const startTimer = () => {
    if (isCompleted) return;
    setIsRunning(true);
    setTimerStartAt(Date.now() - elapsedSeconds * 1000);
  };
  const pauseTimer = () => { setIsRunning(false); setTimerStartAt(null); };
  const resetTimer = () => {
    if (isCompleted) return;
    setIsRunning(false);
    setTimerStartAt(null);
    setElapsedSeconds(0);
  };

  const openSubmitModal = () => {
    if (isCompleted) return;
    if (isRunning) pauseTimer();
    setTimeTakenMinutes(elapsedSeconds > 0 ? Math.ceil(elapsedSeconds / 60) : timeTakenMinutes);
    setIsSubmitOpen(true);
  };

  const previewOverall = previewMockOverall(config.type, rubric, { resultQuantified });

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    if (!mock) return;

    if (!Number.isInteger(timeTakenMinutes) || timeTakenMinutes <= 0) {
      toast.error("Time taken must be a positive integer");
      return;
    }

    const payload: Record<string, unknown> = {
      timeTakenSeconds: timeTakenMinutes * 60,
      notes: notes.trim() || null,
    };

    if (mock.type === "coding") {
      const exp = rubric.explanationScore;
      const code = rubric.codeQualityScore;
      if (!(exp >= 1 && exp <= 5)) { toast.error("Explanation score must be between 1 and 5"); return; }
      if (!(code >= 1 && code <= 5)) { toast.error("Code quality score must be between 1 and 5"); return; }
      payload.status = "completed";
      payload.solved = solved;
      payload.explanationScore = exp;
      payload.codeQualityScore = code;
    } else {
      payload.status = status;
      for (const [k, v] of Object.entries(rubric)) if (v > 0) payload[k] = v;
      if (mock.type === "systemDesign") {
        payload.usedReference = usedReference;
        payload.approachNote = approachNote.trim() || undefined;
      } else {
        payload.resultQuantified = resultQuantified;
        payload.usedNotes = usedNotes;
        payload.reflectionNote = reflectionNote.trim() || undefined;
        if (storyId) payload.storyId = Number(storyId);
      }
    }

    try {
      setSaving(true);
      const response = await fetch(`/api/mock-interviews/${mock.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const p = await response.json().catch(() => ({}));
        throw new Error(p.error || "Failed to save mock interview");
      }
      toast.success("Mock interview submitted", {
        description: previewOverall != null ? `Overall ${previewOverall.toFixed(1)}/5` : undefined,
      });
      setIsSubmitOpen(false);
      router.push("/mock");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save mock interview");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="space-y-2"><Skeleton className="h-7 w-48" /><Skeleton className="h-4 w-64" /></div>
        </div>
        <Card><CardHeader><Skeleton className="h-5 w-36" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
      </div>
    );
  }

  if (error || !mock) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Error Loading Mock Interview</h3>
            <p className="mt-2 text-sm text-muted-foreground">{error || "Mock interview not found"}</p>
            <Button className="mt-4" variant="outline" onClick={() => router.push("/mock")}>Back to Mock Interviews</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const TypeIcon = config.icon;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <Button variant="outline" size="icon" onClick={() => router.push("/mock")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1"><TypeIcon className="h-3 w-3" /> {config.shortLabel}</Badge>
              {!isCompleted && <Badge variant="outline">In Progress</Badge>}
            </div>
            <h1 className="mt-1 text-2xl font-bold">{headerTitle}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {config.label} mock interview · {Math.round(mock.timeLimit / 60)} min target
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Question / prompt panel */}
        <div className="space-y-4 lg:col-span-2">
          {mock.type === "coding" && (
            <Card>
              <CardHeader><CardTitle className="text-base">Problem</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{q?.title}</p>
                {q?.difficulty && <Badge variant="outline" className="capitalize">{q.difficulty}</Badge>}
                {q?.patterns && q.patterns.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {q.patterns.map((name) => <Badge key={name} variant="outline">{name}</Badge>)}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {mock.type === "systemDesign" && (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Prompt</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="whitespace-pre-wrap text-sm">{q?.prompt}</p>
                  {q?.topics && q.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {q.topics.map((t) => <Badge key={t.id} variant="outline">{t.name}</Badge>)}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Framework Checklist</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Section title="Functional Requirements" body={q?.functionalRequirements} />
                  <Section title="Non-Functional Requirements" body={q?.nonFunctionalRequirements} />
                  <Section title="Capacity Estimation" body={q?.estimationNotes} />
                  <Section title="Common Pitfalls" body={q?.commonPitfalls} />
                </CardContent>
              </Card>
              {q?.referenceSolution && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Reference Solution</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setShowReference((s) => !s)}>
                      <Eye className="mr-1.5 h-3.5 w-3.5" /> {showReference ? "Hide" : "Reveal"}
                    </Button>
                  </CardHeader>
                  {showReference && <CardContent><p className="whitespace-pre-wrap text-sm">{q.referenceSolution}</p></CardContent>}
                </Card>
              )}
            </>
          )}

          {mock.type === "behavioral" && (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Question</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="whitespace-pre-wrap text-sm">{q?.prompt}</p>
                  <Section title="What they assess" body={q?.whatTheyAssess} />
                  <Section title="Common follow-ups" body={q?.followUps} />
                  {q?.competencies && q.competencies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {q.competencies.map((c) => (
                        <Badge key={c.id} variant={c.type === "LeadershipPrinciple" ? "secondary" : "outline"}>{c.name}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              {q?.exemplarAnswer && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Exemplar STAR Answer</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setShowReference((s) => !s)}>
                      <Eye className="mr-1.5 h-3.5 w-3.5" /> {showReference ? "Hide" : "Reveal"}
                    </Button>
                  </CardHeader>
                  {showReference && <CardContent><p className="whitespace-pre-wrap text-sm">{q.exemplarAnswer}</p></CardContent>}
                </Card>
              )}
            </>
          )}
        </div>

        {/* Timer / result panel */}
        <div className="space-y-4">
          {!isCompleted ? (
            <motion.div variants={staggerItem} initial="hidden" animate="visible">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" /> Timer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="font-mono text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatClock(elapsedSeconds)}
                    </div>
                    <Button onClick={resetTimer} variant="outline" size="icon" disabled={elapsedSeconds === 0}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-center gap-3">
                    {!isRunning ? (
                      <Button onClick={startTimer} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        <Play className="mr-2 h-4 w-4" /> Start
                      </Button>
                    ) : (
                      <Button onClick={pauseTimer} className="flex-1" variant="outline">
                        <Pause className="mr-2 h-4 w-4" /> Pause
                      </Button>
                    )}
                    <Button onClick={openSubmitModal} className="flex-1">
                      <Plus className="mr-2 h-4 w-4" /> Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardHeader><CardTitle className="text-base">Result</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  {mock.solved ? (
                    <Badge variant="outline" className="border-emerald-300 bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> {mock.type === "coding" ? "Passed" : "Completed"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-300 bg-red-100 text-red-700">
                      <XCircle className="mr-1 h-3.5 w-3.5" /> Incomplete
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Time Taken</p>
                    <p className="text-xl font-bold">{Math.round((mock.timeTakenSeconds || 0) / 60)}m</p>
                  </div>
                  {mock.type === "coding" ? (
                    <>
                      <div className="rounded-lg border p-3">
                        <p className="text-xs text-muted-foreground">Explanation</p>
                        <p className="text-xl font-bold">{mock.explanationScore ?? "-"} / 5</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-xs text-muted-foreground">Code Quality</p>
                        <p className="text-xl font-bold">{mock.codeQualityScore ?? "-"} / 5</p>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Overall</p>
                      <p className="text-xl font-bold">{mock.overallScore != null ? `${mock.overallScore.toFixed(1)} / 5` : "-"}</p>
                    </div>
                  )}
                </div>
                {mock.notes && (
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="mb-1 text-sm font-medium">Notes</p>
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{mock.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Mock Interview</DialogTitle>
            <DialogDescription>
              Record your time and rate yourself 1–5 on each rubric dimension. Leave a dimension blank to skip it.
            </DialogDescription>
          </DialogHeader>

          <form id="submit-mock-form" onSubmit={handleSubmit} className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="timeTakenMinutes">Time Taken (minutes)</Label>
                <Input
                  id="timeTakenMinutes"
                  type="number"
                  min={1}
                  value={timeTakenMinutes}
                  onChange={(e) => setTimeTakenMinutes(Number(e.target.value))}
                />
              </div>
              {mock.type !== "coding" && (
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="abandoned">Abandoned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {mock.type === "coding" && (
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Solved</p>
                  <p className="text-sm text-muted-foreground">Did you finish the problem successfully?</p>
                </div>
                <Switch checked={solved} onCheckedChange={setSolved} />
              </div>
            )}

            {mock.type === "behavioral" && (
              <div className="space-y-2">
                <Label>Story used (optional)</Label>
                <Select value={storyId || "none"} onValueChange={(v) => setStoryId(v === "none" ? "" : v)}>
                  <SelectTrigger><SelectValue placeholder="No story" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No story</SelectItem>
                    {stories.map((s) => <SelectItem key={s.id} value={String(s.id)}>{s.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            <RubricScorer
              dimensions={config.rubricDimensions}
              values={rubric}
              onChange={(key, value) => setRubric((r) => ({ ...r, [key]: value }))}
            />

            {mock.type === "systemDesign" && (
              <>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-sm font-medium">Used reference solution</div>
                    <div className="text-muted-foreground text-xs">Lowers confidence weighting</div>
                  </div>
                  <Switch checked={usedReference} onCheckedChange={setUsedReference} />
                </div>
                <div className="space-y-1">
                  <Label>Approach notes (optional)</Label>
                  <Textarea value={approachNote} onChange={(e) => setApproachNote(e.target.value)} rows={2} placeholder="What was your approach? What did you miss?" />
                </div>
              </>
            )}

            {mock.type === "behavioral" && (
              <>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-sm font-medium">Result quantified</div>
                    <div className="text-muted-foreground text-xs">Did you cite concrete metrics? (small bonus)</div>
                  </div>
                  <Switch checked={resultQuantified} onCheckedChange={setResultQuantified} />
                </div>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-sm font-medium">Used notes / exemplar</div>
                    <div className="text-muted-foreground text-xs">Lowers confidence weighting</div>
                  </div>
                  <Switch checked={usedNotes} onCheckedChange={setUsedNotes} />
                </div>
                <div className="space-y-1">
                  <Label>Reflection (optional)</Label>
                  <Textarea value={reflectionNote} onChange={(e) => setReflectionNote(e.target.value)} rows={2} placeholder="What worked? What to tighten next time?" />
                </div>
              </>
            )}

            <div className="space-y-1">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Brief feedback about your performance" />
            </div>

            {previewOverall != null && (
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-3 text-sm">
                <span className="text-muted-foreground">Overall score preview</span>
                <span className="text-lg font-bold">{previewOverall.toFixed(1)}/5</span>
              </div>
            )}
          </form>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsSubmitOpen(false)}>Cancel</Button>
            <Button type="submit" form="submit-mock-form" disabled={saving}>
              {saving ? "Saving..." : "Save Interview"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

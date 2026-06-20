"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, BookOpen, Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageContainer } from "@/components/layout/page-container";
import { SD_RUBRIC_DIMENSIONS } from "@/types/system-design";
import { calculateSDOverallScore } from "@/lib/analytics/system-design-metrics";

interface SDDetail {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  prompt: string;
  functionalRequirements: string | null;
  nonFunctionalRequirements: string | null;
  estimationNotes: string | null;
  referenceSolution: string | null;
  commonPitfalls: string | null;
  topics: { id: number; name: string; category: string }[];
  companies: string[];
  attempts: SDAttempt[];
}

interface SDAttempt {
  id: number;
  attemptNumber: number;
  overallScore: number | null;
  status: string;
  usedReference: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
}

const EMPTY_RUBRIC = Object.fromEntries(SD_RUBRIC_DIMENSIONS.map((d) => [d.key, 0])) as Record<string, number>;

function Section({ title, body }: { title: string; body: string | null }) {
  if (!body) return null;
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground whitespace-pre-wrap text-sm">{body}</p>
    </div>
  );
}

export default function SystemDesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [data, setData] = useState<SDDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReference, setShowReference] = useState(false);

  // Log attempt form state
  const [open, setOpen] = useState(false);
  const [rubric, setRubric] = useState<Record<string, number>>({ ...EMPTY_RUBRIC });
  const [minutes, setMinutes] = useState("45");
  const [status, setStatus] = useState("completed");
  const [usedReference, setUsedReference] = useState(false);
  const [approachNote, setApproachNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/system-design/${id}`);
      if (!res.ok) throw new Error("not found");
      const d = await res.json();
      setData(d.question);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  const previewOverall = calculateSDOverallScore(rubric as Parameters<typeof calculateSDOverallScore>[0]);

  const resetForm = () => {
    setRubric({ ...EMPTY_RUBRIC });
    setMinutes("45");
    setStatus("completed");
    setUsedReference(false);
    setApproachNote("");
  };

  const submitAttempt = async () => {
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        questionId: Number(id),
        timeSpentSeconds: Math.round(Number(minutes) * 60),
        status,
        usedReference,
        approachNote: approachNote || undefined,
      };
      for (const [k, v] of Object.entries(rubric)) if (v > 0) payload[k] = v;

      const res = await fetch("/api/system-design/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("Attempt logged", { description: previewOverall ? `Overall ${previewOverall.toFixed(1)}/5` : undefined });
      setOpen(false);
      resetForm();
      await fetchDetail();
    } catch {
      toast.error("Failed to log attempt");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer pageTitle="System Design">
        <div className="space-y-4">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-40 w-full" />
        </div>
      </PageContainer>
    );
  }

  if (!data) {
    return (
      <PageContainer pageTitle="Not found">
        <Button variant="outline" onClick={() => router.push("/system-design")}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      pageTitle={data.title}
      pageDescription={`${data.category} · ${data.difficulty}`}
      pageHeaderAction={
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Log Attempt</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Log a System Design Attempt</DialogTitle>
              <DialogDescription>Rate yourself 1–5 on each FAANG rubric dimension. Leave blank to skip.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Time (minutes)</Label>
                  <Input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                </div>
                <div className="space-y-1">
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
              </div>

              <div className="space-y-2">
                {SD_RUBRIC_DIMENSIONS.map((d) => (
                  <div key={d.key} className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">{d.label}</div>
                      <div className="text-muted-foreground text-xs">{d.description}</div>
                    </div>
                    <Select value={String(rubric[d.key] || "")} onValueChange={(v) => setRubric((r) => ({ ...r, [d.key]: Number(v) }))}>
                      <SelectTrigger className="w-20 shrink-0"><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="text-sm font-medium">Used reference solution</div>
                  <div className="text-muted-foreground text-xs">Lowers confidence weighting</div>
                </div>
                <Switch checked={usedReference} onCheckedChange={setUsedReference} />
              </div>

              <div className="space-y-1">
                <Label>Approach notes (optional)</Label>
                <Textarea value={approachNote} onChange={(e) => setApproachNote(e.target.value)} rows={3} placeholder="What was your approach? What did you miss?" />
              </div>

              {previewOverall != null && (
                <div className="bg-muted/50 flex items-center justify-between rounded-md p-3 text-sm">
                  <span className="text-muted-foreground">Overall score preview</span>
                  <span className="text-lg font-bold">{previewOverall.toFixed(1)}/5</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>Cancel</Button>
              <Button onClick={submitAttempt} disabled={submitting}>{submitting ? "Saving…" : "Save Attempt"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Prompt</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="whitespace-pre-wrap text-sm">{data.prompt}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.topics.map((t) => <Badge key={t.id} variant="outline">{t.name}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Framework Checklist</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Section title="Functional Requirements" body={data.functionalRequirements} />
              <Section title="Non-Functional Requirements" body={data.nonFunctionalRequirements} />
              <Section title="Capacity Estimation" body={data.estimationNotes} />
              <Section title="Common Pitfalls" body={data.commonPitfalls} />
            </CardContent>
          </Card>

          {data.referenceSolution && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Reference Solution</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowReference((s) => !s)}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> {showReference ? "Hide" : "Reveal"}
                </Button>
              </CardHeader>
              {showReference && (
                <CardContent><p className="whitespace-pre-wrap text-sm">{data.referenceSolution}</p></CardContent>
              )}
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Attempt History</CardTitle></CardHeader>
            <CardContent>
              {data.attempts.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-center text-sm">
                  <BookOpen className="h-8 w-8 opacity-40" />
                  No attempts yet
                </div>
              ) : (
                <ul className="space-y-2">
                  {data.attempts.map((a) => (
                    <li key={a.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                      <div>
                        <div className="font-medium">Attempt #{a.attemptNumber}</div>
                        <div className="text-muted-foreground text-xs">
                          {new Date(a.submittedAt).toLocaleDateString()} · {Math.round(a.timeSpentSeconds / 60)}m
                          {a.usedReference && " · ref"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{a.overallScore != null ? `${a.overallScore.toFixed(1)}` : "—"}</div>
                        <div className="text-muted-foreground text-xs capitalize">{a.status}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

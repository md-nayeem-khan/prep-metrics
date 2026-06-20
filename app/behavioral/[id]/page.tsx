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
import { STAR_RUBRIC_DIMENSIONS } from "@/types/behavioral";
import { calculateBehavioralOverallScore } from "@/lib/analytics/behavioral-metrics";

interface BQDetail {
  id: number;
  prompt: string;
  category: string;
  whatTheyAssess: string | null;
  exemplarAnswer: string | null;
  followUps: string | null;
  competencies: { id: number; name: string; type: string; company: string | null }[];
  companies: string[];
  linkedStories: { id: number; title: string; strengthRating: number | null }[];
  attempts: BAttempt[];
}

interface BAttempt {
  id: number;
  attemptNumber: number;
  overallScore: number | null;
  status: string;
  resultQuantified: boolean;
  usedNotes: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
  story: { id: number; title: string } | null;
}

interface StoryOption { id: number; title: string }

const EMPTY_RUBRIC = Object.fromEntries(STAR_RUBRIC_DIMENSIONS.map((d) => [d.key, 0])) as Record<string, number>;

function Section({ title, body }: { title: string; body: string | null }) {
  if (!body) return null;
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground whitespace-pre-wrap text-sm">{body}</p>
    </div>
  );
}

export default function BehavioralDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [data, setData] = useState<BQDetail | null>(null);
  const [stories, setStories] = useState<StoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExemplar, setShowExemplar] = useState(false);

  const [open, setOpen] = useState(false);
  const [rubric, setRubric] = useState<Record<string, number>>({ ...EMPTY_RUBRIC });
  const [resultQuantified, setResultQuantified] = useState(false);
  const [storyId, setStoryId] = useState<string>("");
  const [minutes, setMinutes] = useState("4");
  const [status, setStatus] = useState("completed");
  const [usedNotes, setUsedNotes] = useState(false);
  const [reflectionNote, setReflectionNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/behavioral/${id}`);
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

  useEffect(() => {
    fetch("/api/behavioral/stories")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.stories) setStories(d.stories.map((s: { id: number; title: string }) => ({ id: s.id, title: s.title }))); })
      .catch(() => {});
  }, []);

  const previewOverall = calculateBehavioralOverallScore(
    { ...rubric, resultQuantified } as Parameters<typeof calculateBehavioralOverallScore>[0],
  );

  const resetForm = () => {
    setRubric({ ...EMPTY_RUBRIC });
    setResultQuantified(false);
    setStoryId("");
    setMinutes("4");
    setStatus("completed");
    setUsedNotes(false);
    setReflectionNote("");
  };

  const submitAttempt = async () => {
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        questionId: Number(id),
        timeSpentSeconds: Math.round(Number(minutes) * 60),
        status,
        resultQuantified,
        usedNotes,
        reflectionNote: reflectionNote || undefined,
        storyId: storyId ? Number(storyId) : undefined,
      };
      for (const [k, v] of Object.entries(rubric)) if (v > 0) payload[k] = v;

      const res = await fetch("/api/behavioral/attempts", {
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
    return <PageContainer pageTitle="Behavioral"><div className="space-y-4"><Skeleton className="h-8 w-72" /><Skeleton className="h-40 w-full" /></div></PageContainer>;
  }

  if (!data) {
    return (
      <PageContainer pageTitle="Not found">
        <Button variant="outline" onClick={() => router.push("/behavioral")}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      pageTitle={data.prompt}
      pageDescription={data.category}
      pageHeaderAction={
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Log Attempt</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Log a Behavioral Attempt</DialogTitle>
              <DialogDescription>Rate your answer 1–5 on each STAR dimension. Leave blank to skip.</DialogDescription>
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

              <div className="space-y-1">
                <Label>Story used (optional)</Label>
                <Select value={storyId || "none"} onValueChange={(v) => setStoryId(v === "none" ? "" : v)}>
                  <SelectTrigger><SelectValue placeholder="No story" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No story</SelectItem>
                    {stories.map((s) => <SelectItem key={s.id} value={String(s.id)}>{s.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {STAR_RUBRIC_DIMENSIONS.map((d) => (
                  <div key={d.key} className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">{d.label}</div>
                      <div className="text-muted-foreground text-xs">{d.description}</div>
                    </div>
                    <Select value={String(rubric[d.key] || "")} onValueChange={(v) => setRubric((r) => ({ ...r, [d.key]: Number(v) }))}>
                      <SelectTrigger className="w-20 shrink-0"><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>{[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

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
                <Textarea value={reflectionNote} onChange={(e) => setReflectionNote(e.target.value)} rows={3} placeholder="What worked? What to tighten next time?" />
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
            <CardHeader><CardTitle className="text-base">What they assess</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Section title="Signals" body={data.whatTheyAssess} />
              <Section title="Common follow-ups" body={data.followUps} />
              <div className="flex flex-wrap gap-1.5">
                {data.competencies.map((c) => (
                  <Badge key={c.id} variant={c.type === "LeadershipPrinciple" ? "secondary" : "outline"}>{c.name}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {data.exemplarAnswer && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Exemplar STAR Answer</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowExemplar((s) => !s)}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> {showExemplar ? "Hide" : "Reveal"}
                </Button>
              </CardHeader>
              {showExemplar && <CardContent><p className="whitespace-pre-wrap text-sm">{data.exemplarAnswer}</p></CardContent>}
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Attempt History</CardTitle></CardHeader>
            <CardContent>
              {data.attempts.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-center text-sm">
                  <BookOpen className="h-8 w-8 opacity-40" /> No attempts yet
                </div>
              ) : (
                <ul className="space-y-2">
                  {data.attempts.map((a) => (
                    <li key={a.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                      <div>
                        <div className="font-medium">Attempt #{a.attemptNumber}</div>
                        <div className="text-muted-foreground text-xs">
                          {new Date(a.submittedAt).toLocaleDateString()}{a.story && ` · ${a.story.title}`}{a.resultQuantified && " · quantified"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{a.overallScore != null ? a.overallScore.toFixed(1) : "—"}</div>
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

"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Bookmark, AlertCircle, Pencil, Trash2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageContainer } from "@/components/layout/page-container";

interface Story {
  id: number;
  title: string;
  situation: string | null;
  task: string | null;
  action: string | null;
  result: string | null;
  metrics: string | null;
  strengthRating: number | null;
  competencies: { id: number; name: string; type: string }[];
  usageCount: number;
}

interface Competency { id: number; name: string; type: string }
interface Health { storyCount: number; strongStoryCount: number; avgCompetenciesPerStory: number; coveredCompetencies: number; totalCompetencies: number; gapCompetencies: string[] }

const blankForm = { title: "", situation: "", task: "", action: "", result: "", metrics: "", strengthRating: "3", competencyIds: [] as number[] };

export default function StoryBankPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...blankForm });
  const [submitting, setSubmitting] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sRes, hRes] = await Promise.all([
        fetch("/api/behavioral/stories"),
        fetch("/api/behavioral/analytics/story-health"),
      ]);
      if (!sRes.ok) throw new Error("Failed to load stories");
      const sData = await sRes.json();
      setStories(sData.stories || []);
      if (hRes.ok) setHealth((await hRes.json()).health);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    fetch("/api/behavioral/competencies")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.competencies) setCompetencies(d.competencies); })
      .catch(() => {});
  }, [fetchAll]);

  const openCreate = () => { setEditingId(null); setForm({ ...blankForm }); setOpen(true); };
  const openEdit = (s: Story) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      situation: s.situation || "",
      task: s.task || "",
      action: s.action || "",
      result: s.result || "",
      metrics: s.metrics || "",
      strengthRating: String(s.strengthRating ?? 3),
      competencyIds: s.competencies.map((c) => c.id),
    });
    setOpen(true);
  };

  const toggleCompetency = (cid: number) => {
    setForm((f) => ({
      ...f,
      competencyIds: f.competencyIds.includes(cid) ? f.competencyIds.filter((x) => x !== cid) : [...f.competencyIds, cid],
    }));
  };

  const submit = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        situation: form.situation || null,
        task: form.task || null,
        action: form.action || null,
        result: form.result || null,
        metrics: form.metrics || null,
        strengthRating: Number(form.strengthRating),
        competencyIds: form.competencyIds,
      };
      const res = await fetch(editingId ? `/api/behavioral/stories/${editingId}` : "/api/behavioral/stories", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(editingId ? "Story updated" : "Story added");
      setOpen(false);
      await fetchAll();
    } catch {
      toast.error("Failed to save story");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id: number) => {
    try {
      const res = await fetch(`/api/behavioral/stories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Story deleted");
      await fetchAll();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const lpCompetencies = competencies.filter((c) => c.type === "LeadershipPrinciple");
  const genericCompetencies = competencies.filter((c) => c.type !== "LeadershipPrinciple");

  return (
    <PageContainer
      pageTitle="STAR Story Bank"
      pageDescription="Reusable, quantified stories mapped to competencies — the backbone of behavioral prep"
      pageHeaderAction={<Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> Add Story</Button>}
    >
      <div className="flex flex-col gap-4">
        {health && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Stories", value: health.storyCount },
              { label: "Strong (4+)", value: health.strongStoryCount, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Avg competencies/story", value: health.avgCompetenciesPerStory },
              { label: "Competency coverage", value: `${health.coveredCompetencies}/${health.totalCompetencies}` },
            ].map((s) => (
              <Card key={s.label}><CardContent className="py-4">
                <div className={`text-2xl font-bold ${s.color ?? ""}`}>{s.value}</div>
                <div className="text-muted-foreground text-xs">{s.label}</div>
              </CardContent></Card>
            ))}
          </div>
        )}

        {loading ? (
          <Card><CardContent className="space-y-3 py-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</CardContent></Card>
        ) : error ? (
          <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <AlertCircle className="text-destructive/50 h-10 w-10" /><p className="text-muted-foreground text-sm">{error}</p>
          </CardContent></Card>
        ) : stories.length === 0 ? (
          <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <Bookmark className="text-muted-foreground/40 h-10 w-10" />
            <p className="text-sm font-medium">No stories yet</p>
            <p className="text-muted-foreground text-xs">Write your first STAR story and map it to competencies</p>
          </CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {stories.map((s) => (
              <Card key={s.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
                  <div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`h-3.5 w-3.5 ${(s.strengthRating ?? 0) >= n ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                      ))}
                      {s.usageCount > 0 && <span className="text-muted-foreground ml-2 text-xs">used {s.usageCount}×</span>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(s.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {s.result && <p className="text-muted-foreground line-clamp-2 text-sm">{s.result}</p>}
                  <div className="flex flex-wrap gap-1">
                    {s.competencies.map((c) => (
                      <Badge key={c.id} variant={c.type === "LeadershipPrinciple" ? "secondary" : "outline"} className="text-xs font-normal">{c.name}</Badge>
                    ))}
                    {s.competencies.length === 0 && <span className="text-muted-foreground text-xs">No competencies mapped</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create / edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Story" : "Add STAR Story"}</DialogTitle>
            <DialogDescription>Capture the Situation, Task, Action, Result — and map it to the competencies it demonstrates.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Migrated billing system under deadline" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1"><Label>Situation</Label><Textarea rows={2} value={form.situation} onChange={(e) => setForm((f) => ({ ...f, situation: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Task</Label><Textarea rows={2} value={form.task} onChange={(e) => setForm((f) => ({ ...f, task: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Action</Label><Textarea rows={2} value={form.action} onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))} /></div>
              <div className="space-y-1"><Label>Result</Label><Textarea rows={2} value={form.result} onChange={(e) => setForm((f) => ({ ...f, result: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1"><Label>Quantified metrics</Label><Input value={form.metrics} onChange={(e) => setForm((f) => ({ ...f, metrics: e.target.value }))} placeholder="e.g. cut latency 40%, saved 2 eng-weeks/qtr" /></div>
              <div className="space-y-1">
                <Label>Story strength (1–5)</Label>
                <Select value={form.strengthRating} onValueChange={(v) => setForm((f) => ({ ...f, strengthRating: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Competencies / Leadership Principles</Label>
              <div className="max-h-44 space-y-2 overflow-y-auto rounded-md border p-2">
                {lpCompetencies.length > 0 && (
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs font-medium">Amazon Leadership Principles</div>
                    <div className="flex flex-wrap gap-1.5">
                      {lpCompetencies.map((c) => (
                        <Badge key={c.id} variant={form.competencyIds.includes(c.id) ? "secondary" : "outline"} className="cursor-pointer" onClick={() => toggleCompetency(c.id)}>{c.name}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {genericCompetencies.length > 0 && (
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs font-medium">Competencies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {genericCompetencies.map((c) => (
                        <Badge key={c.id} variant={form.competencyIds.includes(c.id) ? "secondary" : "outline"} className="cursor-pointer" onClick={() => toggleCompetency(c.id)}>{c.name}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={submit} disabled={submitting}>{submitting ? "Saving…" : "Save Story"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

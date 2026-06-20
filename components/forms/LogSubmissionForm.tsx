"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface LogSubmissionFormProps {
  problemId?: number;
  onSuccess?: () => void;
}

export function LogSubmissionForm({ problemId, onSuccess }: LogSubmissionFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    problemId: problemId || 0,
    timeSpentMinutes: 0,
    usedHints: false,
    approach: "",
    notes: "",
    passed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.problemId || !formData.timeSpentMinutes) {
      toast.error("Please fill in required fields");
      return;
    }

    setLoading(true);

    try {
      const submissionData = {
        problemId: formData.problemId,
        timeSpentSeconds: formData.timeSpentMinutes * 60,
        status: formData.passed ? 'solved' : 'failed',
        submittedAt: new Date().toISOString(),
        notes: formData.notes,
        wasHintUsed: formData.usedHints,
        approachNote: formData.approach,
      };

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Failed to log submission");

      if (formData.passed && formData.timeSpentMinutes <= 25 && !formData.usedHints) {
        toast.success("Perfect solve! Amazing work!");
      } else if (formData.passed) {
        toast.success("Great job! Problem solved!");
      } else {
        toast.success("Submission logged. Keep practicing!");
      }

      setOpen(false);
      onSuccess?.();
    } catch {
      toast.error("Failed to log submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Log Submission
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Log Problem Submission</DialogTitle>
          <DialogDescription>
            Record your attempt details to track progress and improve over time.
          </DialogDescription>
        </DialogHeader>

        <form id="log-submission-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          {!problemId && (
            <div className="space-y-2">
              <Label htmlFor="problemId">Problem ID *</Label>
              <Input
                id="problemId"
                type="number"
                value={formData.problemId || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, problemId: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="timeSpent">Time Spent (minutes) *</Label>
            <Input
              id="timeSpent"
              type="number"
              value={formData.timeSpentMinutes || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, timeSpentMinutes: parseInt(e.target.value) || 0 }))}
              required
            />
          </div>

          <div className="flex items-center justify-between rounded-md border p-4">
            <Label>Successfully solved?</Label>
            <Switch
              checked={formData.passed}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, passed: checked }))}
            />
          </div>

          <div className="flex items-center justify-between rounded-md border p-4">
            <Label>Used hints?</Label>
            <Switch
              checked={formData.usedHints}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, usedHints: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="approach">Approach Used</Label>
            <Textarea
              id="approach"
              value={formData.approach}
              onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
              placeholder="Describe your solution approach..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes & Learnings</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any insights or things to remember..."
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="log-submission-form"
            disabled={loading}
          >
            {loading ? "Logging..." : "Log Submission"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

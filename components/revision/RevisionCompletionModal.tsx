"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { difficultyBadge } from "@/lib/status-colors";
import { CheckCircle2, Clock, Brain, Sparkles, TrendingUp, MessageCircle } from "lucide-react";

interface RevisionItem {
  id: number;
  problemId: number;
  problemTitle: string;
  pattern: string;
  difficulty: "Easy" | "Medium" | "Hard";
  dueDate: string;
  interval: number;
  repetition: number;
  isOverdue: boolean;
  company?: string;
}

interface CompletionResult {
  wasSuccessful: boolean;
  timeSpentSeconds?: number;
  solvedWithoutHint?: boolean;
  confidenceLevel?: number;
  difficultyRating?: number;
  notes?: string;
}

interface RevisionCompletionModalProps {
  revision: RevisionItem;
  onComplete: (result: CompletionResult) => void;
  isOverdue?: boolean;
}

export function RevisionCompletionModal({
  revision,
  onComplete,
  isOverdue = false,
}: RevisionCompletionModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [wasSuccessful, setWasSuccessful] = useState<boolean | null>(null);
  const [timeSpent, setTimeSpent] = useState<string>("");
  const [solvedWithoutHint, setSolvedWithoutHint] = useState<boolean | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState<number | null>(null);
  const [difficultyRating, setDifficultyRating] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    if (wasSuccessful === null) return;

    setLoading(true);

    try {
      const result: CompletionResult = {
        wasSuccessful,
        timeSpentSeconds: timeSpent ? parseInt(timeSpent) * 60 : undefined,
        solvedWithoutHint: solvedWithoutHint ?? undefined,
        confidenceLevel: confidenceLevel ?? undefined,
        difficultyRating: difficultyRating ?? undefined,
        notes: notes.trim() || undefined,
      };

      await onComplete(result);
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error completing revision:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setWasSuccessful(null);
    setTimeSpent("");
    setSolvedWithoutHint(null);
    setConfidenceLevel(null);
    setDifficultyRating(null);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={isOverdue ? "destructive" : "default"}>
          {isOverdue ? (
            "Review Now"
          ) : (
            <>
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Complete
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Revision: {revision.problemTitle}</DialogTitle>
          <DialogDescription>
            Log your revision result and rate your confidence and difficulty.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 -mt-2">
          <Badge className={difficultyBadge(revision.difficulty)}>
            {revision.difficulty}
          </Badge>
          <Badge variant="outline">{revision.pattern}</Badge>
          {revision.company && (
            <Badge variant="secondary">{revision.company}</Badge>
          )}
        </div>

        <div className="grid gap-6 py-2">
          {/* Success/Failure */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Did you solve it successfully?
            </Label>
            <RadioGroup
              value={wasSuccessful?.toString()}
              onValueChange={(value) => setWasSuccessful(value === "true")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="success" />
                <Label htmlFor="success">Yes, I solved it correctly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="failure" />
                <Label htmlFor="failure">No, I couldn&apos;t solve it or made mistakes</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Time Spent */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              How long did it take? (minutes)
            </Label>
            <Input
              type="number"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              placeholder="e.g., 25"
              className="w-32"
            />
          </div>

          {/* Hint Usage */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Did you solve it without hints?
            </Label>
            <RadioGroup
              value={solvedWithoutHint?.toString()}
              onValueChange={(value) => setSolvedWithoutHint(value === "true")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="no-hints" />
                <Label htmlFor="no-hints">No hints needed — solved independently</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="used-hints" />
                <Label htmlFor="used-hints">Used hints or looked at solution</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Confidence Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              How confident do you feel about this problem now?
            </Label>
            <RadioGroup
              value={confidenceLevel?.toString()}
              onValueChange={(value) => setConfidenceLevel(parseInt(value))}
              className="grid grid-cols-5 gap-2"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value={level.toString()} id={`confidence-${level}`} />
                  <Label
                    htmlFor={`confidence-${level}`}
                    className="text-xs text-center cursor-pointer"
                  >
                    {level === 1 && "Not confident"}
                    {level === 2 && "Slightly"}
                    {level === 3 && "Neutral"}
                    {level === 4 && "Confident"}
                    {level === 5 && "Very confident"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Difficulty Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              How difficult did this feel during revision?
            </Label>
            <RadioGroup
              value={difficultyRating?.toString()}
              onValueChange={(value) => setDifficultyRating(parseInt(value))}
              className="grid grid-cols-5 gap-2"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value={level.toString()} id={`difficulty-${level}`} />
                  <Label
                    htmlFor={`difficulty-${level}`}
                    className="text-xs text-center cursor-pointer"
                  >
                    {level === 1 && "Very easy"}
                    {level === 2 && "Easy"}
                    {level === 3 && "Medium"}
                    {level === 4 && "Hard"}
                    {level === 5 && "Very hard"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Notes (optional)
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you learn? What mistakes did you make? Any insights?"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={wasSuccessful === null || loading}
          >
            {loading ? "Completing..." : "Complete Revision"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

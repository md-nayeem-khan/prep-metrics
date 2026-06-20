"use client"

import { useState } from "react"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Lightbulb,
  Calendar,
  Hash,
  FileText,
  Brain
} from "lucide-react"

interface Submission {
  id: number
  problemId: number
  attemptNumber: number
  timeSpentSeconds: number
  status: string
  notes?: string | null
  submittedAt: string
  attemptType: string
  wasHintUsed: boolean
  mistakeNote?: string | null
  approachNote?: string | null
  patternRecognitionSeconds?: number | null
}

interface SubmissionDetailsModalProps {
  submission: Submission
  problemTitle?: string
}

export function SubmissionDetailsModal({ submission, problemTitle }: SubmissionDetailsModalProps) {
  const [open, setOpen] = useState(false)

  if (!submission) {
    return null
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            Detailed breakdown of this attempt including time, hints, and notes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>Attempt #{submission.attemptNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(submission.submittedAt)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={submission.status === 'solved' ? "default" : "destructive"}
                  className={
                    submission.status === 'solved'
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300"
                      : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300"
                  }
                >
                  {submission.status === 'solved' ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Solved
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Failed
                    </>
                  )}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Type: {submission.attemptType}
              </div>
            </div>
          </div>

          <Separator />

          {/* Time & Performance */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time & Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Total Time</div>
                <div className="font-medium">{formatTime(submission.timeSpentSeconds)}</div>
              </div>
              {submission.patternRecognitionSeconds && (
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Pattern Recognition</div>
                  <div className="font-medium flex items-center gap-1">
                    <Brain className="h-3 w-3 text-primary" />
                    {formatTime(submission.patternRecognitionSeconds)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Hints Used */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Hints
            </h3>
            <div>
              {submission.wasHintUsed ? (
                <Badge variant="outline" className="text-amber-600 border-amber-300">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Hints Used
                </Badge>
              ) : (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  No Hints Used
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Notes Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes & Approach
            </h3>
            
            {submission.approachNote && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Approach</div>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  {submission.approachNote}
                </div>
              </div>
            )}

            {submission.mistakeNote && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Mistakes & Learning</div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm dark:bg-amber-900/20 dark:border-amber-800">
                  {submission.mistakeNote}
                </div>
              </div>
            )}

            {submission.notes && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Additional Notes</div>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  {submission.notes}
                </div>
              </div>
            )}

            {!submission.approachNote && !submission.mistakeNote && !submission.notes && (
              <div className="text-muted-foreground text-sm italic">
                No notes recorded for this submission.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
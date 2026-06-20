"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  History,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Brain,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react";
import { format } from "date-fns";

interface RevisionHistoryItem {
  id: number;
  intervalLevel: number;
  completedAt: string;
  wasSuccessful: boolean;
  timeSpentSeconds?: number;
  solvedWithoutHint?: boolean;
  confidenceLevel?: number;
  difficultyRating?: number;
  notes?: string;
  performance?: {
    timeDifferenceSeconds: number;
    improvementPercentage: number;
    wasImprovement: boolean;
  };
}

interface RevisionStatistics {
  totalRevisions: number;
  successfulRevisions: number;
  successRate: number;
  averageTimeSeconds?: number;
  confidenceTrend?: number;
  latestConfidence?: number;
}

interface RevisionHistoryModalProps {
  revisionId: number;
  problemTitle: string;
  triggerButton?: React.ReactNode;
}

export function RevisionHistoryModal({
  revisionId,
  problemTitle,
  triggerButton,
}: RevisionHistoryModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<RevisionHistoryItem[]>([]);
  const [statistics, setStatistics] = useState<RevisionStatistics | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/revisions/${revisionId}/history`);
      if (!response.ok) throw new Error('Failed to fetch history');

      const data = await response.json();
      setHistory(data.revisionHistory || []);
      setStatistics(data.statistics || null);
    } catch (error) {
      console.error('Error fetching revision history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) fetchHistory();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
    return `${seconds}s`;
  };

  const getConfidenceLabel = (level?: number) => {
    if (!level) return "—";
    const labels = ["", "1/5", "2/5", "3/5", "4/5", "5/5"];
    return labels[level] || "—";
  };

  const getDifficultyLabel = (level?: number) => {
    if (!level) return "—";
    const labels = ["", "Very easy", "Easy", "Medium", "Hard", "Very hard"];
    return labels[level] || "—";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-1">
            <History className="h-3 w-3" />
            History
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Revision History: {problemTitle}</DialogTitle>
          <DialogDescription>
            All past revision attempts, metrics, and performance trends.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Statistics Overview */}
            {statistics && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart3 className="h-4 w-4" />
                    Overall Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {statistics.totalRevisions}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Revisions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {Math.round(statistics.successRate)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {statistics.averageTimeSeconds ? formatTime(statistics.averageTimeSeconds) : "N/A"}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {statistics.latestConfidence ?? "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">Latest Confidence</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Revision Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4" />
                  Revision Timeline ({history.length} attempts)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((revision, index) => (
                    <div
                      key={revision.id}
                      className="flex gap-4 p-4 border rounded-lg bg-muted/50"
                    >
                      {/* Timeline dot */}
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          revision.wasSuccessful ? 'bg-green-500' : 'bg-destructive'
                        }`} />
                        {index < history.length - 1 && (
                          <div className="w-0.5 h-16 bg-border mt-2" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={revision.wasSuccessful ? "default" : "destructive"}>
                              {revision.wasSuccessful ? (
                                <><CheckCircle2 className="h-3 w-3 mr-1" />Success</>
                              ) : (
                                <><XCircle className="h-3 w-3 mr-1" />Failed</>
                              )}
                            </Badge>
                            <Badge variant="outline">Level {revision.intervalLevel + 1}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(revision.completedAt), 'MMM d, h:mm a')}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{revision.timeSpentSeconds ? formatTime(revision.timeSpentSeconds) : "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Brain className="h-3 w-3 text-muted-foreground" />
                            <span>{revision.solvedWithoutHint ? "No hints" : "Used hints"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3 text-muted-foreground" />
                            <span>Confidence: {getConfidenceLabel(revision.confidenceLevel)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Difficulty: {getDifficultyLabel(revision.difficultyRating)}</span>
                          </div>
                        </div>

                        {revision.performance && (
                          <div className={`p-2 rounded-lg border text-sm ${
                            revision.performance.wasImprovement
                              ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900'
                              : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'
                          }`}>
                            <div className="flex items-center gap-2">
                              {revision.performance.wasImprovement ? (
                                <>
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  <span className="text-green-700 dark:text-green-400 font-medium">
                                    Improved by {revision.performance.timeDifferenceSeconds}s
                                    ({revision.performance.improvementPercentage}% faster)
                                  </span>
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                  <span className="text-red-700 dark:text-red-400 font-medium">
                                    Took {Math.abs(revision.performance.timeDifferenceSeconds)}s longer
                                    ({Math.abs(revision.performance.improvementPercentage)}% slower)
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {revision.notes && (
                          <div className="flex gap-2 p-2 bg-muted/50 border rounded-lg">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{revision.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {history.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No revision history available yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

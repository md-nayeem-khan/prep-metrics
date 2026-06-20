"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Timer,
  CheckCircle2,
  XCircle,
  Target,
  TrendingUp,
  Zap,
  Play,
  SkipForward,
} from "lucide-react";
import { toast } from "sonner";

interface Pattern {
  id: number;
  name: string;
  category?: string;
}

interface PatternRecognitionDrillProps {
  problemId: number;
  problemTitle: string;
  correctPatterns: Pattern[];
  onComplete: (recognitionTimeSeconds: number, selectedPatternIds: number[]) => void;
}

export function PatternRecognitionDrill({
  problemId,
  problemTitle,
  correctPatterns,
  onComplete,
}: PatternRecognitionDrillProps) {
  const [allPatterns, setAllPatterns] = useState<Pattern[]>([]);
  const [selectedPatternIds, setSelectedPatternIds] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<{
    correct: number[];
    incorrect: number[];
    missed: number[];
    timeSeconds: number;
  } | null>(null);

  // Load all available patterns
  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await fetch("/api/patterns");
        const data = await response.json();
        setAllPatterns(data.patterns || []);
      } catch (error) {
        console.error("Failed to load patterns:", error);
        toast.error("Failed to load patterns");
      }
    };
    fetchPatterns();
  }, []);

  // Timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isStarted && !isCompleted && startTime) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isStarted, isCompleted, startTime]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setSelectedPatternIds([]);
    setResults(null);
    setIsCompleted(false);
  };

  const handlePatternToggle = (patternId: number) => {
    if (isCompleted) return;

    setSelectedPatternIds((prev) => {
      if (prev.includes(patternId)) {
        return prev.filter((id) => id !== patternId);
      } else {
        return [...prev, patternId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedPatternIds.length === 0) {
      toast.error("Please select at least one pattern");
      return;
    }

    const timeSeconds = elapsedTime;
    const correctPatternIds = correctPatterns.map((p) => p.id);

    const correct = selectedPatternIds.filter((id) =>
      correctPatternIds.includes(id)
    );
    const incorrect = selectedPatternIds.filter(
      (id) => !correctPatternIds.includes(id)
    );
    const missed = correctPatternIds.filter(
      (id) => !selectedPatternIds.includes(id)
    );

    setResults({
      correct,
      incorrect,
      missed,
      timeSeconds,
    });
    setIsCompleted(true);

    // Notify parent component
    onComplete(timeSeconds, selectedPatternIds);

    // Show feedback
    if (incorrect.length === 0 && missed.length === 0) {
      if (timeSeconds <= 120) {
        toast.success("🎯 Perfect! Excellent pattern recognition speed!");
      } else {
        toast.success("✅ Correct patterns identified!");
      }
    } else {
      toast.warning("Review the correct patterns and try to improve next time");
    }
  };

  const handleSkip = () => {
    setResults({
      correct: [],
      incorrect: [],
      missed: correctPatterns.map((p) => p.id),
      timeSeconds: elapsedTime,
    });
    setIsCompleted(true);
    onComplete(0, []); // 0 indicates skipped
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return mins > 0 ? `${mins}:${secs.padStart(4, "0")}` : `${secs}s`;
  };

  const getTimeColor = (seconds: number): string => {
    if (seconds <= 60) return "text-emerald-600";
    if (seconds <= 120) return "text-blue-600";
    if (seconds <= 180) return "text-amber-600";
    return "text-red-600";
  };

  const getPatternBadgeClass = (patternId: number): string => {
    if (!results) {
      if (selectedPatternIds.includes(patternId)) {
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700";
      }
      return "bg-muted text-muted-foreground border-border hover:bg-muted/70";
    }

    if (results.correct.includes(patternId)) {
      return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700";
    }
    if (results.incorrect.includes(patternId)) {
      return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700";
    }
    if (results.missed.includes(patternId)) {
      return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700 ring-2 ring-amber-400";
    }
    return "bg-muted text-muted-foreground/60 border-border";
  };

  // Group patterns by category
  const patternsByCategory = allPatterns.reduce((acc, pattern) => {
    if (!acc[pattern.category]) {
      acc[pattern.category] = [];
    }
    acc[pattern.category].push(pattern);
    return acc;
  }, {} as Record<string, Pattern[]>);

  if (!isStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-2 border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pattern Recognition Speed Drill
              </span>
            </CardTitle>
            <CardDescription>
              Test how quickly you can identify the algorithmic patterns for this
              problem. FAANG interviews expect pattern identification in under 2
              minutes!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-purple-200 dark:border-purple-800">
              <Target className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-sm">How it works:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>
                    <strong>Timer starts:</strong> Read the problem and identify
                    patterns
                  </li>
                  <li>
                    <strong>Select patterns:</strong> Choose all patterns that apply
                  </li>
                  <li>
                    <strong>Submit:</strong> See your speed and accuracy
                  </li>
                  <li>
                    <strong>Goal:</strong> Identify correct patterns in under 120
                    seconds
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  &lt;60s
                </div>
                <div className="text-xs text-muted-foreground">Excellent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">&lt;120s</div>
                <div className="text-xs text-muted-foreground">Good</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">&lt;180s</div>
                <div className="text-xs text-muted-foreground">Needs Work</div>
              </div>
            </div>

            <Button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Pattern Recognition Drill
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-purple-200 dark:border-purple-800/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              Identify Patterns
            </CardTitle>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 font-mono text-2xl font-bold ${getTimeColor(
                  elapsedTime
                )}`}
              >
                <Timer className="h-5 w-5" />
                {formatTime(elapsedTime)}
              </div>
              {!isCompleted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  Skip
                </Button>
              )}
            </div>
          </div>
          <CardDescription>
            Select all patterns that apply to: <strong>{problemTitle}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Results Summary */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                    <div>
                      <div className="font-semibold">Pattern Recognition Time</div>
                      <div
                        className={`text-2xl font-bold ${getTimeColor(
                          results.timeSeconds
                        )}`}
                      >
                        {formatTime(results.timeSeconds)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-2xl font-bold">
                      {correctPatterns.length > 0
                        ? Math.round(
                            (results.correct.length / correctPatterns.length) *
                              100
                          )
                        : 0}
                      %
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-semibold">Correct</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {results.correct.length}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm font-semibold">Incorrect</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {results.incorrect.length}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <Target className="h-4 w-4" />
                      <span className="text-sm font-semibold">Missed</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">
                      {results.missed.length}
                    </div>
                  </div>
                </div>

                {results.timeSeconds <= 120 &&
                  results.incorrect.length === 0 &&
                  results.missed.length === 0 && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-300 dark:border-emerald-800">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <TrendingUp className="h-5 w-5" />
                        <span className="font-semibold">
                          🎯 Interview-Ready Performance!
                        </span>
                      </div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">
                        You identified patterns correctly in under 2 minutes -
                        this is FAANG-level speed!
                      </p>
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pattern Selection */}
          <div className="space-y-4">
            {Object.entries(patternsByCategory).map(([category, patterns]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {patterns.map((pattern) => (
                    <Badge
                      key={pattern.id}
                      variant="outline"
                      className={`cursor-pointer transition-all ${getPatternBadgeClass(
                        pattern.id
                      )} ${!isCompleted ? "hover:scale-105" : ""}`}
                      onClick={() => handlePatternToggle(pattern.id)}
                    >
                      {selectedPatternIds.includes(pattern.id) && !results && (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {results && results.correct.includes(pattern.id) && (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {results && results.incorrect.includes(pattern.id) && (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {results && results.missed.includes(pattern.id) && (
                        <Target className="h-3 w-3 mr-1" />
                      )}
                      {pattern.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          {results && (
            <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/50 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>Correct</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-3 w-3 text-red-600" />
                <span>Wrong Selection</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-amber-600" />
                <span>Missed (Should Select)</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {!isCompleted && (
            <Button
              onClick={handleSubmit}
              disabled={selectedPatternIds.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              size="lg"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Submit Pattern Selection
            </Button>
          )}

          {isCompleted && (
            <div className="flex gap-3">
              <Button
                onClick={handleStart}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={() => {
                  setIsStarted(false);
                  setIsCompleted(false);
                  setResults(null);
                }}
                variant="default"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                size="lg"
              >
                Close Drill
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

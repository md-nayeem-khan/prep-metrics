"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, Target, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PerformanceAnalysis {
  originalTimeSeconds: number;
  revisionTimeSeconds: number;
  improvementSeconds: number;
  improvementPercentage: number;
  wasImprovement: boolean;
}

interface PerformanceAnalysisCardProps {
  analysis: PerformanceAnalysis;
  problemTitle: string;
  onClose?: () => void;
}

export function PerformanceAnalysisCard({
  analysis,
  problemTitle,
  onClose
}: PerformanceAnalysisCardProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  const getImprovementColor = (wasImprovement: boolean) => {
    return wasImprovement
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
  };

  const getImprovementIcon = (wasImprovement: boolean) => {
    return wasImprovement ? (
      <TrendingUp className="h-5 w-5 text-green-600" />
    ) : (
      <TrendingDown className="h-5 w-5 text-red-600" />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50 w-96"
    >
      <Card className={`shadow-lg border-2 ${getImprovementColor(analysis.wasImprovement)}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getImprovementIcon(analysis.wasImprovement)}
            Performance Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground font-medium">
            {problemTitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Time Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Original Time</p>
              <p className="text-lg font-bold">
                {formatTime(analysis.originalTimeSeconds)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Revision Time</p>
              <p className="text-lg font-bold">
                {formatTime(analysis.revisionTimeSeconds)}
              </p>
            </div>
          </div>

          {/* Improvement Metrics */}
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Time Change</span>
            </div>
            <div className={`text-2xl font-bold ${analysis.wasImprovement ? 'text-green-600' : 'text-red-600'}`}>
              {analysis.wasImprovement ? '-' : '+'}{Math.abs(analysis.improvementSeconds)}s
            </div>
            <div className={`text-sm ${analysis.wasImprovement ? 'text-green-600' : 'text-red-600'}`}>
              {analysis.wasImprovement ? '↓' : '↑'} {Math.abs(analysis.improvementPercentage)}%
            </div>
          </div>

          {/* Motivational Message */}
          <div className="text-center">
            {analysis.wasImprovement ? (
              <Badge variant="outline" className="gap-1 text-green-700 border-green-300">
                <Sparkles className="h-3 w-3" />
                Great improvement!
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-amber-700 border-amber-300">
                <Target className="h-3 w-3" />
                Keep practicing!
              </Badge>
            )}
          </div>

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Click to dismiss
            </button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
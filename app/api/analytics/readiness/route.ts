// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  TIME_BENCHMARKS,
  calculateReadinessScoreFromLatestSubmissions,
  getDifficultyBenchmarkKey,
  getLatestSubmissionsPerProblem,
} from '@/types'
import { getDateWindow } from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

// GET /api/analytics/readiness - Calculate FAANG interview readiness score
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const companyIdParam = searchParams.get('companyId')
    const source = searchParams.get('source') // Optional filter by source
    const timeframe = searchParams.get('timeframe') // 'week', 'month', 'all'

    // Build where clause for filtering
    const problemWhere: any = {}
    const companyId = companyIdParam ? Number(companyIdParam) : null
    const hasValidCompanyId = Number.isInteger(companyId) && (companyId as number) > 0

    if (hasValidCompanyId) {
      problemWhere.companies = {
        some: {
          companyId,
        },
      }
    }
    if (source) problemWhere.source = source

    // Build date filter for timeframe, anchored to the user's local day boundaries.
    const submissionWhere: any = {}
    if (timeframe === 'week') {
      const tz = await getUserTimezone()
      submissionWhere.submittedAt = { gte: getDateWindow(7, tz).startDate }
    } else if (timeframe === 'month') {
      const tz = await getUserTimezone()
      submissionWhere.submittedAt = { gte: getDateWindow(30, tz).startDate }
    }

    // Combine filters
    const where = {
      ...submissionWhere,
      ...(Object.keys(problemWhere).length > 0 ? { problem: problemWhere } : {})
    }

    // Fetch all submissions with enhanced fields
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        problem: {
          select: {
            difficulty: true,
            source: true,
            title: true,
            platform: true,
            problemId: true,
          }
        }
      },
      orderBy: { submittedAt: 'desc' }
    })

    const normalizedSubmissions = submissions.map(sub => ({
      ...sub,
      status: sub.status as "solved" | "failed" | "partial" | "abandoned",
      attemptType: sub.attemptType as "First" | "Revision",
      notes: sub.notes ?? undefined,
      mistakeNote: sub.mistakeNote ?? undefined,
      approachNote: sub.approachNote ?? undefined,
      patternRecognitionSeconds: sub.patternRecognitionSeconds ?? undefined
    }))

    const latestSubmissions = getLatestSubmissionsPerProblem(normalizedSubmissions)

    // Calculate overall readiness score
    const readinessScore = calculateReadinessScoreFromLatestSubmissions(latestSubmissions)

    // Calculate detailed metrics
    const totalProblems = latestSubmissions.length
    const solvedProblems = latestSubmissions.filter(s => s.status === 'solved').length
    const failedProblems = latestSubmissions.filter(s => s.status === 'failed').length

    // Time performance analysis
    const solvedSubmissions = latestSubmissions.filter(s => s.status === 'solved')
    const avgTime = solvedSubmissions.length > 0 
      ? solvedSubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / solvedSubmissions.length 
      : 0

    // Hint usage analysis
    const hintUsageRate = solvedSubmissions.length > 0
      ? solvedSubmissions.filter(s => s.wasHintUsed).length / solvedSubmissions.length
      : 0

    // Pattern recognition analysis
    const withPatternTime = latestSubmissions.filter(s => s.patternRecognitionSeconds !== null)
    const avgPatternRecognitionTime = withPatternTime.length > 0
      ? withPatternTime.reduce((sum, s) => sum + (s.patternRecognitionSeconds || 0), 0) / withPatternTime.length
      : null

    // Difficulty breakdown with case-insensitive matching
    const difficultyStats = {
      easy: {
        total: latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'easy').length,
        solved: latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'easy' && s.status === 'solved').length,
        avgTimeMinutes: 0,
      },
      medium: {
        total: latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'medium').length,
        solved: latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'medium' && s.status === 'solved').length,
        avgTimeMinutes: 0,
      },
      hard: {
        total: latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'hard').length,
        solved: latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'hard' && s.status === 'solved').length,
        avgTimeMinutes: 0,
      }
    }

    // Calculate average times per difficulty
    const easySolved = latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'easy' && s.status === 'solved');
    const mediumSolved = latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'medium' && s.status === 'solved');
    const hardSolved = latestSubmissions.filter(s => getDifficultyBenchmarkKey(s.problem?.difficulty) === 'hard' && s.status === 'solved');

    if (easySolved.length > 0) {
      difficultyStats.easy.avgTimeMinutes = Math.round(
        easySolved.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / easySolved.length / 60
      );
    }
    if (mediumSolved.length > 0) {
      difficultyStats.medium.avgTimeMinutes = Math.round(
        mediumSolved.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / mediumSolved.length / 60
      );
    }
    if (hardSolved.length > 0) {
      difficultyStats.hard.avgTimeMinutes = Math.round(
        hardSolved.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / hardSolved.length / 60
      );
    }

    // Recent performance (last 10 submissions)
    const recentSubmissions = latestSubmissions.slice(0, 10);
    const recentReadiness = calculateReadinessScoreFromLatestSubmissions(recentSubmissions)

    const onPaceProblems = solvedSubmissions.filter(s => {
      if (!s.problem?.difficulty) return false
      const difficultyKey = getDifficultyBenchmarkKey(s.problem.difficulty)
      const benchmark = TIME_BENCHMARKS[difficultyKey]
      return typeof benchmark === 'number' && s.timeSpentSeconds <= benchmark
    }).length

    const speedScore = solvedSubmissions.length > 0 ? onPaceProblems / solvedSubmissions.length : 0

    // Attempt type analysis
    const firstAttempts = latestSubmissions.filter(s => s.attemptType === 'First')
    const revisions = latestSubmissions.filter(s => s.attemptType === 'Revision')
    
    const firstAttemptSuccess = firstAttempts.length > 0
      ? firstAttempts.filter(s => s.status === 'solved').length / firstAttempts.length
      : 0

    const response = {
      readinessScore,
      recentReadiness,
      metrics: {
        totalProblems,
        solvedProblems,
        failedProblems,
        successRate: totalProblems > 0 ? solvedProblems / totalProblems : 0,
        avgTimeMinutes: Math.round(avgTime / 60),
        hintUsageRate,
        avgPatternRecognitionTime: avgPatternRecognitionTime ? Math.round(avgPatternRecognitionTime) : null,
        speedScore,
        firstAttemptSuccess,
      },
      byDifficulty: difficultyStats,
      breakdown: {
        firstAttempts: firstAttempts.length,
        revisions: revisions.length,
        withHints: latestSubmissions.filter(s => s.wasHintUsed).length,
        withoutHints: latestSubmissions.filter(s => !s.wasHintUsed && s.status === 'solved').length,
        onPace: onPaceProblems,
      },
      recommendations: [] as string[]
    }

    // Generate recommendations based on weak areas
    if (readinessScore.score < 0.6) {
      response.recommendations.push("Focus on solving more problems without hints to improve readiness")
    }
    
    if (hintUsageRate > 0.4) {
      response.recommendations.push("Try to solve problems without hints to build confidence")
    }
    
    if (speedScore < 0.5) {
      response.recommendations.push("Practice solving problems faster to meet interview time constraints")
    }
    
    if (avgPatternRecognitionTime && avgPatternRecognitionTime > 120) {
      response.recommendations.push("Work on faster pattern recognition (target: <2 minutes)")
    }

    if (firstAttemptSuccess < 0.3) {
      response.recommendations.push("Focus on solving new problems to improve first-attempt success rate")
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error calculating readiness score:', error)
    return NextResponse.json(
      { error: 'Failed to calculate readiness score' },
      { status: 500 }
    )
  }
}

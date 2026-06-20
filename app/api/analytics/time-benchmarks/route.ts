// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TIME_BENCHMARKS } from '@/types'

// GET /api/analytics/time-benchmarks - Analyze time performance against interview benchmarks
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const timeframe = searchParams.get('timeframe') // 'week', 'month', 'all'
    const companyIdParam = searchParams.get('companyId')
    const source = searchParams.get('source') // Optional filter by source
    const difficulty = searchParams.get('difficulty') // 'easy', 'medium', 'hard'

    // Build date filter for timeframe
    const submissionWhere: any = { status: 'solved' } // Only analyze solved problems
    if (timeframe === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      submissionWhere.submittedAt = { gte: weekAgo }
    } else if (timeframe === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      submissionWhere.submittedAt = { gte: monthAgo }
    }

    // Build problem filter
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
    if (difficulty) problemWhere.difficulty = difficulty

    // Combine filters
    const where = {
      ...submissionWhere,
      ...(Object.keys(problemWhere).length > 0 ? { problem: problemWhere } : {})
    }

    // Fetch all solved submissions with problem details
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            platform: true,
            problemId: true,
            source: true,
          }
        }
      },
      orderBy: { submittedAt: 'desc' }
    })

    // Analyze performance against benchmarks
    const benchmarkAnalysis = {
      easy: { benchmark: TIME_BENCHMARKS.easy, submissions: [] as any[] },
      medium: { benchmark: TIME_BENCHMARKS.medium, submissions: [] as any[] },
      hard: { benchmark: TIME_BENCHMARKS.hard, submissions: [] as any[] }
    }

    // Group submissions by difficulty
    submissions.forEach(submission => {
      const diff = submission.problem.difficulty
      if (diff === 'easy' || diff === 'medium' || diff === 'hard') {
        benchmarkAnalysis[diff].submissions.push(submission)
      }
    })

    // Calculate statistics for each difficulty
    const results = Object.entries(benchmarkAnalysis).map(([difficulty, data]) => {
      const { benchmark, submissions: diffSubmissions } = data
      
      if (diffSubmissions.length === 0) {
        return {
          difficulty,
          benchmarkSeconds: benchmark,
          benchmarkMinutes: Math.round(benchmark / 60),
          totalProblems: 0,
          onPace: 0,
          slow: 0,
          avgTimeSeconds: 0,
          avgTimeMinutes: 0,
          onPaceRate: 0,
          improvement: null,
          fastest: null,
          slowest: null,
          recentTrend: null
        }
      }

      // Calculate metrics
      const onPaceSubmissions = diffSubmissions.filter(s => s.timeSpentSeconds <= benchmark)
      const slowSubmissions = diffSubmissions.filter(s => s.timeSpentSeconds > benchmark)
      
      const totalTime = diffSubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0)
      const avgTimeSeconds = totalTime / diffSubmissions.length
      
      const onPaceRate = onPaceSubmissions.length / diffSubmissions.length

      // Find fastest and slowest
      const times = diffSubmissions.map(s => s.timeSpentSeconds).sort((a, b) => a - b)
      const fastest = times[0]
      const slowest = times[times.length - 1]

      // Calculate recent trend (last 5 vs previous 5)
      let recentTrend = null
      if (diffSubmissions.length >= 10) {
        const recent5 = diffSubmissions.slice(0, 5)
        const previous5 = diffSubmissions.slice(5, 10)
        
        const recentAvg = recent5.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / 5
        const previousAvg = previous5.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / 5
        
        const improvement = ((previousAvg - recentAvg) / previousAvg) * 100
        recentTrend = {
          improving: improvement > 5,
          worsening: improvement < -5,
          improvement: Math.round(improvement)
        }
      }

      return {
        difficulty,
        benchmarkSeconds: benchmark,
        benchmarkMinutes: Math.round(benchmark / 60),
        totalProblems: diffSubmissions.length,
        onPace: onPaceSubmissions.length,
        slow: slowSubmissions.length,
        avgTimeSeconds: Math.round(avgTimeSeconds),
        avgTimeMinutes: Math.round(avgTimeSeconds / 60),
        onPaceRate: Math.round(onPaceRate * 100) / 100,
        fastest: Math.round(fastest),
        slowest: Math.round(slowest),
        recentTrend
      }
    })

    // Overall statistics
    const totalSolved = submissions.length
    const totalOnPace = submissions.filter(s => {
      const benchmark = TIME_BENCHMARKS[s.problem.difficulty as keyof typeof TIME_BENCHMARKS]
      return benchmark && s.timeSpentSeconds <= benchmark
    }).length

    const overallOnPaceRate = totalSolved > 0 ? totalOnPace / totalSolved : 0

    // Pattern-wise time analysis
    const patternTimes = new Map<string, {
      times: number[];
      onPace: number;
      total: number;
      pattern: string;
      category: string;
    }>()

    // Get pattern information for submissions
    const submissionsWithPatterns = await prisma.submission.findMany({
      where: { 
        id: { in: submissions.map(s => s.id) }
      },
      include: {
        problem: {
          include: {
            patterns: {
              include: {
                pattern: true
              }
            }
          }
        }
      }
    })

    submissionsWithPatterns.forEach(submission => {
      submission.problem.patterns.forEach(pp => {
        const pattern = pp.pattern
        const key = pattern.name

        if (!patternTimes.has(key)) {
          patternTimes.set(key, {
            times: [],
            onPace: 0,
            total: 0,
            pattern: pattern.name,
            category: pattern.category
          })
        }

        const patternData = patternTimes.get(key)!
        patternData.times.push(submission.timeSpentSeconds)
        patternData.total++

        // Check if on pace based on problem difficulty
        const benchmark = TIME_BENCHMARKS[submission.problem.difficulty as keyof typeof TIME_BENCHMARKS]
        if (benchmark && submission.timeSpentSeconds <= benchmark) {
          patternData.onPace++
        }
      })
    })

    // Calculate pattern averages
    const patternAnalysis = Array.from(patternTimes.entries())
      .filter(([_, data]) => data.total >= 2) // Only patterns with 2+ problems
      .map(([patternName, data]) => {
        const avgTime = data.times.reduce((sum, time) => sum + time, 0) / data.times.length
        const onPaceRate = data.onPace / data.total

        return {
          pattern: data.pattern,
          category: data.category,
          totalProblems: data.total,
          avgTimeSeconds: Math.round(avgTime),
          avgTimeMinutes: Math.round(avgTime / 60),
          onPaceCount: data.onPace,
          onPaceRate: Math.round(onPaceRate * 100) / 100,
          needsWork: onPaceRate < 0.5 || avgTime > 35 * 60
        }
      })
      .sort((a, b) => a.onPaceRate - b.onPaceRate) // Slowest patterns first

    const response = {
      benchmarks: TIME_BENCHMARKS,
      overall: {
        totalSolved,
        onPace: totalOnPace,
        onPaceRate: Math.round(overallOnPaceRate * 100) / 100,
        interviewReady: overallOnPaceRate >= 0.7
      },
      byDifficulty: results,
      patternAnalysis,
      recommendations: [] as string[]
    }

    // Generate recommendations
    if (overallOnPaceRate < 0.5) {
      response.recommendations.push("Focus on improving speed - you're solving slower than interview pace")
    }

    const slowestDifficulty = results
      .filter(r => r.totalProblems > 0)
      .sort((a, b) => a.onPaceRate - b.onPaceRate)[0]

    if (slowestDifficulty && slowestDifficulty.onPaceRate < 0.4) {
      response.recommendations.push(`Improve ${slowestDifficulty.difficulty} problem speed - currently ${Math.round(slowestDifficulty.onPaceRate * 100)}% on pace`)
    }

    const slowPatterns = patternAnalysis.filter(p => p.needsWork).slice(0, 3)
    if (slowPatterns.length > 0) {
      response.recommendations.push(`Practice these patterns for speed: ${slowPatterns.map(p => p.pattern).join(', ')}`)
    }

    // Time-specific recommendations
    const mediumResult = results.find(r => r.difficulty === 'medium')
    if (mediumResult && mediumResult.avgTimeMinutes > 30) {
      response.recommendations.push("Focus on medium problems - aim for <25 minutes average")
    }

    const easyResult = results.find(r => r.difficulty === 'easy')
    if (easyResult && easyResult.avgTimeMinutes > 20) {
      response.recommendations.push("Practice easy problems for speed - aim for <15 minutes")
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error analyzing time benchmarks:', error)
    return NextResponse.json(
      { error: 'Failed to analyze time benchmarks' },
      { status: 500 }
    )
  }
}

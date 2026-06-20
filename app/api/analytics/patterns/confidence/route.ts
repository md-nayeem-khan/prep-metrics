// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { type PatternStats } from '@/types'
import { calculatePatternMetrics } from '@/lib/analytics/pattern-metrics'

// GET /api/analytics/patterns/confidence - Calculate pattern confidence levels
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const minProblems = parseInt(searchParams.get('minProblems') || '1')
    const timeframe = searchParams.get('timeframe') // 'week', 'month', 'all'
    const companyIdParam = searchParams.get('companyId')
    const source = searchParams.get('source') // Optional filter by source

    // Build date filter for timeframe
    const submissionWhere: any = {}
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

    // Get all matching problems and their submissions/pattern relations.
    const problems = await prisma.problem.findMany({
      where: Object.keys(problemWhere).length > 0 ? problemWhere : undefined,
      include: {
        patterns: {
          include: {
            pattern: true
          }
        },
        submissions: {
          where: submissionWhere
        }
      }
    })

    // Include all known patterns for selected problems, even if they have 0 solved submissions.
    const allPatternsInScope = await prisma.pattern.findMany({
      where: {
        problems: {
          some: {
            problem: Object.keys(problemWhere).length > 0 ? problemWhere : undefined
          }
        }
      }
    })

    const calculatedStats = calculatePatternMetrics(problems as any[], minProblems)

    const patternStatsByName = new Map(calculatedStats.map((stat) => [stat.pattern, stat]))
    const patternStats: PatternStats[] = allPatternsInScope
      .filter((pattern) => {
        const scopedProblemCount = problems.filter((problem) =>
          problem.patterns.some((pp) => pp.pattern.name === pattern.name)
        ).length
        return scopedProblemCount >= minProblems
      })
      .map((pattern) => {
        const calculated = patternStatsByName.get(pattern.name)

        return {
          pattern: pattern.name,
          category: pattern.category,
          totalSolved: calculated?.totalSolved ?? 0,
          avgTimeSeconds: calculated?.avgTimeSeconds ?? 0,
          hintUsageRate: calculated?.hintUsageRate ?? 0,
          confidence: calculated?.confidence ?? 'Weak',
          problemIds: calculated?.problemIds ?? [],
          solvedProblemIds: calculated?.solvedProblemIds ?? [],
        }
      })

    // Sort by confidence (weak patterns first) and then by total problems
    patternStats.sort((a, b) => {
      const confidenceOrder = { 'Weak': 0, 'Medium': 1, 'Strong': 2 }
      const aOrder = confidenceOrder[a.confidence]
      const bOrder = confidenceOrder[b.confidence]
      
      if (aOrder !== bOrder) {
        return aOrder - bOrder // Weak patterns first
      }
      
      return b.totalSolved - a.totalSolved // More problems first within same confidence
    })

    // Calculate aggregate metrics
    const totalPatterns = patternStats.length
    const weakPatterns = patternStats.filter(p => p.confidence === 'Weak')
    const mediumPatterns = patternStats.filter(p => p.confidence === 'Medium')  
    const strongPatterns = patternStats.filter(p => p.confidence === 'Strong')

    // Category analysis
    const categoryStats = new Map<string, {
      total: number;
      weak: number;
      medium: number;
      strong: number;
      avgTime: number;
      avgHintRate: number;
    }>()

    patternStats.forEach(pattern => {
      if (!categoryStats.has(pattern.category)) {
        categoryStats.set(pattern.category, {
          total: 0,
          weak: 0,
          medium: 0,
          strong: 0,
          avgTime: 0,
          avgHintRate: 0
        })
      }

      const catStats = categoryStats.get(pattern.category)!
      catStats.total++
      catStats.avgTime += pattern.avgTimeSeconds
      catStats.avgHintRate += pattern.hintUsageRate
      
      if (pattern.confidence === 'Weak') catStats.weak++
      else if (pattern.confidence === 'Medium') catStats.medium++
      else if (pattern.confidence === 'Strong') catStats.strong++
    })

    // Normalize category averages
    categoryStats.forEach(catStats => {
      catStats.avgTime = Math.round(catStats.avgTime / catStats.total)
      catStats.avgHintRate = Math.round((catStats.avgHintRate / catStats.total) * 100) / 100
    })

    const response = {
      patterns: patternStats,
      summary: {
        totalPatterns,
        weakCount: weakPatterns.length,
        mediumCount: mediumPatterns.length,
        strongCount: strongPatterns.length,
        weakestPatterns: weakPatterns.slice(0, 5).map(p => ({
          name: p.pattern,
          category: p.category,
          avgTimeMinutes: Math.round(p.avgTimeSeconds / 60),
          hintUsageRate: p.hintUsageRate,
          totalSolved: p.totalSolved
        })),
        strongestPatterns: strongPatterns.slice(-5).map(p => ({
          name: p.pattern,
          category: p.category,
          avgTimeMinutes: Math.round(p.avgTimeSeconds / 60),
          hintUsageRate: p.hintUsageRate,
          totalSolved: p.totalSolved
        }))
      },
      categories: Object.fromEntries(categoryStats),
      recommendations: [] as string[]
    }

    // Generate recommendations
    if (weakPatterns.length > strongPatterns.length) {
      response.recommendations.push("Focus on your weak patterns to improve overall confidence")
    }

    if (weakPatterns.length >= 3) {
      const topWeakCategories = [...categoryStats.entries()]
        .filter(([_, stats]) => stats.weak > 0)
        .sort((a, b) => b[1].weak - a[1].weak)
        .slice(0, 2)
        .map(([category]) => category)
      
      if (topWeakCategories.length > 0) {
        response.recommendations.push(`Prioritize practicing ${topWeakCategories.join(' and ')} patterns`)
      }
    }

    const highHintPatterns = weakPatterns.filter(p => p.hintUsageRate > 0.5)
    if (highHintPatterns.length > 0) {
      response.recommendations.push("Practice solving problems without hints in your weak areas")
    }

    const slowPatterns = weakPatterns.filter(p => p.avgTimeSeconds > 35 * 60)
    if (slowPatterns.length > 0) {
      response.recommendations.push("Work on solving problems faster in your weak patterns")
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error calculating pattern confidence:', error)
    return NextResponse.json(
      { error: 'Failed to calculate pattern confidence' },
      { status: 500 }
    )
  }
}

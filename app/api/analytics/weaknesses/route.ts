// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculatePatternConfidence, TIME_BENCHMARKS, type WeaknessAnalysis } from '@/types'

// GET /api/analytics/weaknesses - Detect weak areas and patterns needing improvement
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const minProblems = parseInt(searchParams.get('minProblems') || '2')
    const timeframe = searchParams.get('timeframe') // 'week', 'month', 'all'

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

    // Get all submissions with problem and pattern relationships
    const submissions = await prisma.submission.findMany({
      where: submissionWhere,
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

    // Group submissions by pattern
    const patternMap = new Map<string, {
      pattern: { id: number; name: string; category: string };
      submissions: any[];
      problemIds: Set<number>;
    }>()

    submissions.forEach(submission => {
      submission.problem.patterns.forEach(problemPattern => {
        const pattern = problemPattern.pattern
        const key = pattern.name

        if (!patternMap.has(key)) {
          patternMap.set(key, {
            pattern,
            submissions: [],
            problemIds: new Set()
          })
        }

        const patternData = patternMap.get(key)!
        patternData.submissions.push(submission)
        patternData.problemIds.add(submission.problemId)
      })
    })

    // Calculate statistics for each pattern
    const allPatternStats = []

    for (const [patternName, data] of patternMap.entries()) {
      const { pattern, submissions: patternSubmissions, problemIds } = data
      
      // Only analyze patterns with minimum problems
      if (problemIds.size < minProblems) continue

      const totalSubmissions = patternSubmissions.length
      const solvedSubmissions = patternSubmissions.filter(s => s.status === 'solved')
      const failedSubmissions = patternSubmissions.filter(s => s.status === 'failed')
      
      const successRate = totalSubmissions > 0 ? solvedSubmissions.length / totalSubmissions : 0
      
      if (solvedSubmissions.length === 0) {
        // Pattern with no solved problems is definitely weak
        allPatternStats.push({
          pattern: pattern.name,
          category: pattern.category,
          totalProblems: problemIds.size,
          totalSubmissions,
          totalSolved: 0,
          successRate: 0,
          avgTimeSeconds: 0,
          hintUsageRate: 1,
          confidence: 'Weak' as const,
          weaknessReasons: ['No problems solved'],
          problemIds: Array.from(problemIds)
        })
        continue
      }

      // Calculate metrics for solved problems
      const totalTime = solvedSubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0)
      const avgTimeSeconds = totalTime / solvedSubmissions.length
      
      const hintsUsed = solvedSubmissions.filter(s => s.wasHintUsed).length
      const hintUsageRate = hintsUsed / solvedSubmissions.length
      
      const confidence = calculatePatternConfidence(avgTimeSeconds, hintUsageRate)
      
      // Identify specific weakness reasons
      const weaknessReasons = []
      if (successRate < 0.7) weaknessReasons.push('Low success rate')
      if (avgTimeSeconds > 35 * 60) weaknessReasons.push('Takes too long')
      if (hintUsageRate > 0.4) weaknessReasons.push('High hint dependency')
      if (failedSubmissions.length > solvedSubmissions.length) weaknessReasons.push('More failures than successes')
      
      // Check against time benchmarks
      const avgDifficultyTimes = new Map<string, number[]>()
      patternSubmissions.forEach(s => {
        if (s.status === 'solved') {
          const diff = s.problem.difficulty
          if (!avgDifficultyTimes.has(diff)) {
            avgDifficultyTimes.set(diff, [])
          }
          avgDifficultyTimes.get(diff)!.push(s.timeSpentSeconds)
        }
      })

      // Check if slow for specific difficulties
      for (const [difficulty, times] of avgDifficultyTimes.entries()) {
        const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length
        const benchmark = TIME_BENCHMARKS[difficulty as keyof typeof TIME_BENCHMARKS]
        
        if (benchmark && avgTime > benchmark * 1.5) {
          weaknessReasons.push(`Slow on ${difficulty} problems`)
        }
      }

      allPatternStats.push({
        pattern: pattern.name,
        category: pattern.category,
        totalProblems: problemIds.size,
        totalSubmissions,
        totalSolved: solvedSubmissions.length,
        successRate,
        avgTimeSeconds,
        hintUsageRate,
        confidence,
        weaknessReasons,
        problemIds: Array.from(problemIds)
      })
    }

    // Separate patterns by strength
    const weakPatterns = allPatternStats.filter(p => p.confidence === 'Weak')
    const slowPatterns = allPatternStats.filter(p => 
      p.avgTimeSeconds > 35 * 60 && p.confidence !== 'Strong'
    )
    const hintDependentPatterns = allPatternStats.filter(p => 
      p.hintUsageRate > 0.4 && p.confidence !== 'Strong'
    )

    // Category-level weakness analysis
    const categoryWeakness = new Map<string, {
      totalPatterns: number;
      weakPatterns: number;
      avgSuccessRate: number;
      avgTimeSeconds: number;
      avgHintRate: number;
    }>()

    allPatternStats.forEach(pattern => {
      if (!categoryWeakness.has(pattern.category)) {
        categoryWeakness.set(pattern.category, {
          totalPatterns: 0,
          weakPatterns: 0,
          avgSuccessRate: 0,
          avgTimeSeconds: 0,
          avgHintRate: 0
        })
      }

      const catData = categoryWeakness.get(pattern.category)!
      catData.totalPatterns++
      catData.avgSuccessRate += pattern.successRate
      catData.avgTimeSeconds += pattern.avgTimeSeconds
      catData.avgHintRate += pattern.hintUsageRate
      
      if (pattern.confidence === 'Weak') {
        catData.weakPatterns++
      }
    })

    // Normalize category averages
    const categoryAnalysis = Array.from(categoryWeakness.entries()).map(([category, data]) => {
      return {
        category,
        totalPatterns: data.totalPatterns,
        weakPatterns: data.weakPatterns,
        weaknessRate: data.weakPatterns / data.totalPatterns,
        avgSuccessRate: Math.round((data.avgSuccessRate / data.totalPatterns) * 100) / 100,
        avgTimeMinutes: Math.round((data.avgTimeSeconds / data.totalPatterns) / 60),
        avgHintRate: Math.round((data.avgHintRate / data.totalPatterns) * 100) / 100,
        needsFocus: data.weakPatterns >= 2 || (data.weakPatterns / data.totalPatterns) > 0.5
      }
    }).sort((a, b) => b.weaknessRate - a.weaknessRate) // Most problematic categories first

    // Generate specific recommendations
    const recommendations = []

    // Pattern-specific recommendations
    const topWeakPatterns = weakPatterns
      .sort((a, b) => (b.totalProblems - a.totalProblems)) // Most practiced weak patterns first
      .slice(0, 5)

    if (topWeakPatterns.length > 0) {
      recommendations.push({
        type: 'pattern_focus',
        priority: 'high',
        title: 'Focus on Weak Patterns',
        description: `Practice these patterns: ${topWeakPatterns.map(p => p.pattern).join(', ')}`,
        patterns: topWeakPatterns.map(p => p.pattern)
      })
    }

    // Category-specific recommendations  
    const worstCategories = categoryAnalysis.filter(c => c.needsFocus).slice(0, 2)
    if (worstCategories.length > 0) {
      recommendations.push({
        type: 'category_focus',
        priority: 'high',
        title: 'Improve Problem Categories',
        description: `Focus on ${worstCategories.map(c => c.category).join(' and ')} problems`,
        categories: worstCategories.map(c => c.category)
      })
    }

    // Speed recommendations
    const verySlowPatterns = slowPatterns.filter(p => p.avgTimeSeconds > 50 * 60).slice(0, 3)
    if (verySlowPatterns.length > 0) {
      recommendations.push({
        type: 'speed_improvement',
        priority: 'medium',
        title: 'Improve Solution Speed',
        description: `Work on solving these patterns faster: ${verySlowPatterns.map(p => p.pattern).join(', ')}`,
        patterns: verySlowPatterns.map(p => p.pattern)
      })
    }

    // Hint dependency recommendations
    const highHintPatterns = hintDependentPatterns.filter(p => p.hintUsageRate > 0.6).slice(0, 3)
    if (highHintPatterns.length > 0) {
      recommendations.push({
        type: 'hint_reduction',
        priority: 'medium',
        title: 'Reduce Hint Dependency',
        description: `Practice solving without hints: ${highHintPatterns.map(p => p.pattern).join(', ')}`,
        patterns: highHintPatterns.map(p => p.pattern)
      })
    }

    // Success rate recommendations
    const lowSuccessPatterns = allPatternStats.filter(p => p.successRate < 0.5).slice(0, 3)
    if (lowSuccessPatterns.length > 0) {
      recommendations.push({
        type: 'success_rate',
        priority: 'high',
        title: 'Improve Success Rate',
        description: `These patterns need more practice: ${lowSuccessPatterns.map(p => p.pattern).join(', ')}`,
        patterns: lowSuccessPatterns.map(p => p.pattern)
      })
    }

    const response = {
      weakPatterns,
      slowPatterns,
      hintDependentPatterns,
      recommendations: recommendations.map(r => r.description), // Keep existing format for compatibility
      categoryAnalysis,
      summary: {
        totalPatternsAnalyzed: allPatternStats.length,
        weakPatternsCount: weakPatterns.length,
        slowPatternsCount: slowPatterns.length,
        hintDependentCount: hintDependentPatterns.length,
        categoriesNeedingFocus: worstCategories.length,
        overallWeaknessScore: Math.round((
          (weakPatterns.length / allPatternStats.length) * 0.5 +
          (slowPatterns.length / allPatternStats.length) * 0.3 +
          (hintDependentPatterns.length / allPatternStats.length) * 0.2
        ) * 100) / 100
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error detecting weaknesses:', error)
    return NextResponse.json(
      { error: 'Failed to detect weaknesses' },
      { status: 500 }
    )
  }
}

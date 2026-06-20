import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calculateCompanySummaryMetrics,
  calculatePatternCoverageMetrics,
  getLatestSubmission,
} from '@/lib/analytics/company-metrics'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/analytics/company/[companyId] - Get analytics for a specific company by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params
    const numericCompanyId = Number(companyId)

    if (!Number.isInteger(numericCompanyId) || numericCompanyId <= 0) {
      return NextResponse.json(
        { error: 'A valid companyId is required' },
        { status: 400 }
      )
    }

    const company = await prisma.companyCard.findUnique({
      where: { id: numericCompanyId },
      select: { id: true, name: true },
    })

    if (!company) {
      return NextResponse.json(
        { error: `Company id '${numericCompanyId}' not found in database` },
        { status: 404 }
      )
    }

    // Get all problems for this company via relation mappings.
    const problems = await prisma.problem.findMany({
      where: {
        companies: {
          some: {
            companyId: numericCompanyId,
          },
        },
      },
      include: {
        submissions: {
          orderBy: { submittedAt: 'desc' },
        },
        patterns: {
          include: {
            pattern: true,
          },
        },
      },
    })

    // Calculate statistics
    const totalProblems = problems.length
    const summaryMetrics = calculateCompanySummaryMetrics(problems)
    const solvedSet = new Set(summaryMetrics.solvedProblemIds)

    // Difficulty breakdown
    const byDifficulty = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 },
    }

    // Difficulty is stored lowercase ('easy'|'medium'|'hard') but some seed/test data uses
    // capitalized values — normalize before bucketing into the capitalized output keys.
    const difficultyBucket: Record<string, keyof typeof byDifficulty> = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    }
    problems.forEach((p: any) => {
      const bucket = difficultyBucket[String(p.difficulty).toLowerCase()]
      if (bucket) {
        byDifficulty[bucket].total++
        if (solvedSet.has(p.id)) {
          byDifficulty[bucket].solved++
        }
      }
    })

    const patternCoverage = calculatePatternCoverageMetrics(
      problems,
      summaryMetrics.solvedProblemIds
    )

    return NextResponse.json({
      companyId: company.id,
      company: company.name,
      summary: {
        totalProblems,
        solvedProblems: summaryMetrics.solvedProblems,
        solvedProblemIds: summaryMetrics.solvedProblemIds,
        completionRate: totalProblems > 0 ? Math.round((summaryMetrics.solvedProblems / totalProblems) * 100) : 0,
        avgTimeSeconds: summaryMetrics.avgTimeSeconds,
        hintPercentage: summaryMetrics.hintPercentage,
        confidence: summaryMetrics.confidence,
        masteryPercentage: summaryMetrics.masteryPercentage,
      },
      byDifficulty,
      patternCoverage,
      recentProblems: problems.slice(0, 10).map((p: any) => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        status: getLatestSubmission(p.submissions)?.status || p.submissions[0]?.status || 'not_attempted',
        lastAttempt: getLatestSubmission(p.submissions)?.submittedAt || p.submissions[0]?.submittedAt || null,
      })),
    })
  } catch (error) {
    console.error('Error fetching company analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company analytics' },
      { status: 500 }
    )
  }
}

// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calculateReadinessScore,
  getReadinessLevel,
  READINESS_READY_THRESHOLD,
  type CompanyReadiness,
} from '@/types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function normalizeCompanyName(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

// GET /api/analytics/company - Get overview of all companies' readiness
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
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

    const companyCards = await prisma.companyCard.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
      },
    })

    const companyNames = Array.from(
      new Set(
        [
          ...companyCards.map((row) => normalizeCompanyName(row.name))
        ].filter((name): name is string => Boolean(name))
      )
    )

    if (companyNames.length === 0) {
      return NextResponse.json({
        companies: [],
        summary: {
          totalCompanies: 0,
          readyCompanies: 0,
          avgReadinessScore: 0,
          totalProblems: 0,
          totalSolved: 0,
          mostReady: null,
          mostActive: null,
          bestCovered: null
        },
        insights: {
          strongestCompany: null,
          weakestArea: null,
          improvementOpportunity: null,
          totalCoverageRate: 0
        },
        recommendations: [
          'Add company-tagged problems to start company readiness tracking'
        ]
      })
    }

    // Get all companies' data in parallel
    const companyData = await Promise.all(
      companyNames.map(async (company) => {
        const problems = await prisma.problem.findMany({
          where: {
            companies: {
              some: {
                company: {
                  name: company,
                },
              },
            },
          },
          include: {
            patterns: {
              include: {
                pattern: true
              }
            },
            submissions: {
              where: submissionWhere,
              orderBy: { submittedAt: 'desc' }
            }
          }
        })

        const allSubmissions = problems.flatMap((p: any) =>
          p.submissions.map((sub: any) => ({
            ...sub,
            problem: {
              difficulty: p.difficulty,
              id: p.id,
            },
          }))
        )

        const readinessScore = calculateReadinessScore(allSubmissions.map((sub: any) => ({
          ...sub,
          status: sub.status as "solved" | "failed" | "partial" | "abandoned",
          attemptType: sub.attemptType as "First" | "Revision",
          notes: sub.notes ?? undefined,
          mistakeNote: sub.mistakeNote ?? undefined,
          approachNote: sub.approachNote ?? undefined,
          patternRecognitionSeconds: sub.patternRecognitionSeconds ?? undefined
        })))
        
        const totalProblems = problems.length
        const solvedProblems = problems.filter((p: any) => 
          p.submissions.some((s: any) => s.status === 'solved')
        ).length
        
        const solvedSubmissions = allSubmissions.filter((s: any) => s.status === 'solved')
        const avgTimeSeconds = solvedSubmissions.length > 0
          ? solvedSubmissions.reduce((sum: number, s: any) => sum + s.timeSpentSeconds, 0) / solvedSubmissions.length
          : 0

        const patternFrequency = new Map<string, number>()
        problems.forEach((problem: any) => {
          problem.patterns.forEach((problemPattern: any) => {
            const patternName = problemPattern.pattern.name
            patternFrequency.set(patternName, (patternFrequency.get(patternName) ?? 0) + 1)
          })
        })

        const topPatterns = [...patternFrequency.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name]) => name)

        const difficulty = problems.reduce((acc: any, problem: any) => {
          const key = String(problem.difficulty).toLowerCase()
          if (key === 'easy' || key === 'medium' || key === 'hard') {
            acc[key] += 1
          }
          return acc
        }, { easy: 0, medium: 0, hard: 0 })

        const companyReadiness: CompanyReadiness = {
          company,
          problemsSolved: solvedProblems,
          totalProblems,
          avgTimeSeconds: Math.round(avgTimeSeconds),
          readinessScore: readinessScore.score,
          isReady: readinessScore.score >= READINESS_READY_THRESHOLD
        }

        return {
          ...companyReadiness,
          readinessLevel: getReadinessLevel(readinessScore.score),
          topPatterns,
          difficulty,
          coverageRate: totalProblems > 0 ? solvedProblems / totalProblems : 0,
          recentActivity: allSubmissions.filter((s: any) => {
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            return new Date(s.submittedAt) >= weekAgo
          }).length
        }
      })
    )

    // Sort by readiness score (best first)
    companyData.sort((a, b) => b.readinessScore - a.readinessScore)

    // Calculate overall statistics
    const totalUniqueProblems = await prisma.problem.count({
      where: {
        companies: { some: {} },
      }
    })

    // Distinct company-tagged problems with at least one solved submission (in the selected
    // timeframe). Used for coverage so the rate can never exceed 100% — unlike the per-company
    // sum below, which double-counts problems shared by multiple companies.
    const solvedSubmissionFilter: any = submissionWhere.submittedAt
      ? { status: 'solved', submittedAt: submissionWhere.submittedAt }
      : { status: 'solved' }
    const distinctSolvedWithCompany = await prisma.problem.count({
      where: {
        companies: { some: {} },
        submissions: { some: solvedSubmissionFilter },
      },
    })

    const totalSolved = companyData.reduce((sum, company) => sum + company.problemsSolved, 0)
    const avgReadiness = companyData.length > 0
      ? companyData.reduce((sum, company) => sum + company.readinessScore, 0) / companyData.length
      : 0

    const readyCompanies = companyData.filter(c => c.isReady)
    const mostActive = [...companyData].sort((a, b) => b.recentActivity - a.recentActivity)[0]
    const bestCovered = [...companyData].sort((a, b) => b.coverageRate - a.coverageRate)[0]

    // Generate recommendations
    const recommendations = []
    
    if (readyCompanies.length === 0) {
      recommendations.push("Focus on one company to reach interview-ready status")
    } else if (readyCompanies.length < 3) {
      const nextTargets = companyData
        .filter(c => !c.isReady)
        .sort((a, b) => b.readinessScore - a.readinessScore)
        .slice(0, 2)
      
      if (nextTargets.length > 0) {
        recommendations.push(`Next targets: ${nextTargets.map(c => c.company).join(', ')}`)
      }
    }

    const lowCoverageCompanies = companyData.filter(c => c.coverageRate < 0.2 && c.totalProblems > 5)
    if (lowCoverageCompanies.length > 0) {
      recommendations.push(`Expand coverage: ${lowCoverageCompanies.map(c => c.company).join(', ')}`)
    }

    if (mostActive && mostActive.recentActivity === 0) {
      recommendations.push("Practice company problems more regularly")
    }

    const response = {
      companies: companyData,
      summary: {
        totalCompanies: companyData.length,
        readyCompanies: readyCompanies.length,
        avgReadinessScore: Math.round(avgReadiness * 100) / 100,
        totalProblems: companyData.reduce((sum, c) => sum + c.totalProblems, 0),
        totalSolved,
        mostReady: companyData[0] || null,
        mostActive: mostActive || null,
        bestCovered: bestCovered || null
      },
      insights: {
        strongestCompany: readyCompanies[0]?.company || null,
        weakestArea: companyData[companyData.length - 1]?.company || null,
        improvementOpportunity: companyData.find(c => 
          !c.isReady && c.readinessScore > 0.5
        )?.company || null,
        totalCoverageRate: totalUniqueProblems > 0 ? Math.round((distinctSolvedWithCompany / totalUniqueProblems) * 100) / 100 : 0
      },
      recommendations
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching companies overview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies overview' },
      { status: 500 }
    )
  }
}

// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateCompetencyCoverage } from '@/lib/analytics/behavioral-metrics'

// GET /api/behavioral/analytics/competency-coverage
// Optional ?type=LeadershipPrinciple|Competency  &  ?company=Amazon
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const company = searchParams.get('company')

    const competencyWhere: any = {}
    if (type) competencyWhere.type = type
    if (company) competencyWhere.company = company

    const [competencies, stories, attempts] = await Promise.all([
      prisma.competency.findMany({ where: competencyWhere, select: { name: true, type: true, company: true } }),
      prisma.starStory.findMany({
        select: { id: true, strengthRating: true, competencies: { include: { competency: { select: { name: true } } } } },
      }),
      prisma.behavioralAttempt.findMany({
        include: { question: { include: { competencies: { include: { competency: { select: { name: true } } } } } } },
        orderBy: { submittedAt: 'desc' },
      }),
    ])

    const storyInputs = stories.map((s) => ({
      id: s.id,
      strengthRating: s.strengthRating,
      competencyNames: s.competencies.map((c) => c.competency.name),
    }))
    const attemptInputs = attempts.map((a) => ({
      questionId: a.questionId,
      status: a.status,
      overallScore: a.overallScore,
      usedNotes: a.usedNotes,
      submittedAt: a.submittedAt,
      competencyNames: a.question?.competencies?.map((c) => c.competency.name) ?? [],
    }))

    const coverage = calculateCompetencyCoverage(competencies, storyInputs, attemptInputs)

    const summary = {
      total: coverage.length,
      strong: coverage.filter((c) => c.status === 'Strong').length,
      developing: coverage.filter((c) => c.status === 'Developing').length,
      gap: coverage.filter((c) => c.status === 'Gap').length,
    }

    return NextResponse.json({ coverage, summary })
  } catch (error) {
    console.error('Error calculating competency coverage:', error)
    return NextResponse.json({ error: 'Failed to calculate coverage' }, { status: 500 })
  }
}

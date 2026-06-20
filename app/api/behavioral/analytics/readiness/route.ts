// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calculateBehavioralReadinessFromLatestAttempts,
  getLatestBehavioralAttemptsPerQuestion,
} from '@/lib/analytics/behavioral-metrics'

// GET /api/behavioral/analytics/readiness
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const companyIdParam = searchParams.get('companyId')

    const where: any = {}
    const companyId = companyIdParam ? Number(companyIdParam) : null
    if (Number.isInteger(companyId) && (companyId as number) > 0) {
      where.question = { companies: { some: { companyId } } }
    }

    const attempts = await prisma.behavioralAttempt.findMany({
      where,
      include: {
        question: { include: { competencies: { include: { competency: { select: { name: true } } } } } },
      },
      orderBy: { submittedAt: 'desc' },
    })

    const normalized = attempts.map((a) => ({
      questionId: a.questionId,
      status: a.status,
      overallScore: a.overallScore,
      usedNotes: a.usedNotes,
      resultQuantified: a.resultQuantified,
      submittedAt: a.submittedAt,
      competencyNames: a.question?.competencies?.map((c) => c.competency.name) ?? [],
    }))

    const latest = getLatestBehavioralAttemptsPerQuestion(normalized)
    const readinessScore = calculateBehavioralReadinessFromLatestAttempts(latest)

    const scored = latest.filter((a) => a.overallScore != null && a.status !== 'abandoned')
    const avgOverallScore = scored.length > 0 ? scored.reduce((s, a) => s + a.overallScore, 0) / scored.length : 0
    const quantifiedRate = latest.length > 0
      ? latest.filter((a) => a.resultQuantified).length / latest.length
      : 0

    const recommendations: string[] = []
    if (readinessScore.score < 0.6) recommendations.push('Practice more answers end-to-end; aim for strong Action + Result detail.')
    if (avgOverallScore < 3.5) recommendations.push('Tighten your STAR structure and quantify results with metrics.')

    return NextResponse.json({
      readinessScore,
      metrics: {
        totalQuestions: latest.length,
        scoredQuestions: scored.length,
        avgOverallScore: Math.round(avgOverallScore * 100) / 100,
        quantifiedRate,
      },
      recommendations,
    })
  } catch (error) {
    console.error('Error calculating behavioral readiness:', error)
    return NextResponse.json({ error: 'Failed to calculate readiness' }, { status: 500 })
  }
}

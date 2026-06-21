// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calculateSDReadinessFromLatestAttempts,
  getLatestAttemptsPerQuestion,
} from '@/lib/analytics/system-design-metrics'
import { SD_TIME_BENCHMARKS, getSDBenchmarkKey } from '@/types/system-design'
import { getDateWindow } from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

// GET /api/system-design/analytics/readiness - FAANG system design readiness
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const companyIdParam = searchParams.get('companyId')
    const timeframe = searchParams.get('timeframe')

    const where: any = {}
    const companyId = companyIdParam ? Number(companyIdParam) : null
    if (Number.isInteger(companyId) && (companyId as number) > 0) {
      where.question = { companies: { some: { companyId } } }
    }
    if (timeframe === 'week') {
      const tz = await getUserTimezone()
      where.submittedAt = { gte: getDateWindow(7, tz).startDate }
    } else if (timeframe === 'month') {
      const tz = await getUserTimezone()
      where.submittedAt = { gte: getDateWindow(30, tz).startDate }
    }

    const attempts = await prisma.systemDesignAttempt.findMany({
      where,
      include: { question: { select: { difficulty: true, title: true } } },
      orderBy: { submittedAt: 'desc' },
    })

    const latest = getLatestAttemptsPerQuestion(attempts)
    const readinessScore = calculateSDReadinessFromLatestAttempts(latest)

    const scored = latest.filter((a) => a.overallScore != null && a.status !== 'abandoned')
    const avgOverallScore =
      scored.length > 0 ? scored.reduce((sum, a) => sum + a.overallScore, 0) / scored.length : 0
    const referenceUsageRate =
      scored.length > 0 ? scored.filter((a) => a.usedReference).length / scored.length : 0

    const onPace = scored.filter((a) => {
      if (!a.question?.difficulty) return false
      const benchmark = SD_TIME_BENCHMARKS[getSDBenchmarkKey(a.question.difficulty)]
      return typeof benchmark === 'number' && a.timeSpentSeconds <= benchmark
    }).length
    const speedScore = scored.length > 0 ? onPace / scored.length : 0

    const recommendations: string[] = []
    if (readinessScore.score < 0.6) recommendations.push('Practice more full designs end-to-end without leaning on the reference solution.')
    if (referenceUsageRate > 0.4) recommendations.push('Try to drive designs from memory — reference dependence is high.')
    if (speedScore < 0.5) recommendations.push('Work on pacing: aim to complete medium designs within 45 minutes.')

    return NextResponse.json({
      readinessScore,
      metrics: {
        totalQuestions: latest.length,
        scoredQuestions: scored.length,
        avgOverallScore: Math.round(avgOverallScore * 100) / 100,
        referenceUsageRate,
        speedScore,
      },
      recommendations,
    })
  } catch (error) {
    console.error('Error calculating SD readiness:', error)
    return NextResponse.json({ error: 'Failed to calculate readiness' }, { status: 500 })
  }
}

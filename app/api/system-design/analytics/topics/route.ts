// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateSDTopicMetrics } from '@/lib/analytics/system-design-metrics'

// GET /api/system-design/analytics/topics - Per building-block topic mastery
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const minQuestions = parseInt(searchParams.get('minQuestions') || '1')

    const questions = await prisma.systemDesignQuestion.findMany({
      include: {
        topics: { include: { topic: { select: { name: true, category: true } } } },
        attempts: { select: { status: true, overallScore: true, usedReference: true, submittedAt: true } },
      },
    })

    const metrics = calculateSDTopicMetrics(questions, isNaN(minQuestions) ? 1 : minQuestions)
    // Catalog entries are useful before any question is linked to them. Preserve
    // calculated metrics and add only genuinely unlinked topics with zero values.
    const catalog = await prisma.systemDesignTopic.findMany({ orderBy: { name: 'asc' } })
    const linkedNames = new Set(questions.flatMap(q => q.topics.map(t => t.topic.name)))
    for (const topic of catalog) {
      if (!linkedNames.has(topic.name)) metrics.push({
        topic: topic.name, category: topic.category, totalQuestions: 0,
        attempted: 0, avgOverallScore: 0, referenceUsageRate: 0,
        confidence: 'Weak', masteryPercentage: 0, questionIds: [], attemptedQuestionIds: [],
      })
    }

    const byCategory: Record<string, { total: number; mastery: number; count: number }> = {}
    for (const m of metrics) {
      if (!byCategory[m.category]) byCategory[m.category] = { total: 0, mastery: 0, count: 0 }
      byCategory[m.category].count += 1
      byCategory[m.category].mastery += m.masteryPercentage
    }
    const categorySummary = Object.entries(byCategory).map(([category, data]) => ({
      category,
      topicCount: data.count,
      avgMastery: data.count > 0 ? Math.round(data.mastery / data.count) : 0,
    }))

    const summary = {
      totalTopics: metrics.length,
      strong: metrics.filter((m) => m.confidence === 'Strong').length,
      medium: metrics.filter((m) => m.confidence === 'Medium').length,
      weak: metrics.filter((m) => m.confidence === 'Weak').length,
      avgMastery: metrics.length > 0 ? Math.round(metrics.reduce((s, m) => s + m.masteryPercentage, 0) / metrics.length) : 0,
    }

    return NextResponse.json({ topics: metrics, summary, categorySummary })
  } catch (error) {
    console.error('Error calculating SD topic metrics:', error)
    return NextResponse.json({ error: 'Failed to calculate topic metrics' }, { status: 500 })
  }
}

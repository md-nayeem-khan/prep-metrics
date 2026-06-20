// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateStoryBankHealth } from '@/lib/analytics/behavioral-metrics'

// GET /api/behavioral/analytics/story-health - Story bank size, strength, reuse, gaps
export async function GET() {
  try {
    const [competencies, stories] = await Promise.all([
      prisma.competency.findMany({ select: { name: true, type: true, company: true } }),
      prisma.starStory.findMany({
        select: { id: true, strengthRating: true, competencies: { include: { competency: { select: { name: true } } } } },
      }),
    ])

    const storyInputs = stories.map((s) => ({
      id: s.id,
      strengthRating: s.strengthRating,
      competencyNames: s.competencies.map((c) => c.competency.name),
    }))

    const health = calculateStoryBankHealth(competencies, storyInputs)
    return NextResponse.json({ health })
  } catch (error) {
    console.error('Error calculating story bank health:', error)
    return NextResponse.json({ error: 'Failed to calculate story health' }, { status: 500 })
  }
}

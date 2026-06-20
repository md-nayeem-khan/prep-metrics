// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/behavioral/stories - List STAR story bank
export async function GET() {
  try {
    const stories = await prisma.starStory.findMany({
      include: {
        competencies: { include: { competency: { select: { id: true, name: true, type: true } } } },
        questions: { include: { question: { select: { id: true, prompt: true } } } },
        _count: { select: { attempts: true } },
      },
      orderBy: { updatedAt: 'desc' },
    })

    const formatted = stories.map((s) => ({
      id: s.id,
      title: s.title,
      situation: s.situation,
      task: s.task,
      action: s.action,
      result: s.result,
      metrics: s.metrics,
      tags: s.tags,
      strengthRating: s.strengthRating,
      competencies: s.competencies.map((c) => ({ id: c.competency.id, name: c.competency.name, type: c.competency.type })),
      linkedQuestionIds: s.questions.map((q) => q.question.id),
      usageCount: s._count.attempts,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }))

    return NextResponse.json({ stories: formatted })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}

// POST /api/behavioral/stories - Create a STAR story (with competency/question mapping)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title, situation, task, action, result, metrics, tags, strengthRating,
      competencyIds = [], questionIds = [],
    } = body

    if (!title) return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 })

    const story = await prisma.starStory.create({
      data: {
        title,
        situation: situation || null,
        task: task || null,
        action: action || null,
        result: result || null,
        metrics: metrics || null,
        tags: tags || null,
        strengthRating: strengthRating ?? null,
        competencies: { create: (competencyIds || []).map((competencyId: number) => ({ competencyId })) },
        questions: { create: (questionIds || []).map((questionId: number) => ({ questionId })) },
      },
      include: { competencies: { include: { competency: true } } },
    })

    return NextResponse.json({ story }, { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}

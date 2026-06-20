import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isMockType, type MockType } from '@/types/mock'
import { calculateMockSummary } from '@/lib/analytics/mock-metrics'
import {
  selectRandomQuestionId,
  createManualQuestionId,
  bankQuestionExists,
  questionLink,
} from '@/lib/server/mock'

const LIST_INCLUDE = {
  problem: { select: { title: true, difficulty: true } },
  systemDesignQuestion: { select: { title: true, difficulty: true, category: true } },
  behavioralQuestion: { select: { prompt: true, category: true } },
} as const

// GET /api/mock-interviews - list sessions (all types) + per-type stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const recent = searchParams.get('recent') === 'true'
    const where = recent
      ? { date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
      : undefined

    const mockInterviews = await prisma.mockInterview.findMany({
      take: limit,
      orderBy: { date: 'desc' },
      where,
      include: LIST_INCLUDE,
    })

    // Stats are computed across ALL sessions (not just the listed page).
    const allSessions = await prisma.mockInterview.findMany({
      select: { type: true, status: true, solved: true, overallScore: true, timeTakenSeconds: true },
    })
    const summary = calculateMockSummary(allSessions)

    return NextResponse.json({ mockInterviews, stats: summary })
  } catch (error) {
    console.error('Error fetching mock interviews:', error)
    return NextResponse.json({ error: 'Failed to fetch mock interviews' }, { status: 500 })
  }
}

// POST /api/mock-interviews - create a session for any type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      date,
      timeLimit, // minutes
      difficulty,
      questionId,
      questionTitle,
      questionPrompt,
    } = body

    const type: MockType = isMockType(body.type) ? body.type : 'coding'
    // Legacy callers sent { problemTitle } for a manual coding mock.
    const title: string | undefined = questionTitle ?? body.problemTitle
    const questionSource: string = body.questionSource
      ?? (questionId ? 'bank' : 'manual')

    let resolvedId: number | null = null

    if (questionSource === 'bank') {
      if (!questionId) {
        return NextResponse.json({ error: 'questionId is required when questionSource is "bank"' }, { status: 400 })
      }
      const exists = await bankQuestionExists(type, Number(questionId))
      if (!exists) {
        return NextResponse.json({ error: 'Selected question not found' }, { status: 404 })
      }
      resolvedId = Number(questionId)
    } else if (questionSource === 'random') {
      resolvedId = await selectRandomQuestionId(type, difficulty)
      if (resolvedId == null) {
        return NextResponse.json({ error: 'No suitable question found for a random mock' }, { status: 404 })
      }
    } else {
      // manual
      if (!title && !questionPrompt) {
        return NextResponse.json({ error: 'A title or prompt is required for a manual mock' }, { status: 400 })
      }
      resolvedId = await createManualQuestionId(type, { title, prompt: questionPrompt, difficulty })
    }

    const mockInterview = await prisma.mockInterview.create({
      data: {
        type,
        status: 'inProgress',
        date: date ? new Date(date) : new Date(),
        timeLimit: typeof timeLimit === 'number' ? timeLimit * 60 : 2700,
        solved: false,
        ...questionLink(type, resolvedId),
      },
      include: LIST_INCLUDE,
    })

    return NextResponse.json({ success: true, mockInterview }, { status: 201 })
  } catch (error) {
    console.error('Error creating mock interview:', error)
    return NextResponse.json({ error: 'Failed to create mock interview' }, { status: 500 })
  }
}

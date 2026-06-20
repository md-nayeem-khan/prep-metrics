import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isMockType, MOCK_TYPE_CONFIG, type MockType } from '@/types/mock'
import { selectRandomQuestionId, questionLink } from '@/lib/server/mock'

// POST /api/mock-interviews/start - start a random mock interview of a given type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { difficulty, timeLimit } = body
    const type: MockType = isMockType(body.type) ? body.type : 'coding'

    const resolvedId = await selectRandomQuestionId(type, difficulty)
    if (resolvedId == null) {
      return NextResponse.json({ error: 'No suitable question found for mock interview' }, { status: 404 })
    }

    const minutes = typeof timeLimit === 'number' ? timeLimit : MOCK_TYPE_CONFIG[type].defaultTimeLimitMinutes

    const mockInterview = await prisma.mockInterview.create({
      data: {
        type,
        status: 'inProgress',
        date: new Date(),
        timeLimit: minutes * 60,
        solved: false,
        ...questionLink(type, resolvedId),
      },
      include: {
        problem: { select: { title: true, difficulty: true } },
        systemDesignQuestion: { select: { title: true, difficulty: true, category: true } },
        behavioralQuestion: { select: { prompt: true, category: true } },
      },
    })

    return NextResponse.json({ success: true, mockInterview, message: 'Mock interview started successfully' })
  } catch (error) {
    console.error('Error starting mock interview:', error)
    return NextResponse.json({ error: 'Failed to start mock interview' }, { status: 500 })
  }
}

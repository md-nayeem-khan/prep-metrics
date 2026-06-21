// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  createSystemDesignAttempt,
  SD_RUBRIC_KEYS,
  VALID_ATTEMPT_STATUSES,
} from '@/lib/server/attempts'
import { getUserTimezone } from '@/lib/server/user-timezone'

// POST /api/system-design/attempts - Log a system design practice attempt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      questionId,
      timeSpentSeconds,
      status = 'completed',
      submittedAt,
      mode = 'practice',
      attemptType = 'First',
      usedReference = false,
      approachNote,
      mistakeNote,
    } = body

    if (!questionId || timeSpentSeconds == null) {
      return NextResponse.json({ error: 'Missing required fields: questionId, timeSpentSeconds' }, { status: 400 })
    }

    if (!VALID_ATTEMPT_STATUSES.includes(status)) {
      return NextResponse.json({ error: `status must be one of: ${VALID_ATTEMPT_STATUSES.join(', ')}` }, { status: 400 })
    }

    const question = await prisma.systemDesignQuestion.findUnique({ where: { id: questionId } })
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Collect rubric scores from the body (1-5 each, optional)
    const rubric: Record<string, number> = {}
    for (const key of SD_RUBRIC_KEYS) {
      if (body[key] != null) rubric[key] = Number(body[key])
    }

    const attempt = await createSystemDesignAttempt({
      questionId,
      timeSpentSeconds,
      status,
      submittedAt,
      timezone: await getUserTimezone(),
      mode,
      attemptType,
      usedReference,
      approachNote,
      mistakeNote,
      rubric,
    })

    return NextResponse.json({ attempt }, { status: 201 })
  } catch (error) {
    console.error('Error creating system design attempt:', error)
    return NextResponse.json({ error: 'Failed to create attempt' }, { status: 500 })
  }
}

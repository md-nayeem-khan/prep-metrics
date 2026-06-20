// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  createBehavioralAttempt,
  STAR_RUBRIC_KEYS,
  VALID_ATTEMPT_STATUSES,
} from '@/lib/server/attempts'

// POST /api/behavioral/attempts - Log a behavioral practice attempt (STAR self-rating)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      questionId, storyId, timeSpentSeconds, status = 'completed', submittedAt,
      mode = 'practice', attemptType = 'First', resultQuantified = false,
      usedNotes = false, reflectionNote,
    } = body

    if (!questionId || timeSpentSeconds == null) {
      return NextResponse.json({ error: 'Missing required fields: questionId, timeSpentSeconds' }, { status: 400 })
    }
    if (!VALID_ATTEMPT_STATUSES.includes(status)) {
      return NextResponse.json({ error: `status must be one of: ${VALID_ATTEMPT_STATUSES.join(', ')}` }, { status: 400 })
    }

    const question = await prisma.behavioralQuestion.findUnique({ where: { id: questionId } })
    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

    const rubric: Record<string, number> = {}
    for (const key of STAR_RUBRIC_KEYS) if (body[key] != null) rubric[key] = Number(body[key])

    const attempt = await createBehavioralAttempt({
      questionId,
      storyId,
      timeSpentSeconds,
      status,
      submittedAt,
      mode,
      attemptType,
      resultQuantified,
      usedNotes,
      reflectionNote,
      rubric,
    })

    return NextResponse.json({ attempt }, { status: 201 })
  } catch (error) {
    console.error('Error creating behavioral attempt:', error)
    return NextResponse.json({ error: 'Failed to create attempt' }, { status: 500 })
  }
}

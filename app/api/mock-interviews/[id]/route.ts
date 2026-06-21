import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  createSystemDesignAttempt,
  createBehavioralAttempt,
  SD_RUBRIC_KEYS,
  STAR_RUBRIC_KEYS,
  VALID_ATTEMPT_STATUSES,
} from '@/lib/server/attempts'
import { startOfDayInstant, endOfDayExclusiveInstant } from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

const DETAIL_INCLUDE = {
  problem: { include: { patterns: { include: { pattern: true } } } },
  systemDesignQuestion: { include: { topics: { include: { topic: true } } } },
  behavioralQuestion: {
    include: {
      competencies: { include: { competency: { select: { id: true, name: true, type: true } } } },
      stories: { include: { story: { select: { id: true, title: true, strengthRating: true } } } },
    },
  },
  story: { select: { id: true, title: true } },
}

// Build a type-appropriate `question` payload from an included mock row.
function buildQuestion(mock: any) {
  if (mock.type === 'systemDesign' && mock.systemDesignQuestion) {
    const q = mock.systemDesignQuestion
    return {
      title: q.title,
      difficulty: q.difficulty,
      category: q.category,
      prompt: q.prompt,
      functionalRequirements: q.functionalRequirements,
      nonFunctionalRequirements: q.nonFunctionalRequirements,
      estimationNotes: q.estimationNotes,
      referenceSolution: q.referenceSolution,
      commonPitfalls: q.commonPitfalls,
      topics: q.topics.map((t: any) => ({ id: t.topic.id, name: t.topic.name, category: t.topic.category })),
    }
  }
  if (mock.type === 'behavioral' && mock.behavioralQuestion) {
    const q = mock.behavioralQuestion
    return {
      prompt: q.prompt,
      category: q.category,
      whatTheyAssess: q.whatTheyAssess,
      followUps: q.followUps,
      exemplarAnswer: q.exemplarAnswer,
      competencies: q.competencies.map((c: any) => ({ id: c.competency.id, name: c.competency.name, type: c.competency.type })),
      linkedStories: q.stories.map((s: any) => s.story),
    }
  }
  // coding (default)
  const p = mock.problem
  return {
    title: p?.title ?? 'Mock problem',
    difficulty: p?.difficulty ?? 'medium',
    patterns: p?.patterns?.map((pp: any) => pp.pattern.name) ?? [],
  }
}

// GET /api/mock-interviews/[id] - single session with type-appropriate question payload
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mockId = parseInt(id)
    if (isNaN(mockId)) {
      return NextResponse.json({ error: 'Invalid mock interview ID' }, { status: 400 })
    }

    const mock = await prisma.mockInterview.findUnique({
      where: { id: mockId },
      include: DETAIL_INCLUDE,
    })
    if (!mock) {
      return NextResponse.json({ error: 'Mock interview not found' }, { status: 404 })
    }

    const {
      problem, systemDesignQuestion, behavioralQuestion, ...rest
    } = mock as any

    return NextResponse.json({ ...rest, type: mock.type, question: buildQuestion(mock) })
  } catch (error) {
    console.error('Error fetching mock interview:', error)
    return NextResponse.json({ error: 'Failed to fetch mock interview' }, { status: 500 })
  }
}

// Count-and-set the day's completed mock-interview counter (idempotent, non-fatal).
async function bumpMockDailyProgress(date: Date, tz: string) {
  try {
    const normalizedDate = startOfDayInstant(date, tz)
    const endOfDayExclusive = endOfDayExclusiveInstant(date, tz)
    const todayCount = await prisma.mockInterview.count({
      where: { status: 'completed', date: { gte: normalizedDate, lt: endOfDayExclusive } },
    })
    const existing = await prisma.dailyProgress.findFirst({
      where: { date: { gte: normalizedDate, lt: endOfDayExclusive } },
    })
    if (existing) {
      await prisma.dailyProgress.update({ where: { id: existing.id }, data: { mockInterviews: todayCount } })
    } else {
      await prisma.dailyProgress.create({ data: { date: normalizedDate, mockInterviews: todayCount } })
    }
  } catch (progressError) {
    console.error('Error updating daily progress (mock):', progressError)
  }
}

// PUT /api/mock-interviews/[id] - submit the session (branches by type)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mockId = parseInt(id)
    const body = await request.json()
    if (isNaN(mockId)) {
      return NextResponse.json({ error: 'Invalid mock interview ID' }, { status: 400 })
    }

    const mock = await prisma.mockInterview.findUnique({ where: { id: mockId } })
    if (!mock) {
      return NextResponse.json({ error: 'Mock interview not found' }, { status: 404 })
    }

    const tz = await getUserTimezone()
    const { timeTakenSeconds, notes } = body
    const status: string = body.status ?? 'completed'
    if (mock.type !== 'coding' && !(VALID_ATTEMPT_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json({ error: `status must be one of: ${VALID_ATTEMPT_STATUSES.join(', ')}` }, { status: 400 })
    }

    if (mock.type === 'systemDesign') {
      const rubric: Record<string, number> = {}
      for (const key of SD_RUBRIC_KEYS) if (body[key] != null) rubric[key] = Number(body[key])

      const attempt = await createSystemDesignAttempt({
        questionId: mock.systemDesignQuestionId as number,
        timeSpentSeconds: timeTakenSeconds ?? 0,
        status: status as 'completed' | 'partial' | 'abandoned',
        timezone: tz,
        mode: 'mock',
        usedReference: !!body.usedReference,
        approachNote: body.approachNote ?? null,
        rubric,
      })

      const updated = await prisma.mockInterview.update({
        where: { id: mockId },
        data: {
          systemDesignAttemptId: attempt.id,
          overallScore: attempt.overallScore,
          timeTakenSeconds: timeTakenSeconds ?? null,
          solved: status === 'completed',
          status: 'completed',
          notes: notes ?? null,
        },
      })
      await bumpMockDailyProgress(new Date(updated.date), tz)
      return NextResponse.json(updated)
    }

    if (mock.type === 'behavioral') {
      const rubric: Record<string, number> = {}
      for (const key of STAR_RUBRIC_KEYS) if (body[key] != null) rubric[key] = Number(body[key])
      const storyId = body.storyId != null ? Number(body.storyId) : (mock.storyId ?? null)

      const attempt = await createBehavioralAttempt({
        questionId: mock.behavioralQuestionId as number,
        storyId,
        timeSpentSeconds: timeTakenSeconds ?? 0,
        status: status as 'completed' | 'partial' | 'abandoned',
        timezone: tz,
        mode: 'mock',
        resultQuantified: !!body.resultQuantified,
        usedNotes: !!body.usedNotes,
        reflectionNote: body.reflectionNote ?? null,
        rubric,
      })

      const updated = await prisma.mockInterview.update({
        where: { id: mockId },
        data: {
          behavioralAttemptId: attempt.id,
          storyId,
          overallScore: attempt.overallScore,
          timeTakenSeconds: timeTakenSeconds ?? null,
          solved: status === 'completed',
          status: 'completed',
          notes: notes ?? null,
        },
      })
      await bumpMockDailyProgress(new Date(updated.date), tz)
      return NextResponse.json(updated)
    }

    // coding (inline rubric)
    const { solved, explanationScore, codeQualityScore } = body
    const hasExplanation = explanationScore != null
    const hasCodeQuality = codeQualityScore != null
    const overallScore = hasExplanation && hasCodeQuality
      ? (Number(explanationScore) + Number(codeQualityScore)) / 2
      : null

    const updated = await prisma.mockInterview.update({
      where: { id: mockId },
      data: {
        timeTakenSeconds: timeTakenSeconds ?? null,
        solved: Boolean(solved),
        explanationScore: hasExplanation ? Number(explanationScore) : null,
        codeQualityScore: hasCodeQuality ? Number(codeQualityScore) : null,
        overallScore,
        status: 'completed',
        notes: notes ?? null,
      },
    })
    await bumpMockDailyProgress(new Date(updated.date), tz)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating mock interview:', error)
    return NextResponse.json({ error: 'Failed to update mock interview' }, { status: 500 })
  }
}

// DELETE /api/mock-interviews/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mockId = parseInt(id)
    if (isNaN(mockId)) {
      return NextResponse.json({ error: 'Invalid mock interview ID' }, { status: 400 })
    }
    await prisma.mockInterview.delete({ where: { id: mockId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting mock interview:', error)
    return NextResponse.json({ error: 'Failed to delete mock interview' }, { status: 500 })
  }
}

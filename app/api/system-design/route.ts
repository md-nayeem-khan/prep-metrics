// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSystemDesignResponse } from '@/lib/server/system-design-create-http'

// GET /api/system-design - List system design questions with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const normalizeFilter = (value: string | null) => {
      if (!value) return null
      const trimmed = value.trim()
      if (!trimmed || trimmed.toLowerCase() === 'all') return null
      return trimmed
    }

    const difficulty = normalizeFilter(searchParams.get('difficulty'))
    const category = normalizeFilter(searchParams.get('category'))
    const topic = normalizeFilter(searchParams.get('topic'))
    const source = normalizeFilter(searchParams.get('source'))
    const search = normalizeFilter(searchParams.get('search'))
    const companyIdParam = normalizeFilter(searchParams.get('companyId'))
    const limit = searchParams.get('limit')

    const where: any = {}
    const andClauses: any[] = []

    if (difficulty) where.difficulty = difficulty
    if (category) where.category = category
    if (source) where.source = source

    const companyId = companyIdParam ? Number(companyIdParam) : null
    if (Number.isInteger(companyId) && (companyId as number) > 0) {
      andClauses.push({ companies: { some: { companyId } } })
    }

    if (topic) {
      where.topics = { some: { topic: { name: { contains: topic, mode: 'insensitive' } } } }
    }

    if (search) {
      andClauses.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { prompt: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { topics: { some: { topic: { name: { contains: search, mode: 'insensitive' } } } } },
        ],
      })
    }

    if (andClauses.length > 0) where.AND = andClauses

    const questions = await prisma.systemDesignQuestion.findMany({
      where,
      include: {
        topics: { include: { topic: true } },
        companies: { include: { company: { select: { id: true, name: true } } } },
        attempts: { orderBy: { submittedAt: 'desc' }, take: 1 },
        _count: { select: { attempts: true } },
      },
      orderBy: { id: 'asc' },
      ...(limit && !isNaN(parseInt(limit)) ? { take: parseInt(limit) } : {}),
    })

    const formatted = questions.map((q) => ({
      id: q.id,
      slug: q.slug,
      title: q.title,
      difficulty: q.difficulty,
      category: q.category,
      source: q.source,
      url: q.url,
      topics: q.topics.map((t) => ({ id: t.topic.id, name: t.topic.name, category: t.topic.category })),
      companies: q.companies.map((c) => c.company.name),
      companyIds: q.companies.map((c) => c.company.id),
      latestAttempt: q.attempts[0]
        ? { status: q.attempts[0].status, overallScore: q.attempts[0].overallScore, usedReference: q.attempts[0].usedReference, submittedAt: q.attempts[0].submittedAt }
        : null,
      attemptCount: q._count.attempts,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt,
    }))

    return NextResponse.json({ questions: formatted })
  } catch (error) {
    console.error('Error fetching system design questions:', error)
    return NextResponse.json({ error: 'Failed to fetch system design questions' }, { status: 500 })
  }
}

// POST /api/system-design - Authenticated, validated, atomic creation.
export { createQuestion as POST };
async function createQuestion(request: NextRequest) {
  return createSystemDesignResponse(request, 'question');
}

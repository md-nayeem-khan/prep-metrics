// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/behavioral - List behavioral questions with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const normalizeFilter = (value: string | null) => {
      if (!value) return null
      const trimmed = value.trim()
      if (!trimmed || trimmed.toLowerCase() === 'all') return null
      return trimmed
    }

    const category = normalizeFilter(searchParams.get('category'))
    const competency = normalizeFilter(searchParams.get('competency'))
    const source = normalizeFilter(searchParams.get('source'))
    const search = normalizeFilter(searchParams.get('search'))
    const companyIdParam = normalizeFilter(searchParams.get('companyId'))
    const limit = searchParams.get('limit')

    const where: any = {}
    const andClauses: any[] = []

    if (category) where.category = category
    if (source) where.source = source

    const companyId = companyIdParam ? Number(companyIdParam) : null
    if (Number.isInteger(companyId) && (companyId as number) > 0) {
      andClauses.push({ companies: { some: { companyId } } })
    }
    if (competency) {
      where.competencies = { some: { competency: { name: { contains: competency, mode: 'insensitive' } } } }
    }
    if (search) {
      andClauses.push({
        OR: [
          { prompt: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { competencies: { some: { competency: { name: { contains: search, mode: 'insensitive' } } } } },
        ],
      })
    }
    if (andClauses.length > 0) where.AND = andClauses

    const questions = await prisma.behavioralQuestion.findMany({
      where,
      include: {
        competencies: { include: { competency: { select: { id: true, name: true, type: true } } } },
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
      prompt: q.prompt,
      category: q.category,
      difficulty: q.difficulty,
      source: q.source,
      competencies: q.competencies.map((c) => ({ id: c.competency.id, name: c.competency.name, type: c.competency.type })),
      companies: q.companies.map((c) => c.company.name),
      companyIds: q.companies.map((c) => c.company.id),
      latestAttempt: q.attempts[0]
        ? { status: q.attempts[0].status, overallScore: q.attempts[0].overallScore, submittedAt: q.attempts[0].submittedAt }
        : null,
      attemptCount: q._count.attempts,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt,
    }))

    return NextResponse.json({ questions: formatted })
  } catch (error) {
    console.error('Error fetching behavioral questions:', error)
    return NextResponse.json({ error: 'Failed to fetch behavioral questions' }, { status: 500 })
  }
}

// POST /api/behavioral - Create a behavioral question
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      slug, prompt, category, difficulty, whatTheyAssess, exemplarAnswer, followUps,
      source = 'Company', notes, competencyIds = [], companyIds = [],
    } = body

    if (!slug || !prompt || !category) {
      return NextResponse.json({ error: 'Missing required fields: slug, prompt, category' }, { status: 400 })
    }

    const question = await prisma.behavioralQuestion.create({
      data: {
        slug, prompt, category,
        difficulty: difficulty || null,
        whatTheyAssess: whatTheyAssess || null,
        exemplarAnswer: exemplarAnswer || null,
        followUps: followUps || null,
        source,
        notes: notes || null,
        competencies: { create: (competencyIds || []).map((competencyId: number) => ({ competencyId })) },
        companies: { create: (companyIds || []).map((companyId: number) => ({ companyId })) },
      },
      include: {
        competencies: { include: { competency: true } },
        companies: { include: { company: { select: { id: true, name: true } } } },
      },
    })

    return NextResponse.json({ question }, { status: 201 })
  } catch (error) {
    console.error('Error creating behavioral question:', error)
    return NextResponse.json({ error: 'Failed to create behavioral question' }, { status: 500 })
  }
}

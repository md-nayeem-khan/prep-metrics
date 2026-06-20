// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function resolveCompanyIds(input: {
  companyIds?: unknown
}): Promise<number[]> {
  if (Array.isArray(input.companyIds)) {
    const ids = input.companyIds
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value) && value > 0)
    return Array.from(new Set(ids))
  }

  return []
}

// GET /api/problems - List all problems with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const normalizeFilter = (value: string | null) => {
      if (!value) return null
      const trimmed = value.trim()
      if (!trimmed || trimmed.toLowerCase() === 'all') return null
      return trimmed
    }

    const platform = normalizeFilter(searchParams.get('platform'))
    const difficulty = normalizeFilter(searchParams.get('difficulty'))
    const pattern = normalizeFilter(searchParams.get('pattern'))
    const tag = normalizeFilter(searchParams.get('tag'))
    const search = normalizeFilter(searchParams.get('search'))
    const limit = searchParams.get('limit')
    
    // NEW FILTERS
    const source = normalizeFilter(searchParams.get('source'))
    const companyIdParam = normalizeFilter(searchParams.get('companyId'))

    const where: any = {}
    const andClauses: any[] = []

    if (platform) where.platform = platform
    if (difficulty) where.difficulty = difficulty
    if (source) where.source = source
    const companyId = companyIdParam ? Number(companyIdParam) : null
    const hasValidCompanyId = Number.isInteger(companyId) && (companyId as number) > 0

    if (hasValidCompanyId) {
      andClauses.push({
        companies: {
          some: {
            companyId: companyId,
          },
        },
      })
    }
    if (search) {
      andClauses.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { problemId: { contains: search, mode: 'insensitive' } },
          { platform: { contains: search, mode: 'insensitive' } },
          { source: { contains: search, mode: 'insensitive' } },
          {
            companies: {
              some: {
                company: {
                  name: { contains: search, mode: 'insensitive' },
                },
              },
            },
          },
          {
            tags: {
              some: {
                tag: { contains: search, mode: 'insensitive' },
              },
            },
          },
          {
            patterns: {
              some: {
                pattern: {
                  name: { contains: search, mode: 'insensitive' },
                },
              },
            },
          },
        ]
      })
    }
    if (tag) {
      where.tags = {
        some: {
          tag: { contains: tag, mode: 'insensitive' },
        },
      }
    }
    if (pattern) {
      where.patterns = {
        some: {
          pattern: {
            name: { contains: pattern, mode: 'insensitive' },
          },
        },
      }
    }
    if (andClauses.length > 0) {
      where.AND = andClauses
    }

    const problems = await prisma.problem.findMany({
      where,
      include: {
        tags: true,
        patterns: {
          include: {
            pattern: true,
          },
        },
        companies: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        submissions: {
          orderBy: { submittedAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { createdAt: 'asc' },
      ...(limit && !isNaN(parseInt(limit)) ? { take: parseInt(limit) } : {}),
    })

    const formattedProblems = problems.map((problem) => ({
      id: problem.id,
      platform: problem.platform,
      problemId: problem.problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      url: problem.url,
      notes: problem.notes,
      
      // NEW FIELDS
      source: problem.source,
      company: problem.companies[0]?.company.name ?? null,
      companies: problem.companies.map((entry) => entry.company.name),
      companyIds: problem.companies.map((entry) => entry.company.id),
      
      tags: problem.tags.map((t) => t.tag),
      patterns: problem.patterns.map((p) => ({
        id: p.pattern.id,
        name: p.pattern.name,
        category: p.pattern.category,
      })),
      submissions: problem.submissions.map((s) => ({
        timeSpentSeconds: s.timeSpentSeconds,
        status: s.status,
        submittedAt: s.submittedAt,
        // Include new submission fields for display
        attemptType: s.attemptType,
        wasHintUsed: s.wasHintUsed,
      })),
      attemptCount: problem._count.submissions,
      lastAttempt: problem.submissions[0]?.submittedAt || null,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt,
    }))

    return NextResponse.json({ problems: formattedProblems })
  } catch (error) {
    console.error('Error fetching problems:', error)
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    )
  }
}

// POST /api/problems - Create new problem
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      platform, 
      problemId, 
      title, 
      difficulty, 
      url, 
      tags, 
      patterns, 
      notes,
      // NEW FIELDS
      source = 'NeetCode',  // Default to NeetCode
      companyIds,
    } = body
    const resolvedCompanyIds = await resolveCompanyIds({ companyIds })

    // Validation
    if (!platform || !problemId || !title || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields: platform, problemId, title, difficulty' },
        { status: 400 }
      )
    }

    // Validate source
    if (source && !['NeetCode', 'Company'].includes(source)) {
      return NextResponse.json(
        { error: 'Source must be "NeetCode" or "Company"' },
        { status: 400 }
      )
    }

    // Check for duplicate
    const existing = await prisma.problem.findUnique({
      where: {
        platform_problemId: {
          platform,
          problemId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: `Problem ${platform}-${problemId} already exists` },
        { status: 409 }
      )
    }

    // Create problem with tags and patterns
    const problem = await prisma.problem.create({
      data: {
        platform,
        problemId,
        title,
        difficulty,
        url: url || null,
        notes: notes || null,
        // NEW FIELDS
        source,
        companies: {
          create: resolvedCompanyIds.map((id) => ({
            company: {
              connect: { id },
            },
          })),
        },
        tags: {
          create: (tags || []).map((tag: string) => ({ tag })),
        },
        patterns: {
          create: (patterns || []).map((patternId: number) => ({
            patternId,
          })),
        },
      },
      include: {
        tags: true,
        patterns: {
          include: {
            pattern: true,
          },
        },
        companies: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(
      {
        problem: {
          ...problem,
          company: problem.companies[0]?.company.name ?? null,
          companies: problem.companies.map((entry) => entry.company.name),
          companyIds: problem.companies.map((entry) => entry.company.id),
          tags: problem.tags.map((t) => t.tag),
          patterns: problem.patterns.map((p) => ({
            id: p.pattern.id,
            name: p.pattern.name,
            category: p.pattern.category,
          })),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating problem:', error)
    return NextResponse.json(
      { error: 'Failed to create problem' },
      { status: 500 }
    )
  }
}


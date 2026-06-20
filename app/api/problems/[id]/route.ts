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

// GET /api/problems/[id] - Get a single problem with details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const problemId = parseInt(id)

    if (isNaN(problemId)) {
      return NextResponse.json(
        { error: 'Invalid problem ID' },
        { status: 400 }
      )
    }

    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        tags: true,
        patterns: {
          include: {
            pattern: true
          }
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
          include: {
            revisions: true
          }
        }
      }
    })

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...problem,
      company: problem.companies[0]?.company.name ?? null,
      companies: problem.companies.map(entry => entry.company.name),
      companyIds: problem.companies.map(entry => entry.company.id),
      tags: problem.tags.map(t => t.tag),
      patterns: problem.patterns.map(p => ({
        id: p.pattern.id,
        name: p.pattern.name,
        category: p.pattern.category
      }))
    })
  } catch (error) {
    console.error('Error fetching problem:', error)
    return NextResponse.json(
      { error: 'Failed to fetch problem' },
      { status: 500 }
    )
  }
}

// PUT /api/problems/[id] - Update a problem
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const problemId = parseInt(id)
    const body = await request.json()

    if (isNaN(problemId)) {
      return NextResponse.json(
        { error: 'Invalid problem ID' },
        { status: 400 }
      )
    }

    const { title, difficulty, url, notes, source, companyIds, tags, patterns } = body

    const shouldUpdateCompanies =
      companyIds !== undefined
    const resolvedCompanyIds = shouldUpdateCompanies
      ? await resolveCompanyIds({ companyIds })
      : null

    const problem = await prisma.problem.update({
      where: { id: problemId },
      data: {
        ...(title && { title }),
        ...(difficulty && { difficulty }),
        ...(url !== undefined && { url }),
        ...(notes !== undefined && { notes }),
        ...(source && { source }),
        ...(shouldUpdateCompanies && {
          companies: {
            deleteMany: {},
            create: resolvedCompanyIds!.map((id) => ({
              company: {
                connect: { id },
              },
            })),
          },
        }),
        ...(tags && {
          tags: {
            deleteMany: {},
            create: tags.map((tag: string) => ({ tag }))
          }
        }),
        ...(patterns && {
          patterns: {
            deleteMany: {},
            create: patterns.map((patternId: number) => ({ patternId }))
          }
        })
      },
      include: {
        tags: true,
        patterns: {
          include: {
            pattern: true
          }
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
        }
      }
    })

    return NextResponse.json({
      ...problem,
      company: problem.companies[0]?.company.name ?? null,
      companies: problem.companies.map(entry => entry.company.name),
      companyIds: problem.companies.map(entry => entry.company.id),
      tags: problem.tags.map(t => t.tag),
      patterns: problem.patterns.map(p => ({
        id: p.pattern.id,
        name: p.pattern.name,
        category: p.pattern.category
      }))
    })
  } catch (error) {
    console.error('Error updating problem:', error)
    return NextResponse.json(
      { error: 'Failed to update problem' },
      { status: 500 }
    )
  }
}

// DELETE /api/problems/[id] - Delete a problem
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const problemId = parseInt(id)

    if (isNaN(problemId)) {
      return NextResponse.json(
        { error: 'Invalid problem ID' },
        { status: 400 }
      )
    }

    await prisma.problem.delete({
      where: { id: problemId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting problem:', error)
    return NextResponse.json(
      { error: 'Failed to delete problem' },
      { status: 500 }
    )
  }
}

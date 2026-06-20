import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function normalize(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

// GET /api/problems/filters - Distinct filter values for problems page
export async function GET() {
  try {
    const [patternLinks, tags, relationCompanies] = await Promise.all([
      // Patterns actually linked to problems (in-use), consistent with tags/companies below —
      // otherwise the dropdown lists patterns that match zero problems.
      prisma.problemPattern.findMany({
        distinct: ['patternId'],
        select: { pattern: { select: { name: true } } },
      }),
      prisma.problemTag.findMany({
        distinct: ['tag'],
        select: { tag: true },
        orderBy: { tag: 'asc' },
      }),
      prisma.problemCompany.findMany({
        distinct: ['companyId'],
        select: {
          companyId: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      }),
    ])

    const companyOptions = relationCompanies
      .map((entry) => {
        const name = normalize(entry.company.name)
        if (!name) return null
        return {
          id: entry.companyId,
          name,
        }
      })
      .filter((entry): entry is { id: number; name: string } => Boolean(entry))
      .sort((a, b) => a.name.localeCompare(b.name))

    const patterns = Array.from(
      new Set(patternLinks.map((p) => p.pattern?.name).filter((n): n is string => Boolean(n)))
    ).sort((a, b) => a.localeCompare(b))

    return NextResponse.json({
      patterns,
      tags: tags.map((t) => t.tag),
      companyOptions,
    })
  } catch (error) {
    console.error('Error fetching problem filters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch problem filters' },
      { status: 500 }
    )
  }
}

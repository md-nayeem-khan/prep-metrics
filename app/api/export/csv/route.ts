import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeCsv } from '@/lib/import/csv'
import { handleImport } from '@/lib/server/import-http'

// GET /api/export/csv - Export problems as CSV
export async function GET() {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        _count: { select: { submissions: true } },
        tags: true,
        patterns: {
          include: {
            pattern: true,
          },
        },
        submissions: {
          orderBy: {
            submittedAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Create CSV content
    const headers = [
      'Platform',
      'Problem ID',
      'Title',
      'Difficulty',
      'URL',
      'Tags',
      'Patterns',
      'Attempts',
      'Last Status',
      'Last Time (seconds)',
      'Created Date'
    ]

    const csvRows = [
      headers,
      ...problems.map(problem => [
        problem.platform,
        problem.problemId,
        problem.title,
        problem.difficulty,
        problem.url || '',
        JSON.stringify(problem.tags.map(t => t.tag)),
        JSON.stringify(problem.patterns.map(p => p.pattern.name)),
        problem._count.submissions,
        problem.submissions[0]?.status || '',
        problem.submissions[0]?.timeSpentSeconds || '',
        new Date(problem.createdAt).toISOString().split('T')[0]
      ])
    ]

    const csvContent = writeCsv(csvRows)

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="problems-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error) {
    console.error('Error exporting CSV:', error)
    return NextResponse.json(
      { error: 'Failed to export CSV' },
      { status: 500 }
    )
  }
}

// Compatibility alias: defaults to preview; commit requires ?action=commit,
// the preview token, and requestId. Legacy immediate writes are no longer supported.
export async function POST(request: NextRequest) {
  return handleImport(request, 'problems', request.nextUrl.searchParams.get('action') === 'commit' ? 'commit' : 'preview');
}

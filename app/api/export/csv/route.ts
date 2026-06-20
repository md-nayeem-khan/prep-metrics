// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/export/csv - Export problems as CSV
export async function GET() {
  try {
    const problems = await prisma.problem.findMany({
      include: {
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
      headers.join(','),
      ...problems.map(problem => [
        problem.platform,
        `"${problem.problemId}"`,
        `"${problem.title}"`,
        problem.difficulty,
        problem.url || '',
        `"${problem.tags.map(t => t.tag).join(';')}"`,
        `"${problem.patterns.map(p => p.pattern.name).join(';')}"`,
        problem.submissions.length,
        problem.submissions[0]?.status || '',
        problem.submissions[0]?.timeSpentSeconds || '',
        new Date(problem.createdAt).toISOString().split('T')[0]
      ].join(','))
    ]

    const csvContent = csvRows.join('\n')

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

// POST /api/export/csv - Import problems from CSV
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV must have at least a header and one data row' },
        { status: 400 }
      )
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const requiredHeaders = ['Platform', 'Problem ID', 'Title', 'Difficulty']
    
    const missingHeaders = requiredHeaders.filter(h => 
      !headers.some(header => header.toLowerCase().includes(h.toLowerCase()))
    )

    if (missingHeaders.length > 0) {
      return NextResponse.json(
        { error: `Missing required headers: ${missingHeaders.join(', ')}` },
        { status: 400 }
      )
    }

    // Get header indices
    const getHeaderIndex = (name: string) => 
      headers.findIndex(h => h.toLowerCase().includes(name.toLowerCase()))

    const platformIdx = getHeaderIndex('platform')
    const problemIdIdx = getHeaderIndex('problem id')
    const titleIdx = getHeaderIndex('title')
    const difficultyIdx = getHeaderIndex('difficulty')
    const urlIdx = getHeaderIndex('url')
    const tagsIdx = getHeaderIndex('tags')
    const patternsIdx = getHeaderIndex('patterns')

    const results = {
      imported: 0,
      skipped: 0,
      errors: [] as string[]
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
      
      try {
        const platform = values[platformIdx]?.toLowerCase()
        const problemId = values[problemIdIdx]
        const title = values[titleIdx]
        const difficulty = values[difficultyIdx]?.toLowerCase()

        if (!platform || !problemId || !title) {
          results.errors.push(`Row ${i + 1}: Missing required fields`)
          continue
        }

        // Check if problem already exists
        const existing = await prisma.problem.findUnique({
          where: {
            platform_problemId: {
              platform,
              problemId
            }
          }
        })

        if (existing) {
          results.skipped++
          continue
        }

        // Create problem
        const problemData: any = {
          platform,
          problemId,
          title,
          difficulty: ['easy', 'medium', 'hard', 'unrated'].includes(difficulty) 
            ? difficulty 
            : 'unrated',
          url: values[urlIdx] || null,
          notes: null
        }

        const problem = await prisma.problem.create({
          data: problemData
        })

        // Add tags if provided
        if (tagsIdx >= 0 && values[tagsIdx]) {
          const tagNames = values[tagsIdx].split(';').map(t => t.trim()).filter(t => t)
          for (const tagName of tagNames) {
            await prisma.problemTag.create({
              data: {
                problemId: problem.id,
                tag: tagName
              }
            })
          }
        }

        // Add patterns if provided
        if (patternsIdx >= 0 && values[patternsIdx]) {
          const patternNames = values[patternsIdx].split(';').map(p => p.trim()).filter(p => p)
          for (const patternName of patternNames) {
            // Try exact pattern label first, then fallback to top-level token before arrow/colon.
            const normalizedTopLevel = patternName
              .split('→')[0]
              .split(':')[0]
              .trim()

            const pattern = await prisma.pattern.findFirst({
              where: {
                OR: [
                  { name: { equals: patternName, mode: 'insensitive' } },
                  { name: { equals: normalizedTopLevel, mode: 'insensitive' } },
                  { name: { startsWith: `${normalizedTopLevel} →`, mode: 'insensitive' } },
                  { name: { startsWith: `${normalizedTopLevel}:`, mode: 'insensitive' } }
                ]
              }
            })

            if (pattern) {
              await prisma.problemPattern.create({
                data: {
                  problemId: problem.id,
                  patternId: pattern.id
                }
              })
            }
          }
        }

        results.imported++

      } catch (error) {
        results.errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error('Error importing CSV:', error)
    return NextResponse.json(
      { error: 'Failed to import CSV' },
      { status: 500 }
    )
  }
}

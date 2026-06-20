// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { REVISION_INTERVALS } from '@/lib/spaced-repetition'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const includeCompleted = searchParams.get('includeCompleted') === 'true'
    
    // Use local day boundaries so "today" and "this week" match user expectations.
    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    const startOfTomorrow = new Date(startOfToday)
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

    // Upcoming window: tomorrow through the next 7 days.
    const endOfUpcomingWindow = new Date(startOfToday)
    endOfUpcomingWindow.setDate(endOfUpcomingWindow.getDate() + 8)
    
    // Get all revisions that are due today or overdue
    const dueRevisions = await prisma.revision.findMany({
      where: {
        nextReviewDate: {
          lt: startOfTomorrow
        },
        ...(includeCompleted ? {} : { completed: false })
      },
      include: {
        submission: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                platform: true,
                source: true,
                url: true,
                patterns: {
                  include: {
                    pattern: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: [
        { nextReviewDate: 'asc' },
        { intervalLevel: 'asc' }
      ]
    })

    // Get upcoming revisions for the next 7 days (excluding today)
    const upcomingRevisions = await prisma.revision.findMany({
      where: {
        nextReviewDate: {
          gte: startOfTomorrow,
          lt: endOfUpcomingWindow
        },
        completed: false
      },
      include: {
        submission: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                platform: true,
                source: true,
                url: true,
                patterns: {
                  include: {
                    pattern: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { nextReviewDate: 'asc' }
    })

    // Get revision statistics
    const stats = await prisma.revision.groupBy({
      by: ['intervalLevel'],
      _count: {
        id: true
      },
      where: {
        completed: false
      }
    })

    const totalRevisions = await prisma.revision.count()
    const completedRevisions = await prisma.revision.count({
      where: { completed: true }
    })
    
    const overdueCount = dueRevisions.filter(revision => {
      const reviewDate = new Date(revision.nextReviewDate)
      return reviewDate < startOfToday
    }).length

    return NextResponse.json({
      dueToday: dueRevisions,
      upcoming: upcomingRevisions,
      statistics: {
        total: totalRevisions,
        completed: completedRevisions,
        pending: totalRevisions - completedRevisions,
        overdue: overdueCount,
        dueToday: dueRevisions.length,
        intervalDistribution: stats.reduce((acc, stat) => {
          acc[`level_${stat.intervalLevel}`] = stat._count.id
          return acc
        }, {} as Record<string, number>)
      }
    })
  } catch (error) {
    console.error('Error fetching revisions:', error)
    return NextResponse.json({ error: 'Failed to fetch revisions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionId, intervalLevel, nextReviewDate } = body

    // Validate submission exists
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        problem: {
          select: { title: true }
        }
      }
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Calculate next review date if not provided
    let calculatedReviewDate = nextReviewDate
    if (!calculatedReviewDate) {
      const level = intervalLevel ?? 0
      const daysToAdd = REVISION_INTERVALS[level] ?? 1
      
      const reviewDate = new Date()
      reviewDate.setHours(0, 0, 0, 0)
      reviewDate.setDate(reviewDate.getDate() + daysToAdd)
      calculatedReviewDate = reviewDate
    }

    // Create revision entry
    const revision = await prisma.revision.create({
      data: {
        submissionId,
        intervalLevel: intervalLevel ?? 0,
        nextReviewDate: new Date(calculatedReviewDate),
        completed: false,
        createdAt: new Date()
      },
      include: {
        submission: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      revision,
      message: `Revision scheduled for ${submission.problem.title}` 
    })
  } catch (error) {
    console.error('Error creating revision:', error)
    return NextResponse.json({ error: 'Failed to create revision' }, { status: 500 })
  }
}

// Helper function to automatically schedule revision after solving a problem
export async function scheduleRevision(submissionId: number, wasSuccessful: boolean = true) {
  try {
    // Only schedule revisions for successful submissions
    if (!wasSuccessful) return null

    // Check if revision already exists for this submission
    const existingRevision = await prisma.revision.findFirst({
      where: { submissionId }
    })

    if (existingRevision) {
      return existingRevision
    }

    // Calculate first revision date (1 day after solving)
    const reviewDate = new Date()
    reviewDate.setHours(0, 0, 0, 0)
    reviewDate.setDate(reviewDate.getDate() + 1)

    const revision = await prisma.revision.create({
      data: {
        submissionId,
        intervalLevel: 0,
        nextReviewDate: reviewDate,
        completed: false
      }
    })

    return revision
  } catch (error) {
    console.error('Error auto-scheduling revision:', error)
    return null
  }
}

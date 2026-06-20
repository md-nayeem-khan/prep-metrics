// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    // Get today's revisions
    const todaysRevisions = await prisma.revision.findMany({
      where: {
        nextReviewDate: {
          gte: today,
          lt: tomorrow
        },
        completed: false
      },
      include: {
        submission: {
          include: {
            problem: {
              include: {
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
    
    // Get overdue revisions
    const overdueRevisions = await prisma.revision.findMany({
      where: {
        nextReviewDate: {
          lt: today
        },
        completed: false
      },
      include: {
        submission: {
          include: {
            problem: {
              include: {
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

    // Transform to expected format
    const transformRevision = (rev: any) => ({
      id: rev.id,
      scheduledDate: rev.nextReviewDate,
      completedDate: rev.completedAt,
      status: rev.completed ? 'completed' : 'pending',
      solvedWithoutHint: rev.wasSuccessful,
      timeSpentSeconds: rev.timeSpentSeconds,
      problem: {
        id: rev.submission.problem.id,
        title: rev.submission.problem.title,
        platform: rev.submission.problem.platform,
        difficulty: rev.submission.problem.difficulty,
        patterns: rev.submission.problem.patterns
      }
    })

    return NextResponse.json({
      today: todaysRevisions.map(transformRevision),
      overdue: overdueRevisions.map(transformRevision),
      totalPending: todaysRevisions.length + overdueRevisions.length
    })

  } catch (error) {
    console.error('Error fetching today\'s revisions:', error)
    return NextResponse.json({ error: 'Failed to fetch revisions' }, { status: 500 })
  }
}


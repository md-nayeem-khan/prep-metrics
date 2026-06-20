// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateDailyProgressSnapshot } from '@/lib/analytics/daily-progress-metrics'
import { REVISION_INTERVALS } from '@/lib/spaced-repetition'

const DAY_IN_MS = 24 * 60 * 60 * 1000

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function addUtcDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_IN_MS)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const problemId = searchParams.get('problemId')
    const attemptType = searchParams.get('attemptType')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    
    const where: any = {}
    
    if (problemId) where.problemId = parseInt(problemId)
    if (attemptType) where.attemptType = attemptType
    if (status) where.status = status
    
    const submissions = await prisma.submission.findMany({
      where,
      include: { 
        problem: { 
          include: {
            companies: {
              include: {
                company: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          }
        } 
      },
      orderBy: { submittedAt: 'desc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    })
    
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      problemId, 
      timeSpentSeconds, 
      status, 
      submittedAt, 
      notes,
      // NEW FIELDS
      attemptType = 'First',
      wasHintUsed = false,
      mistakeNote,
      approachNote
    } = body
    
    // Validation
    if (!problemId || !timeSpentSeconds || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: problemId, timeSpentSeconds, status' },
        { status: 400 }
      )
    }

    // Validate attemptType
    if (!['First', 'Revision'].includes(attemptType)) {
      return NextResponse.json(
        { error: 'attemptType must be "First" or "Revision"' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['solved', 'failed', 'partial', 'abandoned']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    // Check if problem exists
    const problem = await prisma.problem.findUnique({
      where: { id: problemId }
    })

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      )
    }
    
    const lastSubmission = await prisma.submission.findFirst({
      where: { problemId },
      orderBy: { attemptNumber: 'desc' },
    })
    
    const submission = await prisma.submission.create({
      data: {
        problemId,
        attemptNumber: (lastSubmission?.attemptNumber || 0) + 1,
        timeSpentSeconds,
        status,
        submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
        notes: notes || null,
        // NEW FIELDS
        attemptType,
        wasHintUsed,
        mistakeNote: mistakeNote || null,
        approachNote: approachNote || null,
      },
      include: {
        problem: {
          include: {
            companies: {
              include: {
                company: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          }
        }
      }
    })

    // Update daily progress automatically
    try {
      const normalizedDate = startOfUtcDay(new Date(submission.submittedAt))
      const endOfDayExclusive = addUtcDays(normalizedDate, 1)

      // Get all submissions for today to calculate patterns worked
      const todaySubmissions = await prisma.submission.findMany({
        where: {
          submittedAt: {
            gte: normalizedDate,
            lt: endOfDayExclusive
          }
        },
        include: {
          problem: {
            include: {
              patterns: { include: { pattern: true } }
            }
          }
        }
      })

      const dailySnapshot = calculateDailyProgressSnapshot(todaySubmissions)

      // Update daily progress
      const existingDailyProgress = await prisma.dailyProgress.findFirst({
        where: {
          date: {
            gte: normalizedDate,
            lt: endOfDayExclusive,
          },
        },
      })

      if (existingDailyProgress) {
        await prisma.dailyProgress.update({
          where: { id: existingDailyProgress.id },
          data: {
            problemsSolved: dailySnapshot.problemsSolved,
            totalTimeSpent: dailySnapshot.totalTimeSpent,
            patternsWorked: dailySnapshot.patternsWorked,
          },
        })
      } else {
        await prisma.dailyProgress.create({
          data: {
            date: normalizedDate,
            problemsSolved: dailySnapshot.problemsSolved,
            totalTimeSpent: dailySnapshot.totalTimeSpent,
            patternsWorked: dailySnapshot.patternsWorked,
            mockInterviews: 0,
          },
        })
      }
    } catch (progressError) {
      console.error('Error updating daily progress:', progressError)
      // Don't fail the submission if daily progress update fails
    }

    // Maintain spaced repetition schedule.
    try {
      const isRevisionAttempt = attemptType === 'Revision'
      const wasSuccessful = status === 'solved'

      if (isRevisionAttempt) {
        const activeRevision = await prisma.revision.findFirst({
          where: {
            completed: false,
            submission: {
              problemId
            }
          },
          orderBy: [
            { nextReviewDate: 'asc' },
            { intervalLevel: 'asc' }
          ]
        })

        let baseLevel = 0
        let previousRevisionId: number | null = null

        if (activeRevision) {
          baseLevel = activeRevision.intervalLevel
          previousRevisionId = activeRevision.id

          await prisma.revision.update({
            where: { id: activeRevision.id },
            data: {
              completed: true,
              completedAt: submission.submittedAt,
              wasSuccessful,
              timeSpentSeconds,
              solvedWithoutHint: !wasHintUsed,
              notes: notes || null,
            }
          })
        } else {
          const latestRevision = await prisma.revision.findFirst({
            where: {
              submission: {
                problemId
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          })

          if (latestRevision) {
            baseLevel = latestRevision.intervalLevel
            previousRevisionId = latestRevision.id
          }
        }

        const nextLevel = wasSuccessful
          ? Math.min(baseLevel + 1, REVISION_INTERVALS.length - 1)
          : baseLevel

        const nextReviewDate = new Date(submission.submittedAt)
        nextReviewDate.setDate(nextReviewDate.getDate() + REVISION_INTERVALS[nextLevel])
        nextReviewDate.setHours(0, 0, 0, 0)

        await prisma.revision.create({
          data: {
            submissionId: submission.id,
            intervalLevel: nextLevel,
            nextReviewDate,
            completed: false,
            ...(previousRevisionId ? { previousRevisionId } : {}),
          }
        })
      } else if (wasSuccessful) {
        const existingPendingRevision = await prisma.revision.findFirst({
          where: {
            completed: false,
            submission: {
              problemId
            }
          }
        })

        if (!existingPendingRevision) {
          const reviewDate = new Date(submission.submittedAt)
          reviewDate.setDate(reviewDate.getDate() + REVISION_INTERVALS[0])
          reviewDate.setHours(0, 0, 0, 0)

          await prisma.revision.create({
            data: {
              submissionId: submission.id,
              intervalLevel: 0,
              nextReviewDate: reviewDate,
              completed: false
            }
          })
        }
      }
    } catch (revisionError) {
      console.error('Error updating revision schedule:', revisionError)
      // Don't fail the submission if revision updates fail
    }
    
    return NextResponse.json({ submission }, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}


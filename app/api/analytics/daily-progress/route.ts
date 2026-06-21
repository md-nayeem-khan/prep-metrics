// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { calculateDailyProgressSnapshot } from '@/lib/analytics/daily-progress-metrics'
import {
  dayKey,
  startOfDayInstant,
  endOfDayExclusiveInstant,
  addDays,
  getDateWindow,
  calculateCurrentStreakFromSolvedDays,
  calculateLongestStreakFromSolvedDays,
} from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

async function getPrismaClient() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

async function findDailyProgressForDate(prisma: any, date: Date, tz: string) {
  return prisma.dailyProgress.findFirst({
    where: {
      date: {
        gte: startOfDayInstant(date, tz),
        lt: endOfDayExclusiveInstant(date, tz),
      },
    },
  })
}

// Helper function to calculate streaks, bucketed by the user's timezone.
function calculateStreaks(dailyProgress: Array<{ date: Date; problemsSolved: number }>, tz: string) {
  if (dailyProgress.length === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveToday: false }
  }

  const solvedDayKeys = new Set(
    dailyProgress
      .filter(day => day.problemsSolved > 0)
      .map(day => dayKey(new Date(day.date), tz))
  )

  if (solvedDayKeys.size === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveToday: false }
  }

  const now = new Date()
  const todayKey = dayKey(now, tz)
  const isActiveToday = solvedDayKeys.has(todayKey)
  const currentStreak = calculateCurrentStreakFromSolvedDays(solvedDayKeys, tz, now)
  const longestStreak = calculateLongestStreakFromSolvedDays(solvedDayKeys)

  return { currentStreak, longestStreak, isActiveToday }
}

// GET /api/analytics/daily-progress - Get daily progress data with streaks
export async function GET(request: NextRequest) {
  try {
    const prisma = await getPrismaClient()
    const tz = await getUserTimezone()
    const searchParams = request.nextUrl.searchParams
    const requestedDays = parseInt(searchParams.get('days') || '30', 10)
    const days = Math.min(Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 30, 365)
    const includeStreak = searchParams.get('streak') !== 'false'
    const format = searchParams.get('format') || 'detailed' // 'detailed' | 'calendar'

    // Calculate date range
    const { startDate, endDate, endExclusive } = getDateWindow(days, tz)

    // Get daily progress data
    const dailyProgress = await prisma.dailyProgress.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endExclusive
        }
      },
      orderBy: { date: 'asc' }
    })

    // Distinct patterns worked across the whole window. The cached daily rows only store a
    // per-day count, so a window-wide distinct total must be derived from submissions.
    const windowSubmissions = await prisma.submission.findMany({
      where: {
        submittedAt: {
          gte: startDate,
          lt: endExclusive
        }
      },
      select: {
        problem: {
          select: {
            patterns: { select: { pattern: { select: { name: true } } } }
          }
        }
      }
    })
    const distinctPatterns = new Set<string>()
    for (const sub of windowSubmissions) {
      for (const link of sub.problem?.patterns ?? []) {
        const name = link.pattern?.name
        if (name) distinctPatterns.add(name)
      }
    }

    // Create a map of existing data
    const progressMap = new Map(
      dailyProgress.map(day => [
        dayKey(new Date(day.date), tz),
        day
      ])
    )

    // Fill in missing days with zero data
    const completeData = []
    let currentDate = new Date(startDate)

    while (currentDate < endExclusive) {
      const dateKey = dayKey(currentDate, tz)
      const existingData = progressMap.get(dateKey)

      if (existingData) {
        completeData.push({
          date: startOfDayInstant(new Date(existingData.date), tz),
          problemsSolved: existingData.problemsSolved,
          totalTimeSpent: existingData.totalTimeSpent,
          patternsWorked: existingData.patternsWorked,
          mockInterviews: existingData.mockInterviews
        })
      } else {
        completeData.push({
          date: startOfDayInstant(currentDate, tz),
          problemsSolved: 0,
          totalTimeSpent: 0,
          patternsWorked: 0,
          mockInterviews: 0
        })
      }

      currentDate = addDays(currentDate, 1, tz)
    }

    // Calculate streaks if requested
    let streakData = null
    if (includeStreak) {
      // Get all-time data for accurate streak calculation
      const allTimeProgress = await prisma.dailyProgress.findMany({
        where: {
          problemsSolved: { gt: 0 }
        },
        orderBy: { date: 'asc' }
      })

      streakData = calculateStreaks(allTimeProgress, tz)
    }

    // Calculate summary statistics
    const totalProblems = completeData.reduce((sum, day) => sum + day.problemsSolved, 0)
    const totalTime = completeData.reduce((sum, day) => sum + day.totalTimeSpent, 0)
    const activeDays = completeData.filter(day => day.problemsSolved > 0).length
    const avgProblemsPerDay = activeDays > 0 ? totalProblems / activeDays : 0
    const avgTimePerDay = activeDays > 0 ? totalTime / activeDays : 0

    // Recent trend analysis (last 7 days vs previous 7 days)
    const recentDays = completeData.slice(-7)
    const previousDays = completeData.slice(-14, -7)

    const recentProblems = recentDays.reduce((sum, day) => sum + day.problemsSolved, 0)
    const previousProblems = previousDays.reduce((sum, day) => sum + day.problemsSolved, 0)

    const trendPercentage = previousProblems > 0
      ? ((recentProblems - previousProblems) / previousProblems) * 100
      : recentProblems > 0 ? 100 : 0

    // Format output based on requested format
    if (format === 'calendar') {
      // Calendar format for heatmap visualization
      const calendarData = completeData.map(day => ({
        date: dayKey(day.date, tz),
        count: day.problemsSolved,
        level: day.problemsSolved === 0 ? 0 :
               day.problemsSolved <= 2 ? 1 :
               day.problemsSolved <= 4 ? 2 :
               day.problemsSolved <= 6 ? 3 : 4
      }))

      return NextResponse.json({
        calendar: calendarData,
        ...(streakData && { streak: streakData }),
        summary: {
          totalDays: completeData.length,
          activeDays,
          totalProblems,
          avgProblemsPerDay: Math.round(avgProblemsPerDay * 10) / 10,
          trend: {
            percentage: Math.round(trendPercentage * 10) / 10,
            direction: trendPercentage > 5 ? 'up' : trendPercentage < -5 ? 'down' : 'stable'
          }
        }
      })
    }

    // Detailed format
    const response = {
      data: completeData.map(day => ({
        date: dayKey(day.date, tz),
        problemsSolved: day.problemsSolved,
        totalTimeMinutes: Math.round(day.totalTimeSpent / 60),
        patternsWorked: day.patternsWorked,
        mockInterviews: day.mockInterviews,
        avgTimePerProblem: day.problemsSolved > 0 ? Math.round(day.totalTimeSpent / day.problemsSolved / 60) : 0
      })),
      ...(streakData && { streak: streakData }),
      summary: {
        dateRange: {
          start: dayKey(startDate, tz),
          end: dayKey(endDate, tz),
          days: completeData.length
        },
        totals: {
          problems: totalProblems,
          timeMinutes: Math.round(totalTime / 60),
          patterns: distinctPatterns.size,
          mockInterviews: completeData.reduce((sum, day) => sum + day.mockInterviews, 0),
          activeDays
        },
        averages: {
          problemsPerDay: Math.round(avgProblemsPerDay * 10) / 10,
          timePerDay: Math.round(avgTimePerDay / 60),
          problemsPerActiveDay: Math.round((totalProblems / Math.max(activeDays, 1)) * 10) / 10
        },
        trend: {
          recent7Days: recentProblems,
          previous7Days: previousProblems,
          changePercentage: Math.round(trendPercentage * 10) / 10,
          direction: trendPercentage > 5 ? 'improving' : trendPercentage < -5 ? 'declining' : 'stable'
        }
      },
      insights: [] as string[]
    }

    // Generate insights and recommendations
    const insights = []

    if (streakData && streakData.currentStreak >= 7) {
      insights.push(`🔥 Amazing ${streakData.currentStreak}-day streak! Keep the momentum going!`)
    } else if (streakData && streakData.currentStreak > 0) {
      insights.push(`Good ${streakData.currentStreak}-day streak. Aim for 7+ days for habit formation.`)
    } else if (streakData && !streakData.isActiveToday) {
      insights.push("No activity today. Solve at least 1 problem to start/continue your streak!")
    }

    if (avgProblemsPerDay < 1) {
      insights.push("Try to solve at least 1 problem per day for consistent progress.")
    } else if (avgProblemsPerDay >= 3) {
      insights.push("Excellent daily practice! You're solving 3+ problems per day on average.")
    }

    if (trendPercentage > 20) {
      insights.push("📈 Great improvement trend! You're solving more problems recently.")
    } else if (trendPercentage < -20) {
      insights.push("📉 Practice frequency has decreased recently. Try to get back to regular solving.")
    }

    if (activeDays / completeData.length < 0.3) {
      insights.push("Increase consistency - aim for at least 3-4 active days per week.")
    }

    response.insights = insights

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching daily progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily progress' },
      { status: 500 }
    )
  }
}

// POST /api/analytics/daily-progress - Update daily progress (usually called by other APIs)
export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrismaClient()
    const tz = await getUserTimezone()
    const body = await request.json()
    const {
      date = new Date(),
      problemsSolved = 0,
      timeSpentSeconds = 0,
      patternsWorked = 0,
      mockInterviews = 0
    } = body

    const isNonNegativeInt = (v: unknown) => Number.isInteger(v) && (v as number) >= 0
    const validationErrors: string[] = []
    if (!isNonNegativeInt(problemsSolved)) validationErrors.push('problemsSolved must be a non-negative integer')
    if (!isNonNegativeInt(timeSpentSeconds)) validationErrors.push('timeSpentSeconds must be a non-negative integer')
    if (!isNonNegativeInt(patternsWorked)) validationErrors.push('patternsWorked must be a non-negative integer')
    if (!isNonNegativeInt(mockInterviews)) validationErrors.push('mockInterviews must be a non-negative integer')
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) validationErrors.push('date must be a valid date')
    if (validationErrors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: validationErrors }, { status: 400 })
    }

    const normalizedDate = startOfDayInstant(new Date(date), tz)
    const existingProgress = await findDailyProgressForDate(prisma, normalizedDate, tz)

    // Update or create daily progress record
    const updatedProgress = existingProgress
      ? await prisma.dailyProgress.update({
          where: { id: existingProgress.id },
          data: {
            problemsSolved: { increment: problemsSolved },
            totalTimeSpent: { increment: timeSpentSeconds },
            patternsWorked: Math.max(patternsWorked, existingProgress.patternsWorked),
            mockInterviews: { increment: mockInterviews },
          },
        })
      : await prisma.dailyProgress.create({
          data: {
            date: normalizedDate,
            problemsSolved,
            totalTimeSpent: timeSpentSeconds,
            patternsWorked,
            mockInterviews,
          },
        })

    return NextResponse.json({
      success: true,
      progress: updatedProgress
    }, { status: 201 })
  } catch (error) {
    console.error('Error updating daily progress:', error)
    return NextResponse.json(
      { error: 'Failed to update daily progress' },
      { status: 500 }
    )
  }
}

// PUT /api/analytics/daily-progress - Recalculate daily progress from submissions
export async function PUT(request: NextRequest) {
  try {
    const prisma = await getPrismaClient()
    const tz = await getUserTimezone()
    const searchParams = request.nextUrl.searchParams
    const requestedDays = parseInt(searchParams.get('days') || '30', 10)
    const days = Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 30

    const { startDate, endDate, endExclusive } = getDateWindow(days, tz)

    // Get all submissions in the date range
    const submissions = await prisma.submission.findMany({
      where: {
        submittedAt: {
          gte: startDate,
          lt: endExclusive
        }
      },
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
      },
      orderBy: { submittedAt: 'asc' }
    })

    // Group submissions by date
    const submissionsByDate = new Map<string, any[]>()

    submissions.forEach(submission => {
      const dateKey = dayKey(new Date(submission.submittedAt), tz)
      if (!submissionsByDate.has(dateKey)) {
        submissionsByDate.set(dateKey, [])
      }
      submissionsByDate.get(dateKey)!.push(submission)
    })

    // Recalculate daily progress for each day
    const updatedDays = []

    for (const [dateKey, daySubmissions] of submissionsByDate.entries()) {
      const dailySnapshot = calculateDailyProgressSnapshot(daySubmissions)

      // Update database
      const normalizedDate = startOfDayInstant(dateKey, tz)
      const dayEnd = endOfDayExclusiveInstant(dateKey, tz)
      const mockInterviews = await prisma.mockInterview.count({
        where: { date: { gte: normalizedDate, lt: dayEnd } },
      })
      const existingProgress = await findDailyProgressForDate(prisma, normalizedDate, tz)

      const updatedProgress = existingProgress
        ? await prisma.dailyProgress.update({
            where: { id: existingProgress.id },
            data: {
              problemsSolved: dailySnapshot.problemsSolved,
              totalTimeSpent: dailySnapshot.totalTimeSpent,
              patternsWorked: dailySnapshot.patternsWorked,
              mockInterviews,
            },
          })
        : await prisma.dailyProgress.create({
            data: {
              date: normalizedDate,
              problemsSolved: dailySnapshot.problemsSolved,
              totalTimeSpent: dailySnapshot.totalTimeSpent,
              patternsWorked: dailySnapshot.patternsWorked,
              mockInterviews,
            },
          })

      updatedDays.push(updatedProgress)
    }

    return NextResponse.json({
      success: true,
      message: `Recalculated progress for ${updatedDays.length} days`,
      updatedDays: updatedDays.length,
      dateRange: {
        start: dayKey(startDate, tz),
        end: dayKey(endDate, tz)
      }
    })
  } catch (error) {
    console.error('Error recalculating daily progress:', error)
    return NextResponse.json(
      { error: 'Failed to recalculate daily progress' },
      { status: 500 }
    )
  }
}

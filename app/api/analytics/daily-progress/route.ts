// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { calculateDailyProgressSnapshot } from '@/lib/analytics/daily-progress-metrics'

const DAY_IN_MS = 24 * 60 * 60 * 1000

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

async function getPrismaClient() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function addUtcDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_IN_MS)
}

function toUtcDateKey(date: Date): string {
  return startOfUtcDay(date).toISOString().slice(0, 10)
}

function getUtcDateWindow(days: number, now = new Date()) {
  const safeDays = Number.isFinite(days) && days > 0 ? Math.floor(days) : 30
  const endDate = startOfUtcDay(now)
  const endExclusive = addUtcDays(endDate, 1)
  const startDate = addUtcDays(endDate, -safeDays + 1)

  return { startDate, endDate, endExclusive }
}

function parseUtcDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

function getDayRange(date: Date) {
  const dayStart = startOfUtcDay(date)
  const dayEndExclusive = addUtcDays(dayStart, 1)

  return { dayStart, dayEndExclusive }
}

function calculateCurrentUtcStreakFromSolvedDays(solvedDayKeys: Set<string>, now = new Date()) {
  let streak = 0
  let cursor = startOfUtcDay(now)

  while (true) {
    const dayKey = toUtcDateKey(cursor)
    if (!solvedDayKeys.has(dayKey)) {
      break
    }

    streak += 1
    cursor = addUtcDays(cursor, -1)
  }

  return streak
}

function calculateLongestUtcStreakFromSolvedDays(solvedDayKeys: Set<string>) {
  const sortedKeys = Array.from(solvedDayKeys).sort()
  if (sortedKeys.length === 0) return 0

  let longest = 1
  let running = 1

  for (let i = 1; i < sortedKeys.length; i += 1) {
    const previous = parseUtcDateKey(sortedKeys[i - 1])
    const current = parseUtcDateKey(sortedKeys[i])
    const deltaDays = (current.getTime() - previous.getTime()) / DAY_IN_MS

    if (deltaDays === 1) {
      running += 1
      if (running > longest) longest = running
    } else {
      running = 1
    }
  }

  return longest
}

async function findDailyProgressForDate(prisma: any, date: Date) {
  const { dayStart, dayEndExclusive } = getDayRange(date)

  return prisma.dailyProgress.findFirst({
    where: {
      date: {
        gte: dayStart,
        lt: dayEndExclusive,
      },
    },
  })
}

// Helper function to calculate streaks
function calculateStreaks(dailyProgress: Array<{ date: Date; problemsSolved: number }>) {
  if (dailyProgress.length === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveToday: false }
  }

  const solvedDayKeys = new Set(
    dailyProgress
      .filter(day => day.problemsSolved > 0)
      .map(day => toUtcDateKey(new Date(day.date)))
  )

  if (solvedDayKeys.size === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveToday: false }
  }

  const now = new Date()
  const todayKey = toUtcDateKey(now)
  const isActiveToday = solvedDayKeys.has(todayKey)
  const currentStreak = calculateCurrentUtcStreakFromSolvedDays(solvedDayKeys, now)
  const longestStreak = calculateLongestUtcStreakFromSolvedDays(solvedDayKeys)

  return { currentStreak, longestStreak, isActiveToday }
}

// GET /api/analytics/daily-progress - Get daily progress data with streaks
export async function GET(request: NextRequest) {
  try {
    const prisma = await getPrismaClient()
    const searchParams = request.nextUrl.searchParams
    const requestedDays = parseInt(searchParams.get('days') || '30', 10)
    const days = Math.min(Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 30, 365)
    const includeStreak = searchParams.get('streak') !== 'false'
    const format = searchParams.get('format') || 'detailed' // 'detailed' | 'calendar'

    // Calculate date range
    const { startDate, endDate, endExclusive } = getUtcDateWindow(days)

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
        toUtcDateKey(new Date(day.date)),
        day
      ])
    )

    // Fill in missing days with zero data
    const completeData = []
    let currentDate = new Date(startDate)
    
    while (currentDate < endExclusive) {
      const dateKey = toUtcDateKey(currentDate)
      const existingData = progressMap.get(dateKey)
      
      if (existingData) {
        completeData.push({
          date: startOfUtcDay(new Date(existingData.date)),
          problemsSolved: existingData.problemsSolved,
          totalTimeSpent: existingData.totalTimeSpent,
          patternsWorked: existingData.patternsWorked,
          mockInterviews: existingData.mockInterviews
        })
      } else {
        completeData.push({
          date: startOfUtcDay(currentDate),
          problemsSolved: 0,
          totalTimeSpent: 0,
          patternsWorked: 0,
          mockInterviews: 0
        })
      }
      
      currentDate = addUtcDays(currentDate, 1)
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

      streakData = calculateStreaks(allTimeProgress)
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
        date: toUtcDateKey(day.date),
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
        date: toUtcDateKey(day.date),
        problemsSolved: day.problemsSolved,
        totalTimeMinutes: Math.round(day.totalTimeSpent / 60),
        patternsWorked: day.patternsWorked,
        mockInterviews: day.mockInterviews,
        avgTimePerProblem: day.problemsSolved > 0 ? Math.round(day.totalTimeSpent / day.problemsSolved / 60) : 0
      })),
      ...(streakData && { streak: streakData }),
      summary: {
        dateRange: {
          start: toUtcDateKey(startDate),
          end: toUtcDateKey(endDate),
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

    const normalizedDate = startOfUtcDay(new Date(date))
    const existingProgress = await findDailyProgressForDate(prisma, normalizedDate)

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
    const searchParams = request.nextUrl.searchParams
    const requestedDays = parseInt(searchParams.get('days') || '30', 10)
    const days = Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 30

    const { startDate, endDate, endExclusive } = getUtcDateWindow(days)

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
      const dateKey = toUtcDateKey(new Date(submission.submittedAt))
      if (!submissionsByDate.has(dateKey)) {
        submissionsByDate.set(dateKey, [])
      }
      submissionsByDate.get(dateKey)!.push(submission)
    })

    // Recalculate daily progress for each day
    const updatedDays = []
    
    for (const [dateKey, daySubmissions] of submissionsByDate.entries()) {
      const date = parseUtcDateKey(dateKey)
      
      const dailySnapshot = calculateDailyProgressSnapshot(daySubmissions)

      // Update database
      const normalizedDate = startOfUtcDay(date)
      const dayEnd = addUtcDays(normalizedDate, 1)
      const mockInterviews = await prisma.mockInterview.count({
        where: { date: { gte: normalizedDate, lt: dayEnd } },
      })
      const existingProgress = await findDailyProgressForDate(prisma, normalizedDate)

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
        start: toUtcDateKey(startDate),
        end: toUtcDateKey(endDate)
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
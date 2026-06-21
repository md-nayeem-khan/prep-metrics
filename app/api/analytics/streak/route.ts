// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  getDateWindow,
  buildCalendarData,
  calculateCurrentStreakFromSolvedDays,
  calculateLongestStreakFromSolvedDays,
  toDateKey,
} from '@/lib/analytics/streak-metrics'
import { getUserTimezone } from '@/lib/server/user-timezone'
import { getLatestSubmissionsPerProblem } from '@/types'

const MAX_DAYS = 365

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const requestedDays = parseInt(searchParams.get('days') || '30', 10)
    const days = Math.min(
      Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 30,
      MAX_DAYS
    )

    const tz = await getUserTimezone()

    // Use DailyProgress as the canonical source for streak calculation.
    // This avoids loading all solved submissions into memory — the DailyProgress
    // table already aggregates per-day activity and is orders of magnitude smaller.
    const [allProgressDays, weeklyStats] = await Promise.all([
      prisma.dailyProgress.findMany({
        where: { problemsSolved: { gt: 0 } },
        select: { date: true },
        orderBy: { date: 'asc' },
      }),
      getWeeklyStats(tz),
    ])

    const solvedDayKeys = new Set(
      allProgressDays.map((d) => toDateKey(new Date(d.date), tz))
    )

    const currentStreak = calculateCurrentStreakFromSolvedDays(solvedDayKeys, tz)
    const longestStreak = calculateLongestStreakFromSolvedDays(solvedDayKeys)

    // Build calendar data from DailyProgress for the requested window.
    const { startDate, endExclusive } = getDateWindow(days, tz)
    const windowProgress = await prisma.dailyProgress.findMany({
      where: { date: { gte: startDate, lt: endExclusive } },
      select: { date: true, problemsSolved: true, totalTimeSpent: true },
    })
    const dayMap = new Map(
      windowProgress.map((d) => [
        toDateKey(new Date(d.date), tz),
        { count: d.problemsSolved, totalTime: d.totalTimeSpent },
      ])
    )
    const calendarData = buildCalendarData(days, new Date(), dayMap, tz)

    return NextResponse.json({
      currentStreak,
      longestStreak,
      calendarData,
      calendar: calendarData,
      weeklyStats,
      totalActiveDays: calendarData.filter((d) => d.count > 0).length,
    })
  } catch (error) {
    console.error('Error fetching streak data:', error)
    return NextResponse.json({ error: 'Failed to fetch streak data' }, { status: 500 })
  }
}

async function getWeeklyStats(tz: string) {
  const { startDate, endExclusive } = getDateWindow(7, tz)

  const weeklySubmissions = await prisma.submission.findMany({
    where: {
      submittedAt: { gte: startDate, lt: endExclusive },
    },
    include: {
      problem: {
        include: {
          patterns: { include: { pattern: true } },
        },
      },
    },
  })

  const latestWeeklySubmissions = getLatestSubmissionsPerProblem(weeklySubmissions)
  const solvedLatestSubmissions = latestWeeklySubmissions.filter((s) => s.status === 'solved')

  const solvedCount = solvedLatestSubmissions.length
  const totalTimeSpent = latestWeeklySubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0)
  const uniquePatterns = new Set(
    latestWeeklySubmissions.flatMap((s) => s.problem.patterns.map((p) => p.pattern.name))
  )
  const solvedTimeSpent = solvedLatestSubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0)

  return {
    problemsSolved: solvedCount,
    totalTimeSpent,
    patternsWorked: uniquePatterns.size,
    avgTimePerProblem: solvedCount > 0 ? Math.round(solvedTimeSpent / solvedCount) : 0,
  }
}

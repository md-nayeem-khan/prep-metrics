// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  dayKey,
  addDayKey,
  getDateWindow,
  calculateCurrentStreakFromSolvedDays,
  calculateLongestStreakFromSolvedDays,
} from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/analytics/consistency - Get consistency metrics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30')

    const tz = await getUserTimezone()
    const { startDate, startKey, endKey } = getDateWindow(days, tz)

    // Get all submissions in the date range
    const submissions = await prisma.submission.findMany({
      where: {
        submittedAt: {
          gte: startDate
        }
      },
      orderBy: { submittedAt: 'asc' },
      select: {
        id: true,
        submittedAt: true,
        status: true,
        timeSpentSeconds: true
      }
    })

    // Group by the submission's local (user-timezone) day.
    const dailyData: Record<string, { count: number; totalTime: number }> = {}

    submissions.forEach(sub => {
      const key = dayKey(new Date(sub.submittedAt), tz)
      if (!dailyData[key]) {
        dailyData[key] = { count: 0, totalTime: 0 }
      }
      dailyData[key].count++
      dailyData[key].totalTime += sub.timeSpentSeconds
    })

    // Streaks computed on user-timezone day keys (consistent with /api/analytics/daily-progress).
    const activeKeys = new Set(Object.keys(dailyData))
    const currentStreak = calculateCurrentStreakFromSolvedDays(activeKeys, tz)
    const longestStreak = calculateLongestStreakFromSolvedDays(activeKeys)

    // Calculate consistency percentage
    const activeDays = activeKeys.size
    const consistencyPercentage = Math.round((activeDays / days) * 100)

    // Calculate average daily problems
    const totalProblems = submissions.length
    const avgDailyProblems = activeDays > 0 ? (totalProblems / activeDays).toFixed(1) : 0

    // Format daily data for chart (one entry per local day across the window).
    const chartData = []
    for (let key = startKey; key <= endKey; key = addDayKey(key, 1)) {
      chartData.push({
        date: key,
        count: dailyData[key]?.count || 0,
        timeMinutes: Math.round((dailyData[key]?.totalTime || 0) / 60)
      })
    }

    return NextResponse.json({
      currentStreak,
      longestStreak,
      activeDays,
      totalDays: days,
      consistencyPercentage,
      totalProblems,
      avgDailyProblems,
      dailyData: chartData
    })
  } catch (error) {
    console.error('Error fetching consistency data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consistency data' },
      { status: 500 }
    )
  }
}

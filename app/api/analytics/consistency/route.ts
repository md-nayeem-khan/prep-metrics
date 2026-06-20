// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/analytics/consistency - Get consistency metrics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30')
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

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

    // Group by date
    const dailyData: Record<string, { count: number; totalTime: number }> = {}
    
    submissions.forEach(sub => {
      const dateKey = sub.submittedAt.toISOString().split('T')[0]
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { count: 0, totalTime: 0 }
      }
      dailyData[dateKey].count++
      dailyData[dateKey].totalTime += sub.timeSpentSeconds
    })

    // Calculate streaks (UTC keys, matching dailyData's toISOString-based grouping).
    const DAY_MS = 86400000
    const activeKeys = new Set(Object.keys(dailyData))
    const utcKey = (ms: number) => new Date(ms).toISOString().split('T')[0]

    // Current streak: consecutive active days ending today. Anchored to today (0 if today
    // has no activity), matching the strict definition used by /api/analytics/daily-progress.
    let currentStreak = 0
    let cursorMs = Date.parse(new Date().toISOString().split('T')[0] + 'T00:00:00.000Z')
    while (activeKeys.has(utcKey(cursorMs))) {
      currentStreak++
      cursorMs -= DAY_MS
    }

    // Longest streak: longest run of consecutive active days anywhere in the window.
    const sortedKeys = Array.from(activeKeys).sort()
    let longestStreak = sortedKeys.length > 0 ? 1 : 0
    let runLength = longestStreak
    for (let i = 1; i < sortedKeys.length; i++) {
      const deltaDays = Math.round(
        (Date.parse(sortedKeys[i] + 'T00:00:00.000Z') - Date.parse(sortedKeys[i - 1] + 'T00:00:00.000Z')) / DAY_MS
      )
      if (deltaDays === 1) {
        runLength++
        if (runLength > longestStreak) longestStreak = runLength
      } else {
        runLength = 1
      }
    }

    // Calculate consistency percentage
    const activeDays = Object.keys(dailyData).length
    const consistencyPercentage = Math.round((activeDays / days) * 100)

    // Calculate average daily problems
    const totalProblems = submissions.length
    const avgDailyProblems = activeDays > 0 ? (totalProblems / activeDays).toFixed(1) : 0

    // Format daily data for chart
    const chartData = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      chartData.push({
        date: dateStr,
        count: dailyData[dateStr]?.count || 0,
        timeMinutes: Math.round((dailyData[dateStr]?.totalTime || 0) / 60)
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

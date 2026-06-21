// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getDateWindow } from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')

    const tz = await getUserTimezone()
    const { startDate } = getDateWindow(days, tz)

    // Get all submissions from the period
    const submissions = await prisma.submission.findMany({
      where: {
        submittedAt: {
          gte: startDate
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
      orderBy: {
        submittedAt: 'desc'
      }
    })

    // Calculate all analytics and return
    const totalProblems = submissions.length
    const solvedCount = submissions.filter(s => s.status === 'solved').length
    const successRate = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
        days
      },
      summary: {
        totalProblems,
        solved: solvedCount,
        successRate: Math.round(successRate * 10) / 10
      },
      insights: ["Weekly review data available"],
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching weekly review:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weekly review data' },
      { status: 500 }
    )
  }
}


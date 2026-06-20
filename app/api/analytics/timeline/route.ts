// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const period = request.nextUrl.searchParams.get('period') || '30'
    const periodDays = parseInt(period)
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)
    
    const submissions = await prisma.submission.findMany({ 
      where: {
        submittedAt: {
          gte: startDate
        },
        status: 'solved'
      },
      orderBy: { submittedAt: 'asc' }
    })
    
    const grouped = submissions.reduce((acc, sub) => {
      const date = new Date(sub.submittedAt)
      const key = date.toISOString().split('T')[0] // YYYY-MM-DD format
      
      if (!acc[key]) {
        acc[key] = { 
          date: key, 
          problemsSolved: 0, 
          totalTimeSeconds: 0 
        }
      }
      acc[key].problemsSolved++
      acc[key].totalTimeSeconds += sub.timeSpentSeconds
      return acc
    }, {} as Record<string, any>)
    
    // Calculate average time for each day
    const timeline = Object.values(grouped).map((day: any) => ({
      date: day.date,
      problemsSolved: day.problemsSolved,
      avgTime: day.problemsSolved > 0 ? day.totalTimeSeconds / day.problemsSolved : 0
    }))
    
    return NextResponse.json(timeline)
    
  } catch (error) {
    console.error('Error fetching timeline data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timeline data' },
      { status: 500 }
    )
  }
}


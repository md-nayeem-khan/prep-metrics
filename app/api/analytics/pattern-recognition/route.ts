// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const patternId = searchParams.get('patternId')
    
    // Get submissions with pattern recognition time
    const submissions = await prisma.submission.findMany({
      where: {
        patternRecognitionSeconds: {
          not: null
        },
        ...(patternId && {
          problem: {
            patterns: {
              some: {
                patternId: parseInt(patternId)
              }
            }
          }
        })
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

    if (submissions.length === 0) {
      return NextResponse.json({
        overall: {
          avgRecognitionSeconds: 0,
          totalTracked: 0,
          targetSeconds: 120,
          performanceLevel: 'No Data',
          percentageOfTarget: 0
        },
        perPattern: [],
        recentTrend: [],
        message: 'No pattern recognition data tracked yet!'
      })
    }

    // Calculate overall statistics
    const totalRecognitionTime = submissions.reduce((sum, s) => sum + (s.patternRecognitionSeconds || 0), 0)
    const avgRecognitionSeconds = totalRecognitionTime / submissions.length
    const targetSeconds = 120 // 2 minutes
    const percentageOfTarget = (avgRecognitionSeconds / targetSeconds) * 100

    let performanceLevel = 'Needs Work'
    if (avgRecognitionSeconds <= 60) {
      performanceLevel = 'Excellent'
    } else if (avgRecognitionSeconds <= 90) {
      performanceLevel = 'Good'
    } else if (avgRecognitionSeconds <= 120) {
      performanceLevel = 'Fair'
    }

    return NextResponse.json({
      overall: {
        avgRecognitionSeconds: Math.round(avgRecognitionSeconds),
        totalTracked: submissions.length,
        targetSeconds,
        performanceLevel,
        percentageOfTarget: Math.round(percentageOfTarget)
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching pattern recognition analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pattern recognition data' },
      { status: 500 }
    )
  }
}

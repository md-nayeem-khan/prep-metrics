// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfDayInstant, endOfDayExclusiveInstant } from '@/lib/datetime/tz'
import { getUserTimezone } from '@/lib/server/user-timezone'

interface Recommendation {
  id: string
  type: 'pattern' | 'company' | 'difficulty' | 'revision'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  action?: string
  problemIds?: number[]
  metadata?: any
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const tz = await getUserTimezone()
    const recommendations: Recommendation[] = []

    // 1. Check for overdue revisions (HIGH PRIORITY)
    const now = new Date()
    const overdueWhere = {
      completed: false,
      nextReviewDate: {
        lt: now
      }
    }

    // Total overdue count (not limited) so the message reflects reality, plus a small
    // sample (oldest first) for metadata / drill-in.
    const overdueCount = await prisma.revision.count({ where: overdueWhere })
    const overdueRevisions = await prisma.revision.findMany({
      where: overdueWhere,
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
      orderBy: {
        nextReviewDate: 'asc'
      },
      take: 5
    })

    if (overdueCount > 0) {
      recommendations.push({
        id: 'overdue-revisions',
        type: 'revision',
        title: `${overdueCount} Overdue Revisions`,
        description: `You have ${overdueCount} problems that need review. Spaced repetition is critical for long-term retention!`,
        priority: 'high',
        action: 'Complete revisions now',
        metadata: {
          count: overdueCount,
          oldestDate: overdueRevisions[0]?.nextReviewDate ?? null
        }
      })
    }

    // 2. Analyze weak patterns (HIGH PRIORITY)
    const submissions = await prisma.submission.findMany({
      where: {
        attemptType: 'First'
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
      }
    })

    // Calculate pattern statistics
    const patternStats = new Map<string, {
      totalSolved: number
      totalTime: number
      hintsUsed: number
      failed: number
      patternId: number
    }>()

    submissions.forEach(sub => {
      sub.problem.patterns.forEach(pp => {
        const patternName = pp.pattern.name
        if (!patternStats.has(patternName)) {
          patternStats.set(patternName, {
            totalSolved: 0,
            totalTime: 0,
            hintsUsed: 0,
            failed: 0,
            patternId: pp.pattern.id
          })
        }

        const stats = patternStats.get(patternName)!
        if (sub.status === 'solved') {
          stats.totalSolved++
          stats.totalTime += sub.timeSpentSeconds
          if (sub.wasHintUsed) stats.hintsUsed++
        } else {
          stats.failed++
        }
      })
    })

    // Identify weak patterns
    const weakPatterns: Array<{ pattern: string; reason: string; patternId: number }> = []
    
    patternStats.forEach((stats, pattern) => {
      const avgTime = stats.totalSolved > 0 ? stats.totalTime / stats.totalSolved : 0
      const avgTimeMinutes = avgTime / 60
      const hintRate = stats.totalSolved > 0 ? stats.hintsUsed / stats.totalSolved : 0

      if (avgTimeMinutes > 35 || hintRate > 0.4 || stats.totalSolved < 3) {
        let reason = ''
        if (stats.totalSolved < 3) {
          reason = 'Not enough practice'
        } else if (avgTimeMinutes > 35) {
          reason = 'Too slow'
        } else if (hintRate > 0.4) {
          reason = 'Too many hints'
        }
        weakPatterns.push({ pattern, reason, patternId: stats.patternId })
      }
    })

    // Recommend practicing weak patterns
    if (weakPatterns.length > 0) {
      const topWeak = weakPatterns[0]
      
      // Find unsolved problems with this pattern
      const recommendedProblems = await prisma.problem.findMany({
        where: {
          patterns: {
            some: {
              patternId: topWeak.patternId
            }
          },
          submissions: {
            none: {}
          }
        },
        take: 5
      })

      recommendations.push({
        id: `weak-pattern-${topWeak.pattern}`,
        type: 'pattern',
        title: `Strengthen ${topWeak.pattern}`,
        description: `${topWeak.reason}. Solve 3-5 more ${topWeak.pattern} problems without hints to improve mastery.`,
        priority: 'high',
        action: 'Practice now',
        problemIds: recommendedProblems.map(p => p.id),
        metadata: {
          pattern: topWeak.pattern,
          reason: topWeak.reason
        }
      })
    }

    // 3. Check for today's revisions (MEDIUM PRIORITY)
    const todayStart = startOfDayInstant(now, tz)
    const todayEndExclusive = endOfDayExclusiveInstant(now, tz)

    const todaysRevisions = await prisma.revision.findMany({
      where: {
        completed: false,
        nextReviewDate: {
          gte: todayStart,
          lt: todayEndExclusive
        }
      }
    })

    if (todaysRevisions.length > 0) {
      recommendations.push({
        id: 'todays-revisions',
        type: 'revision',
        title: `${todaysRevisions.length} Reviews Due Today`,
        description: `Complete today's spaced repetition reviews to maintain pattern mastery.`,
        priority: 'medium',
        action: 'Start reviewing',
        metadata: {
          count: todaysRevisions.length
        }
      })
    }

    // 4. Speed improvement recommendations (MEDIUM PRIORITY)
    const recentSubmissions = await prisma.submission.findMany({
      where: {
        status: 'solved',
        submittedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      include: {
        problem: true
      }
    })

    if (recentSubmissions.length > 0) {
      const avgTime = recentSubmissions.reduce((sum, sub) => sum + sub.timeSpentSeconds, 0) / recentSubmissions.length
      const avgTimeMinutes = avgTime / 60

      if (avgTimeMinutes > 30) {
        recommendations.push({
          id: 'speed-improvement',
          type: 'difficulty',
          title: 'Focus on Speed',
          description: `Your average solving time is ${Math.round(avgTimeMinutes)} minutes. Practice medium problems to improve speed for interviews.`,
          priority: 'medium',
          action: 'Practice medium problems',
          metadata: {
            avgTime: avgTimeMinutes,
            target: 25
          }
        })
      }
    }

    // 5. Company-specific recommendations (LOW PRIORITY)
    const companies = await prisma.companyCard.findMany({
      select: {
        name: true,
      },
    })

    for (const company of companies) {
      const total = await prisma.problem.count({
        where: {
          companies: {
            some: {
              company: {
                name: company.name,
              },
            },
          },
        },
      })

      if (total < 5) continue

      const solved = await prisma.problem.count({
        where: {
          companies: {
            some: {
              company: {
                name: company.name,
              },
            },
          },
          submissions: {
            some: {
              status: 'solved',
            },
          },
        },
      })

      const percentage = (solved / total) * 100

      if (percentage < 70) {
        recommendations.push({
          id: `company-${company.name}`,
          type: 'company',
          title: `${company.name} Interview Prep`,
          description: `You've solved ${solved}/${total} ${company.name} problems (${Math.round(percentage)}%). Aim for 70%+ for interview readiness.`,
          priority: 'low',
          action: `Practice ${company.name} problems`,
          metadata: {
            company: company.name,
            solved,
            total,
            percentage
          }
        })
      }
    }

    // 6. Daily variety recommendation (LOW PRIORITY)
    const todaysSolves = await prisma.submission.findMany({
      where: {
        submittedAt: {
          gte: todayStart
        },
        status: 'solved'
      }
    })

    if (todaysSolves.length === 0) {
      recommendations.push({
        id: 'daily-practice',
        type: 'difficulty',
        title: 'Daily Practice',
        description: 'You haven\'t solved any problems today. Consistency is key for interview success!',
        priority: 'medium',
        action: 'Solve 1 problem now',
        metadata: {
          streak: 0
        }
      })
    }

    // Sort by priority and return
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const sortedRecommendations = recommendations
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
      .slice(0, limit)

    return NextResponse.json({
      recommendations: sortedRecommendations,
      total: recommendations.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
}


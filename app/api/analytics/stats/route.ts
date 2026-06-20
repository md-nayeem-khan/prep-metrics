// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      totalProblems,
      timeResult,
      solvedProblemIds,
      byDifficulty,
      byPlatform,
      solvedSubmissions,
    ] = await Promise.all([
      prisma.problem.count(),
      prisma.submission.aggregate({ _sum: { timeSpentSeconds: true } }),
      prisma.submission.findMany({
        where: { status: 'solved' },
        select: { problemId: true },
        distinct: ['problemId'],
      }),
      prisma.problem.groupBy({ by: ['difficulty'], _count: true }),
      prisma.problem.groupBy({ by: ['platform'], _count: true }),
      prisma.submission.findMany({
        where: { status: 'solved' },
        select: {
          timeSpentSeconds: true,
          problem: { select: { difficulty: true } },
        },
      }),
    ])

    // Calculate average times per difficulty
    const easyTimes: number[] = []
    const mediumTimes: number[] = []
    const hardTimes: number[] = []

    solvedSubmissions.forEach(sub => {
      const timeInMinutes = sub.timeSpentSeconds / 60
      switch (String(sub.problem.difficulty).toLowerCase()) {
        case 'easy':
          easyTimes.push(timeInMinutes)
          break
        case 'medium':
          mediumTimes.push(timeInMinutes)
          break
        case 'hard':
          hardTimes.push(timeInMinutes)
          break
      }
    })

    const calculateAvg = (times: number[]) =>
      times.length > 0 ? Math.round(times.reduce((a, b) => a + b) / times.length) : 0

    // Extract counts by difficulty with fallback to 0 (keys normalized to lowercase).
    const difficultyMap = Object.fromEntries(
      byDifficulty.map(d => [String(d.difficulty).toLowerCase(), d._count])
    )

    const totalSolvedSubmissions = solvedSubmissions.length

    return NextResponse.json({
      totalProblems,
      totalSolvedSubmissions,
      totalProblemsSolvedUnique: solvedProblemIds.length,
      totalTimeSeconds: timeResult._sum.timeSpentSeconds || 0,
      totalTimeMinutes: Math.round((timeResult._sum.timeSpentSeconds || 0) / 60),

      // Individual difficulty counts (expected by UI)
      easyCount: difficultyMap['easy'] || 0,
      mediumCount: difficultyMap['medium'] || 0,
      hardCount: difficultyMap['hard'] || 0,

      // Average times in minutes (expected by UI)
      easyAvgTime: calculateAvg(easyTimes),
      mediumAvgTime: calculateAvg(mediumTimes),
      hardAvgTime: calculateAvg(hardTimes),

      // Original grouped data
      problemsByDifficulty: difficultyMap,
      problemsByPlatform: Object.fromEntries(byPlatform.map(p => [p.platform, p._count])),
    })
  } catch (error) {
    console.error('Stats API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

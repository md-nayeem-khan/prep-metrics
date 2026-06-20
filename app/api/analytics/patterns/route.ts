// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const patterns = await prisma.pattern.findMany({
    include: {
      problems: {
        include: {
          problem: { include: { submissions: true } },
        },
      },
    },
  })
  
  const patternStats = patterns.map(pattern => {
    const latestSolvedSubmissions = pattern.problems
      .map(p => {
        const submissions = p.problem.submissions || []
        if (submissions.length === 0) return null

        const latest = submissions.reduce((a, b) =>
          new Date(a.submittedAt).getTime() >= new Date(b.submittedAt).getTime() ? a : b
        )

        return latest.status === 'solved' ? latest : null
      })
      .filter(Boolean)

    const totalTime = latestSolvedSubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0)
    return {
      id: pattern.id,
      name: pattern.name,
      category: pattern.category,
      problemCount: pattern.problems.length,
      totalTimeSeconds: totalTime,
      avgTimeSeconds:
        latestSolvedSubmissions.length > 0
          ? Math.round(totalTime / latestSolvedSubmissions.length)
          : 0,
    }
  })
  
  return NextResponse.json({ patterns: patternStats })
}


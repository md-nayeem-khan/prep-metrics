// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Common mistake categories and their patterns
const MISTAKE_CATEGORIES = {
  'Edge Cases': [
    'empty', 'null', 'zero', 'negative', 'single element', 'out of bounds', 
    'minimum', 'maximum', 'edge case', 'boundary'
  ],
  'Logic Errors': [
    'wrong condition', 'incorrect logic', 'boolean logic', 'if statement', 
    'comparison', 'logic error', 'algorithm error'
  ],
  'Off-by-One': [
    'off by one', 'index error', 'loop boundary', 'array index', 
    'length vs size', 'inclusive vs exclusive'
  ],
  'Time Limit': [
    'time limit', 'timeout', 'tle', 'slow', 'optimization needed', 
    'complexity', 'performance'
  ],
  'Wrong Approach': [
    'wrong approach', 'different method', 'better solution', 'algorithm choice', 
    'approach error', 'wrong direction'
  ],
  'Implementation': [
    'syntax error', 'typo', 'variable name', 'implementation', 'coding error', 
    'missing semicolon', 'bracket'
  ],
  'Math/Formula': [
    'math error', 'formula', 'calculation', 'arithmetic', 'mathematical', 
    'formula mistake'
  ],
  'Data Structure': [
    'data structure', 'hash map', 'array', 'stack', 'queue', 'tree', 
    'graph structure', 'wrong ds'
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    // Get all submissions with mistakes from the period
    const submissions = await prisma.submission.findMany({
      where: {
        submittedAt: {
          gte: startDate
        },
        mistakeNote: {
          not: null
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

    // Categorize mistakes
    const mistakeCategories = categorizeSubmissions(submissions)
    
    // Find repeated mistakes
    const repeatedMistakes = findRepeatedMistakes(submissions)
    
    // Generate insights
    const insights = generateMistakeInsights(mistakeCategories, repeatedMistakes, submissions)

    // Get mistake trends over time
    const mistakeTrends = getMistakeTrends(submissions, days)

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
        days
      },
      summary: {
        totalMistakes: submissions.length,
        categorizedMistakes: Object.values(mistakeCategories).reduce((sum, cat) => sum + cat.count, 0),
        repeatedMistakesCount: repeatedMistakes.length,
        avgMistakesPerDay: submissions.length / days
      },
      categories: Object.entries(mistakeCategories).map(([category, data]) => ({
        category,
        count: data.count,
        percentage: submissions.length > 0 ? Math.round((data.count / submissions.length) * 100 * 10) / 10 : 0,
        examples: data.examples.slice(0, 3), // Top 3 examples
        color: getCategoryColor(category)
      })),
      repeatedMistakes: repeatedMistakes.slice(0, 10), // Top 10 repeated mistakes
      insights,
      trends: mistakeTrends,
      recentMistakes: submissions.slice(0, 20).map(s => ({
        id: s.id,
        problemTitle: s.problem.title,
        mistakeNote: s.mistakeNote,
        submittedAt: s.submittedAt,
        category: categorizesinglemistake(s.mistakeNote || ''),
        timeSpent: s.timeSpentSeconds,
        patterns: s.problem.patterns.map(p => p.pattern.name)
      }))
    })

  } catch (error) {
    console.error('Error fetching mistake analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mistake analytics' },
      { status: 500 }
    )
  }
}

function categorizeSubmissions(submissions: any[]) {
  const categories: Record<string, { count: number; examples: any[] }> = {}
  
  // Initialize categories
  Object.keys(MISTAKE_CATEGORIES).forEach(category => {
    categories[category] = { count: 0, examples: [] }
  })

  submissions.forEach(submission => {
    const mistakeNote = (submission.mistakeNote || '').toLowerCase()
    let categorized = false

    // Check each category for keyword matches
    Object.entries(MISTAKE_CATEGORIES).forEach(([category, keywords]) => {
      if (!categorized && keywords.some(keyword => mistakeNote.includes(keyword.toLowerCase()))) {
        categories[category].count++
        categories[category].examples.push({
          problemTitle: submission.problem.title,
          mistakeNote: submission.mistakeNote,
          submittedAt: submission.submittedAt
        })
        categorized = true
      }
    })

    // If not categorized, add to "Other"
    if (!categorized) {
      if (!categories['Other']) {
        categories['Other'] = { count: 0, examples: [] }
      }
      categories['Other'].count++
      categories['Other'].examples.push({
        problemTitle: submission.problem.title,
        mistakeNote: submission.mistakeNote,
        submittedAt: submission.submittedAt
      })
    }
  })

  return categories
}

function categorizesinglemistake(mistakeNote: string): string {
  const note = mistakeNote.toLowerCase()
  
  for (const [category, keywords] of Object.entries(MISTAKE_CATEGORIES)) {
    if (keywords.some(keyword => note.includes(keyword.toLowerCase()))) {
      return category
    }
  }
  
  return 'Other'
}

function findRepeatedMistakes(submissions: any[]) {
  const mistakeFrequency: Record<string, {
    count: number
    problems: string[]
    category: string
  }> = {}

  submissions.forEach(submission => {
    const mistakeNote = submission.mistakeNote?.trim()
    if (mistakeNote && mistakeNote.length > 10) { // Only consider substantial mistake notes
      const normalizedMistake = normalizeMistake(mistakeNote)
      
      if (!mistakeFrequency[normalizedMistake]) {
        mistakeFrequency[normalizedMistake] = {
          count: 0,
          problems: [],
          category: categorizesinglemistake(mistakeNote)
        }
      }
      
      mistakeFrequency[normalizedMistake].count++
      mistakeFrequency[normalizedMistake].problems.push(submission.problem.title)
    }
  })

  // Return mistakes that occurred more than once
  return Object.entries(mistakeFrequency)
    .filter(([_, data]) => data.count > 1)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([mistake, data]) => ({
      mistake,
      count: data.count,
      problems: [...new Set(data.problems)], // Remove duplicates
      category: data.category
    }))
}

function normalizeMistake(mistake: string): string {
  // Normalize similar mistakes to group them together
  return mistake
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

function generateMistakeInsights(categories: any, repeatedMistakes: any[], submissions: any[]): string[] {
  const insights: string[] = []
  
  // Find most common mistake category
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => (b[1] as any).count - (a[1] as any).count)
    .filter(([_, data]) => (data as any).count > 0)

  if (sortedCategories.length > 0) {
    const [topCategory, topData] = sortedCategories[0]
    const percentage = Math.round(((topData as any).count / submissions.length) * 100)
    insights.push(`${topCategory} are your biggest weakness (${percentage}% of mistakes) - focus on defensive programming`)
  }

  // Check for repeated mistakes
  if (repeatedMistakes.length > 0) {
    insights.push(`You've repeated ${repeatedMistakes.length} different mistakes - create a personal checklist`)
  }

  // Check for improvement trends
  if (submissions.length >= 14) { // Need at least 2 weeks of data
    const recent = submissions.slice(0, Math.floor(submissions.length / 2))
    const older = submissions.slice(Math.floor(submissions.length / 2))
    
    if (recent.length < older.length) {
      insights.push('Your mistake frequency is decreasing - great improvement!')
    } else if (recent.length > older.length) {
      insights.push('Mistake frequency is increasing - slow down and double-check your work')
    }
  }

  // Pattern-specific insights
  const patternMistakes: Record<string, number> = {}
  submissions.forEach(s => {
    s.problem.patterns.forEach((p: any) => {
      const pattern = p.pattern.name
      patternMistakes[pattern] = (patternMistakes[pattern] || 0) + 1
    })
  })

  const topPatternMistake = Object.entries(patternMistakes)
    .sort((a, b) => b[1] - a[1])[0]
  
  if (topPatternMistake && topPatternMistake[1] > 2) {
    insights.push(`${topPatternMistake[0]} problems cause the most mistakes - review fundamentals`)
  }

  return insights.slice(0, 5) // Return top 5 insights
}

function getMistakeTrends(submissions: any[], days: number) {
  const trends: Record<string, number> = {}
  const daysAgo = Array.from({ length: Math.min(days, 14) }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  daysAgo.forEach(day => {
    trends[day] = submissions.filter(s => 
      s.submittedAt.toISOString().split('T')[0] === day
    ).length
  })

  return Object.entries(trends).map(([date, count]) => ({ date, count }))
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Edge Cases': '#ef4444',
    'Logic Errors': '#f59e0b',
    'Off-by-One': '#8b5cf6',
    'Time Limit': '#06b6d4',
    'Wrong Approach': '#10b981',
    'Implementation': '#f97316',
    'Math/Formula': '#ec4899',
    'Data Structure': '#6366f1',
    'Other': '#6b7280'
  }
  return colors[category] || '#6b7280'
}

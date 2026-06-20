// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Pattern category mapping
const patternCategories: Record<string, string> = {
  "Array": "Arrays & Strings",
  "Hash Table": "Arrays & Strings",
  "Linked List": "Linked Lists",
  "Math": "Math & Geometry",
  "Sliding Window": "Arrays & Strings",
  "Two Pointers": "Arrays & Strings",
  "Stack": "Stack",
  "Queue": "Stack",
  "Binary Search": "Binary Search",
  "Tree": "Trees",
  "Graph": "Graphs",
  "Dynamic Programming": "Dynamic Programming",
  "Greedy": "Greedy",
  "Backtracking": "Backtracking",
  "Heap": "Heap / Priority Queue",
  "Trie": "Tries"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { count = 5 } = body

    // Create some sample problems if they don't exist
    const sampleProblems = [
      {
        title: "Two Sum",
        difficulty: "Easy",
        platform: "leetcode",
        problemId: "1",
        url: "https://leetcode.com/problems/two-sum/",
        patterns: ["Array", "Hash Table"]
      },
      {
        title: "Add Two Numbers", 
        difficulty: "Medium",
        platform: "leetcode",
        problemId: "2",
        url: "https://leetcode.com/problems/add-two-numbers/",
        patterns: ["Linked List", "Math"]
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium", 
        platform: "leetcode",
        problemId: "3",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        patterns: ["Sliding Window", "Hash Table"]
      },
      {
        title: "Container With Most Water",
        difficulty: "Medium",
        platform: "leetcode",
        problemId: "11",
        url: "https://leetcode.com/problems/container-with-most-water/",
        patterns: ["Two Pointers", "Array"]
      },
      {
        title: "3Sum",
        difficulty: "Medium",
        platform: "leetcode",
        problemId: "15",
        url: "https://leetcode.com/problems/3sum/",
        patterns: ["Two Pointers", "Array"]
      }
    ]

    const sampleMistakes = [
      "Forgot to check for empty array edge case",
      "Integer overflow not handled properly", 
      "Off by one error in loop boundary",
      "Wrong comparison operator used in condition",
      "Time limit exceeded due to inefficient algorithm",
      "Null pointer exception not caught",
      "Logic error in recursive base case",
      "Incorrect data structure chosen for problem",
      "Math formula error in calculation",
      "Edge case for single element not considered"
    ]

    let createdCount = 0

    for (let i = 0; i < count; i++) {
      const problemData = sampleProblems[i % sampleProblems.length]
      
      // Check if problem exists, create if not
      let problem = await prisma.problem.findFirst({
        where: { 
          platform: problemData.platform,
          problemId: problemData.problemId
        }
      })

      if (!problem) {
        // First ensure patterns exist
        for (const patternName of problemData.patterns) {
          await prisma.pattern.upsert({
            where: { name: patternName },
            update: {},
            create: { 
              name: patternName,
              category: patternCategories[patternName] || "Other"
            }
          })
        }

        // Get pattern IDs
        const patterns = await prisma.pattern.findMany({
          where: { name: { in: problemData.patterns } }
        })

        problem = await prisma.problem.create({
          data: {
            title: problemData.title,
            difficulty: problemData.difficulty,
            platform: problemData.platform,
            problemId: problemData.problemId,
            url: problemData.url,
            source: "NeetCode",
            patterns: {
              create: patterns.map(p => ({ patternId: p.id }))
            }
          }
        })
      }

      // Create submission with mistake
      await prisma.submission.create({
        data: {
          problemId: problem.id,
          attemptNumber: 1,
          timeSpentSeconds: Math.floor(Math.random() * 3600) + 900, // 15-75 minutes
          status: Math.random() > 0.3 ? 'solved' : 'failed', // 70% solved
          wasHintUsed: Math.random() > 0.6, // 40% used hints
          mistakeNote: sampleMistakes[Math.floor(Math.random() * sampleMistakes.length)],
          submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Last 30 days
          notes: `Practice submission ${i + 1}`
        }
      })

      createdCount++
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdCount} sample submissions with mistakes`,
      createdCount
    })

  } catch (error) {
    console.error('Error creating sample data:', error)
    return NextResponse.json(
      { error: 'Failed to create sample data' },
      { status: 500 }
    )
  }
}

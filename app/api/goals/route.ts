// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculatePatternMetrics } from '@/lib/analytics/pattern-metrics';
import {
  calculateSDReadinessFromLatestAttempts,
  calculateSDTopicMetrics,
  getLatestAttemptsPerQuestion,
} from '@/lib/analytics/system-design-metrics';
import { calculateCompetencyCoverage } from '@/lib/analytics/behavioral-metrics';
import { dayKey, addDayKey } from '@/lib/datetime/tz';
import { getUserTimezone } from '@/lib/server/user-timezone';

// GET /api/goals - Fetch all goals with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status'); // 'active', 'completed', etc.
    const priority = searchParams.get('priority');
    const type = searchParams.get('type');

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (type) where.type = type;

    const goals = await prisma.goal.findMany({
      where,
      include: {
        milestones: {
          orderBy: { dueDate: 'asc' }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Calculate progress for each goal
    const tz = await getUserTimezone();
    const goalsWithProgress = await Promise.all(
      goals.map(async (goal) => {
        const currentValue = await calculateCurrentValue(goal, tz);
        // speedImprovement is "lower is better" (reduce avg time TO targetValue minutes), so the
        // generic currentValue/target ratio is backwards. Treat at-or-below target as achieved.
        let progressPercentage = 0;
        if (goal.type === 'speedImprovement') {
          progressPercentage = currentValue > 0
            ? Math.min(Math.round((goal.targetValue / currentValue) * 100), 100)
            : 0;
        } else if (goal.targetValue > 0) {
          // Cap at 100% — a progress bar shouldn't exceed full (over-achievement still reads as done).
          progressPercentage = Math.min(Math.round((currentValue / goal.targetValue) * 100), 100);
        }

        const now = new Date();
        const daysRemaining = Math.ceil(
          (new Date(goal.deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        const daysSinceStart = Math.ceil(
          (now.getTime() - new Date(goal.startDate).getTime()) / (1000 * 60 * 60 * 24)
        );

        const velocity = daysSinceStart > 0 ? currentValue / daysSinceStart : 0;
        const projectedDays = velocity > 0 ? Math.ceil((goal.targetValue - currentValue) / velocity) : 999;
        const projectedCompletionDate = new Date(now.getTime() + projectedDays * 24 * 60 * 60 * 1000);
        
        const isOnTrack = projectedCompletionDate <= new Date(goal.deadline);

        const nextMilestone = goal.milestones?.find(m => !m.completed);

        return {
          ...goal,
          currentValue,
          progressPercentage,
          daysRemaining,
          isOnTrack,
          velocity: Number(velocity.toFixed(2)),
          projectedCompletionDate,
          nextMilestone
        };
      })
    );

    return NextResponse.json({ goals: goalsWithProgress });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
}

// POST /api/goals - Create a new goal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      type,
      targetValue,
      unit,
      deadline,
      priority,
      targetPattern,
      targetCompany,
      targetDifficulty,
      milestones
    } = body;

    // Validation
    if (!title || !type || !targetValue || !deadline) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type, targetValue, deadline' },
        { status: 400 }
      );
    }

    if (!Array.isArray(milestones) || milestones.length === 0) {
      return NextResponse.json(
        { error: 'Each goal must include at least one milestone' },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        type,
        targetValue,
        unit: unit || 'problems',
        startDate: body.startDate ? new Date(body.startDate) : new Date(),
        deadline: new Date(deadline),
        priority: priority || 'medium',
        targetPattern,
        targetCompany,
        targetDifficulty,
        status: 'active',
        currentValue: 0,
        milestones: {
          create: milestones.map((m: any) => ({
            title: m.title,
            description: m.description,
            targetValue: m.targetValue || 1,
            dueDate: new Date(m.dueDate)
          }))
        }
      },
      include: {
        milestones: true
      }
    });

    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    );
  }
}

// Helper function to calculate current value based on goal type
async function calculateCurrentValue(goal: any, tz: string = 'UTC'): Promise<number> {
  switch (goal.type) {
    case 'problemCount':
      // Count problems solved since goal start date
      const whereClause: any = {
        submittedAt: {
          gte: goal.startDate
        },
        status: 'solved'
      };

      const problemFilters: any = {};

      if (goal.targetPattern) {
        problemFilters.patterns = {
          patterns: {
            some: {
              pattern: {
                name: goal.targetPattern
              }
            }
          }
        };
      }

      if (goal.targetCompany) {
        problemFilters.companies = {
          some: {
            company: {
              name: goal.targetCompany
            }
          }
        };
      }

      if (goal.targetDifficulty) {
        problemFilters.difficulty = goal.targetDifficulty.toLowerCase();
      }

      if (Object.keys(problemFilters).length > 0) {
        whereClause.problem = {
          is: problemFilters
        };
      }

      const problemCount = await prisma.submission.count({ where: whereClause });
      return problemCount;

    case 'streakDays':
      // Calculate current streak
      const dailyProgress = await prisma.dailyProgress.findMany({
        where: {
          date: {
            gte: goal.startDate
          },
          problemsSolved: {
            gt: 0
          }
        },
        orderBy: {
          date: 'desc'
        }
      });

      let currentStreak = 0;
      let checkKey = dayKey(new Date(), tz);

      for (const progress of dailyProgress) {
        const progressKey = dayKey(new Date(progress.date), tz);

        if (progressKey === checkKey) {
          currentStreak++;
          checkKey = addDayKey(checkKey, -1);
        } else {
          break;
        }
      }

      return currentStreak;

    case 'patternMastery': {
      // Count distinct patterns the user has mastered (latest-submission confidence === "Strong"),
      // reusing the same logic as /api/analytics/patterns/confidence.
      const masteryProblems = await prisma.problem.findMany({
        include: {
          patterns: { include: { pattern: true } },
          submissions: {
            select: { status: true, timeSpentSeconds: true, wasHintUsed: true, submittedAt: true },
          },
        },
      });
      const metrics = calculatePatternMetrics(masteryProblems as any, 1);
      const strong = metrics.filter((m) => m.confidence === 'Strong');

      // Scope to the goal's targetPattern when set. targetPattern is a free-text label
      // (e.g. "Core Fundamentals"), so match its words against each pattern's name + category.
      // If the label matches nothing (loose/unknown label), fall back to all mastered patterns
      // so the goal never silently reads 0 just because the label doesn't map to a category.
      if (goal.targetPattern) {
        const tokens = String(goal.targetPattern)
          .toLowerCase()
          .split(/\s+/)
          .filter((t) => t.length > 2);
        const scoped = strong.filter((m) => {
          const haystack = `${m.pattern} ${m.category}`.toLowerCase();
          return tokens.some((t) => haystack.includes(t));
        });
        return scoped.length > 0 ? scoped.length : strong.length;
      }

      return strong.length;
    }

    case 'speedImprovement': {
      // Current average solve time (minutes) for the target difficulty (default medium).
      // This is a "lower is better" metric; the GET handler computes progress accordingly.
      const difficulty = (goal.targetDifficulty || 'medium').toLowerCase();
      const agg = await prisma.submission.aggregate({
        _avg: { timeSpentSeconds: true },
        where: {
          status: 'solved',
          problem: { is: { difficulty } },
        },
      });
      const avgSeconds = agg._avg.timeSpentSeconds;
      return avgSeconds ? Math.round(avgSeconds / 60) : 0;
    }

    case 'companyReady': {
      // Company-specific problems solved. Honor targetDifficulty when set (the goal may target a
      // specific difficulty, e.g. "Google medium problems").
      if (!goal.targetCompany) return 0;

      const companyProblemFilter: any = {
        companies: {
          some: {
            company: {
              name: goal.targetCompany
            }
          }
        }
      };
      if (goal.targetDifficulty) {
        companyProblemFilter.difficulty = goal.targetDifficulty.toLowerCase();
      }

      const companyCount = await prisma.submission.count({
        where: {
          submittedAt: {
            gte: goal.startDate
          },
          status: 'solved',
          problem: {
            is: companyProblemFilter
          }
        }
      });
      return companyCount;
    }

    case 'systemDesignReadiness': {
      // System design readiness as a percentage (0-100), from latest attempt per question.
      const attempts = await prisma.systemDesignAttempt.findMany({
        select: { questionId: true, status: true, overallScore: true, usedReference: true, submittedAt: true },
      });
      const latest = getLatestAttemptsPerQuestion(attempts);
      const readiness = calculateSDReadinessFromLatestAttempts(latest);
      return Math.round(readiness.score * 100);
    }

    case 'topicMastery': {
      // Count of system design building-block topics at "Strong" confidence.
      const questions = await prisma.systemDesignQuestion.findMany({
        include: {
          topics: { include: { topic: { select: { name: true, category: true } } } },
          attempts: { select: { status: true, overallScore: true, usedReference: true, submittedAt: true } },
        },
      });
      const topics = calculateSDTopicMetrics(questions as any, 1);
      return topics.filter((t) => t.confidence === 'Strong').length;
    }

    case 'behavioralCoverage': {
      // Count of competencies (optionally scoped to a company's LPs, e.g. Amazon) that have at
      // least one strong (>=4) STAR story mapped to them.
      const competencyWhere: any = {};
      if (goal.targetCompany) competencyWhere.company = goal.targetCompany;

      const [competencies, stories, attempts] = await Promise.all([
        prisma.competency.findMany({ where: competencyWhere, select: { name: true, type: true, company: true } }),
        prisma.starStory.findMany({
          select: { id: true, strengthRating: true, competencies: { include: { competency: { select: { name: true } } } } },
        }),
        prisma.behavioralAttempt.findMany({
          include: { question: { include: { competencies: { include: { competency: { select: { name: true } } } } } } },
        }),
      ]);
      const storyInputs = stories.map((s) => ({
        id: s.id,
        strengthRating: s.strengthRating,
        competencyNames: s.competencies.map((c) => c.competency.name),
      }));
      const attemptInputs = attempts.map((a) => ({
        questionId: a.questionId,
        status: a.status,
        overallScore: a.overallScore,
        usedNotes: a.usedNotes,
        submittedAt: a.submittedAt,
        competencyNames: a.question?.competencies?.map((c) => c.competency.name) ?? [],
      }));
      const coverage = calculateCompetencyCoverage(competencies, storyInputs, attemptInputs);
      return coverage.filter((c) => c.strongStoryCount >= 1).length;
    }

    case 'storyBankSize':
      return await prisma.starStory.count();

    default:
      return goal.currentValue || 0;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { REVISION_INTERVALS } from "@/lib/spaced-repetition";
import { addDays } from "@/lib/datetime/tz";
import { getUserTimezone } from "@/lib/server/user-timezone";

// Validation schema for completion request
const completeRevisionSchema = z.object({
  wasSuccessful: z.boolean(),
  timeSpentSeconds: z.number().positive().optional(),
  solvedWithoutHint: z.boolean().optional(),
  confidenceLevel: z.number().min(1).max(5).optional(),
  difficultyRating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const revisionId = parseInt(id);
    if (isNaN(revisionId)) {
      return NextResponse.json(
        { error: "Invalid revision ID" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = completeRevisionSchema.parse(body);

    // Get current revision with submission data for performance comparison
    const currentRevision = await prisma.revision.findUnique({
      where: { id: revisionId },
      include: {
        submission: {
          include: {
            problem: true
          }
        }
      }
    });

    if (!currentRevision) {
      return NextResponse.json(
        { error: "Revision not found" },
        { status: 404 }
      );
    }

    if (currentRevision.completed) {
      return NextResponse.json(
        { error: "Revision already completed" },
        { status: 400 }
      );
    }

    // Calculate next review date based on performance
    const currentLevel = currentRevision.intervalLevel;
    const nextLevel = validatedData.wasSuccessful 
      ? Math.min(currentLevel + 1, REVISION_INTERVALS.length - 1)  // Progress if successful
      : Math.max(currentLevel - 1, 0);  // Regress if failed

    const tz = await getUserTimezone();
    const nextReviewDate = addDays(new Date(), REVISION_INTERVALS[nextLevel], tz);

    // Update current revision
    const updatedRevision = await prisma.revision.update({
      where: { id: revisionId },
      data: {
        completed: true,
        completedAt: new Date(),
        wasSuccessful: validatedData.wasSuccessful,
        timeSpentSeconds: validatedData.timeSpentSeconds,
        solvedWithoutHint: validatedData.solvedWithoutHint,
        confidenceLevel: validatedData.confidenceLevel,
        difficultyRating: validatedData.difficultyRating,
        notes: validatedData.notes,
      },
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
      }
    });

    // Create next revision so the spaced-repetition chain always continues.
    let nextRevision = null;
    if (nextLevel < REVISION_INTERVALS.length - 1 || !validatedData.wasSuccessful) {
      nextRevision = await prisma.revision.create({
        data: {
          submissionId: currentRevision.submissionId,
          intervalLevel: nextLevel,
          nextReviewDate: nextReviewDate,
          previousRevisionId: revisionId
        },
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
        }
      });
    }

    // Calculate performance metrics compared to original submission
    const originalTime = updatedRevision.submission.timeSpentSeconds;
    const revisionTime = validatedData.timeSpentSeconds;
    
    let performanceAnalysis = null;
    if (originalTime && revisionTime) {
      const improvement = originalTime - revisionTime;
      const improvementPercentage = (improvement / originalTime) * 100;
      
      performanceAnalysis = {
        originalTimeSeconds: originalTime,
        revisionTimeSeconds: revisionTime,
        improvementSeconds: improvement,
        improvementPercentage: Math.round(improvementPercentage * 10) / 10,
        wasImprovement: improvement > 0
      };
    }

    return NextResponse.json({
      success: true,
      completedRevision: updatedRevision,
      nextRevision,
      performanceAnalysis,
      message: validatedData.wasSuccessful 
        ? "Great job! Revision completed successfully."
        : "Keep practicing! Revision marked as needs more work."
    });

  } catch (error) {
    console.error('Error completing revision:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
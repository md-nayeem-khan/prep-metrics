import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatDateTime(value: Date | null | undefined): string {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toISOString();
}

function formatSeconds(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return `${value}s`;
}

function toTitleCase(status: string): string {
  if (!status) {
    return "Unknown";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export async function GET() {
  try {
    const [solvedProblems, mockInterviews] = await Promise.all([
      prisma.problem.findMany({
        where: {
          submissions: {
            some: {
              status: "solved",
            },
          },
        },
        include: {
          tags: true,
          companies: {
            include: {
              company: {
                select: {
                  name: true,
                },
              },
            },
          },
          patterns: {
            include: {
              pattern: true,
            },
          },
          submissions: {
            orderBy: {
              submittedAt: "asc",
            },
          },
        },
        orderBy: {
          title: "asc",
        },
      }),
      prisma.mockInterview.findMany({
        include: {
          problem: {
            select: {
              id: true,
              title: true,
              platform: true,
              problemId: true,
              difficulty: true,
              source: true,
              companies: {
                select: {
                  company: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      }),
    ]);

    const generatedAt = new Date();
    const lines: string[] = [];

    lines.push("FAANG INTERVIEW READINESS - ANALYTICS EXPORT");
    lines.push(`Generated At: ${generatedAt.toISOString()}`);
    lines.push(`Solved Problems: ${solvedProblems.length}`);
    lines.push(`Mock Interviews: ${mockInterviews.length}`);
    lines.push("");
    lines.push("============================================================");
    lines.push("SECTION 1: SOLVED PROBLEMS WITH DETAILED SUBMISSION HISTORY");
    lines.push("============================================================");
    lines.push("");

    if (solvedProblems.length === 0) {
      lines.push("No solved problems found.");
      lines.push("");
    }

    solvedProblems.forEach((problem, index) => {
      const solvedSubmissionCount = problem.submissions.filter(
        (submission) => submission.status === "solved"
      ).length;

      const patternNames = problem.patterns.map((entry) => entry.pattern.name);
      const tags = problem.tags.map((tag) => tag.tag);
      const companyNames = problem.companies.map((entry) => entry.company.name);

      lines.push(`Problem #${index + 1}`);
      lines.push(`Title: ${problem.title}`);
      lines.push(`Platform: ${problem.platform}`);
      lines.push(`Problem ID: ${problem.problemId}`);
      lines.push(`Difficulty: ${problem.difficulty}`);
      lines.push(`Source: ${problem.source}${companyNames.length > 0 ? ` (${companyNames.join(', ')})` : ""}`);
      lines.push(`URL: ${problem.url || "N/A"}`);
      lines.push(`Tags: ${tags.length > 0 ? tags.join(", ") : "None"}`);
      lines.push(`Patterns: ${patternNames.length > 0 ? patternNames.join(", ") : "None"}`);
      lines.push(`Created At: ${formatDateTime(problem.createdAt)}`);
      lines.push(`Updated At: ${formatDateTime(problem.updatedAt)}`);
      lines.push(`Submission Count: ${problem.submissions.length}`);
      lines.push(`Solved Submission Count: ${solvedSubmissionCount}`);
      lines.push("Submission History:");

      if (problem.submissions.length === 0) {
        lines.push("  - No submissions found.");
      } else {
        problem.submissions.forEach((submission) => {
          lines.push(`  - Submission ID: ${submission.id}`);
          lines.push(`    Attempt Number: ${submission.attemptNumber}`);
          lines.push(`    Status: ${toTitleCase(submission.status)}`);
          lines.push(`    Attempt Type: ${submission.attemptType}`);
          lines.push(`    Time Spent: ${formatSeconds(submission.timeSpentSeconds)}`);
          lines.push(`    Pattern Recognition Time: ${formatSeconds(submission.patternRecognitionSeconds)}`);
          lines.push(`    Hint Used: ${submission.wasHintUsed ? "Yes" : "No"}`);
          lines.push(`    Mistake Note: ${submission.mistakeNote || "N/A"}`);
          lines.push(`    Approach Note: ${submission.approachNote || "N/A"}`);
          lines.push(`    Notes: ${submission.notes || "N/A"}`);
          lines.push(`    Submitted At: ${formatDateTime(submission.submittedAt)}`);
          lines.push(`    Created At: ${formatDateTime(submission.createdAt)}`);
        });
      }

      lines.push("");
      lines.push("------------------------------------------------------------");
      lines.push("");
    });

    lines.push("===========================================");
    lines.push("SECTION 2: DETAILED MOCK INTERVIEW LOGS");
    lines.push("===========================================");
    lines.push("");

    if (mockInterviews.length === 0) {
      lines.push("No mock interviews found.");
      lines.push("");
    }

    mockInterviews.forEach((mock, index) => {
      lines.push(`Mock Interview #${index + 1}`);
      lines.push(`Date: ${formatDateTime(mock.date)}`);
      lines.push(`Problem: ${mock.problem.title}`);
      lines.push(`Problem ID: ${mock.problem.problemId}`);
      lines.push(`Platform: ${mock.problem.platform}`);
      lines.push(`Difficulty: ${mock.problem.difficulty}`);
      const mockCompanyNames = mock.problem.companies.map((entry) => entry.company.name);
      lines.push(`Source: ${mock.problem.source}${mockCompanyNames.length > 0 ? ` (${mockCompanyNames.join(', ')})` : ""}`);
      lines.push(`Time Limit: ${formatSeconds(mock.timeLimit)}`);
      lines.push(`Time Taken: ${formatSeconds(mock.timeTakenSeconds)}`);
      lines.push(`Pattern Recognition Time: ${formatSeconds(mock.patternRecognitionSeconds)}`);
      lines.push(`Solved: ${mock.solved ? "Yes" : "No"}`);
      lines.push(`Explanation Score (1-5): ${mock.explanationScore ?? "N/A"}`);
      lines.push(`Code Quality Score (1-5): ${mock.codeQualityScore ?? "N/A"}`);
      lines.push(`Overall Score: ${mock.overallScore ?? "N/A"}`);
      lines.push(`Notes: ${mock.notes || "N/A"}`);
      lines.push("");
      lines.push("------------------------------------------------------------");
      lines.push("");
    });

    const content = lines.join("\n");
    const filename = `analytics-report-${generatedAt.toISOString().slice(0, 10)}.txt`;

    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting analytics TXT:", error);
    return NextResponse.json(
      { error: "Failed to export analytics report" },
      { status: 500 }
    );
  }
}
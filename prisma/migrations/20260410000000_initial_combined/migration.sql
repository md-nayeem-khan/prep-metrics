-- CreateTable
CREATE TABLE "problems" (
    "id" SERIAL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'NeetCode'
);

-- CreateTable
CREATE TABLE "problem_tags" (
    "id" SERIAL PRIMARY KEY,
    "problemId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    CONSTRAINT "problem_tags_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "patterns" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "company_cards" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '🏢',
    "targetProblems" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "problem_patterns" (
    "id" SERIAL PRIMARY KEY,
    "problemId" INTEGER NOT NULL,
    "patternId" INTEGER NOT NULL,
    CONSTRAINT "problem_patterns_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "problem_patterns_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "patterns" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "problem_companies" (
    "id" SERIAL PRIMARY KEY,
    "problemId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "problem_companies_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "problem_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL PRIMARY KEY,
    "problemId" INTEGER NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "time_spent_seconds" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptType" TEXT NOT NULL DEFAULT 'First',
    "was_hint_used" BOOLEAN NOT NULL DEFAULT false,
    "mistake_note" TEXT,
    "approach_note" TEXT,
    "pattern_recognition_seconds" INTEGER,
    CONSTRAINT "submissions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "problemId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER,
    "notes" TEXT,
    CONSTRAINT "sessions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "revisions" (
    "id" SERIAL PRIMARY KEY,
    "submissionId" INTEGER NOT NULL,
    "intervalLevel" INTEGER NOT NULL DEFAULT 0,
    "nextReviewDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "wasSuccessful" BOOLEAN,
    "timeSpentSeconds" INTEGER,
    "solvedWithoutHint" BOOLEAN,
    "confidenceLevel" INTEGER,
    "difficultyRating" INTEGER,
    "notes" TEXT,
    "previousRevisionId" INTEGER,
    CONSTRAINT "revisions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "mock_interviews" (
    "id" SERIAL PRIMARY KEY,
    "problem_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_limit" INTEGER NOT NULL DEFAULT 2700,
    "time_taken_seconds" INTEGER,
    "pattern_recognition_seconds" INTEGER,
    "solved" BOOLEAN NOT NULL DEFAULT false,
    "explanation_score" INTEGER,
    "code_quality_score" INTEGER,
    "overall_score" DOUBLE PRECISION,
    "notes" TEXT,
    CONSTRAINT "mock_interviews_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "daily_progress" (
    "id" SERIAL PRIMARY KEY,
    "date" TIMESTAMP(3) NOT NULL,
    "problemsSolved" INTEGER NOT NULL DEFAULT 0,
    "totalTimeSpent" INTEGER NOT NULL DEFAULT 0,
    "patternsWorked" INTEGER NOT NULL DEFAULT 0,
    "mockInterviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "goals" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'problems',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "targetPattern" TEXT,
    "targetCompany" TEXT,
    "targetDifficulty" TEXT,
    "completedAt" TIMESTAMP(3),
    "lastProgressUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "milestones" (
    "id" SERIAL PRIMARY KEY,
    "goalId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetValue" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedDate" TIMESTAMP(3),
    "completionNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "milestones_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "problems_platform_idx" ON "problems"("platform");

-- CreateIndex
CREATE INDEX "problems_difficulty_idx" ON "problems"("difficulty");

-- CreateIndex
CREATE INDEX "problems_source_idx" ON "problems"("source");

-- CreateIndex
CREATE INDEX "problems_source_difficulty_idx" ON "problems"("source", "difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "problems_platform_problemId_key" ON "problems"("platform", "problemId");

-- CreateIndex
CREATE INDEX "problem_tags_problemId_idx" ON "problem_tags"("problemId");

-- CreateIndex
CREATE INDEX "problem_tags_tag_idx" ON "problem_tags"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "patterns_name_key" ON "patterns"("name");

-- CreateIndex
CREATE INDEX "patterns_category_idx" ON "patterns"("category");

-- CreateIndex
CREATE UNIQUE INDEX "company_cards_name_key" ON "company_cards"("name");

-- CreateIndex
CREATE INDEX "problem_patterns_problemId_idx" ON "problem_patterns"("problemId");

-- CreateIndex
CREATE INDEX "problem_patterns_patternId_idx" ON "problem_patterns"("patternId");

-- CreateIndex
CREATE INDEX "problem_patterns_patternId_problemId_idx" ON "problem_patterns"("patternId", "problemId");

-- CreateIndex
CREATE UNIQUE INDEX "problem_patterns_problemId_patternId_key" ON "problem_patterns"("problemId", "patternId");

-- CreateIndex
CREATE INDEX "problem_companies_problemId_idx" ON "problem_companies"("problemId");

-- CreateIndex
CREATE INDEX "problem_companies_companyId_idx" ON "problem_companies"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "problem_companies_problemId_companyId_key" ON "problem_companies"("problemId", "companyId");

-- CreateIndex
CREATE INDEX "submissions_problemId_idx" ON "submissions"("problemId");

-- CreateIndex
CREATE INDEX "submissions_submitted_at_idx" ON "submissions"("submitted_at");

-- CreateIndex
CREATE INDEX "submissions_status_idx" ON "submissions"("status");

-- CreateIndex
CREATE INDEX "submissions_attemptType_idx" ON "submissions"("attemptType");

-- CreateIndex
CREATE INDEX "submissions_pattern_recognition_seconds_idx" ON "submissions"("pattern_recognition_seconds");

-- CreateIndex
CREATE INDEX "submissions_submitted_at_status_idx" ON "submissions"("submitted_at", "status");

-- CreateIndex
CREATE INDEX "submissions_problemId_status_submitted_at_idx" ON "submissions"("problemId", "status", "submitted_at");

-- CreateIndex
CREATE INDEX "sessions_problemId_idx" ON "sessions"("problemId");

-- CreateIndex
CREATE INDEX "sessions_startedAt_idx" ON "sessions"("startedAt");

-- CreateIndex
CREATE INDEX "revisions_nextReviewDate_idx" ON "revisions"("nextReviewDate");

-- CreateIndex
CREATE INDEX "revisions_completed_idx" ON "revisions"("completed");

-- CreateIndex
CREATE INDEX "revisions_submissionId_idx" ON "revisions"("submissionId");

-- CreateIndex
CREATE INDEX "mock_interviews_date_idx" ON "mock_interviews"("date");

-- CreateIndex
CREATE INDEX "mock_interviews_problem_id_idx" ON "mock_interviews"("problem_id");

-- CreateIndex
CREATE INDEX "mock_interviews_overall_score_date_idx" ON "mock_interviews"("overall_score", "date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_progress_date_key" ON "daily_progress"("date");

-- CreateIndex
CREATE INDEX "daily_progress_date_idx" ON "daily_progress"("date");

-- CreateIndex
CREATE INDEX "goals_status_idx" ON "goals"("status");

-- CreateIndex
CREATE INDEX "goals_deadline_idx" ON "goals"("deadline");

-- CreateIndex
CREATE INDEX "goals_priority_status_idx" ON "goals"("priority", "status");

-- CreateIndex
CREATE INDEX "goals_type_idx" ON "goals"("type");

-- CreateIndex
CREATE INDEX "milestones_goalId_idx" ON "milestones"("goalId");

-- CreateIndex
CREATE INDEX "milestones_dueDate_idx" ON "milestones"("dueDate");

-- CreateIndex
CREATE INDEX "milestones_completed_idx" ON "milestones"("completed");


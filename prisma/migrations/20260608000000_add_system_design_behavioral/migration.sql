-- AlterTable
ALTER TABLE "daily_progress" ADD COLUMN     "behavioral_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "system_design_attempts" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "track" TEXT NOT NULL DEFAULT 'coding';

-- CreateTable
CREATE TABLE "system_design_questions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "functional_requirements" TEXT,
    "non_functional_requirements" TEXT,
    "estimation_notes" TEXT,
    "reference_solution" TEXT,
    "common_pitfalls" TEXT,
    "source" TEXT NOT NULL DEFAULT 'Curated',
    "url" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_design_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_design_topics" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "system_design_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sd_question_topics" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "question_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "sd_question_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sd_question_companies" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "question_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "sd_question_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_design_attempts" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "question_id" INTEGER NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "attempt_type" TEXT NOT NULL DEFAULT 'First',
    "mode" TEXT NOT NULL DEFAULT 'practice',
    "time_spent_seconds" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requirements_score" INTEGER,
    "estimation_score" INTEGER,
    "high_level_design_score" INTEGER,
    "data_model_api_score" INTEGER,
    "deep_dive_score" INTEGER,
    "scalability_score" INTEGER,
    "tradeoff_score" INTEGER,
    "communication_score" INTEGER,
    "overall_score" DOUBLE PRECISION,
    "used_reference" BOOLEAN NOT NULL DEFAULT false,
    "approach_note" TEXT,
    "mistake_note" TEXT,

    CONSTRAINT "system_design_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_design_revisions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "attempt_id" INTEGER NOT NULL,
    "interval_level" INTEGER NOT NULL DEFAULT 0,
    "next_review_date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "was_successful" BOOLEAN,
    "time_spent_seconds" INTEGER,
    "overall_score" DOUBLE PRECISION,
    "confidence_level" INTEGER,
    "notes" TEXT,

    CONSTRAINT "system_design_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavioral_questions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "slug" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT,
    "what_they_assess" TEXT,
    "exemplar_answer" TEXT,
    "follow_ups" TEXT,
    "source" TEXT NOT NULL DEFAULT 'Curated',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "behavioral_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competencies" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "company" TEXT,
    "description" TEXT,

    CONSTRAINT "competencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "star_stories" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "title" TEXT NOT NULL,
    "situation" TEXT,
    "task" TEXT,
    "action" TEXT,
    "result" TEXT,
    "metrics" TEXT,
    "tags" TEXT,
    "strength_rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "star_stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavioral_question_competencies" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "question_id" INTEGER NOT NULL,
    "competency_id" INTEGER NOT NULL,

    CONSTRAINT "behavioral_question_competencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavioral_question_companies" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "question_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "behavioral_question_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_competencies" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "story_id" INTEGER NOT NULL,
    "competency_id" INTEGER NOT NULL,

    CONSTRAINT "story_competencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_questions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "story_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "story_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavioral_attempts" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "question_id" INTEGER NOT NULL,
    "story_id" INTEGER,
    "attempt_number" INTEGER NOT NULL,
    "attempt_type" TEXT NOT NULL DEFAULT 'First',
    "mode" TEXT NOT NULL DEFAULT 'practice',
    "time_spent_seconds" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situation_score" INTEGER,
    "task_score" INTEGER,
    "action_score" INTEGER,
    "result_score" INTEGER,
    "structure_score" INTEGER,
    "signal_score" INTEGER,
    "result_quantified" BOOLEAN NOT NULL DEFAULT false,
    "overall_score" DOUBLE PRECISION,
    "used_notes" BOOLEAN NOT NULL DEFAULT false,
    "reflection_note" TEXT,

    CONSTRAINT "behavioral_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavioral_revisions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "attempt_id" INTEGER NOT NULL,
    "interval_level" INTEGER NOT NULL DEFAULT 0,
    "next_review_date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "was_successful" BOOLEAN,
    "overall_score" DOUBLE PRECISION,
    "confidence_level" INTEGER,
    "notes" TEXT,

    CONSTRAINT "behavioral_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "system_design_questions_user_id_idx" ON "system_design_questions"("user_id");

-- CreateIndex
CREATE INDEX "system_design_questions_difficulty_idx" ON "system_design_questions"("difficulty");

-- CreateIndex
CREATE INDEX "system_design_questions_category_idx" ON "system_design_questions"("category");

-- CreateIndex
CREATE INDEX "system_design_questions_source_idx" ON "system_design_questions"("source");

-- CreateIndex
CREATE UNIQUE INDEX "system_design_questions_user_id_slug_key" ON "system_design_questions"("user_id", "slug");

-- CreateIndex
CREATE INDEX "system_design_topics_user_id_idx" ON "system_design_topics"("user_id");

-- CreateIndex
CREATE INDEX "system_design_topics_category_idx" ON "system_design_topics"("category");

-- CreateIndex
CREATE UNIQUE INDEX "system_design_topics_user_id_name_key" ON "system_design_topics"("user_id", "name");

-- CreateIndex
CREATE INDEX "sd_question_topics_user_id_idx" ON "sd_question_topics"("user_id");

-- CreateIndex
CREATE INDEX "sd_question_topics_question_id_idx" ON "sd_question_topics"("question_id");

-- CreateIndex
CREATE INDEX "sd_question_topics_topic_id_idx" ON "sd_question_topics"("topic_id");

-- CreateIndex
CREATE INDEX "sd_question_topics_topic_id_question_id_idx" ON "sd_question_topics"("topic_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "sd_question_topics_question_id_topic_id_key" ON "sd_question_topics"("question_id", "topic_id");

-- CreateIndex
CREATE INDEX "sd_question_companies_user_id_idx" ON "sd_question_companies"("user_id");

-- CreateIndex
CREATE INDEX "sd_question_companies_question_id_idx" ON "sd_question_companies"("question_id");

-- CreateIndex
CREATE INDEX "sd_question_companies_company_id_idx" ON "sd_question_companies"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "sd_question_companies_question_id_company_id_key" ON "sd_question_companies"("question_id", "company_id");

-- CreateIndex
CREATE INDEX "system_design_attempts_user_id_idx" ON "system_design_attempts"("user_id");

-- CreateIndex
CREATE INDEX "system_design_attempts_question_id_idx" ON "system_design_attempts"("question_id");

-- CreateIndex
CREATE INDEX "system_design_attempts_submitted_at_idx" ON "system_design_attempts"("submitted_at");

-- CreateIndex
CREATE INDEX "system_design_attempts_status_idx" ON "system_design_attempts"("status");

-- CreateIndex
CREATE INDEX "system_design_attempts_question_id_status_submitted_at_idx" ON "system_design_attempts"("question_id", "status", "submitted_at");

-- CreateIndex
CREATE INDEX "system_design_revisions_user_id_idx" ON "system_design_revisions"("user_id");

-- CreateIndex
CREATE INDEX "system_design_revisions_next_review_date_idx" ON "system_design_revisions"("next_review_date");

-- CreateIndex
CREATE INDEX "system_design_revisions_completed_idx" ON "system_design_revisions"("completed");

-- CreateIndex
CREATE INDEX "system_design_revisions_attempt_id_idx" ON "system_design_revisions"("attempt_id");

-- CreateIndex
CREATE INDEX "behavioral_questions_user_id_idx" ON "behavioral_questions"("user_id");

-- CreateIndex
CREATE INDEX "behavioral_questions_category_idx" ON "behavioral_questions"("category");

-- CreateIndex
CREATE INDEX "behavioral_questions_source_idx" ON "behavioral_questions"("source");

-- CreateIndex
CREATE UNIQUE INDEX "behavioral_questions_user_id_slug_key" ON "behavioral_questions"("user_id", "slug");

-- CreateIndex
CREATE INDEX "competencies_user_id_idx" ON "competencies"("user_id");

-- CreateIndex
CREATE INDEX "competencies_type_idx" ON "competencies"("type");

-- CreateIndex
CREATE UNIQUE INDEX "competencies_user_id_name_key" ON "competencies"("user_id", "name");

-- CreateIndex
CREATE INDEX "star_stories_user_id_idx" ON "star_stories"("user_id");

-- CreateIndex
CREATE INDEX "behavioral_question_competencies_user_id_idx" ON "behavioral_question_competencies"("user_id");

-- CreateIndex
CREATE INDEX "behavioral_question_competencies_question_id_idx" ON "behavioral_question_competencies"("question_id");

-- CreateIndex
CREATE INDEX "behavioral_question_competencies_competency_id_idx" ON "behavioral_question_competencies"("competency_id");

-- CreateIndex
CREATE UNIQUE INDEX "behavioral_question_competencies_question_id_competency_id_key" ON "behavioral_question_competencies"("question_id", "competency_id");

-- CreateIndex
CREATE INDEX "behavioral_question_companies_user_id_idx" ON "behavioral_question_companies"("user_id");

-- CreateIndex
CREATE INDEX "behavioral_question_companies_question_id_idx" ON "behavioral_question_companies"("question_id");

-- CreateIndex
CREATE INDEX "behavioral_question_companies_company_id_idx" ON "behavioral_question_companies"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "behavioral_question_companies_question_id_company_id_key" ON "behavioral_question_companies"("question_id", "company_id");

-- CreateIndex
CREATE INDEX "story_competencies_user_id_idx" ON "story_competencies"("user_id");

-- CreateIndex
CREATE INDEX "story_competencies_story_id_idx" ON "story_competencies"("story_id");

-- CreateIndex
CREATE INDEX "story_competencies_competency_id_idx" ON "story_competencies"("competency_id");

-- CreateIndex
CREATE UNIQUE INDEX "story_competencies_story_id_competency_id_key" ON "story_competencies"("story_id", "competency_id");

-- CreateIndex
CREATE INDEX "story_questions_user_id_idx" ON "story_questions"("user_id");

-- CreateIndex
CREATE INDEX "story_questions_story_id_idx" ON "story_questions"("story_id");

-- CreateIndex
CREATE INDEX "story_questions_question_id_idx" ON "story_questions"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "story_questions_story_id_question_id_key" ON "story_questions"("story_id", "question_id");

-- CreateIndex
CREATE INDEX "behavioral_attempts_user_id_idx" ON "behavioral_attempts"("user_id");

-- CreateIndex
CREATE INDEX "behavioral_attempts_question_id_idx" ON "behavioral_attempts"("question_id");

-- CreateIndex
CREATE INDEX "behavioral_attempts_submitted_at_idx" ON "behavioral_attempts"("submitted_at");

-- CreateIndex
CREATE INDEX "behavioral_attempts_status_idx" ON "behavioral_attempts"("status");

-- CreateIndex
CREATE INDEX "behavioral_attempts_question_id_status_submitted_at_idx" ON "behavioral_attempts"("question_id", "status", "submitted_at");

-- CreateIndex
CREATE INDEX "behavioral_revisions_user_id_idx" ON "behavioral_revisions"("user_id");

-- CreateIndex
CREATE INDEX "behavioral_revisions_next_review_date_idx" ON "behavioral_revisions"("next_review_date");

-- CreateIndex
CREATE INDEX "behavioral_revisions_completed_idx" ON "behavioral_revisions"("completed");

-- CreateIndex
CREATE INDEX "behavioral_revisions_attempt_id_idx" ON "behavioral_revisions"("attempt_id");

-- CreateIndex
CREATE INDEX "goals_track_idx" ON "goals"("track");

-- AddForeignKey
ALTER TABLE "sd_question_topics" ADD CONSTRAINT "sd_question_topics_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "system_design_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sd_question_topics" ADD CONSTRAINT "sd_question_topics_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "system_design_topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sd_question_companies" ADD CONSTRAINT "sd_question_companies_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "system_design_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sd_question_companies" ADD CONSTRAINT "sd_question_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_design_attempts" ADD CONSTRAINT "system_design_attempts_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "system_design_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_design_revisions" ADD CONSTRAINT "system_design_revisions_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "system_design_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_question_competencies" ADD CONSTRAINT "behavioral_question_competencies_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "behavioral_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_question_competencies" ADD CONSTRAINT "behavioral_question_competencies_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "competencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_question_companies" ADD CONSTRAINT "behavioral_question_companies_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "behavioral_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_question_companies" ADD CONSTRAINT "behavioral_question_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_competencies" ADD CONSTRAINT "story_competencies_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "star_stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_competencies" ADD CONSTRAINT "story_competencies_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "competencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_questions" ADD CONSTRAINT "story_questions_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "star_stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_questions" ADD CONSTRAINT "story_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "behavioral_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_attempts" ADD CONSTRAINT "behavioral_attempts_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "behavioral_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_attempts" ADD CONSTRAINT "behavioral_attempts_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "star_stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioral_revisions" ADD CONSTRAINT "behavioral_revisions_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "behavioral_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;


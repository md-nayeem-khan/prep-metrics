-- AlterTable: generalize mock_interviews into a multi-type session record.
-- problem_id relaxes to nullable; new columns are nullable or defaulted (safe on existing rows).
ALTER TABLE "mock_interviews"
  ALTER COLUMN "problem_id" DROP NOT NULL,
  ADD COLUMN "type" TEXT NOT NULL DEFAULT 'coding',
  ADD COLUMN "status" TEXT NOT NULL DEFAULT 'inProgress',
  ADD COLUMN "system_design_question_id" INTEGER,
  ADD COLUMN "behavioral_question_id" INTEGER,
  ADD COLUMN "story_id" INTEGER,
  ADD COLUMN "system_design_attempt_id" INTEGER,
  ADD COLUMN "behavioral_attempt_id" INTEGER;

-- Backfill: existing coding mocks with a recorded time are completed.
UPDATE "mock_interviews" SET "status" = 'completed' WHERE "time_taken_seconds" IS NOT NULL;

-- CreateIndex (unique 1-1 attempt links)
CREATE UNIQUE INDEX "mock_interviews_system_design_attempt_id_key" ON "mock_interviews"("system_design_attempt_id");

-- CreateIndex
CREATE UNIQUE INDEX "mock_interviews_behavioral_attempt_id_key" ON "mock_interviews"("behavioral_attempt_id");

-- CreateIndex
CREATE INDEX "mock_interviews_type_idx" ON "mock_interviews"("type");

-- CreateIndex
CREATE INDEX "mock_interviews_system_design_question_id_idx" ON "mock_interviews"("system_design_question_id");

-- CreateIndex
CREATE INDEX "mock_interviews_behavioral_question_id_idx" ON "mock_interviews"("behavioral_question_id");

-- AddForeignKey
ALTER TABLE "mock_interviews" ADD CONSTRAINT "mock_interviews_system_design_question_id_fkey" FOREIGN KEY ("system_design_question_id") REFERENCES "system_design_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_interviews" ADD CONSTRAINT "mock_interviews_behavioral_question_id_fkey" FOREIGN KEY ("behavioral_question_id") REFERENCES "behavioral_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_interviews" ADD CONSTRAINT "mock_interviews_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "star_stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_interviews" ADD CONSTRAINT "mock_interviews_system_design_attempt_id_fkey" FOREIGN KEY ("system_design_attempt_id") REFERENCES "system_design_attempts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_interviews" ADD CONSTRAINT "mock_interviews_behavioral_attempt_id_fkey" FOREIGN KEY ("behavioral_attempt_id") REFERENCES "behavioral_attempts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

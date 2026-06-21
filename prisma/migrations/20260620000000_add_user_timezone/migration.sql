-- AlterTable: add a per-user IANA timezone. Constant default is safe/non-blocking on existing rows.
ALTER TABLE "users" ADD COLUMN "timezone" TEXT NOT NULL DEFAULT 'UTC';

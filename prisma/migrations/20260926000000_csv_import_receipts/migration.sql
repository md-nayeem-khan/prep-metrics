CREATE TABLE "import_receipts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "payload_hash" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "import_receipts_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "import_receipts_user_id_request_id_key" ON "import_receipts"("user_id", "request_id");

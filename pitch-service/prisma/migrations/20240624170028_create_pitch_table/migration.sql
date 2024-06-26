-- CreateTable
CREATE TABLE "pitch" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "pitch_text" TEXT NOT NULL,

    CONSTRAINT "pitch_pkey" PRIMARY KEY ("id")
);

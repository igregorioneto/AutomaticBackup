-- CreateEnum
CREATE TYPE "StatusBackups" AS ENUM ('EXECUTING', 'FINISHED', 'FAILED');

-- CreateTable
CREATE TABLE "Backups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "StatusBackups" NOT NULL,
    "config" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Backups_pkey" PRIMARY KEY ("id")
);

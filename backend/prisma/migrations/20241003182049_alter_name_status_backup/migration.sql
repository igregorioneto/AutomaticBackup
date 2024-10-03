/*
  Warnings:

  - Changed the type of `status` on the `Backups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusBackupsEnum" AS ENUM ('EXECUTING', 'FINISHED', 'FAILED');

-- AlterTable
ALTER TABLE "Backups" DROP COLUMN "status",
ADD COLUMN     "status" "StatusBackupsEnum" NOT NULL;

-- DropEnum
DROP TYPE "StatusBackups";

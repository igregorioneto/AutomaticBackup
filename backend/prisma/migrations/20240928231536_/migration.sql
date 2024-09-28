-- CreateTable
CREATE TABLE "Schedules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "dayOfMonth" TEXT,
    "month" TEXT,
    "dayOfWeek" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);

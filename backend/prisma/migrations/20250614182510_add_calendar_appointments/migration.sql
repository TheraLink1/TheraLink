/*
  Warnings:

  - You are about to drop the column `locationId` on the `Psychologist` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Psychologist" DROP CONSTRAINT "Psychologist_locationId_fkey";

-- AlterTable
ALTER TABLE "Psychologist" DROP COLUMN "locationId",
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startHour" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "psychologistId" INTEGER NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

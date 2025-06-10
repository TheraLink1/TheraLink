/*
  Warnings:

  - Added the required column `Description` to the `Psychologist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Specialization` to the `Psychologist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyRate` to the `Psychologist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Psychologist" ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "Specialization" TEXT NOT NULL,
ADD COLUMN     "hourlyRate" INTEGER NOT NULL;

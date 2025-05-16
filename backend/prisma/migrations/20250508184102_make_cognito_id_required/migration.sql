/*
  Warnings:

  - Made the column `cognitoId` on table `Uzytkownik` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Uzytkownik" ALTER COLUMN "cognitoId" SET NOT NULL;

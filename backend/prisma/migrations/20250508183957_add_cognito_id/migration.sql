/*
  Warnings:

  - A unique constraint covering the columns `[cognitoId]` on the table `Uzytkownik` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Uzytkownik" ADD COLUMN     "cognitoId" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Uzytkownik_cognitoId_key" ON "Uzytkownik"("cognitoId");

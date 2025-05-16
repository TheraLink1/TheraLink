/*
  Warnings:

  - You are about to drop the column `userId` on the `Klient` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Platnosc` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Psycholog` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Wizyta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userCognitoId]` on the table `Klient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userCognitoId]` on the table `Psycholog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userCognitoId` to the `Klient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCognitoId` to the `Platnosc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCognitoId` to the `Psycholog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCognitoId` to the `Wizyta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Klient" DROP CONSTRAINT "Klient_userId_fkey";

-- DropForeignKey
ALTER TABLE "Platnosc" DROP CONSTRAINT "Platnosc_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Psycholog" DROP CONSTRAINT "Psycholog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wizyta" DROP CONSTRAINT "Wizyta_clientId_fkey";

-- DropIndex
DROP INDEX "Klient_userId_key";

-- DropIndex
DROP INDEX "Psycholog_userId_key";

-- AlterTable
ALTER TABLE "Klient" DROP COLUMN "userId",
ADD COLUMN     "userCognitoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Platnosc" DROP COLUMN "clientId",
ADD COLUMN     "clientCognitoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Psycholog" DROP COLUMN "userId",
ADD COLUMN     "userCognitoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Uzytkownik" ALTER COLUMN "role" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "firstName" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "cognitoId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Wizyta" DROP COLUMN "clientId",
ADD COLUMN     "clientCognitoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Klient_userCognitoId_key" ON "Klient"("userCognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Psycholog_userCognitoId_key" ON "Psycholog"("userCognitoId");

-- AddForeignKey
ALTER TABLE "Klient" ADD CONSTRAINT "Klient_userCognitoId_fkey" FOREIGN KEY ("userCognitoId") REFERENCES "Uzytkownik"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Psycholog" ADD CONSTRAINT "Psycholog_userCognitoId_fkey" FOREIGN KEY ("userCognitoId") REFERENCES "Uzytkownik"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wizyta" ADD CONSTRAINT "Wizyta_clientCognitoId_fkey" FOREIGN KEY ("clientCognitoId") REFERENCES "Klient"("userCognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platnosc" ADD CONSTRAINT "Platnosc_clientCognitoId_fkey" FOREIGN KEY ("clientCognitoId") REFERENCES "Klient"("userCognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

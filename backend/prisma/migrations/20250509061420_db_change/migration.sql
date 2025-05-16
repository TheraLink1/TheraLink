/*
  Warnings:

  - You are about to drop the `Klient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lokalizacja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Platnosc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Psycholog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Uzytkownik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wizyta` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Denied', 'Approved');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'PartiallyPaid', 'Overdue');

-- DropForeignKey
ALTER TABLE "Klient" DROP CONSTRAINT "Klient_userCognitoId_fkey";

-- DropForeignKey
ALTER TABLE "Platnosc" DROP CONSTRAINT "Platnosc_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "Platnosc" DROP CONSTRAINT "Platnosc_clientCognitoId_fkey";

-- DropForeignKey
ALTER TABLE "Psycholog" DROP CONSTRAINT "Psycholog_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Psycholog" DROP CONSTRAINT "Psycholog_userCognitoId_fkey";

-- DropForeignKey
ALTER TABLE "Wizyta" DROP CONSTRAINT "Wizyta_clientCognitoId_fkey";

-- DropForeignKey
ALTER TABLE "Wizyta" DROP CONSTRAINT "Wizyta_psychologistId_fkey";

-- DropTable
DROP TABLE "Klient";

-- DropTable
DROP TABLE "Lokalizacja";

-- DropTable
DROP TABLE "Platnosc";

-- DropTable
DROP TABLE "Psycholog";

-- DropTable
DROP TABLE "Uzytkownik";

-- DropTable
DROP TABLE "Wizyta";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "history" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Psychologist" (
    "id" SERIAL NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Psychologist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "houseNumber" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(6) NOT NULL,
    "coordinates" geography(Point, 4326) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "clientCognitoId" TEXT NOT NULL,
    "psychologistId" INTEGER NOT NULL,
    "meetingLink" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "Status" "ApplicationStatus" NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "clientCognitoId" TEXT,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cognitoId_key" ON "Client"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Psychologist_cognitoId_key" ON "Psychologist"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_appointmentId_key" ON "Payment"("appointmentId");

-- AddForeignKey
ALTER TABLE "Psychologist" ADD CONSTRAINT "Psychologist_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientCognitoId_fkey" FOREIGN KEY ("clientCognitoId") REFERENCES "Client"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_clientCognitoId_fkey" FOREIGN KEY ("clientCognitoId") REFERENCES "Client"("cognitoId") ON DELETE SET NULL ON UPDATE CASCADE;

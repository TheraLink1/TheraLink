-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "Uzytkownik" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Uzytkownik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Klient" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "history" TEXT,

    CONSTRAINT "Klient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Psycholog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "specialization" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,
    "availability" TIMESTAMP(3) NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Psycholog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lokalizacja" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "houseNumber" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(6) NOT NULL,
    "coordinates" geography(Point, 4326) NOT NULL,

    CONSTRAINT "Lokalizacja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wizyta" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "psychologistId" INTEGER NOT NULL,
    "meetingLink" VARCHAR(400) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Wizyta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platnosc" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Platnosc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uzytkownik_email_key" ON "Uzytkownik"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Klient_userId_key" ON "Klient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Psycholog_userId_key" ON "Psycholog"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Platnosc_appointmentId_key" ON "Platnosc"("appointmentId");

-- AddForeignKey
ALTER TABLE "Klient" ADD CONSTRAINT "Klient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Uzytkownik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Psycholog" ADD CONSTRAINT "Psycholog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Uzytkownik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Psycholog" ADD CONSTRAINT "Psycholog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Lokalizacja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wizyta" ADD CONSTRAINT "Wizyta_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Klient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wizyta" ADD CONSTRAINT "Wizyta_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psycholog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platnosc" ADD CONSTRAINT "Platnosc_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Wizyta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platnosc" ADD CONSTRAINT "Platnosc_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Klient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

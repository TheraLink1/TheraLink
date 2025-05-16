-- DropForeignKey
ALTER TABLE "Platnosc" DROP CONSTRAINT "Platnosc_clientCognitoId_fkey";

-- AlterTable
ALTER TABLE "Platnosc" ALTER COLUMN "clientCognitoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Uzytkownik" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Platnosc" ADD CONSTRAINT "Platnosc_clientCognitoId_fkey" FOREIGN KEY ("clientCognitoId") REFERENCES "Klient"("userCognitoId") ON DELETE SET NULL ON UPDATE CASCADE;

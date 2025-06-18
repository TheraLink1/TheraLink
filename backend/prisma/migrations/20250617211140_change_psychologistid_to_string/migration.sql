-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_psychologistId_fkey";

-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "psychologistId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_psychologistId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "psychologistId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;

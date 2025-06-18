import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Wyczyść istniejące dane (opcjonalnie)
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.psychologist.deleteMany();

  // 2. Seed psychologów (bez pola yearsOfExperience, location to zwykły string!)
  const psychologistsData = [
    {
      cognitoId: 'psych1',
      name: 'Anna Kowalska',
      email: 'anna.kowalska@example.com',
      phoneNumber: '+48123123123',
      hourlyRate: 150,
      Description: 'Psycholog kliniczny z 10-letnim doświadczeniem.',
      Specialization: 'Terapia poznawczo-behawioralna',
      location: 'Warszawska 10, Kraków',
    },
    {
      cognitoId: 'psych2',
      name: 'Jan Nowak',
      email: 'jan.nowak@example.com',
      phoneNumber: '+48123456789',
      hourlyRate: 120,
      Description: 'Specjalista w terapii par.',
      Specialization: 'Terapia par',
      location: 'Nowomiejska 5, Poznań',
    },
    {
      cognitoId: 'psych3',
      name: 'Maria Wiśniewska',
      email: 'maria.wisniewska@example.com',
      phoneNumber: '+48111222333',
      hourlyRate: 140,
      Description: 'Specjalistka od zaburzeń lękowych.',
      Specialization: 'Terapia zaburzeń lękowych',
      location: 'Warszawska 10, Kraków',
    },
    {
      cognitoId: 'psych4',
      name: 'Piotr Zieliński',
      email: 'piotr.zielinski@example.com',
      phoneNumber: '+48999888777',
      hourlyRate: 130,
      Description: 'Doświadczony psycholog dziecięcy.',
      Specialization: 'Psychologia dziecięca',
      location: 'Nowomiejska 5, Poznań',
    },
    {
      cognitoId: 'psych5',
      name: 'Ewa Malinowska',
      email: 'ewa.malinowska@example.com',
      phoneNumber: '+48123400987',
      hourlyRate: 160,
      Description: 'Ekspertka w terapii traumy.',
      Specialization: 'Terapia traumy',
      location: 'Warszawska 10, Kraków',
    },
  ];

  for (const p of psychologistsData) {
    await prisma.psychologist.create({ data: p });
  }

  console.log('✅ Seed z dodatkowymi psychologami zakończony pomyślnie');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
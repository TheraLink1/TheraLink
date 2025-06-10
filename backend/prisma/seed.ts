import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Wyczyść istniejące dane (opcjonalnie)
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.psychologist.deleteMany();
  await prisma.location.deleteMany();

  // 2. Seed lokalizacji z PostGIS
  const locations = [
    { street: 'Warszawska 10', city: 'Kraków', houseNumber: '10', postalCode: '31-155', lat: 50.06143, lon: 19.93658 },
    { street: 'Nowomiejska 5', city: 'Poznań', houseNumber: '5', postalCode: '61-854', lat: 52.40827, lon: 16.93342 },
  ];

  for (const loc of locations) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "Location" ("street","city","houseNumber","postalCode","coordinates")
      VALUES (
        '${loc.street}', '${loc.city}', '${loc.houseNumber}', '${loc.postalCode}',
        ST_GeographyFromText('SRID=4326;POINT(${loc.lon} ${loc.lat})')
      )
    `);
  }

  // 3. Pobierz wszystkie lokalizacje (aby mieć ich ID)
  const allLocations = await prisma.location.findMany();

  // 4. Seed psychologów (bez pola yearsOfExperience)
  const psychologistsData = [
    {
      cognitoId: 'psych1',
      name: 'Anna Kowalska',
      email: 'anna.kowalska@example.com',
      phoneNumber: '+48123123123',
      hourlyRate: 150,
      Description: 'Psycholog kliniczny z 10-letnim doświadczeniem.',
      Specialization: 'Terapia poznawczo-behawioralna',
      locationId: allLocations[0].id,
    },
    {
      cognitoId: 'psych2',
      name: 'Jan Nowak',
      email: 'jan.nowak@example.com',
      phoneNumber: '+48123456789',
      hourlyRate: 120,
      Description: 'Specjalista w terapii par.',
      Specialization: 'Terapia par',
      locationId: allLocations[1].id,
    },
    {
      cognitoId: 'psych3',
      name: 'Maria Wiśniewska',
      email: 'maria.wisniewska@example.com',
      phoneNumber: '+48111222333',
      hourlyRate: 140,
      Description: 'Specjalistka od zaburzeń lękowych.',
      Specialization: 'Terapia zaburzeń lękowych',
      locationId: allLocations[0].id,
    },
    {
      cognitoId: 'psych4',
      name: 'Piotr Zieliński',
      email: 'piotr.zielinski@example.com',
      phoneNumber: '+48999888777',
      hourlyRate: 130,
      Description: 'Doświadczony psycholog dziecięcy.',
      Specialization: 'Psychologia dziecięca',
      locationId: allLocations[1].id,
    },
    {
      cognitoId: 'psych5',
      name: 'Ewa Malinowska',
      email: 'ewa.malinowska@example.com',
      phoneNumber: '+48123400987',
      hourlyRate: 160,
      Description: 'Ekspertka w terapii traumy.',
      Specialization: 'Terapia traumy',
      locationId: allLocations[0].id,
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
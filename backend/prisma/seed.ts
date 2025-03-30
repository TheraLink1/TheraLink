import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Decimal } from 'decimal.js';
const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.psychologist.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$executeRaw`DELETE FROM "Lokalizacja"`;

  const locations = await prisma.$queryRaw<{ id: number }[]>`
    INSERT INTO "Lokalizacja" (street, city, "houseNumber", "postalCode", coordinates)
    VALUES 
      ('Main Street', 'Warsaw', '1', '00-001', ST_SetSRID(ST_MakePoint(21.0122, 52.2297), 4326)),
      ('Old Town', 'Krakow', '5', '30-002', ST_SetSRID(ST_MakePoint(19.9369, 50.0647), 4326))
    RETURNING id;
  `;

  const user1 = await prisma.user.create({
    data: {
      role: 'client',
      email: 'client1@example.com',
      password: await bcrypt.hash('test123', 10),
      firstName: 'Anna',
      lastName: 'Nowak',
      phone: '123456789',
      dateOfBirth: new Date('1990-01-01'),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      role: 'client',
      email: 'client2@example.com',
      password: await bcrypt.hash('test123', 10),
      firstName: 'Piotr',
      lastName: 'Kowalski',
      phone: '987654321',
      dateOfBirth: new Date('1985-05-15'),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      role: 'psychologist',
      email: 'psychologist@example.com',
      password: await bcrypt.hash('test123', 10),
      firstName: 'Maria',
      lastName: 'Wójcik',
      phone: '555444333',
      dateOfBirth: new Date('1980-10-20'),
    },
  });

  const client1 = await prisma.client.create({
    data: {
      userId: user1.id,
      history: 'Anxiety disorder treatment history',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      userId: user2.id,
      history: 'Couples therapy sessions',
    },
  });

  const psychologist = await prisma.psychologist.create({
    data: {
      userId: user3.id,
      specialization: 'Clinical Psychology',
      price: new Decimal(150.5),
      availability: new Date('2024-03-30T10:00:00Z'),
      locationId: locations[0].id,
    },
  });

  const appointment1 = await prisma.appointment.create({
    data: {
      clientId: client1.id,
      psychologistId: psychologist.id,
      meetingLink: 'https://meet.example.com/1',
      date: new Date('2024-03-25T15:00:00Z'),
      isConfirmed: true,
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      clientId: client2.id,
      psychologistId: psychologist.id,
      meetingLink: 'https://meet.example.com/2',
      date: new Date('2024-04-01T16:30:00Z'),
      isConfirmed: false,
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appointment1.id,
      clientId: client1.id,
      paymentDate: new Date('2024-03-25T14:00:00Z'),
      isPaid: true,
      amount: 15050, // 150.50 PLN w groszach
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appointment2.id,
      clientId: client2.id,
      paymentDate: new Date('2024-03-28T12:00:00Z'),
      isPaid: false,
      amount: 15050,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
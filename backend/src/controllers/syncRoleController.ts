import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export const upgradeToPsychologist = async (req: Request, res: Response) => {
  try {
    const { id: cognitoId, role } = req.user!;
    if (role !== "client") {
      res.status(403).json({ message: "Only clients can upgrade to psychologist" });
      return;
    }

    const client = await prisma.client.findUnique({ where: { cognitoId } });
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    const { hourlyRate, description, specialization, location } = req.body;

    await prisma.client.delete({ where: { cognitoId } });

    const psychologist = await prisma.psychologist.create({
      data: {
        cognitoId,
        name: client.name,
        email: client.email,
        phoneNumber: client.phoneNumber,
        location: location || "",
        hourlyRate: hourlyRate ? Number(hourlyRate) : 0,
        Description: description || "",
        Specialization: specialization || "",
      },
    });

    res.status(200).json({ message: "Upgraded to psychologist", psychologist });
  } catch (err: any) {
    res.status(500).json({ message: "Error upgrading to psychologist", error: err.message });
  }
};
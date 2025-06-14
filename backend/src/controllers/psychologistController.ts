import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// create Psychologist
export const createPsychologist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const {location, hourlyRate, Description, Specialization } = req.body;

    const existingClient = await prisma.psychologist.findUnique({
      where: { cognitoId },
    });

    if (existingClient) {
      res.status(400).json({ message: "Error finding client" });
      return;
    }

    const { name, email, phoneNumber } = existingClient;

    const psychologist = await prisma.psychologist.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
        location,
        hourlyRate,
        Description,
        Specialization
      },
    });

    res.status(201).json(psychologist);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating psychologist: ${error.message}` });
  }
};

// get Psychologist (id)

export const getPsychologist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const psychologist = await prisma.psychologist.findUnique({
      where: { cognitoId },
    });

    if (psychologist) {
      res.json(psychologist);
    } else {
      res.status(404).json({ message: "Psychologist not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving psychologist: ${error.message}` });
  }
};

// get all Psychologists

export const getAllPsychologists = async (req: Request, res: Response): Promise<void> => {
  try {
    const psychologists = await prisma.psychologist.findMany();
    res.json(psychologists);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving psychologists: ${error.message}` });
  }
};

// update Psychologist (id)

export const updatePsychologist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { email, phoneNumber, location, hourlyRate, Description, Specialization } = req.body;

    const updatedPsychologist = await prisma.psychologist.update({
      where: { cognitoId },
      data: {
        email,
        phoneNumber,
        location,
        hourlyRate,
        Description,
        Specialization
      },
    });

    res.json(updatedPsychologist);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating psychologist: ${error.message}` });
  }
};

// create Availabilities for Psychologist

// get Availabilities for Psychologist

// get Availability (date, psychologistId)

// update Availability (id)




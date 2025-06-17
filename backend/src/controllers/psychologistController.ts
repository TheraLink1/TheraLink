import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createPsychologist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      cognitoId,
      name = "",
      email = "",
      phoneNumber = "",
      location = "",
      hourlyRate = 0,
      Description = "",
      Specialization = ""
    } = req.body;

    if (!cognitoId || !email) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const existingPsychologist = await prisma.psychologist.findUnique({
      where: { cognitoId },
    });
    if (existingPsychologist) {
      res.status(400).json({ message: "Psychologist already exists" });
      return;
    }

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

export const updatePsychologist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber, location, hourlyRate, Description, Specialization } = req.body;

    const updatedPsychologist = await prisma.psychologist.update({
      where: { cognitoId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phoneNumber && { phoneNumber }),
        ...(location && { location }),
        ...(hourlyRate && { hourlyRate }),
        ...(Description && { Description }),
        ...(Specialization && { Specialization }),
      },
    });

    res.json(updatedPsychologist);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating psychologist: ${error.message}` });
  }
};

export const createAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { psychologistId } = req.params;
    const { date, startHour, patientName } = req.body;
    if (!date || !startHour || !patientName) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const availability = await prisma.calendarAppointment.create({
      data: {
        psychologistId,
        date: new Date(date),
        startHour,
        patientName,
      },
    });
    res.status(201).json(availability);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating availability: ${error.message}` });
  }
};

export const getAvailabilitiesForPsychologist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { psychologistId } = req.params;
    const availabilities = await prisma.calendarAppointment.findMany({
      where: { psychologistId },
    });
    res.json(availabilities);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving availabilities: ${error.message}` });
  }
};

export const getAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const availability = await prisma.calendarAppointment.findUnique({
      where: { id: Number(id) },
    });
    if (availability) {
      res.json(availability);
    } else {
      res.status(404).json({ message: "Availability not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving availability: ${error.message}` });
  }
};

export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, startHour, patientName } = req.body;
    const updatedAvailability = await prisma.calendarAppointment.update({
      where: { id: Number(id) },
      data: {
        ...(date && { date: new Date(date) }),
        ...(startHour && { startHour }),
        ...(patientName && { patientName }),
      },
    });
    res.json(updatedAvailability);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating availability: ${error.message}` });
  }
};




import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
      const { psychologistId } = req.params;
      const { date, startHour, patientName } = req.body;
      console.log({ body: req.body, params: req.params });
      if (!date || !startHour || patientName === undefined) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
  
      if (isNaN(Date.parse(date))) {
        res.status(400).json({ message: "Invalid date format" });
        return;
      }
  
      const exists = await prisma.calendarAppointment.findFirst({
        where: {
          psychologistId: psychologistId,
          date: new Date(date),
          startHour,
        },
      });
      if (exists) {
        res.status(409).json({ message: "Slot already exists" });
        return;
      }
  
      const availability = await prisma.calendarAppointment.create({
        data: {
          psychologistId: psychologistId,
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

export const getAvailabilitiesForPsychologist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { psychologistId } = req.params;
    const availabilities = await prisma.calendarAppointment.findMany({
      where: { psychologistId: psychologistId },
    });
    res.json(availabilities);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving availabilities: ${error.message}` });
  }
};

export const getAvailability = async (req: Request, res: Response): Promise<void> => {
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

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
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
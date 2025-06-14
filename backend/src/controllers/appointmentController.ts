import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// create Appointment

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { psychologistId, date, time } = req.body;

    const client = await prisma.client.findUnique({
      where: { cognitoId },
    });

    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        psychologistId,
        clientId: client.id,
        date,
        time,
        status: "pending",
      },
    });

    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating appointment: ${error.message}` });
  }
};


// get Appointment (id)

export const getAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving appointment: ${error.message}` });
  }
};

// get all Appointments for a Psychologist

export const getAllAppointmentsForPsychologist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const psychologist = await prisma.psychologist.findUnique({
      where: { cognitoId },
    });

    if (!psychologist) {
        res.status(404).json({ message: "Psychologist not found" });
        return;
    }

    const appointments = await prisma.appointment.findMany({
      where: { psychologistId: psychologist.id },
    });

    res.json(appointments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving appointments: ${error.message}` });
  }
};


// get all Appointments for a Client

export const getAllAppointmentsForClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const client = await prisma.client.findUnique({
      where: { cognitoId },
    });

    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    const appointments = await prisma.appointment.findMany({
      where: { clientId: client.id },
    });

    res.json(appointments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving appointments: ${error.message}` });
  }
};


// update Appointment (id), you can reuse this for updating status

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, time, status } = req.body;

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        date,
        time,
        status,
      },
    });

    res.json(updatedAppointment);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating appointment: ${error.message}` });
  }
};


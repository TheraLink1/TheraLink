import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params; 
    const { psychologistId, date, meetingLink } = req.body; 

    const Status = req.body.Status || 'Approved';

    const link = meetingLink || 'link-do-spotkania';

    const appointment = await prisma.appointment.create({
      data: {
        psychologistId,                
        clientCognitoId: cognitoId,     
        date: new Date(date),           
        meetingLink: link,              
        Status,                         
      },
      include: { client: true, psychologist: true }, // Dodajemy relacje!
    });
    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating appointment: ${error.message}` });
  }
};

export const getAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;


    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
      include: { client: true, psychologist: true }, 
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

export const getAllAppointmentsForPsychologist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params; 

    const appointments = await prisma.appointment.findMany({
      where: { psychologistId: cognitoId },
      include: { client: true, psychologist: true }, 
    });

    res.json(appointments); 
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving appointments: ${error.message}` });
  }
};

export const getAllAppointmentsForClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params; 

    const appointments = await prisma.appointment.findMany({
      where: { clientCognitoId: cognitoId },
      include: { client: true, psychologist: true }, 
    });

    res.json(appointments); 
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving appointments: ${error.message}` });
  }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 
    const { date, Status, meetingLink } = req.body;

    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(id) }, 
      data: {
        ...(date && { date: new Date(date) }),
        ...(Status && { Status }),
        ...(meetingLink && { meetingLink }),
      },
      include: { client: true, psychologist: true }, 
    });

    res.json(updatedAppointment); 
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating appointment: ${error.message}` });
  }
};
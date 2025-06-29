import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();


export const createClient = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { cognitoId, name, email, phoneNumber } = req.body;
  
      const client = await prisma.client.create({
        data: {
          cognitoId,
          name,
          email,
          phoneNumber,
        },
      });
  
      res.status(201).json(client);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error creating client: ${error.message}` });
    }
  };

  export const getClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cognitoId } = req.params;
      const client = await prisma.client.findUnique({
        where: { cognitoId },
      });
      console.log('GET CLIENT: ', cognitoId);
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ message: "Tenant not found" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error retrieving tenant: ${error.message}` });
    }
  };
  export const updateClient = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { cognitoId } = req.params;
      const {  email, phoneNumber } = req.body;
  
      const updateClient = await prisma.client.update({
        where: { cognitoId },
        data: {
          email,
          phoneNumber,
        },
      });
  
      res.json(updateClient);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error updating client: ${error.message}` });
    }
  };
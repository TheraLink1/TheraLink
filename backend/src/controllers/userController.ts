import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();


export const createTenant = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { cognitoId, name, email, phoneNumber } = req.body;
  
      const client = await prisma.user.create({
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
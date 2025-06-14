import express from "express";
import {
  createAppointment,
  getAppointment,
  getAllAppointmentsForPsychologist,
  getAllAppointmentsForClient,
  updateAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

// POST a new appointment (client books with a psychologist)
router.post("/:cognitoId", createAppointment);

// GET a single appointment by ID
router.get("/singleApt/:appointmentId", getAppointment);

// GET all appointments for a psychologist by Cognito ID
router.get("/psychologistApts/:cognitoId", getAllAppointmentsForPsychologist);

// GET all appointments for a client by Cognito ID
router.get("/clientApts/:cognitoId", getAllAppointmentsForClient);

// PUT (update) appointment by ID
router.put("/:appointmentId", updateAppointment);

export default router;

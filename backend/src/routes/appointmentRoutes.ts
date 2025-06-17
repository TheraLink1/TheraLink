import express from "express";
import {
  createAppointment,
  getAppointment,
  getAllAppointmentsForPsychologist,
  getAllAppointmentsForClient,
  updateAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

router.post("/:cognitoId", createAppointment);

router.get("/singleApt/:appointmentId", getAppointment);

router.get("/psychologistApts/:cognitoId", getAllAppointmentsForPsychologist);

router.get("/clientApts/:cognitoId", getAllAppointmentsForClient);

router.put("/:appointmentId", updateAppointment);

export default router;

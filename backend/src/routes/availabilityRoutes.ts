import express from "express";
import {
  createAvailability,
  getAvailabilitiesForPsychologist,
  getAvailability,
  updateAvailability,
} from "../controllers/availabilityController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/:psychologistId", authMiddleware(["psychologist"]), createAvailability);

router.get("/psychologist/:psychologistId", authMiddleware(["psychologist", "client"]), getAvailabilitiesForPsychologist);

router.get("/:id", authMiddleware(["psychologist", "client"]), getAvailability);

router.put("/:id", authMiddleware(["psychologist"]), updateAvailability);

export default router;
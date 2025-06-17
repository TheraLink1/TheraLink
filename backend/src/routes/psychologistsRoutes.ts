import express from "express";
import {
  createPsychologist,
  getPsychologist,
  getAllPsychologists,
  updatePsychologist,
} from "../controllers/psychologistController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createPsychologist);

router.get("/:cognitoId", getPsychologist);

router.get("/", getAllPsychologists);

router.put("/:cognitoId", authMiddleware(["psychologist"]), updatePsychologist);

export default router;
import express from "express";
import {
  createPsychologist,
  getPsychologist,
  getAllPsychologists,
  updatePsychologist,
} from "../controllers/psychologistController";

const router = express.Router();

// GET one psychologist by Cognito ID
router.get("/psychologist/:cognitoId", getPsychologist);

// GET all psychologists
router.get("/", getAllPsychologists);

// POST a new psychologist
router.post("/:cognitoId", createPsychologist);

// PUT (update) a psychologist by Cognito ID
router.put("/:cognitoId", updatePsychologist);

export default router;
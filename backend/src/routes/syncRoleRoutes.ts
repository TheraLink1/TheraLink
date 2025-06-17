import express from "express";
import { upgradeToPsychologist } from "../controllers/syncRoleController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", upgradeToPsychologist);

export default router;
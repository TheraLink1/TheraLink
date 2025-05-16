import express from "express";
import {
  createClient,
  getClient,
} from "../controllers/clientController";

const router = express.Router();

router.get("/:cognitoId", getClient);
router.post("/", createClient);

export default router;

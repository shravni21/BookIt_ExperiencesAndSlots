import express from "express";
import {
  getAllExperiences,
  getExperienceById,
} from "../controllers/experienceController";

const router = express.Router();

// GET /experiences - List all experiences
router.get("/", getAllExperiences);

// GET /experiences/:id - Get details for a single experience
router.get("/:id", getExperienceById);

export default router;

import { Request, Response } from "express";
import Experience from "../models/Experience";

export const getAllExperiences = async (_req: Request, res: Response) => {
  try {
    const experiences = await Experience.findAll();
    return res.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return res.status(500).json({ message: "Failed to fetch experiences", error });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);

    if (!experience) return res.status(404).json({ message: "Experience not found" });

    // Example static slots
    const slots = [
      { time: "10:00 AM", available: true },
      { time: "2:00 PM", available: false },
      { time: "6:00 PM", available: true },
    ];

    return res.json({ ...experience.toJSON(), slots });
  } catch (error) {
    console.error("Error fetching experience:", error);
    return res.status(500).json({ message: "Failed to fetch experience details", error });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const { title, shortDescription, price, image } = req.body;

    if (!title || !shortDescription || !price || !image) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newExperience = await Experience.create({ title, shortDescription, price, image });
    return res.status(201).json({ message: "Experience created successfully!", newExperience });
  } catch (error) {
    console.error("Error creating experience:", error);
    return res.status(500).json({ message: "Failed to create experience", error });
  }
};

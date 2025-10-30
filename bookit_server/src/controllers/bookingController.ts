import { Request, Response } from "express";
import Experience from "../models/Experience";
import Booking from "../models/Booking";
import Promo from "../models/Promo"; // if you want promo validation

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, userName, userEmail, date, slot, seats, promoCode, finalPrice } = req.body;

    if (!experienceId || !userName || !userEmail || !date || !slot || !seats) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if experience exists
    const experience = await Experience.findByPk(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found." });

    // Optional: validate promo
    if (promoCode) {
      const promo = await Promo.findOne({ where: { code: promoCode } });
      if (!promo) return res.status(400).json({ message: "Invalid promo code" });
    }

    // Prevent double booking (basic version)
    const existingBooking = await Booking.findOne({ where: { experienceId, date, slot } });
    if (existingBooking) return res.status(400).json({ message: "Slot already booked." });

    const booking = await Booking.create({
      experienceId,
      userName,
      userEmail,
      date,
      slot,
      seats,
      promoCode,
      finalPrice,
      status: "CONFIRMED",
    });

    return res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Failed to create booking", error });
  }
};

export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({ include: [Experience] });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, { include: [Experience] });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch booking", error });
  }
};

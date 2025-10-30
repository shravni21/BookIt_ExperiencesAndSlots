import express from "express";
import {
  createBooking,
  getAllBookings,
} from "../controllers/bookingController";

const router = express.Router();

// POST /bookings - Create new booking
router.post("/", createBooking);

// GET /bookings - (Optional) List all bookings (for testing/admin)
router.get("/", getAllBookings);

export default router;

import express from "express";
import { applyPromo, getAllPromos } from "../controllers/promoController";

const router = express.Router();

// ✅ POST /promos/apply → Apply promo code
router.post("/apply", applyPromo);

// ✅ GET /promos → Get all promos
router.get("/", getAllPromos);

export default router;

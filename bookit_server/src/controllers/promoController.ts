import { Request, Response } from "express";
import Promo from "../models/Promo";

export const applyPromo = async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;

    const promo = await Promo.findOne({ where: { code } });

    if (!promo) {
      return res.status(404).json({ message: "Invalid promo code" });
    }

    const now = new Date();
    if (promo.expiryDate < now) {
      return res.status(400).json({ message: "Promo code has expired" });
    }

    // ✅ Use discountPercentage instead of value/type
    let discount = (promo.discountPercentage / 100) * subtotal;

    if (subtotal < promo.minimumAmount) {
      return res.status(400).json({
        message: `Minimum amount of ₹${promo.minimumAmount} required to use this promo`,
      });
    }

    const finalAmount = subtotal - discount;

    res.status(200).json({
      success: true,
      promo: promo.code,
      discount,
      finalAmount,
    });
  } catch (err) {
    console.error("Error applying promo:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Optional: get all promos
export const getAllPromos = async (req: Request, res: Response) => {
  try {
    const promos = await Promo.findAll();
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch promos" });
  }
};

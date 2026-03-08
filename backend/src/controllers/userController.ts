import { Request, Response } from "express";
import User from "../models/User";

const userId = () => process.env.DEFAULT_USER_ID!;

// GET /api/user/profile
export const getProfile = async (_req: Request, res: Response) => {
  try {
    const user = await User.findById(userId());
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ monthlyIncome: user.monthlyIncome });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/user/income
export const updateIncome = async (req: Request, res: Response) => {
  try {
    const { monthlyIncome } = req.body;
    if (typeof monthlyIncome !== "number" || monthlyIncome < 0)
      return res.status(400).json({ message: "Invalid income value" });

    const user = await User.findByIdAndUpdate(
      userId(),
      { monthlyIncome },
      { returnDocument: "after" }  // ✅ fixed deprecated { new: true }
    );
    res.json({ monthlyIncome: user!.monthlyIncome });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
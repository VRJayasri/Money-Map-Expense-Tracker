import { Request, Response } from "express";
import mongoose from "mongoose";
import BudgetPlan from "../models/BudgetPlan";

const userId = () => new mongoose.Types.ObjectId(process.env.DEFAULT_USER_ID!);

// POST /api/budgetplan
// Body: { month, year, income, categories: [{id, label, type, plannedAmount}] }
export const saveBudgetPlan = async (req: Request, res: Response) => {
  try {
    const { month, year, income, categories } = req.body;

    if (!month || !year || !income) {
      return res.status(400).json({ message: "month, year and income are required" });
    }

    // Upsert — if plan for this month exists, overwrite it
    const plan = await BudgetPlan.findOneAndUpdate(
      { userId: userId(), month, year },
      { userId: userId(), month, year, income, categories },
      { upsert: true, returnDocument: "after" }
    );

    res.status(201).json(plan);
  } catch (err) {
    console.error("saveBudgetPlan error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/budgetplan?month=3&year=2026
export const getBudgetPlan = async (req: Request, res: Response) => {
  try {
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();

    const plan = await BudgetPlan.findOne({ userId: userId(), month, year });

    if (!plan) {
      return res.status(404).json({ message: "No plan found for this month" });
    }

    res.json(plan);
  } catch (err) {
    console.error("getBudgetPlan error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
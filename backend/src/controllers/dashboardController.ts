import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Expense from "../models/Expense";
import Investment from "../models/Investment";

const userId = () => process.env.DEFAULT_USER_ID!;

// GET /api/dashboard?month=3&year=2026
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();
    const uid = new mongoose.Types.ObjectId(userId());

    const [user, expenseAgg, investAgg] = await Promise.all([
      User.findById(uid),
      Expense.aggregate([
        { $match: { userId: uid, month, year } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Investment.aggregate([
        { $match: { userId: uid, month, year } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const income = user?.monthlyIncome ?? 0;
    const totalExpense = expenseAgg[0]?.total ?? 0;
    const totalInvested = investAgg[0]?.total ?? 0;
    const balance = income - totalExpense - totalInvested;

    res.json({ income, totalExpense, totalInvested, balance });
  } catch (err) {
      console.error("getDashboard error:", err); 
    res.status(500).json({ message: "Server error" });
  }
};
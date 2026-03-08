import { Request, Response } from "express";
import mongoose from "mongoose";
import Expense from "../models/Expense";
import Investment from "../models/Investment";
import User from "../models/User";

const userId = () => new mongoose.Types.ObjectId(process.env.DEFAULT_USER_ID!);

// GET /api/actuals?month=3&year=2026
export const getActuals = async (req: Request, res: Response) => {
  try {
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();
    const uid = userId();

    const [user, expenseBreakdown, investBreakdown] = await Promise.all([
      User.findById(uid),

      // Group expenses by category
      Expense.aggregate([
        { $match: { userId: uid, month, year } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $sort: { _id: 1 } },
      ]),

      // Group investments by category
      Investment.aggregate([
        { $match: { userId: uid, month, year } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const income = user?.monthlyIncome ?? 0;

    const totalExpense = expenseBreakdown.reduce((s, e) => s + e.total, 0);
    const totalInvested = investBreakdown.reduce((s, e) => s + e.total, 0);
    const balance = income - totalExpense - totalInvested;

    // Merge into one categories array
    const categories = [
      ...expenseBreakdown.map((e) => ({
        label: e._id,
        value: e.total,
        type: "expense",
      })),
      ...investBreakdown.map((e) => ({
        label: e._id,
        value: e.total,
        type: "investment",
      })),
    ];

    res.json({ income, balance, totalExpense, totalInvested, categories });
  } catch (err) {
    console.error("getActuals error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
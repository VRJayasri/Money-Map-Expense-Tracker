import { Request, Response } from "express";
import mongoose from "mongoose";
import Expense from "../models/Expense";

const userId = () => new mongoose.Types.ObjectId(process.env.DEFAULT_USER_ID!); // ✅ always ObjectId

// POST /api/expenses
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { category, amount, notes, paymentMethod } = req.body;
    const now = new Date();

    const expense = await Expense.create({
      userId: userId(),       // ✅ ObjectId, not raw string
      category,
      amount,
      notes,
      paymentMethod,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      date: now,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("createExpense error:", err); // ✅ log the real error
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/expenses/total?month=3&year=2026
export const getExpenseTotal = async (req: Request, res: Response) => {
  try {
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();

    const result = await Expense.aggregate([
      { $match: { userId: userId(), month, year } }, // ✅ ObjectId in aggregation
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ total: result[0]?.total ?? 0 });
  } catch (err) {
    console.error("getExpenseTotal error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
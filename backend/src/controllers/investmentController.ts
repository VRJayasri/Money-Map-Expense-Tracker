import { Request, Response } from "express";
import mongoose from "mongoose";
import Investment from "../models/Investment";

const userId = () => new mongoose.Types.ObjectId(process.env.DEFAULT_USER_ID!); 


// POST /api/investments
export const createInvestment = async (req: Request, res: Response) => {
  try {
       console.log("req.body:", req.body); 
    const { category, app, amount, notes, paymentMethod } = req.body;
    const now = new Date();

    const investment = await Investment.create({
  userId: userId(), 
    category, 
  app,
  amount,
  notes,
  paymentMethod,
  month: now.getMonth() + 1,
  year: now.getFullYear(),
  date: now,
});
    res.status(201).json(investment);
  } catch (err) {
     console.error("createInvestment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/investments/total?month=3&year=2026
export const getInvestmentTotal = async (req: Request, res: Response) => {
  try {
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();

    const result = await Investment.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId()), month, year } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ total: result[0]?.total ?? 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
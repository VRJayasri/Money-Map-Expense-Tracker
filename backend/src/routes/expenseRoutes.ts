import { Router } from "express";
import { createExpense, getExpenseTotal } from "../controllers/expenseController";

const router = Router();
router.post("/", createExpense);
router.get("/total", getExpenseTotal);

export default router;
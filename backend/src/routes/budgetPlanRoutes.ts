import { Router } from "express";
import { saveBudgetPlan, getBudgetPlan } from "../controllers/budgetPlanController";

const router = Router();
router.post("/", saveBudgetPlan);
router.get("/", getBudgetPlan);

export default router;
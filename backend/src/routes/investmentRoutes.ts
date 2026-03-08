import { Router } from "express";
import { createInvestment, getInvestmentTotal } from "../controllers/investmentController";

const router = Router();
router.post("/", createInvestment);
router.get("/total", getInvestmentTotal);

export default router;
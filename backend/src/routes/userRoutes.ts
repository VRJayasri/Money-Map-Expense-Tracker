import { Router } from "express";
import { getProfile, updateIncome } from "../controllers/userController";

const router = Router();
router.get("/profile", getProfile);
router.patch("/income", updateIncome);

export default router;
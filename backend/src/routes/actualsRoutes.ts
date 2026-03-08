import { Router } from "express";
import { getActuals } from "../controllers/actualsController";

const router = Router();
router.get("/", getActuals);

export default router;
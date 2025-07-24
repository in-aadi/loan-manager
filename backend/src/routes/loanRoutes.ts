import { Router } from "express";
import { applyForLoan } from "../controllers/loanController";
import { authMiddleware } from "../middlewares/authMiddleware"; 

const router = Router();

router.post("/apply", authMiddleware, applyForLoan);

export default router;

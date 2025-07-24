import { Router } from "express";
import {
	applyForLoan,
	getPendingLoans,
	verifyLoan,
} from "../controllers/loanController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/apply", authMiddleware, applyForLoan);
router.get(
	"/pending",
	authMiddleware,
	requireRole("VERIFIER"),
	getPendingLoans
);
router.patch(
	"/:loanId/verify",
	authMiddleware,
	requireRole("VERIFIER"),
	verifyLoan
);

export default router;

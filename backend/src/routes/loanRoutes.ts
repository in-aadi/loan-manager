import { Router } from "express";
import {
	applyForLoan,
	getUserLoans,
	getPendingLoans,
	verifyLoan,
	getAllLoans
} from "../controllers/loanController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole, requireRoles } from "../middlewares/roleMiddleware";
import { addAdmin, deleteAdmin } from "../controllers/adminController";

const router = Router();

router.get(
  "/my-loans",
  authMiddleware,
  requireRole("USER"),
  getUserLoans
);

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
	requireRoles("VERIFIER", "ADMIN"),
	verifyLoan
);

router.get(
  "/all",
  authMiddleware,
  requireRole("ADMIN"),
  getAllLoans
);

router.post(
  "/add-admin",
  authMiddleware,
  requireRole("ADMIN"),
  addAdmin
);

router.delete(
  "/delete-admin/:userId",
  authMiddleware,
  requireRole("ADMIN"),
  deleteAdmin
);


export default router;

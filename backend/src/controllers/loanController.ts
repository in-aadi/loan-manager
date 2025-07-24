import { Request, Response } from "express";
import prisma from "../config/prisma"; 
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const applyForLoan = async (req: Request, res: Response) => {
  try {
    const { fullName, amount, tenureMonths, employmentStatus, reason, employmentAddress } = req.body;
    const userId = req.user?.userId; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const loan = await prisma.loanApplication.create({
      data: {
        userId,
        fullName,
        amount,
        tenureMonths,
        employmentStatus,
        reason,
        employmentAddress,
      },
    });

    return res.status(201).json({ message: "Loan application submitted", loan });
  } catch (error) {
    console.error("Loan Application Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingLoans = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const pendingLoans = await prisma.loanApplication.findMany({
      where: { status: "PENDING" },
      include: { user: true },
    });

    res.json(pendingLoans);
  } catch (error) {
    console.error("Error fetching pending loans", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyLoan = async (req: AuthenticatedRequest, res: Response) => {
  const { loanId } = req.params;
  const { status } = req.body; // must be 'VERIFIED' or 'REJECTED'

  if (req.user?.role !== "VERIFIER") {
    return res.status(403).json({ message: "Forbidden: Not a verifier" });
  }

  if (!["VERIFIED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedLoan = await prisma.loanApplication.update({
      where: { id: Number(loanId) },
      data: { status },
    });

    res.json({ message: `Loan ${status.toLowerCase()}`, loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: "Failed to update loan", error });
  }
};
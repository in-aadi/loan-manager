import { Request, Response } from "express";
import prisma from "../config/prisma"; 

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

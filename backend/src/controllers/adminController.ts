import { Response } from "express";
import prisma from "../config/prisma"; 
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const addAdmin = async (req: AuthenticatedRequest, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    res.status(200).json({ message: "User promoted to admin" });
  } catch (error) {
    console.error("Add admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAdmin = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user || user.role !== "ADMIN")
      return res.status(404).json({ message: "Admin not found" });

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { role: "USER" }, // downgrade
    });

    res.status(200).json({ message: "Admin removed successfully" });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

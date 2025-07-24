import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const requireRole = (role: "USER" | "VERIFIER" | "ADMIN") => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

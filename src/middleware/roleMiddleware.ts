import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@/enums/http_status_code";

type UserRole = "admin" | "user";

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!req.user.role || !allowedRoles.includes(req.user.role)) {
      res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message:
          "Insufficient permissions"
      });
      return;
    }

    next();
  };
};


import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@/enums/http_status_code";

type UserRole = "admin" | "user";

/**
 * Role-based authorization middleware
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @returns Middleware function that checks if user has required role
 */
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if user is authenticated (should be set by authMiddleware)
    if (!req.user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Check if user has required role
    if (!req.user.role || !allowedRoles.includes(req.user.role)) {
      res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Insufficient permissions. Required role: " + allowedRoles.join(" or "),
      });
      return;
    }

    next();
  };
};


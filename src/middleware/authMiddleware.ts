import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { tokenService } from "@/service/implementation/jwt-service/jwt-service";
import { HttpStatus } from "@/enums/http_status_code";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    
    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication token is required (Bearer Token not found)",
      });
      return;
    }

    const tokenServiceInstance = Container.get(tokenService);
    const decoded = tokenServiceInstance.verify_Token(token);

    if (
      !decoded ||
      (typeof decoded === "object" && "success" in decoded && !decoded.success)
    ) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    if (typeof decoded !== "object" || !decoded.id || !decoded.email) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    req.user = {
      id: decoded.id as string,
      email: decoded.email as string,
      role: (decoded.role as "admin" | "user") || "user",
      ...decoded,
    };

    next();
  } catch (error) {
    // 6. Handle verification/other errors
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Authentication failed",
      error: (error as Error).message,
    });
  }
};
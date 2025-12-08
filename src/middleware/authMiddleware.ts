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
    // Extract token from Authorization header or cookies
    let token: string | undefined;

    // Check Authorization header first (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // If no token in header, check cookies (for refresh token scenarios)
    if (!token && req.cookies?.rftn) {
      token = req.cookies.rftn;
    }

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication token is required",
      });
      return;
    }

    // Verify token using JWT service
    const tokenServiceInstance = Container.get(tokenService);
    const decoded = tokenServiceInstance.verify_Token(token);

    // Check if token is valid
    if (!decoded || (typeof decoded === "object" && "success" in decoded && !decoded.success)) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    // Check if decoded has required properties
    if (typeof decoded !== "object" || !decoded.id || !decoded.email) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    // Attach user data to request object
    req.user = {
      id: decoded.id as string,
      email: decoded.email as string,
      role: (decoded.role as "admin" | "user") || "user",
      ...decoded,
    };

    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Authentication failed",
      error: (error as Error).message,
    });
  }
};


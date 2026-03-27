import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api.error";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new ApiError(401, "Invalid Token"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new ApiError( 401, "Invalid Token"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
    };

    req.user = {
      id: decoded.userId,
    };
    next();
  } catch (error) {
    next(error);
  }
};


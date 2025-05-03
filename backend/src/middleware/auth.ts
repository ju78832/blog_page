import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { COOKIE_NAME } from "../types/index.js";

// Extend the Request interface to include the user property
declare module "express" {
  interface Request {
    user?: any;
  }
}

// Protect routes
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from header
  const token = req.signedCookies[`${COOKIE_NAME}`];

  // Fallback to cookie
  if (!token && token.trim() === "") {
    return next(new Error("Not authorized to access this route"));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Get user from database
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new Error("User not found"));
    }

    next();
  } catch (err) {
    return next(new Error("Not authorized to access this route"));
  }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new Error(
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};

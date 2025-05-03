import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/User.js";
import bcyrpt from "bcryptjs";
import { generateToken } from "../types/token.js";
import { COOKIE_NAME } from "../types/index.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcyrpt.hash(password, 10);

  try {
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      res.status(400).json({ message: "Email already exists" });
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    // Create token
    const token = generateToken(user._id, user.role);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
  }

  try {
    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.json({ message: "Invalid credentials" }).status(401);
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    // Check if password matches
    const isMatch = await bcyrpt.compare(password, user.password);

    if (!isMatch) {
      res.json({ message: "Invalid credentials" }).status(401);
    }

    // Create token
    const token = generateToken(user._id, user.role);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    res.status(200).json({ success: true, token, role: user.role });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

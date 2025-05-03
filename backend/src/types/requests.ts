import { Request } from "express";
import { User } from "./index.js";

export interface AuthRequest extends Request {
  user?: User;
}

export interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "admin";
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface CreatePostRequest extends AuthRequest {
  body: {
    title: string;
    content: string;
    author?: string;
  };
}

export interface UpdatePostRequest extends AuthRequest {
  body: {
    title?: string;
    content?: string;
  };
  params: {
    id: string;
  };
}

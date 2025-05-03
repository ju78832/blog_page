export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface TokenPayload {
  id: string;
  role: "user" | "admin";
}

export const COOKIE_NAME = "Jwt321123";

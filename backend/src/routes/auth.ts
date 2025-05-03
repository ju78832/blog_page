import { Router } from "express";
import { register, getMe } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", verifyToken, getMe);

export default router;

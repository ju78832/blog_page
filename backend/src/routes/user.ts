import { Router } from "express";

import { verifyToken, authorize } from "../middleware/auth.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";

const router = Router();

router.get("/", verifyToken, authorize("admin"), getUsers);

router.get("/:id", verifyToken, authorize("admin"), getUser);

router.post("/", verifyToken, authorize("admin"), createUser);

router.put("/:id", verifyToken, authorize("admin"), updateUser);

router.delete("/:id", verifyToken, authorize("admin"), deleteUser);

export default router;

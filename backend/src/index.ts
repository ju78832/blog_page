import dotenv from "dotenv";
import express, { request, response } from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { connectionToDatabase } from "./helper/dbConnect.js";

dotenv.config();

const app = express();

// Security middleware

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Database connection
connectionToDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/posts", verifyToken, postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

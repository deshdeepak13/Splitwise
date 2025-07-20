import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Match frontend endpoint: POST /api/v1/auth/register
router.post("/register", registerUser);

// ✅ Match frontend endpoint: POST /api/v1/auth/login
router.post("/login", loginUser);

// ✅ Protected route to get current user
router.get("/me", protect, getMe);

export default router;

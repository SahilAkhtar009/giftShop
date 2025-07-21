import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, adminOnly, getUsers); // Admin only

export default router;

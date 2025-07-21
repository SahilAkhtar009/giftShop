import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", protect, getWishlist); // GET wishlist
router.post("/:id", protect, addToWishlist); // ADD product to wishlist
router.delete("/:id", protect, removeFromWishlist); // REMOVE product from wishlist

export default router;

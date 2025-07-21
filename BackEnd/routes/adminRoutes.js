import express from "express";
import {
  getAdminSummary,
  getAllProducts,
  getAllUsers,
  getAllOrders,
  DeleteProduct,
  orderStatus,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
// import { getAllProducts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/summary", protect, adminOnly, getAdminSummary);
router.get("/products", protect, adminOnly, getAllProducts);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/orders", protect, adminOnly, getAllOrders);
router.delete("/products/:id", protect, adminOnly, DeleteProduct);
router.put("/orders/:id/status", protect, adminOnly, orderStatus);
router.get("/products/:id", protect, adminOnly, getProductById);
router.put("/products/:id", protect, adminOnly, updateProduct);

export default router;

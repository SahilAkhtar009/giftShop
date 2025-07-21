import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, addOrderItems) // Place order
  .get(protect, adminOnly, getAllOrders); // Admin: all orders

router.route("/myorders").get(protect, getMyOrders); // User: my orders

router.route("/:id").get(protect, getOrderById); // Get specific order

router.route("/:id/pay").put(protect, updateOrderToPaid); // Mark paid

router.route("/:id").delete(protect, deleteOrder);
router.route("/:id/deliver").put(protect, adminOnly, updateOrderToDelivered); // Mark delivered

export default router;

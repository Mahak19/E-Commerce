import express from "express";
import { authorizedRole, isAuthenticated } from "../middleware/auth.js";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Create New Order
router.post("/order/new", isAuthenticated, newOrder);

// Get Single Order
router.get("/order/:orderId", isAuthenticated, getSingleOrder);

// Get My Orders
router.get("/user/orders", isAuthenticated, myOrders);

// Get All orders -- Admin only
router.get(
  "/admin/orders",
  isAuthenticated,
  authorizedRole("admin"),
  getAllOrders
);

// Update order status -- Admin only
router.put(
  "/admin/order/:id",
  isAuthenticated,
  authorizedRole("admin"),
  updateOrderStatus
);

// Delete orders -- Admin only
router.delete(
  "/admin/order/:id",
  isAuthenticated,
  authorizedRole("admin"),
  deleteOrder
);

export default router;

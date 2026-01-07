import express from "express";
import {
  addOrder,
  getOrders,
  getOrdersByUserId,
  deleteOrder,
  getTotalPrice,
  updateOrderStatus,
} from "../controllers/orders.js";

export const orderRouter = express.Router();

// Create order
orderRouter.post("/", addOrder);

// Admin
orderRouter.get("/", getOrders);
orderRouter.get("/total-price", getTotalPrice);
orderRouter.put("/:orderId", updateOrderStatus);
orderRouter.delete("/:id", deleteOrder);

// User
orderRouter.get("/user/:userId", getOrdersByUserId);

import express from "express";
import { requiresign } from "../middleware/authMiddleware.js";
import {
  cancelOrderController,
  createOrderController,
  getOrderController,
} from "../Controller/orderController.js";
const router = express.Router();

//create order
router.post("/neworder", requiresign, createOrderController);

//get order
router.get("/getorder", requiresign, getOrderController);

//cancel order 
router.put("/cancelorder", requiresign, cancelOrderController);
//create checkout session
export default router;

import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import processPayment from "../controllers/paymentController.js";

const router = express.Router();

//  Route to process a payment
router.post("/process/payment", isAuthenticated, processPayment);

export default router;

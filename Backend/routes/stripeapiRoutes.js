import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import sendStripeApiKey from "../controllers/striptapiController.js";

const router = express.Router();

//  Route to send the Stripe API key to the client.
router.get("/stripeapikey", isAuthenticated, sendStripeApiKey);

export default router;

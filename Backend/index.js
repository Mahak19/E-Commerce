// Import required packages and modules
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import databaseConnection from "./database/databaseConnection.js";
import orderRouter from "./routes/orderRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import stripeRouter from "./routes/stripeapiRoutes.js";
import { v2 as cloudinary } from "cloudinary";

// Initialize Express application
const app = express();

// Configure Cloudinary for handling image uploads
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware to parse JSON requests and handle large payloads
app.use(express.json({ limit: "100mb" }));

// Middleware to parse URL-encoded requests and handle large payloads
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware for Cross-Origin Resource Sharing (CORS) configuration
app.use(
  cors({
    // Allow requests from specified frontend origin
    origin: [process.env.FRONTEND_URI],
    // Allow specified HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE"],
    // Allow credentials to be included in requests
    credentials: true,
  })
);

// Connect to the database
databaseConnection();

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", stripeRouter);

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on PORT ${process.env.PORT}`
  );
});

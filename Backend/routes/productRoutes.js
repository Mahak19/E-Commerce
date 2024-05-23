import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getAllReviews,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticated, authorizedRole } from "../middleware/auth.js";

const router = express.Router();

// Create a new product
router.post(
  "/admin/product/new",
  isAuthenticated,
  authorizedRole("admin"),
  createProduct
);

// Get All Products
router.get("/products", getAllProducts);

// Get Admin Products
router.get(
  "/admin/products",
  isAuthenticated,
  authorizedRole("admin"),
  getAdminProducts
);

// Get Single Product
router.get("/product/:id", getSingleProduct);

// Update product
router.put(
  "/admin/product/:id",
  isAuthenticated,
  authorizedRole("admin"),
  updateProduct
);

// Delete Product
router.delete(
  "/admin/product/:id",
  isAuthenticated,
  authorizedRole("admin"),
  deleteProduct
);

// Create new review
router.put("/user/review", isAuthenticated, createProductReview);

// Get all reviews
router.get("/user/reviews", getAllReviews);

// Delete review
router.delete("/user/reviews", isAuthenticated, deleteReview);

export default router;

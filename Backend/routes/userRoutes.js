import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizedRole, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Register user
router.post("/user/new", registerUser);

// Login user
router.post("/user/login", loginUser);

// Logout user
router.get("/user/logout", logoutUser);

// Forgot password
router.post("/forgot/password", forgotPassword);

// Reset password
router.put("/reset/password/:token", resetPassword);

// Get User Profile
router.get("/user/profile", isAuthenticated, getUserProfile);

// Update password
router.put("/user/update/password", isAuthenticated, updatePassword);

// Update user profile
router.put("/user/update/profile", isAuthenticated, updateUserProfile);

// Get all users -- Admin only
router.get(
  "/admin/users",
  isAuthenticated,
  authorizedRole("admin"),
  getAllUsers
);

// Get single user -- Admin only
router.get(
  "/admin/user/:id",
  isAuthenticated,
  authorizedRole("admin"),
  getSingleUser
);

// Update user role -- Admin Only
router.put(
  "/admin/user/:id",
  isAuthenticated,
  authorizedRole("admin"),
  updateUserRole
);

// Delete user -- Admin Only
router.delete(
  "/admin/user/:id",
  isAuthenticated,
  authorizedRole("admin"),
  deleteUser
);

export default router;

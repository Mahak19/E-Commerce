// Import required packages and modules
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Define schema fields with validations
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      maxLength: [25, "First name can not exceed 25 characters"],
      minLength: [3, "First name shoud have more than 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      maxLength: [25, "Last name can not exceed 25 characters"],
      minLength: [3, "Last name shoud have more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false, // Password will not be returned in query results
    },
    avatar: {
      public_id: String,
      avatar_url: String,
    },
    role: {
      type: String,
      default: "user", // Default role is 'user'
    },
    dob: {
      type: Date, // Date of birth field
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now, // Default value is the current date/time
    },
    resetPasswordToken: String, // Token for resetting password
    resetPasswordExpires: Date, // Expiry date for reset password token
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordUpdatedAt = Date.now();
  }
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

// Method to generate and set reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Create User model from schema
const User = new mongoose.model("User", userSchema);

// Export User model
export default User;

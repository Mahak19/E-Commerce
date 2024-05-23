// Import necessary modules and models
import User from "../model/userModel.js";
import sendEmail from "../middleware/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// Register a new user
const registerUser = async (req, res) => {
  // Extract user data from request body
  const { firstName, lastName, dob, avatar, email, password } = req.body;
  try {
    // Check if the email is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Email already registered",
      });
    }

    // If the user has an avatar, upload it to Cloudinary
    if (avatar) {
      const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "ecommerce-avatars",
      });

      // Create a new user with the uploaded avatar
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        password: password,
        avatar: {
          public_id: myCloud.public_id,
          avatar_url: myCloud.secure_url,
        },
      });

      // Save the user to the database
      const user = await newUser.save();
      const token = await newUser.generateAuthToken();

      // Prepare user data to be sent in the response
      const result = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        dob: user.dob,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        passwordUpdatedAt: user.passwordUpdatedAt,
        resetPasswordExpires: user.resetPasswordExpires,
        resetPasswordToken: user.resetPasswordToken,
      };

      // Send the response with a cookie containing the authentication token
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
          secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
        })
        .json({
          success: true,
          message: "User Registered successfully",
          result,
        });
    } else {
      // If the user doesn't have an avatar, create a new user without it
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        password: password,
      });

      // Save the user to the database
      const user = await newUser.save();

      // Prepare user data to be sent in the response
      const result = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        dob: user.dob,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        passwordUpdatedAt: user.passwordUpdatedAt,
        resetPasswordExpires: user.resetPasswordExpires,
        resetPasswordToken: user.resetPasswordToken,
      };

      // Generate authentication token for the user
      const token = await newUser.generateAuthToken();

      // Send the response with a cookie containing the authentication token
      res
        .status(201)
        .cookie("token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
          secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
        })
        .json({
          success: true,
          message: "User Registered successfully",
          result,
        });
    }
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    // If user is not found, return an error response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Registered",
      });
    }

    // Check if the provided password matches the stored password hash
    const isPasswordMatch = await user.matchPassword(password);

    // If passwords don't match, return an error response
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Password does not match",
      });
    }

    // Generate authentication token for the user
    const token = await user.generateAuthToken();

    // Prepare user data to be sent in the response
    const userWithOutPassword = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      dob: user.dob,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      passwordUpdatedAt: user.passwordUpdatedAt,
      resetPasswordExpires: user.resetPasswordExpires,
      resetPasswordToken: user.resetPasswordToken,
    };

    // Send the response with a cookie containing the authentication token
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      })
      .json({
        success: true,
        message: "User Logged in successfully",
        user: userWithOutPassword,
      });
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout user
const logoutUser = (req, res) => {
  // Clear the authentication token cookie
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

// Forgot Password Function
const forgotPassword = async (req, res) => {
  // Implementation of forgot password functionality
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Registered",
      });
    }

    const resetPasswordToken = await user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URI}/reset/password/${resetPasswordToken}`;

    const message = `Reset your password by clicking the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password reset",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent successfully to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password Function
const resetPassword = async (req, res) => {
  // Implementation of reset password functionality
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Password reset token is invalid or expired",
      });
    }

    // Check if password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// User Profile Function
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Password Function
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Old password and new password are required",
      });
    }
    const isPasswordMatch = await user.matchPassword(oldPassword);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (confirmPassword !== newPassword) {
      return res.status(404).json({
        success: false,
        message: "Confirm Password does not match",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { firstName, lastName, email, avatar } = req.body;
    if (email) {
      user.email = email;
    }
    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (avatar !== null) {
      // If the user does not have an avatar, create a new entry
      if (!user.avatar) {
        user.avatar = {
          public_id: "",
          avatar_url: "",
        };
      } else {
        // If the user has an existing avatar and the new avatar is null, destroy it
        if (user.avatar.public_id && avatar === null) {
          await cloudinary.uploader.destroy(user.avatar.public_id);
          user.avatar.public_id = ""; // Clear public_id after destroying the asset
          user.avatar.avatar_url = ""; // Clear avatar_url as well
        }
      }

      // Upload the new avatar if it is not null
      if (avatar !== null) {
        const myCloud = await cloudinary.uploader.upload(avatar, {
          folder: "ecommerce-avatars",
        });

        user.avatar.public_id = myCloud.public_id;
        user.avatar.avatar_url = myCloud.secure_url;
      }
    } else {
      // If avatar is null, delete the existing avatar from Cloudinary
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
        user.avatar.public_id = ""; // Clear public_id after destroying the asset
        user.avatar.avatar_url = ""; // Clear avatar_url as well
      }
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users -- Admin only
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.status(404).json({
        success: false,
        message: "No User found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single user -- Admin only
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user role -- Admin only
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (role) {
      user.role = role;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User -- Admin only
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove the user's avatar from Cloudinary
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};

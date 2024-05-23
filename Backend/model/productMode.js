// Import mongoose for creating schemas and models
import mongoose from "mongoose";

// Define the schema for products
const productSchema = new mongoose.Schema(
  {
    // Product name field
    name: {
      type: String,
      required: [true, "Please enter product name"], // Validation for required field
      trim: true, // Trim whitespace from input
    },
    // Product description field
    description: {
      type: String,
      required: [true, "Please enter product description"], // Validation for required field
    },
    // Product price field
    price: {
      type: Number,
      required: [true, "Please enter product price"], // Validation for required field
      maxLength: [6, "Price cannot exceed 5 characters"], // Maximum length of price
    },
    // Product ratings field
    ratings: {
      type: Number,
      default: 0, // Default value for ratings
    },
    // Product images field
    image: [
      {
        public_id: String, // Public ID for image
        url: String, // URL of the image
      },
    ],
    // Product category field
    category: {
      type: String,
      required: [true, "Please enter product category"], // Validation for required field
    },
    // Product stock field
    stock: {
      type: String,
      required: [true, "Please enter product stock"], // Validation for required field
      maxLength: [3, "Stock cannot exceed 3 characters"], // Maximum length of stock
      default: 1, // Default value for stock
    },
    // Number of reviews for the product
    numberOfReviews: {
      type: Number,
      default: 0, // Default value for number of reviews
    },
    // Array of reviews for the product
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
        },
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now, // Default value for review creation date
        },
      },
    ],
    // Creator of the product (reference to User model)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create Product model from schema
const Product = new mongoose.model("Product", productSchema);

// Export Product model
export default Product;

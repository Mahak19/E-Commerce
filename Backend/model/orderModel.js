// Import mongoose for creating schemas and models
import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    // Shipping information for the order
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },
    // Array of order items
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to Product model
          required: true,
        },
      },
    ],
    // User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    // Payment information
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    // Date when payment was made
    paidAt: {
      type: Date,
      required: true,
    },
    // Prices for items, tax, shipping, and total
    itemsPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    taxPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    // Status of the order
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    // Date when the order was delivered
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create Order model from schema
const Order = new mongoose.model("Order", orderSchema);

// Export Order model
export default Order;

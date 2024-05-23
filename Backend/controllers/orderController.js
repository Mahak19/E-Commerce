import Order from "../model/orderModel.js";
import Product from "../model/productMode.js";

// Create New Order
const newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const newOrder = new Order({
      shippingInfo: shippingInfo,
      orderItems: orderItems,
      paymentInfo: paymentInfo,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order added successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get orders for logged in users
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You have not made any orders",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders -- Admin only
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount = totalAmount + order.totalPrice;
    });
    res.status(200).json({
      success: true,
      orders,
      totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order already delivered",
      });
    }

    if (newStatus === "Shipped") {
      for (const orderItem of order.orderItems) {
        const product = await Product.findById(orderItem.product);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }

        // Check if product stock is less than quantity
        if (product.stock < orderItem.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product ${product.name}`,
          });
        }

        // Update product stock
        product.stock -= orderItem.quantity;
        await product.save();
      }
    }

    order.orderStatus = newStatus;
    if (newStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    await order.deleteOne();
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};

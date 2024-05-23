import axios from "axios";
import {
  Add_To_Cart,
  ORDER_SUMMARY,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../features/cart/cartSlice";
import { toast } from "react-hot-toast";

// Function to add a product to the cart
const addToCart =
  (id, quantity = 1) =>
  async (dispatch, getState) => {
    // Fetching product details from the server
    const { data } = await axios.get(`/api/api/v1/product/${id}`);

    // Dispatching an action to add the product to the cart
    dispatch(
      Add_To_Cart({
        product: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity: quantity,
      })
    );

    // Storing cart items in local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    // Displaying a success toast notification
    toast.success("Added To Cart");
  };

// Function to remove an item from the cart
const removeCartItem = (id) => async (dispatch, getState) => {
  // Dispatching an action to remove the item from the cart
  dispatch(REMOVE_CART_ITEM(id));

  // Storing cart items in local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  // Displaying a success toast notification
  toast.success("Item Removed");
};

// Function to save shipping information
const saveShippingInfo = (data) => async (dispatch) => {
  // Dispatching an action to save the shipping information
  dispatch(SAVE_SHIPPING_INFO(data));

  // Storing shipping information in local storage
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// Function to save order summary
const orderSummary = (data) => async (dispatch) => {
  // Dispatching an action to save the order summary
  dispatch(ORDER_SUMMARY(data));

  // Storing order summary in local storage
  localStorage.setItem("orderSummary", JSON.stringify(data));
};

// Exporting the functions for use in other modules
export { addToCart, removeCartItem, saveShippingInfo, orderSummary };

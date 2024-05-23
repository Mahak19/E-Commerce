// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the cart
const initialState = {
  // Fetching cart items from local storage if available, else initializing to an empty array
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  // Fetching shipping information from local storage if available, else initializing to an empty object
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  // Fetching order summary from local storage if available, else initializing with default values
  orderSummary: localStorage.getItem("orderSummary")
    ? JSON.parse(localStorage.getItem("orderSummary"))
    : {
        subtotal: 0,
        taxes: 0,
        total: 0,
      },
};

// Creating a slice of the Redux store for managing cart-related actions and state
export const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for adding items to the cart
    Add_To_Cart: (state, action) => {
      // Extracting the new item to be added from the action payload
      const newItem = action.payload;
      // Checking if the item already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      // If the item already exists, update its quantity
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existingItem.product ? newItem : item
          ),
        };
      } else {
        // If the item is new, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    },

    // Reducer function for removing an item from the cart
    REMOVE_CART_ITEM: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    },

    // Reducer function for saving shipping information
    SAVE_SHIPPING_INFO: (state, action) => {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },

    // Reducer function for updating the order summary
    ORDER_SUMMARY: (state, action) => {
      return {
        ...state,
        orderSummary: action.payload,
      };
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  Add_To_Cart,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  ORDER_SUMMARY,
} = cartSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default cartSlice.reducer;
